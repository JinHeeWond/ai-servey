import React from 'react';
import { categories } from '../data/casesData';

function Categories({ onCategorySelect }) {
  return (
    <section className="content-card" id="categories">
      <div className="card-header">
        <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
          <rect x="55" y="15" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
          <rect x="15" y="55" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
          <rect x="55" y="55" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        </svg>
        <h2>카테고리별 탐색</h2>
      </div>
      <div className="card-content">
        <div className="categories-grid">
          <div
            className="category-card active"
            onClick={() => onCategorySelect('all')}
          >
            <div className="category-icon">🌟</div>
            <h3>전체</h3>
            <p>모든 카테고리</p>
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="case-count">{category.count}개 사례</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
