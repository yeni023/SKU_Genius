import React, { useState } from "react";
import axios from 'axios';
import * as ServiceStyle from './InquiryFormStyle';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가

const InquiryForm = () => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !question) {
      setError('모든 필드를 입력해야 합니다.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    const draftId = 1; // 실제 draft ID를 사용해야 합니다.

    const formData = {
      draft: draftId,
      user: userId,
      feedCap: title,
      feedContent: question
    };

    console.log('제출된 질문:', formData);

    try {
      const response = await axios.post('http://localhost:8000/genius/feedback/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('문의가 성공적으로 제출되었습니다:', response.data);
      alert('문의가 성공적으로 제출되었습니다.');
      setTitle('');
      setQuestion('');
      setError(null);

      // 문의 내역 페이지로 이동
      navigate('/InquiryHistory'); // 페이지 이동
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('문의 제출에 실패했습니다:', error.response?.data || error.message);
        alert(`문의 제출에 실패했습니다: ${error.response?.data.message || error.message}`);
      } else {
        console.error('문의 제출에 실패했습니다:', error);
        alert('문의 제출에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <ServiceStyle.Container>
        <h2>1:1 문의 접수</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <ServiceStyle.InputGroup>
            <ServiceStyle.InputLabel>제목</ServiceStyle.InputLabel>
            <ServiceStyle.InputField
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </ServiceStyle.InputGroup>
          <ServiceStyle.InputGroup>
            <ServiceStyle.InputLabel>문의 내용</ServiceStyle.InputLabel>
            <ServiceStyle.TextArea
              placeholder="문의 내용을 입력하세요"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </ServiceStyle.InputGroup>
          <ServiceStyle.SubmitButton type="submit">등록하기</ServiceStyle.SubmitButton>
        </form>
      </ServiceStyle.Container>
    </>
  );
};

export default InquiryForm;
