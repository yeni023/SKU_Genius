import * as C from "../StoryFlow/container";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  Arrow_Image,
  SpinnerContainer2
} from "./MakeBook2";
import right from "../../assets/images/right.svg";
import left from "../../assets/images/left.svg";
import spinner from "../../assets/images/Spinner_MakeBook2.gif"; // 스피너 이미지

const MakeBook2 = () => {
  const currentPage = "MakeBook2";
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const [showImageButton, setShowImageButton] = useState(true);
  const [showNewImage, setShowNewImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [pageImages, setPageImages] = useState<{ [key: number]: string }>({});
  const [allPageContents, setAllPageContents] = useState<
    { pageContent: string }[]
  >([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const navigate = useNavigate();
  const writer = "User's writer name"; // 실제로 사용할 때 API나 상태에서 받아온 작가 이름 설정

  // Fetch storybook content API
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/genius/draftpage",
          {
            params: { writer: writer }
          }
        );

        const pageData = response.data;
        if (pageData && pageData.length > 0) {
          // Filter out unwanted characters like [,] from the content
          const sanitizedData = pageData.map(
            (item: { pageContent: string }) => ({
              ...item,
              pageContent: item.pageContent.replace(/[\[\]]/g, "") // Remove [ and ]
            })
          );

          setAllPageContents(sanitizedData); // Save sanitized data
          setCurrentPageIndex(0); // Start from the first page
        } else {
          setAllPageContents([{ pageContent: "No content available." }]);
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
        setAllPageContents([{ pageContent: "Failed to load content." }]);
      }
    };

    fetchPageContent();
  }, [writer]);

  // Functions to handle next and previous page navigation
  const handleNextPage = () => {
    if (currentPageIndex < allPageContents.length - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === allPageContents.length - 1;

  // 이미지 생성 API 호출
  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/draftpage/create_content_image/",
        {
          page_num: currentPageIndex + 1, // 페이지 번호를 전달
          writer: writer // 작가 이름을 전달
        }
      );

      const imageUrl = response.data.image_url;
      console.log("API Response:", response.data);

      if (imageUrl) {
        setPageImages((prevImages) => ({
          ...prevImages,
          [currentPageIndex]: imageUrl
        }));
        setGeneratedImageUrl(imageUrl); // 생성된 이미지 URL 저장
        setShowNewImage(true); // 새 이미지 표시
      } else {
        console.error("생성된 이미지 URL이 없습니다.");
      }
    } catch (error) {
      console.error("이미지 생성 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageButtonClick = () => {
    setShowFullscreenImage(true);
  };

  const handleOverlayButton1Click = () => {
    setShowFullscreenImage(false);
  };

  const handleOverlayButton2Click = () => {
    handleGenerateImage(); // 이미지 생성 버튼 클릭 시 호출
  };

  return (
    <Container>
      <C.Header2 currentPage={currentPage} />
      {showFullscreenImage && !showNewImage && (
        <>
          <FullscreenImage />
          <MakeBookImage />
          <OverlayButtonWrapper>
            <OverlayButton1 onClick={handleOverlayButton1Click} />
            <OverlayButton2 onClick={handleOverlayButton2Click} />{" "}
            {/* MakeBookBtn2 클릭 시 스피너 시작 */}
          </OverlayButtonWrapper>
        </>
      )}
      <BookImageContainer>
        <BookImage onClick={handleImageButtonClick} />
        {allPageContents.length > 1 && (
          <>
            {/* Previous Page Button */}
            <ArrowButton
              onClick={handlePreviousPage}
              style={{ left: "150px", right: "auto" }}
              disabled={isFirstPage}
            >
              <Arrow_Image src={left} alt="left" />
            </ArrowButton>

            {/* Next Page Button */}
            <ArrowButton onClick={handleNextPage} disabled={isLastPage}>
              <Arrow_Image src={right} alt="right" />
            </ArrowButton>
          </>
        )}
      </BookImageContainer>
      <TextBoxContainer>
        <TextBox>
          {allPageContents.length > 0
            ? allPageContents[currentPageIndex].pageContent
            : "Loading..."}
        </TextBox>
      </TextBoxContainer>
      <ImageTextBox>
        {isLoading ? (
          <SpinnerContainer2>
            <img src={spinner} alt="로딩 중..." />
          </SpinnerContainer2>
        ) : showNewImage && generatedImageUrl ? (
          <NewImage imageUrl={generatedImageUrl} />
        ) : (
          <ImageButton onClick={handleImageButtonClick} />
        )}
      </ImageTextBox>
      <TextImageContainer>
        <TextImage onClick={() => console.log("TextImage clicked")} />
      </TextImageContainer>
      <ButtonWrapper>
        <CustomButton
          onClick={() => console.log("Custom button clicked")}
        ></CustomButton>
        <CustomButton2
          onClick={() => console.log("Custom button 2 clicked")}
        ></CustomButton2>
      </ButtonWrapper>
      <BottomRightButton
        onClick={() => console.log("BottomRightButton clicked")}
      />
    </Container>
  );
};

export default MakeBook2;
