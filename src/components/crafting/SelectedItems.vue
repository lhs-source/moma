<template>
  <div class="selected-items">
    <h2 class="text-xl font-bold mb-3">선택된 항목</h2>
    <div v-if="hasSelectedItems" class="overflow-y-auto max-h-96 pr-2">
      <div v-for="(categoryItems, category) in selectedItemsByCategory" :key="category" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium">{{ category }}</h3>
          <button class="text-xs text-red-500 hover:text-red-700" @click="clearCategory(category)">
            모두 삭제
          </button>
        </div>

        <div v-for="selectedItem in categoryItems" :key="selectedItem.recipe.id"
          class="selected-item-card p-2 mb-2 rounded border border-gray-200 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <img :src="getItemImageUrlById(selectedItem.recipe.resultItemId)" :alt="selectedItem.recipe.name"
              class="w-8 h-8 object-cover rounded border border-gray-200">
            <div>
              <span class="font-medium">{{ selectedItem.recipe.name }}</span>
              <div class="text-sm text-gray-600 ml-2">
                <span>{{ selectedItem.quantity }}회</span>
                <span class="text-gray-400 ml-1">({{ getTotalQuantity(selectedItem) }}개 생산)</span>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-1">
            <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
              @click="decrementItem(selectedItem.recipe)">
              -
            </button>
            <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
              @click="incrementItem(selectedItem.recipe)">
              +
            </button>
            <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-red-500"
              @click="removeItem(selectedItem.recipe.id)">
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-4 text-gray-500">
      선택된 항목이 없습니다
    </div>

    <button v-if="hasSelectedItems" class="w-full mt-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
      @click="clearAllItems">
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