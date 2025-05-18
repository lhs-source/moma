<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { items, tradeData } from '@/data/trade'
import { npcs } from '@/data/npcs'
import type { TradeData } from '@/data/schemas/trade'
import type { Item } from '@/data/schemas/item'
import type { NPC } from '@/data/schemas/npc'
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
  isFavorite?: boolean
}

// State
const disabledTrades = ref<Set<string>>(new Set())
const favoriteTrades = ref<Set<string>>(new Set())

// Computed
const formattedTrades = computed(() => {
  const result: Record<string, Trade[]> = {}
  
  Object.entries(tradeData).forEach(([region, trades]) => {
    result[region] = trades
      .map(trade => ({
        ...trade,
        isDisabled: disabledTrades.value.has(trade.id),
        isFavorite: favoriteTrades.value.has(trade.id)
      }))
      .sort((a, b) => {
        // 즐겨찾기 항목을 가장 앞으로, 비활성화된 항목을 뒤로 정렬
        if (a.isFavorite && !b.isFavorite) return -1
        if (!a.isFavorite && b.isFavorite) return 1
        if (a.isDisabled && !b.isDisabled) return 1
        if (!a.isDisabled && b.isDisabled) return -1
        return 0
      })
  })
  
  return result
})

// Methods
const getItemInfo = (itemId: string): Item | undefined => {
  return items.find(item => item.id === itemId)
}

function getLimitText(trade: Trade) {
  switch (trade.limitType) {
    case 'daily':
      return `일 ${trade.limitCount}회`
    case 'account':
      return '계정당 1회'
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

function toggleFavorite(tradeId: string) {
  if (favoriteTrades.value.has(tradeId)) {
    favoriteTrades.value.delete(tradeId)
  } else {
    favoriteTrades.value.add(tradeId)
  }
  saveFavoriteTrades()
}

function saveDisabledTrades() {
  localStorage.setItem('disabledTrades', JSON.stringify([...disabledTrades.value]))
}

function saveFavoriteTrades() {
  localStorage.setItem('favoriteTrades', JSON.stringify([...favoriteTrades.value]))
}

const getTradesByLocation = (location: string): TradeData[] => {
  return tradeData[location] || []
}

const getNpcLocation = (npcName: string): string => {
  const npc = npcs.find(n => n.name === npcName)
  return npc?.description || ''
}

// Lifecycle
onMounted(() => {
  const savedDisabledTrades = localStorage.getItem('disabledTrades')
  if (savedDisabledTrades) {
    disabledTrades.value = new Set(JSON.parse(savedDisabledTrades))
  }

  const savedFavoriteTrades = localStorage.getItem('favoriteTrades')
  if (savedFavoriteTrades) {
    favoriteTrades.value = new Set(JSON.parse(savedFavoriteTrades))
  }
})
</script>

<template>
  <div class="container mx-auto p-4">
    <WeeklyRequirements :disabled-trades="disabledTrades" />
    
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">교환 목록</h2>
      <div class="grid gap-6">
        <div v-for="(trades, location) in formattedTrades" :key="location" class="bg-card rounded-lg p-2">
          <h3 class="text-xl font-semibold mb-4">{{ location }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div v-for="trade in trades" :key="trade.id" 
              class="flex items-center justify-between p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              :class="{
                'bg-gray-100 dark:bg-gray-800': disabledTrades.has(trade.id),
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': favoriteTrades.has(trade.id)
              }">
              <div class="flex items-center gap-3">
                <button 
                  @click="toggleFavorite(trade.id)"
                  class="text-yellow-500 hover:text-yellow-600 transition-colors"
                  :class="{'opacity-50': !favoriteTrades.has(trade.id)}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
                <img 
                  :src="getItemInfo(trade.itemId)?.imageUrl" 
                  :alt="getItemInfo(trade.itemId)?.name"
                  class="w-10 h-10 object-contain"
                />
                <div>
                  <h3 class="font-medium" 
                      :class="{
                        'text-muted-foreground': disabledTrades.has(trade.id),
                        'font-bold': favoriteTrades.has(trade.id)
                      }">
                    {{ getItemInfo(trade.itemId)?.name }} {{ trade.itemQuantity }}개
                  </h3>
                  <p class="text-sm text-muted-foreground"
                     :class="{'font-semibold': favoriteTrades.has(trade.id)}">
                    {{ trade.npc }} ({{ getNpcLocation(trade.npc) }})<br>
                    <span class="flex items-center gap-1">
                      <img 
                        :src="getItemInfo(trade.requiredItemId)?.imageUrl" 
                        :alt="getItemInfo(trade.requiredItemId)?.name"
                        class="w-4 h-4 object-contain"
                      />
                      {{ getItemInfo(trade.requiredItemId)?.name }} {{ trade.requiredQuantity }}개
                    </span>
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