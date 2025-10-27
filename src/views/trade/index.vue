<script setup lang="ts">
import WeeklySummaryTable from './components/WeeklySummaryTable.vue'
import TradeItem from './components/TradeItem.vue'
import Accordion from '@/components/ui/accordion.vue'
import Input from '@/components/ui/input.vue'
import type { TradeData } from '@/data/schemas/trade'
import type { Trade } from '@/data/schemas/trade'
import type { Recipe } from '@/data/schemas/recipe'
import { useItemStore } from '@/stores/item'
import { useNpcStore } from '@/stores/npc'
import { useTradeStore } from '@/stores/trade'
import { locations } from '@/data/locations'
import { recipes } from '@/data/recipes'
import { computed, onMounted, ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import CategoryTitle from '@/components/ui/CategoryTitle.vue'

export interface WeeklyTrade {
  [key: string]: {
    itemId: string;
    totalNeedItemCount: number;
    recipe?: Recipe;
    trade?: Recipe;
    trades: {
      resultItemId: string;
      needItemQuantity: number;
      receiveItemQuantity: number;
    }[];
  }
}

// Types
interface TradeWithState {
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
    const npc = npcStore.enrichedNPCList.find((n) => n.id === trade.npcId)
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
 * # 필요한 아이템 목록
 * - 교환 목록 배열이 들어 있음
 * - 교환의 결과가 다른 교환에 필요한 아이템인 경우 제외
 */
const totalNeedItemList = computed(() => {
  return tradeStore.filterActiveTradeList.reduce((acc, trade) => {
    const needItemId = trade.giveItemId;
    if (tradeStore.filterActiveTradeList.some(target => target.giveItemId === trade.receiveItemId)) {
      return acc;
    }

    if (!acc[needItemId]) {
      acc[needItemId] = [];
    }
    acc[needItemId].push(trade);
    return acc;
  }, {} as { [key: string]: Trade[] });
})

/**
 * # 일주일간 교환하는 데 필요한 아이템 목록
 * - 비활성화 항목 제외
 * - 횟수를 체크해야 함. 일 1회, 주 2회 등등
 */
const weeklyCount = computed(() => {
  return Object.entries(totalNeedItemList.value).reduce((acc, [needItemId, trades]) => {
    const recipe = recipes.find(r => r.resultItemId === needItemId);

    let totalNeedItemCount = 0;
    const tradeList = trades.map((trade: Trade) => {
      const dayTradeCount = trade.type === 'daily' ? trade.maxExchanges : 1;
      const weeklyTradeCount = dayTradeCount * 7;
      const needItemQuantity = trade.giveQuantity * weeklyTradeCount;
      const receiveItemQuantity = trade.receiveQuantity * weeklyTradeCount;
      totalNeedItemCount += needItemQuantity;
      return {
        resultItemId: trade.receiveItemId,
        needItemQuantity,
        receiveItemQuantity,
      }
    })

    if (!acc[needItemId]) {
      acc[needItemId] = {
        itemId: needItemId,
        totalNeedItemCount,
        recipe,
        trade: undefined,
        trades: tradeList,
      }
    } else {
      acc[needItemId].totalNeedItemCount += totalNeedItemCount;
      acc[needItemId].trades.push(...tradeList);
    }

    return acc;
  }, {} as WeeklyTrade);
})

/**
 * # 교환 목록
 * - 즐겨찾기, 비활성화 여부를 포함한 데이터
 * - 즐겨찾기, 활성화, 비활성화 정렬
 */
const formattedTrades = computed(() => {
  const result: Record<string, TradeWithState[]> = {}

  Object.entries(tradeGroupByLocation.value).forEach(([region, trades]) => {
    result[region] = trades
      .map((trade: TradeData) => ({
        ...trade,
        isDisabled: tradeStore.disabledTrades.has(trade.id),
        isFavorite: tradeStore.favoriteTrades.has(trade.id)
      }))
      .sort((a: TradeWithState, b: TradeWithState) => {
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
  const result: Record<string, TradeWithState[]> = {}

  Object.entries(formattedTrades.value).forEach(([region, trades]) => {
    const filtered = trades.filter((trade: TradeWithState) => {
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
    <!-- 2열 레이아웃 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 왼쪽: 교환 목록 -->
      <div>
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
                <div class="grid grid-cols-1 gap-2 px-4">
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

      <!-- 오른쪽: 주간 필요 아이템 요약 테이블 -->
      <div class="lg:sticky lg:top-4 lg:self-start">
        <WeeklySummaryTable :weekly-requirements="weeklyCount" :recipes="recipes" />
      </div>
    </div>
  </div>
</template>

