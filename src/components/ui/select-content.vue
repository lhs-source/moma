<template>
  <div v-if="isOpen" :class="cn(
    'absolute top-full left-0 z-[9999] w-full rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-lg',
    props.class
  )" @click.stop>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from '@/lib/utils'

export interface SelectContentProps {
  class?: string
}

const props = withDefaults(defineProps<SelectContentProps>(), {})

const selectContext = inject<{
  selectedValue: { value: string }
  isOpen: { value: boolean }
  updateValue: (value: string) => void
  toggleOpen: () => void
  close: () => void
}>('select')

if (!selectContext) {
  throw new Error('SelectContent must be used within a Select component')
}

const { isOpen, close } = selectContext

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  const selectElement = target.closest('[data-select]')

  if (isOpen.value && !selectElement) {
    close()
  }
}

onMounted(() => {
  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
