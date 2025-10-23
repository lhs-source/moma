<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <PageTitle>이벤트 & 캐시샵 캘린더</PageTitle>
      <!-- 뷰 전환 토글 버튼 -->
      <CalendarViewToggle 
        :model-value="calendarView"
        @update:model-value="handleViewChange"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 캘린더 영역 (왼쪽, 2/3) - 조건부 렌더링 -->
      <div class="lg:col-span-2">
        <MonthCalendar 
          v-if="calendarView === 'month'"
          :events="gameEvents" 
          @event-click="openEventDetail" 
        />
        <WeekCalendar 
          v-else
          :events="gameEvents" 
          @event-click="openEventDetail" 
        />
      </div>

      <!-- 이벤트 목록 영역 (오른쪽, 1/3) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <SectionTitle>진행 중인 일정</SectionTitle>
        </div>

        <div class="space-y-3">
          <EventBar 
            v-for="event in activeEvents" 
            :key="event.id"
            :event="event" 
            @click="openEventDetail" 
          />

          <div v-if="activeEvents.length === 0"
            class="text-center py-8 text-muted-foreground border border-border rounded-lg bg-card">
            진행 중인 일정이 없습니다
          </div>
        </div>

        <div class="mt-8">
          <SectionTitle class="mb-3">예정된 일정</SectionTitle>
          <div class="space-y-3">
            <EventBar 
              v-for="event in upcomingEvents" 
              :key="event.id"
              :event="event" 
              @click="openEventDetail" 
            />

            <div v-if="upcomingEvents.length === 0"
              class="text-center py-8 text-muted-foreground border border-border rounded-lg bg-card">
              예정된 일정이 없습니다
            </div>
          </div>
        </div>

        <div class="mt-8">
          <SectionTitle class="mb-3">종료된 일정</SectionTitle>
          <div class="space-y-3">
            <EventBar 
              v-for="event in pastEvents" 
              :key="event.id"
              :event="event" 
              @click="openEventDetail" 
            />

            <div v-if="pastEvents.length === 0"
              class="text-center py-8 text-muted-foreground border border-border rounded-lg bg-card">
              종료된 일정이 없습니다
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Detail Sheet -->
    <EventDetailSheet 
      :event="selectedEvent" 
      :is-open="isSheetOpen" 
      @close="closeEventDetail" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MonthCalendar from './components/MonthCalendar.vue'
import WeekCalendar from './components/WeekCalendar.vue'
import CalendarViewToggle from './components/CalendarViewToggle.vue'
import EventBar from './components/EventBar.vue'
import EventDetailSheet from './components/EventDetailSheet.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { gameEvents } from '@/data/events'
import type { GameEvent } from '@/data/schemas/event'
import { useCalendarView, type CalendarViewType } from '@/composables/useCalendarView'

/**
 * 이벤트 캘린더 메인 페이지
 * 
 * 월별/주간 캘린더 뷰를 제공하고, 진행 중인 이벤트 목록을 표시합니다.
 * 
 * @remarks
 * 동작 플로우:
 * 1. useCalendarView composable로 뷰 상태 관리 (로컬 스토리지 연동)
 * 2. CalendarViewToggle로 사용자가 뷰 선택
 * 3. 선택된 뷰에 따라 MonthCalendar 또는 WeekCalendar 렌더링
 * 4. 이벤트 바 클릭 시 EventDetailSheet 표시
 * 
 * Event 기반 설계:
 * - handleViewChange: 명시적으로 뷰 변경 처리
 * - openEventDetail: 명시적으로 상세 정보 시트 열기
 * - closeEventDetail: 명시적으로 상세 정보 시트 닫기
 */

// Composable: 캘린더 뷰 상태 관리
const { calendarView, setView } = useCalendarView()

// 현재 시간 (이벤트 필터링 기준)
const now = new Date()
// 선택된 이벤트 (상세 정보 시트용)
const selectedEvent = ref<GameEvent | null>(null)
// 상세 정보 시트 열림 상태
const isSheetOpen = ref(false)

const activeEvents = computed(() => {
  return gameEvents.filter(event => {
    return event.startDate <= now && event.endDate >= now
  }).sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
})

const upcomingEvents = computed(() => {
  return gameEvents.filter(event => {
    return event.startDate > now
  }).sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
})

const pastEvents = computed(() => {
  return gameEvents.filter(event => {
    return event.endDate < now
  }).sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
})

/**
 * 캘린더 뷰 변경 이벤트 핸들러
 * 
 * Event handler - CalendarViewToggle에서 발생한 이벤트 처리
 * 
 * @param {CalendarViewType} view - 선택된 뷰 타입 ('month' | 'week')
 * 
 * @remarks
 * setView 함수가 내부적으로 로컬 스토리지에 저장합니다.
 * Event 기반 패턴으로 명확한 데이터 흐름을 보장합니다.
 */
function handleViewChange(view: CalendarViewType): void {
  setView(view)
}

/**
 * 이벤트 상세 정보 시트 열기
 * 
 * Event handler - 캘린더에서 이벤트 바 클릭 시 호출
 * 
 * @param {GameEvent} event - 클릭된 이벤트
 */
function openEventDetail(event: GameEvent): void {
  selectedEvent.value = event
  isSheetOpen.value = true
}

/**
 * 이벤트 상세 정보 시트 닫기
 * 
 * Event handler - EventDetailSheet에서 닫기 버튼 클릭 시 호출
 * 
 * @remarks
 * 애니메이션이 끝난 후 selectedEvent를 null로 설정하여 메모리 정리
 */
function closeEventDetail(): void {
  isSheetOpen.value = false
  // 애니메이션이 끝난 후에 선택된 이벤트를 null로 설정
  setTimeout(() => {
    if (!isSheetOpen.value) {
      selectedEvent.value = null
    }
  }, 300)
}
</script>

