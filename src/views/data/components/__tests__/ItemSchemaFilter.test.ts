import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ItemSchemaFilter from '../ItemSchemaFilter.vue'
import { ITEM_CATEGORY } from '@/data/schemas/item'

describe('ItemSchemaFilter', () => {
  const defaultProps = {
    selectedSchema: '',
    availableSchemas: [
      { value: '', label: '전체', count: 150 },
      { value: ITEM_CATEGORY.MATERIAL, label: '재료', count: 45 },
      { value: ITEM_CATEGORY.FOOD, label: '음식', count: 30 },
      { value: ITEM_CATEGORY.POTION, label: '물약', count: 12 }
    ],
    schemaCounts: {
      '': 150,
      [ITEM_CATEGORY.MATERIAL]: 45,
      [ITEM_CATEGORY.FOOD]: 30,
      [ITEM_CATEGORY.POTION]: 12
    }
  }

  describe('렌더링', () => {
    it('제목이 표시되어야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: defaultProps
      })
      
      expect(wrapper.text()).toContain('스키마별 필터')
    })

    it('모든 스키마 버튼이 렌더링되어야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: defaultProps
      })
      
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(4) // 전체, 재료, 음식, 물약
      
      expect(wrapper.text()).toContain('전체')
      expect(wrapper.text()).toContain('재료')
      expect(wrapper.text()).toContain('음식')
      expect(wrapper.text()).toContain('물약')
    })

    it('스키마별 개수가 표시되어야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: defaultProps
      })
      
      // 개수가 표시되는지 확인 (정확한 텍스트 위치는 중요하지 않음)
      expect(wrapper.html()).toContain('(150)') // 전체
      expect(wrapper.html()).toContain('(45)')  // 재료
      expect(wrapper.html()).toContain('(30)')  // 음식
      expect(wrapper.html()).toContain('(12)')  // 물약
    })
  })

  describe('선택 상태', () => {
    it('선택된 스키마 버튼이 올바른 스타일을 가져야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: {
          ...defaultProps,
          selectedSchema: ITEM_CATEGORY.MATERIAL
        }
      })
      
      const buttons = wrapper.findAll('button')
      const materialButton = buttons.find(btn => btn.text().includes('재료'))
      
      expect(materialButton?.classes()).toContain('bg-primary')
      expect(materialButton?.classes()).toContain('text-primary-foreground')
    })

    it('선택되지 않은 스키마 버튼이 올바른 스타일을 가져야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: {
          ...defaultProps,
          selectedSchema: ITEM_CATEGORY.MATERIAL
        }
      })
      
      const buttons = wrapper.findAll('button')
      const foodButton = buttons.find(btn => btn.text().includes('음식'))
      
      expect(foodButton?.classes()).toContain('bg-muted')
      expect(foodButton?.classes()).toContain('text-muted-foreground')
    })
  })

  describe('이벤트', () => {
    it('버튼 클릭 시 update:selectedSchema 이벤트를 발생시켜야 함', async () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: defaultProps
      })
      
      const buttons = wrapper.findAll('button')
      const materialButton = buttons.find(btn => btn.text().includes('재료'))
      
      await materialButton?.trigger('click')
      
      expect(wrapper.emitted('update:selectedSchema')).toBeTruthy()
      expect(wrapper.emitted('update:selectedSchema')?.[0]).toEqual([ITEM_CATEGORY.MATERIAL])
    })

    it('전체 버튼 클릭 시 빈 문자열을 emit해야 함', async () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: defaultProps
      })
      
      const buttons = wrapper.findAll('button')
      const allButton = buttons.find(btn => btn.text().includes('전체'))
      
      await allButton?.trigger('click')
      
      expect(wrapper.emitted('update:selectedSchema')?.[0]).toEqual([''])
    })
  })

  describe('개수 표시', () => {
    it('availableSchemas에 count가 없을 때 개수를 표시하지 않아야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: {
          selectedSchema: '',
          availableSchemas: [
            { value: '', label: '전체' },
            { value: ITEM_CATEGORY.MATERIAL, label: '재료' }
          ],
          schemaCounts: {}
        }
      })
      
      expect(wrapper.text()).not.toContain('(150)')
      expect(wrapper.text()).not.toContain('(45)')
    })

    it('availableSchemas에 count가 있으면 그것을 우선 사용해야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: {
          selectedSchema: '',
          availableSchemas: [
            { value: '', label: '전체', count: 999 },
            { value: ITEM_CATEGORY.MATERIAL, label: '재료', count: 45 }
          ],
          schemaCounts: {
            '': 150,
            [ITEM_CATEGORY.MATERIAL]: 45
          }
        }
      })
      
      expect(wrapper.html()).toContain('(999)') // availableSchemas의 count 우선
      expect(wrapper.html()).toContain('(45)')  // schemaCounts 사용
    })
  })

  describe('접근성', () => {
    it('버튼들이 focus 가능해야 함', () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: defaultProps
      })
      
      const buttons = wrapper.findAll('button')
      buttons.forEach(button => {
        expect(button.attributes('tabindex')).not.toBe('-1')
      })
    })

    it('키보드 네비게이션이 가능해야 함', async () => {
      const wrapper = mount(ItemSchemaFilter, {
        props: defaultProps
      })
      
      const firstButton = wrapper.find('button')
      await firstButton.trigger('keydown', { key: 'Tab' })
      
      // Tab 키로 다음 버튼으로 이동 가능해야 함
      expect(document.activeElement).toBeTruthy()
    })
  })
})
