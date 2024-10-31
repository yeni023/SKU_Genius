import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 추가
import * as C from "../../pages/StoryFlow/container";
import * as S from "./RoadingStyle";
import axios from "axios"; // axios를 추가

const ThemeRoading: React.FC = () => {
  const [writer, setWriter] = useState(""); // writer 상태 추가
  const messages = [
    `${writer}(이)가 선택한 장르를\n바탕으로 주제를 만들어볼게`,
    "잠깐만 기다려\n주제가 만들어지고 있어\n......"
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const navigate = useNavigate(); // 페이지 이동 함수 사용

  useEffect(() => {
    // writer 데이터를 받아오는 함수
    const fetchWriter = async () => {
      try {
        const response = await axios.get("http://localhost:8000/genius/draft/");
        const drafts = response.data;
        if (drafts.length > 0) {
          const latestDraft = drafts.reduce((latest, draft) => {
            return new Date(draft.savedAt) > new Date(latest.savedAt)
              ? draft
              : latest;
          }, drafts[0]);
          setWriter(latestDraft.writer); // writer 상태 설정
        }
      } catch (error) {
        console.error("작가 데이터를 가져오는 데 오류 발생:", error);
      }
    };

    fetchWriter();
  }, []); // 빈 배열로 useEffect를 한 번만 실행

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);
    // 일정 시간 후에 페이지 이동
    const timer = setTimeout(() => {
      navigate("/ThemePage"); // 페이지로 이동
    }, 25000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer); // 컴포넌트 unmount 시 타이머 제거
    };
  }, [messages.length, navigate]);

  const currentPage = "ThemePage";

  return (
    <S.AContainer>
      <C.Header2 currentPage={currentPage} />
      <S.Label>{messages[messageIndex]}</S.Label> <S.DC />
    </S.AContainer>
  );
};

export default ThemeRoading;
