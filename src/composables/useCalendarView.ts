import { ref } from 'vue'

/**
 * 캘린더 뷰 타입
 * - month: 월별 캘린더 뷰
 * - week: 주간 캘린더 뷰
 */
export type CalendarViewType = 'month' | 'week'

/** 로컬 스토리지 키 */
const STORAGE_KEY = 'moma-calendar-view'

/**
 * 캘린더 뷰 상태 관리 Composable
 * 
 * 월별/주간 캘린더 뷰 전환 상태를 관리하고 로컬 스토리지에 영속화합니다.
 * Event 기반 패턴을 사용하여 명시적인 상태 변경을 보장합니다.
 * 
 * @remarks
 * 설계 원칙:
 * - Watch 대신 명시적 함수 호출로 로컬 스토리지 저장
 * - Event handler에서 setView/toggleView 호출 시 저장 자동 수행
 * - 명확한 cause-effect 관계로 디버깅 및 테스트 용이
 * 
 * 동작 플로우:
 * 1. 초기화: 로컬 스토리지에서 저장된 뷰 타입 로드 (없으면 'month')
 * 2. 뷰 변경: setView() 또는 toggleView() 호출
 * 3. 저장: 내부적으로 saveToStorage() 호출하여 영속화
 * 
 * @example
 * ```typescript
 * // 컴포넌트에서 사용
 * const { calendarView, setView, toggleView } = useCalendarView()
 * 
 * // Event handler
 * function handleViewChange(view: CalendarViewType) {
 *   setView(view) // 뷰 변경 + 로컬 스토리지 저장
 * }
 * ```
 */
export function useCalendarView() {
  /**
   * 로컬 스토리지에서 저장된 뷰 타입 로드
   * 
   * @returns 저장된 뷰 타입 또는 기본값 'month'
   * @throws 로컬 스토리지 접근 실패 시 경고 로그 출력 후 기본값 반환
   * 
   * @remarks
   * 유효하지 않은 값이 저장되어 있으면 기본값을 반환합니다.
   */
  function getStoredView(): CalendarViewType {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'month' || stored === 'week') {
        return stored
      }
    } catch (e) {
      console.warn('Failed to load calendar view from localStorage:', e)
    }
    return 'month' // 기본값
  }

  /**
   * 로컬 스토리지에 뷰 타입 저장
   * 
   * @param view - 저장할 뷰 타입
   * @throws 로컬 스토리지 접근 실패 시 경고 로그 출력
   * 
   * @remarks
   * 이 함수는 내부적으로만 호출되며, 외부에서 직접 호출하지 않습니다.
   * setView() 또는 toggleView() 호출 시 자동으로 실행됩니다.
   */
  function saveToStorage(view: CalendarViewType): void {
    try {
      localStorage.setItem(STORAGE_KEY, view)
    } catch (e) {
      console.warn('Failed to save calendar view to localStorage:', e)
    }
  }

  // 현재 선택된 캘린더 뷰 타입
  const calendarView = ref<CalendarViewType>(getStoredView())

  /**
   * 뷰 타입 토글 (month ↔ week)
   * 
   * Event handler에서 호출하여 뷰를 전환합니다.
   * 로컬 스토리지에 자동으로 저장됩니다.
   * 
   * @remarks
   * 동작 플로우:
   * 1. 현재 뷰 타입 확인
   * 2. 반대 타입으로 변경
   * 3. 로컬 스토리지에 저장
   * 
   * @example
   * ```vue
   * <button @click="toggleView">뷰 전환</button>
   * ```
   */
  function toggleView(): void {
    const newView = calendarView.value === 'month' ? 'week' : 'month'
    calendarView.value = newView
    saveToStorage(newView) // ✅ 명시적 저장
  }

  /**
   * 특정 뷰 타입으로 설정
   * 
   * Event handler에서 호출하여 특정 뷰로 전환합니다.
   * 로컬 스토리지에 자동으로 저장됩니다.
   * 
   * @param view - 설정할 뷰 타입
   * 
   * @remarks
   * 동작 플로우:
   * 1. 인자로 받은 뷰 타입으로 변경
   * 2. 로컬 스토리지에 저장
   * 
   * @example
   * ```vue
   * <button @click="setView('month')">월별</button>
   * <button @click="setView('week')">주간</button>
   * ```
   */
  function setView(view: CalendarViewType): void {
    calendarView.value = view
    saveToStorage(view) // ✅ 명시적 저장
  }

  return {
    /** 현재 캘린더 뷰 타입 (readonly로 사용 권장) */
    calendarView,
    /** 뷰 타입 토글 함수 */
    toggleView,
    /** 특정 뷰 타입으로 설정하는 함수 */
    setView,
  }
}

