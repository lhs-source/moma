export interface RequiredItem {
  itemId: string
  quantity: number
}

export interface Recipe {
  id: string
  name: string
  resultItemId: string
  requiredItems: RequiredItem[]
  category: '간편' | '힘 특화' | '솜씨 특화' | '지력 특화' | '기타' | '쉐어링'
  facilityLevel: number
} 