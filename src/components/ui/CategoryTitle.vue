<template>
  <h3 :class="cn('font-semibold text-foreground', sizeClasses[size], className)">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}>(), {
  size: 'md',
  className: ''
})

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl'
}
</script>

