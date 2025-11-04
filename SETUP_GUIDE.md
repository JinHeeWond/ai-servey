# AI 연구 설문조사 웹사이트 설정 가이드

## 🎯 개요

무협 테마의 AI 활용 설문조사 웹사이트입니다.
- **Q1-Q9**: 선택형 설문조사 (일부 중복 선택 가능)
- **Q10-Q13**: AI 꿀팁 공유 (텍스트 입력)

## 📋 Supabase 설정 (필수)

### 1단계: UPDATE_SURVEY_DATA.sql 실행

Supabase 대시보드 → SQL Editor에서 실행:

```bash
파일: UPDATE_SURVEY_DATA.sql
```

이 파일은 Q1-Q9의 설문조사 질문과 선택지를 생성합니다.

**중요**:
- 첫 실행: SUCCESS 메시지 표시
- 두 번째 실행: 에러 발생 (정상 - 이미 데이터가 있음)
- 데이터를 초기화하려면 그대로 재실행하면 됩니다 (DELETE → INSERT)

### 2단계: CREATE_AI_TIPS_TABLE.sql 실행

Supabase 대시보드 → SQL Editor에서 실행:

```bash
파일: CREATE_AI_TIPS_TABLE.sql
```

이 파일은 Q10-Q13의 AI 꿀팁 제출을 위한 테이블을 생성합니다.

**참고**: 이 SQL은 `IF NOT EXISTS`를 사용하므로 여러 번 실행해도 안전합니다.

## 🚀 로컬 실행

```bash
cd C:\Projects\pd\ai-research-site
npm start
```

브라우저에서 http://localhost:3000 으로 접속

## 📊 설문조사 구조

### 선택형 질문 (Q1-Q9)

| 질문 | 유형 | 특징 |
|------|------|------|
| Q1 | 단일 선택 | 소속 학부/직업 (9개 옵션) |
| Q2 | 단일 선택 | AI 사용 빈도 |
| Q3 | 중복 선택 ⭐ | AI 사용 용도 |
| Q4 | 중복 선택 ⭐ | AI 학습 경로 |
| Q5 | 단일 선택 | AI 학습 장애물 |
| Q6 | 중복 선택 ⭐ | 실망스러운 경험 |
| Q7 | 단일 선택 | 구독 의향 |
| Q8 | 단일 선택 | 적정 구독료 |
| Q9 | 단일 선택 | 꿀팁 공유 페이지 참여 의향 |

### AI 꿀팁 입력 (Q10-Q13)

Q1-Q9 완료 후 표시됩니다:

- **Q10**: 꿀팁 제목 (텍스트 입력)
- **Q11**: 대상 사용자 (텍스트 입력)
- **Q12**: 사용 AI 도구 (텍스트 입력)
- **Q13**: 꿀팁 상세 설명 (긴 텍스트 입력)

## 🔄 워크플로우

1. 참여자가 Q1-Q9 설문조사 완료
2. AI 꿀팁 입력 폼 표시 (Q10-Q13)
3. 꿀팁 제출 완료
4. 완료 메시지 + QR 코드 표시
5. "다음 수련자" 버튼 → 새로운 참여자를 위해 초기화
   - localStorage 초기화
   - 새로운 session_id 생성
   - 설문조사 처음부터 다시 시작

## 💾 Supabase 데이터 확인

### 설문조사 응답 확인

```sql
-- 모든 투표 확인
SELECT * FROM votes ORDER BY created_at DESC;

-- 각 옵션별 투표 수
SELECT
  s.question,
  so.text,
  so.votes
FROM survey_options so
JOIN surveys s ON s.id = so.survey_id
ORDER BY s.id, so.option_order;
```

### AI 꿀팁 확인

```sql
-- 모든 AI 꿀팁 확인
SELECT
  tip_name,
  target_users,
  ai_tool,
  tip_description,
  created_at
FROM ai_tips
ORDER BY created_at DESC;

-- AI 도구별 통계
SELECT
  ai_tool,
  COUNT(*) as count
FROM ai_tips
GROUP BY ai_tool
ORDER BY count DESC;
```

## 🎨 디자인 특징

- **색상 팔레트**:
  - 다크 브라운 (#2C1810)
  - 딥 레드 (#8B0000)
  - 골드 (#DAA520)
  - 크림 (#F5F1E8)

- **폰트**:
  - 'Noto Serif KR' (본문)
  - 'Noto Sans KR' (UI 요소)

- **테마**: 무협 / 무공 / 수련자

## ⚠️ 주의사항

1. **환경 변수**: `.env` 파일은 절대 GitHub에 커밋하지 마세요
2. **SQL 재실행**: UPDATE_SURVEY_DATA.sql은 재실행 시 모든 데이터를 초기화합니다
3. **세션 관리**: 각 참여자는 고유한 session_id를 받습니다
4. **중복 선택**: Q3, Q4, Q6는 "선택 완료" 버튼을 눌러야 제출됩니다

## 📱 반응형 디자인

- 모바일 최적화 완료
- 768px 이하에서 레이아웃 자동 조정
- 터치 인터랙션 지원

## 🔧 트러블슈팅

### 문제: "설문조사를 불러오는 중 오류가 발생했습니다"
**원인**: Supabase SQL이 실행되지 않았거나 .env 파일 오류
**해결**:
1. UPDATE_SURVEY_DATA.sql 실행 확인
2. .env 파일의 REACT_APP_SUPABASE_URL과 REACT_APP_SUPABASE_ANON_KEY 확인

### 문제: AI 꿀팁 제출 시 에러
**원인**: ai_tips 테이블이 생성되지 않음
**해결**: CREATE_AI_TIPS_TABLE.sql 실행

### 문제: 중복 선택이 안 됨
**원인**: Q3, Q4, Q6 이외의 질문은 단일 선택만 가능
**해결**: 중복 선택 질문에서는 "선택 완료" 버튼을 클릭해야 함

## 📈 데이터 분석 팁

```sql
-- 가장 인기 있는 AI 사용 용도 (Q3)
SELECT
  so.text,
  COUNT(v.id) as vote_count
FROM votes v
JOIN survey_options so ON so.id = v.option_id
WHERE v.survey_id = 3
GROUP BY so.text
ORDER BY vote_count DESC;

-- 학부별 AI 사용 빈도 상관관계
SELECT
  q1.text as department,
  q2.text as frequency,
  COUNT(*) as count
FROM votes v1
JOIN votes v2 ON v1.session_id = v2.session_id
JOIN survey_options q1 ON v1.option_id = q1.id
JOIN survey_options q2 ON v2.option_id = q2.id
WHERE v1.survey_id = 1 AND v2.survey_id = 2
GROUP BY q1.text, q2.text
ORDER BY q1.text, count DESC;
```
