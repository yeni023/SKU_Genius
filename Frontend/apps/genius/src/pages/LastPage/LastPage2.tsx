import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  TextBox,
  BookImage,
  ButtonWrapper,
  CustomButton,
  LoadingText,
  ImageBox
} from "./LastPage2";
import spinner from "../../assets/images/Spinner_MakeBook.gif"; // Spinner image

const LastPage2 = () => {
  const [draftPages, setDraftPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDraftPages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/genius/draftpage/"
        );
        const pages = response.data;

        const recentDraftPages = pages
          .filter(
            (page) => page.draft === Math.max(...pages.map((p) => p.draft))
          )
          .sort((a, b) => a.pageNum - b.pageNum);

        const pagesWithImages = recentDraftPages.map((page) => {
          const storedImage = localStorage.getItem(`image_${page.pageNum}`);
          return {
            ...page,
            imageUrl: storedImage || page.imageUrl
          };
        });

        setDraftPages(pagesWithImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading draft data:", error);
        setIsLoading(false);
      }
    };

    fetchDraftPages();
  }, []);

  const handleEndClick = () => {
    toast(<strong>메인 화면으로 이동합니다!</strong>);
    setTimeout(() => {
      navigate("/MainHome");
    }, 4000); // Adjust the delay as needed to ensure the toast is visible
  };

  if (isLoading) {
    return <img src={spinner} alt="Loading" />;
  }

  const currentDraftPage = draftPages[currentPage];

  return (
    <Container>
      <Navbar />
      <BookImage>
        {currentDraftPage && currentDraftPage.imageUrl ? (
          <ImageBox>
            <img
              src={currentDraftPage.imageUrl}
              alt="Story page image"
              style={{ width: "100%", height: "100%" }}
            />
          </ImageBox>
        ) : (
          <LoadingText>No image available</LoadingText>
        )}
        <TextBox>
          {currentDraftPage ? currentDraftPage.pageContent : "No content available"}
        </TextBox>
      </BookImage>
      <ButtonWrapper>
        <CustomButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          이전
        </CustomButton>
        <CustomButton
          onClick={() =>
            currentPage >= draftPages.length - 1
              ? handleEndClick()
              : setCurrentPage(currentPage + 1)
          }
        >
          {currentPage >= draftPages.length - 1 ? "종료" : "다음"}
        </CustomButton>
      </ButtonWrapper>
      <ToastContainer position="top-center" autoClose={4000} />
    </Container>
  );
};

export default LastPage2;
