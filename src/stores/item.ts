import { items } from '@/data/items'
import { ITEM_CATEGORY, type Item } from '@/data/schemas/item'
import type { EnrichedItem } from '@/data/schemas/enrichedItem'
import { recipes } from '@/data/recipes'
import { trades } from '@/data/trade'
import { npcs } from '@/data/npcs'
import { locations } from '@/data/locations'
import { RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useItemStore = defineStore('item', () => {
  const itemList = ref<Item[]>([])
  const enrichedItemList = ref<EnrichedItem[]>([])

  /**
   * 아이템 리스트를 파일로부터 가져오고 enriched 데이터를 생성한다
   */
  function fetchItemList() {
    itemList.value = items
    enrichedItemList.value = enrichItems(items)
  }

  /**
   * 아이템에 사용처 정보를 추가하여 EnrichedItem으로 변환
   */
  function enrichItems(itemsToEnrich: Item[]): EnrichedItem[] {
    return itemsToEnrich.map(item => enrichItem(item))
  }

  /**
   * 개별 아이템을 EnrichedItem으로 변환
   */
  function enrichItem(item: Item): EnrichedItem {
    const usage = itemUsageIndex.getItemUsage(item.id)
    
    // 교환에 필요한 정보
    const requiredForTrades = usage?.usageTypes.trades.map(trade => ({
      tradeId: trade.tradeId,
      npcName: trade.npcName,
      locationName: trade.locationName,
      receiveItemName: trade.receiveItemName,
      receiveQuantity: trade.receiveQuantity,
      giveQuantity: trade.giveQuantity
    })) || []

    // 교환으로 얻을 수 있는 정보
    const obtainableFromTrades = trades
      .filter(trade => trade.receiveItemId === item.id && trade.isEnabled)
      .map(trade => {
        const npc = npcs.find(n => n.id === trade.npcId)
        const location = locations.find(l => l.id === npc?.locationId)
        const giveItem = items.find(i => i.id === trade.giveItemId)

        return {
          id: trade.id,
          npcName: npc?.name || '알 수 없음',
          locationName: location?.name || '알 수 없음',
          giveItemName: giveItem?.name || trade.giveItemId,
          giveQuantity: trade.giveQuantity,
          receiveQuantity: trade.receiveQuantity
        }
      })

    // 요리 레시피
    const cookingRecipes = recipes.filter(
      recipe => recipe.resultItemId === item.id && recipe.category === RECIPE_CATEGORY.COOK
    )

    // 요리 재료로 사용
    const usedInCookingRecipes = usage?.usageTypes.recipes
      .filter(r => {
        const recipe = recipes.find(rec => rec.id === r.recipeId)
        return recipe?.category === RECIPE_CATEGORY.COOK
      })
      .map(r => ({
        recipeId: r.recipeId,
        recipeName: r.recipeName || '',
        resultItemName: r.resultItemName,
        resultQuantity: r.resultQuantity,
        quantity: r.quantity
      })) || []

    // 가공 레시피
    const processingRecipes = recipes.filter(
      recipe => recipe.resultItemId === item.id && (
        recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
        recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
        recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
        recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
        recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE
      )
    )

    // 가공 재료로 사용
    const usedInProcessingRecipes = recipes
      .filter(recipe => 
        (recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
         recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
         recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
         recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
         recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE) &&
        recipe.requiredItems.some(material => material.itemId === item.id)
      )
      .map(recipe => {
        const material = recipe.requiredItems.find(m => m.itemId === item.id)!
        const resultItem = items.find(i => i.id === recipe.resultItemId)
        return {
          recipeId: recipe.id,
          recipeName: recipe.name,
          resultItemName: resultItem?.name || recipe.resultItemId,
          resultQuantity: recipe.resultQuantity || 1,
          quantity: material.quantity,
          category: recipe.category
        }
      })

    // 제작 레시피
    const craftingRecipes = recipes.filter(
      recipe => recipe.resultItemId === item.id && 
        recipe.category === RECIPE_CATEGORY.CRAFTING_ITEM
    )

    // 제작 재료로 사용
    const usedInCraftingRecipes = recipes
      .filter(recipe => 
        recipe.category === RECIPE_CATEGORY.CRAFTING_ITEM &&
        recipe.requiredItems.some(material => material.itemId === item.id)
      )
      .map(recipe => {
        const material = recipe.requiredItems.find(m => m.itemId === item.id)!
        const resultItem = items.find(i => i.id === recipe.resultItemId)
        return {
          recipeId: recipe.id,
          recipeName: recipe.name,
          resultItemName: resultItem?.name || recipe.resultItemId,
          resultQuantity: recipe.resultQuantity || 1,
          quantity: material.quantity,
          category: recipe.category
        }
      })

    // 사용처 타입 목록 생성
    const usageTypes: string[] = []
    if (usage?.usageTypes.recipes.length) usageTypes.push('레시피')
    if (usage?.usageTypes.trades.length) usageTypes.push('교환')
    if (usage?.usageTypes.purchases.length) usageTypes.push('구매')
    if (cookingRecipes.length > 0 || processingRecipes.length > 0 || craftingRecipes.length > 0) {
      usageTypes.push('제작')
    }
    if (obtainableFromTrades.length > 0) usageTypes.push('교환으로 얻을 수 있음')

    return {
      ...item,
      usageTypes,
      requiredForTrades,
      obtainableFromTrades,
      cookingRecipes,
      usedInCookingRecipes,
      processingRecipes,
      usedInProcessingRecipes,
      craftingRecipes,
      usedInCraftingRecipes
    }
  }

  /**
   * 아이템 리스트에서 아이템을 id로 찾는다
   */
  function getItemById(id: string): Item | undefined {
    return itemList.value.find((item) => item.id === id)
  }

  /**
   * 아이템 이름으로 검색
   */
  function searchItems(query: string): Item[] {
    if (!query.trim()) return itemList.value
    
    const lowerQuery = query.toLowerCase()
    return itemList.value.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.id.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * 카테고리별로 아이템을 그룹화 (EnrichedItem 사용)
   */
  const itemsByCategory = computed(() => {
    const grouped: Record<string, EnrichedItem[]> = {}
    
    enrichedItemList.value.forEach(item => {
      const category = item.category || '기타'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(item)
    })
    
    return grouped
  })

  /**
   * 모든 카테고리 목록
   * - ITEM_CATEGORY 를 목록으로 변환 
   */
  const categories = computed(() => {
    return Object.values(ITEM_CATEGORY).sort()
  })

  /**
   * 필터링된 아이템 목록 (EnrichedItem 반환)
   */
  function getFilteredItems(filters: {
    searchQuery?: string
    category?: string
    usageType?: string
  }): EnrichedItem[] {
    let filtered = enrichedItemList.value

    // 검색어 필터
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      )
    }

    // 카테고리 필터
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    // 사용처 필터
    if (filters.usageType) {
      filtered = filtered.filter(item => item.usageTypes.includes(filters.usageType!))
    }

    return filtered
  }

  /**
   * ID로 EnrichedItem 조회
   */
  function getEnrichedItemById(id: string): EnrichedItem | undefined {
    return enrichedItemList.value.find(item => item.id === id)
  }

  return {
    itemList,
    enrichedItemList,
    itemsByCategory,
    categories,
    fetchItemList,
    getItemById,
    getEnrichedItemById,
    searchItems,
    getFilteredItems
  }
})
