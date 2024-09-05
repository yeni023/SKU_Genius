import React, { useState } from 'react';
import axios from 'axios';
import * as LoginStyle from './LoginStyle';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 추가
import Navbar from '../Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify'; // ToastContainer와 toast를 추가
import 'react-toastify/dist/ReactToastify.css'; // 스타일 추가

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    const formData = {
      email: username,
      password: password
    };
  
    try {
      const apiUrl = 'http://localhost:8000/genius/members/';
      const response = await axios.get(apiUrl);
  
      const members = response.data;
      const foundMember = members.find((member: any) => member.email === formData.email);
  
      if (foundMember && foundMember.password === formData.password) {
        toast.success('로그인이 완료되었습니다!');
  
        // 로그인 성공 시 사용자 정보를 localStorage에 저장
        localStorage.setItem('user', JSON.stringify(foundMember));
        localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
        
  
        setTimeout(() => {
          navigate('/MainHome');
        }, 1500); 
      } else {
        toast.error('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    handleLogin();
  };

  return (
    <LoginStyle.Container>
      <Navbar />
      <h1>로그인</h1>
      <LoginStyle.Form onSubmit={handleSubmit}> {/* onSubmit 이벤트 추가 */}
        <LoginStyle.Row>
          <LoginStyle.Label>이메일</LoginStyle.Label>
          <LoginStyle.Input
            type="text"
            placeholder="이메일"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LoginStyle.Row>
        <LoginStyle.Row>
          <LoginStyle.Label>비밀번호</LoginStyle.Label>
          <LoginStyle.Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginStyle.Row>
        <LoginStyle.FlexContainer>
          <LoginStyle.AutoLoginContainer>
            <input type="checkbox" id="autoLogin" />
            <LoginStyle.AutoLoginLabel htmlFor="autoLogin">자동 로그인</LoginStyle.AutoLoginLabel>
          </LoginStyle.AutoLoginContainer>
          <LoginStyle.ForgotPasswordContainer>
            <LoginStyle.ForgotPasswordLink>아이디/비밀번호 찾기</LoginStyle.ForgotPasswordLink>
          </LoginStyle.ForgotPasswordContainer>
        </LoginStyle.FlexContainer>
        <LoginStyle.Button type="submit"> {/* 로그인 버튼의 type을 "submit"으로 설정 */}
          로그인
        </LoginStyle.Button>
      </LoginStyle.Form>
      <ToastContainer /> {/* ToastContainer 추가 */}
    </LoginStyle.Container>
  );
};

export default Login;
