<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <ItemFilters 
      v-model:search-query="searchQuery" 
      v-model:category="selectedCategory"
      v-model:usage-type="selectedUsageType" 
      :categories="itemStore.categories" />

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
            <ItemRow 
              v-for="item in filteredItems" 
              :key="item.id" 
              :item="item" />
          </tbody>
        </table>
      </div>
    </div>

    <!-- 빈 결과 메시지 -->
    <div 
      v-if="filteredItems.length === 0" 
      class="text-center py-12 border rounded-lg">
      <p class="text-muted-foreground">
        검색 조건에 맞는 아이템이 없습니다.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * # ItemList 컴포넌트
 * 
 * ## 기능 설명
 * 게임의 모든 아이템을 검색, 필터링하여 테이블 형태로 표시하는 컴포넌트
 * 
 * ## 주요 기능
 * - 아이템 이름/ID로 실시간 검색 (디바운싱 적용)
 * - 카테고리별 필터링
 * - 사용처별 필터링 (레시피 재료, 교환, 구매, 제작, 교환으로 얻기)
 * - 필터링된 아이템 개수 표시
 * - 반응형 테이블 레이아웃
 * 
 * - 필터 : searchQuery, category, usageType
 */
import { ref, computed, onMounted, watch } from 'vue'
import { useItemStore } from '@/stores/item'
import { useRecipesStore } from '@/stores/recipes'
import { useTradeStore } from '@/stores/trade'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import ItemFilters from './ItemFilters.vue'
import ItemRow from './ItemRow.vue'

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

/**
 * # searchQuery (디바운싱)
 * 검색어 입력 시 300ms 디바운싱 처리
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

onMounted(() => {
  itemStore.fetchItemList()
  recipesStore.fetchRecipeList()
  tradeStore.fetchTradeList()
})
</script>
