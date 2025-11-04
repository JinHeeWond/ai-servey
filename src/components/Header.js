import React, { useState } from 'react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: '홈' },
    { href: '#about', label: '소개' },
    { href: '#survey', label: '설문조사' },
    { href: '#submit', label: '사례 제출' },
    { href: '#contact', label: '문의' }
  ];

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <h1>AI 활용 연구소</h1>
          <p className="subtitle">AI Use Cases Research</p>
        </div>
        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
