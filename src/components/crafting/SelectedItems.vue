<template>
  <div class="selected-items">
    <h2 class="text-lg font-bold mb-2 text-foreground">선택된 항목</h2>
    <div v-if="hasSelectedItems" class="overflow-y-auto">
      <div v-for="(categoryItems, category) in selectedItemsByCategory" :key="category" class="mb-3">
        <div class="flex justify-between items-center mb-1 px-2">
          <h3 class="text-sm font-semibold text-foreground">{{ category }}</h3>
          <button class="text-xs text-destructive hover:text-destructive/80" @click="clearCategory(category)">
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
                    class="w-5 h-5 flex items-center justify-center rounded hover:bg-accent text-foreground border border-border"
                    @click="decrementItem(selectedItem.recipe)">
                    -
                  </button>
                  <button
                    class="w-5 h-5 flex items-center justify-center rounded hover:bg-accent text-foreground border border-border"
                    @click="incrementItem(selectedItem.recipe)">
                    +
                  </button>
                  <button
                    class="w-5 h-5 flex items-center justify-center rounded hover:bg-accent text-destructive border border-destructive"
                    @click="removeItem(selectedItem.recipe.id)">
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
      class="w-full mt-2 py-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded text-sm"
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