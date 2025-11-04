import React from 'react';

function ResearchMethod() {
  const steps = [
    {
      number: '01',
      title: '사례 수집',
      description: '다양한 채널을 통해 실제 AI 활용 사례를 체계적으로 수집합니다.'
    },
    {
      number: '02',
      title: '검증 및 분류',
      description: '수집된 사례의 신뢰성을 검증하고 카테고리별로 분류합니다.'
    },
    {
      number: '03',
      title: '심층 분석',
      description: '각 사례를 분석하여 패턴과 트렌드를 도출합니다.'
    },
    {
      number: '04',
      title: '인사이트 공유',
      description: '분석 결과를 정리하여 커뮤니티와 공유합니다.'
    }
  ];

  return (
    <section className="content-card" id="research">
      <div className="card-header">
        <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line x1="58" y1="58" x2="75" y2="75" stroke="currentColor" strokeWidth="3"/>
        </svg>
        <h2>연구 방법론</h2>
      </div>
      <div className="card-content">
        <div className="research-steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResearchMethod;
