<template>
  <div class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
    <!-- 상단: 이미지와 이름 정보 -->
    <div class="flex items-start gap-3 mb-4">
      <img :src="item.imageUrl" :alt="item.name" class="w-16 h-16 object-cover rounded flex-shrink-0"
        @error="handleImageError" />
      <div class="flex-1 min-w-0">
        <div v-if="item.category" class="text-xs text-gray-500 mb-1">
          {{ item.category }}
        </div>
        <h3 class="font-medium text-base text-gray-900">{{ item.name }}</h3>
        <p class="text-xs text-gray-500 mt-1">ID: {{ item.id }}</p>
        <p v-if="item.description" class="text-xs text-gray-600 mt-1 line-clamp-2">
          {{ item.description }}
        </p>
      </div>
    </div>

    <!-- 하단: 사용처 정보 -->
    <div class="space-y-3">
      <!-- 사용처 태그 -->
      <div v-if="usageTypes.length > 0">
        <div class="flex flex-wrap gap-1">
          <span v-for="usageType in usageTypes" :key="usageType" :class="{
            'inline-block px-2 py-1 text-xs rounded': true,
            'bg-purple-100 text-purple-800': usageType === '레시피',
            'bg-indigo-100 text-indigo-800': usageType === '교환',
            'bg-emerald-100 text-emerald-800': usageType === '구매'
          }">
            {{ usageType }}
          </span>
        </div>
      </div>

      <!-- 레시피 사용처 -->
      <div v-if="itemUsage?.usageTypes.recipes.length" class="bg-purple-50 rounded-lg p-3 border border-purple-200">
        <p class="text-xs font-medium text-purple-800 mb-2 text-center">재료로 사용되는 레시피</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipeUsage in itemUsage.usageTypes.recipes" :key="recipeUsage.recipeId" class="text-gray-700">
              <td class="font-medium text-left pr-2">{{ recipeUsage.resultItemName }} {{ recipeUsage.resultQuantity }}개
              </td>
              <td class="text-gray-600 text-left w-20">{{ recipeUsage.quantity }}개 필요</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 교환 사용처 -->
      <div v-if="itemUsage?.usageTypes.trades.length" class="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
        <p class="text-xs font-medium text-indigo-800 mb-2 text-center">교환에 사용</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="tradeUsage in itemUsage.usageTypes.trades" :key="tradeUsage.tradeId" class="text-gray-700">
              <td class="font-medium text-left pr-2 w-30">{{ tradeUsage.npcName }} ({{ tradeUsage.locationName }})</td>
              <td class="text-gray-600 text-left pr-2 flex-1">{{ tradeUsage.receiveItemName }} {{
                tradeUsage.receiveQuantity }}개</td>
              <td class="text-gray-600 text-left w-20">{{ tradeUsage.giveQuantity }}개 필요</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 제작 레시피 -->
      <div v-if="craftableRecipes.length > 0" class="bg-green-50 rounded-lg p-3 border border-green-200">
        <p class="text-xs font-medium text-green-800 mb-2 text-center">제작 레시피</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipe in craftableRecipes" :key="recipe.id" class="text-gray-700">
              <td class="font-medium text-left pr-2 min-w-24 max-w-1/2">
                <div>{{ recipe.name }}</div>
                <div v-if="calculateRecipeCost(recipe) > 0" class="text-orange-600 font-medium">{{
                  calculateRecipeCost(recipe).toLocaleString() }}G</div>
              </td>
              <td class="text-gray-600 text-left">
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

// 제작 레시피들 - 한 번만 계산하고 캐시
const craftableRecipes = computed(() => {
  return recipes.filter(recipe => recipe.resultItemId === props.item.id)
})

// 제작 비용 계산 (purchaseData에서 가격 찾기)
function calculateRecipeCost(recipe: any): number {
  return recipe.requiredItems.reduce((total: number, material: any) => {
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
