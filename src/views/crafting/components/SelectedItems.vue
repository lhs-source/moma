<template>
  <div class="selected-items">
    <h2 class="text-lg font-bold mb-2 text-foreground">선택된 항목</h2>
    <div v-if="hasSelectedItems" class="overflow-y-auto">
      <div v-for="(categoryItems, category) in selectedItemsByCategory" :key="category" class="mb-3">
        <div class="flex justify-between items-center mb-1 px-2">
          <h3 class="text-sm font-semibold text-foreground">{{ category }}</h3>
          <button
            class="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 border border-red-300 hover:border-red-400 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-300 dark:border-red-800 font-medium transition-colors"
            @click="clearCategory(category)" title="이 카테고리의 모든 항목 삭제">
            모두 삭제
          </button>
        </div>

        <table class="w-full text-xs border-collapse mb-2">
          <thead class="bg-muted">
            <tr class="border-b border-border">
              <th class="text-left p-1 font-semibold text-foreground">항목</th>
              <th class="text-center p-1 font-semibold text-foreground w-16">횟수</th>
              <th class="text-center p-1 font-semibold text-foreground w-16">생산량</th>
              <th class="text-center p-1 font-semibold text-foreground w-24">작업</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="selectedItem in categoryItems" :key="selectedItem.recipe.id"
              class="border-b border-border hover:bg-accent/50">
              <td class="p-1">
                <div class="flex items-center gap-1">
                  <img :src="getItemImageUrlById(selectedItem.recipe.resultItemId)" :alt="selectedItem.recipe.name"
                    class="w-6 h-6 object-cover rounded border border-border">
                  <span class="font-medium text-foreground">{{ selectedItem.recipe.name }}</span>
                </div>
              </td>
              <td class="p-1 text-center text-foreground">{{ selectedItem.quantity }}회</td>
              <td class="p-1 text-center text-foreground">{{ getTotalQuantity(selectedItem) }}개</td>
              <td class="p-1">
                <div class="flex items-center justify-center gap-1">
                  <button
                    class="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-blue-200 text-gray-700 hover:text-blue-700 border border-gray-300 hover:border-blue-400 dark:bg-gray-800 dark:hover:bg-blue-950 dark:text-gray-300 dark:hover:text-blue-300 dark:border-gray-700 dark:hover:border-blue-600 font-bold transition-colors"
                    @click="decrementItem(selectedItem.recipe)" title="횟수 감소">
                    -
                  </button>
                  <button
                    class="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-blue-200 text-gray-700 hover:text-blue-700 border border-gray-300 hover:border-blue-400 dark:bg-gray-800 dark:hover:bg-blue-950 dark:text-gray-300 dark:hover:text-blue-300 dark:border-gray-700 dark:hover:border-blue-600 font-bold transition-colors"
                    @click="incrementItem(selectedItem.recipe)" title="횟수 증가">
                    +
                  </button>
                  <button
                    class="w-6 h-6 flex items-center justify-center rounded bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 dark:bg-red-950 dark:hover:bg-red-900 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:border-red-700 font-bold transition-colors"
                    @click="removeItem(selectedItem.recipe.id)" title="항목 삭제">
                    ×
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="text-center py-4 text-muted-foreground text-sm">
      선택된 항목이 없습니다
    </div>

    <button v-if="hasSelectedItems"
      class="w-full mt-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold transition-colors border border-red-600 hover:border-red-700 dark:bg-red-700 dark:hover:bg-red-800"
      @click="clearAllItems" title="모든 선택 항목 초기화">
      선택 초기화
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCraftingStore } from '@/stores/crafting';
import { getItemImageUrlById } from '@/utils/itemUtils';
import type { Recipe } from '@/data/schemas/recipe';

const craftingStore = useCraftingStore();

// 카테고리별로 그룹화된 선택된 항목들
const selectedItemsByCategory = computed(() => craftingStore.selectedItemsByCategory);

// 선택된 항목이 있는지 확인
const hasSelectedItems = computed(() => craftingStore.hasSelectedItems);

// 항목 수량 증가 함수
function incrementItem(recipe: Recipe) {
  craftingStore.selectItem(recipe, 1);
}

// 항목 수량 감소 함수
function decrementItem(recipe: Recipe) {
  craftingStore.selectItem(recipe, -1);
}

// 항목 삭제 함수
function removeItem(recipeId: string) {
  craftingStore.removeItem(recipeId);
}

// 카테고리 초기화 함수
function clearCategory(category: string) {
  craftingStore.clearCategory(category);
}

// 모든 선택 초기화 함수
function clearAllItems() {
  craftingStore.clearSelectedItems();
}

// 총 생산 개수를 계산하는 함수
function getTotalQuantity(selectedItem: { recipe: Recipe; quantity: number }): number {
  return selectedItem.quantity * (selectedItem.recipe.resultQuantity || 1);
}
</script>

<style scoped>
.selected-items {
  min-width: 300px;
  width: 100%;
}
</style>