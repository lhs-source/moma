<template>
  <div class="category-list h-auto">
    <h2 class="text-xl font-bold mb-3">가공처</h2>
    <div class="overflow-y-auto max-h-60 pr-2">
      <div 
        v-for="category in categories" 
        :key="category"
        :class="['category-item p-2 mb-2 rounded cursor-pointer border hover:bg-gray-100', 
                selectedCategory === category ? 'bg-blue-50 border-blue-300' : 'border-gray-200']"
        @click="selectCategory(category)"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { craftingData } from '@/data/crafting';
import { useCraftingStore } from '@/stores/crafting';

const craftingStore = useCraftingStore();

// 카테고리 목록
const categories = computed(() => Object.keys(craftingData));

// 현재 선택된 카테고리
const selectedCategory = computed(() => craftingStore.selectedCategory);

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
