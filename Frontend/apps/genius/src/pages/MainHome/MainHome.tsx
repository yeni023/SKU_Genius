import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import * as Styles from "./MainHomeStyle";
import { useInView } from 'react-intersection-observer';

const MainHome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      const sections = document.querySelectorAll(".section");
      let currentSectionIndex = 0;

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
          currentSectionIndex = index;
        }
      });

      if (event.deltaY > 0) {
        if (currentSectionIndex < sections.length - 1) {
          (sections[currentSectionIndex + 1] as HTMLElement).scrollIntoView({
            behavior: "smooth"
          });
        }
      } else {
        if (currentSectionIndex > 0) {
          (sections[currentSectionIndex - 1] as HTMLElement).scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    };


    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const isUserLoggedIn = (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
};



const handleCreateStoryClick = () => {

  const loggedIn = isUserLoggedIn();

  if (!loggedIn) {
      // 로그인이 되어 있지 않을 때
      alert('로그인 후 이용해주세요!');
      // alert이 완료된 후에 페이지 이동
      setTimeout(() => {
          navigate('/Login');
      }, 100); // 100ms 지연
  } else {
      // 로그인이 되어 있을 때
      navigate('/CreateStory');
  }
};



  return (
    <Styles.AppContainer>
      <Navbar />
      <div className="section" id="mainSection">
        <Styles.MainSection>
          <Styles.MainTitle>
            세상에 <span className="highlight">단 ‘하나’뿐</span>인 나만의 동화책 <br />이야기 꽃을 피워보세요!
          </Styles.MainTitle>
          <Styles.MainDescription>
            세상에 있는 흔한 동화책 이야기와 결말은 너무 익숙해.<br />
            나만의 이야기로 동화책을 꾸미면 어떨까?<br />
            나도 동화책을 만들 수 있을까?<br />
            뭐? 어렵지 않다고?
          </Styles.MainDescription>
          <Styles.AnimationContainer>
            <Styles.CreateStoryButton
              onClick={handleCreateStoryClick}
            >
              나만의 동화 만들기
            </Styles.CreateStoryButton>
          </Styles.AnimationContainer>
        </Styles.MainSection>
      </div>
      <div className="section" id="secondSection">
        <Styles.Section className="visible">
          <img src={`src/assets/images/main2.png`} alt="Main 2" />
          <p><span className="highlight">아이</span>와 <span className="highlight2">부모</span>가 함께하는 시간!<br />아이는 <span className="highlight3">창의적</span>인 동화책을 만들고,<br />부모는 그 성장을 응원하며 함께 즐겨보세요!</p>
        </Styles.Section>
      </div>
      <div className="section" id="thirdSection">
        <Styles.Section className="visible">
          <p>AI를 활용해 우리 아이의 <span className="highlight3"><br />창의력</span>과 <span className="highlight4">상상력</span>을 마음껏 키워봐요!</p>
          <img src={`src/assets/images/main3.png`} alt="Main 3" />
        </Styles.Section>
      </div>
      <div className="section" id="fourthSection">
        <Styles.Section className="visible">
          <img src={`src/assets/images/main4.png`} alt="Main 4" />
          <p>아이들에게도 친숙한 화면,<br />간편하게 동화를 제작하며 <span className="highlight5">상상의 나래</span>를 펼치세요!</p>
        </Styles.Section>
      </div>
    </Styles.AppContainer>
  );
};

export default MainHome;
