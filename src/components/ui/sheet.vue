<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
        @click.self="handleClose"
      >
        <div
          ref="sheetRef"
          class="fixed inset-x-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:max-h-[85vh] w-full sm:max-w-lg sm:mx-auto bg-background border-t sm:border border-border rounded-t-2xl sm:rounded-lg shadow-xl overflow-hidden flex flex-col"
          @keydown.esc="handleClose"
        >
        <div class="flex items-center justify-between p-4 border-b border-border">
          <h2 v-if="title" class="text-lg font-semibold">
            {{ title }}
          </h2>
          <button
            class="ml-auto rounded-md p-2 hover:bg-muted transition-colors"
            @click="handleClose"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <slot />
        </div>
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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
  if (event.key === 'Escape') {
    handleClose()
  }
}

// Escape 키 리스너 추가/제거
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<style scoped>
/* Vue Transition Classes */
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.3s ease;
}

.sheet-enter-active .bg-background,
.sheet-leave-active .bg-background {
  transition: transform 0.3s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from .bg-background,
.sheet-leave-to .bg-background {
  transform: translateY(100%);
}

/* 데스크탑에서는 아래가 아니라 중앙에서 슬라이드 */
@media (min-width: 640px) {
  .sheet-enter-from .bg-background,
  .sheet-leave-to .bg-background {
    transform: translate(-50%, -50%) scale(0.95);
  }
}
</style>

