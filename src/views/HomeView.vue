<script setup lang="ts">
import TimerInfo from '../components/TimerInfo.vue'
import TodoList from '../components/TodoList.vue'
import ShadcnExample from '../components/ShadcnExample.vue'
import SelectTest from '../components/SelectTest.vue'
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">마비노기 모바일 도우미</h1>

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

    <!-- shadcn/vue 예제 -->
    <div class="bg-card border border-border rounded-lg p-6">
      <ShadcnExample />
    </div>

    <!-- Select 테스트 -->
    <div class="bg-card border border-border rounded-lg p-6">
      <SelectTest />
    </div>
  </main>
</template>
