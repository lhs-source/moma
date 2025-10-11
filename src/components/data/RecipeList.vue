<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-2">
      <!-- 검색 입력 -->
      <Input v-model="searchQuery" type="text" placeholder="레시피 이름 또는 ID로 검색..." />

      <!-- 카테고리 필터 -->
      <Select v-model="selectedCategory" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 카테고리</SelectItem>
          <SelectItem v-for="category in recipesStore.categories" :key="category" :value="category">
            {{ category }}
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- 시설 레벨 필터 -->
      <Select v-model="selectedFacilityLevel" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 레벨" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 레벨</SelectItem>
          <SelectItem v-for="level in facilityLevels" :key="level" :value="level.toString()">
            Lv.{{ level }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- 결과 개수 표시 -->
    <div class="text-sm text-muted-foreground">
      총 {{ filteredRecipes.length }}개의 레시피
    </div>

    <!-- 레시피 그리드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div v-for="recipe in filteredRecipes" :key="recipe.id"
        class="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
        <div class="flex items-start gap-4">
          <img :src="getItemImageUrl(recipe.resultItemId)" :alt="recipe.name"
            class="w-16 h-16 object-cover rounded flex-shrink-0" @error="handleImageError" />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-medium text-lg text-foreground">{{ recipe.name }}</h3>
                <p class="text-sm text-muted-foreground mt-1">ID: {{ recipe.id }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <span v-if="recipe.resultQuantity && recipe.resultQuantity > 1"
                  class="text-sm font-medium text-foreground">
                  x{{ recipe.resultQuantity }}
                </span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-3">
              <span v-if="recipe.category" class="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border-2 bg-slate-50 dark:bg-slate-700 text-slate-950 dark:text-slate-100 border-slate-700 dark:border-slate-500">
                {{ recipe.category }}
              </span>
              <span v-if="recipe.facilityLevel" class="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border-2 bg-blue-50 dark:bg-blue-700 text-blue-950 dark:text-blue-100 border-blue-700 dark:border-blue-500">
                요리 Lv.{{ recipe.facilityLevel }}
              </span>
            </div>

            <div class="mt-4">
              <p class="text-sm font-medium text-foreground mb-2">필요 재료:</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div v-for="material in recipe.requiredItems" :key="material.itemId"
                  class="flex items-center gap-2 text-sm">
                  <img :src="getItemImageUrl(material.itemId)" :alt="getItemName(material.itemId)"
                    class="w-6 h-6 object-cover rounded flex-shrink-0" @error="handleImageError" />
                  <span class="text-foreground">
                    {{ getItemName(material.itemId) }}
                  </span>
                  <span class="text-muted-foreground ml-auto">x{{ material.quantity }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredRecipes.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">검색 조건에 맞는 레시피가 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * # RecipeList 컴포넌트
 * 
 * ## 기능 설명
 * 게임의 모든 레시피를 검색, 필터링하여 그리드 형태로 표시하는 컴포넌트
 * 
 * ## 주요 기능
 * - 레시피 이름/ID로 실시간 검색
 * - 카테고리별 필터링 (금속 가공, 목재 가공, 요리 등)
 * - 시설 레벨별 필터링 (요리 전용)
 * - 필터링된 레시피 개수 표시
 * - 레시피 상세 정보 표시 (결과물, 재료, 수량, 시간)
 * - 반응형 그리드 레이아웃
 * 
 * ## 데이터 흐름
 * 1. `onMounted` 시 recipesStore, itemStore에서 데이터 로드
 * 2. 사용자 입력 시 실시간 필터링 적용
 * 3. `filteredRecipes` computed가 모든 필터 조건 적용하여 결과 반환
 * 4. 각 레시피를 카드 형태로 렌더링
 * 
 * ## 필터링 로직
 * ```
 * [전체 레시피]
 *    ↓
 * [검색어 필터] → name, id 포함 여부
 *    ↓
 * [카테고리 필터] → 선택된 카테고리
 *    ↓
 * [시설 레벨 필터] → 선택된 레벨
 *    ↓
 * [최종 결과]
 * ```
 * 
 * ## UI 구조
 * ```
 * ┌────────────────────────────────────┐
 * │ [검색] [카테고리] [레벨]           │ <- 필터
 * ├────────────────────────────────────┤
 * │ 총 50개의 레시피                   │ <- 개수 표시
 * ├────────────────────────────────────┤
 * │ ┌──────┐ ┌──────┐ ┌──────┐        │
 * │ │레시피│ │레시피│ │레시피│  ...   │ <- 그리드
 * │ └──────┘ └──────┘ └──────┘        │
 * └────────────────────────────────────┘
 * ```
 */
import { ref, computed, onMounted } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useItemStore } from '@/stores/item'
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
 * - `recipesStore`: 레시피 목록 및 카테고리 관리
 * - `itemStore`: 아이템 정보 조회
 */
const recipesStore = useRecipesStore()
const itemStore = useItemStore()

// 사용자가 입력하는 검색어 (실시간)
const searchQuery = ref('')
// 선택된 카테고리 필터 ('' = 전체, '금속 가공', '목재 가공', '요리' 등)
const selectedCategory = ref('')
// 선택된 시설 레벨 필터 ('' = 전체, '1', '2', '3' 등)
const selectedFacilityLevel = ref('')

/**
 * ## Lifecycle Hook - onMounted
 * 
 * 컴포넌트 마운트 시 필요한 모든 데이터 로드
 * 
 * ### 로드하는 데이터
 * 1. `recipesStore.fetchRecipeList()`: 전체 레시피 목록
 * 2. `itemStore.fetchItemList()`: 전체 아이템 목록
 * 
 * ### 의존성
 * 두 개의 Store 데이터가 모두 로드되어야 레시피와 아이템 정보가 정상 표시됨
 */
onMounted(() => {
  recipesStore.fetchRecipeList()
  itemStore.fetchItemList()
})

/**
 * ## facilityLevels
 * 
 * 레시피 목록에 존재하는 고유한 시설 레벨 목록을 반환
 * 
 * ### 반환값
 * `Array<number>` - 오름차순으로 정렬된 시설 레벨 배열
 * 
 * #### 반환 예시
 * ```typescript
 * [1, 2, 3, 4, 5]
 * ```
 * 
 * ### 처리 로직
 * 1. `recipesStore.recipeList`를 순회
 * 2. `facilityLevel`이 있는 레시피만 추출
 * 3. `Set`으로 중복 제거
 * 4. 배열로 변환 후 오름차순 정렬
 * 
 * ### 사용처
 * 시설 레벨 필터 드롭다운의 옵션 목록
 * 
 * ### 최적화
 * `computed`로 캐싱, `recipesStore.recipeList` 변경 시에만 재계산
 */
const facilityLevels = computed(() => {
  const levelSet = new Set<number>()
  recipesStore.recipeList.forEach(recipe => {
    if (recipe.facilityLevel) {
      levelSet.add(recipe.facilityLevel)
    }
  })
  return Array.from(levelSet).sort((a, b) => a - b)
})

/**
 * ## filteredRecipes
 * 
 * 모든 필터 조건을 적용하여 최종 레시피 목록 반환
 * 
 * ### 반환값
 * `Array<Recipe>` - 필터링된 레시피 목록
 * 
 * ### 필터링 조건
 * 
 * #### 1. 검색어 필터 (`matchesSearch`)
 * - 검색어가 비어있으면 모두 통과
 * - 레시피 이름에 검색어 포함 (대소문자 무시)
 * - 레시피 ID에 검색어 포함 (대소문자 무시)
 * 
 * #### 2. 카테고리 필터 (`matchesCategory`)
 * - 카테고리가 선택되지 않으면 모두 통과
 * - 레시피 카테고리가 선택된 카테고리와 일치
 * 
 * #### 3. 시설 레벨 필터 (`matchesFacilityLevel`)
 * - 시설 레벨이 선택되지 않으면 모두 통과
 * - 레시피 시설 레벨이 선택된 레벨과 일치
 * 
 * ### 조건 조합
 * 세 가지 조건을 모두 만족하는 레시피만 반환 (AND 조건)
 * 
 * ### 성능 최적화
 * - `computed`로 자동 캐싱
 * - 필터 값이 변경될 때만 재계산
 * 
 * ### 의존성
 * - `searchQuery`
 * - `selectedCategory`
 * - `selectedFacilityLevel`
 * - `recipesStore.recipeList`
 */
const filteredRecipes = computed(() => {
  return recipesStore.recipeList.filter(recipe => {
    const matchesSearch = !searchQuery.value ||
      recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.id.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value || recipe.category === selectedCategory.value

    const matchesFacilityLevel = !selectedFacilityLevel.value ||
      recipe.facilityLevel?.toString() === selectedFacilityLevel.value

    return matchesSearch && matchesCategory && matchesFacilityLevel
  })
})

// 아이템 ID로 아이템 이름 조회 (없으면 ID 그대로 반환)
function getItemName(itemId: string) {
  const item = itemStore.getItemById(itemId)
  return item ? item.name : itemId
}

// 아이템 ID로 이미지 URL 조회 (없으면 기본 이미지 반환)
function getItemImageUrl(itemId: string) {
  const item = itemStore.getItemById(itemId)
  return item ? item.imageUrl : '/images/items/default.webp'
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
 * - 레시피 결과물 이미지
 * - 재료 이미지들
 * - 모든 이미지에 공통 적용
 */
function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp'
}
</script>
