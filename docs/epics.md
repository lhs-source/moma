# moma - Epic Breakdown

**Author:** hslee
**Date:** 2025-10-22
**Project Level:** 3
**Target Scale:** Complex Integration with Existing System

---

## Overview

This document provides the detailed epic breakdown for moma, expanding on the high-level epic list in the [PRD](./PRD.md).

Each epic includes:

- Expanded goal and value proposition
- Complete story breakdown with user stories
- Acceptance criteria for each story
- Story sequencing and dependencies

**Epic Sequencing Principles:**

- Epic 1 establishes foundational infrastructure and initial functionality
- Subsequent epics build progressively, each delivering significant end-to-end value
- Stories within epics are vertically sliced and sequentially ordered
- No forward dependencies - each story builds only on previous work

---

## Epic 1: 코어 시스템 개선 및 사용성 향상

### Expanded Goal

기존 데이터 목록(아이템/레시피 탭), 제작, 요리 시뮬레이팅, 물물교환, 이벤트 캘린더 시스템의 사용성을 개선하고, 누락된 편의 기능을 추가하여 사용자 경험을 향상시킵니다. 현재 구현된 기능들을 안정화하고, 모바일 반응형과 성능을 개선하며, 일관된 UI/UX를 제공합니다. 멀티 캐릭터 환경에서의 재료 관리, 가공 시뮬레이션, 주간 식재료 구매 한도를 고려한 요리 시뮬레이션 기능을 추가하여 효율적인 게임 플레이를 지원합니다. 이 Epic은 기존 시스템의 기초를 탄탄히 하여 이후 Epic들의 토대를 마련합니다.

### Story Breakdown

**Story 1.1: 아이템 검색 성능 최적화**

As a 플레이어,
I want 아이템 검색이 빠르게 동작하기를,
So that 원하는 아이템을 지연 없이 즉시 찾을 수 있다.

**Acceptance Criteria:**
1. 아이템 검색 시 디바운싱을 적용하여 불필요한 검색 요청 최소화
2. 검색 결과가 500ms 이내에 표시됨
3. 검색어 입력 중 로딩 상태 표시
4. 검색 결과가 없을 때 명확한 메시지 표시

**Prerequisites:** 없음

---

**Story 1.2: 스키마별 아이템 목록 표시 및 선택**

As a 플레이어,
I want 데이터 목록에서 아이템을 스키마별로 그룹화하여 볼 수 있기를,
So that 원하는 타입의 아이템을 쉽게 찾을 수 있다.

**Acceptance Criteria:**
1. 아이템 탭에서 스키마별(소비재, 재료, 음식, 포션, 화폐, 가공품 등) 그룹 표시
2. 스키마 선택 시 해당 타입의 아이템만 필터링하여 표시
3. 스키마별 아이템 개수 표시
4. 기본적으로 모든 스키마 표시 또는 특정 스키마 선택 옵션
5. 스키마 선택 상태 유지 (로컬 스토리지)
6. 모바일에서도 스키마 선택이 편리하도록 UI 최적화

**Prerequisites:** Story 1.1

---

**Story 1.3: 고급 필터링 옵션 추가**

As a 플레이어,
I want 아이템을 다양한 기준으로 필터링할 수 있기를,
So that 원하는 조건의 아이템을 빠르게 찾을 수 있다.

**Acceptance Criteria:**
1. 카테고리별 필터 (소비재, 재료, 음식, 포션 등)
2. 획득 방법별 필터 (제작 가능, 구매 가능, 교환 가능 등)
3. 멤버십 필터 (멤버십 전용/비전용)
4. 여러 필터 동시 적용 가능
5. 필터 적용 시 결과 개수 실시간 표시
6. 필터 초기화 버튼 제공

**Prerequisites:** Story 1.2

---

**Story 1.4: 모바일 반응형 레이아웃 개선**

As a 모바일 사용자,
I want 모바일에서도 불편 없이 사용할 수 있기를,
So that 이동 중에도 정보를 확인할 수 있다.

**Acceptance Criteria:**
1. 모든 주요 화면이 모바일 뷰에서 깨지지 않음
2. 터치 타겟 크기가 최소 44x44px 이상
3. 가로 스크롤이 발생하지 않음
4. 카드 레이아웃이 모바일에서 1열로 자동 조정
5. 필터와 검색이 모바일에서도 사용 가능
6. 네비게이션 메뉴가 모바일에서 햄버거 메뉴로 전환

**Prerequisites:** Story 1.1, 1.2, 1.3

---

**Story 1.4: 로딩 상태 및 스켈레톤 UI 추가**

As a 사용자,
I want 데이터 로딩 중에도 현재 상태를 파악할 수 있기를,
So that 앱이 멈춘 것처럼 느껴지지 않는다.

**Acceptance Criteria:**
1. 아이템 목록 로딩 시 스켈레톤 UI 표시
2. 레시피 계산 중 로딩 스피너 표시
3. 이미지 로딩 중 placeholder 표시
4. 긴 작업 시 진행률 표시 (가능한 경우)
5. 에러 발생 시 명확한 에러 메시지와 재시도 옵션

**Prerequisites:** 없음

---

**Story 1.6: 일관된 에러 핸들링 및 사용자 피드백**

As a 사용자,
I want 문제가 발생했을 때 무엇이 잘못되었는지 알고 싶고,
So that 적절한 조치를 취할 수 있다.

**Acceptance Criteria:**
1. 모든 에러에 대해 사용자 친화적인 메시지 표시
2. 네트워크 에러 시 재시도 버튼 제공
3. 데이터 없음 상태에 대한 안내 메시지
4. Toast/Snackbar 컴포넌트로 일관된 피드백 제공
5. 성공 동작에 대한 긍정적 피드백 (저장 완료 등)

**Prerequisites:** Story 1.5

---

**Story 1.7: 다크모드 일관성 개선**

As a 사용자,
I want 다크모드가 모든 화면에서 일관되게 적용되기를,
So that 눈의 피로를 줄이고 일관된 경험을 얻을 수 있다.

**Acceptance Criteria:**
1. 모든 페이지에서 다크모드 색상 테마 적용
2. 이미지와 아이콘이 다크모드에서도 가독성 유지
3. 다크모드 토글이 모든 페이지에서 접근 가능
4. 사용자의 다크모드 선택이 로컬 스토리지에 저장됨
5. 시스템 다크모드 설정 감지 및 초기 적용

**Prerequisites:** 없음

---

**Story 1.8: 아이템 이미지 로딩 최적화**

As a 사용자,
I want 아이템 이미지가 빠르게 로드되기를,
So that 시각적 정보를 즉시 확인할 수 있다.

**Acceptance Criteria:**
1. 이미지 lazy loading 적용
2. 적절한 이미지 크기 사용 (불필요하게 큰 이미지 방지)
3. 이미지 로딩 실패 시 placeholder 표시
4. 뷰포트에 가까워지면 미리 로드 시작
5. 이미지 캐싱 전략 적용

**Prerequisites:** Story 1.5

---

**Story 1.9: 페이지 네비게이션 및 라우팅 개선**

As a 사용자,
I want 페이지 간 이동이 직관적이고 빠르기를,
So that 원하는 정보에 쉽게 접근할 수 있다.

**Acceptance Criteria:**
1. 모든 페이지에서 홈으로 돌아가는 버튼 제공
2. 브레드크럼 네비게이션 추가 (필요시)
3. 뒤로 가기 버튼 동작 정상 작동
4. 페이지 전환 시 부드러운 애니메이션
5. 현재 활성 메뉴 강조 표시

**Prerequisites:** 없음

---

**Story 1.10: 물물교환 계획 저장/불러오기 개선**

As a 플레이어,
I want 물물교환 계획을 더 직관적으로 관리할 수 있기를,
So that 여러 계획을 쉽게 저장하고 불러올 수 있다.

**Acceptance Criteria:**
1. 여러 물물교환 계획을 이름을 지어 저장 가능
2. 저장된 계획 목록 표시
3. 계획 불러오기, 수정, 삭제 기능
4. 계획 내보내기/가져오기 기능 (JSON)
5. 로컬 스토리지 용량 제한 처리

**Prerequisites:** Story 1.6

---

**Story 1.11: 접근성 (A11y) 기본 개선**

As a 키보드 사용자 또는 스크린리더 사용자,
I want 키보드만으로도 주요 기능을 사용할 수 있기를,
So that 모든 사용자가 앱을 편리하게 사용할 수 있다.

**Acceptance Criteria:**
1. 모든 인터랙티브 요소가 키보드로 접근 가능
2. Tab 순서가 논리적으로 설정됨
3. 포커스 표시가 명확함
4. 버튼과 링크에 적절한 ARIA 레이블
5. 이미지에 alt 텍스트 제공

**Prerequisites:** 없음

---

**Story 1.12: 멀티 캐릭터 재료 관리 및 가공 시뮬레이터**

As a 멀티 캐릭터를 운영하는 플레이어,
I want 각 캐릭터가 보유한 재료를 기반으로 가공 가능한 수량을 계산하고,
So that 캐릭터별로 필요한 재료를 효율적으로 준비할 수 있다.

**Acceptance Criteria:**
1. 최대 5개 캐릭터의 보유 재료를 입력할 수 있는 UI
2. 각 캐릭터별 재료 보유량 저장 (로컬 스토리지)
3. 가공 레시피 선택 시 각 캐릭터별 가공 가능 수량 자동 계산
4. 병목 재료(부족한 재료) 강조 표시
5. 캐릭터별 추가 필요 재료 수량 표시
6. 전체 캐릭터의 총 가공 가능 수량 요약
7. 부족한 재료의 획득 방법 링크 제공
8. 가공 계획 저장/불러오기 기능
9. 각 캐릭터는 독립적으로 계산 (재료 공유 불가 명시)

**Prerequisites:** Story 1.10

---

**Story 1.13: 주간 식재료 구매 한도 기반 요리 시뮬레이터**

As a 플레이어,
I want 주간에 구매 가능한 식재료 한도를 고려하여 요리 계획을 세우고,
So that 실현 가능한 요리 목표를 수립하고 식재료를 효율적으로 구매할 수 있다.

**Acceptance Criteria:**
1. 요리 레시피와 필요 식재료 데이터 관리
2. 각 식재료의 주간 구매 가능 수량 정보 표시
3. 요리하고 싶은 아이템 선택 및 수량 입력 UI
4. 총 필요 식재료 자동 계산 및 집계
5. 필요 수량과 주간 구매 가능 수량 비교 표시
6. 구매 한도 초과 시 경고 및 조정 제안
7. 실현 가능/불가능 판정 표시
8. 요리 계획 저장/불러오기 기능 (로컬 스토리지)
9. 캐릭터별 식재료 구매 계획 관리 (선택적)
10. 주간 리셋 시점 및 남은 시간 표시

**Prerequisites:** Story 1.11

---

## Epic 2: 장비 재료 및 기한 계산 시스템

### Expanded Goal

플레이어가 원하는 장비를 맞추기 위해 필요한 재료와 제작 기한을 계산하는 시스템을 구축합니다. 장비 데이터를 관리하고, 장비 제작/강화 레시피를 제공하며, 재료 수집 일정을 이벤트 및 교환 주기를 고려하여 계산합니다. 플레이어가 목표 장비 세트를 설정하고 진행률을 추적할 수 있도록 지원합니다. 이는 README에 명시된 미구현 핵심 기능 중 하나입니다.

### Story Breakdown

**Story 2.1: 장비 데이터 스키마 설계**

As a 개발자,
I want 장비 데이터 구조를 설계하고,
So that 장비 정보를 체계적으로 관리할 수 있다.

**Acceptance Criteria:**
1. 장비 타입 정의 (무기, 방어구, 악세서리 등)
2. 장비 속성 스키마 작성 (이름, 레벨, 효과, 이미지 등)
3. 장비 제작/강화 레시피 스키마 정의
4. 장비 세트 개념 정의 (관련 장비 그룹)
5. TypeScript 타입 정의 완료
6. 데이터 검증 함수 작성

**Prerequisites:** Epic 1 완료

---

**Story 2.2: 초기 장비 데이터 입력**

As a 관리자,
I want 주요 장비 데이터를 시스템에 입력하고,
So that 플레이어가 장비 정보를 조회할 수 있다.

**Acceptance Criteria:**
1. 최소 10개 이상의 주요 장비 데이터 입력
2. 각 장비의 이미지 추가
3. 장비 획득 방법 정보 포함
4. 장비 효과 및 스탯 정보 입력
5. 데이터 검증 통과

**Prerequisites:** Story 2.1

---

**Story 2.3: 장비 도감 페이지 구현**

As a 플레이어,
I want 모든 장비를 카테고리별로 조회할 수 있기를,
So that 어떤 장비가 있는지 파악할 수 있다.

**Acceptance Criteria:**
1. 장비 목록 화면 구현 (카드 레이아웃)
2. 장비 타입별 필터링 기능
3. 장비 레벨별 정렬 기능
4. 장비 검색 기능
5. 장비 클릭 시 상세 정보 표시
6. 모바일 반응형 적용

**Prerequisites:** Story 2.2

---

**Story 2.4: 장비 제작 레시피 관리**

As a 플레이어,
I want 특정 장비를 제작하는 데 필요한 재료를 확인하고,
So that 제작 준비를 할 수 있다.

**Acceptance Criteria:**
1. 장비별 제작 레시피 데이터 입력
2. 장비 상세 페이지에 레시피 정보 표시
3. 필요 재료 목록 및 수량 표시
4. 재료 클릭 시 해당 아이템 정보로 이동
5. 제작 조건 표시 (레벨, 멤버십 등)

**Prerequisites:** Story 2.3

---

**Story 2.5: 장비 강화 시스템 정보 제공**

As a 플레이어,
I want 장비 강화에 필요한 재료와 조건을 알고 싶고,
So that 장비 강화를 계획할 수 있다.

**Acceptance Criteria:**
1. 장비 강화 단계별 정보 제공
2. 강화 단계별 필요 재료 표시
3. 강화 단계별 효과 변화 표시
4. 강화 성공 확률 정보 (게임에서 제공하는 경우)
5. 강화 비용 계산

**Prerequisites:** Story 2.4

---

**Story 2.6: 장비 재료 계산기 구현**

As a 플레이어,
I want 원하는 장비를 제작하는 데 필요한 모든 재료를 한눈에 보고 싶고,
So that 재료 수집 계획을 세울 수 있다.

**Acceptance Criteria:**
1. 장비 선택 UI 구현
2. 재료 재귀적 계산 (재료의 재료까지)
3. 총 필요 재료 집계 및 표시
4. 재료별 획득 방법 표시
5. 계산 결과를 저장/불러오기 기능

**Prerequisites:** Story 2.5

---

**Story 2.7: 재료 수집 일정 계산**

As a 플레이어,
I want 재료를 모으는 데 얼마나 걸릴지 알고 싶고,
So that 장비 제작 일정을 계획할 수 있다.

**Acceptance Criteria:**
1. 재료별 획득 주기 정보 입력 (일일, 주간 등)
2. 이벤트 한정 재료 기한 표시
3. 물물교환 리셋 주기 반영
4. 예상 수집 소요 시간 계산
5. 병목 재료 강조 표시

**Prerequisites:** Story 2.6

---

**Story 2.8: 장비 세트 목표 설정**

As a 플레이어,
I want 목표로 하는 장비 세트를 설정하고,
So that 전체 진행 상황을 한눈에 파악할 수 있다.

**Acceptance Criteria:**
1. 여러 장비를 세트로 그룹화 가능
2. 세트에 이름 지정 기능
3. 세트 목록 관리 (추가, 수정, 삭제)
4. 세트별 총 필요 재료 집계
5. 로컬 스토리지에 저장

**Prerequisites:** Story 2.7

---

**Story 2.9: 장비 제작 진행률 추적**

As a 플레이어,
I want 장비 제작 진행 상황을 체크할 수 있기를,
So that 얼마나 진행했는지 파악할 수 있다.

**Acceptance Criteria:**
1. 재료별 수집 완료 체크박스
2. 전체 진행률 퍼센트 표시
3. 완료된 재료와 미완료 재료 구분 표시
4. 진행 상황이 로컬 스토리지에 자동 저장
5. 진행률 그래프 또는 진행바 표시

**Prerequisites:** Story 2.8

---

**Story 2.10: 장비 비교 기능**

As a 플레이어,
I want 여러 장비를 비교하고,
So that 어떤 장비가 더 나은지 판단할 수 있다.

**Acceptance Criteria:**
1. 최대 3개 장비 동시 비교
2. 스탯 및 효과를 나란히 표시
3. 제작 난이도 (재료 복잡도) 비교
4. 비교 결과 하이라이트
5. 비교 조합 저장 기능

**Prerequisites:** Story 2.9

---

**Story 2.11: 장비 추천 시스템 (선택적)**

As a 플레이어,
I want 내 레벨이나 상황에 맞는 장비 추천을 받고 싶고,
So that 어떤 장비를 목표로 해야 할지 결정하는 데 도움을 받을 수 있다.

**Acceptance Criteria:**
1. 플레이어 레벨 입력 기능
2. 레벨에 적합한 장비 추천 로직
3. 제작 난이도 기준 추천
4. 효과 우선순위별 추천 (공격력, 방어력 등)
5. 추천 이유 설명 제공

**Prerequisites:** Story 2.10

---

## Epic 3: 커뮤니티 제보 시스템

### Expanded Goal

사용자들이 데이터 오류나 누락을 제보하고 관리자가 검토/반영할 수 있는 시스템을 구축합니다. 공식 API 없이 수동으로 데이터를 수집하는 환경에서 커뮤니티의 협력을 통해 데이터 정확도를 높이고, 사용자가 프로젝트에 기여할 수 있는 경로를 제공합니다. 제보는 로컬 또는 간단한 백엔드(선택적)를 통해 관리됩니다.

### Story Breakdown

**Story 3.1: 제보 폼 UI 설계 및 구현**

As a 플레이어,
I want 데이터 오류를 쉽게 제보할 수 있기를,
So that 잘못된 정보를 수정하는 데 기여할 수 있다.

**Acceptance Criteria:**
1. 제보 유형 선택 (오류 수정, 새 데이터 추가, 기타)
2. 관련 아이템/레시피/이벤트 선택 기능
3. 오류 내용 텍스트 입력
4. 정확한 정보 입력 (선택적)
5. 스크린샷 첨부 기능 (선택적)
6. 제보자 이름/연락처 입력 (선택적)

**Prerequisites:** Epic 2 완료

---

**Story 3.2: 제보 데이터 로컬 저장**

As a 시스템,
I want 제보 데이터를 저장하고,
So that 나중에 관리자가 검토할 수 있다.

**Acceptance Criteria:**
1. 제보 데이터를 JSON 형식으로 저장
2. 각 제보에 고유 ID 부여
3. 제보 시간 기록
4. 로컬 스토리지 또는 임시 백엔드에 저장
5. 제보 성공 시 확인 메시지 표시

**Prerequisites:** Story 3.1

---

**Story 3.3: 제보 내역 확인 페이지**

As a 플레이어,
I want 내가 제보한 내역을 확인하고,
So that 제보가 잘 제출되었는지 파악할 수 있다.

**Acceptance Criteria:**
1. 제보 목록 페이지 구현
2. 제보 유형별 필터링
3. 제보 상태 표시 (검토 중, 완료, 반려)
4. 제보 클릭 시 상세 내용 표시
5. 제보 수정/삭제 기능 (검토 전에만)

**Prerequisites:** Story 3.2

---

**Story 3.4: 제보 가이드 및 FAQ**

As a 플레이어,
I want 어떻게 제보해야 하는지 가이드를 보고,
So that 유용한 제보를 할 수 있다.

**Acceptance Criteria:**
1. 제보 가이드 페이지 작성
2. 좋은 제보 예시 제공
3. 자주 묻는 질문 (FAQ) 섹션
4. 제보 시 주의사항 안내
5. 제보 폼에서 가이드 링크 제공

**Prerequisites:** Story 3.3

---

**Story 3.5: 제보 알림 시스템 (선택적)**

As a 플레이어,
I want 내 제보의 처리 상태가 변경되면 알림을 받고,
So that 제보 결과를 확인할 수 있다.

**Acceptance Criteria:**
1. 제보 상태 변경 시 브라우저 알림 (선택적)
2. 제보 내역 페이지에 알림 배지 표시
3. 제보 처리 완료 메시지
4. 제보 반려 시 이유 설명

**Prerequisites:** Story 3.3

---

**Story 3.6: 관리자 제보 검토 대시보드 (선택적)**

As a 관리자,
I want 제출된 제보를 검토하고 처리할 수 있기를,
So that 데이터를 정확하게 유지할 수 있다.

**Acceptance Criteria:**
1. 관리자 대시보드 기본 UI
2. 제보 목록 표시 (최신순)
3. 제보 상태별 필터링
4. 제보 내용 검토 및 상세 보기
5. 제보 승인/반려 버튼
6. 승인 시 데이터 자동 반영 또는 수동 적용 가이드

**Prerequisites:** Story 3.5

---

**Story 3.7: 제보 통계 및 리더보드 (선택적)**

As a 플레이어,
I want 커뮤니티 기여도를 확인하고,
So that 동기부여를 받을 수 있다.

**Acceptance Criteria:**
1. 전체 제보 수 통계
2. 승인된 제보 수 통계
3. 최다 기여자 리더보드 (선택적)
4. 제보 카테고리별 분포 차트
5. 최근 반영된 제보 목록

**Prerequisites:** Story 3.6

---

**Story 3.8: 제보 데이터 백업 및 내보내기**

As a 관리자,
I want 제보 데이터를 백업하고,
So that 데이터 손실을 방지할 수 있다.

**Acceptance Criteria:**
1. 모든 제보 데이터 JSON 내보내기 기능
2. 제보 데이터 가져오기 기능
3. 주기적 자동 백업 (가능한 경우)
4. 백업 파일 다운로드 기능
5. 데이터 무결성 검증

**Prerequisites:** Story 3.6

---

## Epic 4: 데이터 관리 및 유지보수 도구

### Expanded Goal

정기 업데이트(매주 목요일, 공지는 수요일) 시 데이터 추가/수정을 효율화하는 관리자 도구를 개발합니다. 수요일 공지 확인 후 목요일 업데이트 적용까지 신속하게 데이터를 반영할 수 있도록 지원합니다. 수동 데이터 수집 환경에서 데이터 입력, 검증, 이미지 관리를 쉽게 하여 유지보수 부담을 줄이고 데이터 품질을 높입니다. 이 Epic은 선택적이며, 장기적인 프로젝트 운영을 고려한 투자입니다.

### Story Breakdown

**Story 4.1: 데이터 입력 UI 프로토타입**

As a 관리자,
I want 새로운 아이템/레시피 데이터를 GUI로 입력할 수 있기를,
So that 코드 수정 없이 데이터를 추가할 수 있다.

**Acceptance Criteria:**
1. 관리자 전용 데이터 입력 페이지
2. 아이템 추가 폼 (모든 필드 포함)
3. 레시피 추가 폼
4. 입력 데이터 실시간 프리뷰
5. 데이터 검증 및 에러 표시

**Prerequisites:** Epic 3 완료

---

**Story 4.2: 이미지 업로드 및 관리**

As a 관리자,
I want 아이템 이미지를 쉽게 업로드하고 관리할 수 있기를,
So that 이미지 추가 과정을 단순화할 수 있다.

**Acceptance Criteria:**
1. 이미지 드래그 앤 드롭 업로드
2. 이미지 미리보기
3. 이미지 자동 리사이징 (크기 최적화)
4. 이미지 파일명 자동 생성 (아이템 ID 기반)
5. 업로드된 이미지 목록 관리

**Prerequisites:** Story 4.1

---

**Story 4.3: 데이터 수정 및 삭제 기능**

As a 관리자,
I want 기존 데이터를 수정하거나 삭제할 수 있기를,
So that 오류를 빠르게 수정할 수 있다.

**Acceptance Criteria:**
1. 데이터 검색 및 선택 기능
2. 선택한 데이터 편집 폼
3. 수정 사항 실시간 반영
4. 삭제 확인 다이얼로그
5. 수정/삭제 이력 기록 (선택적)

**Prerequisites:** Story 4.2

---

**Story 4.4: 데이터 검증 도구**

As a 관리자,
I want 입력한 데이터가 올바른지 자동 검증하고,
So that 데이터 오류를 사전에 방지할 수 있다.

**Acceptance Criteria:**
1. 필수 필드 누락 체크
2. 데이터 타입 검증
3. 참조 무결성 검증 (예: 레시피의 재료가 실제 존재하는지)
4. 중복 데이터 감지
5. 검증 실패 시 구체적인 에러 메시지

**Prerequisites:** Story 4.3

---

**Story 4.5: 데이터 일괄 업로드 (CSV/JSON)**

As a 관리자,
I want CSV나 JSON 파일로 데이터를 일괄 업로드할 수 있기를,
So that 대량의 데이터를 빠르게 추가할 수 있다.

**Acceptance Criteria:**
1. CSV 파일 업로드 기능
2. JSON 파일 업로드 기능
3. 데이터 매핑 설정 (CSV 컬럼 → 데이터 필드)
4. 업로드 전 미리보기 및 검증
5. 업로드 진행 상태 표시

**Prerequisites:** Story 4.4

---

**Story 4.6: 업데이트 이력 및 버전 관리**

As a 관리자,
I want 데이터 변경 이력을 추적하고,
So that 문제 발생 시 이전 버전으로 롤백할 수 있다.

**Acceptance Criteria:**
1. 데이터 변경 시 이력 기록
2. 변경 날짜, 변경자, 변경 내용 기록
3. 이력 조회 UI
4. 특정 버전으로 롤백 기능 (선택적)
5. 주요 업데이트 마일스톤 태깅

**Prerequisites:** Story 4.5

---

**Story 4.7: 데이터 내보내기 및 백업**

As a 관리자,
I want 전체 데이터를 내보내고 백업할 수 있기를,
So that 데이터 손실을 방지할 수 있다.

**Acceptance Criteria:**
1. 전체 데이터 JSON 내보내기
2. 특정 카테고리만 내보내기
3. 백업 파일 다운로드
4. 백업에서 데이터 복원 기능
5. 정기 자동 백업 설정 (선택적)

**Prerequisites:** Story 4.6

---

---

## Story Guidelines Reference

**Story Format:**

```
**Story [EPIC.N]: [Story Title]**

As a [user type],
I want [goal/desire],
So that [benefit/value].

**Acceptance Criteria:**
1. [Specific testable criterion]
2. [Another specific criterion]
3. [etc.]

**Prerequisites:** [Dependencies on previous stories, if any]
```

**Story Requirements:**

- **Vertical slices** - Complete, testable functionality delivery
- **Sequential ordering** - Logical progression within epic
- **No forward dependencies** - Only depend on previous work
- **AI-agent sized** - Completable in 2-4 hour focused session
- **Value-focused** - Integrate technical enablers into value-delivering stories

---

**For implementation:** Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown.

