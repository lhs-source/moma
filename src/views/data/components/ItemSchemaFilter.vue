<template>
  <div class="space-y-3">
    <!-- 스키마 필터 제목 -->
    <div class="text-sm font-medium text-foreground">
      스키마별 필터
    </div>

    <!-- 스키마 버튼 그룹 -->
    <div class="flex flex-wrap gap-2 overflow-x-auto pb-2">
      <button
        v-for="schema in availableSchemas"
        :key="schema.value"
        :class="[
          'px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          selectedSchema === schema.value
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        ]"
        @click="handleSchemaChange(schema.value)"
      >
        {{ schema.label }}
        <span 
          v-if="schema.count !== undefined" 
          class="ml-1 text-xs opacity-75"
        >
          ({{ schema.count }})
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * # ItemSchemaFilter 컴포넌트
 * 
 * ## 기능 설명
 * 아이템 목록을 스키마별로 필터링할 수 있는 버튼 그룹 컴포넌트
 * 
 * ## 주요 기능
 * - 스키마별 필터 버튼 그룹 표시
 * - 선택된 스키마 시각적 표시
 * - 스키마별 아이템 개수 표시 (옵션)
 * - 모바일 반응형 디자인 (가로 스크롤)
 * - Event 기반 상태 업데이트
 * 
 * ## Props
 * - selectedSchema: 현재 선택된 스키마 필터
 * - availableSchemas: 사용 가능한 스키마 옵션 목록
 * - schemaCounts: 스키마별 아이템 개수 (옵션)
 * 
 * ## Emits
 * - update:selectedSchema: 스키마 선택 변경 이벤트
 * 
 * ## UI 구조
 * ```
 * ┌─────────────────────────────────────────────────┐
 * │ 스키마별 필터                                    │
 * ├─────────────────────────────────────────────────┤
 * │ [전체 (150)] [재료 (45)] [음식 (30)] [물약 (12)]│
 * │ [통화 (5)] [식재료 (28)] [소모품 (15)] ...      │
 * └─────────────────────────────────────────────────┘
 * ```
 */
// computed는 현재 사용되지 않음
import type { SchemaFilterOption } from '@/composables/useSchemaFilter'

// Props 정의 (props는 템플릿에서 사용됨)
const props = withDefaults(defineProps<{
  // 현재 선택된 스키마 필터
  selectedSchema: SchemaFilterOption
  // 사용 가능한 스키마 옵션 목록
  availableSchemas: Array<{ value: SchemaFilterOption; label: string; count?: number }>
  // 스키마별 아이템 개수 (옵션)
  schemaCounts?: Record<string, number>
}>(), {
  selectedSchema: '',
  availableSchemas: () => [],
  schemaCounts: () => ({})
})

// Emits 정의
const emit = defineEmits<{
  (eventName: 'update:selectedSchema', value: SchemaFilterOption): void
}>()

// schemasWithCounts는 현재 사용되지 않음 (템플릿에서 직접 처리)

/**
 * # 스키마 변경 핸들러
 * 
 * 사용자가 스키마 버튼을 클릭했을 때 호출되는 이벤트 핸들러
 * Event 기반 패턴으로 명시적 상태 업데이트
 * 
 * @param {SchemaFilterOption} schema - 선택된 스키마 값
 */
function handleSchemaChange(schema: SchemaFilterOption): void {
  emit('update:selectedSchema', schema)
}
</script>

<style scoped>
/* 모바일에서 가로 스크롤 최적화 */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 2px;
}

/* 버튼 hover 효과 */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.15s ease-in-out;
}

/* 선택된 버튼 강조 */
button[class*="bg-primary"] {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
