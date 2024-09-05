import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('./src/assets/images/forest.jpg') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  color: #000;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 0;
  }
`;

export const MainSection = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  animation: ${fadeIn} 1s ease forwards;
  position: relative;
  z-index: 1;
`;

export const MainTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 25px;
  margin-top: 90px;
  color: #fff;
  animation: ${fadeIn} 1s ease forwards;
  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);

  .highlight {
    color: #688078;
  }
`;

export const MainDescription = styled.p`
  font-size: 1.3em;
  font-weight: 500;
  line-height: 2.0;
  margin-bottom: 25px;
  margin-top: 40px;
  color: #fff;
  white-space: pre-line;
  animation: ${fadeIn} 1s ease forwards;
`;

export const AnimationContainer = styled.div`
  opacity: 1;
  transition: opacity 3s ease-in-out, transform 3s ease-in-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CreateStoryButton = styled.button`
  background-color: #fff;
  color: #8DD1BD;
  padding: 18px 28px;
  margin-top: 30px;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
  animation: ${fadeIn} 3.5s ease forwards;

  &:hover {
    background-color: #45a049;
    color: #fff;
  }

  &:focus {
    outline: 0;
  }
`;

export const Section = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  transition: opacity 1.5s ease-in-out;
  opacity: 0;
  position: relative;
  z-index: 1;

  &.visible {
    opacity: 1;
  }

  img {
    max-width: 50%;
    margin: 10px;
  }

  p {
    font-size: 1.7em; /* 아이들에게 읽기 좋게 조정 */
    color: #000; /* 텍스트가 잘 보이도록 다크 그레이 색상 */
    text-align: center;
    line-height: 2.0;
    padding: 30px 35px; /* 여백을 적당히 줄여서 더 세련되게 */
    margin: 0;
    background: rgba(255, 255, 255, 0.77); /* 밝은 배경으로 텍스트 강조 */
    border-radius: 100px; /* 둥근 모서리로 부드러운 느낌 */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 효과 */
    max-width: 90%; /* 텍스트 영역의 너비 제한 */
    margin: 0 auto; /* 중앙 정렬 */
    display: inline-block; /* 인라인 블록으로 중앙 정렬 유지 */
    font-weight: 400;
    font-style: normal;
  }

  .highlight {
    color: #f1c40f; /* 밝고 활기찬 노란색 */
    font-weight: bold;
  }

  .highlight2 {
    color: #e74c3c; /* 따뜻한 빨간색으로 강조 */
    font-weight: bold;
  }
`;