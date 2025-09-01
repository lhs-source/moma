<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface TimerEvent {
  name: string
  times: string[]
  days?: string[]
}

const timerEvents: TimerEvent[] = [
  {
    name: '필드보스',
    times: ['12:00', '18:00', '20:00', '22:00']
  },
  {
    name: '콜헨 불꽃놀이',
    times: ['20:00'],
    days: ['금요일', '토요일', '일요일']
  }
]

const now = ref(new Date())

// 1분마다 시간 업데이트
let timer: number | null = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 60000) // 1분마다 업데이트
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
const currentTime = computed(() => {
  const hours = now.value.getHours().toString().padStart(2, '0')
  const minutes = now.value.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
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

  return `${hoursDiff}시간 ${minutesDiff}분`
}
</script>

<template>
  <div class="timer-info">
    <h2 class="text-xl font-bold mb-4">타이머 정보</h2>
    <div class="space-y-3">
      <div v-for="event in timerEvents" :key="event.name" class="bg-gray-100 p-3 rounded-lg">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-semibold">{{ event.name }}</h3>
            <p class="text-sm text-gray-600">
              {{ event.times.join(', ') }}
              <span v-if="event.days" class="ml-2">({{ event.days.join(', ') }})</span>
            </p>
          </div>
          <div class="text-right">
            <div v-if="getNextTime(event.times, event.days)" class="text-blue-600 font-medium">
              다음: {{ getNextTime(event.times, event.days) }}
            </div>
            <div v-else class="text-gray-500">
              오늘 없음
            </div>
            <div v-if="getNextTime(event.times, event.days)" class="text-sm text-gray-500">
              {{ getTimeUntil(getNextTime(event.times, event.days)!) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
