<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between mb-6">
      <button @click="previousMonth"
        class="px-4 py-2 border border-border rounded bg-background text-foreground hover:bg-accent">
        ← 이전 달
      </button>
      <h2 class="text-2xl font-bold text-foreground">{{ currentMonthLabel }}</h2>
      <button @click="nextMonth"
        class="px-4 py-2 border border-border rounded bg-background text-foreground hover:bg-accent">
        다음 달 →
      </button>
    </div>

    <div class="border border-border rounded-lg overflow-hidden bg-card">
      <!-- 요일 헤더 -->
      <div class="grid grid-cols-7">
        <div v-for="day in weekDays" :key="day"
          class="text-center font-semibold text-muted-foreground py-3 border-r border-b border-border last:border-r-0">
          {{ day }}
        </div>
      </div>

      <!-- 주별 행 -->
      <div v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex"
        class="relative border-b border-border last:border-b-0" :style="{ height: getWeekHeight(weekIndex) + 'px' }">

        <!-- 날짜 셀들 (배경) -->
        <div class="grid grid-cols-7 h-full absolute inset-0">
          <div v-for="(day, dayIndex) in week" :key="dayIndex"
            :class="['border-r border-border last:border-r-0 p-1', getDayClass(day)]">
            <!-- 날짜 숫자 -->
            <div v-if="day" class="text-right text-sm font-medium px-1">
              <span :class="getDayNumberClass(day)">
                {{ day.getDate() }}
              </span>
            </div>
          </div>
        </div>

        <!-- 이벤트 바들 (overlay) -->
        <div class="relative h-full pointer-events-none">
          <div v-for="(eventBar, barIndex) in weekEventBarsCache.get(weekIndex)" :key="`${weekIndex}-${barIndex}`"
            :class="['absolute text-xs font-medium px-2 py-1 rounded truncate cursor-pointer pointer-events-auto shadow-sm transition-all',
              getEventBarClass(eventBar),
              getEventBarHoverClass(eventBar.event)]" :style="getEventBarStyle(eventBar)"
            :title="`${eventBar.event.name}\n${formatDateTime(eventBar.event.startDate)} ~ ${formatDateTime(eventBar.event.endDate)}`"
            @mouseenter="hoveredEventId = eventBar.event.id" @mouseleave="hoveredEventId = null"
            @click="handleEventClick(eventBar.event)">
            <span v-if="eventBar.showName">{{ eventBar.event.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { GameEvent } from '@/data/schemas/event'
import { useEventCalendar, type EventBar } from '@/composables/useEventCalendar'

/**
 * 월별 캘린더 뷰 컴포넌트
 * 
 * 한 달의 모든 날짜를 주 단위로 표시하고, 이벤트를 시각적으로 렌더링합니다.
 * useEventCalendar composable을 사용하여 공통 로직을 재사용합니다.
 * 
 * @component MonthCalendar
 * 
 * @remarks
 * 설계 원칙:
 * - 단일 책임: 월별 캘린더 렌더링만 담당
 * - 재사용성: useEventCalendar composable로 공통 로직 활용
 * - Event 기반: 이벤트 클릭 시 명시적으로 eventClick 이벤트 발생
 * 
 * 동작 플로우:
 * 1. 현재 월의 모든 날짜 계산 (앞뒤 빈칸 포함)
 * 2. 주 단위로 날짜를 그룹화
 * 3. 각 주마다 useEventCalendar로 이벤트 바 배치 계산
 * 4. 이벤트 바를 절대 위치로 렌더링
 * 5. 이벤트 바 클릭 시 부모에게 eventClick 이벤트 전달
 * 
 * @example
 * ```vue
 * <MonthCalendar 
 *   :events="gameEvents" 
 *   @event-click="openEventDetail" 
 * />
 * ```
 */

/**
 * Props
 * @property {GameEvent[]} events - 표시할 이벤트 목록
 */
const props = withDefaults(defineProps<{
  events: GameEvent[]
}>(), {
  events: () => []
})

/**
 * Emits
 * @event eventClick - 이벤트 바 클릭 시 발생
 * @param {GameEvent} event - 클릭된 이벤트
 */
const emit = defineEmits<{
  (eventName: 'eventClick', event: GameEvent): void
}>()

// Composable 사용: 공통 로직 활용
const {
  calculateEventBars,
  getEventBarStyle: getEventBarStyleFromComposable,
  getEventBarClass,
  formatDateTime,
} = useEventCalendar()

// 현재 선택된 날짜 (월 계산 기준)
const currentDate = ref(new Date())

// 요일 레이블
const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 호버 중인 이벤트 ID (hover 효과용)
const hoveredEventId = ref<string | null>(null)

// 이벤트 바 높이 상수
const EVENT_BAR_HEIGHT = 26
// 날짜 숫자 표시 기본 높이
const BASE_HEIGHT = 50
// 월별 뷰 최소 높이
const MIN_HEIGHT = 100

/**
 * 현재 월 레이블 (예: "2025년 10월")
 * @computed
 */
const currentMonthLabel = computed(() => {
  return `${currentDate.value.getFullYear()}년 ${currentDate.value.getMonth() + 1}월`
})

/**
 * 월의 모든 날짜를 주 단위로 그룹화
 * @computed
 * @returns {(Date | null)[][]} 주 단위 날짜 배열 (null은 빈 셀)
 */
const calendarWeeks = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startPadding = firstDay.getDay()
  const days: (Date | null)[] = []

  // 앞 빈 칸
  for (let i = 0; i < startPadding; i++) {
    days.push(null)
  }

  // 실제 날짜들
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i))
  }

  // 주 단위로 나누기
  const weeks: (Date | null)[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return weeks
})

/**
 * 각 주의 이벤트 바 배치 계산 및 캐싱
 * @computed
 * @returns {Map<number, EventBar[]>} 주 인덱스별 이벤트 바 배열
 * 
 * @remarks
 * useEventCalendar composable의 calculateEventBars 함수를 사용하여
 * 공통 로직을 재사용합니다. 이를 통해 월별/주간 뷰에서 동일한 알고리즘 적용.
 */
const weekEventBarsCache = computed(() => {
  const cache = new Map<number, EventBar[]>()

  calendarWeeks.value.forEach((week, weekIndex) => {
    // Composable 함수 사용: 이벤트 바 계산 로직 공통화
    const eventBars = calculateEventBars(week, props.events)
    cache.set(weekIndex, eventBars)
  })

  return cache
})

/**
 * 이전 달로 이동
 * Event handler - 명시적 상태 변경
 */
function previousMonth(): void {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

/**
 * 다음 달로 이동
 * Event handler - 명시적 상태 변경
 */
function nextMonth(): void {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

/**
 * 날짜 셀 배경 스타일 클래스 반환
 * @param {Date | null} day - 날짜 (null이면 빈 셀)
 * @returns {string} Tailwind CSS 클래스
 */
function getDayClass(day: Date | null): string {
  if (!day) return 'bg-muted/30'

  const today = new Date()
  if (day.toDateString() === today.toDateString()) {
    return 'bg-primary/20 border-2 border-primary/50 ring-2 ring-primary/30'
  }

  return 'bg-card hover:bg-accent/30'
}

/**
 * 날짜 숫자 스타일 클래스 반환
 * @param {Date} day - 날짜
 * @returns {string} Tailwind CSS 클래스
 */
function getDayNumberClass(day: Date): string {
  const today = new Date()
  if (day.toDateString() === today.toDateString()) {
    return 'inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold'
  }

  const dayOfWeek = day.getDay()
  if (dayOfWeek === 0) return 'text-red-500' // 일요일
  if (dayOfWeek === 6) return 'text-blue-500' // 토요일

  return 'text-foreground'
}

/**
 * 주의 높이 계산
 * 이벤트 바 개수에 따라 동적으로 높이 조정
 * @param {number} weekIndex - 주 인덱스
 * @returns {number} 계산된 높이 (px)
 */
function getWeekHeight(weekIndex: number): number {
  const eventBars = weekEventBarsCache.value.get(weekIndex) || []

  if (eventBars.length === 0) {
    return MIN_HEIGHT
  }

  const maxRow = Math.max(...eventBars.map(bar => bar.row))
  const calculatedHeight = BASE_HEIGHT + (maxRow + 1) * EVENT_BAR_HEIGHT

  return Math.max(calculatedHeight, MIN_HEIGHT)
}

/**
 * 이벤트 바 스타일 계산 (composable 함수 래핑)
 * @param {EventBar} eventBar - 이벤트 바 정보
 * @returns {string} CSS 인라인 스타일 문자열
 */
function getEventBarStyle(eventBar: EventBar): string {
  return getEventBarStyleFromComposable(eventBar, {
    colWidth: 100 / 7,
    padding: 0.3,
    topOffset: 28,
    barHeight: EVENT_BAR_HEIGHT,
  })
}

/**
 * 이벤트 바 hover 스타일 클래스 반환
 * @param {GameEvent} event - 이벤트
 * @returns {string} Tailwind CSS 클래스
 */
function getEventBarHoverClass(event: GameEvent): string {
  if (hoveredEventId.value === event.id) {
    return 'ring-2 ring-yellow-400 ring-offset-1 scale-105 z-50 shadow-lg'
  }
  return 'hover:opacity-90'
}

/**
 * 이벤트 바 클릭 핸들러
 * Event handler - 부모에게 이벤트 전달
 * @param {GameEvent} event - 클릭된 이벤트
 */
function handleEventClick(event: GameEvent): void {
  emit('eventClick', event)
}
</script>