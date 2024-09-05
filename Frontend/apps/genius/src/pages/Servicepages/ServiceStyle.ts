import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  height: 100%;
  background-color: aliceblue;
  margin: 0 auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 40px;

  input {
    padding: 16px 250px;
    margin-right: 20px;
    font-size: 23px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    padding-left: 20px;

    &:focus {
      outline: 0;
    }
  }

  button {
    padding: 15px 30px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    font-size: 20px;

    &:focus {
      border: 1px solid #fff;
      outline: 0;
    }
  }
`;

export const ButtonGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  left: 30%;

  button {
    padding: 20px 100px;
    margin: 5px 30px;
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      font-weight: bold;
      transition: font-weight 0.5s ease;
    }

    &:focus {
      outline: 0;
    }
  }
`;

export const DetailContainer = styled.div`
  background-color: #f9f9f9; /* 상세 내용 배경색 */
  padding: 10px 15px; /* 패딩 추가 */
  margin-top: 10px; /* 상단 여백 */
  border: 1px solid #ddd; /* 테두리 추가 */
  border-radius: 5px; /* 모서리 둥글게 */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* 그림자 효과 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  transition: max-height 0.5s ease, opacity 0.5s ease; /* 슬라이드 효과 및 투명도 변화 */
  max-height: 0; /* 기본적으로 숨김 상태 */
  opacity: 0; /* 기본적으로 숨김 상태 */
  line-height: 2.0;
  
  &.expanded {
    max-height: 500px; /* 열림 상태의 최대 높이 */
    opacity: 1; /* 열림 상태의 투명도 */
  }
`;

export const Section = styled.section`
  margin-bottom: 40px;
  text-align: left;
  width: 70%;
  margin: auto;

  h2 {
    font-size: 23px;
    margin-bottom: 16px;
    margin-top: 25px;
    border-bottom: 1px solid #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    font-size: 16px;
  }

  ul > li {
    margin-bottom: 15px;
    text-align: left;
    cursor: pointer;
    font-size: 15px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    transition: background-color 0.3s ease;
    position: relative;

    &:hover {
      background-color: #e0e0e0;
    }

    &::after {
      content: '+';
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      transition: transform 0.3s ease;
    }

    &.expanded::after {
      content: '-';
      transform: translateY(-50%) rotate(180deg);
    }

    & > p {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease, opacity 0.5s ease;
      opacity: 0;
      padding: 5px 15px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-top: none;
      border-radius: 0 0 5px 5px;
    }

    &.expanded > p {
      max-height: 200px; // Adjust this as needed
      opacity: 1;
      padding: 20px;
      font-size: 15px;
      line-height: 1.8;
      
    }
  }

  h3 {
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: normal;
    padding: 8px;
  }

  span a {
    font-size: 18px;
    text-decoration: none;
    color: #000;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
