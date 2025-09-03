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
      <div v-for="item in filteredItems" :key="item.id"
        class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
        <!-- 상단: 이미지와 이름 정보 -->
        <div class="flex items-start gap-3 mb-4">
          <img :src="item.imageUrl" :alt="item.name" class="w-16 h-16 object-cover rounded flex-shrink-0"
            @error="handleImageError" />
          <div class="flex-1 min-w-0">
            <div v-if="item.category" class="text-xs text-gray-500 mb-1">
              {{ item.category }}
            </div>
            <h3 class="font-medium text-base text-gray-900">{{ item.name }}</h3>
            <p class="text-xs text-gray-500 mt-1">ID: {{ item.id }}</p>
            <p v-if="item.description" class="text-xs text-gray-600 mt-1 line-clamp-2">
              {{ item.description }}
            </p>
          </div>
        </div>
        <!-- 하단: 사용처 정보 -->
        <div class="space-y-3">
          <!-- 사용처 태그 -->
          <div v-if="getUsageTypes(item.id).length > 0">
            <div class="flex flex-wrap gap-1">
              <span v-for="usageType in getUsageTypes(item.id)" :key="usageType" :class="{
                'inline-block px-2 py-1 text-xs rounded': true,
                'bg-purple-100 text-purple-800': usageType === '레시피',
                'bg-indigo-100 text-indigo-800': usageType === '교환',
                'bg-emerald-100 text-emerald-800': usageType === '구매'
              }">
                {{ usageType }}
              </span>
            </div>
          </div>

          <!-- 레시피 사용처 -->
          <div v-if="getItemUsage(item.id)?.usageTypes.recipes.length"
            class="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <p class="text-xs font-medium text-purple-800 mb-2 text-center">재료로 사용되는 레시피</p>
            <table class="w-full text-xs">
              <tbody>
                <tr v-for="recipeUsage in getItemUsage(item.id)?.usageTypes.recipes" :key="recipeUsage.recipeId"
                  class="text-gray-700">
                  <td class="font-medium text-left pr-2">{{ recipeUsage.resultItemName }} {{ recipeUsage.resultQuantity
                  }}개</td>
                  <td class="text-gray-600 text-left w-20">{{ recipeUsage.quantity }}개 필요</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 교환 사용처 -->
          <div v-if="getItemUsage(item.id)?.usageTypes.trades.length"
            class="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <p class="text-xs font-medium text-indigo-800 mb-2 text-center">교환에 사용</p>
            <table class="w-full text-xs">
              <tbody>
                <tr v-for="tradeUsage in getItemUsage(item.id)?.usageTypes.trades" :key="tradeUsage.tradeId"
                  class="text-gray-700">
                  <td class="font-medium text-left pr-2 w-30">{{ tradeUsage.npcName }} ({{ tradeUsage.locationName }})
                  </td>
                  <td class="text-gray-600 text-left pr-2 flex-1">{{ tradeUsage.receiveItemName }} {{
                    tradeUsage.receiveQuantity }}개</td>
                  <td class="text-gray-600 text-left w-20">{{ tradeUsage.giveQuantity }}개 필요</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 제작 레시피 -->
          <div v-if="getItemRecipes(item.id).length > 0" class="bg-green-50 rounded-lg p-3 border border-green-200">
            <p class="text-xs font-medium text-green-800 mb-2 text-center">제작 레시피</p>
            <table class="w-full text-xs">
              <tbody>
                <tr v-for="recipe in getItemRecipes(item.id)" :key="recipe.id" class="text-gray-700">
                  <td class="font-medium text-left pr-2 whitespace-nowrap">{{ recipe.name }}</td>
                  <td class="text-gray-600 text-left">
                    <span v-for="(material, index) in recipe.requiredItems" :key="material.itemId">
                      {{ getItemName(material.itemId) }} {{ material.quantity }}개{{ index < recipe.requiredItems.length
                        - 1 ? ', ' : '' }} </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
      switch (selectedUsageType.value) {
        case '레시피':
          return getUsageTypes(item.id).includes('레시피')
        case '교환':
          return getUsageTypes(item.id).includes('교환')
        case '구매':
          return getUsageTypes(item.id).includes('구매')
        case '제작':
          return getItemRecipes(item.id).length > 0
        default:
          return true
      }
    })()

    return matchesSearch && matchesCategory && matchesUsageType
  })
})

function getItemName(itemId: string) {
  const item = items.find(i => i.id === itemId)
  return item ? item.name : itemId
}

function getItemRecipes(itemId: string) {
  return recipes.filter(recipe => recipe.resultItemId === itemId)
}

function getItemUsage(itemId: string) {
  return itemUsageIndex.getItemUsage(itemId)
}

function getUsageTypes(itemId: string) {
  return itemUsageIndex.getUsageTypes(itemId)
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
