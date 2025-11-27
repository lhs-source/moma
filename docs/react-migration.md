# React 마이그레이션 문서

## 개요

이 문서는 Vue 3 프로젝트를 React로 마이그레이션한 작업 내용을 기록합니다.

**마이그레이션 기간**: 2025년 11월  
**마이그레이션 전**: Vue 3 + Pinia + Vue Router  
**마이그레이션 후**: React 18 + Zustand + React Router v6

## 마이그레이션 전략

### Strangler Pattern 적용

기존 Vue 프로젝트를 유지하면서 React 버전을 병렬로 구축하는 전략을 채택했습니다.

- **Vue 프로젝트**: `src/` 디렉토리 유지
- **React 프로젝트**: `src-react/` 디렉토리에 새로 구축
- **공유 리소스**: `src/data/`, `src/utils/` 등은 양쪽에서 공유

이를 통해 점진적 마이그레이션이 가능하며, 기존 Vue 앱과의 호환성을 유지할 수 있습니다.

## 기술 스택 변경

### 프론트엔드 프레임워크

| 항목 | Vue | React |
|------|-----|-------|
| 프레임워크 | Vue 3.5.13 | React 18.2.0 |
| 라우팅 | Vue Router 4.5.0 | React Router 6.28.0 |
| 상태 관리 | Pinia 3.0.1 | Zustand 4.5.4 |
| 빌드 도구 | Vite 6.2.4 | Vite 6.2.4 (동일) |
| 타입스크립트 | TypeScript 5.8.0 | TypeScript 5.8.0 (동일) |
| 스타일링 | Tailwind CSS 4.1.7 | Tailwind CSS 4.1.7 (동일) |

### 테스트 프레임워크

| 항목 | Vue | React |
|------|-----|-------|
| 테스트 프레임워크 | Vitest 3.1.1 | Vitest 3.1.1 (동일) |
| 컴포넌트 테스트 | @vue/test-utils 2.4.6 | @testing-library/react 16.1.0 |

## 프로젝트 구조

```
moma/
├── src/                    # Vue 프로젝트 (기존)
│   ├── views/             # Vue 페이지
│   ├── components/        # Vue 컴포넌트
│   ├── stores/            # Pinia stores
│   ├── router/            # Vue Router
│   ├── data/              # 공유 데이터
│   └── utils/             # 공유 유틸리티
│
├── src-react/             # React 프로젝트 (신규)
│   ├── pages/             # React 페이지
│   ├── components/        # React 컴포넌트
│   ├── stores/            # Zustand stores
│   ├── hooks/             # React hooks
│   ├── lib/               # React 전용 유틸리티
│   └── types/             # React 전용 타입
│
├── vite.config.ts         # Vue 빌드 설정
├── vite.react.config.ts   # React 빌드 설정
├── tsconfig.json          # Vue TypeScript 설정
└── tsconfig.react.json    # React TypeScript 설정
```

## 마이그레이션된 페이지

### 완료된 페이지 (8개)

1. **홈 페이지** (`/`)
   - 파일: `src-react/pages/HomePage.tsx`
   - 컴포넌트: `TimerInfo`, `TodoList`

2. **물물교환** (`/trade`)
   - 파일: `src-react/pages/TradePage.tsx`
   - Store: `src-react/stores/tradeStore.ts`
   - 컴포넌트: `TradeItem`, `WeeklySummaryTable`

3. **제작 시스템** (`/crafting`)
   - 파일: `src-react/pages/CraftingPage.tsx`
   - Store: `src-react/stores/craftingStore.ts`
   - 컴포넌트: `CategoryList`, `ItemList`, `SelectedItems`, `CraftingResults`

4. **데이터 목록** (`/data`)
   - 파일: `src-react/pages/DataPage.tsx`
   - Stores: `itemDataStore`, `recipeDataStore`, `npcDataStore`, `locationDataStore`, `purchaseDataStore`
   - 컴포넌트: `ItemList`, `RecipeList`, `NPCList`, `LocationList`, `PurchaseList`

5. **요리 시뮬레이팅** (`/cooking`)
   - 파일: `src-react/pages/CookingPage.tsx`
   - 컴포넌트: `RecipeGrid`, `SelectedRecipeList`, `MaterialsSummary`, `WeeklyBuyableGrid`, `WeeklyResetTimer`

6. **이벤트 캘린더** (`/events`)
   - 파일: `src-react/pages/EventPage.tsx`
   - Hooks: `useCalendarView`
   - 유틸리티: `src-react/lib/eventCalendar.ts`
   - 컴포넌트: `MonthCalendar`, `WeekCalendar`, `EventBar`, `EventDetailSheet`

7. **룬 도감** (`/rune`)
   - 파일: `src-react/pages/RunePage.tsx`
   - 컴포넌트: `RuneList`, `RuneCard`, `RuneDetailSheet`

8. **데이터 제보** (`/report`, `/report/list`, `/report/:id`)
   - 파일: `src-react/pages/ReportPage.tsx`, `ReportListPage.tsx`, `ReportDetailPage.tsx`
   - Store: `src-react/stores/reportStore.ts`
   - 컴포넌트: `ReportForm`
   - Supabase 연동

## 컴포넌트 마이그레이션

### UI 컴포넌트

다음 UI 컴포넌트들이 Vue에서 React로 포팅되었습니다:

- `Accordion` - 아코디언 컴포넌트
- `Button` - 버튼 컴포넌트
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - 카드 컴포넌트
- `Input` - 입력 필드
- `Select` (SelectTrigger, SelectValue, SelectContent, SelectItem) - 셀렉트 컴포넌트
- `Tabs` (TabsList, TabsTrigger, TabsContent) - 탭 컴포넌트
- `ThemeToggle` - 테마 토글
- `PageTitle`, `SectionTitle`, `CategoryTitle` - 제목 컴포넌트

### 주요 변경사항

#### 1. Props 정의 방식

**Vue (defineProps)**
```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  count?: number
}>(), {
  count: 0
})
</script>
```

**React (interface)**
```tsx
interface ComponentProps {
  title: string
  count?: number
}

export function Component({ title, count = 0 }: ComponentProps) {
  // ...
}
```

#### 2. 이벤트 핸들러

**Vue (emit)**
```vue
<script setup lang="ts">
const emit = defineEmits<{
  (ev: 'change', value: string): void
}>()

function handleClick() {
  emit('change', 'value')
}
</script>
```

**React (callback props)**
```tsx
interface ComponentProps {
  onChange: (value: string) => void
}

export function Component({ onChange }: ComponentProps) {
  function handleClick() {
    onChange('value')
  }
}
```

#### 3. 반응형 상태

**Vue (ref, computed)**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

**React (useState, useMemo)**
```tsx
import { useState, useMemo } from 'react'

function Component() {
  const [count, setCount] = useState(0)
  const doubled = useMemo(() => count * 2, [count])
}
```

#### 4. 생명주기 훅

**Vue (onMounted, onUnmounted)**
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // 초기화
})

onUnmounted(() => {
  // 정리
})
</script>
```

**React (useEffect)**
```tsx
import { useEffect } from 'react'

function Component() {
  useEffect(() => {
    // 초기화
    return () => {
      // 정리
    }
  }, [])
}
```

## Store 마이그레이션 (Pinia → Zustand)

### Pinia Store 예시

```typescript
// Vue (Pinia)
import { defineStore } from 'pinia'

export const useTradeStore = defineStore('trade', {
  state: () => ({
    disabledTrades: [] as string[],
    favoriteTrades: [] as string[],
  }),
  
  actions: {
    toggleTrade(id: string) {
      // ...
    }
  },
  
  getters: {
    filteredTrades: (state) => {
      // ...
    }
  }
})
```

### Zustand Store 예시

```typescript
// React (Zustand)
import { create } from 'zustand'

interface TradeStoreState {
  disabledTrades: string[]
  favoriteTrades: string[]
  toggleTrade: (id: string) => void
}

export const useTradeStore = create<TradeStoreState>((set, get) => ({
  disabledTrades: [],
  favoriteTrades: [],
  
  toggleTrade: (id: string) => {
    set((state) => {
      // ...
    })
  }
}))

// Selector (computed 대신)
export const selectFilteredTrades = (state: TradeStoreState) => {
  // ...
}
```

### 주요 차이점

1. **상태 정의**: Pinia는 `state`, `actions`, `getters`로 분리, Zustand는 단일 객체
2. **Getters**: Pinia는 `getters`, Zustand는 selector 함수로 구현
3. **로컬 스토리지**: Zustand는 `persist` 미들웨어 사용 (이 프로젝트에서는 직접 구현)
4. **타입 안전성**: 둘 다 TypeScript 지원

### 마이그레이션된 Stores

- `tradeStore.ts` - 물물교환 상태 관리
- `craftingStore.ts` - 제작 시스템 상태 관리
- `itemDataStore.ts` - 아이템 데이터 관리
- `recipeDataStore.ts` - 레시피 데이터 관리
- `npcDataStore.ts` - NPC 데이터 관리
- `locationDataStore.ts` - 위치 데이터 관리
- `purchaseDataStore.ts` - 구매 데이터 관리
- `reportStore.ts` - 제보 데이터 관리 (Supabase 연동)

## 라우팅 마이그레이션

### Vue Router

```typescript
// Vue Router
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/trade',
      name: 'trade',
      component: () => import('../views/trade/index.vue')
    }
  ]
})
```

### React Router

```tsx
// React Router
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/trade" element={<TradePage />} />
    </Routes>
  )
}
```

### 주요 차이점

1. **라우트 정의**: Vue는 객체 기반, React는 JSX 기반
2. **네비게이션**: Vue는 `router.push()`, React는 `useNavigate()` hook
3. **파라미터**: Vue는 `route.params`, React는 `useParams()` hook
4. **쿼리**: Vue는 `route.query`, React는 `useSearchParams()` hook

## 빌드 설정

### Vite 설정 분리

**Vue 빌드** (`vite.config.ts`)
```typescript
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

**React 빌드** (`vite.react.config.ts`)
```typescript
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './src-react',
  plugins: [react()],
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src-react', import.meta.url))
    }
  }
})
```

### TypeScript 설정 분리

**Vue** (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**React** (`tsconfig.react.json`)
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["src-react/*"]
    }
  },
  "include": [
    "src-react/**/*",
    "src/data/**/*",
    "src/utils/**/*"
  ]
}
```

## 주요 이슈 및 해결 방법

### 1. JSX Runtime 충돌

**문제**: Vue의 VNode가 React 컴포넌트로 렌더링되는 오류

**해결**: `vite.react.config.ts`에서 esbuild JSX 설정 명시
```typescript
esbuild: {
  jsx: 'automatic',
  jsxImportSource: 'react',
}
```

### 2. 모듈 해석 경로 문제

**문제**: `@/data` alias가 React 빌드에서 Vue 경로를 가리킴

**해결**: 
- `src/data` 내부 파일들의 import를 상대 경로로 변경
- `tsconfig.react.json`에 `src/data/**/*`, `src/utils/**/*` 포함

### 3. Zustand Selector 무한 루프

**문제**: Selector가 매번 새로운 객체를 반환하여 무한 리렌더링

**해결**: `zustand/shallow` 사용 및 빈 객체/배열 상수화
```typescript
import { shallow } from 'zustand/shallow'

const items = useStore(selectItems, shallow)
```

### 4. Supabase 환경 변수

**문제**: 개발 환경에서 Supabase 환경 변수가 없을 때 앱 크래시

**해결**: 더미 클라이언트 생성 및 경고 메시지
```typescript
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables.')
  supabase = createClient('https://dummy.supabase.co', 'dummy-key')
}
```

## 공유 리소스

다음 디렉토리들은 Vue와 React 양쪽에서 공유됩니다:

- `src/data/` - 게임 데이터 (아이템, 레시피, NPC 등)
- `src/utils/` - 유틸리티 함수
- `src/styles/` - 전역 스타일
- `public/` - 정적 파일

## 빌드 및 실행

### Vue 앱 실행
```bash
pnpm dev
```

### React 앱 실행
```bash
pnpm dev:react
```

### Vue 빌드
```bash
pnpm build
```

### React 빌드
```bash
pnpm build:react
```

### TypeScript 타입 체크
```bash
# Vue
pnpm type-check

# React
pnpm type-check:react
```

## 테스트

### Vue 테스트
```bash
pnpm test:unit
```

### React 테스트
현재 React 테스트는 아직 마이그레이션되지 않았습니다.  
기존 Vue 테스트 파일:
- `src/views/data/components/__tests__/ItemSchemaFilter.test.ts`
- `src/views/data/components/__tests__/ItemList.integration.test.ts`
- `src/composables/__tests__/useSchemaFilter.test.ts`

## 성능 고려사항

### 현재 상태

- 빌드 경고: "Some chunks are larger than 500 kB"
- 개선 필요: 코드 스플리팅 적용 권장

### 개선 방안

1. **Route-based Code Splitting**
```tsx
const TradePage = lazy(() => import('./pages/TradePage'))
```

2. **Component-based Code Splitting**
```tsx
const HeavyComponent = lazy(() => import('./components/HeavyComponent'))
```

3. **Manual Chunks 설정**
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'router': ['react-router-dom'],
        'zustand': ['zustand'],
      }
    }
  }
}
```

## 마이그레이션 체크리스트

### 완료된 항목

- [x] React 프로젝트 구조 설정
- [x] Vite 빌드 설정 분리
- [x] TypeScript 설정 분리
- [x] 모든 페이지 마이그레이션 (8개)
- [x] 모든 Store 마이그레이션 (8개)
- [x] 주요 UI 컴포넌트 마이그레이션
- [x] 라우팅 설정
- [x] Supabase 연동

### 남은 작업

- [ ] 테스트 파일 마이그레이션 (3개)
- [ ] 빌드 최적화 (코드 스플리팅)
- [ ] 성능 최적화
- [ ] 문서화 보완

## 참고 자료

- [React 공식 문서](https://react.dev/)
- [Zustand 문서](https://zustand-demo.pmnd.rs/)
- [React Router 문서](https://reactrouter.com/)
- [Vite 문서](https://vitejs.dev/)

## 변경 이력

- 2025-11: 초기 React 마이그레이션 시작
- 2025-11: 모든 주요 페이지 마이그레이션 완료
- 2025-11: 문서 작성

---

**작성자**: AI Assistant  
**최종 업데이트**: 2025년 11월

