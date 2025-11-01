import { ref, computed, readonly, type Ref, type ComputedRef } from 'vue'
import { ITEM_CATEGORY } from '@/data/schemas/item'

/**
 * # 스키마 필터 옵션 타입
 * 
 * 빈 문자열('')은 '전체'를 의미하며, ITEM_CATEGORY enum 값들은 특정 스키마를 의미
 */
export type SchemaFilterOption = '' | ITEM_CATEGORY

/**
 * # 스키마 필터 상태 인터페이스
 * 
 * useSchemaFilter composable의 반환 타입을 정의
 */
export interface SchemaFilterState {
  // 현재 선택된 스키마 필터
  selectedSchema: Readonly<Ref<SchemaFilterOption>>
  // 스키마 필터 업데이트 함수
  updateSchema: (schema: SchemaFilterOption) => void
  // 스키마 필터 초기화 함수
  resetSchema: () => void
  // 사용 가능한 스키마 옵션 목록
  availableSchemas: Readonly<ComputedRef<Array<{ value: SchemaFilterOption; label: string; count?: number }>>>
}

// 로컬 스토리지 키
const STORAGE_KEY = 'moma_item_schema_filter'

/**
 * # useSchemaFilter Composable
 * 
 * ## 기능 설명
 * 아이템 목록의 스키마별 필터링을 관리하는 composable
 * 로컬 스토리지를 통한 상태 유지와 Event 기반 상태 업데이트 제공
 * 
 * ## 주요 기능
 * - 스키마 필터 상태 관리 (전체, 재료, 음식, 물약 등)
 * - 로컬 스토리지 자동 저장/복원
 * - Event 기반 상태 업데이트 (watch 미사용)
 * - 사용 가능한 스키마 옵션 목록 제공
 * 
 * ## 사용 예시
 * ```typescript
 * const { selectedSchema, updateSchema, resetSchema } = useSchemaFilter()
 * 
 * // 스키마 변경
 * updateSchema(ITEM_CATEGORY.MATERIAL)
 * 
 * // 전체로 초기화
 * resetSchema()
 * ```
 * 
 * ## 반환값
 * @returns {SchemaFilterState} 스키마 필터 상태 및 제어 함수들
 * 
 * ## 로컬 스토리지
 * - 키: 'moma_item_schema_filter'
 * - 값: SchemaFilterOption (문자열)
 * - 기본값: '' (전체)
 */
export function useSchemaFilter(): SchemaFilterState {
  /**
   * # 로컬 스토리지에서 저장된 스키마 필터 값 복원
   * 
   * @returns {SchemaFilterOption} 저장된 스키마 필터 값 또는 기본값('')
   */
  function getStoredSchema(): SchemaFilterOption {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && Object.values(ITEM_CATEGORY).includes(stored as ITEM_CATEGORY)) {
        return stored as ITEM_CATEGORY
      }
      return ''
    } catch (error) {
      console.warn('Failed to load schema filter from localStorage:', error)
      return ''
    }
  }

  /**
   * # 로컬 스토리지에 스키마 필터 값 저장
   * 
   * @param {SchemaFilterOption} schema - 저장할 스키마 필터 값
   */
  function saveToLocalStorage(schema: SchemaFilterOption): void {
    try {
      localStorage.setItem(STORAGE_KEY, schema)
    } catch (error) {
      console.warn('Failed to save schema filter to localStorage:', error)
    }
  }

  // 현재 선택된 스키마 필터 상태 (내부 ref)
  const _selectedSchema = ref<SchemaFilterOption>(getStoredSchema())

  /**
   * # 스키마 필터 업데이트 함수
   * 
   * 선택된 스키마를 변경하고 로컬 스토리지에 저장
   * Event 기반 패턴으로 명시적 호출
   * 
   * @param {SchemaFilterOption} schema - 새로운 스키마 필터 값
   */
  function updateSchema(schema: SchemaFilterOption): void {
    _selectedSchema.value = schema
    saveToLocalStorage(schema)
  }

  /**
   * # 스키마 필터 초기화 함수
   * 
   * 스키마 필터를 '전체'로 초기화하고 로컬 스토리지에서 제거
   */
  function resetSchema(): void {
    _selectedSchema.value = ''
    saveToLocalStorage('')
  }

  /**
   * # 사용 가능한 스키마 옵션 목록
   * 
   * 전체 옵션과 모든 ITEM_CATEGORY 값들을 포함한 옵션 목록
   * 각 옵션은 value, label, count 속성을 가짐
   * 
   * @returns {ComputedRef<Array<{value, label, count?}>>} 스키마 옵션 목록
   */
  const availableSchemas = computed(() => {
    const options = [
      { value: '' as SchemaFilterOption, label: '전체' }
    ]

    // ITEM_CATEGORY enum의 모든 값들을 옵션으로 추가
    Object.values(ITEM_CATEGORY).forEach(category => {
      options.push({
        value: category as SchemaFilterOption,
        label: category
      })
    })

    return options
  })

  return {
    selectedSchema: readonly(_selectedSchema),
    updateSchema,
    resetSchema,
    availableSchemas
  }
}
