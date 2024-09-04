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
  const [messages, setMessages] = useState(initialMessages("김혜진"));
  const [userMessage, setUserMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [middleQuestionCount, setMiddleQuestionCount] = useState(0); // 중반 질문 카운터 추가
  const [isEnding, setIsEnding] = useState(false); // 엔딩 질문 상태 추가
  const [showNextButton, setShowNextButton] = useState(false); // 다음 버튼 상태 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const nickname = "김혜진"; // 하드코딩된 닉네임
  const currentPage = "ChatDC";

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
      sendFirstApiRequest(nickname);
    } else if (choice === finalChoices[0]) {
      navigate("/MainHome");
    } else if (choice == nextChoices[0]) {
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
        sendBookStoryApiRequest(nickname);
      } else {
        sendUserChatApiRequest(nickname, userMessage.trim());
      }
    }
  };

  const sendFirstApiRequest = async (nickname: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/firstquestion/",
        {
          nickname
        }
      );
      const data = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.IntroContent, isUser: false }
      ]);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  const sendUserChatApiRequest = async (nickname: string, chat: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/userchat/",
        {
          nickname,
          chat
        }
      );

      // 중반 질문 카운터 체크
      if (middleQuestionCount < 2) {
        sendMiddleQuestionApiRequest(nickname);
        setMiddleQuestionCount(middleQuestionCount + 1);
      } else {
        sendEndingQuestionApiRequest(nickname);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  const sendMiddleQuestionApiRequest = async (nickname: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/middlequestion/",
        {
          nickname
        }
      );
      const data = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data["만들어진 이야기"], isUser: false }
      ]);
    } catch (error) {
      console.error("중반 질문 API 요청 실패:", error);
    }
  };

  const sendEndingQuestionApiRequest = async (nickname: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/endingquestion/",
        {
          nickname
        }
      );
      const data = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data["만들어진 이야기"], isUser: false }
      ]);
      setIsEnding(true); // 엔딩 질문 상태 활성화
    } catch (error) {
      console.error("엔딩 질문 API 요청 실패:", error);
    }
  };

  const sendBookStoryApiRequest = async (nickname: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/intro/bookstory/",
        {
          nickname
        }
      );
      const data = response.data;

      // 동화책 내용을 하나의 문자열로 결합
      const fullStory = Object.values(data["동화이야기"]).join("\n\n");

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, isUser: false },
        { text: fullStory, isUser: false }
      ]);
      setShowNextButton(true); // 다음 버튼 표시
    } catch (error) {
      console.error("동화책 생성 API 요청 실패:", error);
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
                {message.text}
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
              placeholder="달콩이에게 보낼 메시지를 입력해주세요"
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
