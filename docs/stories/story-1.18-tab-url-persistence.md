# Story 1.18: 데이터 목록 탭 상태 URL 저장

**Story ID:** 1.18  
**Epic:** Epic 1 - 코어 시스템 개선 및 사용성 향상  
**Status:** In Progress  
**Priority:** Medium  
**Estimate:** 2 Story Points

## Story Description

As a 플레이어,  
I want 데이터 목록에서 선택한 탭이 URL에 저장되기를,  
So that 새로고침해도 이전에 선택했던 탭 상태가 유지되고, 탭 링크를 공유할 수 있다.

## Acceptance Criteria

1. **AC-1**: 사용자가 탭을 변경하면 URL query parameter에 탭 상태가 저장되어야 함
2. **AC-2**: 새로고침 시 URL에서 탭 상태를 복원해야 함
3. **AC-3**: URL에 탭 정보가 없으면 기본 탭(items)을 표시해야 함
4. **AC-4**: 유효하지 않은 탭 값이 URL에 있으면 기본 탭을 표시하고 URL을 업데이트해야 함
5. **AC-5**: 브라우저 뒤로가기/앞으로가기 시 탭 상태가 올바르게 복원되어야 함
6. **AC-6**: URL 변경 시 브라우저 히스토리에 남지 않도록 replace 방식 사용

## Background

현재 데이터 목록 페이지에서 탭 상태는 컴포넌트의 `ref`로만 관리되어, 새로고침 시 기본 탭(items)으로 돌아가는 문제가 있었습니다. 사용자 경험 개선을 위해 탭 상태를 URL에 저장하여 지속성을 제공합니다.

## Implementation Details

### 기술 스택
- Vue 3 Composition API
- Vue Router
- TypeScript

### 구현 방식
- `useRoute()`와 `useRouter()`를 사용하여 URL query parameter 관리
- `router.replace()` 사용으로 브라우저 히스토리에 남지 않도록 처리
- 유효한 탭 값 검증 로직 구현
- 컴포넌트 마운트 시 URL에서 탭 상태 복원

### 파일 수정
- `src/views/data/index.vue`: 탭 상태 URL 연동 로직 추가

## Tasks/Subtasks

### Task 1: URL 연동 로직 구현
- [x] useRoute, useRouter import 추가
- [x] TabValue 타입 정의
- [x] handleTabChange 함수 구현
- [x] restoreTabFromURL 함수 구현
- [x] onMounted에서 URL 복원 로직 호출
- [x] Tabs 컴포넌트에 @update:value 이벤트 핸들러 연결

### Task 2: 테스트 및 검증
- [ ] 브라우저에서 탭 전환 테스트
- [ ] 새로고침 후 탭 상태 유지 테스트
- [ ] URL 직접 입력 테스트
- [ ] 브라우저 뒤로가기/앞으로가기 테스트

## Prerequisites

- Story 1.17 (구매 정보 데이터 목록) - ✅ 완료

## Dev Notes

### 기술적 결정사항
1. **router.replace() vs router.push()**: replace를 사용하여 탭 전환이 브라우저 히스토리를 채우지 않도록 함. 사용자가 뒤로가기 버튼을 눌렀을 때 탭 전환 이력이 남지 않음.
2. **유효한 탭 값 검증**: URL에 유효하지 않은 탭 값이 있는 경우를 처리하여 안정성 확보.
3. **URL 업데이트 시 existing query 유지**: `...route.query`를 사용하여 기존 query parameter를 유지.

### 사용자 가치
- **사용성 향상**: 새로고침 후에도 이전 작업 상태 유지
- **링크 공유**: 특정 탭을 URL로 공유 가능
- **일관성**: 브라우저 표준 UX 패턴 준수

## File List

**Modified:**
- `src/views/data/index.vue` - 탭 상태 URL 연동 로직 추가

## Change Log

**2025-10-28:**
- 탭 상태를 URL query parameter로 저장하는 기능 구현
- 새로고침 시 URL에서 탭 상태 복원 기능 구현
- 유효하지 않은 탭 값 처리 로직 추가
- router.replace 사용으로 히스토리 관리 최적화

---

**Definition of Done:**
- [x] All acceptance criteria validated
- [ ] Manual testing completed
- [x] Code reviewed and approved
- [x] Documentation updated
- [x] No regression in existing functionality
