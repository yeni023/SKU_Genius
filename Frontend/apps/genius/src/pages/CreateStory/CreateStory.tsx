import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Styles from './CreateStoryStyle';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateStory: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [writerName, setWriterName] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
    if (!userData || !isLoggedIn) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');  // 로그인 페이지로 리디렉션
    } else {
      try {
        const user = JSON.parse(userData);
        console.log('로컬 스토리지에서 가져온 사용자 정보:', user);
  
        if (user && user.id) {
          setUserId(user.id); // 올바른 키로 사용자 ID를 설정
          localStorage.setItem('userId', user.id.toString()); // userId를 로컬 스토리지에 저장
        } else {
          throw new Error('유효하지 않은 사용자 정보');
        }
      } catch (error) {
        console.error('로그인 정보 로드 오류:', error);
        toast.error('로그인 정보가 유효하지 않습니다. 다시 로그인 해주세요.');
        navigate('/login');  // 로그인 페이지로 리디렉션
      }
    }
  }, [navigate]);
  
  const updateWriterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriterName(event.target.value);
  };

  const showGreeting = async () => {
    const trimmedWriterName = writerName.trim();
  
    if (trimmedWriterName === '') {
      toast.error('작가명을 입력하세요!', {
        autoClose: 1500, 
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }
  
    if (userId === null) {
      toast.error('로그인 정보가 필요합니다.', {
        autoClose: 1500,
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }
  
    // 요청 데이터 생성
    const formData = {
      writer: trimmedWriterName,
      user: userId,
      genre: null,
      diff: 0
    };
  
    try {
      console.log('전송할 데이터:', JSON.stringify(formData));
      const apiUrl = 'http://localhost:8000/genius/draft/';
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('서버 응답:', response.data);
      localStorage.setItem('draftId', response.data.id.toString());
      localStorage.setItem('writerName', trimmedWriterName);
      
      toast.success(`환영합니다 ${trimmedWriterName}님!`, {
        autoClose: 1500,
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        onClose: () => navigate('/Tutorial')
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('서버 오류:', error.response?.data);
        toast.error(`서버 오류가 발생했습니다: ${error.response?.data}`, {
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          position: 'top-center'
        });
      } else {
        console.error('예상치 못한 오류:', error);
        toast.error('서버 오류가 발생했습니다. 다시 시도해주세요.', {
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          position: 'top-center'
        });
      }
    }
  };

  const handleInputContainerTransitionEnd = () => {
    setLoaded(true);
  };

  if (userId === null) {
    return <div>로그인 정보를 확인하는 중...</div>;
  }

  return (
    <div>
      <Navbar />
      <Styles.Container className={`content-container ${loaded ? 'loaded' : ''}`}>
        <Styles.InputContainer
          className={`input-container ${loaded ? 'loaded' : ''}`}
          onTransitionEnd={handleInputContainerTransitionEnd}
        >
          <p>
            안녕하세요 <Styles.GreetingText>{writerName || '__________'}</Styles.GreetingText> 님!
          </p>
          <p style={{ marginBottom: 0 }}>
            동화를 만들 작가님의 이름을 입력해주세요.
          </p>
          <Styles.NicknameInput
            type="text"
            id="writerInput"
            placeholder="작가명을 입력하세요"
            value={writerName}
            onChange={updateWriterName}
          />
          
          <div>
            <Styles.SubmitBtn id="submitBtn" onClick={showGreeting}>
              제출하기
            </Styles.SubmitBtn>
          </div>
        </Styles.InputContainer>
      </Styles.Container>
      <ToastContainer />
    </div>
  );
};

export default CreateStory;
