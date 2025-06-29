<template>
  <div class="crafting-view container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">제작 시스템</h1>
      <MembershipToggle />
    </div>
    
    <!-- 세로 레이아웃으로 변경 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="md:col-span-1">
        <CategoryList />
      </div>
      <div class="md:col-span-2">
        <ItemList />
      </div>
      <div class="md:col-span-1">
        <SelectedItems />
      </div>
    </div>
    
    <CraftingResults />
  </div>
</template>

<script setup lang="ts">
import CategoryList from '@/components/crafting/CategoryList.vue';
import ItemList from '@/components/crafting/ItemList.vue';
import SelectedItems from '@/components/crafting/SelectedItems.vue';
import CraftingResults from '@/components/crafting/CraftingResults.vue';
import MembershipToggle from '@/components/crafting/MembershipToggle.vue';
</script>
