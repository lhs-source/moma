import { create } from 'zustand'

import { locations } from '../../src/data/locations'
import { items } from '../../src/data/items'
import type { Location } from '../../src/data/schemas/location'
import type { NPC } from '../../src/data/schemas/npc'
import { npcs } from '../../src/data/npcs'
import { trades } from '../../src/data/trade'

export interface EnrichedNPC extends NPC {
  location: Location
  availableTrades: Array<{
    tradeId: string
    giveItemName: string
    receiveItemName: string
    giveQuantity: number
    receiveQuantity: number
    type: string
    maxExchanges: number
  }>
  tradeCount: number
}

export interface NPCFilterOptions {
  searchQuery?: string
  locationId?: string
  hasTrades?: boolean
}

interface NpcDataStoreState {
  npcList: EnrichedNPC[]
  isInitialized: boolean
  locationCounts: Record<string, number>
  uniqueLocations: Array<{ id: string; name: string }>
  initialize: () => void
  getFilteredNPCs: (filters: NPCFilterOptions) => EnrichedNPC[]
}

function getItemName(itemId: string): string {
  const item = items.find((candidate) => candidate.id === itemId)
  return item?.name ?? itemId
}

function buildEnrichedNpcList(): EnrichedNPC[] {
  return npcs.map((npc) => {
    const location = locations.find((loc) => loc.id === npc.locationId)
    const npcTrades = trades.filter((trade) => trade.npcId === npc.id)
    const availableTrades = npcTrades.map((trade) => ({
      tradeId: trade.id,
      giveItemName: getItemName(trade.giveItemId),
      receiveItemName: getItemName(trade.receiveItemId),
      giveQuantity: trade.giveQuantity,
      receiveQuantity: trade.receiveQuantity,
      type: trade.type,
      maxExchanges: trade.maxExchanges,
    }))

    return {
      ...npc,
      location: location || { id: '', name: '알 수 없음', description: '', imageUrl: '' },
      availableTrades,
      tradeCount: availableTrades.length,
    }
  })
}

function computeLocationCounts(list: EnrichedNPC[]): Record<string, number> {
  const counts: Record<string, number> = {}
  list.forEach((npc) => {
    counts[npc.locationId] = (counts[npc.locationId] || 0) + 1
  })
  return counts
}

function collectUniqueLocations(list: EnrichedNPC[]): Array<{ id: string; name: string }> {
  const idSet = new Set<string>()
  const result: Array<{ id: string; name: string }> = []
  list.forEach((npc) => {
    if (!idSet.has(npc.locationId)) {
      idSet.add(npc.locationId)
      const location = locations.find((loc) => loc.id === npc.locationId)
      if (location) {
        result.push({ id: location.id, name: location.name })
      }
    }
  })
  return result.sort((a, b) => a.name.localeCompare(b.name))
}

export const useNpcDataStore = create<NpcDataStoreState>((set, get) => ({
  npcList: [],
  isInitialized: false,
  locationCounts: {},
  uniqueLocations: [],
  initialize: () => {
    const state = get()
    if (state.isInitialized) {
      return
    }
    const npcList = buildEnrichedNpcList()
    set({
      npcList,
      isInitialized: true,
      locationCounts: computeLocationCounts(npcList),
      uniqueLocations: collectUniqueLocations(npcList),
    })
  },
  getFilteredNPCs: (filters) => {
    const state = get()
    if (!state.isInitialized) {
      state.initialize()
    }
    const list = get().npcList
    const search = filters.searchQuery?.trim().toLowerCase() ?? ''
    const locationId = filters.locationId
    const hasTrades = filters.hasTrades

    return list.filter((npc) => {
      const matchesSearch =
        !search ||
        npc.name.toLowerCase().includes(search) ||
        (npc.description ?? '').toLowerCase().includes(search) ||
        npc.location.name.toLowerCase().includes(search)

      const matchesLocation = !locationId || npc.locationId === locationId

      const matchesTrades =
        hasTrades === undefined ? true : hasTrades ? npc.tradeCount > 0 : npc.tradeCount === 0

      return matchesSearch && matchesLocation && matchesTrades
    })
  },
}))


