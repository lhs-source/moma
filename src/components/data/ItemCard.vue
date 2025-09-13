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
      <div v-if="usageTypes.length > 0 || processingRecipes.length > 0 || processingRecipeUsage.length > 0">
        <div class="flex flex-wrap gap-1">
          <span v-for="usageType in usageTypes" :key="usageType" :class="{
            'inline-block px-2 py-1 text-xs rounded': true,
            'bg-accent text-foreground': usageType === '레시피',
            'bg-muted text-foreground': usageType === '교환',
            'bg-secondary text-foreground': usageType === '구매'
          }">
            {{ usageType }}
          </span>
          <span v-if="processingRecipes.length > 0"
            class="inline-block px-2 py-1 text-xs rounded bg-muted text-foreground">
            가공
          </span>
          <span v-if="processingRecipeUsage.length > 0"
            class="inline-block px-2 py-1 text-xs rounded bg-accent text-foreground">
            가공 재료
          </span>
        </div>
      </div>

      <!-- 레시피 사용처 -->
      <div v-if="itemUsage?.usageTypes.recipes.length" class="bg-muted rounded-lg p-3 border border-border">
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
      <div v-if="processingRecipeUsage.length > 0" class="bg-muted rounded-lg p-3 border border-border">
        <p class="text-xs font-medium text-foreground mb-2 text-center">재료로 사용되는 가공 레시피</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipe in processingRecipeUsage" :key="recipe.id" class="text-foreground">
              <td class="font-medium text-left pr-2 min-w-24 max-w-1/2">
                <div>{{ recipe.name }} {{ recipe.resultQuantity || 1 }}개</div>
                <div v-if="recipe.craftingTime" class="text-foreground font-medium">
                  {{ formatTime(recipe.craftingTime) }}
                </div>
                <div v-if="recipe.craftingCategory" class="text-muted-foreground text-xs">
                  {{ recipe.craftingCategory }}
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
      <div v-if="itemUsage?.usageTypes.trades.length" class="bg-muted rounded-lg p-3 border border-border">
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

      <!-- 가공 레시피 -->
      <div v-if="processingRecipes.length > 0" class="bg-muted rounded-lg p-3 border border-border">
        <p class="text-xs font-medium text-foreground mb-2 text-center">가공 레시피</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipe in processingRecipes" :key="recipe.id" class="text-foreground">
              <td class="font-medium text-left pr-2 min-w-24 max-w-1/2">
                <div>{{ recipe.name }}</div>
                <div v-if="recipe.craftingTime" class="text-foreground font-medium">
                  {{ formatTime(recipe.craftingTime) }}
                </div>
                <div v-if="recipe.craftingCategory" class="text-muted-foreground text-xs">
                  {{ recipe.craftingCategory }}
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

      <!-- 제작 레시피 -->
      <div v-if="craftableRecipes.length > 0" class="bg-muted rounded-lg p-3 border border-border">
        <p class="text-xs font-medium text-foreground mb-2 text-center">제작 레시피</p>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="recipe in craftableRecipes" :key="recipe.id" class="text-foreground">
              <td class="font-medium text-left pr-2 min-w-24 max-w-1/2">
                <div>{{ recipe.name }}</div>
                <div v-if="recipe.craftingTime" class="text-foreground font-medium">
                  {{ formatTime(recipe.craftingTime) }}
                </div>
                <div v-if="recipe.craftingCategory" class="text-muted-foreground text-xs">
                  {{ recipe.craftingCategory }}
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
  return recipes.filter(recipe => recipe.resultItemId === props.item.id)
})

// 가공 레시피에서 재료로 사용되는 레시피들
const processingRecipeUsage = computed(() => {
  return craftingProcessingRecipes.filter(recipe =>
    recipe.category === RECIPE_CATEGORY.PROCESS &&
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
