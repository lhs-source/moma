import type { NPC, Item, Trade } from '../data/schemas'
import { npcLocations, barterData } from '../data/trade'

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
  const items: Item[] = []
  const uniqueItems = new Set<string>()

  // 모든 교환 데이터에서 아이템 추출
  Object.values(barterData).forEach(locationTrades => {
    locationTrades.forEach(trade => {
      const giveItem = trade.required.split(' x')[0]
      const receiveItem = trade.item.split(' x')[0]

      if (!uniqueItems.has(giveItem)) {
        uniqueItems.add(giveItem)
        items.push({
          id: `item_${giveItem}`,
          name: giveItem,
          imageUrl: `/images/items/${giveItem}.png`,
          isCraftable: false, // 기본값, 나중에 제작 레시피 데이터가 있으면 업데이트
          category: '재료'
        })
      }

      if (!uniqueItems.has(receiveItem)) {
        uniqueItems.add(receiveItem)
        items.push({
          id: `item_${receiveItem}`,
          name: receiveItem,
          imageUrl: `/images/items/${receiveItem}.png`,
          isCraftable: false,
          category: '완성품'
        })
      }
    })
  })

  return items
}

// 교환 데이터 변환
export const transformTrades = (): Trade[] => {
  const trades: Trade[] = []
  let tradeId = 1

  Object.entries(barterData).forEach(([location, locationTrades]) => {
    locationTrades.forEach(trade => {
      const [giveItem, giveQuantity] = trade.required.split(' x')
      const [receiveItem, receiveQuantity] = trade.item.split(' x')
      const limit = trade.limit || ''

      const type = limit.includes('주') ? 'weekly' : 'daily'
      const scope = limit.includes('계정') ? 'account' : 'character'
      const maxExchanges = parseInt(limit.match(/\d+/)?.[0] || '1')

      trades.push({
        id: `trade_${tradeId++}`,
        npcId: `npc_${trade.npc}`,
        giveItemId: `item_${giveItem}`,
        receiveItemId: `item_${receiveItem}`,
        giveQuantity: parseInt(giveQuantity),
        receiveQuantity: parseInt(receiveQuantity),
        type,
        scope,
        maxExchanges,
        isEnabled: true
      })
    })
  })

  return trades
} 