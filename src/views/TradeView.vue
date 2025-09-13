<script setup lang="ts">
import WeeklyRequirements from '@/components/trade/WeeklyRequirements.vue'
import TradeItem from '@/components/trade/TradeItem.vue'
import type { TradeData } from '@/data/schemas/trade'
import { useItemStore } from '@/stores/item'
import { useNpcStore } from '@/stores/npc'
import { useTradeStore } from '@/stores/trade'
import { locations } from '@/data/locations'
import { computed, onMounted } from 'vue'

// Types
interface Trade {
  id: string
  npc: string
  itemId: string
  itemQuantity: number
  requiredItemId: string
  requiredQuantity: number
  limitType: 'daily' | 'weekly' | 'account' | 'none' | 'unlimited'
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

    const location = locations.find((l) => l.id === npc.locationId)
    if (!location) return

    if (!locationTrades[location.name]) {
      locationTrades[location.name] = []
    }

    locationTrades[location.name].push({
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
            <TradeItem v-for="trade in trades" :key="trade.id" :trade="trade" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>