import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as TutorialStyle from './AlkongTutorialStyle';
import Navbar from '../Navbar/Navbar';

const AlkongTutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const playAudio = (audioSrc: string) => {
    if (audioRef.current) {
      const previousAudio = audioRef.current;
      previousAudio.pause();
      previousAudio.currentTime = 0;
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
    });
  };

  const handlePlayAudio = () => {
    switch (currentStep) {
      case 1:
        playAudio('src/assets/audio/AlTutorial1.mp3');
        break;
      case 2:
        playAudio('src/assets/audio/AlTutorial2.mp3');
        break;
      case 3:
        playAudio('src/assets/audio/AlTutorial3.mp3');
        break;
      case 4:
        playAudio('src/assets/audio/AlTutorial4.mp3');
        break;
      case 5:
        playAudio('src/assets/audio/AlTutorial5.mp3');
        break;
      case 6:
        playAudio('src/assets/audio/AlTutorial6.mp3');
        break;
      case 7:
        playAudio('src/assets/audio/AlTutorial7.mp3');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handlePlayAudio();

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
            먼저, 동화책 제작에 앞서서 <br />어떤 종류의 동화를 만들지 고민해봐!
          </>
        );
      case 3:
        return (
          <>
            그런 다음, 원하는 동화 장르를 선택하고, <br />
            마음에 드는 동화 주제를 골라주면 돼!
          </>
        );
      case 4:
        return (
          <>
            동화 주제를 정했다면, <br /> 이제 내가 몇 가지 질문을 할거야.<br />
            질문에 답할 선택지 개수를 골라줘!
          </>
        );
      case 5:
        return (
          <>
            선택지는 2개, 3개, 4개 중에 고를 수 있어! <br />
            내가 물어보는 것 중에 선택지를 <br /> 1가지만 골라주면 돼. <br />
          </>
        );
      case 6:
        return (
          <>
            네가 골라준 선택지를 바탕으로 <br />동화 이야기를 생성할거야!<br />
            시간이 걸릴 수도 있으니 조금만 기다려줘!
          </>
        );
      case 7:
        return (
          <>
            내 설명은 여기까지야!<br />
            이제 나랑 같이 동화책을 만들러 가볼까?
          </>
        );
      default:
        return (
          <>
           안녕! 나는 함께 동화책을 만들어나갈 <br /> 너의 가이드, 알콩이야.
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
          image={currentStep === 2 ? 'src/assets/images/alkong3.png' : 
                 currentStep === 7 ? 'src/assets/images/alkong2.png' : 
                 'src/assets/images/alkongcharacter.png'} 
        />
        <TutorialStyle.StepContent key={currentStep}>{getStepContent()}</TutorialStyle.StepContent>
        {currentStep < 7 && (
          <TutorialStyle.ButtonContainer>
            <TutorialStyle.NextButton onClick={nextStep}>다음으로</TutorialStyle.NextButton>
          </TutorialStyle.ButtonContainer>
        )}
      
      {currentStep === 7 && (
        <Link to="/genre2">
          <TutorialStyle.ButtonContainer>
            <TutorialStyle.EndButton>튜토리얼 마침</TutorialStyle.EndButton>
          </TutorialStyle.ButtonContainer>
        </Link>
      )}
      </TutorialStyle.CharacterBubble>
    </TutorialStyle.TutorialContainer>
  );
};

export default AlkongTutorial;
