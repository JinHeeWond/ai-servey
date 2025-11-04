import React from 'react';

function About() {
  return (
    <section className="content-card" id="about">
      <div className="card-header">
        <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3"/>
          <path d="M50 20 L50 50 L70 70" stroke="currentColor" strokeWidth="3" fill="none"/>
        </svg>
        <h2>연구소 소개</h2>
      </div>
      <div className="card-content">
        <div className="content-grid">
          <div className="content-text">
            <h3>우리의 미션</h3>
            <p>AI 활용 연구소는 실제 사용자들이 인공지능 기술을 어떻게 활용하고 있는지 체계적으로 조사하고 분석합니다. 우리는 다양한 산업과 일상생활에서 AI가 어떻게 적용되고 있는지 탐구하며, 이를 통해 미래의 AI 활용 방향을 제시합니다.</p>
            <p>실용적인 사례 연구를 통해 AI 기술의 실제 가치와 영향력을 이해하고, 더 나은 AI 활용 문화를 만들어갑니다.</p>
          </div>
          <div className="content-image">
            <div className="image-placeholder">
              <span>🤖</span>
            </div>
          </div>
        </div>
        <a href="#research" className="cta-button">연구 방법 알아보기</a>
      </div>
    </section>
  );
}

export default About;
