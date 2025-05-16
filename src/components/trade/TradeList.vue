<script setup lang="ts">
import { ref, computed } from 'vue'
import { transformNPCs, transformItems, transformTrades } from '../../utils/dataTransformer'
import { isTradeEnabled, toggleTrade, toggleTradeCompletion, getTradeCompletionStatus } from '../../utils/tradeStorage'
import type { Trade } from '../../data/schemas/trade'

const npcs = transformNPCs()
const items = transformItems()
const trades = transformTrades()

// 지역별로 NPC 그룹화
const npcsByLocation = computed(() => {
  const groups: { [key: string]: typeof npcs } = {}
  npcs.forEach(npc => {
    if (!groups[npc.location]) {
      groups[npc.location] = []
    }
    groups[npc.location].push(npc)
  })
  return groups
})

// NPC별 교환 목록
const tradesByNPC = computed(() => {
  const groups: { [key: string]: Trade[] } = {}
  trades.forEach(trade => {
    if (!groups[trade.npcId]) {
      groups[trade.npcId] = []
    }
    groups[trade.npcId].push(trade)
  })
  return groups
})

// 아이템 정보 가져오기
const getItemInfo = (itemId: string) => {
  return items.find(item => item.id === itemId)
}

// 교환 활성화/비활성화 토글
const handleToggleTrade = (tradeId: string) => {
  toggleTrade(tradeId)
}

// 교환 완료 토글
const handleToggleCompletion = (tradeId: string, trade: Trade) => {
  toggleTradeCompletion(tradeId, trade)
}

// 교환 타입에 따른 배지 스타일
const getTypeBadgeClass = (type: string) => {
  return type === 'daily' 
    ? 'bg-blue-100 text-blue-800' 
    : 'bg-purple-100 text-purple-800'
}

// 교환 범위에 따른 배지 스타일
const getScopeBadgeClass = (scope: string) => {
  return scope === 'account' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800'
}

// 완료 상태에 따른 스타일
const getCompletionClass = (completed: boolean) => {
  return completed
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- 지역별 섹션 -->
    <div v-for="(npcs, location) in npcsByLocation" :key="location" class="mb-8">
      <h2 class="text-2xl font-bold mb-4 flex items-center">
        <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2">{{ location }}</span>
      </h2>
      
      <!-- NPC별 교환 목록 -->
      <div v-for="npc in npcs" :key="npc.id" class="mb-6">
        <div class="bg-card rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="relative">
              <img 
                :src="npc.imageUrl" 
                :alt="npc.name"
                class="w-12 h-12 rounded-full mr-4 border-2 border-primary/20"
              >
              <div class="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {{ tradesByNPC[npc.id]?.length || 0 }}
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold">{{ npc.name }}</h3>
              <p class="text-sm text-muted-foreground">{{ npc.location }}</p>
            </div>
          </div>

          <!-- 교환 목록 -->
          <div v-if="tradesByNPC[npc.id]" class="space-y-4">
            <div 
              v-for="trade in tradesByNPC[npc.id]" 
              :key="trade.id"
              class="flex items-center justify-between p-3 bg-background rounded"
            >
              <div class="flex items-center space-x-4">
                <!-- 주는 아이템 -->
                <div class="flex items-center">
                  <img 
                    :src="getItemInfo(trade.giveItemId)?.imageUrl" 
                    :alt="getItemInfo(trade.giveItemId)?.name"
                    class="w-8 h-8 mr-2"
                  >
                  <span>{{ getItemInfo(trade.giveItemId)?.name }} x{{ trade.giveQuantity }}</span>
                </div>

                <!-- 화살표 -->
                <span class="text-muted-foreground">→</span>

                <!-- 받는 아이템 -->
                <div class="flex items-center">
                  <img 
                    :src="getItemInfo(trade.receiveItemId)?.imageUrl" 
                    :alt="getItemInfo(trade.receiveItemId)?.name"
                    class="w-8 h-8 mr-2"
                  >
                  <span>{{ getItemInfo(trade.receiveItemId)?.name }} x{{ trade.receiveQuantity }}</span>
                </div>
              </div>

              <!-- 교환 정보 및 토글 -->
              <div class="flex items-center space-x-4">
                <span class="text-sm text-muted-foreground">
                  {{ trade.type === 'daily' ? '일일' : '주간' }}
                  {{ trade.scope === 'account' ? '(계정)' : '(캐릭터)' }}
                  {{ trade.maxExchanges }}회
                </span>
                <button
                  @click="handleToggleTrade(trade.id)"
                  class="px-3 py-1 rounded"
                  :class="isTradeEnabled(trade.id) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
                >
                  {{ isTradeEnabled(trade.id) ? '활성화' : '비활성화' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 