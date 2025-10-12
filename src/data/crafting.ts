import { type Recipe, RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { recipes } from './recipes'

// 제작 계열 레시피 (대장기술, 목공, 매직크래프트, 중갑, 경갑, 천옷 제외)
export const craftingRecipes: Recipe[] = recipes.filter(recipe => 
  recipe.category === RECIPE_CATEGORY.CRAFT_POTION ||
  recipe.category === RECIPE_CATEGORY.COOK ||
  recipe.category === RECIPE_CATEGORY.CRAFT_HANDICRAFT ||
  recipe.category === RECIPE_CATEGORY.CRAFT_TOOL_MAKING ||
  recipe.category === RECIPE_CATEGORY.CRAFTING_ITEM // 레거시 데이터 호환
)

// 재료 가공 레시피
export const processingRecipes: Recipe[] = recipes.filter(recipe => 
  recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
  recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
  recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
  recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
  recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE ||
  recipe.category === RECIPE_CATEGORY.PROCESS_FOOD
)

// 모든 가공 시스템 레시피 (제작 + 재료 가공)
export const allProcessingRecipes: Recipe[] = [...craftingRecipes, ...processingRecipes]

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

// 재료 가공 카테고리별로 그룹화
export const processingRecipesByCategory = () => {
  const categoryMap = new Map<string, Recipe[]>()
  
  for (const recipe of processingRecipes) {
    if (!recipe.category) continue
    
    const categoryRecipes = categoryMap.get(recipe.category) || []
    categoryRecipes.push(recipe)
    categoryMap.set(recipe.category, categoryRecipes)
  }
  
  return Object.fromEntries(categoryMap)
}

// 제작 계열 카테고리 목록 (대장기술, 목공, 매직크래프트, 중갑, 경갑, 천옷 제외)
export const craftingCategories = [
  RECIPE_CATEGORY.CRAFT_POTION,
  RECIPE_CATEGORY.COOK,
  RECIPE_CATEGORY.CRAFT_HANDICRAFT,
  RECIPE_CATEGORY.CRAFT_TOOL_MAKING,
  RECIPE_CATEGORY.CRAFTING_ITEM // 레거시 데이터 호환
]

// 재료 가공 카테고리 목록
export const processingCategories = [
  RECIPE_CATEGORY.PROCESS_METAL,
  RECIPE_CATEGORY.PROCESS_WOOD,
  RECIPE_CATEGORY.PROCESS_LEATHER,
  RECIPE_CATEGORY.PROCESS_FABRIC,
  RECIPE_CATEGORY.PROCESS_MEDICINE,
  RECIPE_CATEGORY.PROCESS_FOOD
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