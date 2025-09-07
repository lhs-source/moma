<template>
  <button :class="cn(
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.class
  )" @click="handleClick">
    <span v-if="displayValue" class="truncate">{{ displayValue }}</span>
    <span v-else class="text-muted-foreground">{{ placeholder }}</span>
    <svg class="h-4 w-4 opacity-50 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none"
      stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'

export interface SelectTriggerProps {
  placeholder?: string
  class?: string
}

const props = withDefaults(defineProps<SelectTriggerProps>(), {
  placeholder: '선택하세요',
})

const selectContext = inject<{
  selectedValue: { value: string }
  isOpen: { value: boolean }
  updateValue: (value: string) => void
  toggleOpen: () => void
  close: () => void
}>('select')

if (!selectContext) {
  throw new Error('SelectTrigger must be used within a Select component')
}

const { selectedValue, isOpen, toggleOpen } = selectContext

const displayValue = computed(() => {
  // 빈 문자열이 아닌 경우에만 표시
  return selectedValue.value || ''
})

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  toggleOpen()
}
</script>
