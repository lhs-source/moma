/**
 * # Supabase Client
 * 
 * ## 기능 설명
 * Supabase 클라이언트 인스턴스를 생성하고 반환
 * 
 * ## 주요 기능
 * - Supabase 프로젝트 연결
 * - 환경 변수에서 URL과 API 키 로드
 * - Singleton 패턴으로 단일 인스턴스 보장
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 환경 변수가 없을 때 더미 클라이언트 생성 (개발 환경 대응)
let supabase: ReturnType<typeof createClient>

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Report features will not work.')
  // 더미 클라이언트 생성 (실제 사용 시 에러 발생)
  supabase = createClient('https://dummy.supabase.co', 'dummy-key')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

