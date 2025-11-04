import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 설정
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://hmoxxxmvdfkswqnnmqnu.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhtb3h4eG12ZGZrc3dxbm5tcW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNTM5OTIsImV4cCI6MjA3NzcyOTk5Mn0.jJN5Yd5nAsqN1pk_pmKHGXFmUoTCvAA6hj-BsJiIFTA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
