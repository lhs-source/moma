<template>
  <span :class="cn('block truncate', props.class)">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface SelectValueProps {
  placeholder?: string
  class?: string
}

const props = withDefaults(defineProps<SelectValueProps>(), {})
</script>
