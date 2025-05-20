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
  category: '간편' | '힘 특화' | '솜씨 특화' | '지력 특화' | '기타' | '쉐어링'
  facilityLevel: number
  type?: string // 선택적 필드: 레시피 타입 (예: '쉐어링')
}