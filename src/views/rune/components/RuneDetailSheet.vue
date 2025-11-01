<template>
  <Sheet :open="open" :title="rune?.name || '룬 정보'" @update:open="handleOpenChange">
    <div v-if="rune" class="space-y-6">
      <!-- 룬 기본 정보 -->
      <div class="flex items-start gap-4">
        <!-- 룬 이미지 -->
        <div class="w-24 h-24 flex-shrink-0 border rounded bg-muted/50 flex items-center justify-center">
          <img v-if="rune.image" :src="rune.image" :alt="rune.name" class="w-full h-full object-contain" />
          <span v-else class="text-xs text-muted-foreground">
            이미지 없음
          </span>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mt-2">
            <span :class="getRuneTypeBadgeClassLarge(rune.type)">
              {{ rune.type }}
            </span>
            <span :class="getRuneGradeBadgeClassLarge(rune.grade)">
              {{ rune.grade }}
            </span>
          </div>
        </div>
      </div>

      <!-- 효과 -->
      <div>
        <h3 class="text-sm font-semibold mb-2">
          효과
        </h3>
        <p class="text-sm text-muted-foreground whitespace-pre-wrap">
          {{ rune.effect }}
        </p>
      </div>

      <!-- 획득처 -->
      <div v-if="rune.obtainSources && rune.obtainSources.length > 0">
        <h3 class="text-sm font-semibold mb-2">
          획득처
        </h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="source in rune.obtainSources" :key="source"
            class="text-sm px-2 py-1 rounded bg-muted text-muted-foreground">
            {{ source }}
          </span>
        </div>
      </div>
      <div v-else>
        <h3 class="text-sm font-semibold mb-2">
          획득처
        </h3>
        <p class="text-sm text-muted-foreground">
          획득처 정보가 없습니다.
        </p>
      </div>

      <!-- ID -->
      <div>
        <h3 class="text-sm font-semibold mb-2">
          ID
        </h3>
        <p class="text-sm text-muted-foreground font-mono">
          {{ rune.id }}
        </p>
      </div>
    </div>
  </Sheet>
</template>

<script setup lang="ts">
/**
 * # RuneDetailSheet 컴포넌트
 * 
 * ## 기능 설명
 * 룬의 상세 정보를 시트 형태로 표시하는 컴포넌트
 * 
 * ## 주요 기능
 * - 룬 이름, 타입, 등급 표시
 * - 효과 상세 설명 표시
 * - 획득처 정보 명확히 표시
 * - ID 표시
 * - 모바일 반응형 지원
 */
import type { Rune } from '@/data/equip/weapons'
import Sheet from '@/components/ui/sheet.vue'
import { getRuneTypeBadgeClassLarge, getRuneGradeBadgeClassLarge } from '@/utils/runeUtils'

withDefaults(defineProps<{
  open: boolean
  rune: Rune | null
}>(), {
  open: false,
  rune: null,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function handleOpenChange(value: boolean) {
  emit('update:open', value)
}
</script>
