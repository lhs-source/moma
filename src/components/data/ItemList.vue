<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-2">
      <!-- 검색 입력 -->
      <Input v-model="searchQuery" type="text" placeholder="아이템 이름 또는 ID로 검색..." />

      <!-- 카테고리 필터 -->
      <Select v-model="selectedCategory" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 카테고리</SelectItem>
          <SelectItem v-for="category in itemStore.categories" :key="category" :value="category">
            {{ category }}
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- 사용처 필터 -->
      <Select v-model="selectedUsageType" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 사용처" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 사용처</SelectItem>
          <SelectItem value="레시피">레시피 재료</SelectItem>
          <SelectItem value="교환">교환 아이템</SelectItem>
          <SelectItem value="구매">구매 가능</SelectItem>
          <SelectItem value="제작">제작 가능</SelectItem>
          <SelectItem value="교환으로 얻을 수 있음">교환으로 얻을 수 있음</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- 결과 개수 표시 -->
    <div class="text-sm text-muted-foreground">
      총 {{ filteredItems.length }}개의 아이템
    </div>

    <!-- 아이템 테이블 -->
    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted/50">
            <tr class="border-b">
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">
                이미지</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-48">기본
                정보</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">사용처 상세
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-muted/30 transition-colors">
              <!-- 이미지 -->
              <td class="px-4 py-3 align-top">
                <img :src="item.imageUrl" :alt="item.name" class="w-16 min-w-16 h-16 object-cover rounded"
                  @error="handleImageError" />
              </td>

              <!-- 기본 정보 -->
              <td class="px-4 py-3 align-top">
                <div v-if="item.category" class="text-xs text-muted-foreground mb-1">{{ item.category }}</div>
                <div class="font-bold text-base text-foreground">{{ item.name }}</div>
                <div class="text-xs text-muted-foreground mt-1">ID: {{ item.id }}</div>

                <!-- 사용처 태그 -->
                <div class="flex flex-wrap gap-1 mt-2">
                  <span v-for="usageType in getUsageTypes(item.id)" :key="usageType" :class="{
                    'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded': true,
                    'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100': usageType === '레시피',
                    'bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-blue-100': usageType === '교환',
                    'bg-emerald-100 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100': usageType === '구매',
                    'bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100': usageType === '제작',
                    'bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-100': usageType === '교환으로 얻을 수 있음'
                  }">
                    {{ usageType }}
                  </span>
                </div>
              </td>

              <!-- 사용처 상세 정보 -->
              <td class="px-4 py-3 align-top">
                <div class="space-y-2 text-sm">
                  <!-- 레시피 사용처 -->
                  <div v-if="getItemUsage(item.id)?.usageTypes.recipes.length"
                    class="bg-slate-50 dark:bg-slate-800 rounded p-2">
                    <div class="font-semibold text-xs text-slate-900 dark:text-slate-200 mb-1">재료로 사용되는 레시피</div>
                    <div v-for="recipeUsage in getItemUsage(item.id)?.usageTypes.recipes" :key="recipeUsage.recipeId"
                      class="text-xs py-0.5">
                      • {{ recipeUsage.resultItemName }} x{{ recipeUsage.resultQuantity }} ({{ recipeUsage.quantity }}개
                      필요)
                    </div>
                  </div>

                  <!-- 교환 사용처 -->
                  <div v-if="getItemUsage(item.id)?.usageTypes.trades.length"
                    class="bg-blue-50 dark:bg-blue-900 rounded p-2">
                    <div class="font-semibold text-xs text-blue-900 dark:text-blue-200 mb-1">교환에 사용</div>
                    <div v-for="tradeUsage in getItemUsage(item.id)?.usageTypes.trades" :key="tradeUsage.tradeId"
                      class="text-xs py-0.5">
                      • {{ tradeUsage.npcName }} ({{ tradeUsage.locationName }}) → {{ tradeUsage.receiveItemName }} x{{
                        tradeUsage.receiveQuantity }} ({{ tradeUsage.giveQuantity }}개 필요)
                    </div>
                  </div>

                  <!-- 교환으로 얻을 수 있음 -->
                  <div v-if="getObtainableTrades(item.id).length" class="bg-green-50 dark:bg-green-900 rounded p-2">
                    <div class="font-semibold text-xs text-green-900 dark:text-green-200 mb-1">교환으로 얻을 수 있음</div>
                    <div v-for="trade in getObtainableTrades(item.id)" :key="trade.id" class="text-xs py-0.5">
                      • {{ trade.npcName }} ({{ trade.locationName }}) - {{ trade.giveItemName }} x{{ trade.giveQuantity
                      }} → {{ trade.receiveQuantity }}개 획득
                    </div>
                  </div>

                  <!-- 제작 레시피 -->
                  <div v-if="getCraftableRecipes(item.id).length" class="bg-yellow-50 dark:bg-yellow-900 rounded p-2">
                    <div class="font-semibold text-xs text-yellow-900 dark:text-yellow-200 mb-1">제작 가능</div>
                    <div v-for="recipe in getCraftableRecipes(item.id)" :key="recipe.id" class="text-xs py-0.5">
                      • {{ recipe.name }} ({{ recipe.category }})
                      <span v-if="recipe.craftingTime"> - ⏱️ {{ formatTime(recipe.craftingTime) }}</span>
                    </div>
                  </div>

                  <div v-if="!getItemUsage(item.id)?.usageTypes.recipes.length &&
                    !getItemUsage(item.id)?.usageTypes.trades.length &&
                    !getObtainableTrades(item.id).length &&
                    !getCraftableRecipes(item.id).length" class="text-xs text-muted-foreground">
                    사용처 정보 없음
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 빈 결과 메시지 -->
    <div v-if="filteredItems.length === 0" class="text-center py-12 border rounded-lg">
      <p class="text-muted-foreground">검색 조건에 맞는 아이템이 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * # ItemList 컴포넌트
 * 
 * ## 기능 설명
 * 게임의 모든 아이템을 검색, 필터링하여 그리드 형태로 표시하는 컴포넌트
 * 
 * ## 주요 기능
 * - 아이템 이름/ID로 실시간 검색 (디바운싱 적용)
 * - 카테고리별 필터링
 * - 사용처별 필터링 (레시피 재료, 교환, 구매, 제작, 교환으로 얻기)
 * - 필터링된 아이템 개수 표시
 * - 반응형 그리드 레이아웃
 * 
 * ## 데이터 흐름
 * 1. `onMounted` 시 itemStore, recipesStore, tradeStore에서 데이터 로드
 * 2. 사용자 입력 시 검색어는 300ms 디바운싱 후 적용
 * 3. `filteredItems` computed가 모든 필터 조건 적용하여 결과 반환
 * 4. ItemCard 컴포넌트로 각 아이템 렌더링
 * 
 * ## 필터링 로직
 * ```
 * [전체 아이템]
 *    ↓
 * [Store 필터링] → searchQuery, category 적용
 *    ↓
 * [사용처 필터링] → usageType 적용
 *    ↓
 * [최종 결과]
 * ```
 * 
 * ## 성능 최적화
 * - 검색어 디바운싱으로 불필요한 필터링 방지
 * - itemUsageIndex로 사전 계산된 사용처 정보 활용
 * - computed를 통한 자동 캐싱
 */
import { ref, computed, onMounted, watch } from 'vue'
import { useItemStore } from '@/stores/item'
import { useRecipesStore } from '@/stores/recipes'
import { useTradeStore } from '@/stores/trade'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import { recipes } from '@/data/recipes'
import { trades } from '@/data/trade'
import { npcs } from '@/data/npcs'
import { locations } from '@/data/locations'
import { items } from '@/data/items'
import { formatTime } from '@/utils/timeUtils'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'

/**
 * ## Stores
 * 
 * 각 Store는 전역 상태 관리를 담당
 * - `itemStore`: 아이템 목록 및 카테고리 관리
 * - `recipesStore`: 레시피 목록 관리
 * - `tradeStore`: 교환 정보 관리
 */
const itemStore = useItemStore()
const recipesStore = useRecipesStore()
const tradeStore = useTradeStore()

// 사용자가 입력하는 검색어 (실시간)
const searchQuery = ref('')
// 디바운싱 처리된 검색어 (300ms 지연, 실제 필터링에 사용)
const debouncedSearchQuery = ref('')
// 선택된 카테고리 필터 ('' = 전체, '재료', '음식', '물약' 등)
const selectedCategory = ref('')
// 선택된 사용처 필터 ('' = 전체, '레시피', '교환', '구매', '제작', '교환으로 얻을 수 있음')
const selectedUsageType = ref('')

// 아이템 ID로 사용처 타입 목록 반환
function getUsageTypes(itemId: string): string[] {
  const types: string[] = []
  const usage = itemUsageIndex.getItemUsage(itemId)

  if (usage?.usageTypes.recipes.length) types.push('레시피')
  if (usage?.usageTypes.trades.length) types.push('교환')
  if (usage?.usageTypes.purchases.length) types.push('구매')

  if (recipesStore.recipeList.some(recipe => recipe.resultItemId === itemId)) {
    types.push('제작')
  }

  const obtainableTrades = tradeStore.tradeList.filter(trade => trade.receiveItemId === itemId && trade.isEnabled)
  if (obtainableTrades.length > 0) types.push('교환으로 얻을 수 있음')

  return types
}

// 아이템 ID로 사용처 상세 정보 조회
function getItemUsage(itemId: string) {
  return itemUsageIndex.getItemUsage(itemId)
}

// 교환으로 얻을 수 있는 아이템 목록 조회
function getObtainableTrades(itemId: string) {
  return trades
    .filter(trade => trade.receiveItemId === itemId && trade.isEnabled)
    .map(trade => {
      const npc = npcs.find(n => n.id === trade.npcId)
      const location = locations.find(l => l.id === npc?.locationId)
      const giveItem = items.find(i => i.id === trade.giveItemId)

      return {
        id: trade.id,
        npcName: npc?.name || '알 수 없음',
        locationName: location?.name || '알 수 없음',
        giveItemName: giveItem?.name || trade.giveItemId,
        giveQuantity: trade.giveQuantity,
        receiveQuantity: trade.receiveQuantity
      }
    })
}

// 제작 가능한 레시피 조회
function getCraftableRecipes(itemId: string) {
  return recipes.filter(recipe => recipe.resultItemId === itemId)
}

// 이미지 로드 실패 시 기본 이미지로 대체
function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp'
}

/**
 * ## Lifecycle Hook - onMounted
 * 
 * 컴포넌트 마운트 시 필요한 모든 데이터 로드
 * 
 * ### 로드하는 데이터
 * 1. `itemStore.fetchItemList()`: 전체 아이템 목록
 * 2. `recipesStore.fetchRecipeList()`: 전체 레시피 목록
 * 3. `tradeStore.fetchTradeList()`: 전체 교환 목록
 * 
 * ### 의존성
 * 세 개의 Store 데이터가 모두 로드되어야 필터링이 정상 동작
 */
onMounted(() => {
  itemStore.fetchItemList()
  recipesStore.fetchRecipeList()
  tradeStore.fetchTradeList()
})

/**
 * ## Watch - searchQuery (디바운싱)
 * 
 * **대상**: `searchQuery` 변수
 * 
 * **목적**: 검색어 입력 시 300ms 디바운싱 처리
 * 
 * ### 동작 방식
 * 1. 사용자가 타이핑할 때마다 기존 타이머 취소
 * 2. 300ms 대기
 * 3. `debouncedSearchQuery` 업데이트
 * 4. `filteredItems`가 자동으로 재계산됨
 * 
 * ### 성능 최적화
 * - 타이핑 중 불필요한 필터링 연산 방지
 * - 렉 현상 방지
 * - API 호출 횟수 감소 (필요한 경우)
 * 
 * ### 이벤트 트리거
 * 템플릿의 `<Input v-model="searchQuery">` 변경 시
 */
let searchTimeout: number | null = null
watch(searchQuery, (newValue) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    debouncedSearchQuery.value = newValue
  }, 300)
})

/**
 * ## filteredItems
 * 
 * 모든 필터 조건을 적용하여 최종 아이템 목록 반환
 * 
 * ### 반환값
 * `Array<Item>` - 필터링된 아이템 목록
 * 
 * ### 필터링 단계
 * 
 * #### 1단계: Store 필터링
 * - `itemStore.getFilteredItems()` 호출
 * - 검색어(`debouncedSearchQuery`) 적용
 * - 카테고리(`selectedCategory`) 적용
 * 
 * #### 2단계: 사용처 필터링
 * - `selectedUsageType`이 빈 문자열이면 모든 아이템 통과
 * - 각 아이템의 사용처를 `itemUsageIndex`로 조회
 * - 선택된 사용처와 일치하는 아이템만 통과
 * 
 * ### 사용처 필터링 로직
 * 
 * | 필터값 | 조건 |
 * |--------|------|
 * | `'레시피'` | `usage.usageTypes.recipes.length > 0` |
 * | `'교환'` | `usage.usageTypes.trades.length > 0` |
 * | `'구매'` | `usage.usageTypes.purchases.length > 0` |
 * | `'제작'` | `recipesStore.recipeList`에 해당 아이템이 결과물인 레시피 존재 |
 * | `'교환으로 얻을 수 있음'` | `tradeStore.tradeList`에 해당 아이템을 받는 교환 존재 |
 * 
 * ### 성능 최적화
 * - `computed`로 자동 캐싱
 * - `itemUsageIndex`를 통한 O(1) 조회
 * - 필터 값이 변경될 때만 재계산
 * 
 * ### 의존성
 * - `debouncedSearchQuery`
 * - `selectedCategory`
 * - `selectedUsageType`
 * - `itemStore.getFilteredItems()`
 * - `itemUsageIndex`
 * - `recipesStore.recipeList`
 * - `tradeStore.tradeList`
 */
const filteredItems = computed(() => {
  return itemStore.getFilteredItems({
    searchQuery: debouncedSearchQuery.value,
    category: selectedCategory.value,
    usageType: selectedUsageType.value
  }).filter(item => {
    // 사용처 필터링 로직
    if (!selectedUsageType.value) return true

    const usageTypes = []
    const usage = itemUsageIndex.getItemUsage(item.id)
    if (usage?.usageTypes.recipes.length) usageTypes.push('레시피')
    if (usage?.usageTypes.trades.length) usageTypes.push('교환')
    if (usage?.usageTypes.purchases.length) usageTypes.push('구매')

    // 교환으로 얻을 수 있는지 확인
    const obtainableTrades = tradeStore.tradeList.filter(trade => trade.receiveItemId === item.id && trade.isEnabled)
    if (obtainableTrades.length > 0) usageTypes.push('교환으로 얻을 수 있음')

    switch (selectedUsageType.value) {
      case '레시피':
        return usageTypes.includes('레시피')
      case '교환':
        return usageTypes.includes('교환')
      case '구매':
        return usageTypes.includes('구매')
      case '제작':
        return recipesStore.recipeList.some(recipe => recipe.resultItemId === item.id)
      case '교환으로 얻을 수 있음':
        return usageTypes.includes('교환으로 얻을 수 있음')
      default:
        return true
    }
  })
})
</script>
