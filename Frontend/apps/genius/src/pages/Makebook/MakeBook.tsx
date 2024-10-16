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
  SpinnerContainer
} from "./MakeBook";
import right from "../../assets/images/right.svg";
import left from "../../assets/images/left.svg";
import spinner from "../../assets/images/Spinner_MakeBook.gif"; // 스피너 이미지

const MakeBook = () => {
  const currentPage = "MakeBook";
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const [showImageButton, setShowImageButton] = useState(true);
  const [showNewImage, setShowNewImage] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [draftPages, setDraftPages] = useState<{
    [key: number]: { id: number; pageNum: number; pageContent: string }[];
  }>({});
  const [latestDraft, setLatestDraft] = useState<number | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  ); // 생성된 이미지 URL
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [showOverlayContent, setShowOverlayContent] = useState(true); // Overlay 컨텐츠 보이기/숨기기 상태
  const navigate = useNavigate();

  // 드래프트 페이지 불러오기
  useEffect(() => {
    const fetchDraftPages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/genius/draftpage/"
        );
        const pages = response.data;

        // 최신 드래프트 찾기
        const drafts = Array.from(
          new Set(pages.map((page: { draft: number }) => page.draft))
        );
        const recentDraft = Math.max(...(drafts as number[]));
        setLatestDraft(recentDraft);

        // 최신 드래프트 페이지 필터링
        const filteredPages = pages.filter(
          (page: { draft: number }) => page.draft === recentDraft
        );
        const groupedPages = filteredPages.reduce(
          (
            acc: {
              [key: number]: {
                id: number;
                pageNum: number;
                pageContent: string;
              }[];
            },
            page: {
              id: number;
              pageNum: number;
              pageContent: string;
              draft: number;
            }
          ) => {
            if (!acc[page.draft]) {
              acc[page.draft] = [];
            }
            acc[page.draft].push({
              id: page.id, // DraftPage의 id값
              pageNum: page.pageNum,
              pageContent: page.pageContent
            });
            return acc;
          },
          {}
        );

        setDraftPages(groupedPages);
      } catch (error) {
        console.error(
          "이야기 데이터를 불러오는 중 오류가 발생했습니다.",
          error
        );
      }
    };

    fetchDraftPages();
  }, []);

  // 이미지 생성 API 호출
  const handleGenerateImage = async (draftPageId: number) => {
    setIsLoading(true); // 로딩 시작
    try {
      const response = await axios.post(
        "http://localhost:8000/genius/draftpage/create_content_image/",
        {
          page_id: draftPageId
        }
      );
      const imageUrl = response.data.image_url;
      console.log("Generated Image URL:", imageUrl);
      setGeneratedImageUrl(imageUrl);
      setShowNewImage(true);
      setShowFullscreenImage(false);
    } catch (error) {
      console.error("An error occurred while creating the image:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  // 페이지의 마지막 pageNum 찾기
  const getMaxPageNum = () => {
    if (latestDraft && draftPages[latestDraft]) {
      return Math.max(...draftPages[latestDraft].map((page) => page.pageNum));
    }
    return 0;
  };

  // 다음 페이지 버튼
  const handleNextPage = () => {
    const maxPageNum = getMaxPageNum();
    if (pageCount === maxPageNum - 1) {
      alert("이미지를 선택할 수 있는 마지막 페이지입니다!");
    }
    if (pageCount < maxPageNum) {
      setPageCount((prevCount) => prevCount + 1);
      setShowNewImage(false);
      setShowOverlayContent(true); // 다음 페이지로 이동 시 Overlay 요소 다시 보이기
    } else if (pageCount === maxPageNum) {
      navigate("/LastPage2");
    }
  };

  // 이전 페이지 버튼
  const handlePreviousPage = () => {
    if (pageCount > 1) {
      setPageCount((prevCount) => prevCount - 1);
      setShowOverlayContent(true); // 이전 페이지로 이동 시 Overlay 요소 다시 보이기
    }
  };

  // 이미지 버튼 클릭 시 전체 화면 이미지 보이기
  const handleImageButtonClick = () => {
    setShowFullscreenImage(true);
  };

  // 전체 화면에서 나가기 버튼
  const handleOverlayButton1Click = () => {
    setShowFullscreenImage(false);
  };

  // 이미지 생성 버튼 클릭
  const handleOverlayButton2Click = () => {
    if (latestDraft && draftPages[latestDraft]) {
      const currentPageData = draftPages[latestDraft].find(
        (page) => page.pageNum === pageCount
      );
      console.log("Current Page Data:", currentPageData); // 현재 페이지 데이터 출력
      if (currentPageData) {
        handleGenerateImage(currentPageData.id); // DraftPage의 id값으로 이미지 생성 API 호출
        setShowOverlayContent(false); // OverlayButton2 클릭 시 Overlay 요소를 숨김
      }
    }
  };

  // BottomRightButton 클릭 시 처리 로직
  const handleBottomRightButtonClick = async () => {
    if (generatedImageUrl) {
      // 생성된 이미지가 있을 경우 이미지를 삭제하고 새로 생성
      setGeneratedImageUrl(null);
      setShowNewImage(false);
      setIsLoading(true); // 새로운 이미지 생성 시 로딩
      if (latestDraft && draftPages[latestDraft]) {
        const currentPageData = draftPages[latestDraft].find(
          (page) => page.pageNum === pageCount
        );
        if (currentPageData) {
          await handleGenerateImage(currentPageData.id); // 이미지 다시 생성
        }
      }
    } else {
      // 생성된 이미지가 없을 경우 알림 팝업 표시
      alert("생성한 이미지가 없습니다. 버튼을 클릭하여 이미지를 생성해주세요.");
    }
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
          {showOverlayContent && (
            <>
              <MakeBookImage />
              <OverlayButtonWrapper>
                <OverlayButton1 onClick={handleOverlayButton1Click} />
                <OverlayButton2 onClick={handleOverlayButton2Click} />
              </OverlayButtonWrapper>
            </>
          )}
        </>
      )}
      <BookImageContainer>
        <BookImage onClick={handleImageButtonClick} />
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
          {draftPages[latestDraft]?.find((page) => page.pageNum === pageCount)
            ?.pageContent || "내용이 없습니다."}
        </TextBox>
      </TextBoxContainer>
      <ImageTextBox>
        {isLoading ? (
          // 로딩 중일 때 중앙에 스피너 표시
          <SpinnerContainer>
            <img src={spinner} alt="로딩 중..." />
          </SpinnerContainer>
        ) : showNewImage && generatedImageUrl ? (
          <NewImage imageUrl={generatedImageUrl} />
        ) : (
          <ImageButton onClick={handleImageButtonClick}></ImageButton>
        )}
      </ImageTextBox>
      <TextImageContainer>
        <TextImage onClick={() => console.log("TextImage clicked")} />
      </TextImageContainer>
      <ButtonWrapper>
        <CustomButton onClick={() => console.log("Custom button clicked")} />
        <CustomButton2 onClick={() => console.log("Custom button 2 clicked")} />
      </ButtonWrapper>
      <BottomRightButton onClick={handleBottomRightButtonClick} />
    </Container>
  );
};

export default MakeBook;
