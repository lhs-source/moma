<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-2">
      <input v-model="searchQuery" type="text" placeholder="아이템 이름 또는 ID로 검색..."
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      <select v-model="selectedCategory"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="">모든 카테고리</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <select v-model="selectedUsageType"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="">모든 사용처</option>
        <option value="레시피">레시피 재료</option>
        <option value="교환">교환 아이템</option>
        <option value="구매">구매 가능</option>
        <option value="제작">제작 가능</option>
      </select>
    </div>

    <div class="text-sm text-gray-600">
      총 {{ filteredItems.length }}개의 아이템
    </div>

    <!-- 아이템 그리드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <ItemCard v-for="item in filteredItems" :key="item.id" :item="item" />
    </div>

    <div v-if="filteredItems.length === 0" class="text-center py-12">
      <p class="text-gray-500">검색 조건에 맞는 아이템이 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { items } from '@/data/items'
import { recipes } from '@/data/recipes'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import ItemCard from './ItemCard.vue'

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedUsageType = ref('')

const categories = computed(() => {
  const categorySet = new Set<string>()
  items.forEach(item => {
    if (item.category) {
      categorySet.add(item.category)
    }
  })
  return Array.from(categorySet).sort()
})

const filteredItems = computed(() => {
  return items.filter(item => {
    const matchesSearch = !searchQuery.value ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value

    const matchesUsageType = !selectedUsageType.value || (() => {
      // ItemCard에서 계산된 값을 사용하지 않고 직접 계산 (필터링용)
      const usageTypes = []
      const usage = itemUsageIndex.getItemUsage(item.id)
      if (usage?.usageTypes.recipes.length) usageTypes.push('레시피')
      if (usage?.usageTypes.trades.length) usageTypes.push('교환')
      if (usage?.usageTypes.purchases.length) usageTypes.push('구매')

      switch (selectedUsageType.value) {
        case '레시피':
          return usageTypes.includes('레시피')
        case '교환':
          return usageTypes.includes('교환')
        case '구매':
          return usageTypes.includes('구매')
        case '제작':
          return recipes.some(recipe => recipe.resultItemId === item.id)
        default:
          return true
      }
    })()

    return matchesSearch && matchesCategory && matchesUsageType
  })
})
</script>
