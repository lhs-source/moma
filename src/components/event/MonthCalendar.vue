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
              getEventBarClass(eventBar.event),
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
import { EVENT_TYPE } from '@/data/schemas/event'

interface EventBar {
  event: GameEvent
  startCol: number
  endCol: number
  row: number
  showName: boolean
}

const props = withDefaults(defineProps<{
  events: GameEvent[]
}>(), {
  events: () => []
})

const emit = defineEmits<{
  (eventName: 'eventClick', event: GameEvent): void
}>()

const currentDate = ref(new Date())
const weekDays = ['일', '월', '화', '수', '목', '금', '토']
const hoveredEventId = ref<string | null>(null)

const EVENT_BAR_HEIGHT = 26 // 이벤트 바 하나의 높이 (px)
const BASE_HEIGHT = 50 // 날짜 숫자 표시를 위한 기본 높이 (px)
const MIN_HEIGHT = 100 // 최소 높이 (px)

const currentMonthLabel = computed(() => {
  return `${currentDate.value.getFullYear()}년 ${currentDate.value.getMonth() + 1}월`
})

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

// 각 주의 이벤트 바를 계산하고 캐싱
const weekEventBarsCache = computed(() => {
  const cache = new Map<number, EventBar[]>()

  calendarWeeks.value.forEach((week, weekIndex) => {
    const eventBars: EventBar[] = []

    // 각 이벤트에 대해 처리
    for (const event of props.events) {
      // 이 주의 첫 날과 마지막 날
      const weekStart = week.find(d => d !== null)
      const weekEnd = week[week.length - 1] || weekStart

      if (!weekStart) continue

      const eventStart = new Date(event.startDate.getFullYear(), event.startDate.getMonth(), event.startDate.getDate())
      const eventEnd = new Date(event.endDate.getFullYear(), event.endDate.getMonth(), event.endDate.getDate())
      const weekStartDate = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
      const weekEndDate = weekEnd ? new Date(weekEnd.getFullYear(), weekEnd.getMonth(), weekEnd.getDate()) : weekStartDate

      // 이 주와 이벤트가 겹치는지 확인
      if (eventEnd < weekStartDate || eventStart > weekEndDate) continue

      // 이 주에서 이벤트가 시작하는 컬럼과 끝나는 컬럼 계산
      let startCol = -1
      let endCol = -1

      for (let i = 0; i < week.length; i++) {
        const day = week[i]
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
        // 이름 표시 여부: 각 주에서 바가 시작하는 위치에는 항상 제목 표시
        const showName = true

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
          showName
        })
      }
    }

    cache.set(weekIndex, eventBars.sort((a, b) => a.row - b.row))
  })

  return cache
})

function previousMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

function nextMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

function getDayClass(day: Date | null): string {
  if (!day) return 'bg-muted/30'

  const today = new Date()
  if (day.toDateString() === today.toDateString()) {
    return 'bg-primary/10 border-2 border-primary/30'
  }

  return 'bg-card hover:bg-accent/30'
}

function getDayNumberClass(day: Date): string {
  const today = new Date()
  if (day.toDateString() === today.toDateString()) {
    return 'inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold'
  }

  const dayOfWeek = day.getDay()
  if (dayOfWeek === 0) return 'text-red-500'
  if (dayOfWeek === 6) return 'text-blue-500'

  return 'text-foreground'
}

function getWeekHeight(weekIndex: number): number {
  const eventBars = weekEventBarsCache.value.get(weekIndex) || []

  if (eventBars.length === 0) {
    return MIN_HEIGHT
  }

  // 최대 row 번호 찾기
  const maxRow = Math.max(...eventBars.map(bar => bar.row))

  // 높이 = 기본 높이 + (이벤트 바 개수 * 이벤트 바 높이)
  const calculatedHeight = BASE_HEIGHT + (maxRow + 1) * EVENT_BAR_HEIGHT

  return Math.max(calculatedHeight, MIN_HEIGHT)
}

function getEventBarStyle(eventBar: EventBar): string {
  const colWidth = 100 / 7 // 7 columns
  const padding = 0.3 // 좌우 여백 (%)

  const left = eventBar.startCol * colWidth + padding
  const width = (eventBar.endCol - eventBar.startCol + 1) * colWidth - padding * 2
  const top = 28 + eventBar.row * EVENT_BAR_HEIGHT // 날짜 숫자 아래부터 시작

  return `left: ${left}%; width: ${width}%; top: ${top}px;`
}

function getEventBarClass(event: GameEvent): string {
  if (event.type === EVENT_TYPE.EVENT) {
    return 'bg-blue-500 text-white'
  } else {
    return 'bg-purple-500 text-white'
  }
}

function getEventBarHoverClass(event: GameEvent): string {
  if (hoveredEventId.value === event.id) {
    return 'ring-2 ring-yellow-400 ring-offset-1 scale-105 z-50 shadow-lg'
  }
  return 'hover:opacity-90'
}

function formatDateTime(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

function handleEventClick(event: GameEvent) {
  emit('eventClick', event)
}
</script>