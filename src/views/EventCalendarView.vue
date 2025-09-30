<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold text-foreground">이벤트 & 캐시샵 캘린더</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 캘린더 영역 (왼쪽, 2/3) -->
      <div class="lg:col-span-2">
        <MonthCalendar :events="gameEvents" @event-click="openEventDetail" />
      </div>

      <!-- 이벤트 목록 영역 (오른쪽, 1/3) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-foreground">진행 중인 일정</h2>
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
          <h2 class="text-xl font-semibold text-foreground mb-3">예정된 일정</h2>
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
          <h2 class="text-xl font-semibold text-foreground mb-3">종료된 일정</h2>
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
import MonthCalendar from '@/components/event/MonthCalendar.vue'
import EventBar from '@/components/event/EventBar.vue'
import EventDetailSheet from '@/components/event/EventDetailSheet.vue'
import { gameEvents } from '@/data/events'
import type { GameEvent } from '@/data/schemas/event'

const now = new Date()
const selectedEvent = ref<GameEvent | null>(null)
const isSheetOpen = ref(false)

const activeEvents = computed(() => {
  return gameEvents.filter(event => {
    return event.startDate <= now && event.endDate >= now
  }).sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
})

const upcomingEvents = computed(() => {
  return gameEvents.filter(event => {
    return event.startDate > now
  }).sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
})

const pastEvents = computed(() => {
  return gameEvents.filter(event => {
    return event.endDate < now
  }).sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
})

function openEventDetail(event: GameEvent) {
  selectedEvent.value = event
  isSheetOpen.value = true
}

function closeEventDetail() {
  isSheetOpen.value = false
  // 애니메이션이 끝난 후에 선택된 이벤트를 null로 설정
  setTimeout(() => {
    if (!isSheetOpen.value) {
      selectedEvent.value = null
    }
  }, 300)
}
</script>
