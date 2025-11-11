import { getItemImageUrlById } from '../../../src/utils/itemUtils'
import type { Recipe } from '../../../src/data/schemas/recipe'
import {
  useCraftingStore,
  selectHasSelectedItems,
  selectSelectedItemsByCategory,
} from '../../stores/craftingStore'

function getTotalQuantity(selectedItem: { recipe: Recipe; quantity: number }) {
  return selectedItem.quantity * (selectedItem.recipe.resultQuantity ?? 1)
}

export function SelectedItems() {
  const selectedItemsByCategory = useCraftingStore(selectSelectedItemsByCategory)
  const hasSelectedItems = useCraftingStore(selectHasSelectedItems)
  const selectItem = useCraftingStore((state) => state.selectItem)
  const removeItem = useCraftingStore((state) => state.removeItem)
  const clearCategory = useCraftingStore((state) => state.clearCategory)
  const clearSelectedItems = useCraftingStore((state) => state.clearSelectedItems)

  if (!hasSelectedItems) {
    return (
      <div className="selected-items min-w-[300px] w-full">
        <h2 className="mb-2 text-lg font-bold text-foreground">선택된 항목</h2>
        <div className="rounded border border-dashed border-border py-4 text-center text-sm text-muted-foreground">
          선택된 항목이 없습니다
        </div>
      </div>
    )
  }

  return (
    <div className="selected-items min-w-[300px] w-full">
      <h2 className="mb-2 text-lg font-bold text-foreground">선택된 항목</h2>
      <div className="max-h-[320px] overflow-y-auto">
        {Object.entries(selectedItemsByCategory).map(([category, items]) => (
          <div key={category} className="mb-3">
            <div className="mb-1 flex items-center justify-between px-2">
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <button
                type="button"
                className="rounded border border-red-300 bg-red-100 px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:border-red-400 hover:bg-red-200 hover:text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-300"
                onClick={() => clearCategory(category)}
                title="이 카테고리의 모든 항목 삭제"
              >
                모두 삭제
              </button>
            </div>
            <table className="mb-2 w-full border-collapse text-xs">
              <thead className="bg-muted">
                <tr className="border-border border-b">
                  <th className="p-1 text-left font-semibold text-foreground">항목</th>
                  <th className="w-16 p-1 text-center font-semibold text-foreground">횟수</th>
                  <th className="w-16 p-1 text-center font-semibold text-foreground">생산량</th>
                  <th className="w-24 p-1 text-center font-semibold text-foreground">작업</th>
                </tr>
              </thead>
              <tbody>
                {items.map((selectedItem) => (
                  <tr key={selectedItem.recipe.id} className="border-border border-b hover:bg-accent/50">
                    <td className="p-1">
                      <div className="flex items-center gap-1">
                        <img
                          src={getItemImageUrlById(selectedItem.recipe.resultItemId)}
                          alt={selectedItem.recipe.name}
                          className="h-6 w-6 rounded border border-border object-cover"
                        />
                        <span className="font-medium text-foreground">{selectedItem.recipe.name}</span>
                      </div>
                    </td>
                    <td className="p-1 text-center text-foreground">{selectedItem.quantity}회</td>
                    <td className="p-1 text-center text-foreground">{getTotalQuantity(selectedItem)}개</td>
                    <td className="p-1">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-gray-200 font-bold text-gray-700 transition-colors hover:border-blue-400 hover:bg-blue-200 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                          onClick={() => selectItem(selectedItem.recipe, -1)}
                          title="횟수 감소"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-gray-200 font-bold text-gray-700 transition-colors hover:border-blue-400 hover:bg-blue-200 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                          onClick={() => selectItem(selectedItem.recipe, 1)}
                          title="횟수 증가"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded border border-red-300 bg-red-100 font-bold text-red-600 transition-colors hover:border-red-400 hover:bg-red-200 hover:text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:border-red-700 dark:hover:bg-red-900 dark:hover:text-red-300"
                          onClick={() => removeItem(selectedItem.recipe.id)}
                          title="항목 삭제"
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 w-full rounded border border-red-600 bg-red-600 py-2 text-sm font-semibold text-white transition-colors hover:border-red-700 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
        onClick={() => clearSelectedItems()}
        title="모든 선택 항목 초기화"
      >
        선택 초기화
      </button>
    </div>
  )
}

export default SelectedItems

