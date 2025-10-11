<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <PageTitle>데이터 목록</PageTitle>
    </div>

    <!-- 탭 컴포넌트 -->
    <Tabs v-model:value="activeTab" default-value="items">
      <!-- 탭 버튼 목록 -->
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="items">아이템</TabsTrigger>
        <TabsTrigger value="recipes">레시피</TabsTrigger>
      </TabsList>

      <!-- 아이템 탭 컨텐츠 -->
      <TabsContent value="items">
        <ItemList />
      </TabsContent>

      <!-- 레시피 탭 컨텐츠 -->
      <TabsContent value="recipes">
        <RecipeList />
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
 * 
 * ## 데이터 흐름
 * 1. 컴포넌트 마운트 시 기본 'items' 탭 표시
 * 2. 사용자가 탭 클릭 시 `activeTab` 상태 변경
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
import { ref } from 'vue'
import ItemList from '@/components/data/ItemList.vue'
import RecipeList from '@/components/data/RecipeList.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import Tabs from '@/components/ui/tabs.vue'
import TabsList from '@/components/ui/tabs-list.vue'
import TabsTrigger from '@/components/ui/tabs-trigger.vue'
import TabsContent from '@/components/ui/tabs-content.vue'

// 현재 활성화된 탭 상태
const activeTab = ref<'items' | 'recipes'>('items')
</script>
