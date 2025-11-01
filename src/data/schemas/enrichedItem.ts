import type { Item } from './item'
import type { Recipe } from './recipe'

/**
 * # EnrichedItem 인터페이스
 * 
 * ## 설명
 * 아이템의 기본 정보와 함께 사용처 정보를 포함한 확장된 아이템 타입
 * 모든 사용처 정보는 itemStore에서 초기화 시 한 번만 계산되어 저장됨
 * 
 * ## 성능 최적화
 * - 각 컴포넌트에서 반복 계산하지 않음
 * - O(n) 복잡도로 한 번만 계산
 * - computed를 통한 추가 캐싱
 */
export interface EnrichedItem extends Item {
  /**
   * 사용처 타입 목록
   * ['레시피', '교환', '구매', '제작', '교환으로 얻을 수 있음']
   */
  usageTypes: string[]

  /**
   * 교환에 필요한 정보
   */
  requiredForTrades: Array<{
    tradeId: string
    npcName: string
    locationName: string
    receiveItemName: string
    receiveQuantity: number
    giveQuantity: number
  }>

  /**
   * 교환으로 얻을 수 있는 정보
   */
  obtainableFromTrades: Array<{
    id: string
    npcName: string
    locationName: string
    giveItemName: string
    giveQuantity: number
    receiveQuantity: number
  }>

  /**
   * 요리 레시피 (이 아이템을 결과물로 하는)
   */
  cookingRecipes: Recipe[]

  /**
   * 요리 재료로 사용되는 레시피
   */
  usedInCookingRecipes: Array<{
    recipeId: string
    recipeName: string
    resultItemName: string
    resultQuantity: number
    quantity: number
  }>

  /**
   * 가공 레시피 (이 아이템을 결과물로 하는)
   */
  processingRecipes: Recipe[]

  /**
   * 가공 재료로 사용되는 레시피
   */
  usedInProcessingRecipes: Array<{
    recipeId: string
    recipeName: string
    resultItemName: string
    resultQuantity: number
    quantity: number
    category: string
  }>

  /**
   * 제작 레시피 (이 아이템을 결과물로 하는)
   */
  craftingRecipes: Recipe[]

  /**
   * 제작 재료로 사용되는 레시피
   */
  usedInCraftingRecipes: Array<{
    recipeId: string
    recipeName: string
    resultItemName: string
    resultQuantity: number
    quantity: number
    category: string
  }>
}

