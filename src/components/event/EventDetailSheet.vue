<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="isOpen && event" class="fixed inset-0 z-50 flex items-end justify-center">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/80"
          @click="closeSheet"
        ></div>

        <!-- Sheet Content -->
        <div 
          class="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
          @click.stop
        >
          <!-- Header -->
          <div class="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white truncate">{{ event.name }}</h2>
                <div class="flex items-center gap-2 mt-2">
                  <span :class="typeClass" class="text-xs font-medium px-2 py-1 rounded-full">
                    {{ event.type }}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ formatDate(event.startDate) }} ~ {{ formatDate(event.endDate) }}
                  </span>
                </div>
              </div>
              <button 
                @click="closeSheet"
                class="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto px-6 py-6">
            <!-- Description -->
            <div v-if="event.description" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">설명</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ event.description }}</p>
            </div>

            <!-- Sale Location -->
            <div v-if="event.saleLocation" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">판매 위치</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ event.saleLocation }}</p>
            </div>

            <!-- Packages -->
            <div v-if="event.packages && event.packages.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">판매 패키지</h3>
              <div class="space-y-4">
                <div 
                  v-for="(pkg, index) in event.packages" 
                  :key="index"
                  class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 hover:border-blue-500/50 transition-colors"
                >
                  <div class="flex items-start justify-between mb-3">
                    <h4 class="text-base font-semibold text-gray-900 dark:text-white">{{ pkg.name }}</h4>
                    <div class="text-right ml-4">
                      <div class="text-sm font-bold text-blue-600 dark:text-blue-400">{{ pkg.price }}</div>
                      <div v-if="pkg.cashPoint" class="text-xs text-gray-600 dark:text-gray-400">
                        포인트: {{ pkg.cashPoint }}
                      </div>
                    </div>
                  </div>

                  <!-- Items -->
                  <div class="mb-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white mb-2">구성품</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div 
                        v-for="(item, itemIndex) in pkg.items" 
                        :key="itemIndex"
                        class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded px-3 py-2"
                      >
                        <span class="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                        <span class="flex-1">{{ item.name }}</span>
                        <span class="font-medium">{{ item.quantity }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Purchase Limit -->
                  <div class="text-xs text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded px-3 py-2">
                    구매 제한: {{ pkg.purchaseLimit }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div v-if="event.notes && event.notes.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">참고사항</h3>
              <div class="space-y-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div 
                  v-for="(note, index) in event.notes" 
                  :key="index"
                  class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span class="text-amber-600 dark:text-amber-400 mt-1">•</span>
                  <span>{{ note }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GameEvent } from '@/data/schemas/event'
import { EVENT_TYPE } from '@/data/schemas/event'

const props = withDefaults(defineProps<{
  event: GameEvent | null
  isOpen: boolean
}>(), {
  event: null,
  isOpen: false,
})

const emit = defineEmits<{
  (eventName: 'close'): void
}>()

const typeClass = computed(() => {
  if (!props.event) return ''
  
  switch (props.event.type) {
    case EVENT_TYPE.EVENT:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case EVENT_TYPE.CASH_SHOP:
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    case EVENT_TYPE.ITEM:
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case EVENT_TYPE.MAINTENANCE:
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }
})

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

function closeSheet() {
  emit('close')
}
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: all 0.3s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from .relative,
.sheet-leave-to .relative {
  transform: translateY(100%);
}

.sheet-enter-active .relative,
.sheet-leave-active .relative {
  transition: transform 0.3s ease;
}
</style>
