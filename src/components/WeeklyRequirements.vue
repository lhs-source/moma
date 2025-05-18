<script setup lang="ts">
import { computed } from 'vue'
import { calculateWeeklyRequirements, getItemInfo, formatQuantity } from '@/utils/tradeUtils'

const weeklyRequirements = computed(() => calculateWeeklyRequirements())
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">주간 교환 필요 아이템</h2>
    <div class="grid gap-4">
      <div v-for="requirement in weeklyRequirements" :key="requirement.itemId" class="bg-card p-4 rounded-lg">
        <div class="flex items-center gap-4">
          <img 
            :src="getItemInfo(requirement.itemId)?.imageUrl" 
            :alt="getItemInfo(requirement.itemId)?.name"
            class="w-16 h-16 object-contain"
          />
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ getItemInfo(requirement.itemId)?.name }}</h3>
            <p class="text-muted-foreground">{{ getItemInfo(requirement.itemId)?.description }}</p>
            <p class="text-primary font-medium mt-1">
              총 필요 수량: {{ formatQuantity(requirement.totalQuantity) }}개
            </p>
          </div>
        </div>
        <div class="mt-4">
          <h4 class="text-sm font-medium mb-2">교환 목록:</h4>
          <div class="grid gap-2">
            <div v-for="trade in requirement.trades" :key="trade.id" class="text-sm">
              <span class="text-muted-foreground">{{ trade.npc }}</span>
              <span class="mx-2">→</span>
              <span class="text-primary">{{ formatQuantity(trade.quantity) }}개</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 