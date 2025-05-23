<script setup lang="ts">
import WeeklyRequirements from '@/components/trade/WeeklyRequirements.vue'
import type { TradeData } from '@/data/schemas/trade'
import { useItemStore } from '@/stores/item'
import { useNpcStore } from '@/stores/npc'
import { useTradeStore } from '@/stores/trade'
import { computed, onMounted } from 'vue'

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

const npcStore = useNpcStore();
const itemStore = useItemStore();
const tradeStore = useTradeStore()

/**
 * # 위치 별 교환 목록
 */
const tradeGroupByLocation = computed(() => {
  const locationTrades: { [key: string]: TradeData[] } = {}

  // Group trades by location
  tradeStore.tradeList.forEach((trade) => {
    const npc = npcStore.npcList.find((n) => n.id === trade.npcId)
    if (!npc) return

    if (!locationTrades[npc.location]) {
      locationTrades[npc.location] = []
    }

    locationTrades[npc.location].push({
      id: trade.id,
      npc: npc.name,
      itemId: trade.receiveItemId,
      itemQuantity: trade.receiveQuantity,
      requiredItemId: trade.giveItemId,
      requiredQuantity: trade.giveQuantity,
      limitType: trade.type,
      limitCount: trade.maxExchanges
    })
  })

  return locationTrades
})

/**
 * # 교환 목록
 * - 즐겨찾기, 비활성화 여부를 포함한 데이터
 * - 즐겨찾기, 활성화, 비활성화 정렬
 */
const formattedTrades = computed(() => {
  const result: Record<string, Trade[]> = {}
  
  Object.entries(tradeGroupByLocation.value).forEach(([region, trades]) => {
    result[region] = trades
      .map((trade: TradeData) => ({
        ...trade,
        isDisabled: tradeStore.disabledTrades.has(trade.id),
        isFavorite: tradeStore.favoriteTrades.has(trade.id)
      }))
      .sort((a: Trade, b: Trade) => {
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

// Lifecycle
onMounted(() => {
  npcStore.fetchNpcList();
  itemStore.fetchItemList();
  tradeStore.fetchTradeList();

  const savedDisabledTrades = localStorage.getItem('disabledTrades')
  if (savedDisabledTrades) {
    tradeStore.disabledTrades = new Set(JSON.parse(savedDisabledTrades))
  }

  const savedFavoriteTrades = localStorage.getItem('favoriteTrades')
  if (savedFavoriteTrades) {
    tradeStore.favoriteTrades = new Set(JSON.parse(savedFavoriteTrades))
  }
})
</script>

<template>
  <div class="container mx-auto p-4">
    <WeeklyRequirements />

    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">교환 목록</h2>
      <div class="grid gap-6">
        <div v-for="(trades, location) in formattedTrades" :key="location" class="bg-card rounded-lg p-2">
          <h3 class="text-xl font-semibold mb-4">{{ location }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div v-for="trade in trades" :key="trade.id" 
              class="flex items-center justify-between p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              :class="{
                'bg-gray-100 dark:bg-gray-800': tradeStore.disabledTrades.has(trade.id),
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': tradeStore.favoriteTrades.has(trade.id)
              }">
              <div class="flex items-center gap-3">
                <button 
                  @click="tradeStore.toggleFavorite(trade.id)"
                  class="text-yellow-500 hover:text-yellow-600 transition-colors"
                  :class="{'opacity-50': !tradeStore.favoriteTrades.has(trade.id)}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
                <img 
                  :src="itemStore.getItemById(trade.itemId)?.imageUrl" 
                  :alt="itemStore.getItemById(trade.itemId)?.name"
                  class="w-10 h-10 object-contain"
                />
                <div>
                  <h3 class="font-medium" 
                      :class="{
                        'text-muted-foreground': tradeStore.disabledTrades.has(trade.id),
                        'font-bold': tradeStore.favoriteTrades.has(trade.id)
                      }">
                    {{ itemStore.getItemById(trade.itemId)?.name }} {{ trade.itemQuantity }}개
                  </h3>
                  <p class="text-sm text-muted-foreground"
                     :class="{'font-semibold': tradeStore.favoriteTrades.has(trade.id)}">
                    {{ trade.npc }} ({{ npcStore.getNpcByName(trade.npc)?.description }})<br>
                    <span class="flex items-center gap-1">
                      <img 
                        :src="itemStore.getItemById(trade.requiredItemId)?.imageUrl" 
                        :alt="itemStore.getItemById(trade.requiredItemId)?.name"
                        class="w-4 h-4 object-contain"
                      />
                      {{ itemStore.getItemById(trade.requiredItemId)?.name }} {{ trade.requiredQuantity }}개
                    </span>
                    <span v-if="trade.limitType" class="ml-1">
                      ({{ getLimitText(trade) }})
                    </span>
                  </p>
                </div>
              </div>
              <button 
                @click="tradeStore.toggleTrade(trade.id)"
                class="px-3 py-1.5 rounded-full text-sm transition-colors"
                :class="tradeStore.disabledTrades.has(trade.id) ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-primary hover:bg-primary/90 text-primary-foreground'"
              >
                {{ tradeStore.disabledTrades.has(trade.id) ? '비활성화' : '활성화' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 