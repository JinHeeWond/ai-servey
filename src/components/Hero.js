import React from 'react';

function Hero({ onStartSurvey }) {
  // 이미지 배열 (1.png ~ 5.png, 6.png는 완료 페이지에 표시)
  const images = [1, 2, 3, 4, 5];

  return (
    <section className="hero-intro-section" id="home">
      <div className="hero-title-section">
        <h1 className="hero-main-title">AI 고수 비급, 천하제일 무공대회 설문</h1>
      </div>

      <div className="intro-images-container">
        {images.map((imageNum) => (
          <div key={imageNum} className="intro-image-wrapper">
            <img
              src={`/images/${imageNum}.png`}
              alt={`AI 무공 비급 ${imageNum}`}
              className="intro-image"
            />
          </div>
        ))}
      </div>

      <div className="intro-button-container">
        <button
          className="start-survey-btn"
          onClick={onStartSurvey}
        >
          <span className="btn-icon">⚔️</span>
          설문조사 시작하기
          <span className="btn-icon">⚔️</span>
        </button>
      </div>
    </section>
  );
}

export default Hero;
