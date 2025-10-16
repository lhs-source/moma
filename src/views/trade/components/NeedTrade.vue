<script setup lang="ts">
import type { Recipe } from '@/data/schemas/recipe'
import { RECIPE_CATEGORY } from '@/data/schemas/recipe'
import { useItemStore } from '@/stores/item';

interface Props {
  recipe: Recipe;
  getItemRecipe: (itemId: string) => Recipe | undefined;
}

const itemStore = useItemStore();

defineProps<Props>()
</script>

<template>
  <!-- 레시피 정보 표시 -->
  <div class="mt-2 text-xs text-muted-foreground">
    <div class="font-medium mb-1">
      <span v-if="recipe.category === RECIPE_CATEGORY.TRADE" class="text-foreground">교환 방법:</span>
      <span v-else>필요 재료:</span>
    </div>
    <div class="grid grid-cols-1 gap-1">
      <div v-for="item in recipe.requiredItems" :key="item.itemId"
        :class="{ 'bg-accent rounded p-1': recipe.category === RECIPE_CATEGORY.TRADE }" class="flex flex-col gap-1">
        <div class="flex items-center gap-1">
          <img :src="itemStore.getItemById(item.itemId)?.imageUrl" :alt="itemStore.getItemById(item.itemId)?.name"
            class="w-3 h-3 object-contain" />
          <span>{{ itemStore.getItemById(item.itemId)?.name }} x{{ item.quantity }}</span>
        </div>

        <!-- 교환 레시피인 경우, 필요한 아이템의 레시피 표시 -->
        <div v-if="recipe.category === RECIPE_CATEGORY.TRADE && getItemRecipe(item.itemId)"
          class="ml-4 mt-1 p-1 bg-muted rounded-sm border-l-2 border-border">
          <!-- 글리니스의 애플 밀크티에 대한 특별 표시 -->
          <div v-if="item.itemId === 'glenis_apple_milk_tea'" class="bg-accent p-1 rounded mb-2">
            <div class="flex items-center gap-1 text-foreground font-medium text-[10px]">
              글리니스의 애플 밀크티 - 특별 정보
            </div>
            <div class="text-[10px] text-muted-foreground">
              하루에 1개씩 생산 가능, 상급 목재+ 교환에 3개씩 필요해서 주 2회 교환(총 6개) 필요
            </div>
          </div>

          <div class="flex items-center gap-1 text-foreground font-medium mb-1 text-[10px]">
            {{ getItemRecipe(item.itemId)?.name }} 제작 방법
          </div>
          <div class="space-y-1">
            <div v-for="recipeItem in getItemRecipe(item.itemId)?.requiredItems" :key="recipeItem.itemId"
              class="flex items-center gap-1 text-[10px]">
              <img :src="itemStore.getItemById(recipeItem.itemId)?.imageUrl"
                :alt="itemStore.getItemById(recipeItem.itemId)?.name" class="w-2 h-2 object-contain" />
              <span>{{ itemStore.getItemById(recipeItem.itemId)?.name }} x{{ recipeItem.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
