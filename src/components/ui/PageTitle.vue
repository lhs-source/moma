<template>
  <h1 :class="cn('font-bold text-foreground', sizeClasses[size], className)">
    <slot />
  </h1>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  className?: string
}>(), {
  size: 'lg',
  className: ''
})

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl'
}
</script>

