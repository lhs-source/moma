<template>
  <div
    class="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
    @click="$emit('click')"
  >
    <div class="flex items-start gap-3">
      <!-- 룬 이미지 -->
      <div class="w-16 h-16 flex-shrink-0 border rounded bg-muted/50 flex items-center justify-center">
        <img
          v-if="rune.image"
          :src="rune.image"
          :alt="rune.name"
          class="w-full h-full object-contain"
        />
        <span
          v-else
          class="text-xs text-muted-foreground"
        >
          이미지 없음
        </span>
      </div>

      <!-- 룬 정보 -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-sm truncate">
              {{ rune.name }}
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                {{ rune.type }}
              </span>
              <span class="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                {{ rune.grade }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 효과 미리보기 (최대 2줄) -->
        <p class="text-xs text-muted-foreground mt-2 line-clamp-2">
          {{ rune.effect }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * # RuneCard 컴포넌트
 * 
 * ## 기능 설명
 * 개별 룬을 카드 형태로 표시하는 컴포넌트
 * 
 * ## 주요 기능
 * - 룬 이미지 표시 (없으면 placeholder)
 * - 룬 이름, 타입, 등급 표시
 * - 효과 미리보기 (2줄 제한)
 * - 클릭 시 상세 정보 열기
 */
import type { Rune } from '@/data/equip/weapons'

withDefaults(defineProps<{
  rune: Rune
}>(), {})

defineEmits<{
  click: []
}>()
</script>

