# Story 3.2: 제보 데이터 Supabase 저장

**Story ID:** 3.2  
**Epic:** Epic 3 - 커뮤니티 제보 시스템  
**Status:** Ready for Implementation  
**Priority:** High  
**Estimate:** 5 Story Points

## Story Description

As a 시스템,  
I want 제보 데이터를 Supabase에 저장하고,  
So that 나중에 관리자가 검토할 수 있다.

## Acceptance Criteria

1. **AC-1**: Supabase 프로젝트 설정 및 테이블 스키마 생성
2. **AC-2**: 제보 테이블 구조 정의 (type, category, title, description, status, created_at)
3. **AC-3**: Supabase 클라이언트 설정 및 환경 변수 구성
4. **AC-4**: 제보 제출 시 Supabase에 데이터 저장
5. **AC-5**: 제보 성공 시 확인 메시지 표시
6. **AC-6**: 제보 실패 시 에러 핸들링

## Prerequisites

- Story 3.1 (제보 폼 UI) - ✅ 완료

## Implementation Plan

### 1단계: Supabase 프로젝트 설정

#### 필요한 작업
- [ ] Supabase 프로젝트 생성
- [ ] 테이블 스키마 작성 (`reports` 테이블)
- [ ] RLS (Row Level Security) 정책 설정
- [ ] 환경 변수 구성

#### 테이블 구조
```sql
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) NOT NULL, -- 'error', 'addition', 'other'
  category VARCHAR(20) NOT NULL, -- 'item', 'recipe', 'npc', 'location', 'event', 'other'
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewing', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);

-- RLS 정책 (읽기는 모든 사용자, 쓰기는 모든 사용자)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reports"
  ON reports FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert reports"
  ON reports FOR INSERT
  WITH CHECK (true);
```

### 2단계: Supabase 클라이언트 설정

#### 필요한 패키지 설치
```bash
npm install @supabase/supabase-js
```

#### 환경 변수 설정
`.env` 파일에 추가:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Supabase 클라이언트 생성
`src/lib/supabase.ts` 파일 생성:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 3단계: 제보 저장 로직 구현

#### Store 생성
`src/stores/report.ts` 파일 생성:
```typescript
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { ReportFormData } from '@/views/report/types'

export const useReportStore = defineStore('report', {
  actions: {
    async submitReport(data: ReportFormData) {
      const { data: inserted, error } = await supabase
        .from('reports')
        .insert([{
          type: data.type,
          category: data.category,
          title: data.title,
          description: data.description
        }])
        .select()
      
      if (error) throw error
      return inserted[0]
    }
  }
})
```

#### 제보 제출 핸들러 수정
`src/views/report/index.vue`의 `handleSubmit` 수정:
```typescript
import { useReportStore } from '@/stores/report'

const reportStore = useReportStore()

async function handleSubmit(reportData: ReportFormData): Promise<void> {
  try {
    await reportStore.submitReport(reportData)
    // 성공 메시지 표시
  } catch (error) {
    // 에러 처리
  }
}
```

## Architecture Decisions

### 1. 데이터베이스 선택: Supabase
- **이유**: 간단한 설정, 자동 API 생성, 실시간 기능, 무료 플랜 제공
- **대안**: Firebase, 직접 백엔드 구축 (비교적 복잡)

### 2. RLS 정책
- **읽기**: 모든 사용자 공개 (투명성)
- **쓰기**: 모든 사용자 허용 (접근성)
- **관리자**: 별도 인증 필요 (향후 구현)

### 3. 보안 고려사항
- RLS로 데이터 보호
- Anon Key만 사용 (제한된 권한)
- 향후 관리자 기능은 Service Role Key 사용

## Files to Create

- `src/lib/supabase.ts` - Supabase 클라이언트 설정
- `src/stores/report.ts` - 제보 Store (Supabase 연동)
- `.env` - 환경 변수 설정

## Files to Modify

- `src/views/report/index.vue` - 제보 제출 핸들러 수정
- `package.json` - @supabase/supabase-js 의존성 추가

## Testing Strategy

1. Supabase 연결 테스트
2. 제보 데이터 저장 테스트
3. 에러 핸들링 테스트
4. 성공 메시지 표시 테스트

## Progress Tracking

- [ ] Supabase 프로젝트 생성 및 설정
- [ ] 테이블 스키마 작성 및 배포
- [ ] Supabase 클라이언트 설정
- [ ] 제보 Store 구현
- [ ] 제보 제출 로직 구현
- [ ] 에러 핸들링 및 사용자 피드백
- [ ] 테스트 및 검증

---

**Definition of Done:**
- [ ] All acceptance criteria validated
- [ ] Supabase 테이블 스키마 적용 완료
- [ ] 제보 데이터가 Supabase에 정상 저장됨
- [ ] 에러 핸들링 완료
- [ ] 사용자 피드백 제공
- [ ] No regression in existing functionality
