<script setup lang="ts">
import type { Recipe } from '@/data/schemas/recipe'
import type { WeeklyTrade } from './WeeklyRequirements.vue'
import { useItemStore } from '@/stores/item'
import NeedRecipe from './NeedRecipe.vue'
import NeedTrade from './NeedTrade.vue'

interface Props {
  weeklyRequirements: WeeklyTrade
  getItemRecipe: (itemId: string) => Recipe | undefined
}

const itemStore = useItemStore();

const props = defineProps<Props>()
</script>

<template>
  <template v-if="Object.keys(weeklyRequirements).length > 0">
    <h3 class="text-lg font-semibold mb-2">주간 교환 필요 제작 아이템</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-[1080px] mx-auto">
      <div v-for="(requirement, key) in weeklyRequirements" :key="key"
        class="flex flex-col p-3 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <h3 class="font-medium text-sm">
            <div class="flex items-center gap-1">
              <img :src="itemStore.getItemById(requirement.itemId)?.imageUrl"
                :alt="itemStore.getItemById(requirement.itemId)?.name" class="w-4 h-4 object-contain" />
              <span>{{ itemStore.getItemById(requirement.itemId)?.name }}</span>
            </div>
            <span class="text-foreground ml-1">{{ requirement.totalNeedItemCount }}개</span>
            <span class="text-muted-foreground ml-1">
              ({{requirement.trades?.map(trade =>
                `${itemStore.getItemById(trade.resultItemId)?.name} ${trade.receiveItemQuantity}개`
              ).join(', ')}})
            </span>
          </h3>
        </div>
        <NeedRecipe v-if="requirement.recipe" :recipe="requirement.recipe" :get-item-recipe="props.getItemRecipe" />
        <NeedTrade v-if="requirement.trade" :recipe="requirement.trade" :get-item-recipe="props.getItemRecipe" />
      </div>
    </div>
  </template>
</template>
