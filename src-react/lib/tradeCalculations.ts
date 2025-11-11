import type { Trade, TradeType } from '../../src/data/schemas/trade'
import type { Recipe } from '../../src/data/schemas/recipe'
import { getLocationById, getNpcById } from './dataAccess'

export interface TradeListItem {
  id: string
  npcId: string
  npcName: string
  itemId: string
  itemQuantity: number
  requiredItemId: string
  requiredQuantity: number
  limitType: TradeType
  limitCount: number
}

export interface WeeklyTradeItem {
  itemId: string
  totalNeedItemCount: number
  recipe?: Recipe
  trade?: Recipe
  trades: Array<{
    resultItemId: string
    needItemQuantity: number
    receiveItemQuantity: number
  }>
}

export type WeeklyTrade = Record<string, WeeklyTradeItem>

export function groupTradesByLocation(tradeList: Trade[]): Record<string, TradeListItem[]> {
  const grouped: Record<string, TradeListItem[]> = {}

  tradeList.forEach((trade) => {
    const npc = getNpcById(trade.npcId)
    if (!npc) return

    const location = getLocationById(npc.locationId)
    const locationName = location?.name ?? '미확인 지역'

    if (!grouped[locationName]) {
      grouped[locationName] = []
    }

    grouped[locationName].push({
      id: trade.id,
      npcId: trade.npcId,
      npcName: npc.name,
      itemId: trade.receiveItemId,
      itemQuantity: trade.receiveQuantity,
      requiredItemId: trade.giveItemId,
      requiredQuantity: trade.giveQuantity,
      limitType: trade.type,
      limitCount: trade.maxExchanges,
    })
  })

  return grouped
}

export function sortTrades(
  tradesByLocation: Record<string, TradeListItem[]>,
  disabledTrades: Set<string>,
  favoriteTrades: Set<string>,
) {
  const sorted: Record<string, TradeListItem[]> = {}

  Object.entries(tradesByLocation).forEach(([location, trades]) => {
    sorted[location] = [...trades].sort((a, b) => {
      const aFavorite = favoriteTrades.has(a.id)
      const bFavorite = favoriteTrades.has(b.id)
      if (aFavorite && !bFavorite) return -1
      if (!aFavorite && bFavorite) return 1

      const aDisabled = disabledTrades.has(a.id)
      const bDisabled = disabledTrades.has(b.id)
      if (aDisabled && !bDisabled) return 1
      if (!aDisabled && bDisabled) return -1

      return 0
    })
  })

  return sorted
}

export function filterTradesBySearch(
  tradesByLocation: Record<string, TradeListItem[]>,
  query: string,
  itemLookup: (itemId: string) => string | undefined,
) {
  if (!query.trim()) return tradesByLocation

  const lowered = query.trim().toLowerCase()
  const filtered: Record<string, TradeListItem[]> = {}

  Object.entries(tradesByLocation).forEach(([location, trades]) => {
    const matches = trades.filter((trade) => {
      const itemName = itemLookup(trade.itemId)
      return itemName?.toLowerCase().includes(lowered)
    })

    if (matches.length) {
      filtered[location] = matches
    }
  })

  return filtered
}

export function computeActiveTrades(tradeList: Trade[], disabledTrades: Set<string>) {
  return tradeList.filter((trade) => !disabledTrades.has(trade.id))
}

function computeTotalNeedItemList(activeTrades: Trade[]) {
  return activeTrades.reduce<Record<string, Trade[]>>((acc, trade) => {
    const needItemId = trade.giveItemId
    const isIntermediateItem = activeTrades.some((candidate) => candidate.giveItemId === trade.receiveItemId)

    if (isIntermediateItem) {
      return acc
    }

    if (!acc[needItemId]) {
      acc[needItemId] = []
    }
    acc[needItemId].push(trade)

    return acc
  }, {})
}

export function computeWeeklyRequirements(activeTrades: Trade[], recipes: Recipe[]): WeeklyTrade {
  const totalNeedItemList = computeTotalNeedItemList(activeTrades)

  return Object.entries(totalNeedItemList).reduce<WeeklyTrade>((acc, [needItemId, trades]) => {
    const recipe = recipes.find((candidate) => candidate.resultItemId === needItemId)

    let totalNeedItemCount = 0

    const tradeList = trades.map((trade) => {
      const dayTradeCount = trade.type === 'daily' ? trade.maxExchanges : 1
      const weeklyTradeCount = dayTradeCount * 7

      const needItemQuantity = trade.giveQuantity * weeklyTradeCount
      const receiveItemQuantity = trade.receiveQuantity * weeklyTradeCount

      totalNeedItemCount += needItemQuantity

      return {
        resultItemId: trade.receiveItemId,
        needItemQuantity,
        receiveItemQuantity,
      }
    })

    const existing = acc[needItemId]

    if (!existing) {
      acc[needItemId] = {
        itemId: needItemId,
        totalNeedItemCount,
        recipe,
        trades: tradeList,
      }
    } else {
      existing.totalNeedItemCount += totalNeedItemCount
      existing.trades.push(...tradeList)
    }

    return acc
  }, {})
}

