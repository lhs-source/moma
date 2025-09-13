<template>
  <div class="border border-border rounded-lg p-3 hover:shadow-md transition-shadow bg-card">
    <!-- 상단: 이미지와 이름 정보 -->
    <div class="flex items-start gap-3 mb-4">
      <img :src="item.imageUrl" :alt="item.name" class="w-16 h-16 object-cover rounded flex-shrink-0"
        @error="handleImageError" />
      <div class="flex-1 min-w-0">
        <div v-if="item.category" class="text-xs text-muted-foreground mb-1">
          {{ item.category }}
        </div>
        <h3 class="font-bold text-base text-foreground">{{ item.name }}</h3>
        <p class="text-xs text-muted-foreground mt-1">ID: {{ item.id }}</p>
      </div>
    </div>

    <!-- 하단: 사용처 정보 -->
    <div class="space-y-3">
      <!-- 사용처 태그 -->
      <div
        v-if="usageTypes.length > 0 || processingRecipes.length > 0 || craftableRecipes.length > 0 || processingRecipeUsage.length > 0">
        <div class="flex flex-wrap gap-1">
          <span v-for="usageType in usageTypes" :key="usageType" :class="{
            'inline-block px-2 py-1 text-xs rounded': true,
            'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200': usageType === '레시피',
            'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200': usageType === '교환',
            'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200': usageType === '구매'
          }">
            {{ usageType }}
          </span>
          <span v-if="processingRecipes.length > 0 || craftableRecipes.length > 0"
            class="inline-block px-2 py-1 text-xs rounded bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200">
            제작
          </span>
          <span v-if="processingRecipeUsage.length > 0"
            class="inline-block px-2 py-1 text-xs rounded bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">
            제작 재료
          </span>
        </div>
      </div>

      <!-- 레시피 사용처 -->
      <div v-if="itemUsage?.usageTypes.recipes.length"
        class="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
        <p class="text-xs font-medium text-foreground mb-2 text-center">재료로 사용되는 레시피</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipeUsage in itemUsage.usageTypes.recipes" :key="recipeUsage.recipeId" class="text-foreground">
              <td class="font-medium text-left pr-2">{{ recipeUsage.resultItemName }} {{ recipeUsage.resultQuantity }}개
              </td>
              <td class="text-muted-foreground text-left w-20">{{ recipeUsage.quantity }}개 필요</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 가공 레시피 사용처 -->
      <div v-if="processingRecipeUsage.length > 0"
        class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
        <p class="text-xs font-medium text-foreground mb-2 text-center">재료로 사용되는 제작 레시피</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipe in processingRecipeUsage" :key="recipe.id" class="text-foreground">
              <td class="font-medium text-left pr-2 min-w-24 max-w-1/2">
                <div>{{ recipe.name }} {{ recipe.resultQuantity || 1 }}개</div>
                <div v-if="recipe.craftingTime" class="text-foreground font-medium">
                  {{ formatTime(recipe.craftingTime) }}
                </div>
                <div v-if="recipe.category" class="text-muted-foreground text-xs">
                  {{ recipe.category }}
                </div>
              </td>
              <td class="text-muted-foreground text-left">
                <span v-for="(material, index) in recipe.requiredItems" :key="material.itemId">
                  {{ getItemName(material.itemId) }} {{ material.quantity }}개{{ index < recipe.requiredItems.length - 1
                    ? ', ' : '' }} </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 교환 사용처 -->
      <div v-if="itemUsage?.usageTypes.trades.length"
        class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
        <p class="text-xs font-medium text-foreground mb-2 text-center">교환에 사용</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="tradeUsage in itemUsage.usageTypes.trades" :key="tradeUsage.tradeId" class="text-foreground">
              <td class="font-medium text-left pr-2 w-30">{{ tradeUsage.npcName }} ({{ tradeUsage.locationName }})</td>
              <td class="text-muted-foreground text-left pr-2 flex-1">{{ tradeUsage.receiveItemName }} {{
                tradeUsage.receiveQuantity }}개</td>
              <td class="text-muted-foreground text-left w-20">{{ tradeUsage.giveQuantity }}개 필요</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 제작 레시피 (카테고리별) -->
      <div v-for="[category, recipes] in craftingCategories" :key="category" :class="getCategoryColors(category)"
        class="rounded-lg p-3 border">
        <p class="text-xs font-medium text-foreground mb-2 text-center">{{ category }}</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipe in recipes" :key="recipe.id" class="text-foreground">
              <td class="font-medium text-left pr-2 min-w-24 max-w-1/2">
                <div>{{ recipe.name }}</div>
                <div v-if="recipe.craftingTime" class="text-foreground font-medium">
                  {{ formatTime(recipe.craftingTime) }}
                </div>
                <div v-if="recipe.category" class="text-muted-foreground text-xs">
                  {{ recipe.category }}
                </div>
                <div v-if="calculateRecipeCost(recipe) > 0" class="text-foreground font-medium">{{
                  calculateRecipeCost(recipe).toLocaleString() }}G</div>
              </td>
              <td class="text-muted-foreground text-left">
                <span v-for="(material, index) in recipe.requiredItems" :key="material.itemId">
                  {{ getItemName(material.itemId) }} {{ material.quantity }}개{{ index < recipe.requiredItems.length - 1
                    ? ', ' : '' }} </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '@/data/schemas/item'
import { items } from '@/data/items'
import { recipes } from '@/data/recipes'
import { purchaseData } from '@/data/purchase'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import { findProcessingRecipesForItem } from '@/utils/recipeDependencyUtils'
import { formatTime } from '@/utils/timeUtils'
import { RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { craftingProcessingRecipes } from '@/data/crafting/processing'
import { craftingItemRecipes } from '@/data/crafting/crafting_item'

const props = defineProps<{
  item: Item
}>()

// 사용처 정보 - 한 번만 계산하고 캐시
const itemUsage = computed(() => {
  return itemUsageIndex.getItemUsage(props.item.id)
})

// 사용처 타입들 - 한 번만 계산하고 캐시
const usageTypes = computed(() => {
  return itemUsageIndex.getUsageTypes(props.item.id)
})

// 가공 레시피들 - 한 번만 계산하고 캐시
const processingRecipes = computed(() => {
  return findProcessingRecipesForItem(props.item.id)
})

// 제작 레시피들 - 한 번만 계산하고 캐시
const craftableRecipes = computed(() => {
  const allRecipes = [...recipes, ...craftingProcessingRecipes, ...craftingItemRecipes]
  return allRecipes.filter(recipe => recipe.resultItemId === props.item.id)
})

// 모든 제작 레시피들을 카테고리별로 그룹화
const allCraftingRecipes = computed(() => {
  // 중복 제거를 위해 Map 사용
  const recipeMap = new Map()

  // processingRecipes와 craftableRecipes를 합치되, 중복 제거
  const allRecipes = [...processingRecipes.value, ...craftableRecipes.value]
  allRecipes.forEach(recipe => {
    recipeMap.set(recipe.id, recipe)
  })

  const uniqueRecipes = Array.from(recipeMap.values())
  const grouped: Record<string, Array<{ id: string; name: string; craftingTime?: number; category: string; requiredItems: Array<{ itemId: string; quantity: number }> }>> = {}

  uniqueRecipes.forEach(recipe => {
    // category를 그대로 사용
    const category = recipe.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(recipe)
  })

  return grouped
})

// 제작 레시피가 있는 카테고리들만 필터링
const craftingCategories = computed(() => {
  return Object.entries(allCraftingRecipes.value).filter(([, recipes]) => recipes.length > 0)
})

// 카테고리별 색상 매핑
const getCategoryColors = (category: string) => {
  const colorMap: Record<string, string> = {
    '금속 가공': 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    '목재 가공': 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    '가죽 가공': 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    '옷감 가공': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    '아이템 제작': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    '요리': 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    '구매': 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    '채집': 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
    '드랍': 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
    '교환': 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800'
  }

  return colorMap[category] || 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
}

// 가공 레시피에서 재료로 사용되는 레시피들
const processingRecipeUsage = computed(() => {
  const allProcessingRecipes = [...craftingProcessingRecipes, ...craftingItemRecipes]
  return allProcessingRecipes.filter(recipe =>
    (recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
      recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
      recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
      recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
      recipe.category === RECIPE_CATEGORY.PROCESS_ITEM) &&
    recipe.requiredItems.some(material => material.itemId === props.item.id)
  )
})

// 제작 비용 계산 (purchaseData에서 가격 찾기)
function calculateRecipeCost(recipe: { requiredItems: Array<{ itemId: string; quantity: number }> }): number {
  return recipe.requiredItems.reduce((total: number, material: { itemId: string; quantity: number }) => {
    // purchaseData에서 해당 아이템의 가격 찾기
    let itemPrice = 0
    for (const npc of purchaseData.npcs) {
      const purchaseItem = npc.items.find(item => item.itemId === material.itemId)
      if (purchaseItem) {
        itemPrice = purchaseItem.price
        break // 첫 번째로 찾은 가격 사용
      }
    }
    return total + (itemPrice * material.quantity)
  }, 0)
}

function getItemName(itemId: string) {
  const item = items.find(i => i.id === itemId)
  return item ? item.name : itemId
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
