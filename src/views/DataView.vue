<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold text-foreground">데이터 목록</h1>
    </div>

    <!-- 탭 컴포넌트 -->
    <Tabs v-model:value="activeTab" default-value="items">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="items">아이템</TabsTrigger>
        <TabsTrigger value="recipes">레시피</TabsTrigger>
      </TabsList>

      <TabsContent value="items">
        <ItemList />
      </TabsContent>

      <TabsContent value="recipes">
        <RecipeList />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ItemList from '@/components/data/ItemList.vue'
import RecipeList from '@/components/data/RecipeList.vue'
import Tabs from '@/components/ui/tabs.vue'
import TabsList from '@/components/ui/tabs-list.vue'
import TabsTrigger from '@/components/ui/tabs-trigger.vue'
import TabsContent from '@/components/ui/tabs-content.vue'

const activeTab = ref<'items' | 'recipes'>('items')
</script>
