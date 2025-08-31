<template>
  <div>
    <h3 class="text-sm font-semibold text-gray-700 mb-2">총 필요 식재료</h3>

    <div class="space-y-1">
      <div v-for="row in totalNeededRows" :key="'direct-' + row.itemId" class="flex items-center gap-2 text-sm">
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
      <div class="flex items-center justify-end gap-2 text-sm mt-2 pt-2 border-t border-gray-100">
        <span class="text-gray-600">총 골드</span>
        <span class="font-semibold text-green-700">{{ formatGold(totalGoldDirect) }}</span>
      </div>

      <div v-if="processedNeededRows.length" class="pt-2 mt-2 border-t border-gray-100">
        <div class="text-xs text-gray-500 mb-1">가공 아이템 추가 필요 재료</div>
        <div v-for="row in processedNeededRows" :key="'proc-' + row.itemId" class="flex items-center gap-2 text-sm">
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
        <div class="flex items-center justify-end gap-2 text-sm mt-2">
          <span class="text-gray-600">총 골드 (가공 추가)</span>
          <span class="font-semibold text-green-700">{{ formatGold(totalGoldProcessed) }}</span>
        </div>
        <div class="text-xs text-gray-500 mt-2">총합 (가공 포함)</div>
        <div v-for="row in totalNeededCombinedRows" :key="'all-' + row.itemId" class="flex items-center gap-2 text-sm">
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
          <span class="text-gray-600">총 골드</span>
          <span class="font-semibold text-green-700">{{ formatGold(totalGoldCombined) }}</span>
        </div>
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

const cookRecipesFlat = computed<Recipe[]>(() => {
  const list: Recipe[] = []
  props.recipesGrouped.forEach(g => {
    g.recipeList.forEach(r => list.push(r))
  })
  return list
})

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

function accumulateProcessedNeeds(itemId: string, quantityNeeded: number, into: Record<string, number>, visited: Set<string>) {
  if (visited.has(itemId)) return
  const proc = processRecipeMap.value[itemId]
  if (!proc) return
  visited.add(itemId)
  const outQty = proc.resultQuantity && proc.resultQuantity > 0 ? proc.resultQuantity : 1
  const actions = Math.ceil(quantityNeeded / outQty)
  for (const ri of proc.requiredItems) {
    if (processRecipeMap.value[ri.itemId]) {
      accumulateProcessedNeeds(ri.itemId, ri.quantity * actions, into, visited)
    } else {
      into[ri.itemId] = (into[ri.itemId] || 0) + ri.quantity * actions
    }
  }
  visited.delete(itemId)
}

const processedNeeded = computed<Record<string, number>>(() => {
  const result: Record<string, number> = {}
  for (const [itemId, qty] of Object.entries(totalNeeded.value)) {
    if (processRecipeMap.value[itemId]) {
      accumulateProcessedNeeds(itemId, qty, result, new Set())
    }
  }
  return result
})

const processedNeededRows = computed(() => {
  return Object.entries(processedNeeded.value)
    .map(([itemId, quantity]) => ({ itemId, quantity }))
    .sort((a, b) => (getItemName(a.itemId) || '').localeCompare(getItemName(b.itemId) || ''))
})

const totalNeededCombined = computed<Record<string, number>>(() => {
  const out: Record<string, number> = { ...totalNeeded.value }
  for (const [itemId, qty] of Object.entries(processedNeeded.value)) {
    out[itemId] = (out[itemId] || 0) + qty
  }
  return out
})

const totalNeededCombinedRows = computed(() => {
  return Object.entries(totalNeededCombined.value)
    .map(([itemId, quantity]) => ({ itemId, quantity }))
    .sort((a, b) => (getItemName(a.itemId) || '').localeCompare(getItemName(b.itemId) || ''))
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

const totalGoldDirect = computed(() => {
  let sum = 0
  for (const [itemId, quantity] of Object.entries(totalNeeded.value)) {
    const price = getMinBuyPrice(itemId)
    if (price !== null) sum += price * quantity
  }
  return sum
})

const totalGoldProcessed = computed(() => {
  let sum = 0
  for (const [itemId, quantity] of Object.entries(processedNeeded.value)) {
    const price = getMinBuyPrice(itemId)
    if (price !== null) sum += price * quantity
  }
  return sum
})

const totalGoldCombined = computed(() => {
  let sum = 0
  for (const [itemId, quantity] of Object.entries(totalNeededCombined.value)) {
    const price = getMinBuyPrice(itemId)
    if (price !== null) sum += price * quantity
  }
  return sum
})

function formatGold(v: number): string {
  return `${v.toLocaleString()}G`
}
</script>
