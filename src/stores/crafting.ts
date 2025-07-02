import { defineStore } from 'pinia';
import { craftingData, type CraftingMaterial } from '@/data/crafting';

interface SelectedItems {
  [category: string]: {
    [itemName: string]: number; // 제작 횟수를 저장
  };
}

export const useCraftingStore = defineStore('crafting', {
  state: () => ({
    selectedItems: {} as SelectedItems,
    selectedCategory: null as string | null,
    isMembershipEnabled: false, // 멤버십 활성화 상태
  }),
  
  getters: {
    // 총 필요 재료를 계산하는 getter
    totalMaterials(): CraftingMaterial {
      const totalMaterials: CraftingMaterial = {};
      
      // 각 카테고리별로 선택된 아이템 순회
      for (const category in this.selectedItems) {
        for (const itemName in this.selectedItems[category]) {
          const batchCount = this.selectedItems[category][itemName]; // 제작 횟수
          const itemData = craftingData[category][itemName];
          
          // 각 재료별 필요량 계산
          for (const material in itemData.재료) {
            const neededAmount = itemData.재료[material] * batchCount;
            
            if (!totalMaterials[material]) {
              totalMaterials[material] = 0;
            }
            totalMaterials[material] += neededAmount;
          }
        }
      }
        return totalMaterials;
    },
    
    // 각 카테고리별 제작 시간을 계산하는 getter
    categoryTimes(): Record<string, number> {
      const categoryTimes: Record<string, number> = {};
      
      // 각 카테고리별 제작 시간 계산
      for (const category in this.selectedItems) {
        categoryTimes[category] = 0;
        
        for (const itemName in this.selectedItems[category]) {
          const batchCount = this.selectedItems[category][itemName]; // 제작 횟수
          const itemData = craftingData[category][itemName];
          
          // 해당 아이템의 총 제작 시간
          let itemTime = batchCount * itemData.시간;
          
          // 멤버십이 활성화된 경우 시간을 절반으로 줄임
          if (this.isMembershipEnabled) {
            itemTime = Math.ceil(itemTime / 2);
          }
          
          // 카테고리 내에서의 총 시간
          categoryTimes[category] += itemTime;
        }
      }
      
      return categoryTimes;
    },
    
    // 총 제작 시간을 계산하는 getter (모든 카테고리 중 가장 오래 걸리는 시간)
    totalTime(): number {
      const times = Object.values(this.categoryTimes);
      return times.length > 0 ? Math.max(...times) : 0;
    },
    
    // 선택된 항목이 있는지 확인하는 getter
    hasSelectedItems(): boolean {
      return Object.keys(this.selectedItems).some(category => 
        Object.keys(this.selectedItems[category]).length > 0
      );
    }
  },
  
  actions: {
    // 아이템 선택 액션
    selectItem(category: string, itemName: string, quantity: number) {
      if (!this.selectedItems[category]) {
        this.selectedItems[category] = {};
      }
      
      if (!this.selectedItems[category][itemName]) {
        this.selectedItems[category][itemName] = 0;
      }
      
      this.selectedItems[category][itemName] += quantity;
      
      // 0 이하면 삭제
      if (this.selectedItems[category][itemName] <= 0) {        delete this.selectedItems[category][itemName];
        
        // 카테고리가 비었으면 카테고리도 삭제
        if (Object.keys(this.selectedItems[category]).length === 0) {
          delete this.selectedItems[category];
        }
      }
    },
    
    // 선택한 카테고리 설정
    setSelectedCategory(category: string | null) {
      this.selectedCategory = category;
    },
    
    // 멤버십 상태 토글
    toggleMembership() {
      this.isMembershipEnabled = !this.isMembershipEnabled;
    },
    
    // 멤버십 상태 설정
    setMembership(enabled: boolean) {
      this.isMembershipEnabled = enabled;
    },
    
    // 선택된 항목 초기화
    clearSelectedItems() {
      this.selectedItems = {};
    },
    
    // 특정 카테고리의 선택된 항목 초기화
    clearCategory(category: string) {
      if (this.selectedItems[category]) {
        delete this.selectedItems[category];
      }
    }
  }
});
