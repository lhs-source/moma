import { type Recipe } from '@/data/schemas/recipe'
import { craftingProcessingRecipes } from './crafting/processing'

// 모든 제작 레시피
export const craftingRecipes: Recipe[] = [
  ...craftingProcessingRecipes
]

// 제작 카테고리별로 그룹화
export const craftingRecipesByCategory = () => {
  const categoryMap = new Map<string, Recipe[]>()
  
  for (const recipe of craftingRecipes) {
    if (!recipe.craftingCategory) continue
    
    const categoryRecipes = categoryMap.get(recipe.craftingCategory) || []
    categoryRecipes.push(recipe)
    categoryMap.set(recipe.craftingCategory, categoryRecipes)
  }
  
  return Object.fromEntries(categoryMap)
}

// 제작 카테고리 목록
export const craftingCategories = [
  '금속 가공',
  '목재 가공', 
  '가죽 가공',
  '옷감 가공',
  '식재료 가공',
  '약품 가공'
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
    if (!recipe.craftingCategory) continue
    
    if (!legacyData[recipe.craftingCategory]) {
      legacyData[recipe.craftingCategory] = {}
    }
    
    const materials: CraftingMaterial = {}
    for (const item of recipe.requiredItems) {
      materials[item.itemId] = item.quantity
    }
    
    legacyData[recipe.craftingCategory][recipe.name] = {
      생산량: recipe.resultQuantity || 1,
      시간: recipe.craftingTime || 0,
      재료: materials
    }
  }
  
  return legacyData
}

// 기존 코드와의 호환성을 위한 export
export const craftingData = getCraftingDataLegacy()