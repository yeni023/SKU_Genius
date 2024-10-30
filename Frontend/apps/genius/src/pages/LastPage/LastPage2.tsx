import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as C from "../../pages/StoryFlow/container";
import {
  Container,
  BookImageContainer,
  BookImage,
  Button1,
  Button2,
  BarcodeImage,
  ButtonWrapper,
  NewButton1,
  NewButton2,
  LastPageACImage
} from "./LastPage2";

const LastPage2 = () => {
  const { state } = useLocation(); // 전달받은 상태를 가져옴
  const { imageUrl } = state || {}; // 상태에서 이미지 URL만 추출
  const currentPage = "LastPage2";
  const navigate = useNavigate();

  const handleExitButtonClick = () => {
    navigate("/MainHome");
  };

  return (
    <Container>
      <C.Header currentPage={currentPage} />
      <BookImageContainer>
        <LastPageACImage />
        {imageUrl && <BookImage src={imageUrl} alt="Generated Story" />} {/* 생성된 이미지 표시 */}
        <Button1 onClick={() => console.log("MainButton clicked")} />
        <Button2 onClick={() => console.log("SecondaryButton clicked")} />
        <BarcodeImage />
        <ButtonWrapper>
          <NewButton1 onClick={() => console.log("BaroButton clicked")} />
          <NewButton2 onClick={handleExitButtonClick} />
        </ButtonWrapper>
      </BookImageContainer>
    </Container>
  );
};

export default LastPage2;
