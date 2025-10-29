<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <PageTitle>데이터 목록</PageTitle>
    </div>

    <!-- 탭 컴포넌트 -->
    <Tabs v-model:value="activeTab" default-value="items" @update:value="handleTabChange">
      <!-- 탭 버튼 목록 -->
      <TabsList class="grid w-full grid-cols-5">
        <TabsTrigger value="items">아이템</TabsTrigger>
        <TabsTrigger value="recipes">레시피</TabsTrigger>
        <TabsTrigger value="npcs">NPC</TabsTrigger>
        <TabsTrigger value="locations">위치</TabsTrigger>
        <TabsTrigger value="purchases">구매정보</TabsTrigger>
      </TabsList>

      <!-- 아이템 탭 컨텐츠 -->
      <TabsContent value="items">
        <ItemList />
      </TabsContent>

      <!-- 레시피 탭 컨텐츠 -->
      <TabsContent value="recipes">
        <RecipeList />
      </TabsContent>

      <!-- NPC 탭 컨텐츠 -->
      <TabsContent value="npcs">
        <NPCList />
      </TabsContent>

      <!-- 위치 탭 컨텐츠 -->
      <TabsContent value="locations">
        <LocationList />
      </TabsContent>

      <!-- 구매정보 탭 컨텐츠 -->
      <TabsContent value="purchases">
        <PurchaseList />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
/**
 * # DataView 컴포넌트
 * 
 * ## 기능 설명
 * 게임 데이터를 조회할 수 있는 메인 뷰 컴포넌트
 * 아이템과 레시피 데이터를 탭으로 구분하여 표시
 * 
 * ## 주요 기능
 * - 아이템 목록과 레시피 목록을 탭으로 전환
 * - 각 탭은 독립적인 검색 및 필터링 기능 제공
 * - 페이지 제목 표시
 * - 탭 상태를 URL에 저장하여 새로고침 시에도 유지
 * 
 * ## 데이터 흐름
 * 1. 컴포넌트 마운트 시 URL query parameter에서 탭 상태 복원
 * 2. 사용자가 탭 클릭 시 `activeTab` 상태 변경 및 URL 업데이트
 * 3. 선택된 탭에 따라 ItemList 또는 RecipeList 렌더링
 * 
 * ## UI 구조
 * ```
 * ┌─────────────────────────────┐
 * │ 데이터 목록                  │ <- PageTitle
 * ├─────────────────────────────┤
 * │ [아이템] [레시피]            │ <- 탭 버튼
 * ├─────────────────────────────┤
 * │ ItemList 또는 RecipeList     │ <- 선택된 탭 컨텐츠
 * └─────────────────────────────┘
 * ```
 */
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ItemList from './components/ItemList.vue'
import RecipeList from './components/RecipeList.vue'
import NPCList from './components/NPCList.vue'
import LocationList from './components/LocationList.vue'
import PurchaseList from './components/PurchaseList.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import Tabs from '@/components/ui/tabs.vue'
import TabsList from '@/components/ui/tabs-list.vue'
import TabsTrigger from '@/components/ui/tabs-trigger.vue'
import TabsContent from '@/components/ui/tabs-content.vue'

type TabValue = 'items' | 'recipes' | 'npcs' | 'locations' | 'purchases'

// Route와 Router 사용
const route = useRoute()
const router = useRouter()

// 유효한 탭 값 목록
const validTabValues: TabValue[] = ['items', 'recipes', 'npcs', 'locations', 'purchases']
const defaultTab: TabValue = 'items'

// 현재 활성화된 탭 상태
const activeTab = ref<TabValue>(defaultTab)

/**
 * # 탭 변경 핸들러
 * 
 * 사용자가 탭을 클릭했을 때 URL을 업데이트하여 상태를 저장
 * 
 * @param value - 선택된 탭 값
 */
function handleTabChange(value: TabValue): void {
  activeTab.value = value
  // URL query parameter 업데이트 (replace로 히스토리에 남지 않도록)
  router.replace({ query: { ...route.query, tab: value } })
}

/**
 * # URL에서 탭 상태 복원
 * 
 * 컴포넌트 마운트 시 URL의 query parameter에서 탭 상태를 복원
 * 유효하지 않은 값이면 기본 탭(items)을 사용
 */
function restoreTabFromURL(): void {
  const tabFromURL = route.query.tab as string | undefined
  if (tabFromURL && validTabValues.includes(tabFromURL as TabValue)) {
    activeTab.value = tabFromURL as TabValue
  } else {
    // URL에 탭 정보가 없으면 기본 탭으로 설정하고 URL 업데이트
    router.replace({ query: { ...route.query, tab: defaultTab } })
    activeTab.value = defaultTab
  }
}

// 컴포넌트 마운트 시 URL에서 탭 상태 복원
onMounted(() => {
  restoreTabFromURL()
})
</script>

