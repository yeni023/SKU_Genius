import * as C from "../../pages/StoryFlow/container";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Container,
  SelectLevelTitle,
  Wrapper,
  ImageWrapper,
  LevelButton,
  CheckButton,
  ImageWrapper1
} from "./SelectLevel";
import easy from "../../assets/images/Level2.svg";
import medium from "../../assets/images/Level3.svg";
import hard from "../../assets/images/Level4.svg";
import checkEasy from "../../assets/images/Check2.svg";
import checkMedium from "../../assets/images/Check3.svg";
import checkHard from "../../assets/images/Check4.svg";
import yes from "../../assets/images/LevelYes.svg";
import no from "../../assets/images/LevelNo.svg";

type Difficulty = "easy" | "medium" | "hard";

const SelectLevel = () => {
  const currentPage = "SelectLevel";
  const navigate = useNavigate();
  const location = useLocation();

  const [showConfirm, setShowConfirm] = useState(false);
  const [title, setTitle] = useState("선택지 개수는 몇 개로 할까?");
  const [selectedButton, setSelectedButton] = useState<Difficulty | null>(null);
  const [writer, setWriter] = useState(""); // writer 상태 추가

  // writer 정보를 받아오는 useEffect
  useEffect(() => {
    const fetchWriter = async () => {
      try {
        const response = await axios.get("http://localhost:8000/genius/draft/");
        const drafts = response.data;
        if (drafts.length > 0) {
          const latestDraft = drafts.reduce((latest, draft) => {
            return new Date(draft.savedAt) > new Date(latest.savedAt)
              ? draft
              : latest;
          }, drafts[0]);
          setWriter(latestDraft.writer);
        }
      } catch (error) {
        console.error("작가 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchWriter();
  }, []);

  const handleImageClick = (type: Difficulty) => {
    setSelectedButton(type);
    setShowConfirm(true);
    setTitle("좋아, 다음 단계로 넘어갈까?");
  };

  const handleYesClick = async () => {
    if (selectedButton && writer) {
      try {
        const diffMap: { [key in Difficulty]: number } = {
          easy: 2,
          medium: 3,
          hard: 4
        };

        const payload = {
          writer: writer,
          diff_Count: diffMap[selectedButton] // 선택된 난이도를 diff_Count로 매핑
        };

        console.log("Payload being sent:", payload);

        const response = await axios.post(
          "http://localhost:8000/genius/draft/choose_diff/",
          payload
        );

        console.log("난이도가 잘 전송되었습니다:", response.data);

        // 주제 제목을 콘솔에 로그
        const selectedTheme = location.state?.selected_subject;
        console.log("선택된 주제:", selectedTheme);

        // ChatAC로 navigate 할 때, 주제를 state로 전달
        navigate("/ChatAC", { state: { selected_subject: selectedTheme } });
      } catch (error) {
        console.error("난이도 전송에 실패했습니다:", error);
      }
    } else {
      console.log("선택된 난이도 또는 writer 정보가 없습니다.");
    }
  };

  const handleNoClick = () => {
    setShowConfirm(false);
    setTitle("선택지 개수는 몇 개로 할까?");
    setSelectedButton(null);
  };

  return (
    <Container>
      <C.Header2 currentPage={currentPage} />
      <Wrapper>
        <SelectLevelTitle>{title}</SelectLevelTitle>
        {showConfirm && (
          <ImageWrapper1>
            <CheckButton CheckImg={yes} onClick={handleYesClick} />
            <CheckButton CheckImg={no} onClick={handleNoClick} />
          </ImageWrapper1>
        )}
        <ImageWrapper>
          <LevelButton
            bgImage={easy}
            hoverImage={checkEasy}
            isSelected={selectedButton === "easy"}
            onClick={() => handleImageClick("easy")}
          />
          <LevelButton
            bgImage={medium}
            hoverImage={checkMedium}
            isSelected={selectedButton === "medium"}
            onClick={() => handleImageClick("medium")}
          />
          <LevelButton
            bgImage={hard}
            hoverImage={checkHard}
            isSelected={selectedButton === "hard"}
            onClick={() => handleImageClick("hard")}
          />
        </ImageWrapper>
      </Wrapper>
    </Container>
  );
};

export default SelectLevel;
