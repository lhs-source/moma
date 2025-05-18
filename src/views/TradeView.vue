<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { barterData, barterItems } from '@/data/trade'
import WeeklyRequirements from '@/components/trade/WeeklyRequirements.vue'

// Types
interface Trade {
  id: string
  npc: string
  itemId: string
  itemQuantity: number
  requiredItemId: string
  requiredQuantity: number
  limitType: 'daily' | 'account' | 'none'
  limitCount: number
  isDisabled?: boolean
}

// State
const disabledTrades = ref<Set<string>>(new Set())

// Computed
const formattedTrades = computed(() => {
  const result: Record<string, Trade[]> = {}
  
  Object.entries(barterData).forEach(([region, trades]) => {
    result[region] = trades.map(trade => ({
      ...trade,
      isDisabled: disabledTrades.value.has(trade.id)
    }))
  })
  
  return result
})

// Methods
function getItemInfo(itemId: string) {
  return barterItems.find(item => item.id === itemId)
}

function getLimitText(trade: Trade) {
  switch (trade.limitType) {
    case 'daily':
      return `일 ${trade.limitCount}회`
    case 'account':
      return `계정당 ${trade.limitCount}회`
    default:
      return '제한 없음'
  }
}

function toggleTrade(tradeId: string) {
  if (disabledTrades.value.has(tradeId)) {
    disabledTrades.value.delete(tradeId)
  } else {
    disabledTrades.value.add(tradeId)
  }
  saveDisabledTrades()
}

function saveDisabledTrades() {
  localStorage.setItem('disabledTrades', JSON.stringify([...disabledTrades.value]))
}

// Lifecycle
onMounted(() => {
  const savedDisabledTrades = localStorage.getItem('disabledTrades')
  if (savedDisabledTrades) {
    disabledTrades.value = new Set(JSON.parse(savedDisabledTrades))
  }
})
</script>

<template>
  <div class="container mx-auto p-4">
    <WeeklyRequirements :disabled-trades="disabledTrades" />
    
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">교환 목록</h2>
      <div class="grid gap-6">
        <div v-for="(trades, region) in formattedTrades" :key="region" class="bg-card rounded-lg p-2">
          <h3 class="text-xl font-semibold mb-4">{{ region }}</h3>
          <div class="grid gap-2">
            <div v-for="trade in trades" :key="trade.id" 
                 class="flex items-center justify-between p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                 :class="{'bg-gray-100 dark:bg-gray-800': disabledTrades.has(trade.id)}">
              <div class="flex items-center gap-3">
                <img 
                  :src="getItemInfo(trade.itemId)?.imageUrl" 
                  :alt="getItemInfo(trade.itemId)?.name"
                  class="w-10 h-10 object-contain"
                />
                <div>
                  <h3 class="font-medium" :class="{'text-muted-foreground': disabledTrades.has(trade.id)}">
                    {{ getItemInfo(trade.itemId)?.name }}
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    {{ getItemInfo(trade.requiredItemId)?.name }} {{ trade.requiredQuantity }}개
                    <span v-if="trade.limitType" class="ml-1">
                      ({{ getLimitText(trade) }})
                    </span>
                  </p>
                </div>
              </div>
              <button 
                @click="toggleTrade(trade.id)"
                class="px-3 py-1.5 rounded-full text-sm transition-colors"
                :class="disabledTrades.has(trade.id) ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-primary hover:bg-primary/90 text-primary-foreground'"
              >
                {{ disabledTrades.has(trade.id) ? '비활성화' : '활성화' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 