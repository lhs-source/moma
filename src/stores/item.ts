import { items } from '@/data/items'
import type { Item } from '@/data/schemas/item'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useItemStore = defineStore('item', () => {
  const itemList = ref<Item[]>([])

  /**
   * 아이템 리스트를 파일로부터 가져온다
   */
  function fetchItemList() {
    itemList.value = items
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
   * 카테고리별로 아이템을 그룹화
   */
  const itemsByCategory = computed(() => {
    const grouped: Record<string, Item[]> = {}
    
    itemList.value.forEach(item => {
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
   */
  const categories = computed(() => {
    const categorySet = new Set<string>()
    itemList.value.forEach(item => {
      if (item.category) {
        categorySet.add(item.category)
      }
    })
    return Array.from(categorySet).sort()
  })

  /**
   * 필터링된 아이템 목록
   */
  function getFilteredItems(filters: {
    searchQuery?: string
    category?: string
    usageType?: string
  }) {
    let filtered = itemList.value

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

    // 사용처 필터 (이 부분은 itemUsageIndex와 연동 필요)
    if (filters.usageType) {
      // TODO: itemUsageIndex와 연동하여 구현
    }

    return filtered
  }

  return {
    itemList,
    itemsByCategory,
    categories,
    fetchItemList,
    getItemById,
    searchItems,
    getFilteredItems
  }
})
