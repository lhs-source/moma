import type { NPC, Item, Trade } from '../data/schemas'
import { npcLocations, barterData, barterItems } from '../data/trade'

// NPC 데이터 변환
export const transformNPCs = (): NPC[] => {
  const npcs: NPC[] = []
  const uniqueNPCs = new Set<string>()

  // 모든 지역의 NPC 데이터를 순회
  Object.values(barterData).forEach(locationTrades => {
    locationTrades.forEach(trade => {
      if (!uniqueNPCs.has(trade.npc)) {
        uniqueNPCs.add(trade.npc)
        npcs.push({
          id: `npc_${trade.npc}`,
          name: trade.npc,
          location: npcLocations[trade.npc] || '알 수 없음',
          imageUrl: `/images/npcs/${trade.npc}.png`
        })
      }
    })
  })

  return npcs
}

// 아이템 데이터 변환
export const transformItems = (): Item[] => {
  // barterItems를 직접 변환
  return barterItems.map(item => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    description: item.description,
    isCraftable: false, // 기본값, 나중에 제작 레시피 데이터가 있으면 업데이트
    category: item.category
  }))
}

// 교환 데이터 변환
export const transformTrades = (): Trade[] => {
  const trades: Trade[] = []

  Object.entries(barterData).forEach(([location, locationTrades]) => {
    locationTrades.forEach(trade => {
      const type = trade.limitType === 'daily' ? 'daily' : 'weekly'
      const scope = trade.limitType === 'account' ? 'account' : 'character'
      const maxExchanges = trade.limitCount

      trades.push({
        id: trade.id,
        npcId: `npc_${trade.npc}`,
        giveItemId: trade.requiredItemId,
        receiveItemId: trade.itemId,
        giveQuantity: trade.requiredQuantity,
        receiveQuantity: trade.itemQuantity,
        type,
        scope,
        maxExchanges,
        isEnabled: true
      })
    })
  })

  return trades
} 