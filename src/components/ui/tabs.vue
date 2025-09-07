<template>
  <div :class="cn('w-full', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { cn } from '@/lib/utils'

export interface TabsProps {
  defaultValue?: string
  value?: string
  class?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  defaultValue: '',
})

const emit = defineEmits<{
  'update:value': [value: string]
}>()

const activeValue = ref(props.value || props.defaultValue)

const updateValue = (value: string) => {
  activeValue.value = value
  emit('update:value', value)
}

provide('tabs', {
  activeValue,
  updateValue,
})
</script>
