import React, { useState, useEffect } from 'react';
import { initialCases } from '../data/casesData';
import CaseCard from './CaseCard';

function CasesList() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 사례 불러오기
    const storedCases = localStorage.getItem('aiCases');
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    } else {
      setCases(initialCases);
      localStorage.setItem('aiCases', JSON.stringify(initialCases));
    }
  }, []);

  const handleLike = (id) => {
    const updatedCases = cases.map(c =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    setCases(updatedCases);
    localStorage.setItem('aiCases', JSON.stringify(updatedCases));
  };

  const handleComment = (id, comment) => {
    const updatedCases = cases.map(c =>
      c.id === id ? { ...c, comments: [...c.comments, comment] } : c
    );
    setCases(updatedCases);
    localStorage.setItem('aiCases', JSON.stringify(updatedCases));
  };

  return (
    <section className="content-card" id="cases">
      <div className="card-header">
        <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="60" height="50" rx="5" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line x1="35" y1="45" x2="65" y2="45" stroke="currentColor" strokeWidth="3"/>
          <line x1="35" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="3"/>
          <line x1="35" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="3"/>
        </svg>
        <h2>AI 활용 사례</h2>
      </div>
      <div className="card-content">
        <div className="cases-grid">
          {cases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseData={caseItem}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>
        {cases.length === 0 && (
          <p className="no-cases">등록된 사례가 아직 없습니다.</p>
        )}
      </div>
    </section>
  );
}

export default CasesList;
