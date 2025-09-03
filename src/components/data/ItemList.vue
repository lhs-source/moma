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
    </div>

    <div class="text-sm text-gray-600">
      총 {{ filteredItems.length }}개의 아이템
    </div>

    <!-- 아이템 그리드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <div v-for="item in filteredItems" :key="item.id"
        class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
        <div class="flex items-start gap-3">
          <img :src="item.imageUrl" :alt="item.name" class="w-12 h-12 object-cover rounded flex-shrink-0"
            @error="handleImageError" />
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-sm text-gray-900 truncate">{{ item.name }}</h3>
            <p class="text-xs text-gray-500 mt-1">ID: {{ item.id }}</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span v-if="item.category" class="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {{ item.category }}
              </span>
              <span v-if="item.isCraftable" class="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                제작 가능
              </span>
              <span v-if="item.isFromTraded"
                class="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                교환 아이템
              </span>
              <span v-if="item.price" class="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                {{ item.price }}G
              </span>
            </div>
            <p v-if="item.description" class="text-xs text-gray-600 mt-2 line-clamp-2">
              {{ item.description }}
            </p>
            <div v-if="getItemRecipes(item.id).length > 0" class="mt-2">
              <p class="text-xs font-medium text-gray-700">제작 레시피:</p>
              <div v-for="recipe in getItemRecipes(item.id)" :key="recipe.id" class="text-xs text-gray-600 mt-1">
                <div class="flex items-center gap-1">
                  <span class="font-medium">{{ recipe.name }}</span>
                  <span class="text-gray-500">(Lv.{{ recipe.facilityLevel }})</span>
                </div>
                <div class="ml-2">
                  <span v-for="(material, index) in recipe.requiredItems" :key="material.itemId">
                    {{ getItemName(material.itemId) }} x{{ material.quantity }}{{ index < recipe.requiredItems.length -
                      1 ? ', ' : '' }} </span>
                </div>
              </div>
            </div>
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

const searchQuery = ref('')
const selectedCategory = ref('')

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

    return matchesSearch && matchesCategory
  })
})

function getItemName(itemId: string) {
  const item = items.find(i => i.id === itemId)
  return item ? item.name : itemId
}

function getItemRecipes(itemId: string) {
  return recipes.filter(recipe => recipe.resultItemId === itemId)
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
