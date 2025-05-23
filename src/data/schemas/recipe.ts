export interface RequiredItem {
  itemId: string
  quantity: number
}

export interface Recipe {
  id: string
  name: string
  resultItemId: string
  resultQuantity?: number // 선택적 필드: 결과물의 수량 (기본값은 1)
  requiredItems: RequiredItem[]
  category: string;
  facilityLevel: number
  type?: string // 선택적 필드: 레시피 타입 (예: '쉐어링')
}