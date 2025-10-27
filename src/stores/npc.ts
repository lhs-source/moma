import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { npcs } from '@/data/npcs'
import { locations } from '@/data/locations'
import { trades } from '@/data/trade'
import { items } from '@/data/items'
import type { NPC } from '@/data/schemas/npc'
import type { Location } from '@/data/schemas/location'

/**
 * # EnrichedNPC 인터페이스
 * 
 * NPC의 기본 정보와 함께 연관 정보를 포함한 확장된 NPC 타입
 * 물물교환 정보와 위치 정보를 포함
 */
export interface EnrichedNPC extends NPC {
  // 위치 정보
  location: Location
  
  // 물물교환 가능 아이템 목록
  availableTrades: Array<{
    tradeId: string
    giveItemName: string
    receiveItemName: string
    giveQuantity: number
    receiveQuantity: number
    type: string
    maxExchanges: number
  }>
  
  // 물물교환 가능 아이템 개수
  tradeCount: number
}

/**
 * # NPC Store
 * 
 * NPC 데이터를 관리하고 EnrichedNPC로 변환하는 Pinia store
 * 물물교환 정보와 위치 정보를 연관하여 제공
 */
export const useNpcStore = defineStore('npc', () => {
  // NPC 목록 (EnrichedNPC로 변환됨)
  const enrichedNPCList = ref<EnrichedNPC[]>([])

  /**
   * # NPC 목록 초기화
   * 
   * NPC 데이터를 EnrichedNPC로 변환하여 저장
   * 물물교환 정보와 위치 정보를 연관하여 포함
   */
  function initializeNPCList(): void {
    enrichedNPCList.value = npcs.map(npc => {
      // 위치 정보 찾기
      const location = locations.find(loc => loc.id === npc.locationId)
      if (!location) {
        console.warn(`Location not found for NPC ${npc.name} (${npc.locationId})`)
      }

      // 물물교환 정보 찾기
      const npcTrades = trades.filter(trade => trade.npcId === npc.id)
      
      // 아이템 ID를 이름으로 변환하는 헬퍼 함수
      function getItemName(itemId: string): string {
        const item = items.find(i => i.id === itemId)
        return item?.name || itemId
      }
      
      const availableTrades = npcTrades.map(trade => ({
        tradeId: trade.id,
        giveItemName: getItemName(trade.giveItemId),
        receiveItemName: getItemName(trade.receiveItemId),
        giveQuantity: trade.giveQuantity,
        receiveQuantity: trade.receiveQuantity,
        type: trade.type,
        maxExchanges: trade.maxExchanges
      }))

      return {
        ...npc,
        location: location || { id: '', name: '알 수 없음', description: '', imageUrl: '' },
        availableTrades,
        tradeCount: availableTrades.length
      }
    })
  }

  /**
   * # 필터링된 NPC 목록 반환
   * 
   * 검색어와 필터 조건에 따라 NPC 목록을 필터링
   * 
   * @param filters - 필터 조건
   * @returns 필터링된 NPC 목록
   */
  function getFilteredNPCs(filters: {
    searchQuery?: string
    locationId?: string
    hasTrades?: boolean
  }): EnrichedNPC[] {
    let filtered = enrichedNPCList.value

    // 검색어 필터
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(npc => 
        npc.name.toLowerCase().includes(query) ||
        npc.description.toLowerCase().includes(query) ||
        npc.location.name.toLowerCase().includes(query)
      )
    }

    // 위치 필터
    if (filters.locationId) {
      filtered = filtered.filter(npc => npc.locationId === filters.locationId)
    }

    // 물물교환 가능 여부 필터
    if (filters.hasTrades !== undefined) {
      filtered = filtered.filter(npc => 
        filters.hasTrades ? npc.tradeCount > 0 : npc.tradeCount === 0
      )
    }

    return filtered
  }

  /**
   * # 위치별 NPC 개수
   * 
   * 각 위치별로 몇 개의 NPC가 있는지 계산
   */
  const locationCounts = computed(() => {
    const counts: Record<string, number> = {}
    
    enrichedNPCList.value.forEach(npc => {
      const locationId = npc.locationId
      counts[locationId] = (counts[locationId] || 0) + 1
    })

    return counts
  })

  /**
   * # 고유 위치 목록
   * 
   * NPC가 있는 모든 위치의 목록
   */
  const uniqueLocations = computed(() => {
    const locationIds = new Set(enrichedNPCList.value.map(npc => npc.locationId))
    return locations.filter(location => locationIds.has(location.id))
  })

  /**
   * # NPC 목록 가져오기
   * 
   * NPC 목록을 초기화하고 반환
   * 다른 store들과의 일관성을 위해 제공
   */
  function fetchNpcList(): void {
    initializeNPCList()
  }

  // 초기화 실행
  initializeNPCList()

  return {
    enrichedNPCList: computed(() => enrichedNPCList.value),
    getFilteredNPCs,
    locationCounts,
    uniqueLocations,
    fetchNpcList
  }
})