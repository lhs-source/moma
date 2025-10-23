<template>
  <div class="space-y-4">
    <!-- 헤더: 주 이동 버튼 -->
    <div class="flex items-center justify-between mb-6">
      <button 
        @click="handlePreviousWeek"
        class="px-4 py-2 border border-border rounded bg-background text-foreground hover:bg-accent transition-colors"
      >
        ← 이전 주
      </button>
      <h2 class="text-2xl font-bold text-foreground">{{ weekLabel }}</h2>
      <button 
        @click="handleNextWeek"
        class="px-4 py-2 border border-border rounded bg-background text-foreground hover:bg-accent transition-colors"
      >
        다음 주 →
      </button>
    </div>

    <!-- 주간 캘린더 -->
    <div class="border border-border rounded-lg overflow-hidden bg-card">
      <!-- 요일 헤더 -->
      <div class="grid grid-cols-7">
        <div 
          v-for="(dayLabel, index) in weekDayLabels" 
          :key="index"
          class="text-center font-semibold text-muted-foreground py-3 border-r border-b border-border last:border-r-0"
        >
          {{ dayLabel }}
        </div>
      </div>

      <!-- 주간 날짜 행 -->
      <div class="relative" :style="{ height: weekHeight + 'px' }">
        <!-- 날짜 셀들 (배경) -->
        <div class="grid grid-cols-7 h-full absolute inset-0">
          <div 
            v-for="(day, index) in weekDays" 
            :key="index"
            :class="['border-r border-border last:border-r-0 p-2', getDayClass(day)]"
          >
            <div class="text-right text-lg font-medium">
              <span :class="getDayNumberClass(day)">
                {{ day.getDate() }}
              </span>
            </div>
          </div>
        </div>

        <!-- 이벤트 바들 (overlay) -->
        <div class="relative h-full pointer-events-none">
          <div 
            v-for="(eventBar, barIndex) in eventBars" 
            :key="barIndex"
            :class="[
              'absolute text-xs font-medium px-2 py-1 rounded truncate cursor-pointer pointer-events-auto shadow-sm transition-all',
              getEventBarClass(eventBar),
              getEventBarHoverClass(eventBar.event)
            ]" 
            :style="getBarStyle(eventBar)"
            :title="`${eventBar.event.name}\n${formatDateTime(eventBar.event.startDate)} ~ ${formatDateTime(eventBar.event.endDate)}`"
            @mouseenter="hoveredEventId = eventBar.event.id" 
            @mouseleave="hoveredEventId = null"
            @click="handleEventClick(eventBar.event)"
          >
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
 * 주간 캘린더 뷰 컴포넌트
 * 
 * 선택된 주의 7일(일~토)을 표시하고, 이벤트를 시각적으로 렌더링합니다.
 * MonthCalendar와 동일한 이벤트 바 스타일을 사용하여 일관성을 유지합니다.
 * 
 * @component WeekCalendar
 * 
 * @remarks
 * 설계 원칙:
 * - 단일 책임: 주간 캘린더 렌더링만 담당
 * - 재사용성: useEventCalendar composable로 공통 로직 활용
 * - Event 기반: 이벤트 클릭 시 명시적으로 eventClick 이벤트 발생
 * - 반응형: 모바일에서도 정상 작동하도록 설계
 * 
 * 동작 플로우:
 * 1. 현재 날짜 기준으로 주의 일요일~토요일 계산
 * 2. useEventCalendar로 이벤트 바 배치 계산
 * 3. 각 이벤트 바를 절대 위치로 렌더링
 * 4. 이벤트 바 클릭 시 부모에게 eventClick 이벤트 전달
 * 
 * @example
 * ```vue
 * <WeekCalendar 
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
  getEventBarStyle,
  getEventBarClass,
  formatDateTime,
  getWeekStart,
  getWeekLabel,
} = useEventCalendar()

// 현재 선택된 날짜 (주 계산 기준)
const currentDate = ref(new Date())

// 호버 중인 이벤트 ID (hover 효과용)
const hoveredEventId = ref<string | null>(null)

// 이벤트 바 높이 상수
const EVENT_BAR_HEIGHT = 28
// 날짜 숫자 표시 기본 높이
const BASE_HEIGHT = 60
// 주간 뷰 최소 높이 (월별보다 여유있게)
const MIN_HEIGHT = 200

// 요일 레이블
const weekDayLabels = ['일', '월', '화', '수', '목', '금', '토']

/**
 * 주차 레이블 (예: "2025년 10월 3주차")
 * @computed
 */
const weekLabel = computed(() => getWeekLabel(currentDate.value))

/**
 * 주의 7일 배열 생성 (일요일~토요일)
 * @computed
 * @returns {Date[]} 7개의 Date 객체 배열
 */
const weekDays = computed(() => {
  const start = getWeekStart(currentDate.value)
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return date
  })
})

/**
 * 이벤트 바 배치 계산
 * @computed
 * @returns {EventBar[]} 배치 정보가 포함된 이벤트 바 배열
 */
const eventBars = computed(() => {
  return calculateEventBars(weekDays.value, props.events)
})

/**
 * 주간 뷰 높이 계산
 * 이벤트 바 개수에 따라 동적으로 높이 조정
 * @computed
 * @returns {number} 계산된 높이 (px)
 */
const weekHeight = computed(() => {
  if (eventBars.value.length === 0) return MIN_HEIGHT
  
  const maxRow = Math.max(...eventBars.value.map(bar => bar.row))
  const calculatedHeight = BASE_HEIGHT + (maxRow + 1) * EVENT_BAR_HEIGHT
  
  return Math.max(calculatedHeight, MIN_HEIGHT)
})

/**
 * 이벤트 바 스타일 계산
 * @param {EventBar} eventBar - 이벤트 바 정보
 * @returns {string} CSS 인라인 스타일 문자열
 */
function getBarStyle(eventBar: EventBar): string {
  return getEventBarStyle(eventBar, {
    colWidth: 100 / 7,
    padding: 0.3,
    topOffset: 40,
    barHeight: EVENT_BAR_HEIGHT,
  })
}

/**
 * 이전 주로 이동
 * Event handler - 명시적 상태 변경
 */
function handlePreviousWeek(): void {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() - 7)
  currentDate.value = newDate
}

/**
 * 다음 주로 이동
 * Event handler - 명시적 상태 변경
 */
function handleNextWeek(): void {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() + 7)
  currentDate.value = newDate
}

/**
 * 날짜 셀 배경 스타일 클래스 반환
 * @param {Date} day - 날짜
 * @returns {string} Tailwind CSS 클래스
 */
function getDayClass(day: Date): string {
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
    return 'inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold'
  }
  
  const dayOfWeek = day.getDay()
  if (dayOfWeek === 0) return 'text-red-500' // 일요일
  if (dayOfWeek === 6) return 'text-blue-500' // 토요일
  
  return 'text-foreground'
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

