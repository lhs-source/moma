<template>
  <div class="crafting-results p-4 border border-gray-200 rounded-lg">
    <h2 class="text-xl font-bold mb-4">제작 결과</h2>
    
    <div class="grid grid-cols-1 gap-6">
      <!-- 필요 재료 -->
      <div class="materials">
        <h3 class="text-lg font-semibold mb-2">필요 재료</h3>
        <div v-if="Object.keys(totalMaterials).length > 0" class="p-3 bg-gray-50 rounded-lg">
          <!-- 제작 횟수 정보 -->
          <div class="mb-4 p-3 bg-blue-50 rounded-lg">
            <h4 class="font-medium text-blue-800 mb-2">제작 횟수 정보</h4>
            <div class="grid grid-cols-2 gap-2">
              <div 
                v-for="(category, categoryKey) in selectedItems" 
                :key="categoryKey"
                class="text-sm"
              >
                <div class="font-medium text-gray-700 mb-1">{{ categoryKey }}</div>
                <div 
                  v-for="(batchCount, itemName) in category" 
                  :key="itemName"
                  class="text-xs text-gray-600 ml-2"
                >
                  {{ itemName }}: {{ batchCount }}회 ({{ getTotalQuantity(categoryKey, itemName) }}개 생산)
                </div>
              </div>
            </div>
          </div>
          
          <!-- 필요 재료 -->
          <div class="grid grid-cols-3 gap-3">
            <div 
              v-for="(amount, material) in totalMaterials" 
              :key="material"
              class="p-2 border border-gray-200 rounded-lg bg-white"
            >
              <div class="font-medium">{{ material }}</div>
              <div class="text-right text-sm text-blue-600">{{ amount }}개</div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-gray-500">
          선택된 항목이 없습니다
        </div>
      </div>
      
      <!-- 제작 시간 -->
      <div class="crafting-time">
        <h3 class="text-lg font-semibold mb-2">제작 시간</h3>
        <div v-if="hasSelectedItems" class="p-3 bg-gray-50 rounded-lg">
          <div class="grid grid-cols-1 gap-2">
            <div 
              v-for="(time, category) in filteredCategoryTimes" 
              :key="category"
              class="p-2 border border-gray-200 rounded-lg bg-white flex justify-between items-center"            >
              <span class="font-medium">{{ category }}</span>
              <span>{{ formatTime(time) }}</span>
            </div>
          </div>
          
          <div class="mt-3 pt-3 border-t border-gray-200">
            <div class="flex justify-between font-semibold">
              <span>총 제작 시간</span>
              <span>{{ formatTime(totalTime) }}</span>
            </div>
            
            <!-- 멤버십 상태 정보 -->
            <div v-if="isMembershipEnabled" class="mt-2 text-sm text-blue-600">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>멤버십 혜택 적용됨 (제작 시간 50% 단축)</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-gray-500">
          선택된 항목이 없습니다
        </div>      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCraftingStore } from '@/stores/crafting';
import { formatTime } from '@/utils/timeUtils';
import { craftingData } from '@/data/crafting';

const craftingStore = useCraftingStore();

// 총 필요 재료
const totalMaterials = computed(() => craftingStore.totalMaterials);

// 각 카테고리별 제작 시간
const categoryTimes = computed(() => craftingStore.categoryTimes);

// 멤버십 활성화 상태
const isMembershipEnabled = computed(() => craftingStore.isMembershipEnabled);

// 시간이 0보다 큰 카테고리만 필터링
const filteredCategoryTimes = computed(() => {
  const result: Record<string, number> = {};
  for (const category in categoryTimes.value) {
    if (categoryTimes.value[category] > 0) {
      result[category] = categoryTimes.value[category];
    }
  }
  return result;
});

// 총 제작 시간
const totalTime = computed(() => craftingStore.totalTime);

// 선택된 항목이 있는지 확인
const hasSelectedItems = computed(() => craftingStore.hasSelectedItems);

// 선택된 항목들
const selectedItems = computed(() => craftingStore.selectedItems);

// 총 생산 개수를 계산하는 함수
function getTotalQuantity(category: string, itemName: string): number {
  const batchCount = selectedItems.value[category][itemName]; // 제작 횟수
  const itemData = craftingData[category][itemName];
  return batchCount * itemData.생산량;
}
</script>
