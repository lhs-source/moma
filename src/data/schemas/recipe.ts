
/**
 * # 필요 아이템
 */
export interface RequiredItem {
  itemId: string;
  quantity: number;
  rate?: number; // 드랍률 (RECIPE_CATEGORY.DROP 인 경우에만 사용)
  buyNpcId?: string; // 구매 레시피인 경우 판매하는 NPC의 ID
}

/**
 * # 레시피 카테고리
 * - 요리: 요리 레시피
 * - 구매: 구매. 골드로
 * - 채집: 채집. 몬스터 채집
 * - 드랍: 몬스터 드랍
 * - 가공: 제작 레시피 (세분화)
 */
export enum RECIPE_CATEGORY {
  COOK = '요리',
  PROCESS_METAL = '금속 가공',
  PROCESS_WOOD = '목재 가공',
  PROCESS_LEATHER = '가죽 가공',
  PROCESS_FABRIC = '옷감 가공',
  PROCESS_ITEM = '아이템 제작',
  BUY = '구매',
  GATHER = '채집',
  DROP = '드랍',
  TRADE = '교환',
}

/**
 * # 레시피
 * - 요리, 구매, 드랍, 가공
 * - 요리는 requiredItems 에 필요 아이템을 가짐
 * - 구매는 requiredItems 에 골드와 가격을 가짐
 * - 드랍은 requiredItems 에 몬스터 아이디와 개수를 가짐
 * - 가공은 requiredItems 에 필요 재료를 가짐
 */
export interface Recipe {
  id: string;
  name: string;
  resultItemId: string;
  resultQuantity?: number;
  requiredItems: RequiredItem[];
  category: RECIPE_CATEGORY;
  facilityLevel: number;
  // 제작 시스템 전용 필드
  craftingTime?: number; // 제작 시간 (초)
}

/**
 * # 결과 아이템별 레시피 그룹
 * - 같은 결과 아이템(resultItemId)을 만드는 여러 방법(구매/요리/드랍 등)을 하나로 묶음
 */
export interface RecipeGroup {
  resultItemId: string;
  recipeList: Recipe[];
}