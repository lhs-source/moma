export interface CraftingMaterial {
  itemId: string
  quantity: number
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
} 