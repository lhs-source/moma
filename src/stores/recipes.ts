import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { recipes } from '@/data/recipes'
import type { Recipe } from '@/data/schemas/recipe'

export const useRecipesStore = defineStore('recipes', () => {
  const recipeList = ref<Recipe[]>([])

  /**
   * 레시피 리스트를 파일로부터 가져온다
   */
  function fetchRecipeList() {
    recipeList.value = recipes
  }

  /**
   * 레시피 리스트에서 레시피를 id로 찾는다
   */
  function getRecipeById(id: string): Recipe | undefined {
    return recipeList.value.find((recipe) => recipe.id === id)
  }

  /**
   * 결과 아이템 ID로 레시피를 찾는다
   */
  function getRecipeByResultItemId(itemId: string): Recipe | undefined {
    return recipeList.value.find((recipe) => recipe.resultItemId === itemId)
  }

  /**
   * 카테고리별로 레시피를 그룹화
   */
  const recipesByCategory = computed(() => {
    const grouped: Record<string, Recipe[]> = {}
    
    recipeList.value.forEach(recipe => {
      const category = recipe.craftingCategory || recipe.category || '기타'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(recipe)
    })
    
    return grouped
  })

  /**
   * 모든 카테고리 목록
   */
  const categories = computed(() => {
    return Object.keys(recipesByCategory.value).sort()
  })

  /**
   * 특정 아이템을 재료로 사용하는 레시피들
   */
  function getRecipesUsingItem(itemId: string): Recipe[] {
    return recipeList.value.filter(recipe => 
      recipe.requiredItems.some(item => item.itemId === itemId)
    )
  }

  return {
    recipeList,
    recipesByCategory,
    categories,
    fetchRecipeList,
    getRecipeById,
    getRecipeByResultItemId,
    getRecipesUsingItem
  }
})
