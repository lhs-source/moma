import { useMemo } from 'react'

import type { EnrichedItem } from '../../../src/data/schemas/enrichedItem'
import { itemUsageIndex } from '../../../src/utils/itemUsageIndex'
import { formatTime } from '../../../src/utils/timeUtils'

export interface ItemRowProps {
  item: EnrichedItem
}

function getUsageBadgeClass(usageType: string) {
  switch (usageType) {
    case '레시피':
      return 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
    case '교환':
      return 'bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-blue-100'
    case '구매':
      return 'bg-emerald-100 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100'
    case '제작':
      return 'bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100'
    case '교환으로 얻을 수 있음':
      return 'bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-100'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function ItemRow({ item }: ItemRowProps) {
  const itemUsage = useMemo(() => itemUsageIndex.getItemUsage(item.id), [item.id])
  const usageTypes = useMemo(() => item.usageTypes, [item.usageTypes])

  const obtainableTrades = item.obtainableFromTrades
  const craftableRecipes = useMemo(
    () => [...item.cookingRecipes, ...item.processingRecipes, ...item.craftingRecipes],
    [item.cookingRecipes, item.processingRecipes, item.craftingRecipes],
  )

  return (
    <tr className="transition-colors hover:bg-muted/30">
      <td className="px-4 py-3 align-top">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-16 min-w-16 w-16 rounded object-cover"
          onError={(event) => {
            const target = event.currentTarget
            target.src = '/images/items/default.webp'
          }}
        />
      </td>
      <td className="px-4 py-3 align-top">
        {item.category ? <div className="mb-1 text-xs text-muted-foreground">{item.category}</div> : null}
        <div className="text-base font-bold text-foreground">{item.name}</div>
        <div className="mt-1 text-xs text-muted-foreground">ID: {item.id}</div>

        <div className="mt-2 flex flex-wrap gap-1">
          {usageTypes.map((usageType) => (
            <span
              key={usageType}
              className={[
                'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
                getUsageBadgeClass(usageType),
              ].join(' ')}
            >
              {usageType}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 align-top">
        <div className="space-y-2 text-sm">
          {itemUsage?.usageTypes.recipes.length ? (
            <div className="rounded bg-slate-50 p-2 dark:bg-slate-800">
              <div className="mb-1 text-xs font-semibold text-slate-900 dark:text-slate-200">재료로 사용되는 레시피</div>
              {itemUsage.usageTypes.recipes.map((recipeUsage) => (
                <div key={recipeUsage.recipeId} className="py-0.5 text-xs">
                  • {recipeUsage.resultItemName} x{recipeUsage.resultQuantity} ({recipeUsage.quantity}개 필요)
                </div>
              ))}
            </div>
          ) : null}

          {itemUsage?.usageTypes.trades.length ? (
            <div className="rounded bg-blue-50 p-2 dark:bg-blue-900">
              <div className="mb-1 text-xs font-semibold text-blue-900 dark:text-blue-200">교환에 사용</div>
              {itemUsage.usageTypes.trades.map((tradeUsage) => (
                <div key={tradeUsage.tradeId} className="py-0.5 text-xs">
                  • {tradeUsage.npcName} ({tradeUsage.locationName}) → {tradeUsage.receiveItemName} x
                  {tradeUsage.receiveQuantity} ({tradeUsage.giveQuantity}개 필요)
                </div>
              ))}
            </div>
          ) : null}

          {obtainableTrades.length ? (
            <div className="rounded bg-green-50 p-2 dark:bg-green-900">
              <div className="mb-1 text-xs font-semibold text-green-900 dark:text-green-200">교환으로 얻을 수 있음</div>
              {obtainableTrades.map((trade) => (
                <div key={trade.id} className="py-0.5 text-xs">
                  • {trade.npcName} ({trade.locationName}) - {trade.giveItemName} x{trade.giveQuantity} →{' '}
                  {trade.receiveQuantity}개 획득
                </div>
              ))}
            </div>
          ) : null}

          {craftableRecipes.length ? (
            <div className="rounded bg-yellow-50 p-2 dark:bg-yellow-900">
              <div className="mb-1 text-xs font-semibold text-yellow-900 dark:text-yellow-200">제작 가능</div>
              {craftableRecipes.map((recipe) => (
                <div key={recipe.id} className="py-0.5 text-xs">
                  • {recipe.name} ({recipe.category})
                  {recipe.craftingTime ? <span> - ⏱️ {formatTime(recipe.craftingTime)}</span> : null}
                </div>
              ))}
            </div>
          ) : null}

          {!itemUsage?.usageTypes.recipes.length &&
          !itemUsage?.usageTypes.trades.length &&
          !obtainableTrades.length &&
          !craftableRecipes.length ? (
            <div className="text-xs text-muted-foreground">사용처 정보 없음</div>
          ) : null}
        </div>
      </td>
    </tr>
  )
}

export default ItemRow


