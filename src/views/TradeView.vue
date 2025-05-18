<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { barterData, barterItems } from '@/data/trade'
import WeeklyRequirements from '@/components/trade/WeeklyRequirements.vue'

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

function getItemInfo(itemId: string) {
  return barterItems.find(item => item.id === itemId)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <WeeklyRequirements />
    
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">교환 목록</h2>
      <div class="grid gap-6">
        <div v-for="(trades, region) in barterData" :key="region" class="bg-card rounded-lg p-4">
          <h3 class="text-xl font-semibold mb-4">{{ region }}</h3>
          <div class="grid gap-4">
            <div v-for="trade in trades" :key="trade.id" 
                 :class="[
                   'p-4 rounded-lg border transition-colors',
                   disabledTrades.has(trade.id) 
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
                      {{ trade.limitType === 'daily' ? `일 ${trade.limitCount}회` : 
                         trade.limitType === 'account' ? `계정당 ${trade.limitCount}회` : '제한 없음' }}
                    </span>
                    <button @click="toggleTrade(trade.id)" 
                            class="px-3 py-1 rounded-full text-sm"
                            :class="disabledTrades.has(trade.id) ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'">
                      {{ disabledTrades.has(trade.id) ? '활성화' : '비활성화' }}
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