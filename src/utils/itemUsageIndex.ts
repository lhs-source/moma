import { items } from '../data/items'
import { recipes } from '../data/recipes'
import { trades } from '../data/trade'
import { purchaseData } from '../data/purchase'
import { npcs } from '../data/npcs'
import { locations } from '../data/locations'

export interface ItemUsage {
  itemId: string
  usageTypes: {
    recipes: RecipeUsage[]
    trades: TradeUsage[]
    purchases: PurchaseUsage[]
    // TODO: 드랍 정보는 현재 데이터에 없어서 추후 추가 가능
  }
}

export interface RecipeUsage {
  recipeId: string
  recipeName: string
  quantity: number
  resultQuantity: number
  resultItemName: string
}

export interface TradeUsage {
  tradeId: string
  npcId: string
  npcName: string
  locationName: string
  giveQuantity: number
  receiveQuantity: number
  receiveItemName: string
  type: string
}

export interface PurchaseUsage {
  npcId: string
  locationName: string
  price: number
  isCollectible: boolean
}

class ItemUsageIndexClass {
  private usageIndex: Map<string, ItemUsage> = new Map()
  private recipeByResultIndex: Map<string, string[]> = new Map()
  private recipeByMaterialIndex: Map<string, string[]> = new Map()

  constructor() {
    this.buildIndex()
  }

  private buildIndex() {
    // 모든 아이템에 대해 빈 사용처 객체 초기화
    items.forEach(item => {
      this.usageIndex.set(item.id, {
        itemId: item.id,
        usageTypes: {
          recipes: [],
          trades: [],
          purchases: []
        }
      })
    })

    // 레시피 인덱스 구축
    this.buildRecipeIndex()
    
    // 교환 인덱스 구축
    this.buildTradeIndex()
    
    // 구매 인덱스 구축
    this.buildPurchaseIndex()
  }

  private buildRecipeIndex() {
    recipes.forEach(recipe => {
      // 결과물 인덱스
      const resultItemUsage = this.usageIndex.get(recipe.resultItemId)
      if (resultItemUsage) {
        // 이 아이템을 결과물로 만드는 레시피가 있다는 의미
        if (!this.recipeByResultIndex.has(recipe.resultItemId)) {
          this.recipeByResultIndex.set(recipe.resultItemId, [])
        }
        this.recipeByResultIndex.get(recipe.resultItemId)?.push(recipe.id)
      }

      // 재료 인덱스 - 이 아이템이 어떤 레시피의 재료로 사용되는지
      recipe.requiredItems.forEach(material => {
        const materialUsage = this.usageIndex.get(material.itemId)
        if (materialUsage) {
          // 결과 아이템 이름 찾기
          const resultItem = items.find(item => item.id === recipe.resultItemId)
          const resultItemName = resultItem ? resultItem.name : recipe.resultItemId
          
          materialUsage.usageTypes.recipes.push({
            recipeId: recipe.id,
            recipeName: recipe.name,
            quantity: material.quantity,
            resultQuantity: recipe.resultQuantity || 1,
            resultItemName: resultItemName
          })
        }

        // 재료별 레시피 인덱스
        if (!this.recipeByMaterialIndex.has(material.itemId)) {
          this.recipeByMaterialIndex.set(material.itemId, [])
        }
        this.recipeByMaterialIndex.get(material.itemId)?.push(recipe.id)
      })
    })
  }

  private buildTradeIndex() {
    trades.forEach(trade => {
      // 주는 아이템 (소모되는 아이템)
      const giveItemUsage = this.usageIndex.get(trade.giveItemId)
      if (giveItemUsage) {
        // NPC 정보 찾기
        const npc = npcs.find(n => n.id === trade.npcId)
        const npcName = npc ? npc.name : trade.npcId
        
        // 지역 정보 찾기
        const location = npc ? locations.find(l => l.id === npc.locationId) : undefined
        const locationName = location ? location.name : '알 수 없음'
        
        // 받는 아이템 이름 찾기
        const receiveItem = items.find(item => item.id === trade.receiveItemId)
        const receiveItemName = receiveItem ? receiveItem.name : trade.receiveItemId
        
        giveItemUsage.usageTypes.trades.push({
          tradeId: trade.id,
          npcId: trade.npcId,
          npcName: npcName,
          locationName: locationName,
          giveQuantity: trade.giveQuantity,
          receiveQuantity: trade.receiveQuantity,
          receiveItemName: receiveItemName,
          type: trade.type
        })
      }

      // 받는 아이템은 사용처가 아니라 획득처이므로 여기서는 제외
    })
  }

  private buildPurchaseIndex() {
    purchaseData.npcs.forEach(npc => {
      npc.items.forEach(item => {
        const itemUsage = this.usageIndex.get(item.itemId)
        if (itemUsage) {
          itemUsage.usageTypes.purchases.push({
            npcId: npc.npcId,
            locationName: npc.locationName,
            price: item.price,
            isCollectible: item.isCollectible
          })
        }
      })
    })
  }

  // 아이템의 모든 사용처 반환
  getItemUsage(itemId: string): ItemUsage | undefined {
    return this.usageIndex.get(itemId)
  }

  // 아이템이 재료로 사용되는 레시피들 반환
  getRecipesByMaterial(itemId: string): string[] {
    return this.recipeByMaterialIndex.get(itemId) || []
  }

  // 아이템을 결과물로 만드는 레시피들 반환
  getRecipesByResult(itemId: string): string[] {
    return this.recipeByResultIndex.get(itemId) || []
  }

  // 아이템이 사용되는 모든 곳의 개수 반환
  getUsageCount(itemId: string): number {
    const usage = this.getItemUsage(itemId)
    if (!usage) return 0
    
    return usage.usageTypes.recipes.length + 
           usage.usageTypes.trades.length + 
           usage.usageTypes.purchases.length
  }

  // 아이템의 사용처 타입들 반환 (빠른 확인용)
  getUsageTypes(itemId: string): string[] {
    const usage = this.getItemUsage(itemId)
    if (!usage) return []

    const types: string[] = []
    if (usage.usageTypes.recipes.length > 0) types.push('레시피')
    if (usage.usageTypes.trades.length > 0) types.push('교환')
    if (usage.usageTypes.purchases.length > 0) types.push('구매')
    
    return types
  }
}

// 싱글톤 인스턴스 생성
export const itemUsageIndex = new ItemUsageIndexClass()
