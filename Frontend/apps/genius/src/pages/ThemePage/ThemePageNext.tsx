import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShapeNext from "../../components/ThemePage/ShapeNext";
import * as C from "../../pages/StoryFlow/container";
import * as Styles from "./ThemePageStyle";

const ThemePageNext: React.FC = () => {
  const location = useLocation();
  const { titles, selected_subject } = location.state || {};
  const navigate = useNavigate();
  const currentPage = "ThemePageNext";

  // 선택한 주제명을 콘솔에 표시
  console.log("선택한 주제:", selected_subject);

  const handleOkBtnClick = () => {
    navigate(`/SelectLevel`, {
      state: { selected_subject } // selected_subject를 SelectLevel로 전달
    });
  };

  const handleNoBtnClick = () => {
    navigate(`/ThemePage?id=${selected_subject.id}`);
  };

  const getThemeIndex = (id: number) => {
    return Math.floor(id / 3);
  };

  const themeIndex = getThemeIndex(
    parseInt(new URLSearchParams(location.search).get("id") || "0")
  );
  const startIndex = themeIndex * 3;

  const getComponentIndex = (id: number) => {
    return id % 3;
  };

  return (
    <Styles.BackgroundContainer>
      <C.Header2 currentPage={currentPage} />
      <Styles.Title>좋았어, 이제 이야기 꽃을 피워볼까?</Styles.Title>
      <Styles.BtnContainer>
        <Styles.OkBtn onClick={handleOkBtnClick}>응 그럴래</Styles.OkBtn>
        <Styles.NoBtn onClick={handleNoBtnClick}>다시 고를래</Styles.NoBtn>
      </Styles.BtnContainer>
      <Styles.ShapeContainer>
        {[0, 1, 2].map((index) => (
          <ShapeNext
            key={startIndex + index}
            title={titles[index]}
            isFlower={
              getComponentIndex(
                parseInt(new URLSearchParams(location.search).get("id") || "0")
              ) === index
            }
          />
        ))}
      </Styles.ShapeContainer>
    </Styles.BackgroundContainer>
  );
};

export default ThemePageNext;
