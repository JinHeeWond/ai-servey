import React, { useState } from 'react';

function CaseCard({ caseData, onLike, onComment }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && commentName.trim()) {
      onComment(caseData.id, {
        name: commentName,
        text: commentText,
        date: new Date().toISOString()
      });
      setCommentText('');
      setCommentName('');
    }
  };

  return (
    <article className="case-item">
      <div className="case-icon">{caseData.icon}</div>
      <h3>{caseData.title}</h3>
      <p>{caseData.description}</p>
      <span className="case-date">{caseData.date}</span>

      <div className="case-interactions">
        <button
          className="like-btn"
          onClick={() => onLike(caseData.id)}
        >
          ❤️ {caseData.likes}
        </button>
        <button
          className="comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {caseData.comments.length}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {caseData.comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.name}</strong>
                <p>{comment.text}</p>
                <span className="comment-date">
                  {new Date(comment.date).toLocaleDateString('ko-KR')}
                </span>
              </div>
            ))}
          </div>
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <input
              type="text"
              placeholder="이름"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              required
            />
            <textarea
              placeholder="의견을 남겨주세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <button type="submit">의견 남기기</button>
          </form>
        </div>
      )}
    </article>
  );
}

export default CaseCard;
