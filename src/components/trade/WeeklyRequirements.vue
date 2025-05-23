<script setup lang="ts">
import { computed } from 'vue'
import { useTradeData } from '@/composables/useTradeData'
import { recipes } from '@/data/recipes'
import type { Trade, TradeData } from '@/data/schemas/trade'
import type { Item } from '@/data/schemas/item'
// Recipe 타입을 확장하여 교환 카테고리 추가
import type { Recipe } from '@/data/schemas/recipe'
import TotalRequiredMaterials from './TotalRequiredMaterials.vue'
import WeeklyTradeRequirements from './WeeklyTradeRequirements.vue'

import { items } from '@/data/items'
import { useTradeStore } from '@/stores/trade'
import { useNpcStore } from '@/stores/npc'
import { useItemStore } from '@/stores/item'

interface WeeklyRequirement {
  itemId: string
  totalQuantity: number
  recipe?: Recipe
  trades?: {
    id: string
    requiredItemId: string
    requiredQuantity: number
    targetQuantity: number
  }[]
}

export interface WeeklyTrade {
  [key: string]: {
    itemId: string;
    totalNeedItemCount: number;
    recipe?: Recipe;
    trade?: Recipe;
    trades: {
      resultItemId: string;
      needItemQuantity: number;
      receiveItemQuantity: number;
    }[];
  }
}

const { tradeData } = useTradeData()
const npcStore = useNpcStore();
const itemStore = useItemStore();
const tradeStore = useTradeStore();

/**
 * # 아이템 id 가 필요한 아이템인 교환 목록 찾기
 * @param {number} itemId 필요한 아이템 id
 */
const findTradesForItem = (itemId: string): Trade[] => {
  return tradeStore.filterActiveTradeList.filter((trade: Trade) => {
    if (trade.receiveItemId === itemId && !tradeStore.disabledTrades.has(trade.id)) {
      return trade
    }
  })
}

// 교환 데이터로부터 가상의 레시피 생성
const createTradeRecipe = (itemId: string): Recipe | undefined => {
  const trades = findTradesForItem(itemId)
  if (trades.length === 0) return undefined
  const bestTrade = trades[0]
  
  // 가상 레시피 생성
  return {
    id: `trade_${itemId}`,
    name: `교환: ${getItemInfo(bestTrade.giveItemId)?.name}`,
    resultItemId: itemId,
    requiredItems: [{
      itemId: bestTrade.giveItemId,
      quantity: bestTrade.giveQuantity
    }],
    category: '교환',
    facilityLevel: 0
  } as Recipe
}

/**
 * # 필요한 아이템 목록
 * - 교환 목록 배열이 들어 있음
 * - 교환의 결과가 다른 교환에 필요한 아이템인 경우 제외
 */
const totalNeedItemList = computed(() => {
  return tradeStore.filterActiveTradeList.reduce((acc, trade) => {
    const needItemId = trade.giveItemId;
    // 교환의 결과가 다른 교환에 필요한 아이템인 경우 제외
    if(tradeStore.filterActiveTradeList.some(target => target.giveItemId === trade.receiveItemId)) {
      return acc;
    }

    if (!acc[needItemId]) {
      acc[needItemId] = [];
    }
    acc[needItemId].push(trade);
    return acc;
  }, {} as {[key: string]: Trade[]});
})

/**
 * # 일주일간 교환하는 데 필요한 아이템 목록
 * - 비활성화 항목 제외
 * - 횟수를 체크해야 함. 일 1회, 주 2회 등등
 */
const weeklyCount = computed(() => {
  return Object.entries(totalNeedItemList.value).reduce((acc, [needItemId, trades]) => {
    // 레시피 찾기
    const recipe = recipes.find(r => r.resultItemId === needItemId);
    const tradeTarget = createTradeRecipe(needItemId);

    let totalNeedItemCount = 0;
    const tradeList = trades.map((trade: Trade) => {
      if(tradeTarget) {
        const doubleTrade = tradeStore.filterActiveTradeList.find(item => item.receiveItemId === needItemId)
        let doubleTradeCount = 0;
        if(doubleTrade) {
          // 2단계로 계산
          // doubleTrade 의 일주일 교환 결과 개수
          const dayTradeCount = doubleTrade.type === 'daily' ? doubleTrade.maxExchanges : 1;
          const weeklyTradeCount = dayTradeCount * 7;
          doubleTradeCount = doubleTrade.receiveQuantity * weeklyTradeCount;
          // 글리니스의 애플 밀크티는 일주일 7개 -> 상급 목재로는 2번 교환 가능 maxCount == 2
          const maxCount = Math.floor(doubleTradeCount / trade.giveQuantity);
          const needItemQuantity = maxCount * trade.giveQuantity;
          totalNeedItemCount += needItemQuantity;
          return {
            resultItemId: trade.receiveItemId,
            needItemQuantity,
            receiveItemQuantity: maxCount * trade.receiveQuantity,
          }
        }
        return {
          resultItemId: trade.receiveItemId,
          needItemQuantity: 0,
          receiveItemQuantity: 0,
        }
      } 
      const dayTradeCount = trade.type === 'daily' ? trade.maxExchanges : 1;
      const weeklyTradeCount = dayTradeCount * 7;
      const needItemQuantity = trade.giveQuantity * weeklyTradeCount;
      const receiveItemQuantity = trade.receiveQuantity * weeklyTradeCount;
      totalNeedItemCount += needItemQuantity;
      return {
        resultItemId: trade.receiveItemId,
        needItemQuantity,
        receiveItemQuantity,
      }
    })


    if(!acc[needItemId]) {
      acc[needItemId] = {
        itemId: needItemId,
        totalNeedItemCount,
        recipe,
        trade: tradeTarget,
        trades: tradeList,
      }
    } else { 
      acc[needItemId].totalNeedItemCount += totalNeedItemCount;
      acc[needItemId].trades.push(...tradeList);
    }

    return acc;
  }, {} as WeeklyTrade);
})

// weeklyRequirements를 computed로 변경
const weeklyRequirements = computed<WeeklyRequirement[]>(() => {
  const requirements = new Map<string, WeeklyRequirement>()

  // 모든 지역의 교환 목록을 순회
  Object.values(tradeData.value).forEach((trades: TradeData[]) => {
    trades.forEach((trade: TradeData) => {
      // 비활성화된 교환은 제외
      if (tradeStore.disabledTrades.has(trade.id)) return

      // 필요한 아이템의 수량 계산 (특수 교환 아이템 처리 포함)
      let requiredQuantity = 0;
      let weeklyExchangeCount = 0;
    
      // 일반적인 경우: 일일 한도 * 7일
      const dailyLimit = trade.limitType === 'daily' ? trade.limitCount : 1;
      weeklyExchangeCount = dailyLimit * 7;
      
      // 교환 한 번에 필요한 아이템 수량
      const requiredItemPerExchange = trade.requiredQuantity;
      
      // 일주일간 필요한 총 아이템 수량
      requiredQuantity = weeklyExchangeCount * requiredItemPerExchange;

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
            requiredQuantity: weeklyExchangeCount * trade.itemQuantity,
            targetQuantity: requiredQuantity
          }]
        })
      } else {
        const existing = requirements.get(trade.requiredItemId)!
        existing.totalQuantity += requiredQuantity
        if (existing.trades) {
          existing.trades.push({
            id: trade.id,
            requiredItemId: trade.itemId,
            requiredQuantity: weeklyExchangeCount * trade.itemQuantity,
            targetQuantity: requiredQuantity
          })
        }
      }
    })
  })

  // Map을 배열로 변환하고 수량 기준으로 정렬
  return Array.from(requirements.values())
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
})

// 순환 의존성이 없는 필요 아이템만 필터링한 computed 속성
const filteredWeeklyRequirements = computed<WeeklyRequirement[]>(() => {
  // 모든 교환에서 필요한(requiredItemId) 아이템과 얻는(itemId) 아이템 목록 생성
  const requiredItemsSet = new Set<string>()
  const targetItemsSet = new Set<string>()
  
  // 모든 교환 항목을 확인하여 필요 아이템과 대상 아이템 수집
  Object.values(tradeData.value).forEach((trades: TradeData[]) => {
    trades.forEach((trade: TradeData) => {
      if (!tradeStore.disabledTrades.has(trade.id)) {
        requiredItemsSet.add(trade.requiredItemId)
        targetItemsSet.add(trade.itemId)
      }
    })
  })
  
  // 순환 의존성이 있는 아이템 식별 (필요 아이템이면서 동시에 대상 아이템인 경우)
  const circularDependencyItems = new Set<string>()
  requiredItemsSet.forEach(itemId => {
    if (targetItemsSet.has(itemId)) {
      circularDependencyItems.add(itemId)
    }
  })

  // 최종 산출물(end product) 아이템 목록 식별
  // 최종 산출물은 다른 교환의 재료로 사용되지 않는 아이템
  const finalProductItems = new Set<string>()
  targetItemsSet.forEach(itemId => {
    if (!requiredItemsSet.has(itemId)) {
      finalProductItems.add(itemId)
    }
  })
  
  // 특수 케이스 처리: 특정 최종 산출물은 항상 포함 (예: 상급 목재+)
  const specialFinalProducts = new Set(['superior_wood_plus'])
  specialFinalProducts.forEach(itemId => {
    finalProductItems.add(itemId)
  })

  // 순환 의존성이 있는 아이템을 필터링하되, 최종 산출물인 경우는 포함
  return weeklyRequirements.value.filter(requirement => {
    // 1. 해당 아이템이 순환 의존성이 있지만 최종 산출물이면 포함
    if (circularDependencyItems.has(requirement.itemId)) {
      // 최종 산출물에 해당하는 trades만 포함하도록 필터링
      if (requirement.trades) {
        const filteredTrades = requirement.trades.filter(trade => 
          finalProductItems.has(trade.requiredItemId)
        )
        
        if (filteredTrades.length > 0) {
          // 필터링된 trades만 사용하도록 업데이트
          requirement.trades = filteredTrades
          return true
        }
      }
      return false
    }
    
    // 2. 교환을 통해 얻는 아이템 중 순환 의존성이 있는 경우, 최종 산출물에만 사용되는지 확인
    if (requirement.trades) {
      // 순환 의존성이 있는 trades를 찾기
      const circularTrades = requirement.trades.filter(trade => 
        circularDependencyItems.has(trade.requiredItemId) && !finalProductItems.has(trade.requiredItemId)
      )
      
      // 모든 trades가 순환 의존성이 있고 최종 산출물이 아니면 제외
      if (circularTrades.length === requirement.trades.length) {
        return false
      }
      
      // 순환 의존성 trades 제거
      if (circularTrades.length > 0) {
        requirement.trades = requirement.trades.filter(trade => 
          !circularDependencyItems.has(trade.requiredItemId) || finalProductItems.has(trade.requiredItemId)
        )
      }
    }
    
    return true
  })
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


npcStore.fetchNpcList();
itemStore.fetchItemList();
tradeStore.fetchTradeList();

</script>

<template>
  <div class="p-2">
    <h2 class="text-xl font-bold mb-2">주간 교환 필요 아이템</h2>
    
    <!-- 최종 필요 재료 섹션 - 컴포넌트로 분리 -->
    <TotalRequiredMaterials 
      :weeklyRequirements="filteredWeeklyRequirements"
      :recipes="recipes"
      :getItemInfo="getItemInfo"
    />

    <!-- 활성화된 교환 목록 컴포넌트 -->
    <WeeklyTradeRequirements
      :weeklyRequirements="weeklyCount"
      :getItemRecipe="getItemRecipe"
    />
  </div>
</template>