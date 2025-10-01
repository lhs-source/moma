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
        <div class="flex flex-wrap gap-1.5">
          <span v-for="usageType in usageTypes" :key="usageType" :class="{
            'inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border-2': true,
            'bg-slate-50 dark:bg-slate-700 text-slate-950 dark:text-slate-100 border-slate-700 dark:border-slate-500': usageType === '레시피',
            'bg-blue-50 dark:bg-blue-700 text-blue-950 dark:text-blue-100 border-blue-700 dark:border-blue-500': usageType === '교환',
            'bg-emerald-50 dark:bg-emerald-700 text-emerald-950 dark:text-emerald-100 border-emerald-700 dark:border-emerald-500': usageType === '구매',
            'bg-green-50 dark:bg-green-700 text-green-950 dark:text-green-100 border-green-700 dark:border-green-500': usageType === '교환으로 얻을 수 있음'
          }">
            {{ usageType }}
          </span>
          <span v-if="processingRecipes.length > 0 || craftableRecipes.length > 0"
            class="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border-2 bg-yellow-50 dark:bg-yellow-700 text-yellow-950 dark:text-yellow-100 border-yellow-700 dark:border-yellow-500">
            제작
          </span>
          <span v-if="processingRecipeUsage.length > 0"
            class="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border-2 bg-amber-50 dark:bg-amber-700 text-amber-950 dark:text-amber-100 border-amber-700 dark:border-amber-500">
            제작 재료
          </span>
        </div>
      </div>

      <!-- 레시피 사용처 -->
      <div v-if="itemUsage?.usageTypes.recipes.length"
        class="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
        <p class="text-xs font-bold text-slate-950 dark:text-slate-200 mb-3 text-center uppercase tracking-wide">재료로 사용되는 레시피</p>
        <div class="space-y-2">
          <div v-for="recipeUsage in itemUsage.usageTypes.recipes" :key="recipeUsage.recipeId" 
            class="flex justify-between items-center text-xs py-1.5 px-2 rounded hover:bg-slate-50/30 dark:hover:bg-slate-700">
            <span class="font-semibold text-foreground">{{ recipeUsage.resultItemName }} <span class="text-muted-foreground">x{{ recipeUsage.resultQuantity }}</span></span>
            <span class="text-muted-foreground font-medium">{{ recipeUsage.quantity }}개 필요</span>
          </div>
        </div>
      </div>

      <!-- 가공 레시피 사용처 -->
      <div v-if="processingRecipeUsage.length > 0"
        class="bg-amber-100 dark:bg-amber-900 rounded-lg p-3">
        <p class="text-xs font-bold text-amber-950 dark:text-amber-200 mb-3 text-center uppercase tracking-wide">재료로 사용되는 제작 레시피</p>
        <div class="space-y-3">
          <div v-for="recipe in processingRecipeUsage" :key="recipe.id" 
            class="p-2 rounded border border-amber-200 dark:border-amber-800 hover:bg-amber-50/30 dark:hover:bg-amber-800">
            <div class="flex justify-between items-start gap-2">
              <div class="flex-1">
                <div class="font-semibold text-foreground text-xs">{{ recipe.name }} <span class="text-muted-foreground">x{{ recipe.resultQuantity || 1 }}</span></div>
                <div v-if="recipe.craftingTime" class="text-xs text-muted-foreground mt-0.5">
                  ⏱️ {{ formatTime(recipe.craftingTime) }}
                </div>
                <div v-if="recipe.category" class="text-xs text-muted-foreground mt-0.5">
                  📁 {{ recipe.category }}
                </div>
              </div>
              <div class="text-xs text-muted-foreground text-right flex-shrink-0">
                <div v-for="material in recipe.requiredItems" :key="material.itemId">
                  {{ getItemName(material.itemId) }} x{{ material.quantity }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 교환 사용처 -->
      <div v-if="itemUsage?.usageTypes.trades.length"
        class="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
        <p class="text-xs font-bold text-blue-950 dark:text-blue-200 mb-3 text-center uppercase tracking-wide">교환에 사용</p>
        <div class="space-y-2">
          <div v-for="tradeUsage in itemUsage.usageTypes.trades" :key="tradeUsage.tradeId" 
            class="flex justify-between items-center text-xs py-1.5 px-2 rounded hover:bg-blue-50/30 dark:hover:bg-blue-800">
            <div class="flex-1">
              <div class="font-semibold text-foreground">{{ tradeUsage.npcName }}</div>
              <div class="text-muted-foreground text-[10px]">{{ tradeUsage.locationName }}</div>
            </div>
            <div class="flex-1 text-center">
              <span class="text-foreground font-medium">{{ tradeUsage.receiveItemName }} <span class="text-muted-foreground">x{{ tradeUsage.receiveQuantity }}</span></span>
            </div>
            <div class="text-right text-muted-foreground font-medium">
              {{ tradeUsage.giveQuantity }}개 필요
            </div>
          </div>
        </div>
      </div>

      <!-- 교환으로 얻을 수 있는 경우 -->
      <div v-if="obtainableTrades.length > 0"
        class="bg-green-100 dark:bg-green-900 rounded-lg p-3">
        <p class="text-xs font-bold text-green-950 dark:text-green-200 mb-3 text-center uppercase tracking-wide">교환으로 얻을 수 있음</p>
        <div class="space-y-2">
          <div v-for="trade in obtainableTrades" :key="trade.id" 
            class="flex justify-between items-center text-xs py-1.5 px-2 rounded hover:bg-green-50/30 dark:hover:bg-green-800">
            <div class="flex-1">
              <div class="font-semibold text-foreground">{{ trade.npcName }}</div>
              <div class="text-muted-foreground text-[10px]">{{ trade.locationName }}</div>
            </div>
            <div class="flex-1 text-center">
              <span class="text-foreground font-medium">{{ trade.giveItemName }} <span class="text-muted-foreground">x{{ trade.giveQuantity }}</span> 필요</span>
            </div>
            <div class="text-right text-muted-foreground font-medium">
              {{ trade.receiveQuantity }}개 획득
            </div>
          </div>
        </div>
      </div>

      <!-- 제작 레시피 (카테고리별) -->
      <div v-for="[category, recipes] in craftingCategories" :key="category" 
        class="rounded-lg p-3"
        :class="getCategoryBgColor(category)">
        <p class="text-xs font-bold mb-3 text-center uppercase tracking-wide" :class="getCategoryTextColor(category)">{{ category }}</p>
        <div class="space-y-3">
          <div v-for="recipe in recipes" :key="recipe.id" 
            class="p-2 rounded border hover:shadow-sm transition-shadow"
            :class="getCategoryItemBorder(category)">
            <div class="flex justify-between items-start gap-2">
              <div class="flex-1">
                <div class="font-semibold text-foreground text-xs">{{ recipe.name }}</div>
                <div v-if="recipe.craftingTime" class="text-xs text-muted-foreground mt-0.5">
                  ⏱️ {{ formatTime(recipe.craftingTime) }}
                </div>
                <div v-if="recipe.category" class="text-xs text-muted-foreground mt-0.5">
                  📁 {{ recipe.category }}
                </div>
                <div v-if="calculateRecipeCost(recipe) > 0" class="text-xs font-semibold mt-0.5" :class="getCategoryTextColor(category)">
                  💰 {{ calculateRecipeCost(recipe).toLocaleString() }}G
                </div>
              </div>
              <div class="text-xs text-muted-foreground text-right flex-shrink-0">
                <div v-for="material in recipe.requiredItems" :key="material.itemId">
                  {{ getItemName(material.itemId) }} x{{ material.quantity }}
                </div>
              </div>
            </div>
          </div>
        </div>
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
import { trades } from '@/data/trade'
import { npcs } from '@/data/npcs'
import { locations } from '@/data/locations'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import { findProcessingRecipesForItem } from '@/utils/recipeDependencyUtils'
import { formatTime } from '@/utils/timeUtils'
import { RECIPE_CATEGORY } from '@/data/schemas/recipe'

const props = defineProps<{
  item: Item
}>()

// 사용처 정보 - 한 번만 계산하고 캐시
const itemUsage = computed(() => {
  return itemUsageIndex.getItemUsage(props.item.id)
})

// 사용처 타입들 - 한 번만 계산하고 캐시
const usageTypes = computed(() => {
  const types = itemUsageIndex.getUsageTypes(props.item.id)
  // 교환으로 얻을 수 있는 경우 추가
  if (obtainableTrades.value.length > 0) {
    types.push('교환으로 얻을 수 있음')
  }
  return types
})

// 가공 레시피들 - 한 번만 계산하고 캐시
const processingRecipes = computed(() => {
  return findProcessingRecipesForItem(props.item.id)
})

// 제작 레시피들 - 한 번만 계산하고 캐시
const craftableRecipes = computed(() => {
  return recipes.filter(recipe => recipe.resultItemId === props.item.id)
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

// 카테고리별 배경 색상
const getCategoryBgColor = (category: string) => {
  const colorMap: Record<string, string> = {
    '금속 가공': 'bg-gray-100 dark:bg-gray-800',
    '목재 가공': 'bg-amber-100 dark:bg-amber-900',
    '가죽 가공': 'bg-orange-100 dark:bg-orange-900',
    '옷감 가공': 'bg-purple-100 dark:bg-purple-900',
    '아이템 제작': 'bg-green-100 dark:bg-green-900',
    '약품': 'bg-pink-100 dark:bg-pink-900',
    '요리': 'bg-red-100 dark:bg-red-900',
    '구매': 'bg-emerald-100 dark:bg-emerald-900',
    '채집': 'bg-teal-100 dark:bg-teal-900',
    '드랍': 'bg-indigo-100 dark:bg-indigo-900',
    '교환': 'bg-cyan-100 dark:bg-cyan-900'
  }

  return colorMap[category] || 'bg-slate-100 dark:bg-slate-800'
}

// 카테고리별 아이템 테두리 색상
const getCategoryItemBorder = (category: string) => {
  const colorMap: Record<string, string> = {
    '금속 가공': 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800',
    '목재 가공': 'border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-800',
    '가죽 가공': 'border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-800',
    '옷감 가공': 'border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-800',
    '아이템 제작': 'border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-800',
    '약품': 'border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-800',
    '요리': 'border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-800',
    '구매': 'border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-800',
    '채집': 'border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-800',
    '드랍': 'border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-800',
    '교환': 'border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-800'
  }

  return colorMap[category] || 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
}

// 카테고리별 텍스트 색상 매핑
const getCategoryTextColor = (category: string) => {
  const colorMap: Record<string, string> = {
    '금속 가공': 'text-gray-950 dark:text-gray-200',
    '목재 가공': 'text-amber-950 dark:text-amber-200',
    '가죽 가공': 'text-orange-950 dark:text-orange-200',
    '옷감 가공': 'text-purple-950 dark:text-purple-200',
    '아이템 제작': 'text-green-950 dark:text-green-200',
    '약품': 'text-pink-950 dark:text-pink-200',
    '요리': 'text-red-950 dark:text-red-200',
    '구매': 'text-emerald-950 dark:text-emerald-200',
    '채집': 'text-teal-950 dark:text-teal-200',
    '드랍': 'text-indigo-950 dark:text-indigo-200',
    '교환': 'text-cyan-950 dark:text-cyan-200'
  }

  return colorMap[category] || 'text-slate-950 dark:text-slate-200'
}

// 가공 레시피에서 재료로 사용되는 레시피들
const processingRecipeUsage = computed(() => {
  return recipes.filter(recipe =>
    (recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
      recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
      recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
      recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
      recipe.category === RECIPE_CATEGORY.CRAFTING_ITEM ||
      recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE) &&
    recipe.requiredItems.some(material => material.itemId === props.item.id)
  )
})

// 교환으로 얻을 수 있는 아이템들
const obtainableTrades = computed(() => {
  return trades
    .filter(trade => trade.receiveItemId === props.item.id && trade.isEnabled)
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
        receiveQuantity: trade.receiveQuantity,
        type: trade.type,
        maxExchanges: trade.maxExchanges
      }
    })
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
