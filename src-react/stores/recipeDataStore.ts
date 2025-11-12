import { create } from 'zustand'

import { recipes as recipeData } from '../../src/data/recipes'
import type { Recipe } from '../../src/data/schemas/recipe'

export interface RecipeFilterOptions {
  searchQuery?: string
  category?: string
  facilityLevel?: string
}

interface RecipeDataStoreState {
  recipes: Recipe[]
  categories: string[]
  facilityLevels: number[]
  isInitialized: boolean
  initialize: () => void
  getFilteredRecipes: (filters: RecipeFilterOptions) => Recipe[]
}

function collectCategories(list: Recipe[]): string[] {
  const set = new Set<string>()
  list.forEach((recipe) => {
    if (recipe.category) {
      set.add(recipe.category)
    }
  })
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

function collectFacilityLevels(list: Recipe[]): number[] {
  const set = new Set<number>()
  list.forEach((recipe) => {
    if (typeof recipe.facilityLevel === 'number') {
      set.add(recipe.facilityLevel)
    }
  })
  return Array.from(set).sort((a, b) => a - b)
}

export const useRecipeDataStore = create<RecipeDataStoreState>((set, get) => ({
  recipes: [],
  categories: [],
  facilityLevels: [],
  isInitialized: false,
  initialize: () => {
    const state = get()
    if (state.isInitialized) {
      return
    }
    const recipeList = recipeData as Recipe[]
    set({
      recipes: recipeList,
      categories: collectCategories(recipeList),
      facilityLevels: collectFacilityLevels(recipeList),
      isInitialized: true,
    })
  },
  getFilteredRecipes: (filters) => {
    const state = get()
    if (!state.isInitialized) {
      state.initialize()
    }

    const recipeList = get().recipes
    const search = filters.searchQuery?.trim().toLowerCase() ?? ''
    const category = filters.category?.trim() ?? ''
    const facilityLevel = filters.facilityLevel?.trim() ?? ''

    return recipeList.filter((recipe) => {
      const matchesSearch =
        !search ||
        recipe.name.toLowerCase().includes(search) ||
        recipe.id.toLowerCase().includes(search)

      const matchesCategory = !category || recipe.category === category

      const matchesFacilityLevel =
        !facilityLevel ||
        (recipe.facilityLevel !== undefined && recipe.facilityLevel.toString() === facilityLevel)

      return matchesSearch && matchesCategory && matchesFacilityLevel
    })
  },
}))


