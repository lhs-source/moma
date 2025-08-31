<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold">요리 시뮬레이팅</h1>
      <div class="flex flex-col sm:flex-row gap-2 items-center">
        <label class="text-sm text-gray-600">주간 획득 한도 입력</label>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="border border-gray-200 rounded-lg p-4 bg-white">
        <div class="flex gap-2 items-center mb-4">
          <input v-model="searchQuery" type="text" placeholder="요리 이름 검색..."
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full" />
          <select v-model="selectedFacilityLevel" class="px-3 py-2 border border-gray-300 rounded-md">
            <option value="">모든 레벨</option>
            <option v-for="level in facilityLevels" :key="level" :value="level">Lv.{{ level }}</option>
          </select>
        </div>

        <RecipeGrid :recipes="filteredRecipes" :selected-counts="selectedCounts" :get-item-name="getItemName"
          :get-item-image-url="getItemImageUrl" :handle-image-error="handleImageError" @change-count="onChangeCount" />
      </div>

      <div class="border border-gray-200 rounded-lg p-4 bg-white">
        <h2 class="text-xl font-bold mb-3">필요 재료 및 비용</h2>

        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-1">선택한 총 제작 요리 목록</h3>
          <SelectedRecipeList :recipes="selectedRecipes" :selected-counts="selectedCounts"
            :get-item-image-url="getItemImageUrl" :handle-image-error="handleImageError" @remove="removeSelected" />
        </div>

        <MaterialsSummary :selected-counts="selectedCounts" :recipes-grouped="recipesGrouped" :items="items" />

        <WeeklyBuyableGrid :items="allBuyableFoodIngredients" :get-item-name="getItemName"
          :get-item-image-url="getItemImageUrl" :handle-image-error="handleImageError" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RecipeGrid from '@/components/cooking/RecipeGrid.vue'
import SelectedRecipeList from '@/components/cooking/SelectedRecipeList.vue'
import MaterialsSummary from '@/components/cooking/MaterialsSummary.vue'
import WeeklyBuyableGrid from '@/components/cooking/WeeklyBuyableGrid.vue'
import { recipesGrouped } from '@/data/recipes'
import { items } from '@/data/items'
import type { Recipe } from '@/data/schemas/recipe'
import { RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { ITEM_CATEGORY } from '@/data/schemas/item'

const searchQuery = ref('')
const selectedFacilityLevel = ref('')
const selectedCounts = ref<Record<string, number>>({})

// 그룹에서 요리 레시피만 평탄화
const cookRecipesFlat = computed<Recipe[]>(() => {
  const list: Recipe[] = []
  recipesGrouped.forEach(g => {
    g.recipeList.forEach(r => { if (r.category === RECIPE_CATEGORY.COOK) list.push(r) })
  })
  return list
})

const facilityLevels = computed(() => {
  const set = new Set<number>()
  cookRecipesFlat.value.forEach(r => set.add(r.facilityLevel))
  return Array.from(set).sort((a, b) => a - b)
})

const filteredRecipes = computed<Recipe[]>(() => {
  return cookRecipesFlat.value.filter(r => {
    const matchName = !searchQuery.value || r.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchLevel = !selectedFacilityLevel.value || r.facilityLevel?.toString() === selectedFacilityLevel.value
    return matchName && matchLevel
  })
})

const selectedRecipes = computed<Recipe[]>(() => {
  const ids = new Set(Object.keys(selectedCounts.value).filter(id => selectedCounts.value[id] > 0))
  return cookRecipesFlat.value.filter(r => ids.has(r.id))
})

// 구매 가능한 레시피 목록 계산
const buyableRecipes = computed<Recipe[]>(() => {
  const list: Recipe[] = []
  recipesGrouped.forEach(g => {
    g.recipeList.forEach(r => { if (r.category === RECIPE_CATEGORY.BUY) list.push(r) })
  })
  return list
})

// 구매 가능한 모든 식재료와 각 NPC별 구매 가능 횟수 계산 (레시피 기반)
const allBuyableFoodIngredients = computed(() => {
  const itemBuyCounts: Record<string, {
    itemId: string,
    totalBuyableCount: number,
    npcCounts: Record<string, number>,
    recipes: Array<{ id: string, name: string, price: number, npcId: string }>
  }> = {}

  buyableRecipes.value.forEach(recipe => {
    const goldItem = recipe.requiredItems.find(ri => ri.itemId === 'gold' && ri.buyNpcId)
    if (!goldItem || !goldItem.buyNpcId) return

    const resultItemId = recipe.resultItemId
    const item = items.find(i => i.id === resultItemId)

    // 식재료 카테고리 또는 재료 카테고리인 경우 포함
    if (item && (item.category === ITEM_CATEGORY.FOOD_INGREDIENT || item.category === '재료')) {
      if (!itemBuyCounts[resultItemId]) {
        itemBuyCounts[resultItemId] = {
          itemId: resultItemId,
          totalBuyableCount: 0,
          npcCounts: {},
          recipes: []
        }
      }

      // 각 NPC별로 주간 30개 제한 (중복 NPC는 한 번만 계산)
      if (!itemBuyCounts[resultItemId].npcCounts[goldItem.buyNpcId]) {
        const npcBuyableCount = 30
        itemBuyCounts[resultItemId].npcCounts[goldItem.buyNpcId] = npcBuyableCount
        itemBuyCounts[resultItemId].totalBuyableCount += npcBuyableCount
      }

      // 레시피 정보 추가
      itemBuyCounts[resultItemId].recipes.push({
        id: recipe.id,
        name: recipe.name,
        price: goldItem.quantity,
        npcId: goldItem.buyNpcId
      })
    }
  })

  return Object.values(itemBuyCounts).sort((a, b) =>
    getItemName(a.itemId).localeCompare(getItemName(b.itemId))
  )
})

function getItemName(itemId: string) {
  const it = items.find(i => i.id === itemId)
  return it ? it.name : itemId
}

function getItemImageUrl(itemId: string) {
  const it = items.find(i => i.id === itemId)
  return it ? it.imageUrl : '/images/items/default.webp'
}

function handleImageError(e: Event) {
  const t = e.target as HTMLImageElement
  t.src = '/images/items/default.webp'
}

function onChangeCount(id: string, count: number) {
  const n = Math.max(0, Number(count) || 0)
  selectedCounts.value[id] = n
}

function removeSelected(id: string) {
  selectedCounts.value[id] = 0
}

// 합산 계산은 MaterialsSummary 컴포넌트로 이동

// findRecipeById: 세부 합산 로직은 MaterialsSummary 컴포넌트에서 처리

// 통화 포맷 등 표시 로직은 MaterialsSummary 쪽으로 이동
</script>

<style scoped></style>
