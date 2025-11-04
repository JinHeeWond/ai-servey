import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';

function SubmitForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    toolName: '',
    description: '',
    impact: '',
    email: '',
    name: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Supabase에 사례 저장
      const { error: insertError } = await supabase
        .from('ai_cases')
        .insert([{
          title: formData.title,
          category: formData.category,
          tool_name: formData.toolName,
          description: formData.description,
          impact: formData.impact,
          name: formData.name,
          email: formData.email
        }]);

      if (insertError) throw insertError;

      // 성공
      setSubmitted(true);

      // 폼 초기화
      setFormData({
        title: '',
        category: '',
        toolName: '',
        description: '',
        impact: '',
        email: '',
        name: ''
      });

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error('사례 제출 중 오류 발생:', err);
      setError('사례 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="content-card" id="submit">
      <div className="card-header">
        <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20 L50 80 M30 60 L50 80 L70 60" stroke="currentColor" strokeWidth="3" fill="none"/>
        </svg>
        <h2>사례 제출하기</h2>
      </div>
      <div className="card-content">
        <div className="submit-form-wrapper">
          <p className="form-intro">여러분의 AI 활용 경험을 공유해주세요. 제출하신 사례는 검토 후 연구 자료로 활용됩니다.</p>

          {submitted && (
            <div className="success-message">
              ✅ 사례가 성공적으로 제출되었습니다! 감사합니다.
            </div>
          )}

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <form className="submit-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="홍길동"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="case-title">사례 제목 *</label>
              <input
                type="text"
                id="case-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="예: AI를 활용한 고객 서비스 개선"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="case-category">카테고리 *</label>
              <select
                id="case-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={submitting}
              >
                <option value="">선택해주세요</option>
                <option value="business">비즈니스</option>
                <option value="creative">크리에이티브</option>
                <option value="healthcare">헬스케어</option>
                <option value="education">교육</option>
                <option value="research">연구개발</option>
                <option value="lifestyle">라이프스타일</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tool-name">사용한 AI 도구</label>
              <input
                type="text"
                id="tool-name"
                name="toolName"
                value={formData.toolName}
                onChange={handleChange}
                placeholder="예: ChatGPT, Midjourney 등"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="case-description">사례 설명 *</label>
              <textarea
                id="case-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                placeholder="AI를 어떻게 활용했는지, 어떤 결과를 얻었는지 자세히 설명해주세요."
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="case-impact">성과 및 영향</label>
              <textarea
                id="case-impact"
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                rows="3"
                placeholder="AI 활용으로 인한 구체적인 성과나 영향을 작성해주세요. (선택사항)"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="case-email">이메일 *</label>
              <input
                type="email"
                id="case-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                disabled={submitting}
              />
            </div>

            <button
              type="submit"
              className="cta-button"
              disabled={submitting}
            >
              {submitting ? '제출 중...' : '제출하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SubmitForm;
