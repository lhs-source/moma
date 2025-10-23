import type { GameEvent } from '@/data/schemas/event'
import { EVENT_TYPE } from '@/data/schemas/event'

/**
 * 이벤트 바 표시 정보
 * 캘린더에 렌더링할 이벤트 바의 위치, 스타일, 상태 정보를 포함
 */
export interface EventBar {
  event: GameEvent // 이벤트 원본 데이터
  startCol: number // 시작 컬럼 인덱스 (0-6)
  endCol: number // 종료 컬럼 인덱스 (0-6)
  row: number // 행(row) 위치 - 겹치는 이벤트 배치를 위해 사용
  showName: boolean // 이벤트 이름 표시 여부
  isEnding: boolean // 이 주/행에서 이벤트가 실제로 종료되는지 여부 (종료 시각적 효과용)
}

/**
 * 이벤트 바 스타일 설정
 * CSS 계산에 필요한 레이아웃 파라미터
 */
export interface EventBarStyleConfig {
  colWidth: number // 컬럼(날짜) 하나의 너비 (%)
  padding: number // 좌우 패딩 (%)
  topOffset: number // 상단 오프셋 (px) - 날짜 숫자 아래부터 시작
  barHeight: number // 이벤트 바 하나의 높이 (px)
}

/**
 * 이벤트 캘린더 공통 로직을 제공하는 Composable
 * 
 * 월별/주간 캘린더에서 공통으로 사용되는 이벤트 바 계산, 스타일링, 
 * 날짜 유틸리티 함수들을 제공합니다.
 * 
 * @remarks
 * - 이벤트 바 배치 알고리즘: 종료일 빠른 순으로 정렬하여 위에서부터 배치
 * - row 충돌 회피: 같은 날짜 범위를 가진 이벤트는 다른 row에 배치
 * - 종료 표시: 이벤트가 실제로 끝나는 위치에 시각적 마커 추가
 * 
 * @example
 * ```typescript
 * const { calculateEventBars, getEventBarStyle } = useEventCalendar()
 * const eventBars = calculateEventBars(weekDays, events)
 * const style = getEventBarStyle(eventBars[0], config)
 * ```
 */
export function useEventCalendar() {
  /**
   * 특정 날짜 범위 내의 이벤트만 필터링
   * 
   * @param events - 전체 이벤트 목록
   * @param startDate - 범위 시작일
   * @param endDate - 범위 종료일
   * @returns 범위 내에 있는 이벤트 배열
   * 
   * @remarks
   * 이벤트의 시작일/종료일과 범위가 하나라도 겹치면 포함됩니다.
   * 시간은 무시하고 날짜만 비교합니다.
   */
  function filterEventsInRange(
    events: GameEvent[],
    startDate: Date,
    endDate: Date
  ): GameEvent[] {
    return events.filter(event => {
      const eventStart = new Date(event.startDate.getFullYear(), event.startDate.getMonth(), event.startDate.getDate())
      const eventEnd = new Date(event.endDate.getFullYear(), event.endDate.getMonth(), event.endDate.getDate())
      const rangeStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
      const rangeEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      
      return eventEnd >= rangeStart && eventStart <= rangeEnd
    })
  }

  /**
   * 주어진 날짜 배열에 대한 이벤트 바 배치 계산
   * 
   * @param days - 날짜 배열 (null은 빈 셀을 의미, 예: 월의 첫 주 앞부분)
   * @param events - 전체 이벤트 목록
   * @returns 배치 정보가 포함된 이벤트 바 배열 (row 순으로 정렬됨)
   * 
   * @remarks
   * 동작 플로우:
   * 1. 유효한 날짜 범위 추출
   * 2. 이벤트를 종료일 빠른 순으로 정렬
   * 3. 각 이벤트의 시작/종료 컬럼 계산
   * 4. 겹치지 않는 row 할당 (충돌 회피)
   * 5. 이벤트가 이 범위에서 종료되는지 표시
   * 
   * @example
   * ```typescript
   * const weekDays = [sun, mon, tue, wed, thu, fri, sat]
   * const eventBars = calculateEventBars(weekDays, allEvents)
   * // eventBars[0].row === 0 (첫 번째 행)
   * // eventBars[1].row === 1 (두 번째 행, 첫 번째와 겹침)
   * ```
   */
  function calculateEventBars(
    days: (Date | null)[],
    events: GameEvent[]
  ): EventBar[] {
    const eventBars: EventBar[] = []
    
    // 유효한 첫 날과 마지막 날 찾기
    const weekStart = days.find(d => d !== null)
    const weekEnd = days[days.length - 1] || weekStart
    
    if (!weekStart) return []
    
    const weekStartDate = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
    const weekEndDate = weekEnd ? new Date(weekEnd.getFullYear(), weekEnd.getMonth(), weekEnd.getDate()) : weekStartDate
    
    // 종료일이 빠른 순서대로 정렬 (빨리 끝나는 이벤트가 위에 배치됨)
    const sortedEvents = [...events].sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
    
    for (const event of sortedEvents) {
      const eventStart = new Date(event.startDate.getFullYear(), event.startDate.getMonth(), event.startDate.getDate())
      const eventEnd = new Date(event.endDate.getFullYear(), event.endDate.getMonth(), event.endDate.getDate())
      
      // 이 주와 이벤트가 겹치는지 확인
      if (eventEnd < weekStartDate || eventStart > weekEndDate) continue
      
      // 이 주에서 이벤트가 시작하는 컬럼과 끝나는 컬럼 계산
      let startCol = -1
      let endCol = -1
      
      for (let i = 0; i < days.length; i++) {
        const day = days[i]
        if (!day) continue
        
        const dayDate = new Date(day.getFullYear(), day.getMonth(), day.getDate())
        
        if (dayDate >= eventStart && dayDate <= eventEnd) {
          if (startCol === -1) {
            startCol = i
          }
          endCol = i
        }
      }
      
      if (startCol !== -1 && endCol !== -1) {
        const showName = true
        
        // 이 주에서 이벤트가 실제로 끝나는지 확인
        const lastDayOfWeek = days[endCol]
        const isEnding = lastDayOfWeek ? 
          new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate()).getTime() >= eventEnd.getTime() 
          : false
        
        // 이미 추가된 이벤트와 겹치지 않는 row 찾기
        let row = 0
        while (eventBars.some(bar => bar.row === row &&
          !(bar.endCol < startCol || bar.startCol > endCol))) {
          row++
        }
        
        eventBars.push({
          event,
          startCol,
          endCol,
          row,
          showName,
          isEnding
        })
      }
    }
    
    return eventBars.sort((a, b) => a.row - b.row)
  }

  /**
   * 이벤트 바의 CSS 스타일 문자열 생성
   * 
   * @param eventBar - 배치된 이벤트 바 정보
   * @param config - 스타일 설정 (컬럼 너비, 패딩, 높이 등)
   * @returns CSS 인라인 스타일 문자열 (left, width, top)
   * 
   * @remarks
   * 계산식:
   * - left: startCol * colWidth + padding
   * - width: (endCol - startCol + 1) * colWidth - padding * 2
   * - top: topOffset + row * barHeight
   * 
   * @example
   * ```typescript
   * const style = getEventBarStyle(eventBar, {
   *   colWidth: 100 / 7,
   *   padding: 0.3,
   *   topOffset: 28,
   *   barHeight: 26
   * })
   * // "left: 14.3%; width: 28.6%; top: 54px;"
   * ```
   */
  function getEventBarStyle(
    eventBar: EventBar,
    config: EventBarStyleConfig
  ): string {
    const { colWidth, padding, topOffset, barHeight } = config
    
    const left = eventBar.startCol * colWidth + padding
    const width = (eventBar.endCol - eventBar.startCol + 1) * colWidth - padding * 2
    const top = topOffset + eventBar.row * barHeight
    
    return `left: ${left}%; width: ${width}%; top: ${top}px;`
  }

  /**
   * 이벤트 타입과 종료 상태에 따른 CSS 클래스 반환
   * 
   * @param eventBar - 배치된 이벤트 바 정보
   * @returns Tailwind CSS 클래스 문자열
   * 
   * @remarks
   * 스타일 규칙:
   * - 종료 바(isEnding): 그라데이션 + 빨간색 오른쪽 테두리
   * - 일반 바: 단색 배경
   * - 이벤트 타입별 색상:
   *   - EVENT: 파란색
   *   - CASH_SHOP: 녹색
   *   - 기타: 보라색
   * 
   * @example
   * ```typescript
   * const classes = getEventBarClass(eventBar)
   * // "bg-gradient-to-r from-blue-400 to-blue-700 text-white border-r-4 border-red-600"
   * ```
   */
  function getEventBarClass(eventBar: EventBar): string {
    const isEvent = eventBar.event.type === EVENT_TYPE.EVENT
    const isCashShop = eventBar.event.type === EVENT_TYPE.CASH_SHOP
    
    if (eventBar.isEnding) {
      // 끝나는 바는 그라데이션 + 빨간색 오른쪽 테두리 적용
      if (isEvent) {
        return 'bg-gradient-to-r from-blue-400 to-blue-700 text-white border-r-4 border-red-600'
      } else if (isCashShop) {
        return 'bg-gradient-to-r from-green-400 to-green-700 text-white border-r-4 border-red-600'
      } else {
        return 'bg-gradient-to-r from-purple-400 to-purple-700 text-white border-r-4 border-red-600'
      }
    } else {
      // 일반 바는 단색
      if (isEvent) {
        return 'bg-blue-500 text-white'
      } else if (isCashShop) {
        return 'bg-green-500 text-white'
      } else {
        return 'bg-purple-500 text-white'
      }
    }
  }

  /**
   * 날짜 포맷팅 (YYYY-MM-DD HH:mm)
   * 
   * @param date - 포맷할 날짜
   * @returns 포맷된 날짜 문자열
   * 
   * @example
   * ```typescript
   * formatDateTime(new Date(2025, 9, 23, 14, 30))
   * // "2025-10-23 14:30"
   * ```
   */
  function formatDateTime(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  /**
   * 주의 시작일 계산 (일요일 기준)
   * 
   * @param date - 기준 날짜
   * @returns 해당 주의 일요일 00:00:00
   * 
   * @remarks
   * 일요일(0)부터 토요일(6)까지의 주 단위로 계산합니다.
   * 
   * @example
   * ```typescript
   * getWeekStart(new Date(2025, 9, 23)) // 목요일
   * // 2025-10-19 (일요일) 00:00:00
   * ```
   */
  function getWeekStart(date: Date): Date {
    const result = new Date(date)
    const day = result.getDay() // 0(일) ~ 6(토)
    const diff = day // 일요일까지의 차이
    result.setDate(result.getDate() - diff)
    result.setHours(0, 0, 0, 0)
    return result
  }

  /**
   * 주의 종료일 계산 (토요일 기준)
   * 
   * @param date - 기준 날짜
   * @returns 해당 주의 토요일 23:59:59.999
   * 
   * @example
   * ```typescript
   * getWeekEnd(new Date(2025, 9, 23)) // 목요일
   * // 2025-10-25 (토요일) 23:59:59.999
   * ```
   */
  function getWeekEnd(date: Date): Date {
    const result = getWeekStart(date)
    result.setDate(result.getDate() + 6)
    result.setHours(23, 59, 59, 999)
    return result
  }

  /**
   * 주차 레이블 생성
   * 
   * @param date - 기준 날짜
   * @returns "YYYY년 M월 N주차" 형식 문자열
   * 
   * @remarks
   * 해당 월의 첫 일요일부터 주차를 계산합니다.
   * 
   * @example
   * ```typescript
   * getWeekLabel(new Date(2025, 9, 23))
   * // "2025년 10월 3주차"
   * ```
   */
  function getWeekLabel(date: Date): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const weekStart = getWeekStart(date)
    const firstDayOfMonth = new Date(year, date.getMonth(), 1)
    const weekNumber = Math.ceil((weekStart.getDate() + firstDayOfMonth.getDay()) / 7)
    
    return `${year}년 ${month}월 ${weekNumber}주차`
  }

  return {
    // 필터링
    filterEventsInRange,
    
    // 이벤트 바 계산
    calculateEventBars,
    
    // 스타일링
    getEventBarStyle,
    getEventBarClass,
    
    // 날짜 유틸
    formatDateTime,
    getWeekStart,
    getWeekEnd,
    getWeekLabel,
  }
}

