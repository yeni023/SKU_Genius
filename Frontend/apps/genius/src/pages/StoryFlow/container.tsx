import React, { useState, useEffect } from "react";
import * as S from "./styles";

import { LogoImage } from "./styles";
import logoImage from "../../assets/images/logo.png";
// import Story1 from "../../assets/images/Story1.svg";
// import Story2 from "../../assets/images/Story2.svg";
// import Story3 from "../../assets/images/Story3.svg";
// import Story4 from "../../assets/images/Story4.svg";
// import Story5 from "../../assets/images/Story5.svg";
// import Story6 from "../../assets/images/Story6.svg";
// import Story7 from "../../assets/images/Story7.svg";
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
  const [subject, setSubject] = useState<string>("로딩 중...");
  const [introContent, setIntroContent] = useState<string>("로딩 중...");
  const [latestDraft, setLatestDraft] = useState<number | null>(null);
  const [bookTitle, setBookTitle] = useState<string>("동화 제목을 생성 중입니다...");
  const [writerName, setWriterName] = useState<string>(""); // New state for the writer's name
  const [userId, setUserId] = useState<number | null>(null); // Optional: If needed for the API call

  useEffect(() => {
    // Fetch writerName, userId, and draftId from localStorage like in Genre component
    const storedWriterName = localStorage.getItem("writerName");
    const storedUserId = localStorage.getItem("userId");
    const storedDraftId = localStorage.getItem("draftId");

    if (storedWriterName) {
      setWriterName(storedWriterName);
    }
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
    if (storedDraftId) {
      setLatestDraft(parseInt(storedDraftId, 10)); // Use this as the draft ID
    }
  }, []);

  useEffect(() => {
    const fetchBookTitle = async () => {
      if (latestDraft === null || writerName === "") return;
  
      try {
        console.log("Fetching book title for draft:", latestDraft); // Debug log
        const response = await axios.post(
          "http://localhost:8000/genius/draftpage/bookname/",
          {
            writer: writerName,
          }
        );
  
        console.log("API Response:", response.data);
  
        // Check if the title exists and if it's an array
        if (response.data["동화 제목"]) {
          const titleArray = response.data["동화 제목"];
  
          // Ensure it's an array and set the book title to the first element of the array
          if (Array.isArray(titleArray) && titleArray.length > 0) {
            setBookTitle(titleArray[0]);
          } else {
            console.error("Unexpected title format:", response.data);
          }
        } else {
          console.error("No title found in API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching book title:", error);
      }
    };
  
    fetchBookTitle();
  }, [latestDraft, writerName]);
  
  useEffect(() => {
    const fetchSubject = async () => {
      if (latestDraft === null) return;

      try {
        const response = await axios.get(`http://localhost:8000/genius/intro/`);
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const introData = data.find(
            (item: { draft: number }) => item.draft === latestDraft
          );
          if (introData) {
            setSubject(introData.subject);
            setIntroContent(introData.IntroContent);
          } else {
            console.error("No subject found for the draft.");
          }
        } else {
          console.error("Unexpected response data.");
        }
      } catch (error) {
        console.error("Error fetching the subject:", error);
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
            <h1 style={{ color: "black", fontSize: "2em" }}>{bookTitle}</h1>
          </S.Content1InputTitle>
        </S.Content1TitleInner>
      </S.Content1Title>

      <S.Content1Subject>
        <S.Content1SubjectInner>
          <h1>2. 주제</h1>
          <S.Content1InputSubject>
            <h1 style={{ color: "black", fontSize: "2em" }}>{subject}</h1>
          </S.Content1InputSubject>
        </S.Content1SubjectInner>
      </S.Content1Subject>
    </S.Content1>
  );
};

export const Content2 = () => {
  const [draftPages, setDraftPages] = useState<{
    [key: number]: { pageNum: number; pageContent: string }[];
  }>({});
  const [latestDraft, setLatestDraft] = useState<number | null>(null);

  useEffect(() => {
    const fetchDraftPages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/genius/draftpage/"
        );
        const pages = response.data;

        const drafts = Array.from(
          new Set(pages.map((page: { draft: number }) => page.draft))
        );
        const recentDraft = Math.max(...(drafts as number[]));
        setLatestDraft(recentDraft);

        const filteredPages = pages.filter(
          (page: { draft: number }) => page.draft === recentDraft
        );
        const groupedPages = filteredPages.reduce(
          (
            acc: { [key: number]: { pageNum: number; pageContent: string }[] },
            page: { pageNum: number; pageContent: string; draft: number }
          ) => {
            if (!acc[page.draft]) {
              acc[page.draft] = [];
            }
            acc[page.draft].push({
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

  if (latestDraft === null) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.Content2>
      {draftPages[latestDraft]?.map((page, index) => (
        <S.Content2Element key={page.pageNum}>
          <S.Content2ElementInner>
            <p>{page.pageContent || "이야기 내용이 없습니다."}</p>
          </S.Content2ElementInner>
        </S.Content2Element>
      ))}
    </S.Content2>
  );
};
