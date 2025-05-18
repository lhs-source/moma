import { tradeData } from '@/data/trade'
import type { TradeData } from '@/data/schemas/trade'
import type { Item } from '@/data/schemas/item'
import { items } from '@/data/items'

interface WeeklyRequirement {
  itemId: string
  totalQuantity: number
  trades: {
    id: string
    npc: string
    quantity: number
  }[]
}

export function calculateWeeklyRequirements(): WeeklyRequirement[] {
  const requirements: { [key: string]: WeeklyRequirement } = {}

  // 모든 지역의 교환 목록을 순회
  Object.values(tradeData).forEach((trades: TradeData[]) => {
    trades.forEach((trade: TradeData) => {
      // 필요한 아이템의 수량 계산 (일일 제한이 있는 경우 7일치)
      const dailyLimit = trade.limitType === 'daily' ? trade.limitCount : 1
      const weeklyQuantity = dailyLimit * 7

      // 필요한 아이템 정보 추가
      if (!requirements[trade.requiredItemId]) {
        requirements[trade.requiredItemId] = {
          itemId: trade.requiredItemId,
          totalQuantity: 0,
          trades: []
        }
      }

      requirements[trade.requiredItemId].totalQuantity += weeklyQuantity
      requirements[trade.requiredItemId].trades.push({
        id: trade.id,
        npc: trade.npc,
        quantity: weeklyQuantity
      })
    })
  })

  // 결과를 배열로 변환하고 수량 기준으로 정렬
  return Object.values(requirements).sort((a, b) => b.totalQuantity - a.totalQuantity)
}

export function getItemInfo(itemId: string): Item | undefined {
  return items.find((item: Item) => item.id === itemId)
}

export function formatQuantity(quantity: number): string {
  return Number(quantity).toLocaleString()
} 