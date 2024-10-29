import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Choices from "../../components/ChatAC/Choices";
import * as Styles from "./ChatDCStyle";
import { useNavigate } from "react-router-dom";
import * as C from "../../pages/StoryFlow/container";

import {
  initialMessages,
  notReadyMessage,
  startStoryMessage,
  initialChoices,
  finalChoices,
  nextChoices
} from "./DCchatMessages";

const ChatDC: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [messages, setMessages] = useState(initialMessages(""));
  const [userMessage, setUserMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [middleQuestionCount, setMiddleQuestionCount] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [writer, setWriter] = useState("");
  const [nickname, setNickname] = useState(""); // 새로운 상태 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const currentPage = "ChatDC";

  useEffect(() => {
    const fetchWriterAndNickname = async () => {
      try {
        const response = await axios.get("http://localhost:8000/genius/draft/");
        const drafts = response.data;
        if (drafts.length > 0) {
          const latestDraft = drafts.reduce((latest, draft) => {
            return new Date(draft.savedAt) > new Date(latest.savedAt) ? draft : latest;
          }, drafts[0]);
          setWriter(latestDraft.writer);
          setMessages(initialMessages(latestDraft.writer));

          // 닉네임을 가져오기 (실제 엔드포인트로 대체)
          const userResponse = await axios.get("http://localhost:8000/genius/members"); // 실제 엔드포인트로 대체
          setNickname(userResponse.data.nickname);
        }
      } catch (error) {
        console.error("작가와 닉네임을 가져오는 데 오류 발생:", error);
      }
    };

    fetchWriterAndNickname();
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser) {
      if (lastMessage.text === startStoryMessage.text) {
        setShowChat(true);
      }
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChoiceSelect = (choice: string) => {
    setSelectedChoice(choice);
    if (choice === initialChoices[1]) {
      setMessages([
        ...messages,
        { text: initialChoices[1], isUser: true },
        { ...notReadyMessage }
      ]);
      setShowChat(false);
    } else if (choice === initialChoices[0] || choice === finalChoices[1]) {
      setMessages([
        ...messages,
        { text: choice, isUser: true },
        { ...startStoryMessage }
      ]);
      sendFirstApiRequest();
    } else if (choice === finalChoices[0]) {
      navigate("/MainHome");
    } else if (choice === nextChoices[0]) {
      navigate("/DCRoading");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (userMessage.trim() !== "") {
      setMessages([...messages, { text: userMessage.trim(), isUser: true }]);
      setUserMessage("");
      if (isEnding) {
        sendBookStoryApiRequest();
        sendUserEndingChatApiRequest(userMessage.trim());
      } else {
        sendUserChatApiRequest(userMessage.trim());
      }
    }
  };

  const sendFirstApiRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/firstquestion/",
        { writer }
      );
      const data = response.data;
      
      // 필요한 내용만 추출
      const introContent = data["생성된 이야기"] || '생성된 이야기가 없습니다';
      const nextQuestion = data["다음 이야기를 위한 질문"] || '';
      
      // 메시지 상태를 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: introContent, isUser: false },
        ...(nextQuestion ? [{ text: nextQuestion, isUser: false }] : []) // 다음 이야기를 위한 질문만 표시
      ]);
    } catch (error) {
      console.error("첫 번째 질문 API 요청 실패:", error);
    }
  };
  

  const sendUserChatApiRequest = async (chat: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/userchat/",
        { writer, chat }
      );

      if (middleQuestionCount < 4) {
        sendMiddleQuestionApiRequest();
        setMiddleQuestionCount(middleQuestionCount + 1);
      } else {
        sendEndingQuestionApiRequest();
      }
    } catch (error) {
      console.error("사용자 채팅 API 요청 실패:", error);
    }
  };

  const sendMiddleQuestionApiRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/middlequestion/",
        { writer }
      );
      const data = response.data;
    
      // 필요한 내용만 추출
      const storyContent = data["생성된 이야기"] || '생성된 이야기가 없습니다';
      const nextQuestion = data["다음 이야기를 위한 질문"] || '';
    
      // 메시지 상태를 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: storyContent, isUser: false },
        ...(nextQuestion ? [{ text: nextQuestion, isUser: false }] : []) // 다음 이야기를 위한 질문만 표시
      ]);
    } catch (error) {
      console.error("중간 질문 API 요청 실패:", error);
    }
  };
  

  const sendEndingQuestionApiRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/endingquestion/",
        { writer }
      );
      const data = response.data;
    
      // 필요한 내용만 추출
      const storyContent = data["생성된 이야기"] || '생성된 이야기가 없습니다';
      const endingQuestion = data["엔딩을 위한 질문"] || '';
    
      // 메시지 상태를 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: storyContent, isUser: false },
        ...(endingQuestion ? [{ text: endingQuestion, isUser: false }] : []) // 엔딩을 위한 질문만 표시
      ]);
      setIsEnding(true);
    } catch (error) {
      console.error("엔딩 질문 API 요청 실패:", error);
    }
  };

  const sendUserEndingChatApiRequest = async (chat: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/userchat/",
        { writer, chat }
      );
    } catch (error) {
      console.error("사용자 채팅 API 요청 실패:", error);
    }
  };
  
  

  const sendBookStoryApiRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/bookstory/",
        { writer }
      );
      const data = response.data;

      if (data && data["동화이야기"]) {
        const fullStory = Object.values(data["동화이야기"]).join("\n\n");
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message || '스토리가 성공적으로 생성되었습니다', isUser: false },
          { text: fullStory, isUser: false }
        ]);
        setShowNextButton(true);
      } else {
        console.error('유효하지 않은 응답 형식:', data);
      }
    } catch (error) {
      console.error("동화 전체 이야기 API 요청 실패:", error);
    }
  };

  return (
    <Styles.DCBackgroundContainer>
      <C.Header currentPage={currentPage} />

      <Styles.MessagesList>
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            <Styles.MessageContainer isUser={message.isUser}>
              <Styles.UserImage isUser={message.isUser} />
              <Styles.Message isUser={message.isUser}>
                {typeof message.text === 'object'
                  ? JSON.stringify(message.text) // 객체는 문자열로 변환
                  : message.text}
              </Styles.Message>
            </Styles.MessageContainer>

            {!message.isUser &&
              index === messages.length - 1 &&
              selectedChoice === "" && (
                <Choices
                  choices={initialChoices}
                  onSelect={handleChoiceSelect}
                />
              )}
            {!message.isUser &&
              index === messages.length - 1 &&
              selectedChoice === initialChoices[1] && (
                <Choices choices={finalChoices} onSelect={handleChoiceSelect} />
              )}
            {!message.isUser &&
              index === messages.length - 1 &&
              showNextButton && (
                <Choices choices={nextChoices} onSelect={handleChoiceSelect} />
              )}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </Styles.MessagesList>
      {showChat && (
        <form onSubmit={handleSubmit}>
          <Styles.InputContainer>
            <Styles.Input
              type="text"
              placeholder="메시지를 입력해주세요"
              value={userMessage}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <Styles.Button type="submit">전송</Styles.Button>
          </Styles.InputContainer>
        </form>
      )}
    </Styles.DCBackgroundContainer>
  );
};

export default ChatDC;
