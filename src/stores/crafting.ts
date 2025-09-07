import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { craftingRecipesByCategory, craftingCategories } from '@/data/crafting'
import type { Recipe } from '@/data/schemas/recipe'

interface SelectedItem {
  recipe: Recipe
  quantity: number // 제작 횟수
}

interface SelectedItems {
  [recipeId: string]: SelectedItem
}

export const useCraftingStore = defineStore('crafting', () => {
  // State
  const selectedItems = ref<SelectedItems>({})
  const selectedCategory = ref<string | null>(null)
  const isMembershipEnabled = ref(false) // 멤버십 활성화 상태

  // Getters
  const recipesByCategory = computed(() => {
    return craftingRecipesByCategory()
  })
  
  const categories = computed(() => {
    return craftingCategories
  })
  
  const selectedCategoryRecipes = computed(() => {
    if (!selectedCategory.value) return []
    return recipesByCategory.value[selectedCategory.value] || []
  })
  
  const totalMaterials = computed(() => {
    const totalMaterials: Record<string, number> = {}
    
    // 각 선택된 아이템별로 필요 재료 계산
    for (const selectedItem of Object.values(selectedItems.value)) {
      const { recipe, quantity } = selectedItem
      
      // 각 재료별 필요량 계산
      for (const requiredItem of recipe.requiredItems) {
        const neededAmount = requiredItem.quantity * quantity
        
        if (!totalMaterials[requiredItem.itemId]) {
          totalMaterials[requiredItem.itemId] = 0
        }
        totalMaterials[requiredItem.itemId] += neededAmount
      }
    }
    
    return totalMaterials
  })
  
  const categoryTimes = computed(() => {
    const categoryTimes: Record<string, number> = {}
    
    // 각 선택된 아이템별로 제작 시간 계산
    for (const selectedItem of Object.values(selectedItems.value)) {
      const { recipe, quantity } = selectedItem
      const category = recipe.craftingCategory || 'Unknown'
      
      if (!categoryTimes[category]) {
        categoryTimes[category] = 0
      }
      
      // 해당 아이템의 총 제작 시간
      let itemTime = quantity * (recipe.craftingTime || 0)
      
      // 멤버십이 활성화된 경우 시간을 절반으로 줄임
      if (isMembershipEnabled.value) {
        itemTime = Math.ceil(itemTime / 2)
      }
      
      categoryTimes[category] += itemTime
    }
    
    return categoryTimes
  })
  
  const totalTime = computed(() => {
    const times = Object.values(categoryTimes.value)
    return times.length > 0 ? Math.max(...times) : 0
  })
  
  const hasSelectedItems = computed(() => {
    return Object.keys(selectedItems.value).length > 0
  })
  
  const selectedItemsByCategory = computed(() => {
    const grouped: Record<string, SelectedItem[]> = {}
    
    for (const selectedItem of Object.values(selectedItems.value)) {
      const category = selectedItem.recipe.craftingCategory || 'Unknown'
      
      if (!grouped[category]) {
        grouped[category] = []
      }
      
      grouped[category].push(selectedItem)
    }
    
    return grouped
  })

  // Actions
  function selectItem(recipe: Recipe, quantity: number = 1) {
    const existingItem = selectedItems.value[recipe.id]
    
    if (existingItem) {
      existingItem.quantity += quantity
      
      // 0 이하면 삭제
      if (existingItem.quantity <= 0) {
        delete selectedItems.value[recipe.id]
      }
    } else if (quantity > 0) {
      selectedItems.value[recipe.id] = {
        recipe,
        quantity
      }
    }
  }
  
  function setItemQuantity(recipeId: string, quantity: number) {
    const existingItem = selectedItems.value[recipeId]
    if (!existingItem) return
    
    if (quantity <= 0) {
      delete selectedItems.value[recipeId]
    } else {
      existingItem.quantity = quantity
    }
  }
  
  function removeItem(recipeId: string) {
    delete selectedItems.value[recipeId]
  }
  
  function setSelectedCategory(category: string | null) {
    selectedCategory.value = category
  }
  
  function toggleMembership() {
    isMembershipEnabled.value = !isMembershipEnabled.value
  }
  
  function setMembership(enabled: boolean) {
    isMembershipEnabled.value = enabled
  }
  
  function clearSelectedItems() {
    selectedItems.value = {}
  }
  
  function clearCategory(category: string) {
    const itemsToRemove: string[] = []
    
    for (const [recipeId, selectedItem] of Object.entries(selectedItems.value)) {
      if (selectedItem.recipe.craftingCategory === category) {
        itemsToRemove.push(recipeId)
      }
    }
    
    for (const recipeId of itemsToRemove) {
      delete selectedItems.value[recipeId]
    }
  }

  return {
    // State
    selectedItems,
    selectedCategory,
    isMembershipEnabled,
    
    // Getters
    recipesByCategory,
    categories,
    selectedCategoryRecipes,
    totalMaterials,
    categoryTimes,
    totalTime,
    hasSelectedItems,
    selectedItemsByCategory,
    
    // Actions
    selectItem,
    setItemQuantity,
    removeItem,
    setSelectedCategory,
    toggleMembership,
    setMembership,
    clearSelectedItems,
    clearCategory
  }
})