import * as C from "../StoryFlow/container";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Container,
  BookImage,
  BookImageContainer,
  TextBox,
  TextBoxContainer,
  ImageButton,
  ImageTextBox,
  TextImageContainer,
  TextImage,
  CustomButton,
  CustomButton2,
  ButtonWrapper,
  FullscreenImage,
  MakeBookImage,
  OverlayButtonWrapper,
  OverlayButton1,
  OverlayButton2,
  NewImage,
  BottomRightButton,
  ArrowButton,
  Arrow_Image
} from "./MakeBook";

import right from "../../assets/images/right.svg";
import left from "../../assets/images/left.svg";
import BookCover from "../../assets/images/BookCover.jpg";
import BookCover2 from "../../assets/images/BookCover2.jpg";
import BookCover3 from "../../assets/images/BookCover3.jpg";
import BookCover4 from "../../assets/images/BookCover4.jpg";
import BookCover5 from "../../assets/images/BookCover5.jpg";
import BookCover6 from "../../assets/images/BookCover6.jpg";
import BookCover7 from "../../assets/images/BookCover7.jpg";

// 이미지 배열
const images = [
  BookCover,
  BookCover2,
  BookCover3,
  BookCover4,
  BookCover5,
  BookCover6,
  BookCover7
];

const MakeBook = () => {
  const currentPage = "MakeBook";
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const [showImageButton, setShowImageButton] = useState(true);
  const [showNewImage, setShowNewImage] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [draftPages, setDraftPages] = useState<{ [key: number]: { pageNum: number; pageContent: string }[] }>({});
  const [latestDraft, setLatestDraft] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDraftPages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/genius/draftpage/");
        const pages = response.data;

        // 최신 드래프트 찾기
        const drafts = Array.from(new Set(pages.map((page: { draft: number }) => page.draft)));
        const recentDraft = Math.max(...(drafts as number[]));
        setLatestDraft(recentDraft);

        // 최신 드래프트 페이지 필터링
        const filteredPages = pages.filter((page: { draft: number }) => page.draft === recentDraft);
        const groupedPages = filteredPages.reduce((acc: { [key: number]: { pageNum: number; pageContent: string }[] }, page: { pageNum: number; pageContent: string; draft: number }) => {
          if (!acc[page.draft]) {
            acc[page.draft] = [];
          }
          acc[page.draft].push({ pageNum: page.pageNum, pageContent: page.pageContent });
          return acc;
        }, {});

        setDraftPages(groupedPages);
      } catch (error) {
        console.error("이야기 데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchDraftPages();
  }, []);

  const handleNextPage = () => {
    if (pageCount === 6) {
      alert("이미지를 선택할 수 있는 마지막 페이지입니다!");
    }
    if (pageCount < 7) {
      setPageCount((prevCount) => prevCount + 1);
      if (showNewImage) {
        setShowNewImage(false);
        setShowImageButton(true);
      }
    } else {
      navigate("/LastPage2");
    }
  };

  const handlePreviousPage = () => {
    if (pageCount > 1) {
      setPageCount((prevCount) => prevCount - 1);
    }
  };

  const handleImageClick = (type: string) => {
    console.log(` ${type}`);
  };

  const handleImageButtonClick = () => {
    setShowFullscreenImage(true);
  };

  const handleCustomButtonClick = () => {
    console.log("Custom button clicked");
  };

  const handleCustomButton2Click = () => {
    console.log("Custom button 2 clicked");
  };

  const handleOverlayButton1Click = () => {
    setShowFullscreenImage(false);
  };

  const handleOverlayButton2Click = () => {
    setShowImageButton(false);
    setShowNewImage(true);
    setShowFullscreenImage(false);
  };

  const handleBottomRightButtonClick = () => {
    setShowImageButton(true);
    setShowNewImage(false);
  };

  useEffect(() => {
    if (showFullscreenImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullscreenImage]);

  if (latestDraft === null) {
    return <p>로딩 중...</p>;
  }

  return (
    <Container>
      <C.Header currentPage={currentPage} />
      {showFullscreenImage && !showNewImage && (
        <>
          <FullscreenImage />
          <MakeBookImage />
          <OverlayButtonWrapper>
            <OverlayButton1 onClick={handleOverlayButton1Click} />
            <OverlayButton2 onClick={handleOverlayButton2Click} />
          </OverlayButtonWrapper>
        </>
      )}
      <BookImageContainer>
        <BookImage onClick={() => handleImageClick("BookImage")} />
        {pageCount > 1 && (
          <ArrowButton
            onClick={handlePreviousPage}
            style={{ left: "150px", right: "auto" }}
          >
            <Arrow_Image src={left} alt="left" />
          </ArrowButton>
        )}
        <ArrowButton onClick={handleNextPage}>
          <Arrow_Image src={right} alt="right" />
        </ArrowButton>
      </BookImageContainer>
      <TextBoxContainer>
        <TextBox>
          {draftPages[latestDraft]?.find(page => page.pageNum === pageCount)?.pageContent || "내용이 없습니다."}
        </TextBox>
      </TextBoxContainer>
      <ImageTextBox>
        {showImageButton ? (
          <ImageButton onClick={handleImageButtonClick}></ImageButton>
        ) : (
          showNewImage && (
            <NewImage
              style={{ backgroundImage: `url(${images[pageCount - 1]})` }}
            />
          )
        )}
      </ImageTextBox>
      <TextImageContainer>
        <TextImage onClick={() => handleImageClick("TextImage")} />
      </TextImageContainer>
      <ButtonWrapper>
        <CustomButton onClick={handleCustomButtonClick}></CustomButton>
        <CustomButton2 onClick={handleCustomButton2Click}></CustomButton2>
      </ButtonWrapper>
      <BottomRightButton onClick={handleBottomRightButtonClick} />
    </Container>
  );
};

export default MakeBook;
