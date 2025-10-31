<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <PageTitle>8성 룬 도감</PageTitle>
    </div>

    <!-- 룬 목록 -->
    <RuneList />
  </div>
</template>

<script setup lang="ts">
/**
 * # RuneView 컴포넌트
 * 
 * ## 기능 설명
 * 8성 룬 도감 메인 뷰 컴포넌트
 * 
 * ## 주요 기능
 * - 페이지 제목 표시
 * - 룬 목록 컴포넌트 렌더링
 */
import PageTitle from '@/components/ui/PageTitle.vue'
import RuneList from './components/RuneList.vue'
</script>

