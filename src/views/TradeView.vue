<script setup lang="ts">
import WeeklyRequirements from '@/components/trade/WeeklyRequirements.vue'
import TradeItem from '@/components/trade/TradeItem.vue'
import Accordion from '@/components/ui/accordion.vue'
import Input from '@/components/ui/input.vue'
import type { TradeData } from '@/data/schemas/trade'
import { useItemStore } from '@/stores/item'
import { useNpcStore } from '@/stores/npc'
import { useTradeStore } from '@/stores/trade'
import { locations } from '@/data/locations'
import { computed, onMounted, ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import CategoryTitle from '@/components/ui/CategoryTitle.vue'

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

// 검색어
const searchQuery = ref('')

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

/**
 * # 검색 필터링된 교환 목록
 * - 교환 결과 아이템 이름으로 검색
 */
const filteredTrades = computed(() => {
  if (!searchQuery.value.trim()) {
    return formattedTrades.value
  }

  const query = searchQuery.value.toLowerCase().trim()
  const result: Record<string, Trade[]> = {}

  Object.entries(formattedTrades.value).forEach(([region, trades]) => {
    const filtered = trades.filter((trade: Trade) => {
      const item = itemStore.itemList.find(i => i.id === trade.itemId)
      return item?.name.toLowerCase().includes(query)
    })

    if (filtered.length > 0) {
      result[region] = filtered
    }
  })

  return result
})


// Lifecycle
onMounted(() => {
  npcStore.fetchNpcList();
  itemStore.fetchItemList();
  tradeStore.fetchTradeList();
  tradeStore.loadFromLocalStorage();
})
</script>

<template>
  <div class="container mx-auto p-4">
    <WeeklyRequirements />

    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <SectionTitle>교환 목록</SectionTitle>
        <div class="w-64">
          <Input v-model="searchQuery" type="text" placeholder="아이템 이름 검색..." class="w-full" />
        </div>
      </div>

      <div class="grid gap-4">
        <div v-for="(trades, location) in filteredTrades" :key="location"
          class="bg-card rounded-lg border border-border">
          <Accordion :default-open="true" class="px-4">
            <template #trigger>
              <div class="flex items-center justify-between flex-1 mr-4">
                <CategoryTitle size="lg">{{ location }}</CategoryTitle>
                <button @click.stop="tradeStore.toggleLocation(location, trades.map(t => t.id))"
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-colors" :class="tradeStore.disabledLocations.has(location)
                    ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'">
                  {{ tradeStore.disabledLocations.has(location) ? '마을 비활성화' : '마을 활성화' }}
                </button>
              </div>
            </template>
            <template #content>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 px-4">
                <TradeItem v-for="trade in trades" :key="trade.id" :trade="trade" />
              </div>
            </template>
          </Accordion>
        </div>
      </div>

      <div v-if="Object.keys(filteredTrades).length === 0" class="text-center py-8 text-muted-foreground">
        검색 결과가 없습니다.
      </div>
    </div>
  </div>
</template>