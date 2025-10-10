<template>
  <h2 :class="cn('font-bold text-foreground', sizeClasses[size], className)">
    <slot />
  </h2>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  className?: string
}>(), {
  size: 'md',
  className: ''
})

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-2xl'
}
</script>

