<template>
  <div class="item-list flex-1 flex flex-col">
    <h2 class="text-xl font-bold mb-3 text-foreground">제작 항목</h2>
    <div v-if="selectedCategory" class="overflow-y-auto flex-1 pr-2">
      <div v-for="recipe in categoryRecipes" :key="recipe.id"
        class="item-card p-3 mb-3 rounded border border-border bg-card hover:bg-accent">
        <div class="flex items-start gap-3 mb-3">
          <img :src="getItemImageUrlById(recipe.resultItemId)" :alt="recipe.name"
            class="w-12 h-12 object-cover rounded border border-border">
          <div class="flex-1">
            <div class="font-medium text-lg text-foreground">{{ recipe.name }}</div>
            <div class="text-sm text-muted-foreground">생산량: {{ recipe.resultQuantity || 1 }}개</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="font-medium mb-1 text-foreground">시간:</div>
            <div class="pl-2 text-foreground">{{ formatTime(recipe.craftingTime || 0) }}</div>
          </div>

          <div>
            <div class="font-medium mb-1 text-foreground">재료:</div>
            <ul class="pl-2">
              <li v-for="requiredItem in recipe.requiredItems" :key="requiredItem.itemId"
                class="mb-1 flex items-center gap-2">
                <img :src="getItemImageUrlById(requiredItem.itemId)" :alt="getItemInfoById(requiredItem.itemId).name"
                  class="w-4 h-4 object-cover rounded">
                <span class="text-foreground">{{ getItemInfoById(requiredItem.itemId).name }}: {{ requiredItem.quantity
                }}개</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex justify-end mt-3">
          <button class="bg-foreground hover:bg-foreground/90 text-background px-3 py-1 rounded text-sm"
            @click="addItem(recipe)">
            추가
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-4 text-muted-foreground">
      가공처를 선택해주세요
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
