import { defineStore } from 'pinia'
import { craftingRecipesByCategory, craftingCategories } from '@/data/crafting'
import type { Recipe } from '@/data/schemas/recipe'

interface SelectedItem {
  recipe: Recipe
  quantity: number // 제작 횟수
}

interface SelectedItems {
  [recipeId: string]: SelectedItem
}

export const useCraftingStore = defineStore('crafting', {
  state: () => ({
    selectedItems: {} as SelectedItems,
    selectedCategory: null as string | null,
    isMembershipEnabled: false, // 멤버십 활성화 상태
  }),
  
  getters: {
    // 카테고리별 레시피 목록
    recipesByCategory(): Record<string, Recipe[]> {
      return craftingRecipesByCategory()
    },
    
    // 카테고리 목록
    categories(): string[] {
      return craftingCategories
    },
    
    // 선택된 카테고리의 레시피 목록
    selectedCategoryRecipes(): Recipe[] {
      if (!this.selectedCategory) return []
      return this.recipesByCategory[this.selectedCategory] || []
    },
    
    // 총 필요 재료를 계산하는 getter
    totalMaterials(): Record<string, number> {
      const totalMaterials: Record<string, number> = {}
      
      // 각 선택된 아이템별로 필요 재료 계산
      for (const selectedItem of Object.values(this.selectedItems)) {
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
    },
    
    // 각 카테고리별 제작 시간을 계산하는 getter
    categoryTimes(): Record<string, number> {
      const categoryTimes: Record<string, number> = {}
      
      // 각 선택된 아이템별로 제작 시간 계산
      for (const selectedItem of Object.values(this.selectedItems)) {
        const { recipe, quantity } = selectedItem
        const category = recipe.craftingCategory || 'Unknown'
        
        if (!categoryTimes[category]) {
          categoryTimes[category] = 0
        }
        
        // 해당 아이템의 총 제작 시간
        let itemTime = quantity * (recipe.craftingTime || 0)
        
        // 멤버십이 활성화된 경우 시간을 절반으로 줄임
        if (this.isMembershipEnabled) {
          itemTime = Math.ceil(itemTime / 2)
        }
        
        categoryTimes[category] += itemTime
      }
      
      return categoryTimes
    },
    
    // 총 제작 시간을 계산하는 getter (모든 카테고리 중 가장 오래 걸리는 시간)
    totalTime(): number {
      const times = Object.values(this.categoryTimes)
      return times.length > 0 ? Math.max(...times) : 0
    },
    
    // 선택된 항목이 있는지 확인하는 getter
    hasSelectedItems(): boolean {
      return Object.keys(this.selectedItems).length > 0
    },
    
    // 카테고리별로 그룹화된 선택된 항목들
    selectedItemsByCategory(): Record<string, SelectedItem[]> {
      const grouped: Record<string, SelectedItem[]> = {}
      
      for (const selectedItem of Object.values(this.selectedItems)) {
        const category = selectedItem.recipe.craftingCategory || 'Unknown'
        
        if (!grouped[category]) {
          grouped[category] = []
        }
        
        grouped[category].push(selectedItem)
      }
      
      return grouped
    }
  },
  
  actions: {
    // 아이템 선택 액션
    selectItem(recipe: Recipe, quantity: number = 1) {
      const existingItem = this.selectedItems[recipe.id]
      
      if (existingItem) {
        existingItem.quantity += quantity
        
        // 0 이하면 삭제
        if (existingItem.quantity <= 0) {
          delete this.selectedItems[recipe.id]
        }
      } else if (quantity > 0) {
        this.selectedItems[recipe.id] = {
          recipe,
          quantity
        }
      }
    },
    
    // 아이템 수량 설정
    setItemQuantity(recipeId: string, quantity: number) {
      const existingItem = this.selectedItems[recipeId]
      if (!existingItem) return
      
      if (quantity <= 0) {
        delete this.selectedItems[recipeId]
      } else {
        existingItem.quantity = quantity
      }
    },
    
    // 아이템 제거
    removeItem(recipeId: string) {
      delete this.selectedItems[recipeId]
    },
    
    // 선택한 카테고리 설정
    setSelectedCategory(category: string | null) {
      this.selectedCategory = category
    },
    
    // 멤버십 상태 토글
    toggleMembership() {
      this.isMembershipEnabled = !this.isMembershipEnabled
    },
    
    // 멤버십 상태 설정
    setMembership(enabled: boolean) {
      this.isMembershipEnabled = enabled
    },
    
    // 선택된 항목 초기화
    clearSelectedItems() {
      this.selectedItems = {}
    },
    
    // 특정 카테고리의 선택된 항목 초기화
    clearCategory(category: string) {
      const itemsToRemove: string[] = []
      
      for (const [recipeId, selectedItem] of Object.entries(this.selectedItems)) {
        if (selectedItem.recipe.craftingCategory === category) {
          itemsToRemove.push(recipeId)
        }
      }
      
      for (const recipeId of itemsToRemove) {
        delete this.selectedItems[recipeId]
      }
    }
  }
})