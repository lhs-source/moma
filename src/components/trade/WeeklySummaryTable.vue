<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '@/data/schemas/item'
import type { Recipe } from '@/data/schemas/recipe'
import { RECIPE_CATEGORY } from '@/data/schemas/recipe'
import type { WeeklyTrade } from './WeeklyRequirements.vue'
import { useItemStore } from '@/stores/item'

interface Props {
  weeklyRequirements: WeeklyTrade
  recipes: Recipe[]
}

const props = defineProps<Props>()
const itemStore = useItemStore()

// 재귀적으로 레시피의 재료를 계산하는 함수
function calculateRecipeMaterials(recipe: Recipe, quantity: number): { [key: string]: number } {
  const materials: { [key: string]: number } = {}

  recipe.requiredItems.forEach(item => {
    const nestedRecipe = props.recipes.find(r => r.resultItemId === item.itemId)
    
    if (!nestedRecipe || nestedRecipe.category === RECIPE_CATEGORY.BUY) {
      materials[item.itemId] = (materials[item.itemId] || 0) + (item.quantity * quantity)
    } else {
      const nestedMaterials = calculateRecipeMaterials(nestedRecipe as Recipe, item.quantity * quantity)
      Object.entries(nestedMaterials).forEach(([itemId, qty]) => {
        materials[itemId] = (materials[itemId] || 0) + qty
      })
    }
  })

  return materials
}

// 최종 필요 재료 계산
const totalMaterials = computed(() => {
  const materials: { [key: string]: number } = {}

  Object.values(props.weeklyRequirements).forEach((requirement) => {
    if (requirement.trade) {
      const recipeMaterials = calculateRecipeMaterials(requirement.trade, requirement.totalNeedItemCount)
      Object.entries(recipeMaterials).forEach(([itemId, quantity]) => {
        materials[itemId] = (materials[itemId] || 0) + quantity
      })
    } else if (requirement.recipe) {
      const recipeMaterials = calculateRecipeMaterials(requirement.recipe, requirement.totalNeedItemCount)
      Object.entries(recipeMaterials).forEach(([itemId, quantity]) => {
        materials[itemId] = (materials[itemId] || 0) + quantity
      })
    } else {
      materials[requirement.itemId] = (materials[requirement.itemId] || 0) + requirement.totalNeedItemCount
    }
  })

  return materials
})

// 테이블 데이터: 제작 아이템 + 필요 재료 + 경로
interface TableRow {
  needItemId: string
  needItemName: string
  needItemQuantity: number
  resultItems: { itemId: string; itemName: string; quantity: number }[]
  recipePath: string
  recipeCategory: string
}

const tableData = computed<TableRow[]>(() => {
  const rows: TableRow[] = []

  // 1. 제작이 필요한 아이템들 (weeklyRequirements)
  Object.values(props.weeklyRequirements).forEach((requirement) => {
    const needItem = itemStore.getItemById(requirement.itemId)
    if (!needItem) return

    const resultItems = requirement.trades.map(trade => ({
      itemId: trade.resultItemId,
      itemName: itemStore.getItemById(trade.resultItemId)?.name || '',
      quantity: trade.receiveItemQuantity
    }))

    let recipePath = ''
    let recipeCategory = ''

    if (requirement.recipe) {
      recipePath = requirement.recipe.requiredItems
        .map(item => `${itemStore.getItemById(item.itemId)?.name} x${item.quantity}`)
        .join(', ')
      recipeCategory = requirement.recipe.category
    } else if (requirement.trade) {
      recipePath = requirement.trade.requiredItems
        .map(item => `${itemStore.getItemById(item.itemId)?.name} x${item.quantity}`)
        .join(', ')
      recipeCategory = requirement.trade.category
    }

    rows.push({
      needItemId: requirement.itemId,
      needItemName: needItem.name,
      needItemQuantity: requirement.totalNeedItemCount,
      resultItems,
      recipePath,
      recipeCategory
    })
  })

  // 2. 최종 필요 재료들 (골드로 구매하는 항목 제외)
  Object.entries(totalMaterials.value).forEach(([itemId, quantity]) => {
    const recipe = props.recipes.find(r => r.resultItemId === itemId)
    if (recipe && recipe.category === RECIPE_CATEGORY.BUY) return

    // 이미 제작 아이템으로 추가된 경우 제외
    if (rows.some(row => row.needItemId === itemId)) return

    const needItem = itemStore.getItemById(itemId)
    if (!needItem) return

    let recipePath = ''
    let recipeCategory = ''

    if (recipe) {
      recipePath = recipe.requiredItems
        .map(item => `${itemStore.getItemById(item.itemId)?.name} x${item.quantity}`)
        .join(', ')
      recipeCategory = recipe.category
    }

    rows.push({
      needItemId: itemId,
      needItemName: needItem.name,
      needItemQuantity: quantity,
      resultItems: [],
      recipePath,
      recipeCategory
    })
  })

  // 수량 기준으로 정렬
  return rows.sort((a, b) => b.needItemQuantity - a.needItemQuantity)
})
</script>

<template>
  <div class="bg-card rounded-lg border border-border p-4">
    <h2 class="text-xl font-bold mb-4 text-foreground">주간 필요 아이템 요약</h2>
    
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left p-2 font-semibold">필요한 아이템</th>
            <th class="text-left p-2 font-semibold">수량</th>
            <th class="text-left p-2 font-semibold">결과 아이템</th>
            <th class="text-left p-2 font-semibold">경로</th>
            <th class="text-left p-2 font-semibold">카테고리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableData" :key="row.needItemId" class="border-b border-border/50 hover:bg-accent/50">
            <td class="p-2">
              <div class="flex items-center gap-2">
                <img :src="itemStore.getItemById(row.needItemId)?.imageUrl" 
                     :alt="row.needItemName" 
                     class="w-6 h-6 object-contain" />
                <span class="font-medium">{{ row.needItemName }}</span>
              </div>
            </td>
            <td class="p-2">
              <span class="font-semibold text-foreground">{{ row.needItemQuantity }}</span>
            </td>
            <td class="p-2">
              <div v-if="row.resultItems.length > 0" class="space-y-1">
                <div v-for="result in row.resultItems" :key="result.itemId" class="flex items-center gap-2">
                  <img :src="itemStore.getItemById(result.itemId)?.imageUrl" 
                       :alt="result.itemName" 
                       class="w-5 h-5 object-contain" />
                  <span class="text-xs">{{ result.itemName }} ({{ result.quantity }}개)</span>
                </div>
              </div>
              <span v-else class="text-muted-foreground text-xs">-</span>
            </td>
            <td class="p-2">
              <span v-if="row.recipePath" class="text-xs text-muted-foreground">{{ row.recipePath }}</span>
              <span v-else class="text-muted-foreground text-xs">-</span>
            </td>
            <td class="p-2">
              <span v-if="row.recipeCategory" 
                    class="inline-block px-2 py-1 rounded text-xs font-medium"
                    :class="{
                      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300': row.recipeCategory === RECIPE_CATEGORY.COOK,
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': row.recipeCategory.includes('가공'),
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300': row.recipeCategory.includes('제작'),
                      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300': row.recipeCategory === RECIPE_CATEGORY.GATHER,
                      'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300': row.recipeCategory === RECIPE_CATEGORY.TRADE
                    }">
                {{ row.recipeCategory }}
              </span>
              <span v-else class="text-muted-foreground text-xs">-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="tableData.length === 0" class="text-center py-8 text-muted-foreground">
      활성화된 교환 아이템이 없습니다.
    </div>
  </div>
</template>

