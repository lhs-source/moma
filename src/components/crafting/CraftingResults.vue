<template>
  <div class="crafting-results p-3 border border-border rounded-lg bg-card">
    <h2 class="text-lg font-bold mb-2 text-foreground">제작 결과</h2>

    <div class="space-y-3">
      <!-- 필요 재료 -->
      <div class="materials">
        <h3 class="text-sm font-semibold mb-1 text-foreground">필요 재료</h3>
        <div v-if="Object.keys(totalMaterials).length > 0">
          <!-- 제작 횟수 정보 -->
          <div class="mb-2 p-2 bg-accent/50 rounded text-xs">
            <div class="font-medium text-foreground mb-1">제작 횟수 정보</div>
            <div class="space-y-1">
              <div v-for="(categoryItems, category) in selectedItemsByCategory" :key="category">
                <div class="font-medium text-foreground">{{ category }}</div>
                <div v-for="selectedItem in categoryItems" :key="selectedItem.recipe.id"
                  class="text-muted-foreground ml-2 flex items-center gap-1">
                  <img :src="getItemImageUrlById(selectedItem.recipe.resultItemId)" :alt="selectedItem.recipe.name"
                    class="w-3 h-3 object-cover rounded">
                  <span>{{ selectedItem.recipe.name }}: {{ selectedItem.quantity }}회 ({{ getTotalQuantity(selectedItem)
                    }}개)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 필요 재료 테이블 -->
          <table class="w-full text-xs border-collapse">
            <thead class="bg-muted">
              <tr class="border-b border-border">
                <th class="text-left p-1 font-semibold text-foreground">재료</th>
                <th class="text-right p-1 font-semibold text-foreground w-16">수량</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(amount, material) in totalMaterials" :key="material"
                class="border-b border-border hover:bg-accent/50">
                <td class="p-1">
                  <div class="flex items-center gap-1">
                    <img :src="getItemImageUrlById(String(material))" :alt="getItemInfoById(String(material)).name"
                      class="w-5 h-5 object-cover rounded">
                    <span class="font-medium text-foreground">{{ getItemInfoById(String(material)).name }}</span>
                  </div>
                </td>
                <td class="p-1 text-right text-foreground">{{ amount }}개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center py-3 text-muted-foreground text-xs">
          선택된 항목이 없습니다
        </div>
      </div>

      <!-- 제작 시간 -->
      <div class="crafting-time">
        <h3 class="text-sm font-semibold mb-1 text-foreground">제작 시간</h3>
        <div v-if="hasSelectedItems">
          <table class="w-full text-xs border-collapse mb-2">
            <thead class="bg-muted">
              <tr class="border-b border-border">
                <th class="text-left p-1 font-semibold text-foreground">카테고리</th>
                <th class="text-right p-1 font-semibold text-foreground w-20">시간</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(time, category) in filteredCategoryTimes" :key="category"
                class="border-b border-border hover:bg-accent/50">
                <td class="p-1 font-medium text-foreground">{{ category }}</td>
                <td class="p-1 text-right text-foreground">{{ formatTime(time) }}</td>
              </tr>
              <tr class="bg-accent/50 font-semibold">
                <td class="p-1 text-foreground">총 제작 시간</td>
                <td class="p-1 text-right text-foreground">{{ formatTime(totalTime) }}</td>
              </tr>
            </tbody>
          </table>

          <!-- 멤버십 상태 정보 -->
          <div v-if="isMembershipEnabled" class="text-xs text-foreground bg-accent/30 p-1.5 rounded">
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span>멤버십 혜택 적용 (제작 시간 50% 단축)</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-3 text-muted-foreground text-xs">
          선택된 항목이 없습니다
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCraftingStore } from '@/stores/crafting';
import { formatTime } from '@/utils/timeUtils';
import { getItemImageUrlById, getItemInfoById } from '@/utils/itemUtils';

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

// 카테고리별로 그룹화된 선택된 항목들
const selectedItemsByCategory = computed(() => craftingStore.selectedItemsByCategory);

// 총 생산 개수를 계산하는 함수
function getTotalQuantity(selectedItem: { recipe: any; quantity: number }): number {
  return selectedItem.quantity * (selectedItem.recipe.resultQuantity || 1);
}
</script>