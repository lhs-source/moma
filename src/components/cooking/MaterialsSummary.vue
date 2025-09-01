<template>
  <div>
    <h3 class="text-sm font-semibold text-gray-700 mb-2">총 필요 재료</h3>

    <div class="space-y-1">
      <div v-for="row in totalNeededRows" :key="'direct-' + row.itemId" class="space-y-1">
        <!-- 메인 아이템 -->
        <div class="flex items-center gap-2 text-sm">
          <img :src="getItemImageUrl(row.itemId)" :alt="getItemName(row.itemId)" class="w-5 h-5 rounded object-cover"
            @error="handleImageError" />
          <span class="truncate">{{ getItemName(row.itemId) }}</span>
          <span class="ml-auto">x{{ row.quantity }}</span>
          <span v-if="getBuyableCount(row.itemId) > 0"
            :class="[row.quantity > getBuyableCount(row.itemId) ? 'text-red-600 font-semibold' : 'text-gray-500']"
            class="ml-2 text-xs whitespace-nowrap">({{ row.quantity }}/{{ getBuyableCount(row.itemId) }})</span>
          <span v-if="getMinBuyPrice(row.itemId) !== null" class="ml-2 text-xs text-gray-500 whitespace-nowrap">개당 {{
            formatGold(getMinBuyPrice(row.itemId)!) }} · 합계 {{ formatGold(getMinBuyPrice(row.itemId)! * row.quantity)
            }}</span>
        </div>

        <!-- 가공 레시피가 있는 경우 하위에 표시 -->
        <div v-if="getProcessedRecipe(row.itemId)" class="ml-7 space-y-1">
          <div v-for="ingredient in getProcessedRecipe(row.itemId)!.requiredItems" :key="ingredient.itemId"
            class="flex items-center gap-2 text-xs text-gray-600">
            <img :src="getItemImageUrl(ingredient.itemId)" :alt="getItemName(ingredient.itemId)"
              class="w-4 h-4 rounded object-cover" @error="handleImageError" />
            <span class="truncate">{{ getItemName(ingredient.itemId) }}</span>
            <span class="ml-auto">x{{ ingredient.quantity * Math.ceil(row.quantity /
              (getProcessedRecipe(row.itemId)!.resultQuantity || 1)) }}</span>
            <span v-if="getMinBuyPrice(ingredient.itemId) !== null" class="ml-2 text-gray-500 whitespace-nowrap">개당 {{
              formatGold(getMinBuyPrice(ingredient.itemId)!) }} · 합계 {{ formatGold(getMinBuyPrice(ingredient.itemId)! *
                ingredient.quantity * Math.ceil(row.quantity / (getProcessedRecipe(row.itemId)!.resultQuantity || 1)))
              }}</span>
          </div>
        </div>
      </div>

      <!-- 총 필요 식재료 집계 -->
      <div v-if="totalRawMaterialsRows.length" class="pt-2 mt-2 border-t border-gray-100">
        <div class="text-xs text-gray-500 mb-1">총 필요 식재료</div>
        <div v-for="row in totalRawMaterialsRows" :key="'raw-' + row.itemId" class="flex items-center gap-2 text-sm">
          <img :src="getItemImageUrl(row.itemId)" :alt="getItemName(row.itemId)" class="w-5 h-5 rounded object-cover"
            @error="handleImageError" />
          <span class="truncate">{{ getItemName(row.itemId) }}</span>
          <span class="ml-auto font-semibold">x{{ row.quantity }}</span>
          <span v-if="getBuyableCount(row.itemId) > 0"
            :class="[row.quantity > getBuyableCount(row.itemId) ? 'text-red-600 font-semibold' : 'text-gray-500']"
            class="ml-2 text-xs whitespace-nowrap">({{ row.quantity }}/{{ getBuyableCount(row.itemId) }})</span>
          <span v-if="getMinBuyPrice(row.itemId) !== null" class="ml-2 text-xs text-gray-500 whitespace-nowrap">개당 {{
            formatGold(getMinBuyPrice(row.itemId)!) }} · 합계 {{ formatGold(getMinBuyPrice(row.itemId)! * row.quantity)
            }}</span>
        </div>
        <div class="flex items-center justify-end gap-2 text-sm mt-2 pt-2 border-t border-gray-100">
          <span class="text-gray-600">총 골드 (식재료)</span>
          <span class="font-semibold text-green-700">{{ formatGold(totalRawMaterialsGold) }}</span>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 text-sm mt-2 pt-2 border-t border-gray-100">
        <span class="text-gray-600">총 골드</span>
        <span class="font-semibold text-green-700">{{ formatGold(totalGoldCombined) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Recipe, RecipeGroup } from '@/data/schemas/recipe'

const props = withDefaults(defineProps<{
  selectedCounts: Record<string, number>
  recipesGrouped: RecipeGroup[]
  items: Array<{ id: string; name: string; imageUrl: string; category?: string }>
}>(), {
  selectedCounts: () => ({} as Record<string, number>),
  recipesGrouped: () => ([] as RecipeGroup[])
})

function getItemName(itemId: string) {
  const it = props.items.find(i => i.id === itemId)
  return it ? it.name : itemId
}

function getItemImageUrl(itemId: string) {
  const it = props.items.find(i => i.id === itemId)
  return it ? it.imageUrl : '/images/items/default.webp'
}

function handleImageError(e: Event) {
  const t = e.target as HTMLImageElement
  t.src = '/images/items/default.webp'
}

function findRecipeById(id: string): Recipe | undefined {
  for (const g of props.recipesGrouped) {
    const r = g.recipeList.find(r => r.id === id)
    if (r) return r
  }
  return undefined
}

const totalNeeded = computed<Record<string, number>>(() => {
  const result: Record<string, number> = {}
  for (const [recipeId, count] of Object.entries(props.selectedCounts)) {
    if (!count) continue
    const recipe = findRecipeById(recipeId)
    if (!recipe) continue
    recipe.requiredItems.forEach(ri => {
      result[ri.itemId] = (result[ri.itemId] || 0) + ri.quantity * count
    })
  }
  return result
})

const totalNeededRows = computed(() => {
  return Object.entries(totalNeeded.value)
    .map(([itemId, quantity]) => ({ itemId, quantity }))
    .sort((a, b) => (getItemName(a.itemId) || '').localeCompare(getItemName(b.itemId) || ''))
})

const processRecipeMap = computed(() => {
  const map: Record<string, Recipe> = {}
  for (const g of props.recipesGrouped) {
    for (const r of g.recipeList) {
      if (r.category === '가공') {
        if (!map[r.resultItemId]) map[r.resultItemId] = r
      }
    }
  }
  return map
})

function getProcessedRecipe(itemId: string): Recipe | undefined {
  return processRecipeMap.value[itemId]
}

// 가공품을 제외한 순수 식재료만 집계
const totalRawMaterials = computed<Record<string, number>>(() => {
  const result: Record<string, number> = {}

  // 직접 필요한 재료 중 가공품이 아닌 것들
  for (const [itemId, quantity] of Object.entries(totalNeeded.value)) {
    if (!processRecipeMap.value[itemId]) {
      result[itemId] = quantity
    }
  }

  // 가공품의 원재료들 추가
  for (const [itemId, quantity] of Object.entries(totalNeeded.value)) {
    if (processRecipeMap.value[itemId]) {
      const recipe = processRecipeMap.value[itemId]
      const outQty = recipe.resultQuantity && recipe.resultQuantity > 0 ? recipe.resultQuantity : 1
      const actions = Math.ceil(quantity / outQty)

      for (const ingredient of recipe.requiredItems) {
        // 가공품의 원재료도 가공품인 경우는 제외 (순수 식재료만)
        if (!processRecipeMap.value[ingredient.itemId]) {
          result[ingredient.itemId] = (result[ingredient.itemId] || 0) + ingredient.quantity * actions
        }
      }
    }
  }

  return result
})

const totalRawMaterialsRows = computed(() => {
  return Object.entries(totalRawMaterials.value)
    .map(([itemId, quantity]) => ({ itemId, quantity }))
    .sort((a, b) => (getItemName(a.itemId) || '').localeCompare(getItemName(b.itemId) || ''))
})

const totalRawMaterialsGold = computed(() => {
  let sum = 0
  for (const [itemId, quantity] of Object.entries(totalRawMaterials.value)) {
    const price = getMinBuyPrice(itemId)
    if (price !== null) sum += price * quantity
  }
  return sum
})

function getMinBuyPrice(itemId: string): number | null {
  const prices: number[] = []
  props.recipesGrouped.forEach(g => {
    g.recipeList.forEach(r => {
      if (r.resultItemId !== itemId) return
      if (r.category !== '구매') return
      const gold = r.requiredItems.find(ri => ri.itemId === 'gold')
      if (gold) prices.push(gold.quantity)
    })
  })
  if (prices.length === 0) return null
  return Math.min(...prices)
}

function getBuyableCount(itemId: string): number {
  // 집계: 같은 아이템을 판매하는 서로 다른 NPC * 30
  const npcSet = new Set<string>()
  props.recipesGrouped.forEach(g => {
    g.recipeList.forEach(r => {
      if (r.resultItemId !== itemId) return
      if (r.category !== '구매') return
      const gold = r.requiredItems.find(ri => ri.itemId === 'gold' && ri.buyNpcId)
      if (gold && gold.buyNpcId) npcSet.add(gold.buyNpcId)
    })
  })
  return npcSet.size * 30
}

const totalGoldCombined = computed(() => {
  let sum = 0
  for (const [itemId, quantity] of Object.entries(totalNeeded.value)) {
    const price = getMinBuyPrice(itemId)
    if (price !== null) sum += price * quantity
  }
  return sum
})

function formatGold(v: number): string {
  return `${v.toLocaleString()}G`
}
</script>
