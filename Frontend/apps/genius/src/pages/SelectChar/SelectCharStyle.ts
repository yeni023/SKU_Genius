// SelectCharStyle.ts

import styled from 'styled-components';

interface CharacterButtonProps {
  isAlKong?: boolean;
}

export const AppContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const CharacterContainer = styled.div`
  position: relative; /* 자식 요소의 절대 위치 설정을 위한 상대 위치 */
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: none;
  /* overflow: hidden; 제거 */
  
  &:nth-child(1) {
    background-image: url('./src/assets/images/AlkongBG.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &:nth-child(2) {
    background-image: url('./src/assets/images/DalkongBG.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &:hover .description {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const CharacterButton = styled.button<CharacterButtonProps>`
  position: relative;
  margin-bottom: 250px;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 35px;
  border-radius: 40px;
  border: none;
  background-color: #ffffff;
  color: ${({ isAlKong }) => (isAlKong ? '#7EC7B1' : '#D057A9')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: color 0.3s, transform 0.2s;

  &:hover {
    color: ${({ isAlKong }) => (isAlKong ? '#6DA697' : '#B84890')};
    transform: translateY(-5px);
  }
`;

export const DalKongButton = styled(CharacterButton)<CharacterButtonProps>`
  color: #D057A9;
  &:hover {
    color: #B84890;
    transform: translateY(-5px);
  }
  &:focus {
    outline: 0;
  }
`;

export const AlKongButton = styled(CharacterButton)<CharacterButtonProps>`
  color: #7EC7B1;
  &:hover {
    color: #6DA697;
    transform: translateY(-5px);
  }
  &:focus {
    outline: 0;
  }
`;

export const CharacterImage = styled.img`
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  transition: opacity 0.3s ease;
  z-index: 1; /* 이미지가 배경보다 위에 표시되도록 설정 */

`;

export const Description = styled.div`
  position: absolute;
  bottom: 100px;
  left: 29%;
  transform: translateX(-50%);
  background: rgba(255,	255,	255, 0.7);
  color: #000; /* 텍스트 색상을 흰색으로 설정 */
  padding: 13px 25px;
  border-radius: 12px;
  border: 1.5px solid var(--black-400);
  font-size: 18px;
  opacity: 0;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  z-index: 999; /* 텍스트가 이미지 위에 표시되도록 설정 */
`;

export const Highlight1 = styled.span`
  font-weight: bold;
  color: #CC6666; /* 골드 색상으로 강조 */
`;

export const Highlight2 = styled.span`
  font-weight: bold;
  color: #009999; /* 골드 색상으로 강조 */
`;