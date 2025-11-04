-- AI 꿀팁 제출 테이블 생성 (Q10-Q13)
CREATE TABLE IF NOT EXISTS ai_tips (
  id BIGSERIAL PRIMARY KEY,
  tip_name TEXT NOT NULL,
  target_users TEXT NOT NULL,
  ai_tool TEXT NOT NULL,
  tip_description TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_ai_tips_created_at ON ai_tips(created_at DESC);
CREATE INDEX idx_ai_tips_ai_tool ON ai_tips(ai_tool);

-- Row Level Security (RLS) 활성화
ALTER TABLE ai_tips ENABLE ROW LEVEL SECURITY;

-- 읽기 권한: 누구나 가능
CREATE POLICY "Anyone can view ai tips" ON ai_tips FOR SELECT USING (true);

-- 쓰기 권한: 누구나 제출 가능
CREATE POLICY "Anyone can insert ai tips" ON ai_tips FOR INSERT WITH CHECK (true);
