-- 기존 데이터 삭제
DELETE FROM survey_options;
DELETE FROM surveys;
DELETE FROM votes;

-- 새로운 설문조사 데이터 입력

-- Q1. 그대는 현재 어느 분야에서 수련 중인가? (소속 학부/직업)
INSERT INTO surveys (id, question, description) VALUES
(1, '그대는 현재 어느 분야에서 수련 중인가?', '(소속 학부/직업)');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(1, '경영경제학부', 1),
(1, '전산전자공학부', 2),
(1, '미디어콘텐츠학부', 3),
(1, '인문사회계열', 4),
(1, '자연과학계열', 5),
(1, '예체능계열', 6),
(1, '직장인 (IT/기술)', 7),
(1, '직장인 (일반)', 8),
(1, '기타', 9);

-- Q2. 평소 AI를 얼마나 자주 사용하는가?
INSERT INTO surveys (id, question, description) VALUES
(2, '평소 AI를 얼마나 자주 사용하는가?', '');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(2, '숨 쉬듯이 사용한다 (하루 5회 이상)', 1),
(2, '매일 꾸준히 사용한다 (하루 1~4회)', 2),
(2, '자주 사용한다 (주 3~5회)', 3),
(2, '가끔 사용한다 (주 1~2회)', 4),
(2, '생각날 때만 사용한다 (월 1~3회)', 5),
(2, '거의 사용하지 않는다', 6);

-- Q3. AI를 주로 어떤 용도로 사용하는가?
INSERT INTO surveys (id, question, description) VALUES
(3, 'AI를 주로 어떤 용도로 사용하는가?', '');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(3, '📄 보고서 작성 및 문서 요약', 1),
(3, '💡 새로운 아이디어 탐색', 2),
(3, '🖼️ 이미지나 영상 제작', 3),
(3, '📊 데이터 정리 또는 엑셀 작업', 4),
(3, '🧑‍💻 코드 설계 및 프로그래밍', 5),
(3, '🔍 단순 정보 검색 (구글/네이버 대신)', 6),
(3, '💬 기타 (대화, 재미 등)', 7);

-- Q4. 새로운 AI 활용법이나 도구는 주로 어디서 얻는가?
INSERT INTO surveys (id, question, description) VALUES
(4, '새로운 AI 활용법이나 도구는 주로 어디서 얻는가?', '제 2장: 수련의 벽 (학습의 어려움)');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(4, '📺 유튜브', 1),
(4, '📝 블로그 / 아티클', 2),
(4, '💰 유료 온라인 강의', 3),
(4, '👥 지인 추천 또는 커뮤니티', 4),
(4, '🔍 구글링 / 검색', 5);

-- Q5. AI를 배우려 할 때 가장 답답했던 점은?
INSERT INTO surveys (id, question, description) VALUES
(5, 'AI를 배우려 할 때 가장 답답했던 점은?', '');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(5, '정보가 너무 많아서 어디서부터 시작해야 할지 모르겠다', 1),
(5, '기초 개념은 있는데, 실전 활용법을 모르겠다', 2),
(5, '최신 정보를 따라가기 힘들다', 3),
(5, '내 직무/전공에서 바로 쓸 수 있는 실전 팁이 없었다', 4),
(5, '딱히 어려움이 없다', 5);

-- Q6. AI 정보/강의/콘텐츠를 접했을 때 가장 실망스러운 경험은?
INSERT INTO surveys (id, question, description) VALUES
(6, 'AI 정보/강의/콘텐츠를 접했을 때 가장 실망스러운 경험은?', '');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(6, '겉핥기식 설명만 있고, 깊이가 없다', 1),
(6, '너무 어려워서 따라갈 수 없었다', 2),
(6, '실전에서 어떻게 쓰는지 모르겠다', 3),
(6, '이미 아는 내용만 반복된다', 4),
(6, '유료인데 기대만큼 가치가 없었다', 5),
(6, '특별히 실망한 적 없다', 6);

-- Q7. AI 학습 플랫폼 구독 의향
INSERT INTO surveys (id, question, description) VALUES
(7, 'AI 학습 플랫폼이 있다면 가입할 의향이 있는가?', '제 3장: AI 학습에 대한 그대의 생각 - 매월 일정 구독료로 체계적인 실전 코스, 최신 동향, AI 질문 모음집, 전문가 Q&A 제공');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(7, '🤩 네, 당장 입문합니다', 1),
(7, '🤔 긍정적으로 고려해봅니다', 2),
(7, '😥 잘 모르겠습니다 / 무료 팁만 보겠습니다', 3),
(7, '🙅‍♂️ 아니요, 필요 없습니다', 4);

-- Q8. 월 얼마의 구독료가 적당하다고 생각하는가?
INSERT INTO surveys (id, question, description) VALUES
(8, '월 얼마의 구독료가 적당하다고 생각하는가?', '');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(8, '5,000원 이하', 1),
(8, '10,000원', 2),
(8, '15,000원', 3),
(8, '20,000원', 4),
(8, '30,000원 이상', 5);

-- Q9. "AI 활용 꿀팁 공유" 페이지가 있다면 참여할 의향은?
INSERT INTO surveys (id, question, description) VALUES
(9, '"AI 활용 꿀팁 공유" 페이지가 있다면 참여할 의향은?', '다른 사람들의 실전 팁을 보고, 본인의 노하우도 공유 가능');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(9, '✍️ 네, 내 꿀팁도 올리고 다른 사람 것도 보고 싶어요', 1),
(9, '👀 다른 사람 꿀팁만 구경하고 싶어요', 2),
(9, '🤷 잘 모르겠어요', 3),
(9, '❌ 관심 없어요', 4);

-- Q10-Q13은 텍스트 입력 필드로, ai_tips 테이블에 저장됩니다.
-- 별도의 설문조사 옵션이 필요하지 않습니다.
