export interface NPC {
  id: string
  name: string
  location: string
  imageUrl: string
}

export interface Item {
  id: string
  name: string
  imageUrl: string
  description: string
  isCraftable: boolean
  category: string
}

export interface Trade {
  id: string
  npcId: string
  giveItemId: string
  receiveItemId: string
  giveQuantity: number
  receiveQuantity: number
  type: 'daily' | 'weekly'
  scope: 'account' | 'character'
  maxExchanges: number
  isEnabled: boolean
} 