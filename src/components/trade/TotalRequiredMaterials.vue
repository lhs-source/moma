<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '@/data/schemas/item'
import type { Recipe } from '@/data/schemas/recipe'
import type { WeeklyTrade } from './WeeklyRequirements.vue'

interface Props {
  weeklyRequirements: WeeklyTrade
  recipes: Recipe[]
  getItemInfo: (itemId: string) => Item | undefined
}

const props = defineProps<Props>()

// 재귀적으로 레시피의 재료를 계산하는 함수
function calculateRecipeMaterials(recipe: Recipe, quantity: number): { [key: string]: number } {
  const materials: { [key: string]: number } = {}

  recipe.requiredItems.forEach(item => {
    const nestedRecipe = props.recipes.find(r => r.resultItemId === item.itemId)
    if (nestedRecipe) {
      // 중첩된 레시피가 있는 경우 재귀적으로 계산
      const nestedMaterials = calculateRecipeMaterials(nestedRecipe as Recipe, item.quantity * quantity)
      Object.entries(nestedMaterials).forEach(([itemId, qty]) => {
        materials[itemId] = (materials[itemId] || 0) + qty
      })
    } else {
      // 기본 재료인 경우
      materials[item.itemId] = (materials[item.itemId] || 0) + (item.quantity * quantity)
    }
  })

  return materials
}

// 최종 필요 재료 계산
const calculateTotalRequiredMaterials = computed(() => {
  const materials: { [key: string]: number } = {}

  // 활성화된 교환의 재료 집계만 수행
  Object.values(props.weeklyRequirements).forEach((requirement) => {
    if (requirement.trade) {
      // 레시피가 있는 경우 재귀적으로 계산
      const recipeMaterials = calculateRecipeMaterials(requirement.trade, requirement.totalNeedItemCount)
      Object.entries(recipeMaterials).forEach(([itemId, quantity]) => {
        materials[itemId] = (materials[itemId] || 0) + quantity
      })
    } else if (requirement.recipe) {
      // 레시피가 있는 경우 재귀적으로 계산
      const recipeMaterials = calculateRecipeMaterials(requirement.recipe, requirement.totalNeedItemCount)
      Object.entries(recipeMaterials).forEach(([itemId, quantity]) => {
        materials[itemId] = (materials[itemId] || 0) + quantity
      })
    } else {
      // 레시피가 없는 경우 아이템 자체를 재료로 추가
      materials[requirement.itemId] = (materials[requirement.itemId] || 0) + requirement.totalNeedItemCount
    }
  })

  // 아이템 ID를 기준으로 정렬된 배열로 변환
  return Object.entries(materials)
    .map(([itemId, quantity]) => ({
      itemId,
      quantity
    }))
    .sort((a, b) => b.quantity - a.quantity)
})
</script>

<template>
  <div class="mb-4">
    <h3 class="text-lg font-semibold mb-2">주간 최종 필요한 아이템</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      <div v-for="material in calculateTotalRequiredMaterials" :key="material.itemId"
        class="flex items-center p-2 bg-card/50 rounded-lg border border-border/50">
        <img :src="getItemInfo(material.itemId)?.imageUrl" :alt="getItemInfo(material.itemId)?.name"
          class="w-4 h-4 object-contain mr-1" />
        <span class="text-sm">{{ getItemInfo(material.itemId)?.name }}</span>
        <span class="text-foreground ml-1 text-sm">{{ material.quantity }}개</span>
      </div>
    </div>
  </div>
</template>
