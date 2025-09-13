<script setup lang="ts">
import { useItemStore } from '@/stores/item'
import { useNpcStore } from '@/stores/npc'
import { useTradeStore } from '@/stores/trade'

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

interface Props {
  trade: Trade
}

const props = withDefaults(defineProps<Props>(), {})

const itemStore = useItemStore()
const npcStore = useNpcStore()
const tradeStore = useTradeStore()

function getLimitText(trade: Trade) {
  switch (trade.limitType) {
    case 'daily':
      return `일 ${trade.limitCount}회`
    case 'weekly':
      return `주 ${trade.limitCount}회`
    case 'account':
      return '계정당 1회'
    case 'unlimited':
      return '제한 없음'
    default:
      return '제한 없음'
  }
}
</script>

<template>
  <div
    class="flex items-center justify-between p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
    :class="{
      'bg-slate-50 dark:bg-slate-400/50 border-slate-200 dark:border-slate-500': tradeStore.disabledTrades.has(trade.id),
      'bg-green-50 dark:bg-green-500/20 border-green-200 dark:border-green-800': tradeStore.favoriteTrades.has(trade.id)
    }">
    <div class="flex items-center gap-3">
      <button @click="tradeStore.toggleFavorite(trade.id)"
        class="text-yellow-500 hover:text-yellow-600 transition-colors"
        :class="{ 'opacity-50': !tradeStore.favoriteTrades.has(trade.id) }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
      <img :src="itemStore.getItemById(trade.itemId)?.imageUrl" :alt="itemStore.getItemById(trade.itemId)?.name"
        class="w-10 h-10 object-contain" />
      <div>
        <h3 class="font-medium" :class="{
          'text-slate-600 dark:text-slate-500': tradeStore.disabledTrades.has(trade.id),
          'font-bold': tradeStore.favoriteTrades.has(trade.id)
        }">
          {{ itemStore.getItemById(trade.itemId)?.name }} {{ trade.itemQuantity }}개
        </h3>
        <p class="text-sm text-muted-foreground" :class="{ 'font-semibold': tradeStore.favoriteTrades.has(trade.id) }">
          {{ trade.npc }} ({{ npcStore.getNpcByName(trade.npc)?.description }})<br>
          <span class="flex items-center gap-1">
            <img :src="itemStore.getItemById(trade.requiredItemId)?.imageUrl"
              :alt="itemStore.getItemById(trade.requiredItemId)?.name" class="w-4 h-4 object-contain" />
            {{ itemStore.getItemById(trade.requiredItemId)?.name }} {{ trade.requiredQuantity }}개
          </span>
          <span v-if="trade.limitType" class="ml-1">
            ({{ getLimitText(trade) }})
          </span>
        </p>
      </div>
    </div>
    <button @click="tradeStore.toggleTrade(trade.id)" class="px-3 py-1.5 rounded-full text-sm transition-colors"
      :class="tradeStore.disabledTrades.has(trade.id) ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300' : 'bg-primary hover:bg-primary/90 text-primary-foreground'">
      {{ tradeStore.disabledTrades.has(trade.id) ? '비활성화' : '활성화' }}
    </button>
  </div>
</template>
