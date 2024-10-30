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
  const [draftPages, setDraftPages] = useState({});
  const [latestDraft, setLatestDraft] = useState<number | null>(null);
  const [pageImages, setPageImages] = useState({}); // 각 페이지의 이미지 URL 저장
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlayContent, setShowOverlayContent] = useState(true);
  const navigate = useNavigate();
  const [writer, setWriter] = useState(""); // writer 상태 추가
  const [nickname, setNickname] = useState(""); // nickname 상태 추가
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null); // 생성된 이미지 URL 상태 추가

  // 드래프트 페이지 불러오기
  useEffect(() => {
    const fetchDraftPages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/genius/draftpage/");
        const pages = response.data;

        // 최신 드래프트 찾기
        const drafts = Array.from(new Set(pages.map((page) => page.draft)));
        const recentDraft = Math.max(...drafts as number[]);
        setLatestDraft(recentDraft);

        // 최신 드래프트 페이지 필터링 및 그룹화
        const groupedPages = pages
          .filter(page => page.draft === recentDraft)
          .reduce((acc, page) => {
            acc[page.draft] = acc[page.draft] || [];
            acc[page.draft].push({
              id: page.id,
              pageNum: page.pageNum,
              pageContent: page.pageContent
            });
            return acc;
          }, {});

        setDraftPages(groupedPages);
      } catch (error) {
        console.error("이야기 데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchDraftPages();
  }, []);

   // 작가와 닉네임을 가져오는 useEffect
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

          // 닉네임을 가져오기
          const userResponse = await axios.get("http://localhost:8000/genius/members"); // 실제 엔드포인트로 대체
          setNickname(userResponse.data.nickname);
        }
      } catch (error) {
        console.error("작가와 닉네임을 가져오는 데 오류 발생:", error);
      }
    };

    fetchWriterAndNickname();
  }, []);

// 이미지 생성 API 호출
const handleGenerateImage = async (draftPageId: number, pageNum: number) => {
  setIsLoading(true);
  try {
    const response = await axios.post("http://localhost:8000/genius/draftpage/create_content_image/", {
      page_num: pageNum,
      writer: writer // writer를 여기서 사용
    });

    const imageUrl = response.data.image_url;

    // 페이지별 이미지 URL 저장
    setPageImages(prevImages => ({
      ...prevImages,
      [pageNum]: imageUrl // 현재 페이지 번호를 키로 사용하여 저장
    }));

    setGeneratedImageUrl(imageUrl); // 생성된 이미지 URL 상태에 저장
    setShowNewImage(true);
    setShowFullscreenImage(false);
  } catch (error) {
    console.error("이미지 생성 중 오류가 발생했습니다:", error);
  } finally {
    setIsLoading(false);
  }
};


// 페이지의 마지막 pageNum 찾기
const getMaxPageNum = () => {
  return latestDraft && draftPages[latestDraft]
    ? Math.max(...draftPages[latestDraft].map(page => page.pageNum))
    : 0;
};

// 다음 페이지 버튼
const handleNextPage = () => {
  const maxPageNum = getMaxPageNum();
  if (pageCount < maxPageNum) {
    setPageCount(prevCount => prevCount + 1);
    setShowNewImage(false);
    setShowOverlayContent(true);
    setGeneratedImageUrl(pageImages[pageCount + 1]); // 다음 페이지의 이미지를 보여주기 위해 URL 업데이트
  } else if (pageCount === maxPageNum) {
    navigate("/LastPage2");
  } else {
    alert("이미지를 선택할 수 있는 마지막 페이지입니다!");
  }
};

  // 이전 페이지 버튼
  const handlePreviousPage = () => {
    if (pageCount > 0) {
      setPageCount(prevCount => prevCount - 1);
      setGeneratedImageUrl(pageImages[pageCount - 1]); // 이전 페이지의 이미지를 보여주기 위해 URL 업데이트
    } else {
      alert("첫 번째 페이지입니다!");
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
      const currentPageData = draftPages[latestDraft].find(page => page.pageNum === pageCount);
      console.log("Current Page Data:", currentPageData);
      if (currentPageData) {
        handleGenerateImage(currentPageData.id, pageCount); // writer 변수 제거
        setShowOverlayContent(false);
      }
    }
  };

  // BottomRightButton 클릭 시 처리 로직
  const handleBottomRightButtonClick = async () => {
    if (generatedImageUrl) {
      setGeneratedImageUrl(null);
      setShowNewImage(false);
      setIsLoading(true);
  
      if (latestDraft && draftPages[latestDraft]) {
        const currentPageData = draftPages[latestDraft].find(page => page.pageNum === pageCount);
        if (currentPageData) {
          await handleGenerateImage(currentPageData.id, pageCount); // 이미지 다시 생성
        }
      }
    } else {
      alert("생성한 이미지가 없습니다. 버튼을 클릭하여 이미지를 생성해주세요.");
    }
  };
  

  // 전체 화면에서 스크롤 잠금 관리
  useEffect(() => {
    document.body.style.overflow = showFullscreenImage ? "hidden" : "auto";
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
          <ArrowButton onClick={handlePreviousPage} style={{ left: "150px", right: "auto" }}>
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
      // 이미지 URL을 렌더링하는 부분 수정
<ImageTextBox>
  {isLoading ? (
    <SpinnerContainer>
      <img src={spinner} alt="로딩 중..." />
    </SpinnerContainer>
  ) : showNewImage && generatedImageUrl ? (
    <NewImage imageUrl={generatedImageUrl} />
  ) : (
    // 페이지별 이미지 렌더링
    pageImages[pageCount] ? (
      <NewImage imageUrl={pageImages[pageCount]} /> // 저장된 페이지별 이미지 보여주기
    ) : (
      <ImageButton onClick={handleImageButtonClick} />
    )
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
