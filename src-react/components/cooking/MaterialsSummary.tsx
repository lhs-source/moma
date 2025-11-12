import { useMemo } from 'react'

import type { Item } from '../../../src/data/schemas/item'
import type { Recipe, RecipeGroup } from '../../../src/data/schemas/recipe'
import { RECIPE_CATEGORY } from '../../../src/data/schemas/recipe'

export interface MaterialsSummaryProps {
  selectedCounts: Record<string, number>
  recipesGrouped: RecipeGroup[]
  items: Item[]
}

interface NeededRow {
  itemId: string
  quantity: number
}

function findRecipeById(groups: RecipeGroup[], id: string): Recipe | undefined {
  for (const group of groups) {
    const found = group.recipeList.find((recipe) => recipe.id === id)
    if (found) {
      return found
    }
  }
  return undefined
}

function formatGold(value: number): string {
  return `${value.toLocaleString()}G`
}

export function MaterialsSummary({ selectedCounts, recipesGrouped, items }: MaterialsSummaryProps) {
  const itemMap = useMemo(() => {
    const map = new Map<string, Item>()
    items.forEach((item) => map.set(item.id, item))
    return map
  }, [items])

  const processRecipeMap = useMemo(() => {
    const map = new Map<string, Recipe>()
    recipesGrouped.forEach((group) => {
      group.recipeList.forEach((recipe) => {
        if (
          recipe.category === RECIPE_CATEGORY.COOK ||
          recipe.category === RECIPE_CATEGORY.PROCESS ||
          recipe.category === RECIPE_CATEGORY.PROCESS_FOOD ||
          recipe.category === RECIPE_CATEGORY.PROCESS_METAL ||
          recipe.category === RECIPE_CATEGORY.PROCESS_WOOD ||
          recipe.category === RECIPE_CATEGORY.PROCESS_LEATHER ||
          recipe.category === RECIPE_CATEGORY.PROCESS_FABRIC ||
          recipe.category === RECIPE_CATEGORY.PROCESS_MEDICINE
        ) {
          if (!map.has(recipe.resultItemId)) {
            map.set(recipe.resultItemId, recipe)
          }
        }
      })
    })
    return map
  }, [recipesGrouped])

  const totalNeeded = useMemo(() => {
    const accumulator: Record<string, number> = {}
    Object.entries(selectedCounts).forEach(([recipeId, count]) => {
      if (!count) return
      const recipe = findRecipeById(recipesGrouped, recipeId)
      if (!recipe) return
      recipe.requiredItems.forEach((required) => {
        accumulator[required.itemId] = (accumulator[required.itemId] || 0) + required.quantity * count
      })
    })
    return accumulator
  }, [recipesGrouped, selectedCounts])

  const totalNeededRows: NeededRow[] = useMemo(
    () =>
      Object.entries(totalNeeded)
        .map(([itemId, quantity]) => ({ itemId, quantity }))
        .sort((a, b) => (itemMap.get(a.itemId)?.name ?? '').localeCompare(itemMap.get(b.itemId)?.name ?? '')),
    [itemMap, totalNeeded],
  )

  const totalRawMaterials = useMemo(() => {
    const accumulator: Record<string, number> = {}

    Object.entries(totalNeeded).forEach(([itemId, quantity]) => {
      if (!processRecipeMap.has(itemId)) {
        accumulator[itemId] = (accumulator[itemId] || 0) + quantity
      }
    })

    Object.entries(totalNeeded).forEach(([itemId, quantity]) => {
      const recipe = processRecipeMap.get(itemId)
      if (!recipe) return

      const resultQuantity = recipe.resultQuantity && recipe.resultQuantity > 0 ? recipe.resultQuantity : 1
      const actions = Math.ceil(quantity / resultQuantity)

      recipe.requiredItems.forEach((required) => {
        if (!processRecipeMap.has(required.itemId)) {
          accumulator[required.itemId] = (accumulator[required.itemId] || 0) + required.quantity * actions
        }
      })
    })

    return accumulator
  }, [processRecipeMap, totalNeeded])

  const totalRawMaterialsRows: NeededRow[] = useMemo(
    () =>
      Object.entries(totalRawMaterials)
        .map(([itemId, quantity]) => ({ itemId, quantity }))
        .sort((a, b) => (itemMap.get(a.itemId)?.name ?? '').localeCompare(itemMap.get(b.itemId)?.name ?? '')),
    [itemMap, totalRawMaterials],
  )

  function getItemName(itemId: string): string {
    return itemMap.get(itemId)?.name ?? itemId
  }

  function getItemImageUrl(itemId: string): string {
    return itemMap.get(itemId)?.imageUrl ?? '/images/items/default.webp'
  }

  function getProcessedRecipe(itemId: string): Recipe | undefined {
    return processRecipeMap.get(itemId)
  }

  function getMinBuyPrice(itemId: string): number | null {
    const prices: number[] = []
    recipesGrouped.forEach((group) => {
      group.recipeList.forEach((recipe) => {
        if (recipe.resultItemId !== itemId || recipe.category !== RECIPE_CATEGORY.BUY) return
        const gold = recipe.requiredItems.find((required) => required.itemId === 'gold')
        if (gold) {
          prices.push(gold.quantity)
        }
      })
    })
    if (prices.length === 0) return null
    return Math.min(...prices)
  }

  function getBuyableCount(itemId: string): number {
    const npcSet = new Set<string>()
    recipesGrouped.forEach((group) => {
      group.recipeList.forEach((recipe) => {
        if (recipe.resultItemId !== itemId || recipe.category !== RECIPE_CATEGORY.BUY) return
        const gold = recipe.requiredItems.find(
          (required) => required.itemId === 'gold' && required.buyNpcId,
        )
        if (gold?.buyNpcId) {
          npcSet.add(gold.buyNpcId)
        }
      })
    })
    return npcSet.size * 30
  }

  const totalRawMaterialsGold = useMemo(() => {
    let sum = 0
    Object.entries(totalRawMaterials).forEach(([itemId, quantity]) => {
      const price = getMinBuyPrice(itemId)
      if (price !== null) {
        sum += price * quantity
      }
    })
    return sum
  }, [totalRawMaterials])

  const totalGoldCombined = useMemo(() => {
    let sum = 0
    Object.entries(totalNeeded).forEach(([itemId, quantity]) => {
      const price = getMinBuyPrice(itemId)
      if (price !== null) {
        sum += price * quantity
      }
    })
    return sum
  }, [totalNeeded])

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/images/items/default.webp'
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-foreground">총 필요 재료</h3>
      <div className="space-y-1">
        {totalNeededRows.map((row) => (
          <div key={`direct-${row.itemId}`} className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <img
                src={getItemImageUrl(row.itemId)}
                alt={getItemName(row.itemId)}
                className="h-5 w-5 rounded object-cover"
                onError={handleImageError}
              />
              <span className="truncate text-foreground">{getItemName(row.itemId)}</span>
              <span className="ml-auto text-foreground">x{row.quantity}</span>
              {getBuyableCount(row.itemId) > 0 ? (
                <span
                  className={[
                    'ml-2 text-xs whitespace-nowrap',
                    row.quantity > getBuyableCount(row.itemId)
                      ? 'rounded border border-red-300 bg-red-100 px-1 font-semibold text-red-600'
                      : 'text-muted-foreground',
                  ].join(' ')}
                >
                  ({row.quantity}/{getBuyableCount(row.itemId)})
                  {row.quantity > getBuyableCount(row.itemId) ? <span className="ml-1 text-red-600">⚠️</span> : null}
                </span>
              ) : null}
              {getMinBuyPrice(row.itemId) !== null ? (
                <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">
                  개당 {formatGold(getMinBuyPrice(row.itemId)!)} · 합계{' '}
                  {formatGold(getMinBuyPrice(row.itemId)! * row.quantity)}
                </span>
              ) : null}
            </div>
            {getProcessedRecipe(row.itemId) ? (
              <div className="ml-7 space-y-1">
                {getProcessedRecipe(row.itemId)!.requiredItems.map((ingredient) => {
                  const recipe = getProcessedRecipe(row.itemId)!
                  const resultQuantity = recipe.resultQuantity && recipe.resultQuantity > 0 ? recipe.resultQuantity : 1
                  const actions = Math.ceil(row.quantity / resultQuantity)
                  const needed = ingredient.quantity * actions
                  return (
                    <div key={ingredient.itemId} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <img
                        src={getItemImageUrl(ingredient.itemId)}
                        alt={getItemName(ingredient.itemId)}
                        className="h-4 w-4 rounded object-cover"
                        onError={handleImageError}
                      />
                      <span className="truncate">{getItemName(ingredient.itemId)}</span>
                      <span className="ml-auto">x{needed}</span>
                      {getMinBuyPrice(ingredient.itemId) !== null ? (
                        <span className="ml-2 whitespace-nowrap text-muted-foreground">
                          개당 {formatGold(getMinBuyPrice(ingredient.itemId)!)} · 합계{' '}
                          {formatGold(getMinBuyPrice(ingredient.itemId)! * needed)}
                        </span>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        ))}

        {totalRawMaterialsRows.length > 0 ? (
          <div className="mt-2 border-t border-border pt-2">
            <div className="mb-1 text-xs text-muted-foreground">총 필요 식재료</div>
            {totalRawMaterialsRows.map((row) => (
              <div key={`raw-${row.itemId}`} className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={getItemImageUrl(row.itemId)}
                    alt={getItemName(row.itemId)}
                    className="h-5 w-5 rounded object-cover"
                    onError={handleImageError}
                  />
                  <span className="truncate text-foreground">{getItemName(row.itemId)}</span>
                  <span className="ml-auto font-semibold text-foreground">x{row.quantity}</span>
                  {getBuyableCount(row.itemId) > 0 ? (
                    <span
                      className={[
                        'ml-2 text-xs whitespace-nowrap',
                        row.quantity > getBuyableCount(row.itemId)
                          ? 'font-semibold text-destructive'
                          : 'text-muted-foreground',
                      ].join(' ')}
                    >
                      ({row.quantity}/{getBuyableCount(row.itemId)})
                    </span>
                  ) : null}
                  {getMinBuyPrice(row.itemId) !== null ? (
                    <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">
                      개당 {formatGold(getMinBuyPrice(row.itemId)!)} · 합계{' '}
                      {formatGold(getMinBuyPrice(row.itemId)! * row.quantity)}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-end gap-2 border-t border-border pt-2 text-sm">
              <span className="text-foreground">총 골드 (식재료)</span>
              <span className="font-semibold text-foreground">{formatGold(totalRawMaterialsGold)}</span>
            </div>
          </div>
        ) : null}

        <div className="mt-2 flex items-center justify-end gap-2 border-t border-border pt-2 text-sm">
          <span className="text-foreground">총 골드</span>
          <span className="font-semibold text-foreground">{formatGold(totalGoldCombined)}</span>
        </div>
      </div>
    </div>
  )
}

export default MaterialsSummary


