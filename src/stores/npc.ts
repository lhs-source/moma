import { npcs } from '@/data/npcs'
import type { NPC } from '@/data/schemas/npc'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNpcStore = defineStore('npc', () => {
  // State
  const npcList = ref<NPC[]>([])

  // Getters
  const npcsByLocation = computed(() => {
    const grouped: Record<string, NPC[]> = {}
    
    npcList.value.forEach(npc => {
      const location = npc.locationId || '기타'
      if (!grouped[location]) {
        grouped[location] = []
      }
      grouped[location].push(npc)
    })
    
    return grouped
  })

  const locations = computed(() => {
    const locationSet = new Set<string>()
    npcList.value.forEach(npc => {
      if (npc.locationId) {
        locationSet.add(npc.locationId)
      }
    })
    return Array.from(locationSet).sort()
  })

  // Actions
  function fetchNpcList() {
    npcList.value = npcs
  }

  function getNpcByName(name: string): NPC | undefined {
    return npcList.value.find((npc) => npc.name === name)
  }

  function getNpcById(id: string): NPC | undefined {
    return npcList.value.find((npc) => npc.id === id)
  }

  function searchNpcs(query: string): NPC[] {
    if (!query.trim()) return npcList.value
    
    const lowerQuery = query.toLowerCase()
    return npcList.value.filter(npc => 
      npc.name.toLowerCase().includes(lowerQuery) ||
      npc.locationId?.toLowerCase().includes(lowerQuery) ||
      npc.description?.toLowerCase().includes(lowerQuery)
    )
  }

  return {
    // State
    npcList,
    
    // Getters
    npcsByLocation,
    locations,
    
    // Actions
    fetchNpcList,
    getNpcByName,
    getNpcById,
    searchNpcs
  }
})
