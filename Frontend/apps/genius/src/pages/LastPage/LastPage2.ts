import { styled } from "styled-components";
import DalkongBG from "../../assets/images/DalkongBG.svg";
// import LastPageBook from "../../assets/images/LastPageBook.svg";
import BaroBtn from "../../assets/images/BaroBtn.svg";
import ExitBtn from "../../assets/images/ExitBtn.svg";
import DalkongBook from "../../assets/images/DalkongBook.svg";


export const Container = styled.div`
  position: relative;
  background-image: url(${DalkongBG});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
  margin-top: 50vh;
`;

export const BookImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 1300px;
  height: 100%;
  padding: 10%;
  position: relative;
`;

export const BookImage = styled.div`
  background-image: url(${DalkongBook});
  background-position: center;
  width: 1350px;
  height: 700px;
  border-radius: 20px;
  margin-top: 50px;
  position: relative;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
`;

export const UpperTextBox = styled.div`
  color: black;
  font-size: 15px;
  font-weight: normal;
  text-align: center;
  padding: 10px;
  width: 700px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`;

export const ImageBox = styled.div`
  padding: 20px; /* 패딩 */
  width: 510px; /* 너비 */
  height: 520px; /* 높이 */
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  position: absolute; /* 절대 위치 */
  top: 48%; /* 상단 중앙 */
  right: 33%;
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 변환 */
  z-index: 3; /* z-index 설정 */
  background-color: rgba(255, 255, 255, 0.9); /* 부드러운 배경색 */
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */

`;

export const TextBox = styled.div`
  color: #333; /* 텍스트 색상 */
  font-size: 25px; /* 폰트 크기 */
  font-weight: bold; /* 폰트 두께 */
  text-align: center; /* 중앙 정렬 */
  line-height: 2.2; /* 줄 간격 */
  padding: 20px; /* 패딩 */
  width: 500px; /* 너비 */
  height: 520px; /* 높이 */
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  position: absolute; /* 절대 위치 */
  top: 48%; /* 상단 중앙 */
  left: 76%; /* 왼쪽 중앙 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 변환 */
  z-index: 3; /* z-index 설정 */
  background-color: rgba(255, 255, 255, 0.9); /* 부드러운 배경색 */
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  font-family: "Gowun Dodum", sans-serif;
`;


export const StoryContainer = styled.div`
  color: white;
  max-height: 60%;
  overflow-y: auto;
  margin-left: 20px;
  width: 40%;
`;

export const ButtonWrapper = styled.div`
  position: absolute; // 북 이미지 위에 배치
  bottom: 114px; // 북 이미지 위쪽에 위치
  width: 100%; // 전체 너비
  display: flex;
  justify-content: center; // 중앙 정렬로 변경
  gap: 1085px; // 버튼 간격 추가
  padding: 0; // 양쪽 여백 제거
  z-index: 4; // 버튼이 다른 요소들 위에 위치하도록
`;


export const NewButton1 = styled.button`
  background-image: url(${BaroBtn});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 51px;
  height: 100px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export const NewButton2 = styled.button`
  background-image: url(${ExitBtn});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 51px;
  height: 100px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export const CustomButton = styled.button`
  background-color: #db9ece;
  color: white;
  padding: 18px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin: 5px 2px;
  cursor: pointer;
  border: none;
  border-radius: 100px;
  &:hover {
    background-color: #c08cb4;
  }
`;

// 드래프트 내용을 표시할 스타일 추가
export const StoryPage = styled.div`
  margin-bottom: 20px;
  border: 1px solid white;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px; // 모서리 둥글게 처리
`;
