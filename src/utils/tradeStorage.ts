import type { Trade } from '../data/schemas/trade'

const STORAGE_KEY = 'mabinogi_mobile_trade_settings'
const COMPLETION_KEY = 'mabinogi_mobile_trade_completion'

interface TradeSettings {
  enabledTrades: string[] // 활성화된 trade ID 목록
  lastUpdated: string
}

interface TradeCompletion {
  [tradeId: string]: {
    lastCompleted: string // ISO 날짜 문자열
    count: number // 완료 횟수
  }
}

export const getTradeSettings = (): TradeSettings => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  return {
    enabledTrades: [],
    lastUpdated: new Date().toISOString()
  }
}

export const saveTradeSettings = (settings: TradeSettings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export const toggleTrade = (tradeId: string) => {
  const settings = getTradeSettings()
  const index = settings.enabledTrades.indexOf(tradeId)
  
  if (index === -1) {
    settings.enabledTrades.push(tradeId)
  } else {
    settings.enabledTrades.splice(index, 1)
  }
  
  settings.lastUpdated = new Date().toISOString()
  saveTradeSettings(settings)
}

export const isTradeEnabled = (tradeId: string): boolean => {
  const settings = getTradeSettings()
  return settings.enabledTrades.includes(tradeId)
}

// 교환 완료 상태 관리
export const getTradeCompletion = (): TradeCompletion => {
  const stored = localStorage.getItem(COMPLETION_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  return {}
}

export const saveTradeCompletion = (completion: TradeCompletion) => {
  localStorage.setItem(COMPLETION_KEY, JSON.stringify(completion))
}

export const toggleTradeCompletion = (tradeId: string, trade: Trade) => {
  const completion = getTradeCompletion()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

  if (!completion[tradeId]) {
    completion[tradeId] = {
      lastCompleted: today,
      count: 1
    }
  } else {
    const lastCompleted = new Date(completion[tradeId].lastCompleted)
    const isNewDay = lastCompleted.toISOString() !== today

    if (isNewDay) {
      completion[tradeId] = {
        lastCompleted: today,
        count: 1
      }
    } else {
      completion[tradeId].count = (completion[tradeId].count + 1) % (trade.maxExchanges + 1)
      if (completion[tradeId].count === 0) {
        delete completion[tradeId]
      }
    }
  }

  saveTradeCompletion(completion)
}

export const getTradeCompletionStatus = (tradeId: string, trade: Trade): { completed: boolean; count: number } => {
  const completion = getTradeCompletion()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

  if (!completion[tradeId]) {
    return { completed: false, count: 0 }
  }

  const lastCompleted = new Date(completion[tradeId].lastCompleted)
  const isNewDay = lastCompleted.toISOString() !== today

  if (isNewDay) {
    return { completed: false, count: 0 }
  }

  return {
    completed: completion[tradeId].count >= trade.maxExchanges,
    count: completion[tradeId].count
  }
}

// 주간 교환에 필요한 총 아이템 수량 계산
export const calculateWeeklyRequirements = (trades: Trade[], currentDay: number): Map<string, number> => {
  const requirements = new Map<string, number>()
  const completion = getTradeCompletion()
  
  trades.forEach(trade => {
    if (!isTradeEnabled(trade.id)) return
    
    if (trade.type === 'weekly') {
      const remainingDays = 7 - currentDay
      const dailyQuantity = trade.giveQuantity * trade.maxExchanges
      const totalQuantity = dailyQuantity * remainingDays
      
      const currentQuantity = requirements.get(trade.giveItemId) || 0
      requirements.set(trade.giveItemId, currentQuantity + totalQuantity)
    }
  })
  
  return requirements
} 