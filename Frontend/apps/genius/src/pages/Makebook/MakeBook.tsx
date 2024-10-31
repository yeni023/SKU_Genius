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
    const response = await axios.post(
      "http://localhost:8000/genius/draftpage/create_content_image/",
      {
        page_num: pageNum,
        writer: writer
      }
    );

    const imageUrl = response.data.image_url;
    console.log("API Response:", response.data);

    if (imageUrl) {
      setPageImages((prevImages) => ({
        ...prevImages,
        [pageNum]: imageUrl
      }));
      setGeneratedImageUrl(imageUrl); 
      setShowNewImage(true);

      // 이미지 URL을 로컬 스토리지에 페이지 번호별로 저장
      localStorage.setItem(`image_${pageNum}`, imageUrl);
    } else {
      console.error("생성된 이미지 URL이 없습니다.");
    }
  } catch (error) {
    console.error("이미지 생성 중 오류가 발생했습니다:", error);
  } finally {
    setIsLoading(false);
    setShowOverlayContent(true);
  }
};


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
    setShowOverlayContent(true); // Reset overlay for new page
    setShowFullscreenImage(false); // Reset fullscreen image for new page
    setShowNewImage(false); // Reset new image display for new page
    setGeneratedImageUrl(null); // Clear generated image for new page
  } else if (pageCount === maxPageNum) {
    alert("마지막 페이지입니다.");
    navigate("/LastPage2", { state: { generatedImageUrl } });
  } else {
    alert("이미지를 선택할 수 있는 마지막 페이지입니다!");
  }
};

// 이전 페이지 버튼
const handlePreviousPage = () => {
  if (pageCount > 1) {
    setPageCount(prevCount => prevCount - 1);
    setShowOverlayContent(true); // Reset overlay for new page
    setShowFullscreenImage(false); // Reset fullscreen image for new page
    setShowNewImage(false); // Reset new image display for new page
    setGeneratedImageUrl(pageImages[pageCount - 1] || null); // Update to the previous page's image if available
  } else {
    alert("첫 번째 페이지입니다!");
  }
};
  // 이미지 버튼 클릭 시 전체 화면 이미지 보이기
  const handleImageButtonClick = () => {
    setShowFullscreenImage(true);
    setShowOverlayContent(true); // Display overlay on click
  };  

  // 전체 화면에서 나가기 버튼
  const handleOverlayButton1Click = () => {
    setShowFullscreenImage(false);
  };

  // 이미지 생성 버튼 클릭
  const handleOverlayButton2Click = () => {
    if (latestDraft && draftPages[latestDraft]) {
      const currentPageData = draftPages[latestDraft].find(page => page.pageNum === pageCount);
      if (currentPageData) {
        setIsLoading(true);
        handleGenerateImage(currentPageData.id, pageCount);
        setShowOverlayContent(false); // Hide overlay after image generation begins
      } else {
        console.error("현재 페이지 데이터가 없습니다. pageCount:", pageCount);
      }
    } else {
      console.error("draftPages에서 latestDraft에 대한 데이터가 없습니다.");
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
                <OverlayButton2 onClick={handleOverlayButton2Click} /> {/* MakeBookBtn2 클릭 시 스피너 시작 */}
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
          {draftPages[latestDraft]?.find(page => page.pageNum === pageCount)?.pageContent || "내용이 없습니다."}
        </TextBox>
      </TextBoxContainer>
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
      <BottomRightButton onClick={handleBottomRightButtonClick} />
    </Container>
  );
};

export default MakeBook;
