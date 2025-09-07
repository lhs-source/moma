<template>
  <div :class="cn('relative', props.class)" data-select>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface SelectProps {
  modelValue?: string
  value?: string
  defaultValue?: string
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  defaultValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:value': [value: string]
}>()

const selectedValue = ref(props.modelValue || props.value || props.defaultValue)
const isOpen = ref(false)

// v-model을 위한 watch
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    selectedValue.value = newValue
  }
})

watch(() => props.value, (newValue) => {
  if (newValue !== undefined) {
    selectedValue.value = newValue
  }
})

const updateValue = (value: string) => {
  selectedValue.value = value
  isOpen.value = false
  emit('update:modelValue', value)
  emit('update:value', value)
}

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

provide('select', {
  selectedValue,
  isOpen,
  updateValue,
  toggleOpen,
  close,
})
</script>
