<script setup lang="ts">
import TimerInfo from '../../components/TimerInfo.vue'
import TodoList from '../../components/TodoList.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <PageTitle class="mb-8 text-center">마비노기 모바일 도우미</PageTitle>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- 타이머 정보 -->
      <div class="bg-card border border-border p-6 rounded-lg">
        <TimerInfo />
      </div>

      <!-- TODO 목록 -->
      <div class="bg-card border border-border p-6 rounded-lg">
        <TodoList />
      </div>
    </div>
  </main>
</template>
