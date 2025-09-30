<template>
  <div :class="barClass" class="px-3 py-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm truncate text-foreground">{{ event.name }}</div>
        <div class="text-xs text-muted-foreground mt-1">
          <div>시작: {{ formatDateTime(event.startDate) }}</div>
          <div>종료: {{ formatDateTime(event.endDate) }}</div>
        </div>
      </div>
      <div class="ml-3 text-right">
        <div class="text-xs font-medium text-foreground whitespace-nowrap">{{ timeRemaining }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { GameEvent } from '@/data/schemas/event'
import { EVENT_TYPE } from '@/data/schemas/event'

const props = withDefaults(defineProps<{
  event: GameEvent
}>(), {})

const now = ref(new Date())
let intervalId: number | null = null

const barClass = computed(() => {
  if (props.event.type === EVENT_TYPE.EVENT) {
    return 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700'
  } else {
    return 'bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700'
  }
})

const timeRemaining = computed(() => {
  const diff = props.event.endDate.getTime() - now.value.getTime()
  
  if (diff <= 0) {
    return '종료됨'
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) {
    return `${days}일 ${hours}시간 남음`
  } else if (hours > 0) {
    return `${hours}시간 ${minutes}분 남음`
  } else {
    return `${minutes}분 남음`
  }
})

function formatDateTime(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

function updateTime() {
  now.value = new Date()
}

onMounted(() => {
  intervalId = window.setInterval(updateTime, 60000) // 1분마다 업데이트
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})
</script>
