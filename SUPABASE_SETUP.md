# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속 및 회원가입
2. 새 프로젝트 생성
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전 선택

## 2. 데이터베이스 테이블 생성

Supabase 대시보드 → SQL Editor에서 아래 SQL을 실행하세요:

```sql
-- surveys 테이블: 설문조사 질문
CREATE TABLE surveys (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- survey_options 테이블: 설문조사 선택지
CREATE TABLE survey_options (
  id BIGSERIAL PRIMARY KEY,
  survey_id BIGINT REFERENCES surveys(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  option_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- votes 테이블: 투표 기록 (선택사항: 중복 투표 방지용)
CREATE TABLE votes (
  id BIGSERIAL PRIMARY KEY,
  survey_id BIGINT REFERENCES surveys(id) ON DELETE CASCADE,
  option_id BIGINT REFERENCES survey_options(id) ON DELETE CASCADE,
  session_id TEXT,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ai_cases 테이블: AI 활용 사례 제출
CREATE TABLE ai_cases (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  tool_name TEXT,
  description TEXT NOT NULL,
  impact TEXT,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_survey_options_survey_id ON survey_options(survey_id);
CREATE INDEX idx_votes_survey_id ON votes(survey_id);
CREATE INDEX idx_votes_session_id ON votes(session_id);
CREATE INDEX idx_ai_cases_category ON ai_cases(category);
CREATE INDEX idx_ai_cases_created_at ON ai_cases(created_at DESC);

-- Row Level Security (RLS) 활성화
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_cases ENABLE ROW LEVEL SECURITY;

-- 읽기 권한: 누구나 가능
CREATE POLICY "Anyone can view surveys" ON surveys FOR SELECT USING (true);
CREATE POLICY "Anyone can view survey options" ON survey_options FOR SELECT USING (true);
CREATE POLICY "Anyone can view votes" ON votes FOR SELECT USING (true);
CREATE POLICY "Anyone can view ai cases" ON ai_cases FOR SELECT USING (true);

-- 쓰기 권한: 누구나 가능 (익명 투표/제출)
CREATE POLICY "Anyone can insert votes" ON votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update survey options votes" ON survey_options FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert ai cases" ON ai_cases FOR INSERT WITH CHECK (true);
```

## 3. 초기 데이터 입력

설문조사 데이터를 입력하세요:

```sql
-- 설문조사 1
INSERT INTO surveys (id, question, description) VALUES
(1, '가장 자주 사용하는 AI 도구는 무엇인가요?', '일상 또는 업무에서 가장 많이 활용하는 AI 도구를 선택해주세요');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(1, 'ChatGPT / Claude', 1),
(1, 'Midjourney / DALL-E', 2),
(1, 'GitHub Copilot', 3),
(1, 'Notion AI', 4),
(1, '기타', 5);

-- 설문조사 2
INSERT INTO surveys (id, question, description) VALUES
(2, 'AI가 가장 큰 변화를 가져올 분야는?', '향후 5년 내 AI의 영향력이 가장 클 것으로 예상되는 분야');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(2, '교육', 1),
(2, '의료 및 헬스케어', 2),
(2, '예술 및 창작', 3),
(2, '비즈니스 및 생산성', 4),
(2, '과학 연구', 5);

-- 설문조사 3
INSERT INTO surveys (id, question, description) VALUES
(3, 'AI 활용의 가장 큰 장벽은?', 'AI를 더 활용하지 못하는 이유가 무엇인가요?');

INSERT INTO survey_options (survey_id, text, option_order) VALUES
(3, '사용 방법을 잘 모름', 1),
(3, '비용 부담', 2),
(3, '개인정보 우려', 3),
(3, '결과의 신뢰성 문제', 4),
(3, '장벽 없음', 5);
```

## 4. 환경 변수 설정

1. 프로젝트 루트에 `.env` 파일 생성
2. Supabase 대시보드 → Settings → API에서 다음 값을 복사:
   - Project URL
   - anon/public API key

`.env` 파일에 입력:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. 개발 서버 재시작

```bash
npm start
```

## 주의사항

- `.env` 파일은 절대 git에 커밋하지 마세요 (`.gitignore`에 이미 포함됨)
- `anon key`는 클라이언트 사이드에서 사용해도 안전합니다 (RLS로 보호됨)
- 실제 서비스 배포 시에는 Vercel, Netlify 등의 환경 변수 설정에서 동일하게 입력하세요
