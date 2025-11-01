import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import { useItemStore } from '@/stores/item'
import { useRecipesStore } from '@/stores/recipes'
import { useTradeStore } from '@/stores/trade'
import { useNpcStore } from '@/stores/npc'

// Store mocks
vi.mock('@/stores/item')
vi.mock('@/stores/recipes')
vi.mock('@/stores/trade')
vi.mock('@/stores/npc')

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

describe('ItemList Integration Tests', () => {
  const mockEnrichedItems = [
    {
      id: 'item1',
      name: '철광석',
      imageUrl: '/images/iron-ore.png',
      category: '재료',
      usageTypes: ['레시피', '교환'],
      requiredForTrades: [],
      obtainableFromTrades: [],
      cookingRecipes: [],
      usedInCookingRecipes: [],
      processingRecipes: [],
      usedInProcessingRecipes: [],
      craftingRecipes: [],
      usedInCraftingRecipes: []
    },
    {
      id: 'item2',
      name: '빵',
      imageUrl: '/images/bread.png',
      category: '음식',
      usageTypes: ['구매'],
      requiredForTrades: [],
      obtainableFromTrades: [],
      cookingRecipes: [],
      usedInCookingRecipes: [],
      processingRecipes: [],
      usedInProcessingRecipes: [],
      craftingRecipes: [],
      usedInCraftingRecipes: []
    },
    {
      id: 'item3',
      name: '체력 물약',
      imageUrl: '/images/health-potion.png',
      category: '물약',
      usageTypes: ['제작'],
      requiredForTrades: [],
      obtainableFromTrades: [],
      cookingRecipes: [],
      usedInCookingRecipes: [],
      processingRecipes: [],
      usedInProcessingRecipes: [],
      craftingRecipes: [],
      usedInCraftingRecipes: []
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)

    // Mock stores
    const mockItemStore = {
      categories: ['재료', '음식', '물약'],
      schemaCounts: {
        '': 3,
        '재료': 1,
        '음식': 1,
        '물약': 1
      },
      getFilteredItems: vi.fn().mockReturnValue(mockEnrichedItems)
    }

    const mockRecipesStore = {
      recipeList: [],
      getRecipeById: vi.fn(),
      fetchRecipeList: vi.fn()
    }

    const mockTradeStore = {
      tradeList: [],
      fetchTradeList: vi.fn()
    }

    const mockNpcStore = {
      npcList: [],
      fetchNpcList: vi.fn()
    }

    vi.mocked(useItemStore).mockReturnValue(mockItemStore as unknown as ReturnType<typeof useItemStore>)
    vi.mocked(useRecipesStore).mockReturnValue(mockRecipesStore as unknown as ReturnType<typeof useRecipesStore>)
    vi.mocked(useTradeStore).mockReturnValue(mockTradeStore as unknown as ReturnType<typeof useTradeStore>)
    vi.mocked(useNpcStore).mockReturnValue(mockNpcStore as unknown as ReturnType<typeof useNpcStore>)
  })

  describe('스키마 필터 통합', () => {
    it('스키마 필터 컴포넌트가 렌더링되어야 함', () => {
      const wrapper = mount(ItemList)
      
      expect(wrapper.findComponent({ name: 'ItemSchemaFilter' }).exists()).toBe(true)
    })

    it('스키마 필터 변경 시 getFilteredItems가 올바른 파라미터로 호출되어야 함', async () => {
      const wrapper = mount(ItemList)
      const itemStore = useItemStore()
      
      // 스키마 필터 컴포넌트 찾기
      const schemaFilter = wrapper.findComponent({ name: 'ItemSchemaFilter' })
      
      // 스키마 변경 이벤트 발생
      await schemaFilter.vm.$emit('update:selectedSchema', '재료')
      
      // getFilteredItems가 schema 파라미터와 함께 호출되었는지 확인
      expect(itemStore.getFilteredItems).toHaveBeenCalledWith({
        searchQuery: '',
        category: '',
        usageType: '',
        schema: '재료'
      })
    })

    it('여러 필터가 동시에 적용되어야 함', async () => {
      const wrapper = mount(ItemList)
      const itemStore = useItemStore()
      
      // 검색어 입력
      const searchInput = wrapper.find('input[type="text"]')
      await searchInput.setValue('철')
      
      // 스키마 변경
      const schemaFilter = wrapper.findComponent({ name: 'ItemSchemaFilter' })
      await schemaFilter.vm.$emit('update:selectedSchema', '재료')
      
      // 디바운싱 대기
      await new Promise(resolve => setTimeout(resolve, 350))
      
      // 모든 필터가 적용되었는지 확인
      expect(itemStore.getFilteredItems).toHaveBeenCalledWith({
        searchQuery: '철',
        category: '',
        usageType: '',
        schema: '재료'
      })
    })
  })

  describe('로컬 스토리지 통합', () => {
    it('저장된 스키마 필터가 복원되어야 함', () => {
      localStorageMock.getItem.mockReturnValue('음식')
      
      const wrapper = mount(ItemList)
      
      // 스키마 필터가 올바른 값으로 초기화되었는지 확인
      const schemaFilter = wrapper.findComponent({ name: 'ItemSchemaFilter' })
      expect(schemaFilter.props('selectedSchema')).toBe('음식')
    })

    it('스키마 변경 시 로컬 스토리지에 저장되어야 함', async () => {
      const wrapper = mount(ItemList)
      const schemaFilter = wrapper.findComponent({ name: 'ItemSchemaFilter' })
      
      await schemaFilter.vm.$emit('update:selectedSchema', '물약')
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'moma_item_schema_filter',
        '물약'
      )
    })
  })

  describe('스키마별 개수 표시', () => {
    it('스키마 필터에 올바른 개수 정보가 전달되어야 함', () => {
      const wrapper = mount(ItemList)
      const schemaFilter = wrapper.findComponent({ name: 'ItemSchemaFilter' })
      
      expect(schemaFilter.props('schemaCounts')).toEqual({
        '': 3,
        '재료': 1,
        '음식': 1,
        '물약': 1
      })
    })

    it('스키마 옵션에 개수 정보가 포함되어야 함', () => {
      const wrapper = mount(ItemList)
      const schemaFilter = wrapper.findComponent({ name: 'ItemSchemaFilter' })
      
      const availableSchemas = schemaFilter.props('availableSchemas')
      expect(availableSchemas).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ value: '', label: '전체', count: 3 }),
          expect.objectContaining({ value: '재료', label: '재료', count: 1 }),
          expect.objectContaining({ value: '음식', label: '음식', count: 1 }),
          expect.objectContaining({ value: '물약', label: '물약', count: 1 })
        ])
      )
    })
  })

  describe('에러 처리', () => {
    it('localStorage 에러 시 기본값을 사용해야 함', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      
      const wrapper = mount(ItemList)
      
      // 에러가 발생해도 컴포넌트가 정상적으로 렌더링되어야 함
      expect(wrapper.findComponent({ name: 'ItemSchemaFilter' }).exists()).toBe(true)
    })

    it('store 에러 시에도 컴포넌트가 정상 동작해야 함', () => {
      const mockItemStore = {
        categories: [],
        schemaCounts: {},
        getFilteredItems: vi.fn().mockImplementation(() => {
          throw new Error('Store error')
        })
      }

      vi.mocked(useItemStore).mockReturnValue(mockItemStore as unknown as ReturnType<typeof useItemStore>)
      
      const wrapper = mount(ItemList)
      
      // 에러가 발생해도 컴포넌트가 정상적으로 렌더링되어야 함
      expect(wrapper.findComponent({ name: 'ItemSchemaFilter' }).exists()).toBe(true)
    })
  })
})
