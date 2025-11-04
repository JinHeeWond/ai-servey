-- decrement_votes 함수 추가
-- 설문조사 답변 변경 시 이전 투표를 감소시키는 함수

CREATE OR REPLACE FUNCTION decrement_votes(option_id INT)
RETURNS void AS $$
BEGIN
  UPDATE survey_options
  SET votes = GREATEST(votes - 1, 0)
  WHERE id = option_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
