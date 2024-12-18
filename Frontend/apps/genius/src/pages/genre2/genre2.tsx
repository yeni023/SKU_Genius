import * as C from "../../pages/StoryFlow/container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  GenreTitle,
  ImageWrapper,
  Image,
  Wrapper,
  // Arrow_Image,
  // ArrowButton,
  ButtonText
} from "./genre2";
import book from "../../assets/images/book.svg";
import castle from "../../assets/images/castle.svg";
import full_story from "../../assets/images/full_story.svg";
import ghost from "../../assets/images/ghost.svg";
// import left from "../../assets/images/left.svg";
// import right from "../../assets/images/right.svg";

const Genre2 = () => {
  const currentPage = "Genre2";
  const navigate = useNavigate();

  const handleButtonClick = async (type: string) => {
    try {
      console.log(`Sending genre: ${type}`);
      const response = await axios.post("/draft/genre2/", {
        nickname: "yeeun",
        genre: type
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting genre:", error);
    } finally {
      navigate("/ThemePage", {state:{genre:type}});
    }
  };

  return (
    <Container>
      <C.Header2 currentPage={currentPage} />
      <Wrapper>
        <GenreTitle>어떤 동화를 만들고 싶어?</GenreTitle>
        <ImageWrapper>
          {/* <ArrowButton onClick={previousPage}>
            <Arrow_Image src={left} alt="left" />
          </ArrowButton> */}
          <div>
            <Image
              src={castle}
              alt="castle"
              onClick={() => handleButtonClick("fantasy")}
            />
            <ButtonText onClick={() => handleButtonClick("fantasy")}>
              판타지 동화 만들기
            </ButtonText>
          </div>
          <div>
            <Image
              src={book}
              alt="book"
              onClick={() => handleButtonClick("learning")}
            />
            <ButtonText onClick={() => handleButtonClick("learning")}>
              학습 동화 만들기
            </ButtonText>
          </div>
          <div>
            <Image
              src={ghost}
              alt="ghost"
              onClick={() => handleButtonClick("horror")}
            />
            <ButtonText onClick={() => handleButtonClick("horror")}>
              공포 동화 만들기
            </ButtonText>
          </div>
          <div>
            <Image
              src={full_story}
              alt="full-story"
              onClick={() => handleButtonClick("folktale")}
            />
            <ButtonText onClick={() => handleButtonClick("folktale")}>
              전래 동화 만들기
            </ButtonText>
          </div>
          {/* <ArrowButton onClick={nextPage}>
            <Arrow_Image src={right} alt="right" />
          </ArrowButton> */}
        </ImageWrapper>
      </Wrapper>
    </Container>
  );
};

export default Genre2;
