import React from 'react';

function Insights() {
  const insights = [
    {
      icon: '📈',
      title: 'AI 도입률 증가',
      description: '2024년 대비 기업의 AI 활용이 85% 증가했으며, 특히 중소기업의 도입이 두드러집니다.'
    },
    {
      icon: '🎯',
      title: '효율성 향상',
      description: 'AI 도구 사용자의 92%가 업무 효율성 향상을 보고했으며, 평균 40%의 시간 절감 효과를 경험했습니다.'
    },
    {
      icon: '🌐',
      title: '다양한 활용',
      description: '단순 자동화를 넘어 창의적 작업, 의사결정 지원, 개인화 서비스 등 다양한 분야로 확장되고 있습니다.'
    },
    {
      icon: '🔒',
      title: '윤리적 고려',
      description: 'AI 활용 시 개인정보 보호, 편향성 해소, 투명성 확보가 중요한 고려사항으로 부상했습니다.'
    }
  ];

  return (
    <section className="content-card" id="insights">
      <div className="card-header">
        <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20 L80 80 L20 80 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
          <circle cx="50" cy="65" r="3" fill="currentColor"/>
          <line x1="50" y1="35" x2="50" y2="55" stroke="currentColor" strokeWidth="3"/>
        </svg>
        <h2>주요 인사이트</h2>
      </div>
      <div className="card-content">
        <div className="insights-list">
          {insights.map((insight, index) => (
            <div key={index} className="insight-item">
              <h3>{insight.icon} {insight.title}</h3>
              <p>{insight.description}</p>
            </div>
          ))}
        </div>
        <a href="#insights" className="cta-button">상세 분석 보기</a>
      </div>
    </section>
  );
}

export default Insights;
