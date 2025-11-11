import { useMemo } from 'react'

import { formatTime } from '../../../src/utils/timeUtils'
import { getItemImageUrlById, getItemInfoById } from '../../../src/utils/itemUtils'
import {
  useCraftingStore,
  selectCategoryTimes,
  selectHasSelectedItems,
  selectIsMembershipEnabled,
  selectSelectedItemsByCategory,
  selectTotalMaterials,
  selectTotalTime,
} from '../../stores/craftingStore'

export function CraftingResults() {
  const totalMaterials = useCraftingStore(selectTotalMaterials)
  const categoryTimes = useCraftingStore(selectCategoryTimes)
  const isMembershipEnabled = useCraftingStore(selectIsMembershipEnabled)
  const totalTime = useCraftingStore(selectTotalTime)
  const hasSelectedItems = useCraftingStore(selectHasSelectedItems)
  const selectedItemsByCategory = useCraftingStore(selectSelectedItemsByCategory)

  const filteredCategoryTimes = useMemo(() => {
    const result: Record<string, number> = {}
    Object.entries(categoryTimes).forEach(([category, time]) => {
      if (time > 0) {
        result[category] = time
      }
    })
    return result
  }, [categoryTimes])

  return (
    <div className="crafting-results rounded-lg border border-border bg-card p-3">
      <h2 className="mb-2 text-lg font-bold text-foreground">제작 결과</h2>
      <div className="space-y-3">
        <div className="materials">
          <h3 className="mb-1 text-sm font-semibold text-foreground">필요 재료</h3>
          {Object.keys(totalMaterials).length > 0 ? (
            <>
              <div className="mb-2 rounded bg-accent/50 p-2 text-xs">
                <div className="mb-1 font-medium text-foreground">제작 횟수 정보</div>
                <div className="space-y-1">
                  {Object.entries(selectedItemsByCategory).map(([category, items]) => (
                    <div key={category}>
                      <div className="font-medium text-foreground">{category}</div>
                      {items.map((selectedItem) => (
                        <div
                          key={selectedItem.recipe.id}
                          className="ml-2 flex items-center gap-1 text-muted-foreground"
                        >
                          <img
                            src={getItemImageUrlById(selectedItem.recipe.resultItemId)}
                            alt={selectedItem.recipe.name}
                            className="h-3 w-3 rounded object-cover"
                          />
                          <span>
                            {selectedItem.recipe.name}: {selectedItem.quantity}회 (
                            {selectedItem.quantity * (selectedItem.recipe.resultQuantity ?? 1)}개)
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <table className="w-full border-collapse text-xs">
                <thead className="bg-muted">
                  <tr className="border-border border-b">
                    <th className="p-1 text-left font-semibold text-foreground">재료</th>
                    <th className="w-16 p-1 text-right font-semibold text-foreground">수량</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(totalMaterials).map(([material, amount]) => {
                    const info = getItemInfoById(material)
                    return (
                      <tr key={material} className="border-border border-b hover:bg-accent/50">
                        <td className="p-1">
                          <div className="flex items-center gap-1">
                            <img src={info.imageUrl} alt={info.name} className="h-5 w-5 rounded object-cover" />
                            <span className="font-medium text-foreground">{info.name}</span>
                          </div>
                        </td>
                        <td className="p-1 text-right text-foreground">{amount}개</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <div className="rounded border border-dashed border-border py-3 text-center text-xs text-muted-foreground">
              선택된 항목이 없습니다
            </div>
          )}
        </div>

        <div className="crafting-time">
          <h3 className="mb-1 text-sm font-semibold text-foreground">제작 시간</h3>
          {hasSelectedItems ? (
            <>
              <table className="mb-2 w-full border-collapse text-xs">
                <thead className="bg-muted">
                  <tr className="border-border border-b">
                    <th className="p-1 text-left font-semibold text-foreground">카테고리</th>
                    <th className="w-20 p-1 text-right font-semibold text-foreground">시간</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(filteredCategoryTimes).map(([category, time]) => (
                    <tr key={category} className="border-border border-b hover:bg-accent/50">
                      <td className="p-1 font-medium text-foreground">{category}</td>
                      <td className="p-1 text-right text-foreground">{formatTime(time)}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent/50 font-semibold">
                    <td className="p-1 text-foreground">총 제작 시간</td>
                    <td className="p-1 text-right text-foreground">{formatTime(totalTime)}</td>
                  </tr>
                </tbody>
              </table>
              {isMembershipEnabled ? (
                <div className="flex items-center gap-1 rounded bg-accent/30 p-1.5 text-xs text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>멤버십 혜택 적용 (제작 시간 50% 단축)</span>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded border border-dashed border-border py-3 text-center text-xs text-muted-foreground">
              선택된 항목이 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CraftingResults

