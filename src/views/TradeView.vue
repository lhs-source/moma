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
    <WeeklyRequirements />
    
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">교환 목록</h2>
      <div class="grid gap-6">
        <div v-for="(trades, region) in formattedTrades" :key="region" class="bg-card rounded-lg p-4">
          <h3 class="text-xl font-semibold mb-4">{{ region }}</h3>
          <div class="grid gap-4">
            <div v-for="trade in trades" :key="trade.id" 
                 :class="[
                   'p-4 rounded-lg border transition-colors',
                   trade.isDisabled 
                     ? 'bg-muted/50 border-border/50 text-muted-foreground' 
                     : 'bg-card border-border hover:bg-accent'
                 ]">
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <span>{{ getItemInfo(trade.requiredItemId)?.name }}</span>
                      <span class="text-muted-foreground">{{ trade.requiredQuantity }}개</span>
                    </div>
                    <span class="text-muted-foreground">→</span>
                    <div class="flex items-center gap-2">
                      <span>{{ getItemInfo(trade.itemId)?.name }}</span>
                      <span class="text-muted-foreground">{{ trade.itemQuantity }}개</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="text-sm text-muted-foreground">
                      {{ getLimitText(trade) }}
                    </span>
                    <button @click="toggleTrade(trade.id)" 
                            class="px-3 py-1 rounded-full text-sm"
                            :class="trade.isDisabled ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'">
                      {{ trade.isDisabled ? '활성화' : '비활성화' }}
                    </button>
                  </div>
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ region }} - {{ trade.npc }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 