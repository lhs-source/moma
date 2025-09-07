<template>
  <div :class="cn(
    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    isSelected && 'bg-blue-50 text-blue-900',
    props.class
  )" @click="handleClick">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <svg v-if="isSelected" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd" />
      </svg>
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'

export interface SelectItemProps {
  value: string
  class?: string
}

const props = defineProps<SelectItemProps>()

const selectContext = inject<{
  selectedValue: { value: string }
  isOpen: { value: boolean }
  updateValue: (value: string) => void
  toggleOpen: () => void
  close: () => void
}>('select')

if (!selectContext) {
  throw new Error('SelectItem must be used within a Select component')
}

const { selectedValue, updateValue } = selectContext

const isSelected = computed(() => selectedValue.value === props.value)

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  updateValue(props.value)
}
</script>
