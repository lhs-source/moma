<template>
  <div class="membership-toggle flex items-center space-x-2 py-2">
    <span class="text-sm font-medium text-foreground">멤버십 혜택</span>
    <button @click="toggleMembership"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
      :class="isMembershipEnabled ? 'bg-foreground' : 'bg-muted'">
      <span class="inline-block h-4 w-4 transform rounded-full bg-background transition-transform"
        :class="isMembershipEnabled ? 'translate-x-6' : 'translate-x-1'" />
    </button>
    <span class="text-sm" :class="isMembershipEnabled ? 'text-foreground font-medium' : 'text-muted-foreground'">
      {{ isMembershipEnabled ? '활성화' : '비활성화' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCraftingStore } from '@/stores/crafting';

const craftingStore = useCraftingStore();

// 멤버십 활성화 상태
const isMembershipEnabled = computed(() => craftingStore.isMembershipEnabled);

// 멤버십 토글 함수
function toggleMembership() {
  craftingStore.toggleMembership();
}
</script>
