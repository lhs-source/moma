<script setup lang="ts">
import { computed } from 'vue'
import { transformItems, transformTrades } from '../../utils/dataTransformer'
import { calculateWeeklyRequirements } from '../../utils/tradeStorage'

const items = transformItems()
const trades = transformTrades()

// 현재 요일 (0: 일요일, 1: 월요일, ...)
const currentDay = computed(() => new Date().getDay())

// 주간 필요 아이템 계산
const weeklyRequirements = computed(() => {
  return calculateWeeklyRequirements(trades, currentDay.value)
})

// 아이템 정보 가져오기
const getItemInfo = (itemId: string) => {
  return items.find(item => item.id === itemId)
}
</script>

<template>
  <div class="bg-card rounded-lg p-4 shadow">
    <h2 class="text-xl font-bold mb-4">주간 필요 아이템</h2>
    
    <div v-if="weeklyRequirements.size === 0" class="text-muted-foreground">
      활성화된 교환이 없습니다.
    </div>
    
    <div v-else class="space-y-2">
      <div 
        v-for="[itemId, quantity] in weeklyRequirements" 
        :key="itemId"
        class="flex items-center justify-between p-2 bg-background rounded"
      >
        <div class="flex items-center">
          <img 
            :src="getItemInfo(itemId)?.imageUrl" 
            :alt="getItemInfo(itemId)?.name"
            class="w-8 h-8 mr-2"
          >
          <span>{{ getItemInfo(itemId)?.name }}</span>
        </div>
        <span class="font-semibold">x{{ quantity }}</span>
      </div>
    </div>
  </div>
</template> 