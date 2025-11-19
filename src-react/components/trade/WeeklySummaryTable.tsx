import { useMemo } from 'react'

import type { Recipe } from '../../../src/data/schemas/recipe'
import { RECIPE_CATEGORY } from '../../../src/data/schemas/recipe'
import type { WeeklyTrade } from '../../lib/tradeCalculations'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import CardContent from '../ui/CardContent'
import CardHeader from '../ui/CardHeader'
import CardTitle from '../ui/CardTitle'
import { getItemById } from '../../lib/dataAccess'

function calculateRecipeMaterials(
  recipe: Recipe,
  quantity: number,
  recipes: Recipe[],
  visited: Set<string> = new Set(),
): Record<string, number> {
  const result: Record<string, number> = {}
  const recipeKey = recipe.resultItemId

  if (visited.has(recipeKey)) {
    return result
  }

  const nextVisited = new Set(visited)
  nextVisited.add(recipeKey)

  recipe.requiredItems.forEach((required) => {
    const nestedRecipe = recipes.find((candidate) => candidate.resultItemId === required.itemId)

    if (!nestedRecipe || nestedRecipe.category === RECIPE_CATEGORY.BUY) {
      result[required.itemId] = (result[required.itemId] || 0) + required.quantity * quantity
    } else {
      const nestedMaterials = calculateRecipeMaterials(
        nestedRecipe,
        required.quantity * quantity,
        recipes,
        nextVisited,
      )
      Object.entries(nestedMaterials).forEach(([itemId, qty]) => {
        result[itemId] = (result[itemId] || 0) + qty
      })
    }
  })

  return result
}

interface WeeklySummaryTableProps {
  weeklyRequirements: WeeklyTrade
  recipes: Recipe[]
}

interface TableRow {
  needItemId: string
  needItemName: string
  needItemQuantity: number
  resultItems: { itemId: string; itemName: string; quantity: number }[]
  recipePath: string
  recipeCategory?: Recipe['category']
}

export function WeeklySummaryTable({ weeklyRequirements, recipes }: WeeklySummaryTableProps) {
  const totalMaterials = useMemo(() => {
    const materials: Record<string, number> = {}

    Object.values(weeklyRequirements).forEach((requirement) => {
      if (requirement.trade) {
        const recipeMaterials = calculateRecipeMaterials(requirement.trade, requirement.totalNeedItemCount, recipes)
        Object.entries(recipeMaterials).forEach(([itemId, quantity]) => {
          materials[itemId] = (materials[itemId] || 0) + quantity
        })
      } else if (requirement.recipe) {
        const recipeMaterials = calculateRecipeMaterials(requirement.recipe, requirement.totalNeedItemCount, recipes)
        Object.entries(recipeMaterials).forEach(([itemId, quantity]) => {
          materials[itemId] = (materials[itemId] || 0) + quantity
        })
      } else {
        materials[requirement.itemId] = (materials[requirement.itemId] || 0) + requirement.totalNeedItemCount
      }
    })

    return materials
  }, [weeklyRequirements, recipes])

  const tableData = useMemo<TableRow[]>(() => {
    const rows: TableRow[] = []

    Object.values(weeklyRequirements).forEach((requirement) => {
      const needItem = getItemById(requirement.itemId)
      if (!needItem) return

      const resultItems = requirement.trades.map((trade) => {
        const resultItem = getItemById(trade.resultItemId)
        return {
          itemId: trade.resultItemId,
          itemName: resultItem?.name ?? trade.resultItemId,
          quantity: trade.receiveItemQuantity,
        }
      })

      let recipePath = ''
      let recipeCategory: Recipe['category'] | undefined

      const sourceRecipe = requirement.recipe ?? requirement.trade

      if (sourceRecipe) {
        recipePath = sourceRecipe.requiredItems
          .map((item) => `${getItemById(item.itemId)?.name ?? item.itemId} x${item.quantity}`)
          .join(', ')
        recipeCategory = sourceRecipe.category
      }

      rows.push({
        needItemId: requirement.itemId,
        needItemName: needItem.name,
        needItemQuantity: requirement.totalNeedItemCount,
        resultItems,
        recipePath,
        recipeCategory,
      })
    })

    Object.entries(totalMaterials).forEach(([itemId, quantity]) => {
      if (rows.some((row) => row.needItemId === itemId)) return

      const recipe = recipes.find((candidate) => candidate.resultItemId === itemId)
      if (recipe && recipe.category === RECIPE_CATEGORY.BUY) return

      const needItem = getItemById(itemId)
      if (!needItem) return

      let recipePath = ''
      let recipeCategory: Recipe['category'] | undefined

      if (recipe) {
        recipePath = recipe.requiredItems
          .map((item) => `${getItemById(item.itemId)?.name ?? item.itemId} x${item.quantity}`)
          .join(', ')
        recipeCategory = recipe.category
      }

      rows.push({
        needItemId: itemId,
        needItemName: needItem.name,
        needItemQuantity: quantity,
        resultItems: [],
        recipePath,
        recipeCategory,
      })
    })

    return rows.sort((a, b) => b.needItemQuantity - a.needItemQuantity)
  }, [weeklyRequirements, recipes, totalMaterials])

  return (
    <Card>
      <CardHeader>
        <CardTitle>주간 필요 아이템 요약</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="border-b p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  필요한 아이템
                </th>
                <th className="border-b p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  수량
                </th>
                <th className="border-b p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  결과 아이템
                </th>
                <th className="border-b p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  경로
                </th>
                <th className="border-b p-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  카테고리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tableData.map((row, rowIndex) => {
                const needItem = getItemById(row.needItemId)
                return (
                  <tr
                    key={`${row.needItemId}-${rowIndex}`}
                    className="transition-colors hover:bg-accent/50"
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={needItem?.imageUrl}
                          alt={row.needItemName}
                          className="h-6 w-6 object-contain"
                        />
                        <span className="font-medium">{row.needItemName}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className="font-semibold text-foreground">{row.needItemQuantity}</span>
                    </td>
                    <td className="p-2">
                      {row.resultItems.length > 0 ? (
                        <div className="space-y-1">
                          {row.resultItems.map((result, resultIndex) => {
                            const resultItem = getItemById(result.itemId)
                            return (
                              <div
                                key={`${result.itemId}-${resultIndex}`}
                                className="flex items-center gap-2"
                              >
                                <img
                                  src={resultItem?.imageUrl}
                                  alt={result.itemName}
                                  className="h-5 w-5 object-contain"
                                />
                                <span className="text-xs">
                                  {result.itemName} ({result.quantity}개)
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-2">
                      {row.recipePath ? (
                        <span className="text-xs text-muted-foreground">{row.recipePath}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-2">
                      {row.recipeCategory ? (
                        <Badge
                          variant="secondary"
                          className={
                            row.recipeCategory === RECIPE_CATEGORY.COOK
                              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                              : row.recipeCategory.includes('가공')
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                              : row.recipeCategory.includes('제작')
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                              : row.recipeCategory === RECIPE_CATEGORY.GATHER
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                              : ''
                          }
                        >
                          {row.recipeCategory}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {tableData.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">활성화된 교환 아이템이 없습니다.</div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default WeeklySummaryTable

