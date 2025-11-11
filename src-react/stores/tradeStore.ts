import { create } from 'zustand'
import type { StateCreator } from 'zustand'

import type { Trade } from '../../src/data/schemas/trade'
import { trades as tradeData } from '../../src/data/trade'

export interface TradeWithState extends Trade {
  isDisabled?: boolean
  isFavorite?: boolean
}

export interface TradeStoreState {
  tradeList: Trade[]
  disabledTrades: Set<string>
  favoriteTrades: Set<string>
  disabledLocations: Set<string>
  fetchTradeList: () => void
  loadFromStorage: () => void
  getTradeById: (id: string) => Trade | undefined
  toggleTrade: (tradeId: string) => void
  toggleFavorite: (tradeId: string) => void
  toggleLocation: (locationName: string, tradeIds: string[]) => void
}

const STORAGE_KEYS = {
  disabledTrades: 'disabledTrades',
  favoriteTrades: 'favoriteTrades',
  disabledLocations: 'disabledLocations',
} as const

function loadSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set<string>()
  const raw = window.localStorage.getItem(key)
  if (!raw) return new Set<string>()
  try {
    const parsed: string[] = JSON.parse(raw)
    return new Set(parsed)
  } catch (error) {
    console.warn(`Failed to parse storage key ${key}`, error)
    return new Set<string>()
  }
}

function persistSet(key: string, value: Set<string>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(Array.from(value)))
}

const createTradeStore: StateCreator<TradeStoreState> = (set, get) => ({
  tradeList: [],
  disabledTrades: new Set<string>(),
  favoriteTrades: new Set<string>(),
  disabledLocations: new Set<string>(),
  fetchTradeList: () => {
    set({ tradeList: tradeData })
  },
  loadFromStorage: () => {
    const disabledTrades = loadSet(STORAGE_KEYS.disabledTrades)
    const favoriteTrades = loadSet(STORAGE_KEYS.favoriteTrades)
    const disabledLocations = loadSet(STORAGE_KEYS.disabledLocations)
    set({
      tradeList: tradeData,
      disabledTrades,
      favoriteTrades,
      disabledLocations,
    })
  },
  getTradeById: (id: string) => {
    const { tradeList } = get()
    return tradeList.find((trade) => trade.id === id)
  },
  toggleTrade: (tradeId: string) => {
    set((state) => {
      const nextDisabledTrades = new Set<string>(state.disabledTrades)
      if (nextDisabledTrades.has(tradeId)) {
        nextDisabledTrades.delete(tradeId)
      } else {
        nextDisabledTrades.add(tradeId)
      }
      persistSet(STORAGE_KEYS.disabledTrades, nextDisabledTrades)
      return {
        disabledTrades: nextDisabledTrades,
      }
    })
  },
  toggleFavorite: (tradeId: string) => {
    set((state) => {
      const nextFavoriteTrades = new Set<string>(state.favoriteTrades)
      if (nextFavoriteTrades.has(tradeId)) {
        nextFavoriteTrades.delete(tradeId)
      } else {
        nextFavoriteTrades.add(tradeId)
      }
      persistSet(STORAGE_KEYS.favoriteTrades, nextFavoriteTrades)
      return {
        favoriteTrades: nextFavoriteTrades,
      }
    })
  },
  toggleLocation: (locationName: string, tradeIds: string[]) => {
    set((state) => {
      const nextDisabledLocations = new Set<string>(state.disabledLocations)
      const nextDisabledTrades = new Set<string>(state.disabledTrades)
      const isCurrentlyDisabled = nextDisabledLocations.has(locationName)

      if (isCurrentlyDisabled) {
        nextDisabledLocations.delete(locationName)
        tradeIds.forEach((id) => nextDisabledTrades.delete(id))
      } else {
        nextDisabledLocations.add(locationName)
        tradeIds.forEach((id) => nextDisabledTrades.add(id))
      }

      persistSet(STORAGE_KEYS.disabledLocations, nextDisabledLocations)
      persistSet(STORAGE_KEYS.disabledTrades, nextDisabledTrades)

      return {
        disabledLocations: nextDisabledLocations,
        disabledTrades: nextDisabledTrades,
      }
    })
  },
})

export const useTradeStore = create<TradeStoreState>(createTradeStore)

export const selectTradeList = (state: TradeStoreState) => state.tradeList

export const selectActiveTrades = (state: TradeStoreState) =>
  state.tradeList.filter((trade) => !state.disabledTrades.has(trade.id))

export const selectTradeState = (state: TradeStoreState) => ({
  tradeList: state.tradeList,
  disabledTrades: state.disabledTrades,
  favoriteTrades: state.favoriteTrades,
  disabledLocations: state.disabledLocations,
})

