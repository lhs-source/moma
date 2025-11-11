import { useMemo } from 'react'

import type { Recipe } from '../../../src/data/schemas/recipe'
import { formatTime } from '../../../src/utils/timeUtils'
import { getItemImageUrlById, getItemInfoById } from '../../../src/utils/itemUtils'
import {
  useCraftingStore,
  selectSelectedCategory,
  selectSelectedCategoryRecipes,
} from '../../stores/craftingStore'

export function ItemList() {
  const selectedCategory = useCraftingStore(selectSelectedCategory)
  const categoryRecipes = useCraftingStore(selectSelectedCategoryRecipes)
  const selectItem = useCraftingStore((state) => state.selectItem)

  const sortedRecipes = useMemo(
    () => [...categoryRecipes].sort((a, b) => a.name.localeCompare(b.name)),
    [categoryRecipes],
  )

  const handleAddItem = (recipe: Recipe) => {
    selectItem(recipe, 1)
  }

  if (!selectedCategory) {
    return (
      <div className="item-list flex min-w-[300px] flex-1 flex-col">
        <h2 className="mb-2 text-lg font-bold text-foreground">제작 항목</h2>
        <div className="flex-1 rounded border border-dashed border-border py-4 text-center text-sm text-muted-foreground">
          카테고리를 선택해주세요
        </div>
      </div>
    )
  }

  return (
    <div className="item-list flex min-w-[300px] flex-1 flex-col">
      <h2 className="mb-2 text-lg font-bold text-foreground">제작 항목</h2>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted">
            <tr className="border-border border-b">
              <th className="p-2 text-left font-semibold text-foreground">항목</th>
              <th className="w-16 p-2 text-center font-semibold text-foreground">생산량</th>
              <th className="w-20 p-2 text-center font-semibold text-foreground">시간</th>
              <th className="p-2 text-left font-semibold text-foreground">재료</th>
              <th className="w-16 p-2 text-center font-semibold text-foreground" />
            </tr>
          </thead>
          <tbody>
            {sortedRecipes.map((recipe) => (
              <tr key={recipe.id} className="border-border border-b transition-colors hover:bg-accent/50">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={getItemImageUrlById(recipe.resultItemId)}
                      alt={recipe.name}
                      className="h-8 w-8 rounded border border-border object-cover"
                    />
                    <span className="font-medium text-foreground">{recipe.name}</span>
                  </div>
                </td>
                <td className="p-2 text-center text-foreground">{recipe.resultQuantity ?? 1}개</td>
                <td className="p-2 text-center text-foreground">{formatTime(recipe.craftingTime ?? 0)}</td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-1">
                    {recipe.requiredItems.map((requiredItem) => {
                      const info = getItemInfoById(requiredItem.itemId)
                      return (
                        <span
                          key={`${recipe.id}-${requiredItem.itemId}`}
                          className="inline-flex items-center gap-1 text-xs"
                        >
                          <img
                            src={info.imageUrl}
                            alt={info.name}
                            className="h-4 w-4 rounded object-cover"
                          />
                          <span className="text-foreground">
                            {info.name}:{requiredItem.quantity}
                          </span>
                        </span>
                      )
                    })}
                  </div>
                </td>
                <td className="p-2 text-center">
                  <button
                    type="button"
                    className="rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-blue-700 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => handleAddItem(recipe)}
                    title="제작 목록에 추가"
                  >
                    추가
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ItemList

