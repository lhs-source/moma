<script setup lang="ts">
import type { Item } from '@/data/schemas/item'
import type { Recipe as OriginalRecipe } from '@/data/schemas/recipe'

interface Recipe extends OriginalRecipe {
  category: '간편' | '힘 특화' | '솜씨 특화' | '지력 특화' | '기타' | '쉐어링' | '교환'
}

interface WeeklyRequirement {
  itemId: string
  totalQuantity: number
  recipe?: Recipe
  trades?: {
    id: string
    requiredItemId: string
    requiredQuantity: number
  }[]
}

interface Props {
  weeklyRequirements: WeeklyRequirement[]
  getItemInfo: (itemId: string) => Item | undefined
  getItemRecipe: (itemId: string) => Recipe | undefined
}

defineProps<Props>()
</script>

<template>
  <template v-if="weeklyRequirements.length > 0">
    <h3 class="text-lg font-semibold mb-2">주간 교환 필요 제작 아이템</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-[1080px] mx-auto">
      <div v-for="requirement in weeklyRequirements" :key="requirement.itemId" 
           class="flex flex-col p-3 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <h3 class="font-medium text-sm">
            <div class="flex items-center gap-1">
              <img 
                :src="getItemInfo(requirement.itemId)?.imageUrl" 
                :alt="getItemInfo(requirement.itemId)?.name"
                class="w-4 h-4 object-contain"
              />
              <span>{{ getItemInfo(requirement.itemId)?.name }}</span>
            </div>
            <span class="text-primary ml-1">{{ requirement.totalQuantity }}개</span>
            <span class="text-muted-foreground ml-1">
              ({{ requirement.trades?.map(trade => 
                `${getItemInfo(trade.requiredItemId)?.name} ${trade.requiredQuantity}개`
              ).join(', ') }})
            </span>
          </h3>
        </div>
        <!-- 레시피 정보 표시 -->
        <div v-if="requirement.recipe" class="mt-2 text-xs text-muted-foreground">
          <div class="font-medium mb-1">
            <span v-if="requirement.recipe.category === '교환'" class="text-green-500">교환 방법:</span>
            <span v-else>필요 재료:</span>
          </div>
          <div class="grid grid-cols-1 gap-1">
            <div v-for="item in requirement.recipe.requiredItems" :key="item.itemId" 
                 :class="{'bg-green-50 dark:bg-green-900/20 rounded p-1': requirement.recipe.category === '교환'}"
                 class="flex flex-col gap-1">
              <div class="flex items-center gap-1">
                <img 
                  :src="getItemInfo(item.itemId)?.imageUrl" 
                  :alt="getItemInfo(item.itemId)?.name"
                  class="w-3 h-3 object-contain"
                />
                <span>{{ getItemInfo(item.itemId)?.name }} x{{ item.quantity }}</span>
              </div>
              
              <!-- 교환 레시피인 경우, 필요한 아이템의 레시피 표시 -->
              <div v-if="requirement.recipe.category === '교환' && getItemRecipe(item.itemId)" 
                   class="ml-4 mt-1 p-1 bg-blue-50 dark:bg-blue-900/10 rounded-sm border-l-2 border-blue-200 dark:border-blue-800">
                <!-- 글리니스의 애플 밀크티에 대한 특별 표시 -->
                <div v-if="item.itemId === 'glenis_apple_milk_tea'" class="bg-amber-50 dark:bg-amber-900/10 p-1 rounded mb-2">
                  <div class="flex items-center gap-1 text-amber-700 dark:text-amber-300 font-medium text-[10px]">
                    글리니스의 애플 밀크티 - 특별 정보
                  </div>
                  <div class="text-[10px] text-amber-600 dark:text-amber-400">
                    하루에 1개씩 생산 가능, 상급 목재+ 교환에 3개씩 필요해서 주 2회 교환(총 6개) 필요
                  </div>
                </div>
                
                <div class="flex items-center gap-1 text-blue-700 dark:text-blue-300 font-medium mb-1 text-[10px]">
                  {{ getItemRecipe(item.itemId)?.name }} 제작 방법
                </div>
                <div class="space-y-1">
                  <div v-for="recipeItem in getItemRecipe(item.itemId)?.requiredItems" :key="recipeItem.itemId"
                       class="flex items-center gap-1 text-[10px]">
                    <img 
                      :src="getItemInfo(recipeItem.itemId)?.imageUrl" 
                      :alt="getItemInfo(recipeItem.itemId)?.name"
                      class="w-2 h-2 object-contain"
                    />
                    <span>{{ getItemInfo(recipeItem.itemId)?.name }} x{{ recipeItem.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
