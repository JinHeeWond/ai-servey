import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

function Survey({ onComplete, onReset }) {
  const [surveys, setSurveys] = useState([]);
  const [votedSurveys, setVotedSurveys] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AI 꿀팁 입력 필드 (Q10-Q13)
  const [aiTips, setAiTips] = useState({
    tipName: '',
    targetUsers: '',
    aiTool: '',
    tipDescription: ''
  });
  const [tipsSubmitted, setTipsSubmitted] = useState(false);

  // 중복 선택 가능한 질문 ID
  const multiSelectQuestions = [6]; // Q6: 잘못된 정보 경험 (중복 선택 가능)

  // 세션 ID 생성 또는 가져오기
  const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    fetchSurveys();
    loadVotedSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      setLoading(true);

      const { data: surveysData, error: surveysError } = await supabase
        .from('surveys')
        .select(`
          id,
          question,
          description,
          active,
          survey_options (
            id,
            text,
            votes,
            option_order
          )
        `)
        .eq('active', true)
        .order('id', { ascending: true });

      if (surveysError) throw surveysError;

      const formattedSurveys = surveysData.map(survey => ({
        id: survey.id,
        question: survey.question,
        description: survey.description,
        active: survey.active,
        options: survey.survey_options
          .sort((a, b) => a.option_order - b.option_order)
          .map(opt => ({
            id: opt.id,
            text: opt.text,
            votes: opt.votes || 0
          }))
      }));

      setSurveys(formattedSurveys);
      setError(null);
    } catch (err) {
      console.error('설문조사 데이터 로딩 실패:', err);
      setError('설문조사를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadVotedSurveys = () => {
    const storedVotes = localStorage.getItem('userVotes');
    if (storedVotes) {
      setVotedSurveys(JSON.parse(storedVotes));
    }
  };

  const handleVote = async (surveyId, optionId) => {
    const isMultiSelect = multiSelectQuestions.includes(surveyId);

    if (isMultiSelect) {
      // 중복 선택 가능한 질문 - 즉시 투표 처리
      const currentSelections = votedSurveys[surveyId] || [];
      const isSelected = currentSelections.includes(optionId);

      try {
        const sessionId = getSessionId();

        if (isSelected) {
          // 이미 선택됨 → 선택 해제 및 투표 감소
          await supabase.rpc('decrement_votes', { option_id: optionId });
          await supabase
            .from('votes')
            .delete()
            .eq('survey_id', surveyId)
            .eq('option_id', optionId)
            .eq('session_id', sessionId);

          const newSelections = currentSelections.filter(id => id !== optionId);
          const newVotedSurveys = { ...votedSurveys, [surveyId]: newSelections };
          setVotedSurveys(newVotedSurveys);
          localStorage.setItem('userVotes', JSON.stringify(newVotedSurveys));

          // UI 업데이트
          const updatedSurveys = surveys.map(survey => {
            if (survey.id === surveyId) {
              return {
                ...survey,
                options: survey.options.map(option =>
                  option.id === optionId
                    ? { ...option, votes: Math.max(0, option.votes - 1) }
                    : option
                )
              };
            }
            return survey;
          });
          setSurveys(updatedSurveys);

        } else {
          // 새로 선택 → 투표 추가
          await supabase.rpc('increment_votes', { option_id: optionId });
          await supabase.from('votes').insert([{
            survey_id: surveyId,
            option_id: optionId,
            session_id: sessionId
          }]);

          const newSelections = [...currentSelections, optionId];
          const newVotedSurveys = { ...votedSurveys, [surveyId]: newSelections };
          setVotedSurveys(newVotedSurveys);
          localStorage.setItem('userVotes', JSON.stringify(newVotedSurveys));

          // UI 업데이트
          const updatedSurveys = surveys.map(survey => {
            if (survey.id === surveyId) {
              return {
                ...survey,
                options: survey.options.map(option =>
                  option.id === optionId
                    ? { ...option, votes: option.votes + 1 }
                    : option
                )
              };
            }
            return survey;
          });
          setSurveys(updatedSurveys);
        }
      } catch (err) {
        console.error('투표 중 오류 발생:', err);
        alert('투표 중 오류가 발생했습니다. 다시 시도해주세요.');
      }

    } else {
      // 단일 선택 질문 - 답변 변경 가능
      const previousOptionId = votedSurveys[surveyId];

      try {
        // 새로운 선택에 투표
        const { error: updateError } = await supabase.rpc('increment_votes', {
          option_id: optionId
        });

        if (updateError) throw updateError;

        // 이전 선택이 있다면 투표 감소
        if (previousOptionId) {
          await supabase.rpc('decrement_votes', {
            option_id: previousOptionId
          });
        }

        const sessionId = getSessionId();

        // 기존 투표 기록 삭제 (있다면)
        if (previousOptionId) {
          await supabase
            .from('votes')
            .delete()
            .eq('survey_id', surveyId)
            .eq('session_id', sessionId);
        }

        // 새로운 투표 기록 추가
        const { error: insertError } = await supabase
          .from('votes')
          .insert([{
            survey_id: surveyId,
            option_id: optionId,
            session_id: sessionId
          }]);

        if (insertError) throw insertError;

        const updatedSurveys = surveys.map(survey => {
          if (survey.id === surveyId) {
            return {
              ...survey,
              options: survey.options.map(option => {
                if (option.id === optionId) {
                  return { ...option, votes: option.votes + 1 };
                } else if (option.id === previousOptionId) {
                  return { ...option, votes: Math.max(0, option.votes - 1) };
                }
                return option;
              })
            };
          }
          return survey;
        });

        setSurveys(updatedSurveys);

        const newVotedSurveys = { ...votedSurveys, [surveyId]: optionId };
        setVotedSurveys(newVotedSurveys);
        localStorage.setItem('userVotes', JSON.stringify(newVotedSurveys));

      } catch (err) {
        console.error('투표 중 오류 발생:', err);
        alert('투표 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const getTotalVotes = (options) => {
    return options.reduce((total, option) => total + option.votes, 0);
  };

  const getPercentage = (votes, total) => {
    if (total === 0) return 0;
    return ((votes / total) * 100).toFixed(1);
  };

  const allSurveysCompleted = () => {
    if (surveys.length === 0) return false;

    const completed = surveys.every(survey => {
      const isMultiSelect = multiSelectQuestions.includes(survey.id);
      if (isMultiSelect) {
        // 중복 선택은 최소 1개 이상 선택되어 있으면 완료
        const selections = votedSurveys[survey.id] || [];
        return selections.length > 0;
      } else {
        return votedSurveys[survey.id] !== undefined;
      }
    });

    // 디버깅용 로그
    console.log('설문조사 완료 상태:', completed);
    console.log('투표 상태:', votedSurveys);
    console.log('설문조사 수:', surveys.length);

    return completed;
  };

  const handleAiTipsSubmit = async (e) => {
    e.preventDefault();

    // 꿀팁을 작성한 경우에만 제출
    const hasTipContent = aiTips.tipName || aiTips.targetUsers || aiTips.aiTool || aiTips.tipDescription;

    if (hasTipContent) {
      // 일부만 작성한 경우 모두 작성하도록 안내
      if (!aiTips.tipName || !aiTips.targetUsers || !aiTips.aiTool || !aiTips.tipDescription) {
        alert('꿀팁을 제출하려면 모든 항목을 입력해주세요!\n(작성하지 않고 넘어가려면 모든 필드를 비워두세요)');
        return;
      }

      try {
        const sessionId = getSessionId();

        const { error: insertError } = await supabase
          .from('ai_tips')
          .insert([{
            tip_name: aiTips.tipName,
            target_users: aiTips.targetUsers,
            ai_tool: aiTips.aiTool,
            tip_description: aiTips.tipDescription,
            session_id: sessionId
          }]);

        if (insertError) throw insertError;

        alert('AI 꿀팁이 성공적으로 제출되었습니다!');
      } catch (err) {
        console.error('AI 꿀팁 제출 중 오류 발생:', err);
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }

    // 꿀팁 제출 여부와 상관없이 완료 처리
    setTipsSubmitted(true);
  };

  if (loading) {
    return (
      <section className="content-card survey-section" id="survey">
        <div className="card-header">
          <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="50" height="60" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
            <line x1="35" y1="35" x2="45" y2="35" stroke="currentColor" strokeWidth="3"/>
            <line x1="35" y1="45" x2="45" y2="45" stroke="currentColor" strokeWidth="3"/>
            <circle cx="40" cy="35" r="3" fill="currentColor"/>
            <circle cx="40" cy="45" r="3" fill="currentColor"/>
          </svg>
          <h2>수련자의 길</h2>
        </div>
        <div className="card-content">
          <p className="survey-intro">설문조사를 불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="content-card survey-section" id="survey">
        <div className="card-header">
          <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="50" height="60" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
            <line x1="35" y1="35" x2="45" y2="35" stroke="currentColor" strokeWidth="3"/>
            <line x1="35" y1="45" x2="45" y2="45" stroke="currentColor" strokeWidth="3"/>
            <circle cx="40" cy="35" r="3" fill="currentColor"/>
            <circle cx="40" cy="45" r="3" fill="currentColor"/>
          </svg>
          <h2>수련자의 길</h2>
        </div>
        <div className="card-content">
          <p className="survey-intro" style={{ color: '#8B0000' }}>{error}</p>
          <p className="survey-intro">Supabase 설정을 확인해주세요.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="content-card survey-section" id="survey">
      <div className="card-header">
        <svg className="section-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="20" width="50" height="60" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line x1="35" y1="35" x2="45" y2="35" stroke="currentColor" strokeWidth="3"/>
          <line x1="35" y1="45" x2="45" y2="45" stroke="currentColor" strokeWidth="3"/>
          <line x1="35" y1="55" x2="45" y2="55" stroke="currentColor" strokeWidth="3"/>
          <circle cx="40" cy="35" r="3" fill="currentColor"/>
          <circle cx="40" cy="45" r="3" fill="currentColor"/>
          <circle cx="40" cy="55" r="3" fill="currentColor"/>
        </svg>
        <h2>수련자의 길</h2>
      </div>

      <div className="card-content">
        <p className="survey-intro">
          AI라는 거대한 힘이 강호를 뒤흔들고 있습니다.<br/>
          이 힘을 어떻게 다루느냐에 따라 그대의 무공 수준이 결정될 것입니다.<br/><br/>
          지금부터 그대의 수련 상태를 점검합니다.<br/>
          각 문항에 솔직히 답하면, <strong>신비한 환단</strong>과 <strong>필승 AI 비급서</strong>를 선물로 드리겠습니다.
        </p>

        <div className="surveys-container">
          {surveys.map((survey) => {
            const isMultiSelect = multiSelectQuestions.includes(survey.id);
            const totalVotes = getTotalVotes(survey.options);

            let currentSelections = [];

            if (isMultiSelect) {
              currentSelections = votedSurveys[survey.id] || [];
            }

            // 중복 선택은 항상 변경 가능, 단일 선택도 항상 변경 가능
            const hasVoted = false;

            return (
              <div key={survey.id} className="survey-card">
                <div className="survey-header">
                  <h3>Q{survey.id}. {survey.question}</h3>
                  {survey.description && (
                    <p className="survey-description">{survey.description}</p>
                  )}
                </div>

                <div className="survey-options">
                  {survey.options.map((option) => {
                    let isSelected;
                    if (isMultiSelect) {
                      isSelected = currentSelections.includes(option.id);
                    } else {
                      isSelected = votedSurveys[survey.id] === option.id;
                    }

                    return (
                      <div
                        key={option.id}
                        className={`survey-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleVote(survey.id, option.id)}
                      >
                        <div className="option-content">
                          <span className="option-text">{option.text}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {allSurveysCompleted() && !tipsSubmitted && (
          <div className="ai-tips-section">
            <div className="ai-tips-header">
              <h3>🎁 제 4장: 그대의 꿀팁을 천하에 알려라! (선택사항)</h3>
              <p className="ai-tips-intro">
                그대의 'AI 꿀팁'을 자랑하라!<br/>
                우수 팁을 공유한 자, <strong>추첨을 통해 특별한 선물</strong>을 하사한다!<br/>
                <em style={{ fontSize: '0.9em', color: '#666' }}>(작성하지 않고 넘어갈 수도 있습니다)</em>
              </p>
            </div>

            <form onSubmit={handleAiTipsSubmit} className="ai-tips-form">
              <div className="form-group">
                <label htmlFor="tipName">
                  Q10. [선택] 그대의 'AI 꿀팁'에 멋진 이름을 붙여보라.
                  <span className="label-hint">(예: 5분 만에 보고서 초안 완성술, AI로 조별과제 PPT 뼈대 만들기)</span>
                </label>
                <input
                  type="text"
                  id="tipName"
                  value={aiTips.tipName}
                  onChange={(e) => setAiTips({ ...aiTips, tipName: e.target.value })}
                  placeholder="AI 꿀팁 제목"
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetUsers">
                  Q11. [선택] 이 꿀팁은 어떤 사람들에게 특히 유용한가?
                  <span className="label-hint">(예: 모든 대학생, 기획자 등)</span>
                </label>
                <input
                  type="text"
                  id="targetUsers"
                  value={aiTips.targetUsers}
                  onChange={(e) => setAiTips({ ...aiTips, targetUsers: e.target.value })}
                  placeholder="대상 사용자"
                />
              </div>

              <div className="form-group">
                <label htmlFor="aiTool">
                  Q12. [선택] 어떤 AI 툴을 사용했는가?
                  <span className="label-hint">(예: ChatGPT, Midjourney 등)</span>
                </label>
                <input
                  type="text"
                  id="aiTool"
                  value={aiTips.aiTool}
                  onChange={(e) => setAiTips({ ...aiTips, aiTool: e.target.value })}
                  placeholder="사용한 AI 툴 이름"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipDescription">
                  Q13. [선택] 꿀팁 사용법을 상세히 공유하라. (과정, 사용한 질문/명령어 등)
                  <span className="label-hint">
                    가이드: "어떤 상황에서", "어떻게 질문(명령어)을 입력했는지", "어떤 결과가 나왔는지" 자세히 적어줄수록 당첨 확률이 높아진다!
                  </span>
                </label>
                <textarea
                  id="tipDescription"
                  value={aiTips.tipDescription}
                  onChange={(e) => setAiTips({ ...aiTips, tipDescription: e.target.value })}
                  placeholder="상황, 질문/명령어, 결과를 구체적으로 작성해주세요..."
                  rows="8"
                />
              </div>

              <button type="submit" className="submit-tips-btn">
                <span className="btn-icon">🎁</span>
                제출하고 결과 보기
                <span className="btn-icon">🎁</span>
              </button>
            </form>
          </div>
        )}

        {allSurveysCompleted() && tipsSubmitted && (
          <div className="show-result-section">
            <button
              className="show-result-btn"
              onClick={onComplete}
            >
              <span className="btn-icon">⚔️</span>
              제출하고 결과 보기
              <span className="btn-icon">⚔️</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Survey;
