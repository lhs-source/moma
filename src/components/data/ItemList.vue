<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-2">
      <Input v-model="searchQuery" type="text" placeholder="아이템 이름 또는 ID로 검색..." />

      <Select v-model="selectedCategory" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 카테고리</SelectItem>
          <SelectItem v-for="category in itemStore.categories" :key="category" :value="category">
            {{ category }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select v-model="selectedUsageType" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 사용처" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 사용처</SelectItem>
          <SelectItem value="레시피">레시피 재료</SelectItem>
          <SelectItem value="교환">교환 아이템</SelectItem>
          <SelectItem value="구매">구매 가능</SelectItem>
          <SelectItem value="제작">제작 가능</SelectItem>
          <SelectItem value="교환으로 얻을 수 있음">교환으로 얻을 수 있음</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="text-sm text-muted-foreground">
      총 {{ filteredItems.length }}개의 아이템
    </div>

    <!-- 아이템 그리드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <ItemCard v-for="item in filteredItems" :key="item.id" :item="item" />
    </div>

    <div v-if="filteredItems.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">검색 조건에 맞는 아이템이 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useItemStore } from '@/stores/item'
import { useRecipesStore } from '@/stores/recipes'
import { useTradeStore } from '@/stores/trade'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import ItemCard from './ItemCard.vue'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'

const itemStore = useItemStore()
const recipesStore = useRecipesStore()
const tradeStore = useTradeStore()

const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const selectedCategory = ref('')
const selectedUsageType = ref('')

// Store에서 데이터 로드
onMounted(() => {
  itemStore.fetchItemList()
  recipesStore.fetchRecipeList()
  tradeStore.fetchTradeList()
})

// 검색어 디바운싱 (300ms)
let searchTimeout: number | null = null
watch(searchQuery, (newValue) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    debouncedSearchQuery.value = newValue
  }, 300)
})

const filteredItems = computed(() => {
  return itemStore.getFilteredItems({
    searchQuery: debouncedSearchQuery.value,
    category: selectedCategory.value,
    usageType: selectedUsageType.value
  }).filter(item => {
    // 사용처 필터링 로직
    if (!selectedUsageType.value) return true

    const usageTypes = []
    const usage = itemUsageIndex.getItemUsage(item.id)
    if (usage?.usageTypes.recipes.length) usageTypes.push('레시피')
    if (usage?.usageTypes.trades.length) usageTypes.push('교환')
    if (usage?.usageTypes.purchases.length) usageTypes.push('구매')

    // 교환으로 얻을 수 있는지 확인
    const obtainableTrades = tradeStore.tradeList.filter(trade => trade.receiveItemId === item.id && trade.isEnabled)
    if (obtainableTrades.length > 0) usageTypes.push('교환으로 얻을 수 있음')

    switch (selectedUsageType.value) {
      case '레시피':
        return usageTypes.includes('레시피')
      case '교환':
        return usageTypes.includes('교환')
      case '구매':
        return usageTypes.includes('구매')
      case '제작':
        return recipesStore.recipeList.some(recipe => recipe.resultItemId === item.id)
      case '교환으로 얻을 수 있음':
        return usageTypes.includes('교환으로 얻을 수 있음')
      default:
        return true
    }
  })
})
</script>
