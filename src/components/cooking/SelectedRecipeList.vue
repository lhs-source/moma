<template>
  <div class="space-y-2 max-h-64 overflow-auto pr-1">
    <div v-for="recipe in recipes" :key="recipe.id"
      class="flex items-center gap-2 p-2 border border-border rounded bg-card">
      <img :src="getItemImageUrl(recipe.resultItemId)" :alt="recipe.name" class="w-8 h-8 rounded object-cover"
        @error="handleImageError" />
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium truncate text-foreground">{{ recipe.name }}</div>
      </div>
      <div class="flex items-center gap-2">
        <div class="text-sm font-semibold text-foreground">x{{ selectedCounts[recipe.id] ?? 0 }}</div>
        <button type="button" class="text-xs text-destructive hover:underline"
          @click="emit('remove', recipe.id)">삭제</button>
      </div>
    </div>
    <div v-if="recipes.length === 0" class="text-sm text-muted-foreground text-center py-4">선택된 요리가 없습니다</div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/data/schemas/recipe'

const props = withDefaults(defineProps<{
  recipes: Recipe[]
  selectedCounts: Record<string, number>
  getItemImageUrl: (id: string) => string
  handleImageError: (e: Event) => void
}>(), {
  recipes: () => [],
  selectedCounts: () => ({} as Record<string, number>)
})

const emit = defineEmits<{
  (ev: 'remove', id: string): void
}>()
</script>
