<template>
  <div class="category-list h-auto">
    <h2 class="text-lg font-bold mb-2 text-foreground">
      {{ categoryTitle }}
    </h2>
    <div class="overflow-y-auto max-h-48 grid grid-cols-2 gap-1">
      <button v-for="category in categories" :key="category"
        :class="[
          'category-item p-2 rounded cursor-pointer border text-sm transition-colors font-medium',
          selectedCategory === category
            ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            : 'bg-background hover:bg-blue-100 hover:border-blue-400 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 dark:hover:border-blue-600 border-border']"
        @click="selectCategory(category)">
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCraftingStore } from '@/stores/crafting';

const craftingStore = useCraftingStore();

// 카테고리 목록
const categories = computed(() => craftingStore.categories);

// 현재 선택된 카테고리
const selectedCategory = computed(() => craftingStore.selectedCategory);

// 현재 탭
const activeTab = computed(() => craftingStore.activeTab);

// 카테고리 제목
const categoryTitle = computed(() => {
  return activeTab.value === 'crafting' ? '제작 계열' : '재료 가공';
});

// 카테고리 선택 함수
function selectCategory(category: string) {
  craftingStore.setSelectedCategory(category);
}
</script>

<style scoped>
.category-list {
  min-width: 150px;
  width: 100%;
}
</style>
