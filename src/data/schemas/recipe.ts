export interface RequiredItem {
  itemId: string
  quantity: number
}

export interface Recipe {
  id: string
  resultItemId: string
  resultQuantity: number
  requiredItems: RequiredItem[]
  facilityLevel: number
  type: '간편' | '힘 특화' | '솜씨 특화' | '지력 특화' | '기타' | '쉐어링'
} 