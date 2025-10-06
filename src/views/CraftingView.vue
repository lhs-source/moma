<template>
  <div class="crafting-view container mx-auto p-3">
    <div class="flex justify-between items-center mb-3">
      <h1 class="text-xl font-bold text-foreground">가공 시스템</h1>
      <MembershipToggle />
    </div>

    <!-- 탭 -->
    <Tabs default-value="crafting" class="w-full" @update:value="handleTabChange">
      <TabsList class="mb-3">
        <TabsTrigger value="crafting">제작</TabsTrigger>
        <TabsTrigger value="processing">재료 가공</TabsTrigger>
      </TabsList>

      <TabsContent value="crafting">
        <!-- 3열 레이아웃 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[calc(100vh-150px)]">
          <!-- 첫 번째 열: 제작 계열 + 제작 항목 -->
          <div class="flex flex-col space-y-2">
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
      </TabsContent>

      <TabsContent value="processing">
        <!-- 3열 레이아웃 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[calc(100vh-150px)]">
          <!-- 첫 번째 열: 재료 가공 + 제작 항목 -->
          <div class="flex flex-col space-y-2">
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
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useCraftingStore, type CraftingTabType } from '@/stores/crafting';
import CategoryList from '@/components/crafting/CategoryList.vue';
import ItemList from '@/components/crafting/ItemList.vue';
import SelectedItems from '@/components/crafting/SelectedItems.vue';
import CraftingResults from '@/components/crafting/CraftingResults.vue';
import MembershipToggle from '@/components/crafting/MembershipToggle.vue';
import Tabs from '@/components/ui/tabs.vue';
import TabsList from '@/components/ui/tabs-list.vue';
import TabsTrigger from '@/components/ui/tabs-trigger.vue';
import TabsContent from '@/components/ui/tabs-content.vue';

const craftingStore = useCraftingStore();

function handleTabChange(value: string) {
  craftingStore.setActiveTab(value as CraftingTabType);
}
</script>
