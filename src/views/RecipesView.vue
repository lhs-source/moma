<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-3xl font-bold">레시피 목록</h1>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="레시피 이름 또는 ID로 검색..."
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          v-model="selectedCategory"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">모든 카테고리</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select
          v-model="selectedFacilityLevel"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">모든 레벨</option>
          <option v-for="level in facilityLevels" :key="level" :value="level">
            Lv.{{ level }}
          </option>
        </select>
      </div>
    </div>

    <div class="text-sm text-gray-600">
      총 {{ filteredRecipes.length }}개의 레시피
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
      >
        <div class="flex items-start gap-4">
          <img
            :src="getItemImageUrl(recipe.resultItemId)"
            :alt="recipe.name"
            class="w-16 h-16 object-cover rounded flex-shrink-0"
            @error="handleImageError"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-medium text-lg text-gray-900">{{ recipe.name }}</h3>
                <p class="text-sm text-gray-500 mt-1">ID: {{ recipe.id }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <span
                  v-if="recipe.resultQuantity && recipe.resultQuantity > 1"
                  class="text-sm font-medium text-green-600"
                >
                  x{{ recipe.resultQuantity }}
                </span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-if="recipe.category"
                class="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
              >
                {{ recipe.category }}
              </span>
              <span
                v-if="recipe.facilityLevel"
                class="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded"
              >
                요리 Lv.{{ recipe.facilityLevel }}
              </span>
            </div>

            <div class="mt-4">
              <p class="text-sm font-medium text-gray-700 mb-2">필요 재료:</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div
                  v-for="material in recipe.requiredItems"
                  :key="material.itemId"
                  class="flex items-center gap-2 text-sm"
                >
                  <img
                    :src="getItemImageUrl(material.itemId)"
                    :alt="getItemName(material.itemId)"
                    class="w-6 h-6 object-cover rounded flex-shrink-0"
                    @error="handleImageError"
                  />
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { recipes } from '@/data/recipes'
import { items } from '@/data/items'

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedFacilityLevel = ref('')

const categories = computed(() => {
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
    const matchesSearch = !searchQuery.value || 
      recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || recipe.category === selectedCategory.value
    
    const matchesFacilityLevel = !selectedFacilityLevel.value || 
      recipe.facilityLevel?.toString() === selectedFacilityLevel.value
    
    return matchesSearch && matchesCategory && matchesFacilityLevel
  })
})

const getItemName = (itemId: string) => {
  const item = items.find(i => i.id === itemId)
  return item ? item.name : itemId
}

const getItemImageUrl = (itemId: string) => {
  const item = items.find(i => i.id === itemId)
  return item ? item.imageUrl : '/images/items/default.webp'
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp' // 기본 이미지로 대체
}
</script> 