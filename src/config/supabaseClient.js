import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 설정
// 실제 사용 시 .env 파일에서 환경 변수로 관리하세요
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
