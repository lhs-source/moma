<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-auto pr-1">
    <div v-for="recipe in recipes" :key="recipe.id" class="border border-gray-100 rounded p-3 hover:shadow-sm">
      <div class="flex items-start gap-3">
        <img :src="getItemImageUrl(recipe.resultItemId)" :alt="recipe.name" class="w-12 h-12 rounded object-cover"
          @error="handleImageError" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <div class="truncate">
              <div class="font-semibold">{{ recipe.name }}</div>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" class="px-2 py-1 border rounded text-gray-700 hover:bg-gray-50"
                @click="decrementCount(recipe.id)">-</button>
              <input type="number" min="0" class="w-16 text-center px-2 py-1 border rounded"
                :value="selectedCounts[recipe.id] ?? 0"
                @input="onChange(recipe.id, ($event.target as HTMLInputElement).value)" />
              <button type="button" class="px-2 py-1 border rounded text-gray-700 hover:bg-gray-50"
                @click="incrementCount(recipe.id)">+</button>
            </div>
          </div>
          <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
            <div v-for="ri in recipe.requiredItems" :key="ri.itemId" class="flex items-center gap-2">
              <img :src="getItemImageUrl(ri.itemId)" :alt="getItemName(ri.itemId)" class="w-5 h-5 rounded object-cover"
                @error="handleImageError" />
              <span class="text-gray-700 truncate">{{ getItemName(ri.itemId) }}</span>
              <span class="ml-auto text-gray-500">x{{ ri.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/data/schemas/recipe'

const props = withDefaults(defineProps<{
  recipes: Recipe[]
  selectedCounts: Record<string, number>
  getItemName: (id: string) => string
  getItemImageUrl: (id: string) => string
  handleImageError: (e: Event) => void
}>(), {
  recipes: () => [],
  selectedCounts: () => ({} as Record<string, number>)
})

const emit = defineEmits<{
  (ev: 'changeCount', id: string, count: number): void
}>()

function onChange(id: string, val: string) {
  const n = Math.max(0, Number(val) || 0)
  emit('changeCount', id, n)
}

function incrementCount(id: string) {
  const current = props.selectedCounts[id] ?? 0
  emit('changeCount', id, current + 1)
}

function decrementCount(id: string) {
  const current = props.selectedCounts[id] ?? 0
  emit('changeCount', id, Math.max(0, current - 1))
}
</script>
