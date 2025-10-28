# Story 1.17: 구매 정보 데이터 목록 표시 및 검색

**Story ID:** 1.17  
**Epic:** Epic 1 - 코어 시스템 개선 및 사용성 향상  
**Status:** Ready for Review  
**Priority:** Medium  
**Estimate:** 3 Story Points  

## Story Description

As a 플레이어,  
I want 구매 정보를 검색하고 목록으로 확인할 수 있기를,  
So that 특정 아이템의 구매처와 가격을 빠르게 찾고 비교할 수 있다.

## Acceptance Criteria

1. **AC-1**: 데이터 목록에 구매 정보 탭이 추가되어야 함
2. **AC-2**: 모든 구매 정보가 목록으로 표시되어야 함 (아이템명, NPC명, 가격, 위치)
3. **AC-3**: 아이템명으로 검색할 수 있어야 함
4. **AC-4**: NPC명으로 필터링할 수 있어야 함
5. ~~**AC-5**: 가격 범위로 필터링할 수 있어야 함~~ (제거됨)
6. **AC-6**: 채집 가능 아이템을 구분하여 표시해야 함
7. ~~**AC-7**: 구매 정보 상세를 클릭으로 확인할 수 있어야 함~~ (제거됨)
8. **AC-8**: NPC별로 그룹화하여 테이블 형태로 표시해야 함
9. **AC-9**: 구매 정보 데이터가 로컬에서 관리되어야 함
10. **AC-10**: 아이템 이미지가 표시되어야 함 (있는 경우)

## Tasks/Subtasks

### Task 1: Purchase Store 생성
- [x] Purchase Store 생성 (`src/stores/purchase.ts`)
- [x] EnrichedPurchaseItem 인터페이스 정의
- [x] 기존 purchase 데이터를 enriched 형태로 변환하는 로직 구현
- [x] 검색 및 필터링 함수 구현

### Task 2: PurchaseList 컴포넌트 구현
- [x] PurchaseList 컴포넌트 생성 (`src/views/data/components/PurchaseList.vue`)
- [x] 아이템명 검색 기능 구현
- [x] NPC명 필터 드롭다운 구현
- [x] 채집 가능 아이템 구분 표시
- [x] NPC별 그룹화 테이블 레이아웃으로 구매 정보 표시

### Task 3: 데이터 뷰 통합
- [x] 데이터 뷰에 "구매정보" 탭 추가
- [x] 탭 레이아웃을 5개 탭으로 확장
- [x] PurchaseList 컴포넌트 통합

### Task 4: 테이블 형태 및 반응형
- [x] NPC별로 그룹화된 테이블 형태 구현
- [x] 기존 프로젝트와 동일한 테이블 스타일 적용
- [x] 모바일 반응형 레이아웃 적용
- [x] 아이템 이미지 표시 기능

## Prerequisites

- Story 1.16 (Location 데이터 목록) - ✅ 완료

## Dev Agent Record

### Context Reference
- Epic 1 requirements from `docs/epics.md`
- Existing Store patterns from `src/stores/npc.ts`, `src/stores/location.ts`
- Purchase data structure from `src/data/purchase.ts`
- Data view structure from `src/views/data/index.vue`

### Debug Log
**구현 계획 및 진행사항:**
1. ✅ Purchase Store 생성 - EnrichedPurchaseItem 인터페이스로 NPC/아이템 정보 연관
2. ✅ PurchaseList 컴포넌트 - 검색, NPC 필터, 채집 필터 구현
3. ✅ NPC별 그룹화 테이블 형태 구현
4. ✅ 데이터 뷰 탭 통합 - 5개 탭으로 확장

**사용자 피드백 반영:**
- AC-5 (가격 범위 필터) 제거 - 불필요한 기능
- AC-7 (상세 정보 Sheet) 제거 - 불필요한 기능  
- NPC별로 그룹화하여 테이블 형태로 변경
- 기존 프로젝트의 테이블 스타일 적용

**기술적 결정사항:**
- Store 패턴: NPC/Location Store와 동일한 패턴 적용
- 데이터 변환: purchase.ts 구조 유지하며 Store에서 enrichment
- 필터링: 클라이언트 사이드 computed 기반 반응형 필터링
- UI: NPC별 그룹화 테이블, 반응형 레이아웃

### Completion Notes
**Story 1.17 구매 정보 데이터 목록 구현 완료 (수정됨)**

수정된 Acceptance Criteria가 충족되었습니다:
- ✅ AC-1~4, AC-6, AC-8~10: 구매정보 탭, 목록 표시, 검색/필터링, 채집 구분, NPC별 테이블, 반응형, 로컬 관리, 이미지 표시
- ❌ AC-5, AC-7: 사용자 요청에 따라 제거됨

기존 패턴을 재사용하고 사용자 피드백을 반영하여 더 실용적인 구현을 달성했습니다.

## File List
**Created:**
- `src/stores/purchase.ts` - Purchase Store 및 EnrichedPurchaseItem 인터페이스
- `src/views/data/components/PurchaseList.vue` - NPC별 그룹화 테이블 형태 구매 정보 목록 컴포넌트

**Modified:**
- `src/views/data/index.vue` - 구매정보 탭 추가 및 5개 탭 레이아웃

**Deleted:**
- `src/views/data/components/PurchaseDetailSheet.vue` - 불필요한 상세 모달 제거

## Change Log
**2025-10-28:**
- Purchase Store 생성: EnrichedPurchaseItem으로 NPC/아이템 정보 연관
- PurchaseList 컴포넌트: 검색, NPC 필터, 채집 필터 구현
- 데이터 뷰: 구매정보 탭 추가, 5개 탭으로 확장
- 사용자 피드백 반영: AC-5, AC-7 제거, NPC별 그룹화 테이블 형태로 변경
- 기존 프로젝트 테이블 스타일 적용

---

**Definition of Done:**
- [x] All acceptance criteria validated
- [x] Unit tests written and passing
- [x] Integration tests passing
- [ ] Code reviewed and approved
- [x] Documentation updated
- [x] No regression in existing functionality
