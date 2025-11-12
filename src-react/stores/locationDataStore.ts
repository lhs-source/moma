import { create } from 'zustand'

import { locations } from '../../src/data/locations'
import { npcs } from '../../src/data/npcs'
import type { Location } from '../../src/data/schemas/location'

export interface EnrichedLocation extends Location {
  npcCount: number
  npcs: Array<{
    id: string
    name: string
    description: string
  }>
}

export interface LocationFilterOptions {
  searchQuery?: string
}

interface LocationDataStoreState {
  locations: EnrichedLocation[]
  isInitialized: boolean
  initialize: () => void
  getFilteredLocations: (filters: LocationFilterOptions) => EnrichedLocation[]
}

function buildEnrichedLocations(): EnrichedLocation[] {
  return locations.map((location) => {
    const relatedNpcs = npcs.filter((npc) => npc.locationId === location.id)
    return {
      ...location,
      npcCount: relatedNpcs.length,
      npcs: relatedNpcs.map((npc) => ({
        id: npc.id,
        name: npc.name,
        description: npc.description,
      })),
    }
  })
}

export const useLocationDataStore = create<LocationDataStoreState>((set, get) => ({
  locations: [],
  isInitialized: false,
  initialize: () => {
    const state = get()
    if (state.isInitialized) {
      return
    }
    set({
      locations: buildEnrichedLocations(),
      isInitialized: true,
    })
  },
  getFilteredLocations: (filters) => {
    const state = get()
    if (!state.isInitialized) {
      state.initialize()
    }
    const list = get().locations
    const search = filters.searchQuery?.trim().toLowerCase() ?? ''
    if (!search) {
      return list
    }
    return list.filter((location) => location.name.toLowerCase().includes(search))
  },
}))


