import { defineStore } from 'pinia'
import { ref } from 'vue'
import { locations } from '@/data/locations'
import { npcs } from '@/data/npcs'
import type { Location } from '@/data/schemas/location'

/**
 * # EnrichedLocation 인터페이스
 * 
 * Location의 기본 정보와 함께 연관 정보를 포함한 확장된 Location 타입
 * NPC 정보를 포함
 */
export interface EnrichedLocation extends Location {
  // NPC 개수
  npcCount: number
  
  // 관련 NPC 목록
  npcs: Array<{
    id: string
    name: string
    description: string
  }>
}

/**
 * # Location Store
 * 
 * Location 데이터를 관리하고 EnrichedLocation로 변환하는 Pinia store
 * NPC 정보를 연관하여 제공
 */
export const useLocationStore = defineStore('location', () => {
  // Location 목록 (EnrichedLocation로 변환됨)
  const enrichedLocationList = ref<EnrichedLocation[]>([])

  /**
   * # Location 목록 초기화
   * 
   * Location 데이터를 EnrichedLocation로 변환하여 저장
   * NPC 정보를 연관하여 포함
   */
  function initializeLocationList(): void {
    enrichedLocationList.value = locations.map(location => {
      // 해당 위치의 NPC 찾기
      const locationNPCs = npcs.filter(npc => npc.locationId === location.id)

      return {
        ...location,
        npcCount: locationNPCs.length,
        npcs: locationNPCs.map(npc => ({
          id: npc.id,
          name: npc.name,
          description: npc.description
        }))
      }
    })
  }

  /**
   * # 필터링된 Location 목록 반환
   * 
   * 검색어에 따라 Location 목록을 필터링
   * 
   * @param filters - 필터 조건
   * @returns 필터링된 Location 목록
   */
  function getFilteredLocations(filters: {
    searchQuery?: string
  }): EnrichedLocation[] {
    let filtered = enrichedLocationList.value

    // 검색어 필터링
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim()
      filtered = filtered.filter(location =>
        location.name.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  return {
    enrichedLocationList,
    initializeLocationList,
    getFilteredLocations
  }
})
