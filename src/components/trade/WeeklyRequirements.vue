<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { barterData, barterItems } from '@/data/trade'

interface WeeklyRequirement {
  itemId: string
  totalQuantity: number
  trades: {
    id: string
    requiredItemId: string
    requiredQuantity: number
  }[]
}

const disabledTrades = ref<Set<string>>(new Set())

// localStorage에서 비활성화된 교환 목록 로드
onMounted(() => {
  const savedDisabledTrades = localStorage.getItem('disabledTrades')
  if (savedDisabledTrades) {
    disabledTrades.value = new Set(JSON.parse(savedDisabledTrades))
  }
})

// 비활성화된 교환 목록 저장
function saveDisabledTrades() {
  localStorage.setItem('disabledTrades', JSON.stringify([...disabledTrades.value]))
}

// 교환 항목 토글
function toggleTrade(tradeId: string) {
  if (disabledTrades.value.has(tradeId)) {
    disabledTrades.value.delete(tradeId)
  } else {
    disabledTrades.value.add(tradeId)
  }
  saveDisabledTrades()
}

function calculateWeeklyRequirements(): WeeklyRequirement[] {
  const requirements: { [key: string]: WeeklyRequirement } = {}

  // 모든 지역의 교환 목록을 순회
  Object.values(barterData).forEach(trades => {
    trades.forEach(trade => {
      // 비활성화된 교환은 제외
      if (disabledTrades.value.has(trade.id)) return

      // 필요한 아이템의 수량 계산 (일일 제한이 있는 경우 7일치)
      const dailyLimit = trade.limitType === 'daily' ? trade.limitCount : 1
      const weeklyQuantity = dailyLimit * 7

      // 필요한 아이템 정보 추가
      if (!requirements[trade.requiredItemId]) {
        requirements[trade.requiredItemId] = {
          itemId: trade.requiredItemId,
          totalQuantity: 0,
          trades: []
        }
      }

      requirements[trade.requiredItemId].totalQuantity += weeklyQuantity
      requirements[trade.requiredItemId].trades.push({
        id: trade.id,
        requiredItemId: trade.itemId,
        requiredQuantity: weeklyQuantity
      })
    })
  })

  // 결과를 배열로 변환하고 수량 기준으로 정렬
  return Object.values(requirements).sort((a, b) => b.totalQuantity - a.totalQuantity)
}

function getItemInfo(itemId: string) {
  return barterItems.find(item => item.id === itemId)
}

function formatQuantity(quantity: number): string {
  return quantity.toString()
}

const weeklyRequirements = computed(() => calculateWeeklyRequirements())

// 비활성화된 교환 목록 계산
const disabledRequirements = computed(() => {
  const requirements: { [key: string]: WeeklyRequirement } = {}

  Object.values(barterData).forEach(trades => {
    trades.forEach(trade => {
      if (!disabledTrades.value.has(trade.id)) return

      const dailyLimit = trade.limitType === 'daily' ? trade.limitCount : 1
      const weeklyQuantity = dailyLimit * 7

      if (!requirements[trade.requiredItemId]) {
        requirements[trade.requiredItemId] = {
          itemId: trade.requiredItemId,
          totalQuantity: 0,
          trades: []
        }
      }

      requirements[trade.requiredItemId].totalQuantity += weeklyQuantity
      requirements[trade.requiredItemId].trades.push({
        id: trade.id,
        requiredItemId: trade.itemId,
        requiredQuantity: weeklyQuantity
      })
    })
  })

  return Object.values(requirements).sort((a, b) => b.totalQuantity - a.totalQuantity)
})
</script>

<template>
  <div class="p-2">
    <h2 class="text-xl font-bold mb-2">주간 교환 필요 아이템</h2>
    <div class="flex flex-wrap gap-2">
      <!-- 활성화된 교환 목록 -->
      <div v-for="requirement in weeklyRequirements" :key="requirement.itemId" 
           class="flex items-center px-3 py-1.5 bg-card rounded-full border border-border shadow-sm hover:shadow-md transition-shadow">
        <h3 class="font-medium text-sm">
          {{ getItemInfo(requirement.itemId)?.name }}
          <span class="text-primary ml-1">{{ requirement.totalQuantity }}개</span>
          <span class="text-muted-foreground ml-1">
            ({{ requirement.trades.map(trade => 
              `${getItemInfo(trade.requiredItemId)?.name} ${trade.requiredQuantity}개`
            ).join(', ') }})
          </span>
        </h3>
      </div>

      <!-- 비활성화된 교환 목록 -->
      <div v-for="requirement in disabledRequirements" :key="requirement.itemId" 
           class="flex items-center px-3 py-1.5 bg-card/50 rounded-full border border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="font-medium text-sm text-muted-foreground">
          {{ getItemInfo(requirement.itemId)?.name }}
          <span class="text-muted-foreground ml-1">{{ requirement.totalQuantity }}개</span>
          <span class="text-muted-foreground/70 ml-1">
            ({{ requirement.trades.map(trade => 
              `${getItemInfo(trade.requiredItemId)?.name} ${trade.requiredQuantity}개`
            ).join(', ') }})
          </span>
        </h3>
      </div>
    </div>
  </div>
</template> 