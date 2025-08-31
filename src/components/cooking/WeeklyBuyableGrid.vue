<template>
  <div class="mb-4">
    <h3 class="text-sm font-semibold text-gray-700 mb-2">주간 구매 가능 횟수 및 가격</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div v-for="item in items" :key="item.itemId" class="border border-gray-200 rounded-lg p-3 bg-gray-50">
        <div class="flex items-center gap-2 mb-2">
          <img :src="getItemImageUrl(item.itemId)" :alt="getItemName(item.itemId)" class="w-6 h-6 rounded object-cover"
            @error="handleImageError" />
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-gray-800 text-sm truncate">{{ getItemName(item.itemId) }}</div>
            <div class="text-xs text-gray-600">총 {{ item.totalBuyableCount }}개 구매 가능</div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-blue-600">{{ item.totalBuyableCount }}개</div>
            <div class="text-xs text-gray-500">주간</div>
          </div>
        </div>
        <div class="bg-white rounded p-2 space-y-1">
          <div v-for="recipe in item.recipes" :key="recipe.id"
            class="flex items-center justify-between text-xs border-b border-gray-100 pb-1 last:border-b-0">
            <div class="flex items-center gap-1 min-w-0">
              <span class="font-medium truncate">{{ recipe.name }}</span>
              <span class="text-gray-500">({{ recipe.npcId }})</span>
            </div>
            <div class="text-right ml-2">
              <div class="font-semibold text-green-600">{{ recipe.price }}G</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="items.length === 0" class="col-span-2 text-sm text-gray-500 text-center py-4">구매 가능한 식재료가 없습니다</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  items: Array<{ itemId: string; totalBuyableCount: number; recipes: Array<{ id: string; name: string; price: number; npcId: string }> }>
  getItemName: (id: string) => string
  getItemImageUrl: (id: string) => string
  handleImageError: (e: Event) => void
}>(), {
  items: () => []
})
</script>
