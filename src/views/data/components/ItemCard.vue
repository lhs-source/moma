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
          <div v-for="usage in processingRecipeUsage" :key="usage.recipeId" 
            class="p-2 rounded border border-amber-200 dark:border-amber-800 hover:bg-amber-50/30 dark:hover:bg-amber-800">
            <div class="flex justify-between items-start gap-2">
              <div class="flex-1">
                <div class="font-semibold text-foreground text-xs">{{ usage.recipeName }} <span class="text-muted-foreground">x{{ usage.resultQuantity }}</span></div>
                <div v-if="usage.category" class="text-xs text-muted-foreground mt-0.5">
                  📁 {{ usage.category }}
                </div>
              </div>
              <div class="text-xs text-muted-foreground text-right flex-shrink-0">
                {{ usage.quantity }}개 필요
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
/**
 * # ItemCard 컴포넌트
 * 
 * ## 기능 설명
 * 개별 아이템의 상세 정보를 카드 형태로 표시하는 컴포넌트
 * 아이템 기본 정보와 다양한 사용처 정보를 시각적으로 표현
 * 
 * ## 주요 기능
 * - 아이템 기본 정보 표시 (이미지, 이름, ID, 카테고리)
 * - 사용처 태그 표시 (레시피, 교환, 구매, 제작, 제작 재료)
 * - 레시피 재료로 사용되는 경우 상세 정보 표시
 * - 가공/제작 레시피 정보 표시 (카테고리별 그룹화 및 색상 구분)
 * - 교환 정보 표시 (아이템을 주는 경우, 받는 경우)
 * - 제작 비용 계산 및 표시
 * - 이미지 로드 실패 시 기본 이미지로 대체
 * 
 * ## 데이터 흐름
 * 1. props로 아이템 정보 수신
 * 2. `itemUsageIndex`를 통해 아이템 사용처 조회 (레시피, 교환, 구매)
 * 3. `recipes` 데이터에서 가공/제작 레시피 조회
 * 4. `trades`, `npcs`, `locations` 데이터와 매칭하여 교환 상세 정보 구성
 * 5. 카테고리별로 그룹화하여 UI 렌더링
 * 
 * ## UI 구조
 * ```
 * ┌────────────────────────────────────┐
 * │ [이미지] 아이템 이름                │ <- 기본 정보
 * │          카테고리, ID               │
 * ├────────────────────────────────────┤
 * │ [레시피] [교환] [구매] [제작]      │ <- 사용처 태그
 * ├────────────────────────────────────┤
 * │ 재료로 사용되는 레시피             │ <- 레시피 사용처
 * │  - 빵 x5 (밀가루 2개 필요)         │
 * ├────────────────────────────────────┤
 * │ 교환에 사용                        │ <- 교환 정보
 * │  - NPC명 (위치) → 받는 아이템      │
 * ├────────────────────────────────────┤
 * │ [금속 가공]                        │ <- 제작 레시피
 * │  - 철괴 (⏱️ 30초, 💰 100G)        │
 * └────────────────────────────────────┘
 * ```
 * 
 * ## 성능 최적화
 * - 모든 계산된 값은 `computed`로 캐싱
 * - `itemUsageIndex`를 통한 사전 계산된 인덱스 활용
 * - 중복 레시피 제거 (Map 사용)
 */
import { computed } from 'vue'
import type { EnrichedItem } from '@/data/schemas/enrichedItem'
import { items } from '@/data/items'
import { purchaseData } from '@/data/purchase'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import { formatTime } from '@/utils/timeUtils'

/**
 * ## Props
 * 
 * | 속성 | 타입 | 필수 | 설명 |
 * |------|------|------|------|
 * | item | EnrichedItem | O | 표시할 아이템 정보 (사용처 정보 포함) |
 * 
 * ### EnrichedItem 인터페이스
 * - `id`: 아이템 고유 ID
 * - `name`: 아이템 이름
 * - `imageUrl`: 아이템 이미지 URL
 * - `category`: 아이템 카테고리 (선택적)
 * - `usageTypes`: 사용처 타입 목록
 * - `requiredForTrades`: 교환에 필요
 * - `obtainableFromTrades`: 교환으로 얻음
 * - `cookingRecipes`: 요리 레시피
 * - `usedInCookingRecipes`: 요리 재료
 * - `processingRecipes`: 가공 레시피
 * - `usedInProcessingRecipes`: 가공 재료
 * - `craftingRecipes`: 제작 레시피
 * - `usedInCraftingRecipes`: 제작 재료
 */
const props = defineProps<{
  item: EnrichedItem
}>()

// 아이템의 전체 사용처 정보 (레시피, 교환, 구매)
const itemUsage = computed(() => {
  return itemUsageIndex.getItemUsage(props.item.id)
})

/**
 * ## usageTypes
 * 
 * 아이템의 사용처 타입 목록 (이미 계산됨)
 * 
 * ### 반환값
 * `Array<string>` - 사용처 타입 문자열 배열 ('레시피', '교환', '구매', '제작', '교환으로 얻을 수 있음')
 */
const usageTypes = computed(() => props.item.usageTypes)

// 해당 아이템을 결과물로 만드는 가공 레시피 목록 (이미 계산됨)
const processingRecipes = computed(() => props.item.processingRecipes)

// 해당 아이템을 결과물로 만드는 일반 제작 레시피 목록 (이미 계산됨)
const craftableRecipes = computed(() => props.item.craftingRecipes)

/**
 * ## allCraftingRecipes
 * 
 * 모든 제작 레시피를 카테고리별로 그룹화
 * 
 * ### 반환값
 * `Record<string, Array<Recipe>>` - 카테고리를 키로 하는 레시피 배열 객체
 * 
 * ### 처리 플로우
 * 1. 요리, 가공, 제작 레시피를 모두 병합
 * 2. Map을 사용하여 중복 레시피 제거
 * 3. 고유한 레시피들을 `category`별로 그룹화
 */
const allCraftingRecipes = computed(() => {
  // 중복 제거를 위해 Map 사용
  const recipeMap = new Map()

  // 모든 제작 레시피를 합치되, 중복 제거
  const allRecipes = [
    ...props.item.cookingRecipes,
    ...props.item.processingRecipes,
    ...props.item.craftingRecipes
  ]
  
  allRecipes.forEach(recipe => {
    recipeMap.set(recipe.id, recipe)
  })

  const uniqueRecipes = Array.from(recipeMap.values())
  const grouped: Record<string, Array<{ id: string; name: string; craftingTime?: number; category: string; requiredItems: Array<{ itemId: string; quantity: number }> }>> = {}

  uniqueRecipes.forEach(recipe => {
    const category = recipe.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(recipe)
  })

  return grouped
})

// 제작 레시피가 있는 카테고리들만 필터링하여 [카테고리, 레시피[]] 튜플 배열로 반환
const craftingCategories = computed(() => {
  return Object.entries(allCraftingRecipes.value).filter(([, recipes]) => recipes.length > 0)
})

// 카테고리별 배경 색상 클래스 반환 (다크모드 지원)
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

// 카테고리별 아이템 테두리 및 호버 색상 클래스 반환
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

// 카테고리별 텍스트 색상 클래스 반환 (다크모드 지원)
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

/**
 * ## processingRecipeUsage
 * 
 * 현재 아이템을 재료로 사용하는 가공/제작 레시피 목록 (이미 계산됨)
 * 
 * ### 반환값
 * `Array<RecipeUsage>` - 가공/제작 레시피 사용처 배열
 */
const processingRecipeUsage = computed(() => {
  return [
    ...props.item.usedInProcessingRecipes,
    ...props.item.usedInCraftingRecipes
  ]
})

/**
 * ## obtainableTrades
 * 
 * 교환을 통해 현재 아이템을 얻을 수 있는 교환 목록 (이미 계산됨)
 * 
 * ### 반환값
 * `Array<ObtainableTrade>` - 교환 정보 배열
 */
const obtainableTrades = computed(() => props.item.obtainableFromTrades)

/**
 * ## calculateRecipeCost
 * 
 * 레시피 제작에 필요한 재료들의 총 구매 비용 계산
 * 
 * ### 인자
 * - `recipe.requiredItems`: 필요 재료 목록
 *   - `itemId`: 재료 아이템 ID
 *   - `quantity`: 필요 수량
 * 
 * ### 반환값
 * `number` - 총 제작 비용 (골드)
 * 
 * #### 케이스별 반환값
 * - `0`: 구매 불가능한 재료만 있는 경우
 * - `> 0`: 계산된 총 비용
 * 
 * ### 계산 로직
 * 1. `requiredItems`를 순회
 * 2. 각 재료의 `itemId`로 `purchaseData`에서 가격 조회
 * 3. 가격 × 수량을 누적 합산
 * 4. 첫 번째로 찾은 NPC의 가격 사용
 * 
 * ### 주의사항
 * - NPC마다 가격이 다를 수 있으나 첫 번째 가격만 사용
 * - 구매 불가능한 아이템은 비용 계산에서 제외 (가격 0)
 * 
 * ### 사용처
 * 제작 레시피 카드에 "💰 100G" 형태로 표시
 */
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

// 아이템 ID로 아이템 이름 조회 (없으면 ID 그대로 반환)
function getItemName(itemId: string) {
  const item = items.find(i => i.id === itemId)
  return item ? item.name : itemId
}

/**
 * ## handleImageError
 * 
 * **이벤트**: `img` 태그의 `@error` 이벤트
 * 
 * 이미지 로드 실패 시 기본 이미지로 대체하는 핸들러
 * 
 * ### 인자
 * - `event`: 이미지 에러 이벤트 (`Event`)
 * 
 * ### 트리거 조건
 * - 이미지 URL이 유효하지 않은 경우
 * - 네트워크 오류로 이미지 로드 실패
 * - 파일이 존재하지 않는 경우
 * 
 * ### 처리 플로우
 * 1. 에러 이벤트에서 이미지 요소 추출
 * 2. `src`를 `/images/items/default.webp`로 변경
 * 
 * ### 사용 위치
 * - 아이템 메인 이미지
 * - 재료 이미지들
 * - 모든 이미지에 공통 적용
 */
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
