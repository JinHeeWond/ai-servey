-- =============================================
-- Q1 옵션 업데이트 (기존 옵션 삭제 후 새로 추가)
-- =============================================

-- 1. Q1의 기존 옵션들 모두 삭제 (survey_id = 1인 모든 옵션)
DELETE FROM survey_options WHERE survey_id = 1;

-- 2. Q1의 새 옵션들 추가
INSERT INTO survey_options (id, survey_id, text, votes, option_order) VALUES
(1, 1, '🧠 경영경제학부, 법학부 등', 0, 1),
(2, 1, '🛠️ 전산전자공학부, 기계제어공학부, AI융합학부 등', 0, 2),
(3, 1, '🎨 커뮤니케이션학부, 콘텐츠융합디자인학부 등', 0, 3),
(4, 1, '🌍 국제어문학부, 상담심리사회복지학부, 생명과학부 등', 0, 4),
(5, 1, '🐣 글로벌리더십학부 등 1학년', 0, 5),
(6, 1, '🗺️ 타 대학 학생', 0, 6),
(7, 1, '💼 직장인', 0, 7),
(8, 1, '🚶 기타', 0, 8);


-- =============================================
-- Q7 업데이트 (핵심 질문 - AI 가이드북)
-- =============================================

-- 1. Q7 질문 업데이트 (이미 존재하므로 UPDATE 사용)
UPDATE surveys
SET question = '[핵심] 둘 중 그대에게 더 절실한 ''AI 가이드북''은 무엇인가?',
    description = NULL,
    active = true
WHERE id = 7;

-- 2. Q7의 기존 옵션 삭제 (있다면)
DELETE FROM survey_options WHERE survey_id = 7;

-- 3. Q7 옵션들 추가
INSERT INTO survey_options (id, survey_id, text, votes, option_order) VALUES
(71, 7, '🅰️ "ChatGPT 고급 사용법 완벽 가이드"', 0, 1),
(72, 7, '🅱️ "내 직무만을 위한 AI 활용 보고서 작성법"', 0, 2);


-- =============================================
-- Q5 업데이트 (핵심 - AI 학습 방해물)
-- =============================================

-- 1. Q5 질문 업데이트
UPDATE surveys
SET question = '[핵심] AI를 ''제대로'' 배우고 활용하려 할 때 가장 큰 방해물은 무엇인가?',
    description = NULL,
    active = true
WHERE id = 5;

-- 2. Q5의 기존 옵션 삭제
DELETE FROM survey_options WHERE survey_id = 5;

-- 3. Q5 새 옵션들 추가
INSERT INTO survey_options (id, survey_id, text, votes, option_order) VALUES
(51, 5, '🌊 정보들이 여기저기 흩어져 있어 체계가 잡히지 않는다.', 0, 1),
(52, 5, '🏃‍♂️ AI 기술이 너무 빨리 변해서 뭘 배워야 할지 따라가기 벅차다.', 0, 2),
(53, 5, '👨‍🔬 너무 기술자(개발자) 중심이거나 용어가 어려워 이해가 안 된다.', 0, 3),
(54, 5, '🤔 배워도 내 실제 업무(전공)에 어떻게 써야 할지 감이 오지 않는다.', 0, 4),
(55, 5, '💸 제대로 배우려니 수강료가 부담된다.', 0, 5);


-- =============================================
-- Q6 업데이트 (잘못된 정보 경험 - 중복 선택 가능)
-- =============================================

-- 1. Q6 질문 업데이트
UPDATE surveys
SET question = '잘못된 정보를 보고 실망했던 경험이 있다면 골라보라. (중복 선택 가능)',
    description = NULL,
    active = true
WHERE id = 6;

-- 2. Q6의 기존 옵션 삭제
DELETE FROM survey_options WHERE survey_id = 6;

-- 3. Q6 새 옵션들 추가
INSERT INTO survey_options (id, survey_id, text, votes, option_order) VALUES
(61, 6, '안 되는 기능이나 낡은 UI를 알려줬다.', 0, 1),
(62, 6, '너무 뻔한 기초이거나, 반대로 지식이 부족해 너무 어려웠다.', 0, 2),
(63, 6, '광고성 내용이 절반이라 신뢰가 가지 않았다.', 0, 3),
(64, 6, '내 직무/전공에서 바로 쓸 수 있는 실전 팁이 없었다.', 0, 4);


-- =============================================
-- Q8 업데이트 (AI 학습 플랫폼 구독 의향)
-- =============================================

-- 1. Q8 질문 업데이트
UPDATE surveys
SET question = '만약 매월 일정 구독료를 내고, 아래 혜택을 모두 누릴 수 있는 AI 학습 플랫폼이 있다면 가입할 의향이 있는가?',
    description = '[제공 혜택] 내 직무(분야)에 딱 맞는 [체계적인 실전 코스] / 매주 업데이트되는 [최신 동향 및 AI 팁 요약] / 결과물이 달라지는 [AI 질문 모음집] / 현직 고수(전문가)에게 직접 묻는 [비밀 Q&A]',
    active = true
WHERE id = 8;

-- 2. Q8의 기존 옵션 삭제
DELETE FROM survey_options WHERE survey_id = 8;

-- 3. Q8 새 옵션들 추가
INSERT INTO survey_options (id, survey_id, text, votes, option_order) VALUES
(81, 8, '🤩 네, 당장 입문합니다.', 0, 1),
(82, 8, '🤔 긍정적으로 고려해봅니다.', 0, 2),
(83, 8, '😥 잘 모르겠습니다 / 무료 팁만 보겠습니다.', 0, 3),
(84, 8, '🙅‍♂️ 아니요, 필요 없습니다.', 0, 4);


-- =============================================
-- Q9 업데이트 (구독료 적정 가격)
-- =============================================

-- 1. Q9 질문 업데이트 및 활성화
UPDATE surveys
SET question = '(Q8에서 ''긍정'' 이상 응답 시) 월 얼마의 구독료가 적당하다고 생각하는가?',
    description = NULL,
    active = true
WHERE id = 9;

-- 2. Q9의 기존 옵션 삭제
DELETE FROM survey_options WHERE survey_id = 9;

-- 3. Q9 새 옵션들 추가
INSERT INTO survey_options (id, survey_id, text, votes, option_order) VALUES
(91, 9, '무료 팁만 보겠습니다.', 0, 1),
(92, 9, '월 4,900원 (커피 1잔)', 0, 2),
(93, 9, '월 9,900원 (커피 2잔)', 0, 3),
(94, 9, '월 19,900원 (치킨 1마리)', 0, 4),
(95, 9, '월 29,900원 (표준)', 0, 5),
(96, 9, '월 49,900원 이상', 0, 6);


-- =============================================
-- 검증 쿼리 (업데이트 후 확인용)
-- =============================================

-- Q1 옵션 확인
SELECT s.id, s.question, so.id as option_id, so.text, so.option_order
FROM surveys s
LEFT JOIN survey_options so ON s.id = so.survey_id
WHERE s.id = 1
ORDER BY so.option_order;

-- Q7 옵션 확인
SELECT s.id, s.question, so.id as option_id, so.text, so.option_order
FROM surveys s
LEFT JOIN survey_options so ON s.id = so.survey_id
WHERE s.id = 7
ORDER BY so.option_order;

-- 전체 설문 순서 확인
SELECT s.id, s.question, s.active, COUNT(so.id) as option_count
FROM surveys s
LEFT JOIN survey_options so ON s.id = so.survey_id
WHERE s.active = true
GROUP BY s.id, s.question, s.active
ORDER BY s.id;
