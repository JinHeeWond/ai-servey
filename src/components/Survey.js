import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { translations } from '../config/translations';

function Survey({ onComplete, onReset }) {
  const [surveys, setSurveys] = useState([]);
  const [votedSurveys, setVotedSurveys] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'ko';
  });

  // AI 꿀팁 입력 필드 (Q10-Q13)
  const [aiTips, setAiTips] = useState({
    tipName: '',
    targetUsers: '',
    aiTool: '',
    tipDescription: ''
  });
  const [tipsSubmitted, setTipsSubmitted] = useState(false);

  // 중복 선택 가능한 질문 ID
  const multiSelectQuestions = [3, 4, 6]; // Q3: AI 용도, Q4: 학습 경로, Q6: 잘못된 정보 경험

  // 세션 ID 생성 또는 가져오기
  const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };

  // 언어 전환 함수
  const toggleLanguage = () => {
    const newLang = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  // 현재 언어의 번역 가져오기
  const t = translations[language];

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
      setError(`${t.ui.error} ${err.message || ''}`);
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
      // 중복 선택 가능한 질문 - 즉시 UI 업데이트
      // 기존 데이터가 배열이 아니면 배열로 변환
      let currentSelections = votedSurveys[surveyId] || [];
      if (!Array.isArray(currentSelections)) {
        currentSelections = currentSelections ? [currentSelections] : [];
      }
      const isSelected = currentSelections.includes(optionId);

      // 즉시 UI 업데이트 (Optimistic Update)
      let newSelections;
      if (isSelected) {
        newSelections = currentSelections.filter(id => id !== optionId);
      } else {
        newSelections = [...currentSelections, optionId];
      }

      const newVotedSurveys = { ...votedSurveys, [surveyId]: newSelections };
      setVotedSurveys(newVotedSurveys);
      localStorage.setItem('userVotes', JSON.stringify(newVotedSurveys));

      // UI 투표 수 업데이트
      const updatedSurveys = surveys.map(survey => {
        if (survey.id === surveyId) {
          return {
            ...survey,
            options: survey.options.map(option =>
              option.id === optionId
                ? { ...option, votes: isSelected ? Math.max(0, option.votes - 1) : option.votes + 1 }
                : option
            )
          };
        }
        return survey;
      });
      setSurveys(updatedSurveys);

      // 백그라운드에서 서버 업데이트
      try {
        const sessionId = getSessionId();

        if (isSelected) {
          await supabase.rpc('decrement_votes', { option_id: optionId });
          await supabase
            .from('votes')
            .delete()
            .eq('survey_id', surveyId)
            .eq('option_id', optionId)
            .eq('session_id', sessionId);
        } else {
          await supabase.rpc('increment_votes', { option_id: optionId });
          await supabase.from('votes').insert([{
            survey_id: surveyId,
            option_id: optionId,
            session_id: sessionId
          }]);
        }
      } catch (err) {
        // 오류 발생 시 롤백
        setVotedSurveys(votedSurveys);
        localStorage.setItem('userVotes', JSON.stringify(votedSurveys));
        setSurveys(surveys);
        alert('투표 중 오류가 발생했습니다. 다시 시도해주세요.');
      }

    } else {
      // 단일 선택 질문 - 즉시 UI 업데이트
      const previousOptionId = votedSurveys[surveyId];

      // 즉시 UI 업데이트 (Optimistic Update)
      const newVotedSurveys = { ...votedSurveys, [surveyId]: optionId };
      setVotedSurveys(newVotedSurveys);
      localStorage.setItem('userVotes', JSON.stringify(newVotedSurveys));

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

      // 백그라운드에서 서버 업데이트
      try {
        await supabase.rpc('increment_votes', { option_id: optionId });

        if (previousOptionId) {
          await supabase.rpc('decrement_votes', { option_id: previousOptionId });
        }

        const sessionId = getSessionId();

        if (previousOptionId) {
          await supabase
            .from('votes')
            .delete()
            .eq('survey_id', surveyId)
            .eq('session_id', sessionId);
        }

        await supabase
          .from('votes')
          .insert([{
            survey_id: surveyId,
            option_id: optionId,
            session_id: sessionId
          }]);

      } catch (err) {
        // 오류 발생 시 롤백
        const rollbackVotedSurveys = { ...votedSurveys };
        if (previousOptionId) {
          rollbackVotedSurveys[surveyId] = previousOptionId;
        } else {
          delete rollbackVotedSurveys[surveyId];
        }
        setVotedSurveys(rollbackVotedSurveys);
        localStorage.setItem('userVotes', JSON.stringify(rollbackVotedSurveys));

        // 서버에서 다시 데이터 가져오기
        fetchSurveys();
        alert('투표 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
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
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }

    // 꿀팁 제출 여부와 상관없이 완료 처리
    setTipsSubmitted(true);

    // 완료 페이지로 이동
    onComplete();
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
          <h2>{language === 'ko' ? '수련자의 길' : 'Path of the Practitioner'}</h2>
        </div>
        <div className="card-content">
          <p className="survey-intro">{t.ui.loading}</p>
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
          <h2>{language === 'ko' ? '수련자의 길' : 'Path of the Practitioner'}</h2>
        </div>
        <div className="card-content">
          <p className="survey-intro" style={{ color: '#8B0000' }}>{error}</p>
          <p className="survey-intro">{t.ui.checkSupabase}</p>
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
        <h2>{language === 'ko' ? '수련자의 길' : 'Path of the Practitioner'}</h2>
        <button className="language-toggle-btn" onClick={toggleLanguage}>
          {t.ui.languageToggle}
        </button>
      </div>

      <div className="card-content">
        <p className="survey-intro">
          {language === 'ko' ? (
            <>
              AI라는 거대한 힘이 강호를 뒤흔들고 있습니다.<br/>
              이 힘을 어떻게 다루느냐에 따라 그대의 무공 수준이 결정될 것입니다.<br/><br/>
              지금부터 그대의 수련 상태를 점검합니다.<br/>
              각 문항에 솔직히 답하면, <strong>신비한 환단</strong>과 <strong>필승 AI 비급서</strong>를 선물로 드리겠습니다.
            </>
          ) : (
            <>
              The immense power of AI is shaking the martial world.<br/>
              Your martial arts level will be determined by how you handle this power.<br/><br/>
              Let's check your training status now.<br/>
              Answer each question honestly, and we'll provide you with <strong>mysterious wisdom</strong> and <strong>essential AI secrets</strong>.
            </>
          )}
        </p>

        <div className="surveys-container">
          {surveys.map((survey) => {
            const isMultiSelect = multiSelectQuestions.includes(survey.id);

            let currentSelections = [];

            if (isMultiSelect) {
              // 기존 데이터가 배열이 아니면 배열로 변환
              const stored = votedSurveys[survey.id];
              if (Array.isArray(stored)) {
                currentSelections = stored;
              } else if (stored) {
                currentSelections = [stored];
              } else {
                currentSelections = [];
              }
            }

            return (
              <div key={survey.id} className="survey-card">
                <div className="survey-header">
                  <h3>{t.questions[survey.id]?.question || survey.question}</h3>
                  {t.questions[survey.id]?.description && (
                    <p className="survey-description">{t.questions[survey.id].description}</p>
                  )}
                </div>

                <div className="survey-options">
                  {survey.options.map((option, index) => {
                    let isSelected;
                    if (isMultiSelect) {
                      isSelected = currentSelections.includes(option.id);
                    } else {
                      isSelected = votedSurveys[survey.id] === option.id;
                    }

                    // 번역된 옵션 텍스트 가져오기
                    const translatedText = t.questions[survey.id]?.options?.[index] || option.text;

                    return (
                      <div
                        key={option.id}
                        className={`survey-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleVote(survey.id, option.id)}
                      >
                        <div className="option-content">
                          <span className="option-text">{translatedText}</span>
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
              <h3>{t.ui.aiTipsTitle}</h3>
              <p className="ai-tips-intro">
                {language === 'ko' ? (
                  <>
                    그대의 'AI 꿀팁'을 자랑하라!<br/>
                    우수 팁을 공유한 자, <strong>추첨을 통해 특별한 선물</strong>을 하사한다!<br/>
                    <em style={{ fontSize: '0.9em', color: '#666' }}>(작성하지 않고 넘어갈 수도 있습니다)</em>
                  </>
                ) : (
                  <>
                    Share your AI tips!<br/>
                    Those who share excellent tips will receive <strong>special gifts through a lottery</strong>!<br/>
                    <em style={{ fontSize: '0.9em', color: '#666' }}>(You can skip this section)</em>
                  </>
                )}
              </p>
            </div>

            <form onSubmit={handleAiTipsSubmit} className="ai-tips-form">
              <div className="form-group">
                <label htmlFor="tipName">
                  {t.ui.tipNameLabel}
                </label>
                <input
                  type="text"
                  id="tipName"
                  value={aiTips.tipName}
                  onChange={(e) => setAiTips({ ...aiTips, tipName: e.target.value })}
                  placeholder={t.ui.tipNamePlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetUsers">
                  {t.ui.targetUsersLabel}
                </label>
                <input
                  type="text"
                  id="targetUsers"
                  value={aiTips.targetUsers}
                  onChange={(e) => setAiTips({ ...aiTips, targetUsers: e.target.value })}
                  placeholder={t.ui.targetUsersPlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="aiTool">
                  {t.ui.aiToolLabel}
                </label>
                <input
                  type="text"
                  id="aiTool"
                  value={aiTips.aiTool}
                  onChange={(e) => setAiTips({ ...aiTips, aiTool: e.target.value })}
                  placeholder={t.ui.aiToolPlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipDescription">
                  {t.ui.tipDescriptionLabel}
                </label>
                <textarea
                  id="tipDescription"
                  value={aiTips.tipDescription}
                  onChange={(e) => setAiTips({ ...aiTips, tipDescription: e.target.value })}
                  placeholder={t.ui.tipDescriptionPlaceholder}
                  rows="8"
                />
              </div>

              <button type="submit" className="submit-tips-btn">
                <span className="btn-icon">🎁</span>
                {t.ui.submitResults}
                <span className="btn-icon">🎁</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Survey;
