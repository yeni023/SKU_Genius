import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ServiceStyle from './ServiceStyle';
import Navbar from "../Navbar/Navbar";

// 공지사항 데이터
const notices = [
  { 
    id: 1, 
    title: "코로나19 관련 동화책 배송 서비스 안내", 
    detail: `
      코로나19로 인한 사회적 거리두기 조치에 따라, 동화책 배송 서비스가 새로 시작되었습니다.<br>
      서비스는 안전하고 신속하게 동화책을 고객님께 전달하기 위해 다음과 같은 조치를 취하고 있습니다:<br><br>
      - 배송 직원은 모두 마스크를 착용하며, 손 소독제를 수시로 사용합니다.<br>
      - 배송 패키지는 방역 처리되어 고객님께 전달됩니다.<br>
      - 비대면 배송을 권장하며, 고객님께서 직접 수령하지 않고 문 앞에 두는 방식으로 진행됩니다.<br>
      고객님의 안전과 편의를 위해 최선을 다하겠습니다. 추가적인 정보나 문의는 고객센터로 연락해 주시기 바랍니다.
    ` 
  },
  { 
    id: 2, 
    title: "동화 제작 서비스 이용 안내", 
    detail: `
      새로운 동화 제작 서비스가 오픈되었습니다! 이 서비스는 개인 맞춤형 동화를 제작하여,<br>
      아이의 이름과 선호에 맞춘 특별한 동화를 제공합니다. 서비스 이용 방법은 다음과 같습니다:<br><br>
      1. 웹사이트에 접속하여 동화 제작 신청서를 작성합니다.<br>
      2. 동화의 주제와 아이의 정보를 입력합니다.<br>
      3. 요청 사항을 제출하면, 저희 팀이 맞춤형 동화를 제작하여 확인 후 배송해 드립니다.<br>
      동화는 고품질의 종이에 인쇄되어 소중한 추억을 만들어 드립니다. 서비스에 대한 추가적인 정보는 홈페이지를 참조하시거나, 고객센터로 문의해 주세요.
    ` 
  },
  { 
    id: 3, 
    title: "새로운 기능 출시", 
    detail: `
      우리 플랫폼에 새로운 기능이 추가되었습니다! 다음은 주요 업데이트 사항입니다:<br><br>
      - **주석 추가 기능**: 동화책의 특정 부분에 개인적인 메모를 추가할 수 있습니다.<br>
      - **친구와 함께 읽기**: 친구와 실시간으로 동화를 공유하고 함께 읽으면서 의견을 나눌 수 있습니다.<br>
      - **읽기 기록 관리**: 동화 읽기 이력을 확인하고 관리할 수 있는 기능이 추가되었습니다.<br>
      새로운 기능을 통해 더 많은 즐거움과 편리함을 경험해 보세요! 자세한 사용 방법은 사용자 가이드를 참조해 주세요.
    ` 
  }
];

// 자주 묻는 질문 데이터
const faqs = [
  { 
    id: 1, 
    question: "로그인이 되지 않아요.", 
    answer: `
      로그인 문제가 발생할 경우, 다음 사항을 확인해 주세요:<br><br>
      1. 입력한 이메일과 비밀번호가 올바른지 다시 확인해 주세요.<br>
      2. 비밀번호를 잊으신 경우, 비밀번호 찾기 기능을 이용해 주세요.<br>
      3. 계정이 잠겼거나 비활성화된 경우, 고객센터로 문의해 주세요.<br>
      4. 브라우저의 쿠키와 캐시를 삭제한 후 다시 시도해 보세요.<br>
      문제가 계속 발생하면 고객센터로 연락 주시면 신속히 도움을 드리겠습니다.
    `
  },
  { 
    id: 2, 
    question: "서비스 상담 시간은 언제인가요?", 
    answer: `
      서비스 상담 시간은 다음과 같습니다:<br><br>
      - **평일**: 오전 9시부터 오후 6시까지<br>
      - **주말 및 공휴일**: 휴무<br>
      상담 시간 외에는 이메일 또는 문의 양식을 통해 질문을 남기시면,<br>
      영업일 내에 최대한 빨리 답변 드리겠습니다. 긴급한 상황에서는 고객센터로 전화 주시면 빠른 지원을 해 드리겠습니다.
    `
  },
  { 
    id: 3, 
    question: "결제 방법은 무엇이 있나요?", 
    answer: `
      현재 지원되는 결제 방법은 다음과 같습니다:<br><br>
      1. **신용카드**: VISA, MasterCard, American Express 등 주요 신용카드를 지원합니다.<br>
      2. **계좌 이체**: 지정된 은행 계좌로 직접 이체 가능합니다.<br>
      3. **모바일 결제**: 휴대폰 결제 및 모바일 지갑을 통한 결제도 가능합니다.<br>
      결제 과정에서 문제가 발생할 경우, 결제 관련 문의를 통해 도움을 요청해 주세요.
    `
  }
];

const Service = () => {
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleInquiryClick = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    if (!userId) {
      alert('로그인 후 이용해주세요!');
      navigate('/Login');
    } else {
      navigate('/InquiryForm');
    }
  };

  const handleInquiryHistoryClick = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    if (!userId) {
      alert('로그인 후 이용해주세요!');
      navigate('/Login');
    } else {
      navigate('/InquiryHistory');
    }
  };

  const toggleNoticeDetail = (id: number) => {
    setExpandedNotice(expandedNotice === id ? null : id);
  };
  
  const toggleFaqDetail = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  // 사용 예
  return (
    <>
      <Navbar />
      <ServiceStyle.Container>
        <ServiceStyle.SearchForm>
          <input type="text" placeholder="질문을 검색해보세요" />
          <button type="submit">검색</button>
        </ServiceStyle.SearchForm>
        <ServiceStyle.ButtonGroup>
          <button onClick={handleInquiryClick}>1:1 문의 접수</button>
          <button onClick={handleInquiryHistoryClick}>나의 문의 내역</button>
        </ServiceStyle.ButtonGroup>
        <ServiceStyle.Section>
          <h2>공지사항<span><a href="#">더보기 &gt;</a></span></h2>
          <ul>
            {notices.map((notice) => (
              <li key={notice.id}>
                <h3 onClick={() => toggleNoticeDetail(notice.id)}>{notice.title}</h3>
                <ServiceStyle.DetailContainer className={expandedNotice === notice.id ? 'expanded' : ''}>
                  <div dangerouslySetInnerHTML={{ __html: notice.detail }} />
                </ServiceStyle.DetailContainer>
              </li>
            ))}
          </ul>
        </ServiceStyle.Section>
        <ServiceStyle.Section>
          <h2>자주 묻는 질문<span><a href="#">더보기 &gt;</a></span></h2>
          <ul>
            {faqs.map((faq) => (
              <li key={faq.id}>
                <h3 onClick={() => toggleFaqDetail(faq.id)}>{faq.question}</h3>
                <ServiceStyle.DetailContainer className={expandedFaq === faq.id ? 'expanded' : ''}>
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </ServiceStyle.DetailContainer>
              </li>
            ))}
          </ul>
        </ServiceStyle.Section>
      </ServiceStyle.Container>
    </>
  );
  
};

export default Service;