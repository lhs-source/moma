<template>
  <Sheet :open="props.open" :title="props.selectedNpc?.name || 'NPC 정보'" @update:open="updateOpen">
    <!-- NPC 데이터 없음 -->
    <div v-if="!props.selectedNpc" class="text-center py-12 bg-muted/50 rounded-lg">
      <p class="text-muted-foreground text-sm">NPC 정보를 불러오는 중...</p>
    </div>
    
    <!-- NPC 상세 정보 -->
    <div v-else class="space-y-6 bg-background">
      <!-- NPC 기본 정보 -->
      <div class="flex items-start gap-4">
        <!-- NPC 이미지 -->
        <div class="w-24 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            v-if="props.selectedNpc.imageUrl"
            :src="props.selectedNpc.imageUrl"
            :alt="props.selectedNpc.name"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <div v-else class="text-muted-foreground text-xs text-center p-2">
            이미지<br />없음
          </div>
        </div>

        <!-- NPC 정보 -->
        <div class="flex-1 space-y-2">
          <div>
            <h3 class="text-lg font-semibold">{{ props.selectedNpc.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ props.selectedNpc.description }}</p>
          </div>
          
          <div class="flex items-center gap-2">
            <span class="text-xs bg-muted px-2 py-1 rounded">{{ props.selectedNpc.location.name }}</span>
            <span
              v-if="props.selectedNpc.tradeCount > 0"
              class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              물물교환 가능 {{ props.selectedNpc.tradeCount }}개
            </span>
            <span
              v-else
              class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              물물교환 불가
            </span>
          </div>
        </div>
      </div>

      <!-- 물물교환 가능 아이템 목록 -->
      <div v-if="props.selectedNpc.availableTrades.length > 0" class="bg-muted/30 rounded-lg p-4">
        <h4 class="text-sm font-semibold mb-3">물물교환 가능 아이템</h4>
        <div class="space-y-2">
          <div
            v-for="trade in props.selectedNpc.availableTrades"
            :key="trade.tradeId"
            class="bg-background rounded-lg p-3 text-sm border border-border"
          >
            <div class="flex items-center gap-2">
              <span class="font-medium">{{ trade.giveQuantity }}x {{ trade.giveItemName }}</span>
              <span class="text-muted-foreground">→</span>
              <span class="font-medium">{{ trade.receiveQuantity }}x {{ trade.receiveItemName }}</span>
            </div>
            <div class="mt-1 text-xs text-muted-foreground">
              {{ trade.type }} (주간 교환 가능: {{ trade.maxExchanges }}회)
            </div>
          </div>
        </div>
      </div>

      <!-- 빈 상태 -->
      <div v-else class="text-center py-8 text-muted-foreground text-sm bg-muted/30 rounded-lg">
        물물교환 가능한 아이템이 없습니다.
      </div>
    </div>
  </Sheet>
</template>

<script setup lang="ts">
import type { EnrichedNPC } from '@/stores/npc'
import Sheet from '@/components/ui/sheet.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  open: boolean
  selectedNpc?: EnrichedNPC | null
}>()



const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function updateOpen(value: boolean): void {
  emit('update:open', value)
}

function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

