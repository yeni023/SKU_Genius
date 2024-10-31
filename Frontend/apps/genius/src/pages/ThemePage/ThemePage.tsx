import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as C from "../../pages/StoryFlow/container";
import Shape from "../../components/ThemePage/Shape";
import * as Styles from "./ThemePageStyle";
import axios from "axios";

interface ThemeData {
  id: string;
  title: string;
  subjectImage: string;
}

const ThemePage: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeData[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = "ThemePage";
  const [writer, setWriter] = useState("");
  const genre = location.state;

  useEffect(() => {
    const fetchWriterAndNickname = async () => {
      try {
        const response = await axios.get("http://localhost:8000/genius/draft/");
        const drafts = response.data;
        if (drafts.length > 0) {
          const latestDraft = drafts.reduce((latest, draft) => {
            return new Date(draft.savedAt) > new Date(latest.savedAt)
              ? draft
              : latest;
          }, drafts[0]);
          setWriter(latestDraft.writer);
        }
      } catch (error) {
        console.error("작가를 가져오는 데 오류 발생:", error);
      }
    };

    fetchWriterAndNickname();
  }, []);

  useEffect(() => {
    const themeId = location.search.split("=")[1];
    if (themeId) {
      const currentTheme = themes.find((theme) => theme.id === themeId);
      if (currentTheme) {
        const remainder = parseInt(themeId) % 3;
        let relatedIds: number[] = [];
        if (remainder === 1) {
          relatedIds = [+themeId, +themeId + 1, +themeId + 2];
        } else if (remainder === 2) {
          relatedIds = [+themeId - 1, +themeId, +themeId + 1];
        } else {
          relatedIds = [+themeId - 2, +themeId - 1, +themeId];
        }
        const relatedThemes = themes.filter((theme) =>
          relatedIds.includes(parseInt(theme.id))
        );
        setSelectedTheme(relatedThemes);
      }
    } else {
      if (writer) {
        const requestData = { writer, genre };
        axios
          .post(
            `http://localhost:8000/genius/intro/generate_subject/`,
            requestData,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then((response) => {
            console.log("API Response: ", response.data);

            const subjectsData = response.data.topics.map((topic, index) => ({
              id: index.toString(),
              title: topic.replace(/^\d+\.\s+/, ""),
              subjectImage: response.data.images[index]
            }));
            setSelectedTheme(subjectsData);
          })
          .catch((error) => {
            console.error("Failed to fetch themes:", error);
          });
      }
    }
  }, [writer, location]);

  const handleImageContainerClick = (theme: ThemeData) => {
    const titles = selectedTheme.map((t) => t.title);
    // 선택한 주제명을 콘솔에 표시
    console.log("선택한 주제 제목:", theme.title);
    navigate(`/ThemePageNext?id=${theme.id}`, {
      state: { titles, selected_subject: theme.title } // 선택한 주제 전달
    });
  };

  const handleRefreshClick = () => {
    const firstThemeIndex = themes.findIndex(
      (theme) => theme.id === selectedTheme[0].id
    );
    const nextIndex =
      firstThemeIndex + 3 < themes.length ? firstThemeIndex + 3 : 0;
    setSelectedTheme(themes.slice(nextIndex, nextIndex + 3));
  };

  return (
    <Styles.BackgroundContainer>
      <C.Header2 currentPage={currentPage} />
      <Styles.JustPadding1 />
      <Styles.Title>주제가 될 새싹을 골라볼까?</Styles.Title>
      <Styles.JustPadding2 />
      <Styles.ShapeContainer>
        {selectedTheme.map((theme, index) => (
          <Shape
            key={theme.id}
            title={theme.title}
            subjectImage={theme.subjectImage}
            onImageContainerClick={() => handleImageContainerClick(theme)}
            delay={(index + 1) * 1000}
          />
        ))}
      </Styles.ShapeContainer>
    </Styles.BackgroundContainer>
  );
};

export default ThemePage;
