import type { Trade } from '@/data/schemas/trade'
import { trades } from '@/data/trade'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTradeStore = defineStore('trade', () => {
  // State
  const tradeList = ref<Trade[]>([])
  const disabledTrades = ref<Set<string>>(new Set())
  const favoriteTrades = ref<Set<string>>(new Set())

  // Getters
  const filterActiveTradeList = computed(() => {
    return tradeList.value.filter(trade => !disabledTrades.value.has(trade.id))
  })

  // Actions
  function fetchTradeList() {
    tradeList.value = trades
  }

  function getTradeById(id: string): Trade | undefined {
    return tradeList.value.find((trade) => trade.id === id)
  }
  
  function saveDisabledTrades() {
    localStorage.setItem('disabledTrades', JSON.stringify([...disabledTrades.value]))
  }
  
  function saveFavoriteTrades() {
    localStorage.setItem('favoriteTrades', JSON.stringify([...favoriteTrades.value]))
  }
  
  function toggleTrade(tradeId: string) {
    if (disabledTrades.value.has(tradeId)) {
      disabledTrades.value.delete(tradeId)
    } else {
      disabledTrades.value.add(tradeId)
    }
    saveDisabledTrades()
  }
  
  function toggleFavorite(tradeId: string) {
    if (favoriteTrades.value.has(tradeId)) {
      favoriteTrades.value.delete(tradeId)
    } else {
      favoriteTrades.value.add(tradeId)
    }
    saveFavoriteTrades()
  }

  function loadFromLocalStorage() {
    const savedDisabledTrades = localStorage.getItem('disabledTrades')
    if (savedDisabledTrades) {
      disabledTrades.value = new Set(JSON.parse(savedDisabledTrades))
    }

    const savedFavoriteTrades = localStorage.getItem('favoriteTrades')
    if (savedFavoriteTrades) {
      favoriteTrades.value = new Set(JSON.parse(savedFavoriteTrades))
    }
  }

  return {
    // State
    tradeList,
    disabledTrades,
    favoriteTrades,
    
    // Getters
    filterActiveTradeList,
    
    // Actions
    fetchTradeList,
    getTradeById,
    toggleTrade,
    toggleFavorite,
    loadFromLocalStorage
  }
})
