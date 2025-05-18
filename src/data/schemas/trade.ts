export type TradeType = 'daily' | 'weekly'
export type TradeScope = 'character' | 'account'

export interface TradeData {
  id: string
  npc: string
  itemId: string
  itemQuantity: number
  requiredItemId: string
  requiredQuantity: number
  limitType: 'daily' | 'account' | 'none'
  limitCount: number
}

export interface Trade {
  id: string
  npcId: string
  giveItemId: string // 주는 아이템 ID
  receiveItemId: string // 받는 아이템 ID
  giveQuantity: number // 주는 아이템 개수
  receiveQuantity: number // 받는 아이템 개수
  type: 'daily' | 'account' | 'none'
  scope: 'character' | 'account'
  maxExchanges: number // 최대 교환 가능 횟수
  resetDay?: number // 주간 교환의 경우 리셋 요일 (0: 일요일, 1: 월요일, ...)
  isEnabled: boolean // 사용자가 활성화/비활성화한 상태
  lastReset?: Date // 마지막 리셋 시간
} 