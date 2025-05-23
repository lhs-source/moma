import { npcs } from '@/data/npcs';
import type { NPC } from '@/data/schemas/npc';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNpcStore = defineStore('npc', () => {
  const npcList = ref<NPC[]>([]);
  
  /**
   * # npc 리스트를 파일로부터 가져온다
   */
  function fetchNpcList() {
    npcList.value = npcs;
  }

  function getNpcByName(name: string): NPC | undefined {
    return npcList.value.find((npc) => npc.name === name);
  }


  return {
    npcList,
    fetchNpcList,
    getNpcByName
  }
})
