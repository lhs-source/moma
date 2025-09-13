<template>
  <div class="container mx-auto p-4 space-y-6">
    <h1 class="text-2xl font-bold">장비 시뮬레이션 (Gear Rune Planner)</h1>

    <!-- 장비 부위 선택 -->
    <div class="flex flex-wrap gap-2">
      <button v-for="part in parts" :key="part.value" class="px-3 py-1.5 rounded border border-border"
        :class="selectedPart === part.value ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-accent'"
        @click="selectPart(part.value)">
        {{ part.label }}
      </button>
    </div>

    <!-- 룬 목록 -->
    <div v-if="selectedPart" class="space-y-2">
      <h2 class="text-lg font-semibold text-foreground">{{ partLabel }} 룬 선택</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <label v-for="rune in runesForPart" :key="rune.id"
          class="p-3 border border-border rounded bg-card hover:bg-accent flex items-center gap-2 cursor-pointer">
          <input type="checkbox" :value="rune.id" v-model="selectedRuneIds" class="accent-primary" />
          <span class="text-foreground">{{ rune.name }}</span>
          <span class="text-xs ml-auto" :class="rune.source === 'raid' ? 'text-destructive' : 'text-purple-500'">
            {{ rune.source.toUpperCase() }}
          </span>
        </label>
      </div>
    </div>

    <!-- 결과 -->
    <div v-if="selectedRuneIds.length" class="mt-6 p-4 border border-border rounded bg-card">
      <h2 class="text-lg font-semibold mb-2 text-foreground">결과</h2>
      <div class="space-y-1 text-sm">
        <div v-for="item in resultList" :key="item.id" class="flex justify-between text-foreground">
          <span>{{ item.name }}</span>
          <span>
            {{ item.cost }}
            {{ item.source === 'raid' ? '증표' : '화석' }} ≈ {{ item.weeks }}주
          </span>
        </div>
      </div>
      <hr class="my-2 border-border" />
      <div class="font-medium flex justify-between text-foreground">
        <span>총 예상 소요</span>
        <span>{{ totalWeeks }}주</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { runes } from '@/data/runes'

// 장비 부위 정의
const parts: { value: 'weapon' | 'armor' | 'accessory'; label: string }[] = [
  { value: 'weapon', label: '무기' },
  { value: 'armor', label: '방어구' },
  { value: 'accessory', label: '장신구' },
]

const selectedPart = ref<'weapon' | 'armor' | 'accessory' | null>(null)
const selectedRuneIds = ref<string[]>([])

function selectPart(part: 'weapon' | 'armor' | 'accessory') {
  selectedPart.value = part
  // 파트 변경 시 선택 초기화
  selectedRuneIds.value = []
}

// 특정 부위의 룬 목록
const runesForPart = computed(() => {
  return runes.filter((r) => r.part === selectedPart.value)
})

// 선택한 룬 데이터
const selectedRunes = computed(() => {
  return runes.filter((r) => selectedRuneIds.value.includes(r.id))
})

// 토큰 수급 속도 (placeholder – 실제 데이터 필요)
const ratePerWeek: Record<'raid' | 'abyss', number> = {
  raid: 70, // 레이드 증표
  abyss: 140, // 심연의 화석 (예시)
}

const resultList = computed(() => {
  return selectedRunes.value.map((r) => {
    const weeks = Math.ceil(r.cost / ratePerWeek[r.source])
    return { ...r, weeks }
  })
})

const totalWeeks = computed(() => {
  return Math.max(...resultList.value.map((r) => r.weeks))
})

const partLabel = computed(() => {
  const found = parts.find((p) => p.value === selectedPart.value)
  return found ? found.label : ''
})
</script>

<style scoped>
/* 기본 색상 변수 등이 Tailwind를 통해 설정되어 있다고 가정 */
</style>