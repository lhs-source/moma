<template>
  <div v-if="isActive" :class="cn(
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    props.class
  )">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'

export interface TabsContentProps {
  value: string
  class?: string
}

const props = defineProps<TabsContentProps>()

const tabsContext = inject<{
  activeValue: { value: string }
  updateValue: (value: string) => void
}>('tabs')

if (!tabsContext) {
  throw new Error('TabsContent must be used within a Tabs component')
}

const isActive = computed(() => tabsContext.activeValue.value === props.value)
</script>
