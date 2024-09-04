import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {
  PageContainer,
  ImageSection,
  ColorSection,
  ProfileButton,
  NameButton,
  IDButton,
  SocialButton,
  SocialButtonsContainer,
  SocialImage,
  SeedNumButtonContainer,
  SeedNumButton,
  QuestionButton,
  AnswerImg,
  BookButton,
  FlowerButton,
  ForestButton,
  TopButtonContainer,
  BottomButtonContainer
} from "./MyPage";
import bgImage from "../../assets/images/MyPageBG.svg";
import followingImage from "../../assets/images/Following.svg";
import followerImage from "../../assets/images/Follower.svg";
import AnswerImage from "../../assets/images/Answer.svg";

const MyPage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        const userId = userData.id; // 로그인한 사용자의 ID를 가져옵니다.

        try {
          const response = await axios.get(`http://localhost:8000/genius/members/${userId}/`);
          const member = response.data;
          setProfileImage(member.profImg);
          setNickname(member.nickname);
          setEmail(member.email);
        } catch (error) {
          console.error("Error fetching member data:", error);
        }
      } else {
        console.error("No user found in localStorage");
      }
    };

    fetchMemberData();
  }, []);

  const handleQuestionClick = () => {
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
    }, 3000);
  };

  const handleBookButtonClick = () => {
    navigate("/MyPageBook");
  };

  const handleFlowerButtonClick = () => {
    navigate("/MyPagePlant");
  };

  const handleForestButtonClick = () => {
    navigate("/MyPageForest");
  };

  return (
    <PageContainer>
      <Navbar />
      <ImageSection bgImage={bgImage}>
        <ProfileButton
          image={profileImage || 'default_profile_image_url'} // Fallback image URL if profileImage is not available
          onClick={() => console.log("Profile button clicked!")}
        />
        <NameButton onClick={() => console.log("Name button clicked!")}>
          {nickname || "이름"}
        </NameButton>
        <IDButton onClick={() => console.log("ID button clicked!")}>
          {email || "Email"}
        </IDButton>
        <SocialButtonsContainer>
          <SocialButton
            onClick={() => console.log("Following button clicked!")}
          >
            <SocialImage src={followingImage} alt="Following" />
          </SocialButton>
          <SocialButton onClick={() => console.log("Follower button clicked!")}>
            <SocialImage src={followerImage} alt="Follower" />
          </SocialButton>
        </SocialButtonsContainer>
        <SeedNumButtonContainer>
          <SeedNumButton
            onClick={() => console.log("SeedNum button clicked!")}
          />
          <QuestionButton onClick={handleQuestionClick} />
          {showAnswer && <AnswerImg src={AnswerImage} alt="Answer" />}
        </SeedNumButtonContainer>
      </ImageSection>
      <ColorSection>
        <TopButtonContainer>
          <BookButton onClick={handleBookButtonClick} />
          <FlowerButton onClick={handleFlowerButtonClick} />
        </TopButtonContainer>
        <BottomButtonContainer>
          <ForestButton onClick={handleForestButtonClick} />
        </BottomButtonContainer>
      </ColorSection>
    </PageContainer>
  );
};

export default MyPage;
