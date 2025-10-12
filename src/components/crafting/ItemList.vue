<template>
  <div class="item-list flex-1 flex flex-col">
    <h2 class="text-lg font-bold mb-2 text-foreground">제작 항목</h2>
    <div v-if="selectedCategory" class="overflow-y-auto flex-1">
      <table class="w-full text-sm border-collapse">
        <thead class="sticky top-0 bg-muted z-10">
          <tr class="border-b border-border">
            <th class="text-left p-2 font-semibold text-foreground">항목</th>
            <th class="text-center p-2 font-semibold text-foreground w-16">생산량</th>
            <th class="text-center p-2 font-semibold text-foreground w-20">시간</th>
            <th class="text-left p-2 font-semibold text-foreground">재료</th>
            <th class="text-center p-2 font-semibold text-foreground w-16"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in categoryRecipes" :key="recipe.id"
            class="border-b border-border hover:bg-accent/50 transition-colors">
            <td class="p-2">
              <div class="flex items-center gap-2">
                <img :src="getItemImageUrlById(recipe.resultItemId)" :alt="recipe.name"
                  class="w-8 h-8 object-cover rounded border border-border">
                <span class="font-medium text-foreground">{{ recipe.name }}</span>
              </div>
            </td>
            <td class="p-2 text-center text-foreground">{{ recipe.resultQuantity || 1 }}개</td>
            <td class="p-2 text-center text-foreground">{{ formatTime(recipe.craftingTime || 0) }}</td>
            <td class="p-2">
              <div class="flex flex-wrap gap-1">
                <span v-for="requiredItem in recipe.requiredItems" :key="requiredItem.itemId"
                  class="inline-flex items-center gap-1 text-xs">
                  <img :src="getItemImageUrlById(requiredItem.itemId)" :alt="getItemInfoById(requiredItem.itemId).name"
                    class="w-4 h-4 object-cover rounded">
                  <span class="text-foreground">{{ getItemInfoById(requiredItem.itemId).name }}:{{ requiredItem.quantity
                    }}</span>
                </span>
              </div>
            </td>
            <td class="p-2 text-center">
              <button
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors border border-blue-600 hover:border-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                @click="addItem(recipe)" title="제작 목록에 추가">
                추가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center py-4 text-muted-foreground text-sm">
      카테고리를 선택해주세요
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCraftingStore } from '@/stores/crafting';
import { formatTime } from '@/utils/timeUtils';
import { getItemImageUrlById, getItemInfoById } from '@/utils/itemUtils';
import type { Recipe } from '@/data/schemas/recipe';

const craftingStore = useCraftingStore();

// 선택된 카테고리
const selectedCategory = computed(() => craftingStore.selectedCategory);

// 선택된 카테고리의 레시피 목록
const categoryRecipes = computed(() => craftingStore.selectedCategoryRecipes);

// 아이템 추가 함수
function addItem(recipe: Recipe) {
  craftingStore.selectItem(recipe, 1);
}
</script>

<style scoped>
.item-list {
  min-width: 300px;
  width: 100%;
}
</style>
