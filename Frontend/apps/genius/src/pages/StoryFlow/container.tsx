import React, { useState, useEffect } from "react";
import * as S from "./styles";

import { LogoImage } from "./styles";
import logoImage from "../../assets/images/logo.png";
import Story1 from "../../assets/images/Story1.svg";
import Story2 from "../../assets/images/Story2.svg";
import Story3 from "../../assets/images/Story3.svg";
import Story4 from "../../assets/images/Story4.svg";
import Story5 from "../../assets/images/Story5.svg";
import Story6 from "../../assets/images/Story6.svg";
import Story7 from "../../assets/images/Story7.svg";
import axios from "axios";

type HeaderElementsType = {
  text1: string;
  text2: string;
  size: number;
  color: string;
  action: () => void;
};

// DalKong Header 시작
const HeaderElementsData: HeaderElementsType[] = [
  {
    text1: "STEP 1",
    text2: "장르 선택",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(0);
      console.log("장르 선택");
    }
  },
  {
    text1: "STEP 2",
    text2: "정보 입력",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(1);
      console.log("정보 입력");
    }
  },
  {
    text1: "STEP 3",
    text2: "이야기 생성",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(2);
      console.log("이야기 생성");
    }
  },
  {
    text1: "STEP 4",
    text2: "이야기 확인",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(3);
      console.log("이야기 확인");
    }
  }
];

const HeaderElementText = ({
  text1,
  text2,
  size,
  color,
  highlight
}: {
  text1: string;
  text2: string;
  size: number;
  color: string;
  highlight: boolean;
}) => {
  return (
    <S.HeaderElement
      style={{
        backgroundColor: highlight ? "rgba(208, 87, 169, 0.25)" : "transparent",
        width: "100px",
        height: "70px",
        padding: "0 10px",
        borderRadius: "10px",
        margin: "0 5px"
      }}
    >
      <div>
        <p style={{ fontSize: size, color: color }}>{text1}</p>
        <p style={{ fontSize: size, color: color }}>{text2}</p>
      </div>
    </S.HeaderElement>
  );
};

// DalKong Header 여기 함수까지
export const Header = ({ currentPage }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  useEffect(() => {
    if (currentPage === "GenrePage") {
      setSelectedStepIndex(0);
    } else if (currentPage === "MakeBook") {
      setSelectedStepIndex(3);
    } else if (currentPage === "ChatDC") {
      setSelectedStepIndex(2);
    } else if (currentPage === "BasicInfo") {
      setSelectedStepIndex(1);
    } else if (currentPage === "DCRoading") {
      setSelectedStepIndex(2);
    } else if (currentPage === "LastPage2") {
      setSelectedStepIndex(3);
    } else if (currentPage === "MakeBook") {
      setSelectedStepIndex(3);
    } else if (currentPage === "StoryFlow") {
      setSelectedStepIndex(3);
    }
  }, [currentPage]);
  return (
    <S.Header>
      <LogoImage src={logoImage} alt="Logo" style={{ marginRight: "10px" }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        {HeaderElementsData.map((data, index) => (
          <>
            <div key={index}>
              <HeaderElementText
                text1={data.text1}
                text2={data.text2}
                size={data.size}
                color={data.color}
                highlight={selectedStepIndex === index}
              />
            </div>
            {index < HeaderElementsData.length - 1 && (
              // 마지막 단계 이후가 아니라면 검정색 화살표 추가
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#9D9D9D",
                  width: "40px",
                  textAlign: "center"
                }}
              >
                {">"}
              </div>
            )}
          </>
        ))}
      </div>
    </S.Header>
  );
};

// 여기에서부터 AC Header
type HeaderElementsType2 = {
  text1: string;
  text2: string;
  size: number;
  color: string;
  action: () => void;
};

const HeaderElementsData2: HeaderElementsType2[] = [
  {
    text1: "STEP 1",
    text2: "장르 선택",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(0);
      console.log("장르 선택");
    }
  },
  {
    text1: "STEP 2",
    text2: "주제 선택",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(1);
      console.log("주제 선택");
    }
  },
  {
    text1: "STEP 3",
    text2: "이야기 생성",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(2);
      console.log("이야기 생성");
    }
  },
  {
    text1: "STEP 4",
    text2: "이야기 확인",
    size: 17,
    color: "#9D9D9D",
    action: () => {
      setSelectedStepIndex(3);
      console.log("이야기 확인");
    }
  }
];

const HeaderElementText2 = ({
  text1,
  text2,
  size,
  color,
  highlight
}: {
  text1: string;
  text2: string;
  size: number;
  color: string;
  highlight: boolean;
}) => {
  return (
    <S.HeaderElement
      style={{
        backgroundColor: highlight ? "rgba(171, 225, 209, 0.5)" : "transparent",
        width: "100px",
        height: "70px",
        padding: "0 10px",
        borderRadius: "10px",
        margin: "0 5px"
      }}
    >
      <div>
        <p style={{ fontSize: size, color: color }}>{text1}</p>
        <p style={{ fontSize: size, color: color }}>{text2}</p>
      </div>
    </S.HeaderElement>
  );
};

export const Header2 = ({ currentPage }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  useEffect(() => {
    if (currentPage === "Genre2") {
      setSelectedStepIndex(0);
    } else if (currentPage === "MakeBook2") {
      setSelectedStepIndex(3);
    } else if (currentPage === "ThemePage") {
      setSelectedStepIndex(1);
    } else if (currentPage === "ThemePageNext") {
      setSelectedStepIndex(1);
    } else if (currentPage === "SelectLevel") {
      setSelectedStepIndex(2);
    } else if (currentPage === "ConfirmLevel") {
      setSelectedStepIndex(2);
    } else if (currentPage === "ChatAC") {
      setSelectedStepIndex(2);
    } else if (currentPage === "ACRoading") {
      setSelectedStepIndex(2);
    } else if (currentPage === "StoryFlow2") {
      setSelectedStepIndex(3);
    } else if (currentPage === "LastPage") {
      setSelectedStepIndex(3);
    }
  }, [currentPage]);
  return (
    <S.Header2>
      <LogoImage src={logoImage} alt="Logo" style={{ marginRight: "10px" }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        {HeaderElementsData2.map((data, index) => (
          <>
            <div key={index}>
              <HeaderElementText2
                text1={data.text1}
                text2={data.text2}
                size={data.size}
                color={data.color}
                highlight={selectedStepIndex === index}
              />
            </div>
            {index < HeaderElementsData2.length - 1 && (
              // 마지막 단계 이후가 아니라면 검정색 화살표 추가
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#9D9D9D",
                  width: "40px",
                  textAlign: "center"
                }}
              >
                {">"}
              </div>
            )}
          </>
        ))}
      </div>
    </S.Header2>
  );
};

export const Content1 = () => {
  const [subject, setSubject] = useState<string>('로딩 중...');
  const [introContent, setIntroContent] = useState<string>('로딩 중...');
  const [latestDraft, setLatestDraft] = useState<number | null>(null);

  useEffect(() => {
    const fetchLatestDraft = async () => {
      try {
        // 최신 draft 번호 가져오기
        const response = await axios.get("http://localhost:8000/genius/draft/");
        const drafts = response.data;
    
        if (Array.isArray(drafts) && drafts.length > 0) {
          console.log('응답 데이터:', drafts); // 응답 데이터 전체 출력
          const latestDraftEntry = drafts.reduce((prev: any, current: any) => {
            return new Date(current.savedAt) > new Date(prev.savedAt) ? current : prev;
          });
    
          console.log('최신 draft 항목:', latestDraftEntry); // 최신 draft 항목 출력
          console.log('최신 draft 번호:', latestDraftEntry.id); // draft 번호가 `id`에 저장되는지 확인
    
          setLatestDraft(latestDraftEntry.id); // 최신 draft 번호를 설정
        } else {
          console.error('응답 데이터가 배열이 아니거나 비어 있습니다.');
        }
      } catch (error) {
        console.error('최신 draft 번호를 가져오는 중 오류가 발생했습니다:', error);
      }
    };
    

    fetchLatestDraft();
  }, []);

  useEffect(() => {
    const fetchSubject = async () => {
      if (latestDraft === null) return;

      try {
        // 최신 draft 번호를 사용하여 주제 가져오기
        const response = await axios.get(`http://localhost:8000/genius/intro/`);
        console.log('응답 데이터:', response.data); // 콘솔 로그 추가
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          // 최신 draft에 해당하는 항목 찾기
          const introData = data.find((item: { draft: number }) => item.draft === latestDraft);
          if (introData) {
            setSubject(introData.subject);
            setIntroContent(introData.IntroContent);
          } else {
            console.error('해당 draft에 대한 주제를 찾을 수 없습니다.');
          }
        } else {
          console.error('응답 데이터가 예상과 다릅니다.');
        }
      } catch (error) {
        console.error('주제를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchSubject();
  }, [latestDraft]);

  return (
    <S.Content1>
      <S.Content1Title>
        <S.Content1TitleInner>
          <h1>1. 제목</h1>
          <S.Content1InputTitle>
            <h1 style={{ color: 'black', fontSize: '2em' }}>
              동화 제목
            </h1>
          </S.Content1InputTitle>
        </S.Content1TitleInner>
      </S.Content1Title>
      <S.Content1Subject>
        <S.Content1SubjectInner>
          <h1>2. 주제</h1>
          <S.Content1InputSubject>
            <h1 style={{ color: 'black', fontSize: '2em' }}>{subject}</h1>
          </S.Content1InputSubject>
        </S.Content1SubjectInner>
      </S.Content1Subject>
    </S.Content1>
  );
};

const images = [Story1, Story2, Story3, Story4, Story5, Story6, Story7];

export const Content2 = () => {
  const [draftPages, setDraftPages] = useState<{ [key: number]: { pageNum: number; pageContent: string }[] }>({});
  const [latestDraft, setLatestDraft] = useState<number | null>(null);

  useEffect(() => {
    const fetchDraftPages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/genius/draftpage/");
        const pages = response.data;

        const drafts = Array.from(new Set(pages.map((page: { draft: number }) => page.draft)));
        const recentDraft = Math.max(...(drafts as number[]));
        setLatestDraft(recentDraft);

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

  if (latestDraft === null) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.Content2>
      {draftPages[latestDraft]?.map((page, index) => (
        <S.Content2Element key={page.pageNum}>
          <S.FixedImage src={images[index % images.length]} alt={`Story ${index + 1}`} />
          <S.Content2ElementInner>
            <p>{page.pageContent || "이야기 내용이 없습니다."}</p>
          </S.Content2ElementInner>
        </S.Content2Element>
      ))}
    </S.Content2>
  );
};
