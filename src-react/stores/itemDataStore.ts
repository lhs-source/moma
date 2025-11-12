import { create } from 'zustand'

import { items } from '../../src/data/items'
import { locations } from '../../src/data/locations'
import { npcs } from '../../src/data/npcs'
import type { EnrichedItem } from '../../src/data/schemas/enrichedItem'
import { ITEM_CATEGORY, type Item } from '../../src/data/schemas/item'
import { RECIPE_CATEGORY, type Recipe } from '../../src/data/schemas/recipe'
import { recipes } from '../../src/data/recipes'
import { trades } from '../../src/data/trade'
import { itemUsageIndex } from '../../src/utils/itemUsageIndex'

export interface ItemFilterOptions {
  searchQuery?: string
  category?: string
  usageType?: string
  schema?: string
}

interface ItemDataStoreState {
  itemList: Item[]
  enrichedItems: EnrichedItem[]
  isInitialized: boolean
  categories: string[]
  schemaCounts: Record<string, number>
  initialize: () => void
  getFilteredItems: (filters: ItemFilterOptions) => EnrichedItem[]
}

const EMPTY_ARRAY: EnrichedItem[] = []

function buildEnrichedItem(item: Item): EnrichedItem {
  const usage = itemUsageIndex.getItemUsage(item.id)

  const tradeData = trades.filter((trade) => trade.receiveItemId === item.id && trade.isEnabled !== false).map((trade) => {
    const npc = npcs.find((n) => n.id === trade.npcId)
    const location = npc ? locations.find((loc) => loc.id === npc.locationId) : undefined
    const giveItem = items.find((candidate) => candidate.id === trade.giveItemId)
    return {
      id: trade.id,
      npcName: npc?.name ?? '알 수 없음',
      locationName: location?.name ?? '알 수 없음',
      giveItemName: giveItem?.name ?? trade.giveItemId,
      giveQuantity: trade.giveQuantity,
      receiveQuantity: trade.receiveQuantity,
    }
  })

  const recipesList: Recipe[] = recipes

  const cookingRecipes = recipesList.filter(
    (recipe) => recipe.resultItemId === item.id && recipe.category === RECIPE_CATEGORY.COOK,
  )

  const processingRecipes = recipesList.filter(
    (recipe) =>
      recipe.resultItemId === item.id &&
      (recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
        recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
        recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
        recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
        recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE ||
        recipe.category === RECIPE_CATEGORY.PROCESS_FOOD),
  )

  const craftingRecipes = recipesList.filter(
    (recipe) => recipe.resultItemId === item.id && recipe.category === RECIPE_CATEGORY.CRAFTING_ITEM,
  )

  const usedInCookingRecipes =
    usage?.usageTypes.recipes
      .filter((usageEntry) => {
        const recipe = recipesList.find((recipeCandidate) => recipeCandidate.id === usageEntry.recipeId)
        return recipe?.category === RECIPE_CATEGORY.COOK
      })
      .map((usageEntry) => ({
        recipeId: usageEntry.recipeId,
        recipeName: usageEntry.recipeName ?? '',
        resultItemName: usageEntry.resultItemName,
        resultQuantity: usageEntry.resultQuantity,
        quantity: usageEntry.quantity,
      })) ?? []

  const usedInProcessingRecipes = recipesList
    .filter(
      (recipe) =>
        (recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
          recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
          recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
          recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
          recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE ||
          recipe.category === RECIPE_CATEGORY.PROCESS_FOOD) &&
        recipe.requiredItems.some(
          (material: Recipe['requiredItems'][number]) => material.itemId === item.id,
        ),
    )
    .map((recipe) => {
      const material = recipe.requiredItems.find(
        (entry: Recipe['requiredItems'][number]) => entry.itemId === item.id,
      )!
      const resultItem = items.find((candidate) => candidate.id === recipe.resultItemId)
      return {
        recipeId: recipe.id,
        recipeName: recipe.name,
        resultItemName: resultItem?.name ?? recipe.resultItemId,
        resultQuantity: recipe.resultQuantity ?? 1,
        quantity: material.quantity,
        category: recipe.category,
      }
    })

  const usedInCraftingRecipes = recipesList
    .filter(
      (recipe) =>
        recipe.category === RECIPE_CATEGORY.CRAFTING_ITEM &&
        recipe.requiredItems.some(
          (material: Recipe['requiredItems'][number]) => material.itemId === item.id,
        ),
    )
    .map((recipe) => {
      const material = recipe.requiredItems.find(
        (entry: Recipe['requiredItems'][number]) => entry.itemId === item.id,
      )!
      const resultItem = items.find((candidate) => candidate.id === recipe.resultItemId)
      return {
        recipeId: recipe.id,
        recipeName: recipe.name,
        resultItemName: resultItem?.name ?? recipe.resultItemId,
        resultQuantity: recipe.resultQuantity ?? 1,
        quantity: material.quantity,
        category: recipe.category,
      }
    })

  const usageTypes: string[] = []
  if (usage?.usageTypes.recipes.length) usageTypes.push('레시피')
  if (usage?.usageTypes.trades.length) usageTypes.push('교환')
  if (usage?.usageTypes.purchases.length) usageTypes.push('구매')
  if (cookingRecipes.length > 0 || processingRecipes.length > 0 || craftingRecipes.length > 0) {
    usageTypes.push('제작')
  }
  if (tradeData.length > 0) usageTypes.push('교환으로 얻을 수 있음')

  return {
    ...item,
    usageTypes,
    requiredForTrades:
      usage?.usageTypes.trades.map((trade) => ({
        tradeId: trade.tradeId,
        npcName: trade.npcName,
        locationName: trade.locationName,
        receiveItemName: trade.receiveItemName,
        receiveQuantity: trade.receiveQuantity,
        giveQuantity: trade.giveQuantity,
      })) ?? [],
    obtainableFromTrades: tradeData,
    cookingRecipes,
    usedInCookingRecipes,
    processingRecipes,
    usedInProcessingRecipes,
    craftingRecipes,
    usedInCraftingRecipes,
  }
}

function computeSchemaCounts(enriched: EnrichedItem[]): Record<string, number> {
  const counts: Record<string, number> = { '': enriched.length }
  enriched.forEach((item) => {
    const key = item.category || '기타'
    counts[key] = (counts[key] || 0) + 1
  })
  return counts
}

export const useItemDataStore = create<ItemDataStoreState>((set, get) => ({
  itemList: items,
  enrichedItems: EMPTY_ARRAY,
  isInitialized: false,
  categories: Object.values(ITEM_CATEGORY).sort(),
  schemaCounts: {},
  initialize: () => {
    const existing = get()
    if (existing.isInitialized) return

    const enriched = items.map((item) => buildEnrichedItem(item))
    set({
      enrichedItems: enriched,
      isInitialized: true,
      schemaCounts: computeSchemaCounts(enriched),
    })
  },
  getFilteredItems: (filters) => {
    const state = get()
    if (!state.isInitialized) {
      state.initialize()
    }

    const { enrichedItems } = get()
    let filtered = enrichedItems

    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) => item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query),
      )
    }

    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category)
    }

    if (filters.usageType) {
      filtered = filtered.filter((item) => item.usageTypes.includes(filters.usageType!))
    }

    if (filters.schema) {
      filtered = filtered.filter((item) => item.category === filters.schema)
    }

    return filtered
  },
}))


