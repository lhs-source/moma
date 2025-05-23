import type { Trade } from '@/data/schemas/trade';
import { trades } from '@/data/trade';
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';

export const useTradeStore = defineStore('trade', () => {
  const tradeList = ref<Trade[]>([]);
  const disabledTrades = ref<Set<string>>(new Set())
  const favoriteTrades = ref<Set<string>>(new Set())
  /**
   * # 활성화한 거래 리스트
   */
  const filterActiveTradeList = computed(() => {
    return tradeList.value.filter(trade => !disabledTrades.value.has(trade.id))
  })
  /**
   * # 거래 리스트를 파일로부터 가져온다
   */
  function fetchTradeList() {
    tradeList.value = trades;
  }

  /**
   * # 거래 리스트에서 거래를 id로 찾는다
   * @param id
   * @returns
   */
  function getTradeById(id: string): Trade | undefined {
    return tradeList.value.find((trade) => trade.id === id);
  }
  
  /**
   * # 비활성화된 교환 목록을 로컬 스토리지에 저장
   */
  function saveDisabledTrades() {
    localStorage.setItem('disabledTrades', JSON.stringify([...disabledTrades.value]))
  }
  /**
   * # 즐겨찾기 교환 목록을 로컬 스토리지에 저장
   */
  function saveFavoriteTrades() {
    localStorage.setItem('favoriteTrades', JSON.stringify([...favoriteTrades.value]))
  }
  /**
   * # 비활성 여부를 토글
   * @param tradeId 
   */
  function toggleTrade(tradeId: string) {
    if (disabledTrades.value.has(tradeId)) {
      disabledTrades.value.delete(tradeId)
    } else {
      disabledTrades.value.add(tradeId)
    }
    saveDisabledTrades()
  }
  /**
   * # 즐겨찾기 여부를 토글
   * @param tradeId 
   */
  function toggleFavorite(tradeId: string) {
    if (favoriteTrades.value.has(tradeId)) {
      favoriteTrades.value.delete(tradeId)
    } else {
      favoriteTrades.value.add(tradeId)
    }
    saveFavoriteTrades()
  }
  // Lifecycle
  onMounted(() => {
    const savedDisabledTrades = localStorage.getItem('disabledTrades')
    if (savedDisabledTrades) {
      disabledTrades.value = new Set(JSON.parse(savedDisabledTrades))
    }

    const savedFavoriteTrades = localStorage.getItem('favoriteTrades')
    if (savedFavoriteTrades) {
      favoriteTrades.value = new Set(JSON.parse(savedFavoriteTrades))
    }
  })

  return {
    tradeList,
    filterActiveTradeList,
    fetchTradeList,
    getTradeById,
    disabledTrades,
    favoriteTrades,
    toggleTrade,
    toggleFavorite,
  }
})
