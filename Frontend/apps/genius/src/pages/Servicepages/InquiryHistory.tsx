import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as ServiceStyle from './InquiryHistoryStyle';
import Navbar from "../Navbar/Navbar";

interface Inquiry {
  id: number;
  title: string;
  user: number; // 사용자 ID
  question: string;
}

const InquiryHistory = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;

        console.log('현재 사용자 ID:', userId); // 사용자 ID 확인

        const response = await axios.get('http://localhost:8000/genius/feedback/');

        console.log('서버에서 받은 데이터:', response.data); // 응답 데이터 확인

        // 필터링 로직 수정
        const data = Array.isArray(response.data) ? response.data : [];
        const filteredInquiries = data.filter((item: any) => item.user === userId); // 사용자 ID로 필터링

        console.log('필터링된 문의 내역:', filteredInquiries); // 필터링된 데이터 확인

        setInquiries(filteredInquiries.map((item: any) => ({
          id: item.id,
          title: item.feedCap,
          user: item.user,  // 사용자 ID
          question: item.feedContent
        })));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('문의 내역 로드에 실패했습니다:', error.response?.data || error.message);
          setError(`문의 내역 로드에 실패했습니다: ${error.response?.data.message || error.message}`);
        } else {
          console.error('문의 내역 로드에 실패했습니다:', error);
          setError('문의 내역 로드에 실패했습니다. 다시 시도해주세요.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <>
      <Navbar />
      <ServiceStyle.Container>
        <h2>나의 문의 내역</h2>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <ServiceStyle.InquiryList>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <ServiceStyle.InquiryItem key={inquiry.id}>
                  <h3>[제목] : {inquiry.title}</h3>
                  <p>[문의 내용] <br />- {inquiry.question}</p>
                </ServiceStyle.InquiryItem>
              ))
            ) : (
              <p>문의 내역이 없습니다.</p>
            )}
          </ServiceStyle.InquiryList>
        )}
      </ServiceStyle.Container>
    </>
  );
};

export default InquiryHistory;
