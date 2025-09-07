<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-2">
      <Input v-model="searchQuery" type="text" placeholder="레시피 이름 또는 ID로 검색..." />

      <Select v-model="selectedCategory" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 카테고리</SelectItem>
          <SelectItem v-for="category in recipesStore.categories" :key="category" :value="category">
            {{ category }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select v-model="selectedFacilityLevel" default-value="">
        <SelectTrigger class="w-full sm:w-[200px]">
          <SelectValue placeholder="모든 레벨" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 레벨</SelectItem>
          <SelectItem v-for="level in facilityLevels" :key="level" :value="level.toString()">
            Lv.{{ level }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="text-sm text-gray-600">
      총 {{ filteredRecipes.length }}개의 레시피
    </div>

    <!-- 레시피 그리드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useItemStore } from '@/stores/item'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'

const recipesStore = useRecipesStore()
const itemStore = useItemStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedFacilityLevel = ref('')

// Store에서 데이터 로드
onMounted(() => {
  recipesStore.fetchRecipeList()
  itemStore.fetchItemList()
})

const facilityLevels = computed(() => {
  const levelSet = new Set<number>()
  recipesStore.recipeList.forEach(recipe => {
    if (recipe.facilityLevel) {
      levelSet.add(recipe.facilityLevel)
    }
  })
  return Array.from(levelSet).sort((a, b) => a - b)
})

const filteredRecipes = computed(() => {
  return recipesStore.recipeList.filter(recipe => {
    const matchesSearch = !searchQuery.value ||
      recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.id.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value || recipe.category === selectedCategory.value

    const matchesFacilityLevel = !selectedFacilityLevel.value ||
      recipe.facilityLevel?.toString() === selectedFacilityLevel.value

    return matchesSearch && matchesCategory && matchesFacilityLevel
  })
})

function getItemName(itemId: string) {
  const item = itemStore.getItemById(itemId)
  return item ? item.name : itemId
}

function getItemImageUrl(itemId: string) {
  const item = itemStore.getItemById(itemId)
  return item ? item.imageUrl : '/images/items/default.webp'
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp'
}
</script>
