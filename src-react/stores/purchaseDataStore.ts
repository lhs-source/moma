import { create } from 'zustand'

import { items } from '../../src/data/items'
import { npcs } from '../../src/data/npcs'
import { purchaseData } from '../../src/data/purchase'

export interface EnrichedPurchaseItem {
  itemId: string
  itemName: string
  price: number
  isCollectible: boolean
  npcId: string
  npcName: string
  locationName: string
  imageUrl?: string
}

export interface PurchaseFilterOptions {
  searchQuery?: string
  npcId?: string
  collectibleOnly?: boolean
}

interface PurchaseDataStoreState {
  purchases: EnrichedPurchaseItem[]
  isInitialized: boolean
  initialize: () => void
  getFilteredPurchases: (filters: PurchaseFilterOptions) => EnrichedPurchaseItem[]
  getUniqueNPCs: () => Array<{ id: string; name: string }>
}

function buildEnrichedPurchases(): EnrichedPurchaseItem[] {
  const enriched: EnrichedPurchaseItem[] = []

  purchaseData.npcs.forEach((entry) => {
    const npcInfo = npcs.find((npc) => npc.id === entry.npcId)
    const npcName = npcInfo?.name ?? entry.npcId

    entry.items.forEach((purchaseItem) => {
      const itemInfo = items.find((item) => item.id === purchaseItem.itemId)
      enriched.push({
        itemId: purchaseItem.itemId,
        itemName: itemInfo?.name ?? purchaseItem.itemId,
        price: purchaseItem.price,
        isCollectible: purchaseItem.isCollectible,
        npcId: entry.npcId,
        npcName,
        locationName: entry.locationName,
        imageUrl: itemInfo?.imageUrl,
      })
    })
  })

  return enriched
}

export const usePurchaseDataStore = create<PurchaseDataStoreState>((set, get) => ({
  purchases: [],
  isInitialized: false,
  initialize: () => {
    const state = get()
    if (state.isInitialized) {
      return
    }
    set({
      purchases: buildEnrichedPurchases(),
      isInitialized: true,
    })
  },
  getFilteredPurchases: (filters) => {
    const state = get()
    if (!state.isInitialized) {
      state.initialize()
    }
    const list = get().purchases
    const search = filters.searchQuery?.trim().toLowerCase() ?? ''
    const npcId = filters.npcId
    const collectibleOnly = filters.collectibleOnly ?? false

    return list.filter((purchase) => {
      const matchesSearch = !search || purchase.itemName.toLowerCase().includes(search)
      const matchesNpc = !npcId || purchase.npcId === npcId
      const matchesCollectible = !collectibleOnly || purchase.isCollectible
      return matchesSearch && matchesNpc && matchesCollectible
    })
  },
  getUniqueNPCs: () => {
    const state = get()
    if (!state.isInitialized) {
      state.initialize()
    }
    const list = get().purchases
    const npcMap = new Map<string, string>()
    list.forEach((purchase) => {
      if (!npcMap.has(purchase.npcId)) {
        npcMap.set(purchase.npcId, purchase.npcName)
      }
    })
    return Array.from(npcMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  },
}))


