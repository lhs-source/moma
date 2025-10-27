<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
      @click.self="handleClose"
    >
      <div
        ref="sheetRef"
        class="fixed inset-x-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:max-h-[85vh] w-full sm:max-w-lg sm:mx-auto bg-background border-t sm:border border-border rounded-t-2xl sm:rounded-lg shadow-xl overflow-hidden flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-top"
        @keydown.esc="handleClose"
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <h2 v-if="title" class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h2>
          <button
            class="ml-auto rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="handleClose"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'SheetComponent'
})

const props = defineProps<{
  title?: string
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const sheetRef = ref<HTMLDivElement>()

function handleClose(): void {
  emit('update:open', false)
}

// Escape 키 처리
function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.open) {
    handleClose()
  }
}

// Escape 키 리스너 추가/제거
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
@keyframes slide-in-from-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-in-from-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-in {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

.slide-in-from-bottom {
  animation-name: slide-in-from-bottom;
}

@media (min-width: 640px) {
  .slide-in-from-top {
    animation-name: slide-in-from-top;
  }
}
</style>

