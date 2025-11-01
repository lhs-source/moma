import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSchemaFilter } from '../useSchemaFilter'
import { ITEM_CATEGORY } from '@/data/schemas/item'

// localStorage mock
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('useSchemaFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('초기화', () => {
    it('기본값으로 전체(빈 문자열)가 선택되어야 함', () => {
      const { selectedSchema } = useSchemaFilter()
      expect(selectedSchema.value).toBe('')
    })

    it('localStorage에서 저장된 값을 복원해야 함', () => {
      localStorageMock.getItem.mockReturnValue(ITEM_CATEGORY.MATERIAL)
      
      const { selectedSchema } = useSchemaFilter()
      expect(selectedSchema.value).toBe(ITEM_CATEGORY.MATERIAL)
    })

    it('잘못된 localStorage 값은 무시하고 기본값을 사용해야 함', () => {
      localStorageMock.getItem.mockReturnValue('invalid-category')
      
      const { selectedSchema } = useSchemaFilter()
      expect(selectedSchema.value).toBe('')
    })
  })

  describe('updateSchema', () => {
    it('스키마를 변경하고 localStorage에 저장해야 함', () => {
      const { updateSchema, selectedSchema } = useSchemaFilter()
      
      updateSchema(ITEM_CATEGORY.FOOD)
      
      expect(selectedSchema.value).toBe(ITEM_CATEGORY.FOOD)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'moma_item_schema_filter',
        ITEM_CATEGORY.FOOD
      )
    })

    it('전체(빈 문자열)로 변경할 수 있어야 함', () => {
      const { updateSchema, selectedSchema } = useSchemaFilter()
      
      updateSchema('')
      
      expect(selectedSchema.value).toBe('')
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'moma_item_schema_filter',
        ''
      )
    })
  })

  describe('resetSchema', () => {
    it('스키마를 전체로 초기화하고 localStorage에 저장해야 함', () => {
      const { resetSchema, selectedSchema } = useSchemaFilter()
      
      // 먼저 다른 값으로 설정
      selectedSchema.value = ITEM_CATEGORY.POTION
      
      resetSchema()
      
      expect(selectedSchema.value).toBe('')
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'moma_item_schema_filter',
        ''
      )
    })
  })

  describe('availableSchemas', () => {
    it('전체 옵션과 모든 ITEM_CATEGORY 값들을 포함해야 함', () => {
      const { availableSchemas } = useSchemaFilter()
      
      const schemas = availableSchemas.value
      
      // 전체 옵션이 첫 번째에 있어야 함
      expect(schemas[0]).toEqual({
        value: '',
        label: '전체'
      })
      
      // 모든 ITEM_CATEGORY 값들이 포함되어야 함
      const categoryValues = Object.values(ITEM_CATEGORY)
      expect(schemas).toHaveLength(categoryValues.length + 1) // +1 for 전체
      
      categoryValues.forEach(category => {
        expect(schemas).toContainEqual({
          value: category,
          label: category
        })
      })
    })
  })

  describe('localStorage 에러 처리', () => {
    it('localStorage.getItem 에러 시 기본값을 사용해야 함', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      
      const { selectedSchema } = useSchemaFilter()
      expect(selectedSchema.value).toBe('')
    })

    it('localStorage.setItem 에러 시 콘솔에 경고를 출력해야 함', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      
      const { updateSchema } = useSchemaFilter()
      updateSchema(ITEM_CATEGORY.MATERIAL)
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save schema filter to localStorage:',
        expect.any(Error)
      )
      
      consoleSpy.mockRestore()
    })
  })
})
