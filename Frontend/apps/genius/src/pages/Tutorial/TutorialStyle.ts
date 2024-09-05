// tutorialstyle.ts
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TutorialContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  background: url('src/assets/images/forest.jpg') no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

export const CharacterBubble = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.9s ease-in-out;
`;

export const CharacterImage = styled.div<{ image: string }>`
  background: url(${props => props.image}) no-repeat center center;  background-size: contain;
  width: 500px;
  height: 370px;
  margin-top: 140px;
  margin-bottom: 5px;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

export const StepContent = styled.div`
  white-space: pre-line;
  background-color: #fff;
  color: #000;
  padding: 70px 65px;
  border-radius: 100%;
  position: absolute;
  left: 50%;
  top: 150px;
  font-size: 22px;
  transform: translate(-50%, -90%);
  width: 80%;
  border: 2px solid lightseagreen;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  line-height: 1.9;
  font-family: "Gowun Dodum", sans-serif;
  font-weight: 400;
  font-style: normal;
`;


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NextButton = styled.button`
  background-color: #fff;
  color: #8DD1BD;
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 3px;
  border: 2px solid skyblue;

  &:hover {
    background-color: #4da351;
    color: #fff;
    border: 2px solid skyblue;
  }

  &:focus {
    outline: 0;
  }
`;

export const EndButton = styled.button`
  background-color: #fff;
  color: #5d5d5d;
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 5px;
  border: 2px solid skyblue;

  &:hover {
    border: 2px solid skyblue;
    background-color: #4da351;
    color: #fff;
  }

  &:focus {
    outline: 0;
  }
`;
