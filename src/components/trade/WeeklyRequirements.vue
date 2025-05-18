<script setup lang="ts">
import { computed } from 'vue'
import { items, tradeData } from '@/data/trade'
import { recipes } from '@/data/recipes'
import type { TradeData } from '@/data/schemas/trade'
import type { Item } from '@/data/schemas/item'
import type { Recipe } from '@/data/schemas/recipe'

interface WeeklyRequirement {
  itemId: string
  totalQuantity: number
  trades: {
    id: string
    requiredItemId: string
    requiredQuantity: number
  }[]
  recipe?: Recipe
}

interface Props {
  disabledTrades: Set<string>
}

const props = defineProps<Props>()

function calculateWeeklyRequirements(): WeeklyRequirement[] {
  const requirements: { [key: string]: WeeklyRequirement } = {}

  // 모든 지역의 교환 목록을 순회
  Object.values(tradeData).forEach(trades => {
    trades.forEach(trade => {
      // 비활성화된 교환은 제외
      if (props.disabledTrades.has(trade.id)) return

      // 필요한 아이템의 수량 계산 (일일 제한이 있는 경우 7일치)
      const dailyLimit = trade.limitType === 'daily' ? trade.limitCount : 1
      const weeklyQuantity = dailyLimit * 7

      // 교환 비율을 고려하여 필요한 아이템 수량 계산
      const requiredQuantity = Math.ceil((weeklyQuantity * trade.requiredQuantity) / trade.itemQuantity)

      // 필요한 아이템 정보 추가
      if (!requirements[trade.requiredItemId]) {
        requirements[trade.requiredItemId] = {
          itemId: trade.requiredItemId,
          totalQuantity: 0,
          trades: []
        }
      }

      requirements[trade.requiredItemId].totalQuantity += requiredQuantity
      requirements[trade.requiredItemId].trades.push({
        id: trade.id,
        requiredItemId: trade.itemId,
        requiredQuantity: weeklyQuantity
      })
    })
  })

  // 레시피 정보 추가
  Object.values(requirements).forEach(req => {
    const recipe = recipes.find(r => r.resultItemId === req.itemId)
    if (recipe) {
      req.recipe = recipe
    }
  })

  // 결과를 배열로 변환하고 수량 기준으로 정렬
  return Object.values(requirements).sort((a, b) => b.totalQuantity - a.totalQuantity)
}

const getItemInfo = (itemId: string): Item | undefined => {
  return items.find(item => item.id === itemId)
}

function formatQuantity(quantity: number): string {
  return quantity.toString()
}

const weeklyRequirements = computed(() => calculateWeeklyRequirements())

// 비활성화된 교환 목록 계산
const disabledRequirements = computed(() => {
  const requirements: { [key: string]: WeeklyRequirement } = {}

  Object.values(tradeData).forEach(trades => {
    trades.forEach(trade => {
      if (!props.disabledTrades.has(trade.id)) return

      const dailyLimit = trade.limitType === 'daily' ? trade.limitCount : 1
      const weeklyQuantity = dailyLimit * 7

      if (!requirements[trade.requiredItemId]) {
        requirements[trade.requiredItemId] = {
          itemId: trade.requiredItemId,
          totalQuantity: 0,
          trades: []
        }
      }

      requirements[trade.requiredItemId].totalQuantity += weeklyQuantity
      requirements[trade.requiredItemId].trades.push({
        id: trade.id,
        requiredItemId: trade.itemId,
        requiredQuantity: weeklyQuantity
      })
    })
  })

  // 레시피 정보 추가
  Object.values(requirements).forEach(req => {
    const recipe = recipes.find(r => r.resultItemId === req.itemId)
    if (recipe) {
      req.recipe = recipe
    }
  })

  return Object.values(requirements).sort((a, b) => b.totalQuantity - a.totalQuantity)
})

const getTradesByLocation = (location: string): TradeData[] => {
  return tradeData[location] || []
}

// 재귀적으로 레시피의 재료를 계산하는 함수
function calculateRecipeMaterials(recipe: Recipe, quantity: number): { [key: string]: number } {
  const materials: { [key: string]: number } = {}

  recipe.requiredItems.forEach(item => {
    const nestedRecipe = recipes.find(r => r.resultItemId === item.itemId)
    if (nestedRecipe) {
      // 중첩된 레시피가 있는 경우 재귀적으로 계산
      const nestedMaterials = calculateRecipeMaterials(nestedRecipe, item.quantity * quantity)
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
  weeklyRequirements.value.forEach(requirement => {
    if (requirement.recipe) {
      // 레시피가 있는 경우 재귀적으로 계산
      const recipeMaterials = calculateRecipeMaterials(requirement.recipe, requirement.totalQuantity)
      Object.entries(recipeMaterials).forEach(([itemId, quantity]) => {
        materials[itemId] = (materials[itemId] || 0) + quantity
      })
    } else {
      // 레시피가 없는 경우 아이템 자체를 재료로 추가
      materials[requirement.itemId] = (materials[requirement.itemId] || 0) + requirement.totalQuantity
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
  <div class="p-2">
    <h2 class="text-xl font-bold mb-2">주간 교환 필요 아이템</h2>
    
    <!-- 최종 필요 재료 섹션 -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold mb-2">주간 최종 필요한 아이템</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div v-for="material in calculateTotalRequiredMaterials" :key="material.itemId"
             class="flex items-center p-2 bg-card/50 rounded-lg border border-border/50">
          <img 
            :src="getItemInfo(material.itemId)?.imageUrl" 
            :alt="getItemInfo(material.itemId)?.name"
            class="w-4 h-4 object-contain mr-1"
          />
          <span class="text-sm">{{ getItemInfo(material.itemId)?.name }}</span>
          <span class="text-primary ml-1 text-sm">{{ material.quantity }}개</span>
        </div>
      </div>
    </div>
    <h3 class="text-lg font-semibold mb-2">주간 교환 필요 제작 아이템</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-[1080px] mx-auto">
      <!-- 활성화된 교환 목록 -->
      <div v-for="requirement in weeklyRequirements" :key="requirement.itemId" 
           class="flex flex-col p-3 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <h3 class="font-medium text-sm">
            <div class="flex items-center gap-1">
              <img 
                :src="getItemInfo(requirement.itemId)?.imageUrl" 
                :alt="getItemInfo(requirement.itemId)?.name"
                class="w-4 h-4 object-contain"
              />
              <span>{{ getItemInfo(requirement.itemId)?.name }}</span>
            </div>
            <span class="text-primary ml-1">{{ requirement.totalQuantity }}개</span>
            <span class="text-muted-foreground ml-1">
              ({{ requirement.trades.map(trade => 
                `${getItemInfo(trade.requiredItemId)?.name} ${trade.requiredQuantity}개`
              ).join(', ') }})
            </span>
          </h3>
        </div>
        <!-- 레시피 정보 표시 -->
        <div v-if="requirement.recipe" class="mt-2 text-xs text-muted-foreground">
          <div class="font-medium mb-1">필요 재료:</div>
          <div class="grid grid-cols-2 gap-1">
            <div v-for="item in requirement.recipe.requiredItems" :key="item.itemId" class="flex items-center gap-1">
              <img 
                :src="getItemInfo(item.itemId)?.imageUrl" 
                :alt="getItemInfo(item.itemId)?.name"
                class="w-3 h-3 object-contain"
              />
              <span>{{ getItemInfo(item.itemId)?.name }} x{{ item.quantity }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 비활성화된 교환 목록 -->
      <div v-for="requirement in disabledRequirements" :key="requirement.itemId" 
           class="flex flex-col p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <h3 class="font-medium text-sm text-muted-foreground">
            <div class="flex items-center gap-1">
              <img 
                :src="getItemInfo(requirement.itemId)?.imageUrl" 
                :alt="getItemInfo(requirement.itemId)?.name"
                class="w-4 h-4 object-contain"
              />
              <span>{{ getItemInfo(requirement.itemId)?.name }}</span>
            </div>
            <span class="text-muted-foreground ml-1">{{ requirement.totalQuantity }}개</span>
            <span class="text-muted-foreground/70 ml-1">
              ({{ requirement.trades.map(trade => 
                `${getItemInfo(trade.requiredItemId)?.name} ${trade.requiredQuantity}개`
              ).join(', ') }})
            </span>
          </h3>
        </div>
        <!-- 레시피 정보 표시 -->
        <div v-if="requirement.recipe" class="mt-2 text-xs text-muted-foreground/70">
          <div class="font-medium mb-1">필요 재료:</div>
          <div class="grid grid-cols-2 gap-1">
            <div v-for="item in requirement.recipe.requiredItems" :key="item.itemId" class="flex items-center gap-1">
              <img 
                :src="getItemInfo(item.itemId)?.imageUrl" 
                :alt="getItemInfo(item.itemId)?.name"
                class="w-3 h-3 object-contain"
              />
              <span>{{ getItemInfo(item.itemId)?.name }} x{{ item.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 