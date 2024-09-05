import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Styles from './SelectCharStyle';

const SelectChar: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [draftId, setDraftId] = useState<number | null>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.userId);
    } else {
      toast.error('로그인 정보가 필요합니다.');
      navigate('/login');
    }
  }, [navigate]);

  const handleCharacterSelection = (character: string) => {
    if (userId === null || draftId === null) {
      toast.error('로그인 정보와 초안 ID가 필요합니다.');
      return;
    }

    // 캐릭터 선택 시 필요한 동작을 여기에 추가할 수 있습니다.
    // 예를 들어, 선택된 캐릭터에 따라 다른 페이지로 이동하거나 다른 처리를 할 수 있습니다.
    if (character === 'alKong') {
      navigate('/AlkongTutorial');
    } else if (character === 'dalKong') {
      navigate('/DalkongTutorial');
    } else {
      toast.error('잘못된 캐릭터 선택입니다.');
    }
  };

  return (
    <Styles.AppContainer>
      <Styles.CharacterContainer
        id="character1"
        className={selectedCharacter === 'alKong' ? 'selected' : ''}
        onClick={() => {
          setSelectedCharacter('alKong');
          handleCharacterSelection('alKong');
        }}
      >
        <Link to="/AlkongTutorial">
          <Styles.CharacterImage src='./src/assets/images/alkongcharacter.png' alt="알콩이 이미지" />
          <Styles.Description className="description">
            <Styles.Highlight2>질문</Styles.Highlight2>에 대한 <Styles.Highlight2>선택지</Styles.Highlight2>를 고르며 동화를 제작해요.
          </Styles.Description>          
          <Styles.AlKongButton isAlKong={selectedCharacter === 'alKong'}>
            알콩이와 동화만들기
          </Styles.AlKongButton>
        </Link>
      </Styles.CharacterContainer>
      <Styles.CharacterContainer
        id="character2"
        className={selectedCharacter === 'dalKong' ? 'selected' : ''}
        onClick={() => {
          setSelectedCharacter('dalKong');
          handleCharacterSelection('dalKong');
        }}
      >
        <Link to="/DalkongTutorial">
          <Styles.CharacterImage src='./src/assets/images/dalkongcharacter.png' alt="달콩이 이미지" />
          <Styles.Description className="description">
            <Styles.Highlight1>AI</Styles.Highlight1>와 함께 <Styles.Highlight1>채팅</Styles.Highlight1>을 진행하며 동화를 제작해요.
          </Styles.Description>
          <Styles.DalKongButton isAlKong={selectedCharacter === 'dalKong'}>
            달콩이와 동화만들기
          </Styles.DalKongButton>
        </Link>
      </Styles.CharacterContainer>
      <Navbar />
      <ToastContainer />
    </Styles.AppContainer>
  );
};

export default SelectChar;
