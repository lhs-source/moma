# 마비노기 모바일 팬툴 – 메뉴 및 기능 기획서

## 1. 프로젝트 개요
- **목적**: 마비노기 모바일 플레이어가 교환, 제작, 아이템/레시피 정보를 한 눈에 확인하고 주간 목표를 손쉽게 관리할 수 있도록 돕는 웹 기반 도우미 툴입니다.
- **대상 플랫폼**: 데스크톱 & 모바일 웹 브라우저 (Vue 3 + Vite 기반 SPA)
- **핵심 컨셉**: 
  - 게임 내 교환∙제작 컨텐츠의 *주간 반복 구조*와 *시간/재료 관리*를 웹상에서 시각화
  - "멤버십 혜택", "교환 제한" 등 **마비노기 모바일** 특유의 시스템을 반영
  - 모든 데이터는 로컬 스토리지에 저장하여 계정-연동 없이 개인화

---

## 2. 주요 메뉴 구조
| 경로 | 메뉴명 | 설명 |
|------|--------|------|
| `/` | 홈 (Home) | 첫 방문 환영 및 업데이트 안내. *(TheWelcome 컴포넌트)* |
| `/trade` | 교환 (Trade) | NPC 교환 목록 관리, 주간 필요 재료 계산 |
| `/crafting` | 제작 (Crafting) | 가공처·아이템 선택 → 필요 재료·제작 시간 계산 |
| `/items` | 아이템 | 아이템 DB 검색 & 필터링 (카테고리) |
| `/recipes` | 레시피 | 레시피 DB 검색 & 필터링 (카테고리·시설 레벨) |
| `/gear` | 장비 맞추기 | 장비 룬 선택 및 획득 경로 계산 |
| `/about` | 정보 (About) | 툴 소개 및 제작자 정보 |

> 네비게이션은 상단 탭/버튼 또는 햄버거 메뉴(모바일)로 구성하고, 다크모드를 기본 지원합니다.

---

## 3. 데이터 스키마 정의

### 3.1 아이템 (Item)
모든 스키마는 `id`를 포함합니다.

```typescript
interface Item {
  id: string;                    // 고유 식별자
  name: string;                  // 아이템 이름
  imageUrl: string;              // 아이템 이미지 파일명
  description?: string;           // 설명 (선택사항)
  category?: string;             // 카테고리 (선택사항)
  price?: number;                // 가격 (골드)
  isFromTrade?: boolean;         // 교환으로만 획득 가능한지 여부 (선택사항)
}
```

### 3.2 레시피 (Recipe)
```typescript
interface Recipe {
  id: string;                    // 고유 식별자
  sourceItems: SourceItem[];     // 필요 아이템 배열
  resultItem: string;            // 결과 아이템 ID
  facilityLevel?: number;        // 필요 시설 레벨
  category?: string;             // 가공처 카테고리
}

interface SourceItem {
  id: string;                    // 필요 아이템 ID
  count: number;                 // 필요 아이템 개수
}
```

### 3.3 획득 경로 (Acquisition)
```typescript
interface Acquisition {
  id: string;                    // 고유 식별자
  acquisitionType: 'dungeon' | 'monster' | 'vase' | 'quest' | 'shop' | 'crafting';
  itemId: string;                // 획득할 아이템 ID
  location?: string;             // 위치 정보
  monster?: string;              // 몬스터 이름
  vase?: string;                 // 항아리 정보
  quest?: string;                // 퀘스트 이름
  dropRate?: number;             // 드랍률 (0-1)
  difficulty?: string;           // 난이도
}
```

### 3.4 교환 (Trade)
```typescript
interface Trade {
  id: string;                    // 고유 식별자
  npcId: string;                 // NPC ID
  sourceItem: string;            // 교환에 필요한 아이템 ID
  resultItem: string;            // 교환해서 받을 수 있는 아이템 ID
  sourceCount: number;           // 교환에 필요한 아이템 개수
  resultCount: number;           // 받는 아이템 개수
  tradePeriod: 'daily' | 'weekly' | 'monthly' | 'none';  // 교환 주기
  tradeCount: number;            // 교환 주기 당 교환 가능 횟수
  isActive: boolean;             // 활성화 상태 (기본값: true)
  isFavorite: boolean;           // 즐겨찾기 상태 (기본값: false)
}
```

### 3.5 NPC
```typescript
interface NPC {
  id: string;                    // 고유 식별자
  name: string;                  // 이름
  location: string;              // 지역 ID
  imageUrl?: string;             // 이미지 (없으면 null)
  group: string;                 // 지역 그룹 (예: "타라", "던바튼")
}
```

### 3.6 룬 (Rune)
```typescript
interface Rune {
  id: string;                    // 고유 식별자
  name: string;                  // 룬 이름
  slot: 'weapon' | 'armor' | 'accessory';  // 장착 가능한 슬롯
  class?: string;                // 직업 제한 (장신구 룬의 경우)
  rarity: 'common' | 'rare' | 'epic' | 'legendary';  // 등급
  acquisitionPaths: AcquisitionPath[];  // 획득 경로들
}

interface AcquisitionPath {
  type: 'raid' | 'abyss' | 'dungeon' | 'crafting';
  requirements: {
    tokens?: number;             // 레이드 증표 필요 개수
    fossils?: number;            // 심연의 화석 필요 개수
    difficulty?: string;         // 난이도
    stage?: string;              // 스테이지
    weeklyReward?: number;       // 주간 보상
    dailyReward?: number;        // 일간 보상
  };
  estimatedWeeks: {              // 예상 소요 주차
    min: number;
    average: number;
    max: number;
  };
}
```

---

## 4. 상세 기능 정의

### 4.1 아이템 DB (`/items`)
- **아이템 나열 및 검색**
  - 이름·ID 실시간 검색
  - 카테고리별 필터링
  - 태그 표시: `제작 가능`, `교환 아이템`, `가격(G)` 등

- **아이템 활용도 검색**
  - 특정 아이템이 어느 레시피의 재료로 사용되는지 검색
  - 아이템을 얻기 위한 여러 경로를 한번에 표시
    - 교환, 획득, 구매, 조합, 제작 등

- **획득 경로 시각화**
  - 던전 드랍, 몬스터 드랍, 항아리 가챠, 퀘스트 보상 등
  - 각 경로별 드랍률 및 난이도 정보

### 4.2 제작 시뮬레이터 (`/crafting`)
- **3-열 레이아웃** (데스크톱)
  1. *가공처(CategoryList)* – 제빵소, 양조통, 대장간 등
  2. *제작 항목(ItemList)* – 선택 시 우측 열로 추가
  3. *선택된 항목/결과* – 필요 재료 · 제작 시간 요약

- **수량 조정 & 실시간 합계**
  - `+ / – / ×` 버튼으로 횟수 조정 및 삭제
  - 멀티선택 후 "선택 초기화" 가능

- **제작 시간 시뮬레이션**
  - 멤버십 토글(`MembershipToggle`) → 시간 50% 단축
  - 가공처별 총 시간 + 전체 합계 출력 (HH:MM:SS 형식)

- **주간 제작 계획**
  - 주간 제작 대상 아이템의 개수를 입력
  - 필요한 아이템의 개수와 시간을 자동 계산
  - 필요 재료 자동 합산 및 표시

### 4.3 주간 교환 (`/trade`)
- **교환 목록 관리**
  - NPC > 지역(group)별 카드 묶음 표시
  - 2 x N 카드 레이아웃으로 result item 아이콘을 크게 표시
  - Trade 스키마의 모든 내용을 적절히 표현

- **상태 관리**
  - **비활성화**: 토글 버튼으로 '활성/비활성' → 회색 처리 (주간 계산 제외)
  - **즐겨찾기**: 별 버튼으로 즐겨찾기 → 목록 상단 고정, 강조 색상
  - 상태는 `localStorage`에 영구 저장

- **주간 필요 재료 계산**
  - 비활성화하지 않은 Trade들의 주간 필요 아이템 계산
  - 교환 주기와 가능 횟수를 고려한 주당 교환 횟수 계산
  - **Crafting Trade**: recipe가 존재하는 경우, recipe의 필요 아이템들을 합산 (UI에 "제작" 표시)
  - **Nested Trade**: result item이 source item으로 사용되는 경우, trade의 필요 아이템을 합산 (UI에 "교환" 표시)

- **주간 목표 보조**
  - 교환 제한을 고려한 "주/일 처리 횟수" 산출
  - `TotalRequiredMaterials` 그리드에 재료별 총합 표시

### 4.4 장비 맞추기 (`/gear`)
- **룬 선택 및 장착**
  - 장비 부위별 룬 선택 (무기, 방어구, 장신구)
  - 직업별 필터링 (장신구 룬의 경우)
  - 같은 룬은 중복 장착 불가

- **획득 경로 정보**
  - 각 룬마다 획득처 상세 정보
  - 레이드 룬: 증표 70개 필요, 주간/일간 보상 기반 ETA 계산
  - 어비스 룬: 화석 600-900개 필요, 난이도별 보상 + 타임어택 체크박스

- **획득 기간 계산**
  - 어비스 정가라면 몇 주를 돌아야 하는지 계산
  - 예상 최소·평균·최대 소요 주차 표시
  - 획득 순서/루트 타임라인 그래프

- **승급 시스템**
  - 동일 등급 3개 → 상위 룬 1개
  - 병합 시뮬레이션 지원

---

## 5. 정책 및 제약 조건

### 5.1 교환 시스템 정책
- **교환 주기별 제한**
  - `daily`: 하루 1회
  - `weekly`: 일주일 1회
  - `monthly`: 한 달 1회
  - `none`: 제한 없음

- **교환 우선순위**
  1. 즐겨찾기된 교환 (상단 고정)
  2. 활성화된 교환
  3. 비활성화된 교환 (회색 처리)

### 5.2 제작 시스템 정책
- **멤버십 혜택**
  - 활성화 시 모든 제작 시간 50% 단축
  - 개별 아이템별로 적용

- **재료 계산 정책**
  - 레시피가 있는 경우: 재료 아이템들을 합산
  - 중첩된 제작: 단계별로 필요한 재료를 모두 계산

### 5.3 룬 시스템 정책
- **장착 제한**
  - 같은 룬은 슬롯별로 고유 (중복 불가)
  - 직업별 제한: 장신구 룬은 해당 직업만 장착 가능

- **획득 경로별 요구사항**
  - 레이드: 증표 70개 (주간/일간 보상 기반)
  - 어비스: 화석 600-900개 (난이도별 보상)
  - 심층 던전: 특정 룬만 드랍

---

## 6. 향후 확장 아이디어
1. **게임 내 '제작 숙련도' 시뮬레이션**
2. **길드 공유 링크** – 설정값(교환/제작 선택) 공유 URL 생성
3. **푸시 알림** – 일일 교환 재설정, 제작 완료 타이머
4. **실시간 시세 API 연동** – 거래소 가격 → 최적 교환 추천
5. **개인화된 추천 시스템** – 플레이 패턴 기반 최적 경로 제안

---

## 7. 마일스톤 제안
| 단계 | 기간 | 작업 내용 |
|------|------|-----------|
| v1.0 | 1주 | 기본 메뉴, 데이터 표시, 교환 UI 제작 |
| v1.1 | +1주 | 제작 시스템 UI + 멤버십 로직 |
| v1.2 | +1주 | 주간 필요 재료 계산, 즐겨찾기/비활성화 상태 저장 |
| v1.3 | +1주 | 아이템 DB 검색 및 획득 경로 표시 |
| v1.4 | +1주 | 레시피 검색 및 필터링 |
| v2.0 | +2주 | 장비 맞추기 시스템, 룬 획득 경로 계산 |
| v2.1 | +1주 | 국제화, 공유 링크, 모바일 UX 개선 |

---

## 8. 데이터 요구사항

### 8.1 필수 데이터
- **레이드별 증표 평균 수급량** (주간/일일)
- **어비스 난이도·스테이지별** 화석 드랍량 + 타임어택 보상 수치
- **심층 던전별 드랍 룬 목록** 구조화
- **직업별 추천 장신구 룬** 매핑 표

### 8.2 데이터 구조화 원칙
- 모든 스키마는 `id`를 포함하여 고유 식별 보장
- 선택적 필드는 `?`로 표시하여 유연성 확보
- 타입 안전성을 위한 TypeScript 인터페이스 활용
- 확장성을 고려한 구조 설계

> 본 문서는 `/src` 폴더의 코드 분석과 사용자 기획을 기반으로 작성되었습니다. 실제 게임 데이터 및 밸런스는 **마비노기 모바일** 공식 정보에 맞춰 주기적으로 업데이트해야 합니다. 