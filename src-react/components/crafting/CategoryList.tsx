import { useMemo } from 'react'

import CategoryTitle from '../ui/CategoryTitle'
import {
  useCraftingStore,
  selectActiveTab,
  selectCategories,
  selectSelectedCategory,
} from '../../stores/craftingStore'

export function CategoryList() {
  const categories = useCraftingStore(selectCategories)
  const selectedCategory = useCraftingStore(selectSelectedCategory)
  const activeTab = useCraftingStore(selectActiveTab)
  const setSelectedCategory = useCraftingStore((state) => state.setSelectedCategory)

  const categoryTitle = useMemo(
    () => (activeTab === 'crafting' ? '제작 계열' : '재료 가공'),
    [activeTab],
  )

  return (
    <div className="category-list min-w-[150px] w-full">
      <CategoryTitle size="md" className="mb-2">
        {categoryTitle}
      </CategoryTitle>
      <div className="grid max-h-48 grid-cols-2 gap-1 overflow-y-auto">
        {categories.map((category) => {
          const isSelected = selectedCategory === category
          return (
            <button
              key={category}
              type="button"
              className={[
                'category-item rounded border p-2 text-sm font-medium transition-colors',
                isSelected
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  : 'border-border bg-background hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300',
              ].join(' ')}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryList

