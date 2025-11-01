import { defineStore } from 'pinia'
import { ref } from 'vue'
import { purchaseData } from '@/data/purchase'
import { npcs } from '@/data/npcs'
import { items } from '@/data/items'
import type { PurchaseItem } from '@/data/schemas/purchase'

/**
 * # EnrichedPurchaseItem 인터페이스
 * 
 * 구매 정보의 기본 정보와 함께 연관 정보를 포함한 확장된 구매 아이템 타입
 * NPC 정보와 아이템 정보를 포함
 */
export interface EnrichedPurchaseItem {
  // 기본 구매 정보
  itemId: string
  itemName: string
  price: number
  isCollectible: boolean
  
  // NPC 정보
  npcId: string
  npcName: string
  locationName: string
  
  // 아이템 정보
  imageUrl?: string
}

/**
 * # Purchase Store
 * 
 * 구매 정보 데이터를 관리하고 EnrichedPurchaseItem으로 변환하는 Pinia store
 * NPC 정보와 아이템 정보를 연관하여 제공
 */
export const usePurchaseStore = defineStore('purchase', () => {
  // 구매 정보 목록 (EnrichedPurchaseItem로 변환됨)
  const enrichedPurchaseList = ref<EnrichedPurchaseItem[]>([])

  /**
   * # 구매 정보 목록 초기화
   * 
   * 구매 정보 데이터를 EnrichedPurchaseItem으로 변환하여 저장
   * NPC 정보와 아이템 정보를 연관하여 포함
   */
  function initializePurchaseList(): void {
    const enrichedItems: EnrichedPurchaseItem[] = []

    // 각 NPC의 구매 정보를 처리
    purchaseData.npcs.forEach(npcPurchase => {
      // NPC 정보 찾기
      const npc = npcs.find(n => n.id === npcPurchase.npcId)
      const npcName = npc?.name || npcPurchase.npcId

      // 각 아이템 처리
      npcPurchase.items.forEach(purchaseItem => {
        // 아이템 정보 찾기
        const item = items.find(i => i.id === purchaseItem.itemId)
        const itemName = item?.name || purchaseItem.itemId
        const imageUrl = item?.imageUrl

        enrichedItems.push({
          itemId: purchaseItem.itemId,
          itemName,
          price: purchaseItem.price,
          isCollectible: purchaseItem.isCollectible,
          npcId: npcPurchase.npcId,
          npcName,
          locationName: npcPurchase.locationName,
          imageUrl
        })
      })
    })

    enrichedPurchaseList.value = enrichedItems
  }

  /**
   * # 필터링된 구매 정보 목록 반환
   * 
   * 검색어와 필터 조건에 따라 구매 정보 목록을 필터링
   * 
   * @param filters - 필터 조건
   * @returns 필터링된 구매 정보 목록
   */
  function getFilteredPurchases(filters: {
    searchQuery?: string
    npcId?: string
    collectibleOnly?: boolean
  }): EnrichedPurchaseItem[] {
    let filtered = enrichedPurchaseList.value

    // 검색어 필터링 (아이템명)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim()
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(query)
      )
    }

    // NPC 필터링
    if (filters.npcId) {
      filtered = filtered.filter(item => item.npcId === filters.npcId)
    }

    // 채집 가능 아이템만 필터링
    if (filters.collectibleOnly) {
      filtered = filtered.filter(item => item.isCollectible)
    }

    return filtered
  }

  /**
   * # 고유 NPC 목록 반환
   * 
   * 필터링에 사용할 수 있는 고유 NPC 목록을 반환
   */
  function getUniqueNPCs(): Array<{ id: string; name: string }> {
    const npcMap = new Map<string, string>()
    
    enrichedPurchaseList.value.forEach(item => {
      npcMap.set(item.npcId, item.npcName)
    })

    return Array.from(npcMap.entries()).map(([id, name]) => ({ id, name }))
  }

  return {
    enrichedPurchaseList,
    initializePurchaseList,
    getFilteredPurchases,
    getUniqueNPCs
  }
})
