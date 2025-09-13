<template>
  <div class="mb-4">
    <h3 class="text-sm font-semibold text-foreground mb-2">주간 구매 가능 횟수 및 가격</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div v-for="item in items" :key="item.itemId" class="border border-border rounded-lg p-3 bg-muted/50">
        <div class="flex items-center gap-2 mb-2">
          <img :src="getItemImageUrl(item.itemId)" :alt="getItemName(item.itemId)" class="w-6 h-6 rounded object-cover"
            @error="handleImageError" />
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-foreground text-sm truncate">{{ getItemName(item.itemId) }}</div>
            <div class="text-xs text-muted-foreground">총 {{ item.totalBuyableCount }}개 구매 가능</div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-foreground">{{ item.totalBuyableCount }}개</div>
            <div class="text-xs text-muted-foreground">주간</div>
          </div>
        </div>
        <div class="bg-card rounded p-2 space-y-1">
          <div v-for="recipe in item.recipes" :key="recipe.id"
            class="flex items-center justify-between text-xs border-b border-border pb-1 last:border-b-0">
            <div class="flex items-center gap-1 min-w-0">
              <span class="font-medium truncate text-foreground">{{ recipe.name }}</span>
              <span class="text-muted-foreground">({{ recipe.npcId }})</span>
            </div>
            <div class="text-right ml-2">
              <div class="font-semibold text-foreground">{{ recipe.price }}G</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="items.length === 0" class="col-span-2 text-sm text-muted-foreground text-center py-4">구매 가능한 식재료가 없습니다
      </div>
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
