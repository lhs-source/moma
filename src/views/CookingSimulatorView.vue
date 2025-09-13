<template>
  <div class="h-screen flex flex-col overflow-hidden bg-background wrapper">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 bg-card border-b border-border flex-shrink-0 shadow-sm">
      <h1 class="text-lg font-bold text-foreground">요리 시뮬레이팅</h1>
      <div class="flex flex-col sm:flex-row gap-1 items-center">
        <label class="text-xs text-muted-foreground">주간 획득 한도 입력</label>
      </div>
    </div>

    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 overflow-hidden main-container">
      <!-- 왼쪽 열: 요리 목록 -->
      <div class="border border-border rounded bg-card flex flex-col overflow-hidden shadow-sm column-container">
        <div class="p-1 border-b border-border flex-shrink-0 bg-muted/50">
          <div class="flex gap-1 items-center">
            <input v-model="searchQuery" type="text" placeholder="요리 이름 검색..."
              class="px-1 py-1 border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent w-full text-xs bg-background text-foreground" />
            <select v-model="selectedFacilityLevel"
              class="px-1 py-1 border border-input rounded text-xs bg-background text-foreground">
              <option value="">모든 레벨</option>
              <option v-for="level in facilityLevels" :key="level" :value="level">Lv.{{ level }}</option>
            </select>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-1 min-h-0 scroll-container">
          <RecipeGrid :recipes="filteredRecipes" :selected-counts="selectedCounts" :get-item-name="getItemName"
            :get-item-image-url="getItemImageUrl" :handle-image-error="handleImageError"
            @change-count="onChangeCount" />
        </div>
      </div>

      <!-- 오른쪽 열: 필요 재료 및 비용 -->
      <div class="border border-border rounded bg-card flex flex-col overflow-hidden shadow-sm column-container">
        <div class="p-1 border-b border-border flex-shrink-0 bg-muted/50">
          <h2 class="text-sm font-bold text-foreground">필요 재료 및 비용</h2>
        </div>

        <div class="flex-1 overflow-y-auto p-1 space-y-1 min-h-0 scroll-container">
          <div>
            <h3 class="text-xs font-semibold text-muted-foreground mb-1">선택한 총 제작 요리 목록</h3>
            <SelectedRecipeList :recipes="selectedRecipes" :selected-counts="selectedCounts"
              :get-item-image-url="getItemImageUrl" :handle-image-error="handleImageError" @remove="removeSelected" />
          </div>

          <MaterialsSummary :selected-counts="selectedCounts" :recipes-grouped="recipesGrouped" :items="items" />

          <WeeklyBuyableGrid :items="allBuyableFoodIngredients" :get-item-name="getItemName"
            :get-item-image-url="getItemImageUrl" :handle-image-error="handleImageError" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  selectedCounts.value[id] = count
}

function removeSelected(recipeId: string) {
  selectedCounts.value[recipeId] = 0
}

// 페이지 스크롤 방지
onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})
</script>

<style scoped>
/* CSS 변수 정의 */
:root {}

.wrapper {
  --header-height: 120px;
  --column-header-height: 100px;
  --padding: 16px;
  --main-max-height: calc(100vh - var(--header-height) - var(--padding));
  --scroll-max-height: calc(100vh - var(--header-height) - var(--column-header-height) - var(--padding));
}

/* 메인 컨테이너 */
.main-container {
  max-height: var(--main-max-height);
}

/* 각 열 컨테이너 */
.column-container {
  max-height: var(--main-max-height);
}

/* 스크롤 컨테이너 */
.scroll-container {
  max-height: var(--scroll-max-height);
}

/* 스크롤바 스타일링 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: hsl(var(--muted));
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* 전체 페이지 스크롤 방지 */
:deep(body) {
  overflow: hidden !important;
}

:deep(html) {
  overflow: hidden !important;
}
</style>
