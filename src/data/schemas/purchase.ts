export interface PurchaseItem {
  itemId: string
  price: number
  isCollectible: boolean // 채집 가능 여부
}

export interface NPCPurchase {
  npcId: string
  locationName: string
  items: PurchaseItem[]
}

export interface PurchaseData {
  npcs: NPCPurchase[]
}
