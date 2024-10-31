//ChatAC.tsx
import React, { useState, useRef, useEffect } from "react";
import * as C from "../../pages/StoryFlow/container";
import Choices from "../../components/ChatAC/Choices";
import * as Styles from "./ChatACStyle";
import axios from "axios";
import { initialMessages, initialChoices } from "./ACchatMessages";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const selectedSubject = location.state?.selected_subject || "default_subject"; // 전달된 주제 받아오기

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        // writer 값을 가져오는 API 호출
        const response = await axios.get<{ id: number; writer: string }>(
          "http://localhost:8000/genius/draft/"
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          const fetchedWriter = response.data[response.data.length - 1].writer;
          setWriter(fetchedWriter);
          setMessages(initialMessages(fetchedWriter));
          fetchIntroChoices(fetchedWriter);
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

    fetchWriter();
  }, []);

  useEffect(() => {
    if (currentQuestion) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentQuestion, isUser: false }
      ]);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fetchIntroChoices = async (writer: string) => {
    console.log("선택된 주제: ", selectedSubject); // 선택된 주제를 콘솔에 출력

    try {
      const response = await axios.post<APIResponse>(
        "http://localhost:8000/genius/intro/create_intro_content/",
        {
          writer: writer,
          selected_subject: selectedSubject // 선택된 주제 사용
        }
      );
      console.log("주인공의 이름 생성 API 성공: ", response.data); // 성공 로그
      setCurrentAnswers(response.data.intro_content);
      setCurrentQuestion("주인공의 이름이 뭐야?");
    } catch (error) {
      console.error(
        "create_intro_content(주인공 이름 가져오기)에 실패했습니다:",
        error
      );
    }
  };

  const saveSelectedIntro = async (choice: string) => {
    try {
      await axios.post(
        "http://localhost:8000/genius/intro/save_intro_content/",
        {
          writer: writer,
          selected_content: choice
        }
      );
      console.log("주인공 이름 저장 API 성공"); // 성공 로그
      fetchNextQuestion();
    } catch (error) {
      console.error(
        "save_intro_content(주인공 이름 저장)에 실패했습니다:",
        error
      );
    }
  };

  const fetchNextQuestion = async () => {
    try {
      if (questionCount < 6) {
        const response = await axios.post<NextQuestionResponse>(
          "http://localhost:8000/genius/draftpage/make_draft_page/",
          { writer: writer }
        );
        console.log("make_draft_page API 성공: ", response.data); // 성공 로그
        setCurrentQuestion(response.data.question);
        setCurrentAnswers(response.data.answers);
        setQuestionCount((prevCount) => prevCount + 1);
      } else if (questionCount >= 6 && questionCount < 9) {
        const response = await axios.post<NextQuestionResponse>(
          "http://localhost:8000/genius/draftpage/finish_draft_page/",
          { writer: writer }
        );
        console.log("finish_draft_page API 성공: ", response.data); // 성공 로그
        setCurrentQuestion(response.data.question);
        setCurrentAnswers(response.data.answers);
        setQuestionCount((prevCount) => prevCount + 1);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "모든 질문이 완료되었습니다.", isUser: false }
        ]);
      }
    } catch (error) {
      console.error("다음 질문을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const saveSelectedAnswer = async (answer: string) => {
    try {
      await axios.post(
        "http://localhost:8000/genius/draftpage/save_selected_answer/",
        {
          writer: writer,
          question: currentQuestion,
          selected_answer: answer
        }
      );
      console.log("선택지 저장 API 성공"); // 성공 로그
    } catch (error) {
      console.error("save_selected_answer(선택지 저장)에 실패했습니다:", error);
    }
  };

  const handleChoiceSelect = async (choice: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: choice, isUser: true }
    ]);

    if (questionCount === 0) {
      await saveSelectedIntro(choice);
    } else {
      await saveSelectedAnswer(choice);
      await fetchNextQuestion();
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
