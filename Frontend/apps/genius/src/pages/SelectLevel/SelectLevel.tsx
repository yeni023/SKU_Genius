import * as C from "../../pages/StoryFlow/container";
import { useState } from "react";
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
  
  // Retrieve the genre from the passed state
  const genre = location.state?.genre || "default_genre"; // Fallback if genre isn't passed
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [title, setTitle] = useState("선택지 개수는 몇 개로 할까?");
  const [selectedButton, setSelectedButton] = useState<Difficulty | null>(null);

  const handleImageClick = (type: Difficulty) => {
    console.log(`Selected difficulty: ${type}`);
    setSelectedButton(type);
    setShowConfirm(true);
    setTitle("좋아, 다음 단계로 넘어갈까?");
  };

  const handleYesClick = async () => {
    if (selectedButton) {
      try {
        const diffMap: { [key in Difficulty]: number } = {
          easy: 1,
          medium: 2,
          hard: 3
        };

        const response = await axios.post(`/draft/1/choose_diff/`, {
          diff: diffMap[selectedButton],
          writer: "yeeun",
          genre: genre, // Use the selected genre
          user: 1
        });

        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error submitting difficulty:", error);
      } finally {
        navigate("/ChatAC");
      }
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
