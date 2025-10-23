<template>
  <div class="inline-flex rounded-lg border border-border bg-card p-1">
    <button
      v-for="view in views"
      :key="view.value"
      :class="[
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        modelValue === view.value
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
      ]"
      @click="handleViewChange(view.value)"
    >
      {{ view.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CalendarViewType } from '@/composables/useCalendarView'

/**
 * 캘린더 뷰 전환 토글 컴포넌트
 * 
 * 월별/주간 캘린더 뷰를 전환할 수 있는 토글 버튼을 제공합니다.
 * v-model 패턴을 사용하여 부모 컴포넌트와 양방향 바인딩됩니다.
 * 
 * @component CalendarViewToggle
 * 
 * @remarks
 * - 단일 책임: 뷰 전환 UI만 담당
 * - Event 기반: click 시 명시적으로 update:modelValue 이벤트 발생
 * - 접근성: 키보드 탐색 가능, 현재 선택된 뷰는 시각적으로 강조
 * 
 * @example
 * ```vue
 * <CalendarViewToggle v-model="calendarView" />
 * // 또는 명시적 이벤트 핸들러
 * <CalendarViewToggle 
 *   :model-value="calendarView"
 *   @update:model-value="handleViewChange"
 * />
 * ```
 */

/**
 * Props
 * @property {CalendarViewType} modelValue - 현재 선택된 뷰 타입 ('month' | 'week')
 */
const props = defineProps<{
  modelValue: CalendarViewType
}>()

/**
 * Emits
 * @event update:modelValue - 뷰가 변경되었을 때 발생
 * @param {CalendarViewType} value - 새로 선택된 뷰 타입
 */
const emit = defineEmits<{
  (eventName: 'update:modelValue', value: CalendarViewType): void
}>()

/** 뷰 옵션 목록 */
const views = [
  { value: 'month' as const, label: '월별' },
  { value: 'week' as const, label: '주간' },
]

/**
 * 뷰 변경 이벤트 핸들러
 * 
 * 버튼 클릭 시 호출되어 부모 컴포넌트에 뷰 변경을 알립니다.
 * Event 기반 패턴으로 명확한 데이터 흐름을 보장합니다.
 * 
 * @param {CalendarViewType} value - 선택된 뷰 타입
 * 
 * @remarks
 * 동작 플로우:
 * 1. 사용자가 버튼 클릭
 * 2. handleViewChange 호출
 * 3. update:modelValue 이벤트 발생
 * 4. 부모 컴포넌트의 setView() 호출
 * 5. 로컬 스토리지 저장 (부모 composable에서 처리)
 */
function handleViewChange(value: CalendarViewType): void {
  emit('update:modelValue', value)
}
</script>

