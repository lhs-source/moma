<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface TimerEvent {
  name: string
  times: string[]
  days?: string[]
  duration?: number // 분 단위
}

const timerEvents: TimerEvent[] = [
  {
    name: '필드보스',
    times: ['12:00', '18:00', '20:00', '22:00'],
    duration: 30
  },
  {
    name: '콜헨 불꽃놀이',
    times: ['20:00'],
    days: ['금요일', '토요일', '일요일']
  },
  {
    name: '결계',
    times: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    duration: 4,
  }
]

const now = ref(new Date())

// 1초마다 시간 업데이트
let timer: number | null = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000) // 1초마다 업데이트
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
const currentTime = computed(() => {
  const hours = now.value.getHours().toString().padStart(2, '0')
  const minutes = now.value.getMinutes().toString().padStart(2, '0')
  const seconds = now.value.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
})

const currentDay = computed(() => {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  return days[now.value.getDay()]
})

const getNextTime = (times: string[], days?: string[]) => {
  const currentTimeStr = currentTime.value
  const currentDayStr = currentDay.value

  // 특정 요일에만 실행되는 이벤트인 경우
  if (days && !days.includes(currentDayStr)) {
    return null
  }

  // 오늘 남은 시간 찾기
  for (const time of times) {
    if (time > currentTimeStr) {
      return time
    }
  }

  // 오늘 시간이 모두 지났으면 내일 첫 번째 시간
  return times[0]
}

const getTimeUntil = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const targetTime = new Date()
  targetTime.setHours(hours, minutes, 0, 0)

  // 이미 지난 시간이면 내일로 설정
  if (targetTime <= now.value) {
    targetTime.setDate(targetTime.getDate() + 1)
  }

  const diff = targetTime.getTime() - now.value.getTime()
  const hoursDiff = Math.floor(diff / (1000 * 60 * 60))
  const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secondsDiff = Math.floor((diff % (1000 * 60)) / 1000)

  return `${hoursDiff}시간 ${minutesDiff}분 ${secondsDiff}초`
}

const getCurrentEventTimeRemaining = (times: string[], days?: string[], duration?: number) => {
  const currentTimeStr = currentTime.value
  const currentDayStr = currentDay.value

  // 특정 요일에만 실행되는 이벤트인 경우
  if (days && !days.includes(currentDayStr)) {
    return null
  }

  // 현재 진행 중인 이벤트 찾기
  for (const time of times) {
    const [hours, minutes] = time.split(':').map(Number)
    const eventStart = new Date()
    eventStart.setHours(hours, minutes, 0, 0)

    const eventEnd = new Date(eventStart)
    eventEnd.setMinutes(eventEnd.getMinutes() + (duration || 0))

    const currentTime = new Date()
    currentTime.setHours(parseInt(currentTimeStr.split(':')[0]), parseInt(currentTimeStr.split(':')[1]), parseInt(currentTimeStr.split(':')[2]), 0)

    if (currentTime >= eventStart && currentTime < eventEnd) {
      const remainingTime = eventEnd.getTime() - currentTime.getTime()
      const hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60))
      const minutesRemaining = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      const secondsRemaining = Math.floor((remainingTime % (1000 * 60)) / 1000)

      return `${hoursRemaining}시간 ${minutesRemaining}분 ${secondsRemaining}초`
    }
  }

  return null
}
const isCurrentlyActive = (times: string[], days?: string[], duration?: number) => {
  const currentTimeStr = currentTime.value
  const currentDayStr = currentDay.value

  // 특정 요일에만 실행되는 이벤트인 경우
  if (days && !days.includes(currentDayStr)) {
    return false
  }

  // 현재 시간이 이벤트 시간 범위 내에 있는지 확인
  for (const time of times) {
    const [hours, minutes] = time.split(':').map(Number)
    const eventStart = new Date()
    eventStart.setHours(hours, minutes, 0, 0)

    const eventEnd = new Date(eventStart)
    eventEnd.setMinutes(eventEnd.getMinutes() + (duration || 0))

    const currentTime = new Date()
    currentTime.setHours(parseInt(currentTimeStr.split(':')[0]), parseInt(currentTimeStr.split(':')[1]), parseInt(currentTimeStr.split(':')[2]), 0)

    if (currentTime >= eventStart && currentTime < eventEnd) {
      return true
    }
  }

  return false
}
</script>

<template>
  <div class="timer-info">
    <h2 class="text-xl font-bold mb-4 text-foreground">타이머 정보</h2>
    <div class="space-y-3">
      <div v-for="event in timerEvents" :key="event.name" :class="[
        'p-3 rounded-lg border',
        isCurrentlyActive(event.times, event.days, event.duration)
          ? 'bg-destructive/10 border-destructive/30'
          : 'bg-card border-border'
      ]">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-foreground">{{ event.name }}</h3>
            <p class="text-sm text-muted-foreground">
              {{ event.times.join(', ') }}
              <span v-if="event.days" class="ml-2">({{ event.days.join(', ') }})</span>
              <span v-if="event.duration" class="ml-2">({{ event.duration }}분)</span>
            </p>
          </div>
          <div class="text-right whitespace-nowrap min-w-32">
            <div v-if="isCurrentlyActive(event.times, event.days, event.duration)" class="text-destructive font-bold">
              등장 중!
            </div>
            <div v-else-if="getNextTime(event.times, event.days)" class="text-primary font-medium">
              다음: {{ getNextTime(event.times, event.days) }}
            </div>
            <div v-else class="text-muted-foreground">
              오늘 없음
            </div>
            <div v-if="isCurrentlyActive(event.times, event.days, event.duration)" class="text-sm text-destructive">
              남은 시간: {{ getCurrentEventTimeRemaining(event.times, event.days, event.duration) }}
            </div>
            <div v-if="getNextTime(event.times, event.days)" class="text-sm text-muted-foreground">
              {{ getTimeUntil(getNextTime(event.times, event.days)!) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
