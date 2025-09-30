<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold text-foreground">이벤트 & 캐시샵 캘린더</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 캘린더 영역 (왼쪽, 2/3) -->
      <div class="lg:col-span-2">
        <MonthCalendar :events="gameEvents" />
      </div>

      <!-- 이벤트 목록 영역 (오른쪽, 1/3) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-foreground">진행 중인 일정</h2>
        </div>

        <div class="space-y-3">
          <div v-for="event in activeEvents" :key="event.id">
            <EventBar :event="event" />
          </div>

          <div v-if="activeEvents.length === 0"
            class="text-center py-8 text-muted-foreground border border-border rounded-lg bg-card">
            진행 중인 일정이 없습니다
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-xl font-semibold text-foreground mb-3">예정된 일정</h2>
          <div class="space-y-3">
            <div v-for="event in upcomingEvents" :key="event.id">
              <EventBar :event="event" />
            </div>

            <div v-if="upcomingEvents.length === 0"
              class="text-center py-8 text-muted-foreground border border-border rounded-lg bg-card">
              예정된 일정이 없습니다
            </div>
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-xl font-semibold text-foreground mb-3">종료된 일정</h2>
          <div class="space-y-3">
            <div v-for="event in pastEvents" :key="event.id">
              <EventBar :event="event" />
            </div>

            <div v-if="pastEvents.length === 0"
              class="text-center py-8 text-muted-foreground border border-border rounded-lg bg-card">
              종료된 일정이 없습니다
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MonthCalendar from '@/components/event/MonthCalendar.vue'
import EventBar from '@/components/event/EventBar.vue'
import { gameEvents } from '@/data/events'

const now = new Date()

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
</script>
