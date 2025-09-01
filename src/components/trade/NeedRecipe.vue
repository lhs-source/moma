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
      필요 재료:
    </div>
    <div class="grid grid-cols-1 gap-1">
      <div v-for="item in recipe.requiredItems" :key="item.itemId"
        :class="{ 'bg-green-50 dark:bg-green-900/20 rounded p-1': recipe.category === RECIPE_CATEGORY.TRADE }"
        class="flex flex-col gap-1">
        <div class="flex items-center gap-1">
          <img :src="itemStore.getItemById(item.itemId)?.imageUrl" :alt="itemStore.getItemById(item.itemId)?.name"
            class="w-3 h-3 object-contain" />
          <span>{{ itemStore.getItemById(item.itemId)?.name }} x{{ item.quantity }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
