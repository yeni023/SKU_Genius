import React, { useState, useEffect } from 'react';
import * as C from "../../pages/StoryFlow/container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  GenreTitle,
  ImageWrapper,
  Image,
  Wrapper,
  ButtonText
} from "./genre";
import book from "../../assets/images/book.svg";
import castle from "../../assets/images/castle.svg";
import full_story from "../../assets/images/full_story.svg";
import ghost from "../../assets/images/ghost.svg";

const Genre = () => {
  const currentPage = "GenrePage";
  const navigate = useNavigate();
  
  const [writerName, setWriterName] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 데이터 읽어오기
    const storedWriterName = localStorage.getItem('writerName');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedWriterName) {
      setWriterName(storedWriterName);
    }
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const handleButtonClick = async (type: string) => {
    if (writerName === '' || userId === null) {
      console.error('작가명 또는 사용자 ID가 유효하지 않습니다.');
      return;
    }

    try {
      console.log(`Sending genre: ${type}`);

      // 요청 데이터 구성
      const requestData = {
        diff: 0, 
        writer: writerName,
        genre: type,
        user: userId
      };

      // API 요청 보내기
      const response = await axios.post("http://localhost:8000/genius/draft/", requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting genre:", error);
    } finally {
      navigate("/BasicInfo");
    }
  };  

  return (
    <Container>
      <C.Header currentPage={currentPage} />
      <Wrapper>
        <GenreTitle>어떤 동화를 만들고 싶어?</GenreTitle>
        <ImageWrapper>
          <div>
            <Image
              src={castle}
              alt="castle"
              onClick={() => handleButtonClick("fantasy")}
            />
            <ButtonText onClick={() => handleButtonClick("fantasy")}>
              판타지 동화 만들기
            </ButtonText>
          </div>
          <div>
            <Image
              src={book}
              alt="book"
              onClick={() => handleButtonClick("learning")}
            />
            <ButtonText onClick={() => handleButtonClick("learning")}>
              학습 동화 만들기
            </ButtonText>
          </div>
          <div>
            <Image
              src={ghost}
              alt="ghost"
              onClick={() => handleButtonClick("horror")}
            />
            <ButtonText onClick={() => handleButtonClick("horror")}>
              공포 동화 만들기
            </ButtonText>
          </div>
          <div>
            <Image
              src={full_story}
              alt="full-story"
              onClick={() => handleButtonClick("folktale")}
            />
            <ButtonText onClick={() => handleButtonClick("folktale")}>
              전래 동화 만들기
            </ButtonText>
          </div>
        </ImageWrapper>
      </Wrapper>
    </Container>
  );
};

export default Genre;
