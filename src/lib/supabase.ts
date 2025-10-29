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

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
