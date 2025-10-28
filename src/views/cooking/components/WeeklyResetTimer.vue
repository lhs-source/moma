<template>
  <div class="bg-card border border-border rounded p-2">
    <h3 class="text-sm font-semibold text-foreground mb-2">주간 리셋 정보</h3>
    <div class="space-y-1 text-xs">
      <div class="flex justify-between">
        <span class="text-muted-foreground">다음 리셋:</span>
        <span class="text-foreground">{{ nextResetDate }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-muted-foreground">남은 시간:</span>
        <span :class="[timeLeft.isUrgent ? 'text-destructive font-semibold' : 'text-foreground']">
          {{ timeLeft.display }}
        </span>
      </div>
      <div class="mt-2 w-full bg-muted rounded-full h-1.5">
        <div 
          class="bg-primary h-1.5 rounded-full transition-all duration-1000"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 다음 월요일 자정 계산
function getNextMonday(): Date {
  const now = new Date()
  const nextMonday = new Date(now)
  
  // 현재 요일 (0: 일요일, 1: 월요일, ...)
  const currentDay = now.getDay()
  
  // 다음 월요일까지의 일수 계산
  const daysUntilMonday = currentDay === 0 ? 1 : (8 - currentDay) % 7 || 7
  
  nextMonday.setDate(now.getDate() + daysUntilMonday)
  nextMonday.setHours(0, 0, 0, 0)
  
  return nextMonday
}

// 주간 진행률 계산 (월요일 0% -> 일요일 100%)
function getWeekProgress(): number {
  const now = new Date()
  const currentDay = now.getDay() // 0: 일요일, 1: 월요일, ...
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  
  // 월요일부터 시작하도록 조정 (월요일 = 0, 일요일 = 6)
  const dayFromMonday = currentDay === 0 ? 6 : currentDay - 1
  
  // 시간을 소수점으로 변환 (예: 13:30 = 13.5)
  const timeDecimal = currentHour + currentMinute / 60
  
  // 총 주간 진행률 (7일 * 24시간 = 168시간)
  const totalHoursInWeek = 7 * 24
  const elapsedHours = dayFromMonday * 24 + timeDecimal
  
  return Math.min((elapsedHours / totalHoursInWeek) * 100, 100)
}

// 시간 차이를 문자열로 변환
function formatTimeDifference(diffMs: number): { display: string; isUrgent: boolean } {
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  const isUrgent = diffMs < (1000 * 60 * 60 * 24) // 24시간 미만이면 긴급
  
  if (days > 0) {
    return { display: `${days}일 ${hours}시간`, isUrgent }
  } else if (hours > 0) {
    return { display: `${hours}시간 ${minutes}분`, isUrgent }
  } else {
    return { display: `${minutes}분`, isUrgent }
  }
}

const currentTime = ref(new Date())

const nextResetDate = computed(() => {
  const nextMonday = getNextMonday()
  return nextMonday.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }) + ' 00:00'
})

const timeLeft = computed(() => {
  const nextMonday = getNextMonday()
  const diffMs = nextMonday.getTime() - currentTime.value.getTime()
  
  if (diffMs <= 0) {
    return { display: '리셋됨', isUrgent: false }
  }
  
  return formatTimeDifference(diffMs)
})

const progressPercentage = computed(() => {
  return getWeekProgress()
})

let intervalId: number | null = null

onMounted(() => {
  // 매 분마다 업데이트
  intervalId = setInterval(() => {
    currentTime.value = new Date()
  }, 60000) as any
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
