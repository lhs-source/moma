<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold">데이터 목록</h1>
    </div>

    <!-- 탭 네비게이션 -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button @click="activeTab = 'items'" :class="[
          'py-2 px-1 border-b-2 font-medium text-sm',
          activeTab === 'items'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]">
          아이템 ({{ filteredItems.length }})
        </button>
        <button @click="activeTab = 'recipes'" :class="[
          'py-2 px-1 border-b-2 font-medium text-sm',
          activeTab === 'recipes'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]">
          레시피 ({{ filteredRecipes.length }})
        </button>
      </nav>
    </div>

    <!-- 아이템 탭 -->
    <div v-if="activeTab === 'items'" class="space-y-4">
      <div class="flex flex-col sm:flex-row gap-2">
        <input v-model="itemSearchQuery" type="text" placeholder="아이템 이름 또는 ID로 검색..."
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <select v-model="itemSelectedCategory"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">모든 카테고리</option>
          <option v-for="category in itemCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="text-sm text-gray-600">
        총 {{ filteredItems.length }}개의 아이템
      </div>

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
                <span v-if="item.isCraftable"
                  class="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
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
                      {{ getItemName(material.itemId) }} x{{ material.quantity }}{{ index < recipe.requiredItems.length
                        - 1 ? ', ' : '' }} </span>
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

    <!-- 레시피 탭 -->
    <div v-if="activeTab === 'recipes'" class="space-y-4">
      <div class="flex flex-col sm:flex-row gap-2">
        <input v-model="recipeSearchQuery" type="text" placeholder="레시피 이름 또는 ID로 검색..."
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <select v-model="recipeSelectedCategory"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">모든 카테고리</option>
          <option v-for="category in recipeCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select v-model="selectedFacilityLevel"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">모든 레벨</option>
          <option v-for="level in facilityLevels" :key="level" :value="level">
            Lv.{{ level }}
          </option>
        </select>
      </div>

      <div class="text-sm text-gray-600">
        총 {{ filteredRecipes.length }}개의 레시피
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div v-for="recipe in filteredRecipes" :key="recipe.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
          <div class="flex items-start gap-4">
            <img :src="getItemImageUrl(recipe.resultItemId)" :alt="recipe.name"
              class="w-16 h-16 object-cover rounded flex-shrink-0" @error="handleImageError" />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="font-medium text-lg text-gray-900">{{ recipe.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">ID: {{ recipe.id }}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <span v-if="recipe.resultQuantity && recipe.resultQuantity > 1"
                    class="text-sm font-medium text-green-600">
                    x{{ recipe.resultQuantity }}
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mt-3">
                <span v-if="recipe.category" class="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  {{ recipe.category }}
                </span>
                <span v-if="recipe.facilityLevel"
                  class="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                  요리 Lv.{{ recipe.facilityLevel }}
                </span>
              </div>

              <div class="mt-4">
                <p class="text-sm font-medium text-gray-700 mb-2">필요 재료:</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div v-for="material in recipe.requiredItems" :key="material.itemId"
                    class="flex items-center gap-2 text-sm">
                    <img :src="getItemImageUrl(material.itemId)" :alt="getItemName(material.itemId)"
                      class="w-6 h-6 object-cover rounded flex-shrink-0" @error="handleImageError" />
                    <span class="text-gray-700">
                      {{ getItemName(material.itemId) }}
                    </span>
                    <span class="text-gray-500 ml-auto">x{{ material.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredRecipes.length === 0" class="text-center py-12">
        <p class="text-gray-500">검색 조건에 맞는 레시피가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { items } from '@/data/items'
import { recipes } from '@/data/recipes'

// 탭 상태
const activeTab = ref<'items' | 'recipes'>('items')

// 아이템 탭 상태
const itemSearchQuery = ref('')
const itemSelectedCategory = ref('')

// 레시피 탭 상태
const recipeSearchQuery = ref('')
const recipeSelectedCategory = ref('')
const selectedFacilityLevel = ref('')

// 아이템 관련 computed
const itemCategories = computed(() => {
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
    const matchesSearch = !itemSearchQuery.value ||
      item.name.toLowerCase().includes(itemSearchQuery.value.toLowerCase()) ||
      item.id.toLowerCase().includes(itemSearchQuery.value.toLowerCase())

    const matchesCategory = !itemSelectedCategory.value || item.category === itemSelectedCategory.value

    return matchesSearch && matchesCategory
  })
})

// 레시피 관련 computed
const recipeCategories = computed(() => {
  const categorySet = new Set<string>()
  recipes.forEach(recipe => {
    if (recipe.category) {
      categorySet.add(recipe.category)
    }
  })
  return Array.from(categorySet).sort()
})

const facilityLevels = computed(() => {
  const levelSet = new Set<number>()
  recipes.forEach(recipe => {
    if (recipe.facilityLevel) {
      levelSet.add(recipe.facilityLevel)
    }
  })
  return Array.from(levelSet).sort((a, b) => a - b)
})

const filteredRecipes = computed(() => {
  return recipes.filter(recipe => {
    const matchesSearch = !recipeSearchQuery.value ||
      recipe.name.toLowerCase().includes(recipeSearchQuery.value.toLowerCase()) ||
      recipe.id.toLowerCase().includes(recipeSearchQuery.value.toLowerCase())

    const matchesCategory = !recipeSelectedCategory.value || recipe.category === recipeSelectedCategory.value

    const matchesFacilityLevel = !selectedFacilityLevel.value ||
      recipe.facilityLevel?.toString() === selectedFacilityLevel.value

    return matchesSearch && matchesCategory && matchesFacilityLevel
  })
})

// 공통 함수들
const getItemName = (itemId: string) => {
  const item = items.find(i => i.id === itemId)
  return item ? item.name : itemId
}

const getItemImageUrl = (itemId: string) => {
  const item = items.find(i => i.id === itemId)
  return item ? item.imageUrl : '/images/items/default.webp'
}

const getItemRecipes = (itemId: string) => {
  return recipes.filter(recipe => recipe.resultItemId === itemId)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp' // 기본 이미지로 대체
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
