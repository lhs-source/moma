import { type Recipe, type RecipeGroup } from '@/data/schemas/recipe'

// 분리된 레시피 파일들 import
import { cookingRecipes } from './recipes/crafting/cooking'
import { processingRecipes } from './recipes/processing'
import { gatheringRecipes } from './recipes/gathering'
import { buyingRecipes } from './recipes/buying'
import { dropRecipes } from './recipes/drops'
import { craftingItemRecipes } from './recipes/crafting/crafting_item'
import { potionCraftRecipes } from './recipes/crafting/potion_craft'
import { handicraftRecipes } from './recipes/crafting/handicraft'

// https://www.inven.co.kr/board/mabimo/6366/134
// 모든 레시피를 통합하여 export
export const recipes: Recipe[] = [
  ...cookingRecipes,
  ...processingRecipes,
  ...gatheringRecipes,
  ...buyingRecipes,
  ...dropRecipes,
  ...craftingItemRecipes,
  ...potionCraftRecipes,
  ...handicraftRecipes
]

// 결과 아이템별 레시피 그룹화 버전 (기존 export 유지)
export const recipesGrouped: RecipeGroup[] = (() => {
  const map = new Map<string, Recipe[]>()
  for (const r of recipes) {
    const list = map.get(r.resultItemId) ?? []
    list.push(r)
    map.set(r.resultItemId, list)
  }
  return Array.from(map.entries()).map(([resultItemId, recipeList]) => ({ resultItemId, recipeList }))
})()

// 개별 카테고리별 export (필요한 경우 사용)
export { cookingRecipes } from './recipes/crafting/cooking'
export { processingRecipes } from './recipes/processing'
export { gatheringRecipes } from './recipes/gathering'
export { buyingRecipes } from './recipes/buying'
export { dropRecipes } from './recipes/drops'
export { potionCraftRecipes } from './recipes/crafting/potion_craft'
export { handicraftRecipes } from './recipes/crafting/handicraft'
