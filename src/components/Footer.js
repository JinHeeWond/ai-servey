import React from 'react';

function Footer() {
  return (
    <footer className="main-footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AI 활용 연구소</h3>
            <p>실제 AI 활용 사례를 수집하고 분석하여<br/>더 나은 AI 활용 문화를 만들어갑니다.</p>
          </div>
          <div className="footer-section">
            <h4>바로가기</h4>
            <ul>
              <li><a href="#home">홈</a></li>
              <li><a href="#about">소개</a></li>
              <li><a href="#survey">설문조사</a></li>
              <li><a href="#submit">사례 제출</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>문의</h4>
            <p>Email: research@ai-cases.org</p>
            <p>Tel: +82-2-1234-5678</p>
            <p>서울특별시 강남구</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AI 활용 연구소. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
