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

        <div class="space-y-3 max-h-[60vh] overflow-auto pr-1">
          <div v-for="recipe in filteredRecipes" :key="recipe.id"
            class="border border-gray-100 rounded p-3 hover:shadow-sm">
            <div class="flex items-start gap-3">
              <img :src="getItemImageUrl(recipe.resultItemId)" :alt="recipe.name" class="w-12 h-12 rounded object-cover"
                @error="handleImageError" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <div class="truncate">
                    <div class="font-semibold">{{ recipe.name }}</div>
                    <div class="text-xs text-gray-500">요리 Lv.{{ recipe.facilityLevel }}</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="number" min="0" class="w-20 px-2 py-1 border rounded"
                      :value="selectedCounts[recipe.id] ?? 0"
                      @input="onChangeCount(recipe.id, ($event.target as HTMLInputElement).value)" />
                  </div>
                </div>
                <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                  <div v-for="ri in recipe.requiredItems" :key="ri.itemId" class="flex items-center gap-2">
                    <img :src="getItemImageUrl(ri.itemId)" :alt="getItemName(ri.itemId)"
                      class="w-5 h-5 rounded object-cover" @error="handleImageError" />
                    <span class="text-gray-700 truncate">{{ getItemName(ri.itemId) }}</span>
                    <span class="ml-auto text-gray-500">x{{ ri.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-4 bg-white">
        <h2 class="text-xl font-bold mb-3">필요 재료 및 비용</h2>

        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-1">선택한 총 제작 요리 목록</h3>
          <div class="space-y-2 max-h-64 overflow-auto pr-1">
            <div v-for="recipe in selectedRecipes" :key="recipe.id"
              class="flex items-center gap-2 p-2 border border-gray-100 rounded">
              <img :src="getItemImageUrl(recipe.resultItemId)" :alt="recipe.name" class="w-8 h-8 rounded object-cover"
                @error="handleImageError" />
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium truncate">{{ recipe.name }}</div>
                <div class="text-xs text-gray-500">요리 Lv.{{ recipe.facilityLevel }}</div>
              </div>
              <div class="text-sm font-semibold text-blue-600">x{{ selectedCounts[recipe.id] ?? 0 }}</div>
            </div>
            <div v-if="selectedRecipes.length === 0" class="text-sm text-gray-500 text-center py-4">
              선택된 요리가 없습니다
            </div>
          </div>
        </div>



        <div class="mb-4">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">주간 한도로 제작 가능한 최대 수량</div>
            <div class="font-bold">{{ maxCraftableCount }}</div>
          </div>
          <div class="text-xs text-gray-500 mt-1">현재 선택한 요리 수량에 필요한 식재료 총합을 주간 한도와 비교하여 계산</div>
        </div>

        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-2">총 필요 식재료</h3>
          <div class="space-y-1 max-h-64 overflow-auto pr-1">
            <div v-for="row in totalNeededRows" :key="row.itemId" class="flex items-center gap-2 text-sm">
              <img :src="getItemImageUrl(row.itemId)" :alt="getItemName(row.itemId)"
                class="w-5 h-5 rounded object-cover" @error="handleImageError" />
              <span class="truncate">{{ getItemName(row.itemId) }}</span>
              <span class="ml-auto">x{{ row.quantity }}</span>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-2">주간 구매 가능 횟수 및 가격</h3>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="item in allBuyableFoodIngredients" :key="item.itemId"
              class="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div class="flex items-center gap-2 mb-2">
                <img :src="getItemImageUrl(item.itemId)" :alt="getItemName(item.itemId)"
                  class="w-6 h-6 rounded object-cover" @error="handleImageError" />
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-800 text-sm truncate">{{ getItemName(item.itemId) }}</div>
                  <div class="text-xs text-gray-600">총 {{ item.totalBuyableCount }}개 구매 가능</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-blue-600">{{ item.totalBuyableCount }}개</div>
                  <div class="text-xs text-gray-500">주간</div>
                </div>
              </div>
              <div class="bg-white rounded p-2 space-y-1">
                <div class="text-xs font-medium text-gray-700 mb-1">구매 방법:</div>
                <div v-for="recipe in item.recipes" :key="recipe.id"
                  class="flex items-center justify-between text-xs border-b border-gray-100 pb-1 last:border-b-0">
                  <div class="flex items-center gap-1 min-w-0">
                    <span class="font-medium truncate">{{ recipe.name }}</span>
                    <span class="text-gray-500">({{ recipe.npcId }})</span>
                  </div>
                  <div class="text-right ml-2">
                    <div class="font-semibold text-green-600">{{ recipe.price }}G</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="allBuyableFoodIngredients.length === 0"
              class="col-span-2 text-sm text-gray-500 text-center py-4">
              구매 가능한 식재료가 없습니다
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { recipes } from '@/data/recipes'
import { items } from '@/data/items'
import type { Recipe } from '@/data/schemas/recipe'
import { RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { ITEM_CATEGORY } from '@/data/schemas/item'

const searchQuery = ref('')
const selectedFacilityLevel = ref('')
const selectedCounts = ref<Record<string, number>>({})
const weeklyLimits = ref<Record<string, number>>({})

const facilityLevels = computed(() => {
  const set = new Set<number>()
  // 요리 레시피만 필터링
  recipes.filter(r => r.category === RECIPE_CATEGORY.COOK).forEach(r => set.add(r.facilityLevel))
  return Array.from(set).sort((a, b) => a - b)
})

const filteredRecipes = computed<Recipe[]>(() => {
  // 요리 레시피만 필터링
  return recipes.filter(r => {
    if (r.category !== RECIPE_CATEGORY.COOK) return false
    const matchName = !searchQuery.value || r.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchLevel = !selectedFacilityLevel.value || r.facilityLevel?.toString() === selectedFacilityLevel.value
    return matchName && matchLevel
  })
})

const selectedRecipes = computed<Recipe[]>(() => {
  return recipes.filter(r => selectedCounts.value[r.id] && selectedCounts.value[r.id] > 0)
})



// 구매 가능한 레시피 목록 계산
const buyableRecipes = computed<Recipe[]>(() => {
  return recipes.filter(r => r.category === RECIPE_CATEGORY.BUY)
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

function onChangeCount(id: string, val: string) {
  const n = Math.max(0, Number(val) || 0)
  selectedCounts.value[id] = n
}

// 합산된 필요 식재료 계산
const totalNeeded = computed<Record<string, number>>(() => {
  const result: Record<string, number> = {}
  for (const [recipeId, count] of Object.entries(selectedCounts.value)) {
    if (!count) continue
    const recipe = recipes.find(r => r.id === recipeId)
    if (!recipe) continue
    recipe.requiredItems.forEach(ri => {
      result[ri.itemId] = (result[ri.itemId] || 0) + ri.quantity * count
    })
  }
  return result
})

const totalNeededRows = computed(() => {
  return Object.entries(totalNeeded.value)
    .map(([itemId, quantity]) => {
      return {
        itemId,
        quantity
      }
    })
    .sort((a, b) => (getItemName(a.itemId) || '').localeCompare(getItemName(b.itemId) || ''))
})

// 주간 한도 비교로 가능한 최대 제작 수 계산
const maxCraftableCount = computed(() => {
  // 필요한 식재료 중 식재료 카테고리 또는 재료 카테고리인 것만 한도로 제한
  const needs = totalNeeded.value
  const ratios: number[] = []
  for (const [itemId, qtyNeeded] of Object.entries(needs)) {
    const it = items.find(i => i.id === itemId)
    if (!it || (it.category !== ITEM_CATEGORY.FOOD_INGREDIENT && it.category !== '재료')) continue

    // 구매 가능한 횟수와 주간 한도를 비교
    const buyableItem = allBuyableFoodIngredients.value.find(b => b.itemId === itemId)
    const buyableCount = buyableItem ? buyableItem.totalBuyableCount : 0
    const weeklyLimit = weeklyLimits.value[itemId] ?? 0
    const totalAvailable = buyableCount + weeklyLimit

    if (qtyNeeded > 0) {
      ratios.push(Math.floor(totalAvailable / qtyNeeded))
    }
  }
  if (ratios.length === 0) return Infinity
  return Math.min(...ratios)
})


</script>

<style scoped></style>
