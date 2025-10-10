export interface CraftingMaterial {
  itemId: string
  quantity: number
}

// 식재료 등 카테고리 구분을 위한 열거형
// 최소 변경을 위해 현재는 식재료만 정의하고, 나머지는 기존 문자열 값을 유지합니다.
export enum ITEM_CATEGORY {
  EQUIPMENT = '장비',
  RUNE = '룬',
  SCROLL = '스크롤',
  TOOL = '도구',
  FOOD_INGREDIENT = '식재료',
  MATERIAL = '재료',
  FOOD = '음식',
  CONSUMABLE = '소모품',
  POTION = '물약',
  CURRENCY = '통화',
  OTHER = '기타',
}

export interface Item {
  id: string
  name: string
  imageUrl: string
  description?: string
  category?: string // 아이템 카테고리 (예: 재료, 완성품 등)
} 