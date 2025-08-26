export interface CraftingMaterial {
  itemId: string
  quantity: number
}

// 식재료 등 카테고리 구분을 위한 열거형
// 최소 변경을 위해 현재는 식재료만 정의하고, 나머지는 기존 문자열 값을 유지합니다.
export enum ITEM_CATEGORY {
  FOOD_INGREDIENT = '식재료',
}

export interface Item {
  id: string
  name: string
  imageUrl: string
  description?: string
  craftingRecipe?: CraftingMaterial[] // 재료 아이템들의 ID와 필요 개수
  isCraftable: boolean // 제작 가능 여부
  category?: string // 아이템 카테고리 (예: 재료, 완성품 등)
  isFromTraded: boolean // 교환을 통해 얻을 수 있는 아이템인지 여부
  price?: number // 상점에서 구매할 수 있는 아이템의 가격 (골드)
} 