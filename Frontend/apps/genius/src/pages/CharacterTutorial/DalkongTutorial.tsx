import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as TutorialStyle from './DalkongTutorialStyle';
import Navbar from '../Navbar/Navbar';

const DalkongTutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // 버튼 클릭 시 오디오 재생
  const playAudio = (audioSrc: string) => {
    // 이전 오디오 인스턴스가 존재하면 중지 및 초기화
    if (audioRef.current) {
      const previousAudio = audioRef.current;
      previousAudio.pause();
      previousAudio.currentTime = 0;
    }

    // 새로운 오디오 설정 및 재생
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
    });
  };

  const handlePlayAudio = () => {
    switch (currentStep) {
      case 1:
        playAudio('src/assets/audio/Daltutorial1.mp3');
        break;
      case 2:
        playAudio('src/assets/audio/Daltutorial2.mp3');
        break;
      case 3:
        playAudio('src/assets/audio/Daltutorial3.mp3');
        break;
      case 4:
        playAudio('src/assets/audio/Daltutorial4.mp3');
        break;
      case 5:
        playAudio('src/assets/audio/Daltutorial5.mp3');
        break;
      case 6:
        playAudio('src/assets/audio/Daltutorial6.mp3');
        break;
      case 7:
        playAudio('src/assets/audio/Daltutorial7.mp3');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // 페이지가 로드될 때 초기 단계의 오디오 재생
    if (currentStep === 1) {
      handlePlayAudio();
    }

    // currentStep이 변경될 때 오디오 재생
    handlePlayAudio();

    // 컴포넌트 언마운트 시 오디오 중지
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [currentStep]);

  const getStepContent = () => {
    switch (currentStep) {
      case 2:
        return (
          <>
            먼저, 어떤 동화를 만들지 고민해보고, <br />여러 가지 중에서 마음에 드는 <br />동화 장르를 골라봐!
          </>
        );
      case 3:
        return (
          <>
            그런 다음, 동화책 제작에 필요한 <br />간단한 정보를 입력해줘.
            <br />이렇게 하면 동화가 더욱 재미있어질 거야!
          </>
        );
      case 4:
        return (
          <>
            이제 네가 입력한 정보를 바탕으로 <br />동화 이야기를 만들어줄게.<br />
            준비가 되었다면 정보를 입력해줘.
          </>
        );
      case 5:
        return (
          <>
            이제 내가 생성한 이야기를 확인하고 <br />원하는 대로 내용을 수정할 수 있어.
            <br />부족한 부분이 있다면 언제든지 수정해봐!
          </>
        );
      case 6:
        return (
          <>
            동화의 각 페이지에는 <br />내가 생성한 이미지를 넣을 수 있어. <br />
            동화책을 더 생생하게 만들어줄 거야!
          </>
        );
      case 7:
        return (
          <>
            내 설명은 여기까지야!<br />
            이제 나랑 함께 동화책을 만들러 가볼까?
          </>
        );
      default:
        return (
          <>
           안녕! 나는 함께 동화책을 만들어나갈 <br /> 너의 가이드, 달콩이야.
          </>
        );
    }
  };

  return (
    <TutorialStyle.TutorialContainer>
      <Navbar />
      <TutorialStyle.BackgroundImage />
      <TutorialStyle.CharacterBubble>
        <TutorialStyle.CharacterImage 
          image={currentStep === 1 ? 'src/assets/images/dalkong2.png' : 
                 currentStep === 7 ? 'src/assets/images/dalkong2.png' : 
                 'src/assets/images/dalkongcharacter.png'} 
        />
        <TutorialStyle.StepContent key={currentStep}>{getStepContent()}</TutorialStyle.StepContent>
        {currentStep < 7 && (
          <TutorialStyle.ButtonContainer>
            <TutorialStyle.NextButton onClick={nextStep}>다음으로</TutorialStyle.NextButton>
          </TutorialStyle.ButtonContainer>
        )}
      
        {currentStep === 7 && (
          <Link to="/genre">
            <TutorialStyle.ButtonContainer>
              <TutorialStyle.EndButton>튜토리얼 마침</TutorialStyle.EndButton>
            </TutorialStyle.ButtonContainer>
          </Link>
        )}
      </TutorialStyle.CharacterBubble>
    </TutorialStyle.TutorialContainer>
  );
};

export default DalkongTutorial;
