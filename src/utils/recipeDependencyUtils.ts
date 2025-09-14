import { type Recipe, RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { recipes } from '@/data/recipes'
import { craftingRecipes } from '@/data/crafting'

/**
 * 특정 아이템을 만들 수 있는 모든 레시피를 찾는 함수
 */
export function findRecipesForItem(itemId: string): Recipe[] {
  return recipes.filter(recipe => recipe.resultItemId === itemId)
}

/**
 * 특정 아이템을 가공 레시피로 만들 수 있는지 확인하는 함수
 */
export function findProcessingRecipesForItem(itemId: string): Recipe[] {
  // 일반 레시피와 제작 시스템 레시피 모두 확인
  const allRecipes = [...recipes, ...craftingRecipes]
  
  return allRecipes.filter(recipe => 
    recipe.resultItemId === itemId && 
    (recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
     recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
     recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
     recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
     recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE ||
     recipe.category === RECIPE_CATEGORY.PROCESS_FOOD)
  )
}

/**
 * 제작 레시피에서 필요한 재료들 중 가공 레시피로 만들 수 있는 것들을 찾는 함수
 */
export function findRequiredProcessingRecipes(selectedRecipes: Recipe[]): Map<string, Recipe[]> {
  const requiredProcessingRecipes = new Map<string, Recipe[]>()
  
  for (const recipe of selectedRecipes) {
    for (const requiredItem of recipe.requiredItems) {
      const processingRecipes = findProcessingRecipesForItem(requiredItem.itemId)
      
      if (processingRecipes.length > 0) {
        requiredProcessingRecipes.set(requiredItem.itemId, processingRecipes)
      }
    }
  }
  
  return requiredProcessingRecipes
}

/**
 * 가공 레시피의 재료들도 재귀적으로 확인하여 필요한 모든 가공 레시피를 찾는 함수
 */
export function findAllRequiredProcessingRecipes(selectedRecipes: Recipe[]): Map<string, Recipe[]> {
  const allRequiredProcessingRecipes = new Map<string, Recipe[]>()
  const processedItems = new Set<string>()
  
  function processRecipes(recipes: Recipe[]) {
    for (const recipe of recipes) {
      for (const requiredItem of recipe.requiredItems) {
        if (processedItems.has(requiredItem.itemId)) {
          continue
        }
        
        const processingRecipes = findProcessingRecipesForItem(requiredItem.itemId)
        
        if (processingRecipes.length > 0) {
          allRequiredProcessingRecipes.set(requiredItem.itemId, processingRecipes)
          processedItems.add(requiredItem.itemId)
          
          // 재귀적으로 가공 레시피의 재료들도 확인
          processRecipes(processingRecipes)
        }
      }
    }
  }
  
  processRecipes(selectedRecipes)
  return allRequiredProcessingRecipes
}

/**
 * 레시피 카테고리별로 그룹화하는 함수
 */
export function groupRecipesByCategory(recipes: Recipe[]): Map<string, Recipe[]> {
  const grouped = new Map<string, Recipe[]>()
  
  for (const recipe of recipes) {
    const category = recipe.category
    if (!grouped.has(category)) {
      grouped.set(category, [])
    }
    grouped.get(category)!.push(recipe)
  }
  
  return grouped
}

/**
 * 가공 레시피의 총 제작 시간을 계산하는 함수
 */
export function calculateProcessingTime(recipes: Recipe[], isMembershipEnabled: boolean = false): number {
  let totalTime = 0
  
  for (const recipe of recipes) {
    if (recipe.craftingTime) {
      let time = recipe.craftingTime
      if (isMembershipEnabled) {
        time = Math.ceil(time / 2)
      }
      totalTime += time
    }
  }
  
  return totalTime
}
