<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTradeData } from '@/composables/useTradeData'
import { recipes } from '@/data/recipes'
import type { TradeData } from '@/data/schemas/trade'
import type { Item } from '@/data/schemas/item'
// Recipe 타입을 확장하여 교환 카테고리 추가
import type { Recipe as OriginalRecipe } from '@/data/schemas/recipe'

// 커스텀 Recipe 타입
interface Recipe extends OriginalRecipe {
  category: '간편' | '힘 특화' | '솜씨 특화' | '지력 특화' | '기타' | '쉐어링' | '교환'
}
import { items } from '@/data/items'

interface WeeklyRequirement {
  itemId: string
  totalQuantity: number
  recipe?: Recipe
  trades?: {
    id: string
    requiredItemId: string
    requiredQuantity: number
  }[]
}

interface Props {
  disabledTrades: Set<string>
}

const props = defineProps<Props>()
const { tradeData } = useTradeData()

// 아이템에 대한 모든 교환 정보를 찾는 함수
const findTradesForItem = (itemId: string): TradeData[] => {
  const foundTrades: TradeData[] = []
  
  Object.values(tradeData.value).forEach((trades: TradeData[]) => {
    trades.forEach((trade: TradeData) => {
      // 활성화된 교환 중에서 아이템을 얻을 수 있는 교환 찾기
      if (trade.itemId === itemId && !props.disabledTrades.has(trade.id)) {
        foundTrades.push(trade)
      }
    })
  })
  
  return foundTrades
}

// 교환 데이터로부터 가상의 레시피 생성
const createTradeRecipe = (itemId: string): Recipe | undefined => {
  const trades = findTradesForItem(itemId)
  if (trades.length === 0) return undefined
  
  // 가장 유리한 교환 선택 (효율 계산)
  trades.sort((a, b) => {
    const ratioA = a.itemQuantity / a.requiredQuantity
    const ratioB = b.itemQuantity / b.requiredQuantity
    return ratioB - ratioA // 내림차순 (가장 효율적인 교환이 앞으로)
  })
  
  const bestTrade = trades[0]
  
  // 가상 레시피 생성
  return {
    id: `trade_${itemId}`,
    name: `교환: ${getItemInfo(bestTrade.requiredItemId)?.name}`,
    resultItemId: itemId,
    requiredItems: [{
      itemId: bestTrade.requiredItemId,
      quantity: bestTrade.requiredQuantity
    }],
    category: '교환',
    facilityLevel: 0
  } as Recipe
}

// weeklyRequirements를 computed로 변경
const weeklyRequirements = computed<WeeklyRequirement[]>(() => {
  const requirements = new Map<string, WeeklyRequirement>()

  // 모든 지역의 교환 목록을 순회
  Object.values(tradeData.value).forEach((trades: TradeData[]) => {
    trades.forEach((trade: TradeData) => {
      // 비활성화된 교환은 제외
      if (props.disabledTrades.has(trade.id)) return

      // 필요한 아이템의 수량 계산 (일일 제한이 있는 경우 7일치)
      // 교환 가능 횟수 계산
      const dailyLimit = trade.limitType === 'daily' ? trade.limitCount : 1
      const weeklyExchangeCount = dailyLimit * 7

      // 교환 한 번에 필요한 아이템 수량
      const requiredItemPerExchange = trade.requiredQuantity  
      
      // 일주일간 필요한 총 아이템 수량
      const requiredQuantity = weeklyExchangeCount * requiredItemPerExchange

      // 필요한 아이템 정보 추가
      if (!requirements.has(trade.requiredItemId)) {
        // 레시피 찾기 또는 교환으로 만들 수 있는지 확인
        const recipe = recipes.find(r => r.resultItemId === trade.requiredItemId);
        const tradeRecipe = !recipe ? createTradeRecipe(trade.requiredItemId) : undefined;
        
        requirements.set(trade.requiredItemId, {
          itemId: trade.requiredItemId,
          totalQuantity: requiredQuantity,
          recipe: recipe || tradeRecipe, // 레시피가 있으면 레시피, 없으면 교환 레시피
          trades: [{
            id: trade.id,
            requiredItemId: trade.itemId,
            requiredQuantity: weeklyExchangeCount * trade.itemQuantity
          }]
        })
      } else {
        const existing = requirements.get(trade.requiredItemId)!
        existing.totalQuantity += requiredQuantity
        if (existing.trades) {
          existing.trades.push({
            id: trade.id,
            requiredItemId: trade.itemId,
            requiredQuantity: weeklyExchangeCount * trade.itemQuantity  // 주간 교환 횟수로 수정
          })
        }
      }
    })
  })

  // Map을 배열로 변환하고 수량 기준으로 정렬
  return Array.from(requirements.values())
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
})

const getItemInfo = (itemId: string): Item | undefined => {
  return items.find(item => item.id === itemId)
}

// 아이템 ID로 해당 아이템의 레시피를 찾는 함수
const getItemRecipe = (itemId: string): Recipe | undefined => {
  // 기존 레시피에서 검색
  const recipe = recipes.find(r => r.resultItemId === itemId)
  if (recipe) return recipe as Recipe
  
  // 특수 케이스 처리: 이름이 다른 레시피들
  const specialRecipeMappings: Record<string, string> = {
    // 매핑이 필요한 경우에만 여기에 추가
  }
  
  // 특수 케이스에 해당하는지 확인
  if (specialRecipeMappings[itemId]) {
    const specialRecipe = recipes.find(r => r.id === specialRecipeMappings[itemId])
    if (specialRecipe) return specialRecipe as Recipe
  }

  // 생크림 같은 기본 재료를 만들 수 있는 다른 방법이 있는지 확인
  const recipesForIngredient = recipes.filter(r => 
    r.requiredItems.some(item => item.itemId === itemId)
  )
  
  // 재료를 포함하는 레시피가 있으면, 가장 효율적인 것 선택
  if (recipesForIngredient.length > 0) {
    // 각 레시피에서 해당 재료가 몇 개 필요한지 계산
    const recipeEfficiency = recipesForIngredient.map(recipe => {
      const requiredItem = recipe.requiredItems.find(item => item.itemId === itemId)
      return {
        recipe,
        efficiency: requiredItem ? requiredItem.quantity : Infinity
      }
    })
    
    // 가장 적은 양을 요구하는 레시피 선택
    recipeEfficiency.sort((a, b) => a.efficiency - b.efficiency)
    if (recipeEfficiency[0]) return recipeEfficiency[0].recipe as Recipe
  }
  
  // 레시피가 없는 경우 교환 방식으로 얻을 수 있는지 확인
  return createTradeRecipe(itemId)
}

// 비활성화된 교환 항목 관련 계산은 현재 사용되지 않음

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
  weeklyRequirements.value.forEach((requirement: WeeklyRequirement) => {
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

    <!-- 활성화된 교환 목록만 표시 -->
    <template v-if="weeklyRequirements.length > 0">
      <h3 class="text-lg font-semibold mb-2">주간 교환 필요 제작 아이템</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-[1080px] mx-auto">
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
                ({{ requirement.trades?.map(trade => 
                  `${getItemInfo(trade.requiredItemId)?.name} ${trade.requiredQuantity}개`
                ).join(', ') }})
              </span>
            </h3>
          </div>
          <!-- 레시피 정보 표시 -->
          <div v-if="requirement.recipe" class="mt-2 text-xs text-muted-foreground">
            <div class="font-medium mb-1">
              <span v-if="requirement.recipe.category === '교환'" class="text-green-500">교환 방법:</span>
              <span v-else>필요 재료:</span>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div v-for="item in requirement.recipe.requiredItems" :key="item.itemId" 
                   :class="{'bg-green-50 dark:bg-green-900/20 rounded p-1': requirement.recipe.category === '교환'}"
                   class="flex flex-col gap-1">
                <div class="flex items-center gap-1">
                  <img 
                    :src="getItemInfo(item.itemId)?.imageUrl" 
                    :alt="getItemInfo(item.itemId)?.name"
                    class="w-3 h-3 object-contain"
                  />
                  <span>{{ getItemInfo(item.itemId)?.name }} x{{ item.quantity }}</span>
                </div>
                
                <!-- 교환 레시피인 경우, 필요한 아이템의 레시피 표시 -->
                <div v-if="requirement.recipe.category === '교환' && getItemRecipe(item.itemId)" 
                     class="ml-4 mt-1 p-1 bg-blue-50 dark:bg-blue-900/10 rounded-sm border-l-2 border-blue-200 dark:border-blue-800">
                  <div class="flex items-center gap-1 text-blue-700 dark:text-blue-300 font-medium mb-1 text-[10px]">
                    <template v-if="getItemRecipe(item.itemId)?.id === 'steamed_clams' && item.itemId === 'clam_chowder'">
                      조개찜 제작 방법
                    </template>
                    <template v-else>
                      {{ getItemRecipe(item.itemId)?.name }} 제작 방법
                    </template>
                  </div>
                  <div class="space-y-1">
                    <div v-for="recipeItem in getItemRecipe(item.itemId)?.requiredItems" :key="recipeItem.itemId"
                         class="flex items-center gap-1 text-[10px]">
                      <img 
                        :src="getItemInfo(recipeItem.itemId)?.imageUrl" 
                        :alt="getItemInfo(recipeItem.itemId)?.name"
                        class="w-2 h-2 object-contain"
                      />
                      <span>{{ getItemInfo(recipeItem.itemId)?.name }} x{{ recipeItem.quantity }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>