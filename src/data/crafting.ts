import { type Recipe, RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { recipes } from './recipes'

// 모든 제작 레시피 (PROCESS_* 카테고리만 필터링)
export const craftingRecipes: Recipe[] = recipes.filter(recipe => 
  recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
  recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
  recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
  recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
  recipe.category === RECIPE_CATEGORY.CRAFTING_ITEM ||
  recipe.category === RECIPE_CATEGORY.MEDICINE
)

// 제작 카테고리별로 그룹화
export const craftingRecipesByCategory = () => {
  const categoryMap = new Map<string, Recipe[]>()
  
  for (const recipe of craftingRecipes) {
    if (!recipe.category) continue
    
    const categoryRecipes = categoryMap.get(recipe.category) || []
    categoryRecipes.push(recipe)
    categoryMap.set(recipe.category, categoryRecipes)
  }
  
  return Object.fromEntries(categoryMap)
}

// 제작 카테고리 목록
export const craftingCategories = [
  RECIPE_CATEGORY.PROCESS_METAL,
  RECIPE_CATEGORY.PROCESS_WOOD, 
  RECIPE_CATEGORY.PROCESS_LEATHER,
  RECIPE_CATEGORY.PROCESS_FABRIC,
  RECIPE_CATEGORY.CRAFTING_ITEM,
  RECIPE_CATEGORY.MEDICINE
]

// 레거시 인터페이스 (기존 코드와의 호환성을 위해)
export interface CraftingMaterial {
  [materialName: string]: number;
}

export interface CraftingItem {
  생산량: number;
  시간: number;
  재료: CraftingMaterial;
}

export interface CraftingCategory {
  [itemName: string]: CraftingItem;
}

export interface CraftingData {
  [category: string]: CraftingCategory;
}

// 새로운 Recipe 구조를 기존 구조로 변환하는 함수 (호환성을 위해)
export const getCraftingDataLegacy = (): CraftingData => {
  const legacyData: CraftingData = {}
  
  for (const recipe of craftingRecipes) {
    if (!recipe.category) continue
    
    if (!legacyData[recipe.category]) {
      legacyData[recipe.category] = {}
    }
    
    const materials: CraftingMaterial = {}
    for (const item of recipe.requiredItems) {
      materials[item.itemId] = item.quantity
    }
    
    legacyData[recipe.category][recipe.name] = {
      생산량: recipe.resultQuantity || 1,
      시간: recipe.craftingTime || 0,
      재료: materials
    }
  }
  
  return legacyData
}

// 기존 코드와의 호환성을 위한 export
export const craftingData = getCraftingDataLegacy()