<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold">데이터 목록</h1>
    </div>

    <!-- 탭 네비게이션 -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button @click="activeTab = 'items'" :class="[
          'py-2 px-1 border-b-2 font-medium text-sm',
          activeTab === 'items'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]">
          아이템
        </button>
        <button @click="activeTab = 'recipes'" :class="[
          'py-2 px-1 border-b-2 font-medium text-sm',
          activeTab === 'recipes'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]">
          레시피
        </button>
      </nav>
    </div>

    <!-- 탭 컨텐츠 -->
    <ItemList v-if="activeTab === 'items'" />
    <RecipeList v-if="activeTab === 'recipes'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ItemList from '@/components/data/ItemList.vue'
import RecipeList from '@/components/data/RecipeList.vue'

const activeTab = ref<'items' | 'recipes'>('items')
</script>
