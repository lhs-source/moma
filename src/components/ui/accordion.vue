<template>
  <div class="border-b border-border">
    <button @click="toggle"
      class="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
      :data-state="isOpen ? 'open' : 'closed'">
      <slot name="trigger"></slot>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="h-4 w-4 shrink-0 transition-transform duration-200">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div v-show="isOpen" class="overflow-hidden text-sm transition-all" :class="contentClass">
      <div class="pb-4 pt-0">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  contentClass?: string
}>(), {
  defaultOpen: false,
  contentClass: ''
})

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
}

defineExpose({
  isOpen,
  toggle
})
</script>
