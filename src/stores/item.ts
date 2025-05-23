import { items } from '@/data/items';
import type { Item } from '@/data/schemas/item';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useItemStore = defineStore('item', () => {
  const itemList = ref<Item[]>([]);

  /**
   * # 아이템 리스트를 파일로부터 가져온다
   */
  function fetchItemList() {
    itemList.value = items;
  }

  /**
   * # 아이템 리스트에서 아이템을 id로 찾는다
   * @param id 
   * @returns 
   */
  function getItemById(id: string): Item | undefined {
    return itemList.value.find((item) => item.id === id);
  }

  return {
    itemList,
    fetchItemList,
    getItemById
  }
})
