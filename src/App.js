import React, { useState } from 'react';
import Hero from './components/Hero';
import Survey from './components/Survey';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1); // 1: Intro, 2: Survey, 3: Completion

  const goToSurvey = () => {
    setCurrentPage(2);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goToCompletion = () => {
    setCurrentPage(3);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const resetToIntro = () => {
    // localStorage 초기화
    localStorage.removeItem('userVotes');
    localStorage.removeItem('sessionId');

    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="App">
      {currentPage === 1 && (
        <Hero onStartSurvey={goToSurvey} />
      )}

      {currentPage === 2 && (
        <>
          <div className="cloud-decoration top"></div>
          <main className="main-content">
            <Survey onComplete={goToCompletion} onReset={resetToIntro} />
          </main>
          <div className="cloud-decoration bottom"></div>
        </>
      )}

      {currentPage === 3 && (
        <div className="completion-page">
          <div className="completion-image-container">
            <img
              src="/images/6.png"
              alt="AI 무공 비급 완료"
              className="completion-image"
            />
          </div>
          <div className="completion-message-wuxia">
            <div className="wuxia-header">
              <span className="wuxia-icon">⚔️</span>
              <h3>수련 완료!</h3>
              <span className="wuxia-icon">⚔️</span>
            </div>
            <p className="wuxia-main-text">설문에 응해줘서 고맙다.</p>
            <p className="wuxia-sub-text">그대의 실력을 확인했다.</p>
            <p className="wuxia-reward">약속한 <strong>'환단'</strong>을 부스에서 받아가라!</p>
            <p className="wuxia-guide">
              AI 실력을 빠르게 높여줄<br/>
              <strong>'필승 AI 비급서'</strong>도 함께 받아가도록 하라!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
