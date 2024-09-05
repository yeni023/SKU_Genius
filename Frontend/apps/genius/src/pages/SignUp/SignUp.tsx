import React, { useState } from 'react';
import axios from 'axios';
import * as SignUpStyle from './SignUpStyle';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTermsRequired, setAgreeTermsRequired] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!nickname || !email || !password || !confirmPassword) {
      toast.error('기본 가입 정보를 모두 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('비밀번호는 최소 6자 이상이어야 하며, 숫자와 영문자를 포함해야 합니다.');
      return;
    }

    if (!agreeTermsRequired || !agreePrivacy) {
      toast.error('모든 약관에 동의해야 합니다.');
      return;
    }

    const formData = {
      nickname,
      email,
      password,
      confirm_password: confirmPassword,
      agree_terms_required: agreeTermsRequired,
      agree_privacy: agreePrivacy,
    };

    try {
      await axios.post('http://localhost:8000/genius/members/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsSignUpComplete(true);

      toast.success('회원가입이 완료되었습니다.', {
        autoClose: 1500,
        hideProgressBar: true, // 진행 표시 바 숨기기
        closeOnClick: true, // 클릭 시 닫기
        pauseOnHover: false, // 호버 시 일시 정지하지 않음
      });

      // 회원가입 완료 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login'); // 로그인 페이지로 이동
      }, 1500); // 1.5초 지연 후 이동
    } catch (error) {
      setSignUpFailed(true);
      if (axios.isAxiosError(error)) {
        console.error('회원가입에 실패했습니다:', error.response?.data || error.message);
        toast.error(`회원가입에 실패했습니다: ${error.response?.data.message || error.message}`, {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      } else {
        console.error('회원가입에 실패했습니다:', error);
        toast.error('회원가입에 실패했습니다. 다시 시도해주세요.', {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    }
  };

  return (
    <SignUpStyle.Container>
      <Navbar />
      <ToastContainer />
      <h1>{isSignUpComplete ? '회원가입 완료' : signUpFailed ? '회원가입 실패' : '회원가입'}</h1>
      {isSignUpComplete ? (
        <p>회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.</p>
      ) : signUpFailed ? (
        <p>회원가입에 실패했습니다. 다시 시도해주세요.</p>
      ) : (
        <>
          <SignUpStyle.Divider />
          <SignUpStyle.Form>
            <SignUpStyle.Row>
              <SignUpStyle.Label>이메일　　　　</SignUpStyle.Label>
              <SignUpStyle.Input
                type="email"
                placeholder="이메일 (예 : abc1234@naver.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SignUpStyle.Row>
            <SignUpStyle.Row>
              <SignUpStyle.Label>비밀번호　　　</SignUpStyle.Label>
              <SignUpStyle.Input
                type="password"
                placeholder="최소 6자, 숫자 및 영문 포함"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SignUpStyle.Row>
            <SignUpStyle.Row>
              <SignUpStyle.Label>비밀번호 확인</SignUpStyle.Label>
              <SignUpStyle.Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </SignUpStyle.Row>
            <SignUpStyle.Row>
              <SignUpStyle.Label>사용자 이름　　</SignUpStyle.Label>
              <SignUpStyle.Input
                type="text"
                placeholder="이름"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </SignUpStyle.Row>
            <SignUpStyle.Row>
              <SignUpStyle.CheckboxLabel>
                <SignUpStyle.Checkbox
                  type="checkbox"
                  checked={agreeTermsRequired}
                  onChange={() => setAgreeTermsRequired(!agreeTermsRequired)}
                />
                (필수) 이용약관 동의
              </SignUpStyle.CheckboxLabel>
            </SignUpStyle.Row>
            <SignUpStyle.Row>
              <SignUpStyle.CheckboxLabel>
                <SignUpStyle.Checkbox
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={() => setAgreePrivacy(!agreePrivacy)}
                />
                (필수) 개인정보 수집 및 이용 동의
              </SignUpStyle.CheckboxLabel>
            </SignUpStyle.Row>
            <SignUpStyle.Row>
              <SignUpStyle.Button type="button" onClick={handleSignUp}>
                가입하기
              </SignUpStyle.Button>
            </SignUpStyle.Row>
          </SignUpStyle.Form>
        </>
      )}
    </SignUpStyle.Container>
  );
};

export default SignUp;
