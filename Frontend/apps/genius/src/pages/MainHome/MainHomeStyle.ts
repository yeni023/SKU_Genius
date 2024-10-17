import styled, { createGlobalStyle, keyframes } from 'styled-components';

// 구글 폰트를 전역 스타일로 설정
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');  body {
  font-family: "Jua", sans-serif;
  }
`;

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
    animation: ${fadeIn} 1s ease forwards;
  }

  img {
    max-width: 50%;
    margin: 15px;
    filter: drop-shadow(3px 3px 3px #000);
    
  }

  p {
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.7em; 
    color: #333333;
    text-align: center;
    line-height: 2.0;
    padding: 65px; 
    margin: 20px auto;
    background: rgb(237,246,237);
    border-radius: 50%; 
    position: relative;
    display: inline-block;
    box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.4);
}

p:after { 
    border-top: 20px solid rgb(237,246,237);
    border-left: 20px solid transparent; 
    border-right: 20px solid transparent; 
    border-bottom: 0px solid transparent; 
    content: ""; 
    position: absolute; 
    top: 99%; 
    left: 50%; 
    transform: translateX(-50%); 
}




  .highlight {
    color: #87cefa; 
    font-weight: bold;
  }

  .highlight2 {
    color: #20b2aa; 
    font-weight: bold;
  }

  .highlight3 {
    color: #fa8072; 
    font-weight: bold;
  }

  .highlight4 {
    color: #9acd32; 
    font-weight: bold;
  }

  .highlight5 {
    color: #87ceeb; 
    font-weight: bold;
  }

`;

export { GlobalStyle };