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
import ItemFilters from './ItemFilters.vue'
import ItemRow from './ItemRow.vue'

/**
 * ## Stores
 * 
 * - `itemStore`: EnrichedItem 목록 관리 (사용처 정보 포함)
 */
const itemStore = useItemStore()

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
 * `Array<EnrichedItem>` - 필터링된 아이템 목록 (사용처 정보 포함)
 * 
 * ### 필터링
 * - `itemStore.getFilteredItems()` 호출
 * - 검색어(`debouncedSearchQuery`) 적용
 * - 카테고리(`selectedCategory`) 적용
 * - 사용처(`selectedUsageType`) 적용
 * 
 * ### 성능 최적화
 * - `computed`로 자동 캐싱
 * - 모든 사용처 정보가 사전 계산되어 있음 (EnrichedItem)
 * - itemStore에서 한 번만 계산, 컴포넌트에서는 조회만
 * 
 * ### 의존성
 * - `debouncedSearchQuery`
 * - `selectedCategory`
 * - `selectedUsageType`
 * - `itemStore.getFilteredItems()`
 */
const filteredItems = computed(() => {
  return itemStore.getFilteredItems({
    searchQuery: debouncedSearchQuery.value,
    category: selectedCategory.value,
    usageType: selectedUsageType.value
  })
})

onMounted(() => {
  itemStore.fetchItemList()
})
</script>
