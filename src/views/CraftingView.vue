<template>
  <div class="crafting-view container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">제작 시스템</h1>
      <MembershipToggle />
    </div>
    
    <!-- 3열 레이아웃 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      <!-- 첫 번째 열: 가공처 + 제작 항목 -->
      <div class="flex flex-col space-y-4">
        <CategoryList />
        <ItemList />
      </div>
      
      <!-- 두 번째 열: 선택된 항목 -->
      <div>
        <SelectedItems />
      </div>
      
      <!-- 세 번째 열: 제작 결과 -->
      <div>
        <CraftingResults />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryList from '@/components/crafting/CategoryList.vue';
import ItemList from '@/components/crafting/ItemList.vue';
import SelectedItems from '@/components/crafting/SelectedItems.vue';
import CraftingResults from '@/components/crafting/CraftingResults.vue';
import MembershipToggle from '@/components/crafting/MembershipToggle.vue';
</script>
