<template>
  <div class="selected-items">
    <h2 class="text-xl font-bold mb-3">선택된 항목</h2>
    <div v-if="hasSelectedItems" class="overflow-y-auto max-h-96 pr-2">
      <div v-for="category in categories" :key="category" class="mb-4">
        <div v-if="hasItemsInCategory(category)">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">{{ category }}</h3>
            <button class="text-xs text-red-500 hover:text-red-700" @click="clearCategory(category)">
              모두 삭제
            </button>
          </div>

          <div v-for="(quantity, itemName) in selectedItems[category]" :key="itemName"
            class="selected-item-card p-2 mb-2 rounded border border-gray-200 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <img :src="getItemImageUrl(String(itemName))" :alt="String(itemName)"
                class="w-8 h-8 object-cover rounded border border-gray-200">
              <div>
                <span class="font-medium">{{ itemName }}</span>
                <div class="text-sm text-gray-600 ml-2">
                  <span>{{ quantity }}회</span>
                  <span class="text-gray-400 ml-1">({{ getTotalQuantity(category, itemName) }}개 생산)</span>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-1">
              <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                @click="decrementItem(category, itemName)">
                -
              </button>
              <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                @click="incrementItem(category, itemName)">
                +
              </button>
              <button class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-red-500"
                @click="removeItem(category, itemName)">
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-4 text-gray-500">
      선택된 항목이 없습니다
    </div>

    <button v-if="hasSelectedItems" class="w-full mt-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
      @click="clearAllItems">
      선택 초기화
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCraftingStore } from '@/stores/crafting';
import { craftingData } from '@/data/crafting';
import { getItemImageUrl } from '@/utils/itemUtils';

const craftingStore = useCraftingStore();

// 선택된 항목
const selectedItems = computed(() => craftingStore.selectedItems);

// 카테고리 목록
const categories = computed(() => Object.keys(craftingStore.selectedItems));

// 선택된 항목이 있는지 확인
const hasSelectedItems = computed(() => craftingStore.hasSelectedItems);

// 특정 카테고리에 항목이 있는지 확인하는 함수
function hasItemsInCategory(category: string) {
  return selectedItems.value[category] && Object.keys(selectedItems.value[category]).length > 0;
}

// 항목 수량 증가 함수
function incrementItem(category: string, itemName: string | number) {
  craftingStore.selectItem(category, itemName, 1);
}

// 항목 수량 감소 함수
function decrementItem(category: string, itemName: string | number) {
  craftingStore.selectItem(category, itemName, -1);
}

// 항목 삭제 함수
function removeItem(category: string, itemName: string | number) {
  craftingStore.selectItem(category, itemName, -craftingStore.selectedItems[category][itemName]);
}

// 카테고리 초기화 함수
function clearCategory(category: string) {
  craftingStore.clearCategory(category);
}

// 모든 선택 초기화 함수
function clearAllItems() {
  craftingStore.clearSelectedItems();
}

// 총 생산 개수를 계산하는 함수
function getTotalQuantity(category: string, itemName: string | number): number {
  const batchCount = selectedItems.value[category][itemName]; // 제작 횟수
  const itemData = craftingData[category][itemName];
  return batchCount * itemData.생산량;
}
</script>

<style scoped>
.selected-items {
  min-width: 300px;
  width: 100%;
}
</style>
