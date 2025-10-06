<template>
  <div class="category-list h-auto">
    <h2 class="text-lg font-bold mb-2 text-foreground">
      {{ categoryTitle }}
    </h2>
    <div class="overflow-y-auto max-h-48 grid grid-cols-2 gap-1">
      <div v-for="category in categories" :key="category" :class="[
        'category-item p-1.5 rounded cursor-pointer border hover:bg-accent text-sm transition-colors',
        selectedCategory === category ? 'bg-accent border-foreground font-semibold' : 'border-border']"
        @click="selectCategory(category)">
        <span class="text-foreground">{{ category }}</span>
      </div>
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
