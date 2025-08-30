
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
 * - 드랍: 몬스터 드랍
 */
export enum RECIPE_CATEGORY {
  COOK = '요리',
  PROCESS = '가공',
  BUY = '구매',
  DROP = '드랍',
}

/**
 * # 레시피
 * - 요리, 구매, 드랍
 * - 요리는 requiredItems 에 필요 아이템을 가짐
 * - 구매는 requiredItems 에 골드와 가격을 가짐
 * - 드랍은 requiredItems 에 몬스터 아이디와 개수를 가짐
 */
export interface Recipe {
  id: string;
  name: string;
  resultItemId: string;
  resultQuantity?: number;
  requiredItems: RequiredItem[];
  category: RECIPE_CATEGORY;
  facilityLevel: number;
}