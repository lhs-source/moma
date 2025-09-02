<template>
  <div class="item-list flex-1 flex flex-col">
    <h2 class="text-xl font-bold mb-3">제작 항목</h2>
    <div v-if="selectedCategory" class="overflow-y-auto flex-1 pr-2">
      <div v-for="(item, itemName) in categoryItems" :key="itemName"
        class="item-card p-3 mb-3 rounded border border-gray-200 hover:border-gray-300">
        <div class="flex items-start gap-3 mb-3">
          <img :src="getItemImageUrl(String(itemName))" :alt="String(itemName)"
            class="w-12 h-12 object-cover rounded border border-gray-200">
          <div class="flex-1">
            <div class="font-medium text-lg">{{ itemName }}</div>
            <div class="text-sm text-gray-500">생산량: {{ item.생산량 }}개</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="font-medium mb-1">시간:</div>
            <div class="pl-2">{{ formatTime(item.시간) }}</div>
          </div>

          <div>
            <div class="font-medium mb-1">재료:</div>
            <ul class="pl-2">
              <li v-for="(amount, material) in item.재료" :key="material" class="mb-1 flex items-center gap-2">
                <img :src="getItemImageUrl(String(material))" :alt="String(material)"
                  class="w-4 h-4 object-cover rounded">
                <span>{{ material }}: {{ amount }}개</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex justify-end mt-3">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" @click="addItem(itemName)">
            추가
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-4 text-gray-500">
      가공처를 선택해주세요
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { craftingData } from '@/data/crafting';
import { useCraftingStore } from '@/stores/crafting';
import { formatTime } from '@/utils/timeUtils';
import { getItemImageUrl } from '@/utils/itemUtils';

const craftingStore = useCraftingStore();

// 선택된 카테고리
const selectedCategory = computed(() => craftingStore.selectedCategory);

// 선택된 카테고리의 아이템 목록
const categoryItems = computed(() => {
  if (!selectedCategory.value) return {};
  return craftingData[selectedCategory.value];
});

// 아이템 추가 함수
function addItem(itemName: string | number) {
  if (!selectedCategory.value) return;
  craftingStore.selectItem(selectedCategory.value, itemName, 1);
}
</script>

<style scoped>
.item-list {
  min-width: 300px;
  width: 100%;
}
</style>
