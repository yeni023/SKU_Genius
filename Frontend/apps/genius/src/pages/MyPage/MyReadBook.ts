import styled from "styled-components";
import * as S from "./MyBasic";
import DalkongBook from "../../assets/images/DalkongBook.svg";
import TextPhoto from "../../assets/images/TextImage.svg";
import OtherBookImg from "../../assets/images/OtherBookImg.svg";
import NextPageButtonImg from "../../assets/images/MyBookArrow.svg";

export const PageContainer = S.PageContainer;
export const TopBar = S.TopBar;
export const Logo = S.Logo;
export const NavButton = S.NavButton;
export const ButtonGroup = S.ButtonGroup;
export const ImageSection = S.ImageSection;
export const TopButtonContainer = S.TopButtonContainer;
export const BottomButtonContainer = S.BottomButtonContainer;
export const ColorSection = S.ColorSection;
export const ProfileButton = S.ProfileButton;
export const NameButton = S.NameButton;
export const IDButton = S.IDButton;
export const SocialButton = S.SocialButton;
export const SocialImage = S.SocialImage;
export const SocialButtonsContainer = S.SocialButtonsContainer;
export const SeedNumButtonContainer = S.SeedNumButtonContainer;
export const SeedNumButton = S.SeedNumButton;
export const QuestionButton = S.QuestionButton;
export const AnswerImg = S.AnswerImg;

export const ReadBookTitleImage = styled.img`
  width: 17vw;
  height: auto;
  margin-top: -10px;
  margin-left: -1050px;
  &:focus {
    outline: none;
    border: none;
  }
`;

export const BookImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 5%;
`;

export const BookImage = styled.div`
  background-image: url(${DalkongBook});
  background-position: center;
  width: 1300px;
  height: 700px;
  position: relative;
`;

export const TextBoxContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 10%;
`;

export const TextBox = styled.div`
  position: absolute;
  top: -250%; 
  right: 7%; 
  transform: translateY(-50%);
  background-color: white;
  border: 3px solid #aa528e;
  padding: 30px;
  width: 450px;
  height: 500px;
  z-index: 10;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: black;
  font-size: 28px;
  font-weight: bold;
  line-height: 2;
  text-align: center;
`;

export const TextImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 15%;
  position: relative;
`;

export const TextImage = styled.div`
  background-image: url(${TextPhoto});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 500px;
  height: 100px;
  position: absolute;
  top: -6%;  // 조금 아래로 내림
  left: 7%;  // 오른쪽으로 조금 이동
  transform: translateY(-50%);
`;

export const LeftButton = styled.button`
  background-image: url(${OtherBookImg});
  background-size: cover;
  width: 570px;
  height: 565px;
  border: 3px solid #aa528e;
  position: absolute;
  top: 55%; 
  left: calc(50% - 600px); 
  transform: translateY(-50%);
  z-index: 1;

  &:focus {
    outline: none;
    border: none;
  }

  &:hover {
    border-color: #aa528e;
  }
`;

export const NextPageButton = styled.button`
  background-image: url(${NextPageButtonImg});
  background-size: cover;
  width: 40px;
  height: 90px;
  position: absolute;
  top: 60%;  // 아래로 조금 더 내림
  right: calc(50% - 640px);  // 오른쪽으로 더 이동
  transform: translateY(-50%);
  z-index: 2;
  border: none;
  cursor: pointer;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;