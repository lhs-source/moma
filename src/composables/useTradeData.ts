import { computed } from 'vue'
import { trades } from '@/data/trade'
import { npcs } from '@/data/npcs'
import type { TradeData } from '@/data/schemas/trade'

export function useTradeData() {
  const tradeData = computed(() => {
    const locationTrades: { [key: string]: TradeData[] } = {}

    // Group trades by location
    trades.forEach((trade) => {
      const npc = npcs.find((n) => n.id === trade.npcId)
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

  return {
    tradeData
  }
} 