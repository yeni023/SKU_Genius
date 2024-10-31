import React, { useState, useRef, useEffect } from "react";
import * as C from "../../pages/StoryFlow/container";
import Choices from "../../components/ChatAC/Choices";
import * as Styles from "./ChatACStyle";
import axios from "axios";
import { initialMessages, initialChoices } from "./ACchatMessages";

interface Message {
  text: string;
  isUser: boolean;
}

interface APIResponse {
  intro_id: number;
  subject: string;
  intro_content: string[];
  draft_id: number;
}

interface NextQuestionResponse {
  question: string;
  answers: string[];
  page_num: number;
  page_id: number;
}

const ChatAC: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentAnswers, setCurrentAnswers] =
    useState<string[]>(initialChoices);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [questionCount, setQuestionCount] = useState<number>(0); // 질문 카운트
  const [writer, setWriter] = useState<string>(""); // writer 상태 관리
  const currentPage = "ChatAC"; // currentPage를 정의합니다.

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        // writer 값을 가져오는 API 호출
        const response = await axios.get<{ id: number; writer: string }>(
          "http://localhost:8000/genius/draft/"
        );

        // 응답에서 writer 값을 마지막 요소에서 가져옵니다.
        if (Array.isArray(response.data) && response.data.length > 0) {
          const fetchedWriter = response.data[response.data.length - 1].writer; // 마지막 요소의 writer 값 사용
          setWriter(fetchedWriter); // writer 값을 상태에 저장
          setMessages(initialMessages(fetchedWriter)); // writer 값을 기반으로 초기 메시지 설정
          fetchIntroChoices(fetchedWriter); // API 호출
        } else {
          console.error(
            "응답 데이터가 비어있거나 예상과 다릅니다:",
            response.data
          );
        }
      } catch (error) {
        console.error("writer를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchWriter(); // writer 값을 가져오는 함수 호출
  }, []);

  useEffect(() => {
    // 사용자가 질문에 답변하면 해당 질문을 메시지에 추가
    if (currentQuestion) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentQuestion, isUser: false }
      ]);
    }
  }, [currentQuestion]);

  useEffect(() => {
    // 메시지가 업데이트될 때마다 스크롤을 맨 아래로 내림
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fetchIntroChoices = async (writer: string) => {
    try {
      // 주인공의 이름 생성하는 API 호출
      const response = await axios.post<APIResponse>(
        "http://localhost:8000/genius/intro/create_intro_content/",
        {
          writer: writer,
          selected_subject: "horror"
        }
      );
      setCurrentAnswers(response.data.intro_content);
      setCurrentQuestion("주인공의 이름이 뭐야?"); // 첫 질문 설정
    } catch (error) {
      console.error(
        "create_intro_content(주인공 이름 가져오기)에 실패했습니다:",
        error
      );
    }
  };

  const saveSelectedIntro = async (choice: string) => {
    try {
      // 주인공 이름을 저장하는 API 호출
      await axios.post(
        "http://localhost:8000/genius/intro/save_intro_content/",
        {
          writer: writer,
          selected_content: choice
        }
      );
      fetchNextQuestion(); // 다음 질문 호출
    } catch (error) {
      console.error(
        "save_intro_content(주인공 이름 저장)에 실패했습니다:",
        error
      );
    }
  };

  const fetchNextQuestion = async () => {
    try {
      // 6번째 질문까지 호출된 경우
      if (questionCount < 6) {
        // make draft page API 호출 (1~6번째 질문)
        const response = await axios.post<NextQuestionResponse>(
          "http://localhost:8000/genius/draftpage/make_draft_page/",
          { writer: writer }
        );
        setCurrentQuestion(response.data.question);
        setCurrentAnswers(response.data.answers); // 다음 질문의 선택지 설정
        setQuestionCount((prevCount) => prevCount + 1); // 질문 카운트 증가
      } else if (questionCount >= 6 && questionCount < 9) {
        // finish draft page API 호출 (7~9번째 질문)
        const response = await axios.post<NextQuestionResponse>(
          "http://localhost:8000/genius/draftpage/finish_draft_page/",
          { writer: writer }
        );
        setCurrentQuestion(response.data.question);
        setCurrentAnswers(response.data.answers); // 다음 질문의 선택지 설정
        setQuestionCount((prevCount) => prevCount + 1); // 질문 카운트 증가
      } else {
        // 모든 질문이 완료된 경우 처리
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "모든 질문이 완료되었습니다.", isUser: false }
        ]);
      }
    } catch (error) {
      // make_draft_page 또는 finish_draft_page API 호출 오류 시 콘솔
      console.error("다음 질문을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const saveSelectedAnswer = async (answer: string) => {
    try {
      // make_draft_page나 finish_draft_page에서 생성한 선택지 선택 시, 선택한 선택지 저장하는 API 호출
      await axios.post(
        "http://localhost:8000/genius/draftpage/save_selected_answer/",
        {
          writer: writer,
          question: currentQuestion,
          selected_answer: answer
        }
      );
    } catch (error) {
      console.error("save_selected_answer(선택지 저장)에 실패했습니다:", error);
    }
  };

  const handleChoiceSelect = async (choice: string) => {
    // 사용자의 선택을 메시지에 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: choice, isUser: true }
    ]);

    if (questionCount === 0) {
      // 첫 질문에 대한 선택이면 주인공 이름 저장 API 호출
      await saveSelectedIntro(choice);
    } else {
      // 사용자가 선택한 답변 저장
      await saveSelectedAnswer(choice); // 선택한 답변 저장
      await fetchNextQuestion(); // 다음 질문 호출
    }
  };

  return (
    <Styles.ACBackgroundContainer>
      <C.Header2 currentPage={currentPage} />
      <Styles.MessagesList>
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            <Styles.MessageContainer isUser={message.isUser}>
              <Styles.UserImage isUser={message.isUser} />
              <Styles.Message isUser={message.isUser}>
                {message.text}
              </Styles.Message>
            </Styles.MessageContainer>
            {!message.isUser && index === messages.length - 1 && (
              <Choices choices={currentAnswers} onSelect={handleChoiceSelect} />
            )}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </Styles.MessagesList>
    </Styles.ACBackgroundContainer>
  );
};

export default ChatAC;
