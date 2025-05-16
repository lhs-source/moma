<script setup lang="ts">
import TradeList from '../components/trade/TradeList.vue'
import WeeklyRequirements from '../components/trade/WeeklyRequirements.vue'
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">마비노기 모바일 물물교환</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- 주간 필요 아이템 -->
      <div class="lg:col-span-1">
        <WeeklyRequirements />
      </div>
      
      <!-- 교환 목록 -->
      <div class="lg:col-span-3">
        <TradeList />
      </div>
    </div>
  </div>
</template> 