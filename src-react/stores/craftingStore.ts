import { create } from 'zustand'
import type { StateCreator } from 'zustand'

import {
  craftingCategories,
  craftingRecipesByCategory,
  processingCategories,
  processingRecipesByCategory,
} from '../../src/data/crafting'
import type { Recipe } from '../../src/data/schemas/recipe'

export type CraftingTabType = 'crafting' | 'processing'

interface SelectedItem {
  recipe: Recipe
  quantity: number
}

interface CraftingStoreState {
  selectedItems: Record<string, SelectedItem>
  selectedCategory: string | null
  isMembershipEnabled: boolean
  activeTab: CraftingTabType
  selectItem: (recipe: Recipe, quantity?: number) => void
  setItemQuantity: (recipeId: string, quantity: number) => void
  removeItem: (recipeId: string) => void
  setSelectedCategory: (category: string | null) => void
  toggleMembership: () => void
  setMembership: (enabled: boolean) => void
  clearSelectedItems: () => void
  clearCategory: (category: string) => void
  setActiveTab: (tab: CraftingTabType) => void
}

const MEMBERSHIP_STORAGE_KEY = 'crafting-membership'

const craftingRecipesMap = craftingRecipesByCategory()
const processingRecipesMap = processingRecipesByCategory()

function loadMembershipFromStorage(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const stored = window.localStorage.getItem(MEMBERSHIP_STORAGE_KEY)
    return stored === 'true'
  } catch {
    return false
  }
}

function saveMembershipToStorage(enabled: boolean) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(MEMBERSHIP_STORAGE_KEY, String(enabled))
  } catch {
    // ignore persistence errors
  }
}

const EMPTY_RECIPE_LIST: Recipe[] = []
const EMPTY_SELECTED_ITEMS: Record<string, SelectedItem[]> = {}
const EMPTY_MATERIALS: Record<string, number> = {}
const EMPTY_CATEGORY_TIMES: Record<string, number> = {}

function createSelectedItemsByCategoryMemo() {
  let lastInput: Record<string, SelectedItem> | null = null
  let lastResult: Record<string, SelectedItem[]> = EMPTY_SELECTED_ITEMS

  return (selectedItems: Record<string, SelectedItem>): Record<string, SelectedItem[]> => {
    if (selectedItems === lastInput) {
      return lastResult
    }

    const grouped: Record<string, SelectedItem[]> = {}
    for (const selected of Object.values(selectedItems)) {
      const category = selected.recipe.craftingCategory || selected.recipe.category || 'Unknown'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(selected)
    }

    lastInput = selectedItems
    lastResult = Object.keys(grouped).length > 0 ? grouped : EMPTY_SELECTED_ITEMS
    return lastResult
  }
}

function createTotalMaterialsMemo() {
  let lastInput: Record<string, SelectedItem> | null = null
  let lastResult: Record<string, number> = EMPTY_MATERIALS

  return (selectedItems: Record<string, SelectedItem>): Record<string, number> => {
    if (selectedItems === lastInput) {
      return lastResult
    }

    const entries = Object.values(selectedItems)
    if (entries.length === 0) {
      lastInput = selectedItems
      lastResult = EMPTY_MATERIALS
      return lastResult
    }

    const materials: Record<string, number> = {}
    entries.forEach(({ recipe, quantity }) => {
      recipe.requiredItems.forEach((required) => {
        materials[required.itemId] = (materials[required.itemId] || 0) + required.quantity * quantity
      })
    })

    lastInput = selectedItems
    lastResult = materials
    return lastResult
  }
}

function createCategoryTimesMemo() {
  let lastInput: { items: Record<string, SelectedItem>; membership: boolean } | null = null
  let lastResult: Record<string, number> = EMPTY_CATEGORY_TIMES

  return (
    selectedItems: Record<string, SelectedItem>,
    isMembershipEnabled: boolean,
  ): Record<string, number> => {
    if (lastInput && lastInput.items === selectedItems && lastInput.membership === isMembershipEnabled) {
      return lastResult
    }

    const entries = Object.values(selectedItems)
    if (entries.length === 0) {
      lastInput = { items: selectedItems, membership: isMembershipEnabled }
      lastResult = EMPTY_CATEGORY_TIMES
      return lastResult
    }

    const times: Record<string, number> = {}

    entries.forEach(({ recipe, quantity }) => {
      const category = recipe.craftingCategory || recipe.category || 'Unknown'
      const baseTime = (recipe.craftingTime || 0) * quantity
      const adjustedTime = isMembershipEnabled ? Math.ceil(baseTime / 2) : baseTime
      times[category] = (times[category] || 0) + adjustedTime
    })

    lastInput = { items: selectedItems, membership: isMembershipEnabled }
    lastResult = times
    return lastResult
  }
}

const computeSelectedItemsByCategory = createSelectedItemsByCategoryMemo()
const computeTotalMaterials = createTotalMaterialsMemo()
const computeCategoryTimes = createCategoryTimesMemo()

const createCraftingStore: StateCreator<CraftingStoreState> = (set, get) => ({
  selectedItems: {},
  selectedCategory: null,
  isMembershipEnabled: loadMembershipFromStorage(),
  activeTab: 'processing',
  selectItem: (recipe, quantity = 1) => {
    if (quantity === 0) return

    set((state) => {
      const nextItems = { ...state.selectedItems }
      const existing = nextItems[recipe.id]
      const nextQuantity = (existing?.quantity ?? 0) + quantity

      if (nextQuantity <= 0) {
        delete nextItems[recipe.id]
      } else {
        nextItems[recipe.id] = {
          recipe: existing?.recipe ?? recipe,
          quantity: nextQuantity,
        }
      }

      return {
        selectedItems: nextItems,
      }
    })
  },
  setItemQuantity: (recipeId, quantity) => {
    set((state) => {
      const nextItems = { ...state.selectedItems }
      const existing = nextItems[recipeId]
      if (!existing) {
        return { selectedItems: state.selectedItems }
      }

      if (quantity <= 0) {
        delete nextItems[recipeId]
      } else {
        nextItems[recipeId] = {
          recipe: existing.recipe,
          quantity,
        }
      }

      return {
        selectedItems: nextItems,
      }
    })
  },
  removeItem: (recipeId) => {
    set((state) => {
      if (!state.selectedItems[recipeId]) {
        return { selectedItems: state.selectedItems }
      }

      const nextItems = { ...state.selectedItems }
      delete nextItems[recipeId]

      return {
        selectedItems: nextItems,
      }
    })
  },
  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
  },
  toggleMembership: () => {
    set((state) => {
      const nextValue = !state.isMembershipEnabled
      saveMembershipToStorage(nextValue)
      return { isMembershipEnabled: nextValue }
    })
  },
  setMembership: (enabled) => {
    saveMembershipToStorage(enabled)
    set({ isMembershipEnabled: enabled })
  },
  clearSelectedItems: () => {
    set({ selectedItems: {} })
  },
  clearCategory: (category) => {
    set((state) => {
      const nextItems: Record<string, SelectedItem> = {}
      for (const [recipeId, selected] of Object.entries(state.selectedItems)) {
        const selectedCategory =
          selected.recipe.craftingCategory || selected.recipe.category || 'Unknown'
        if (selectedCategory !== category) {
          nextItems[recipeId] = selected
        }
      }

      return {
        selectedItems: nextItems,
      }
    })
  },
  setActiveTab: (tab) => {
    set((state) => {
      if (state.activeTab === tab) {
        return state
      }
      return {
        activeTab: tab,
        selectedCategory: null,
      }
    })
  },
})

export const useCraftingStore = create<CraftingStoreState>(createCraftingStore)

const getRecipesMap = (tab: CraftingTabType) =>
  tab === 'crafting' ? craftingRecipesMap : processingRecipesMap

export const selectCategories = (state: CraftingStoreState) =>
  state.activeTab === 'crafting' ? craftingCategories : processingCategories

export const selectSelectedCategory = (state: CraftingStoreState) => state.selectedCategory

export const selectActiveTab = (state: CraftingStoreState) => state.activeTab

export const selectSelectedCategoryRecipes = (state: CraftingStoreState): Recipe[] => {
  if (!state.selectedCategory) return EMPTY_RECIPE_LIST
  const map = getRecipesMap(state.activeTab)
  return map[state.selectedCategory] ?? EMPTY_RECIPE_LIST
}

export const selectHasSelectedItems = (state: CraftingStoreState) =>
  Object.keys(state.selectedItems).length > 0

export const selectSelectedItemsByCategory = (state: CraftingStoreState) => {
  return computeSelectedItemsByCategory(state.selectedItems)
}

export const selectTotalMaterials = (state: CraftingStoreState) => {
  return computeTotalMaterials(state.selectedItems)
}

export const selectCategoryTimes = (state: CraftingStoreState) => {
  return computeCategoryTimes(state.selectedItems, state.isMembershipEnabled)
}

export const selectTotalTime = (state: CraftingStoreState) => {
  const times = Object.values(selectCategoryTimes(state))
  return times.length > 0 ? Math.max(...times) : 0
}

export const selectIsMembershipEnabled = (state: CraftingStoreState) => state.isMembershipEnabled


