import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {
  PageContainer,
  ImageSection,
  ColorSection,
  ProfileButton,
  NameButton,
  TopButtonContainer,
  BottomButtonContainer,
  IDButton,
  OvalButton,
  BookButton,
  FlowerButton,
  ForestButton
} from "./OtherPage";
import bgImage from "../../assets/images/MyPageBG.svg";
import profileImage from "../../assets/images/OtherProfile.svg";

const OtherPage: React.FC = () => {
  const navigate = useNavigate();
  const handleBookButtonClick = () => {
    navigate("/OtherPageBook");
  };
  return (
    <PageContainer>
      <Navbar />
      <ImageSection bgImage={bgImage}>
        <ProfileButton
          image={profileImage}
          onClick={() => console.log("Profile button clicked!")}
        />
        <NameButton onClick={() => console.log("Name button clicked!")}>
          최윤서
        </NameButton>
        <IDButton onClick={() => console.log("ID button clicked!")}>
          yunseo_o
        </IDButton>
        <OvalButton onClick={() => console.log("New Oval Button clicked!")}>
          팔로우
        </OvalButton>
      </ImageSection>
      <ColorSection>
        <TopButtonContainer>
          <BookButton onClick={handleBookButtonClick} />
          <FlowerButton onClick={() => console.log("Flower button clicked!")} />
        </TopButtonContainer>
        <BottomButtonContainer>
          <ForestButton onClick={() => console.log("Forest button clicked!")} />
        </BottomButtonContainer>
      </ColorSection>
    </PageContainer>
  );
};

export default OtherPage;
