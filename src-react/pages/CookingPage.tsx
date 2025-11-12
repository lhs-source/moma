import { useEffect, useMemo, useState } from 'react'

import { itemList } from '../lib/dataAccess'
import RecipeGrid from '../components/cooking/RecipeGrid'
import SelectedRecipeList from '../components/cooking/SelectedRecipeList'
import MaterialsSummary from '../components/cooking/MaterialsSummary'
import WeeklyBuyableGrid, { type WeeklyBuyableItem } from '../components/cooking/WeeklyBuyableGrid'
import WeeklyResetTimer from '../components/cooking/WeeklyResetTimer'
import CategoryTitle from '../components/ui/CategoryTitle'
import PageTitle from '../components/ui/PageTitle'
import SectionTitle from '../components/ui/SectionTitle'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/select/Select'
import { SelectContent } from '../components/ui/select/SelectContent'
import { SelectItem } from '../components/ui/select/SelectItem'
import { SelectTrigger } from '../components/ui/select/SelectTrigger'
import { SelectValue } from '../components/ui/select/SelectValue'
import { ITEM_CATEGORY } from '../../src/data/schemas/item'
import type { Recipe } from '../../src/data/schemas/recipe'
import { RECIPE_CATEGORY, type RecipeGroup } from '../../src/data/schemas/recipe'
import { recipes, recipesGrouped } from '../../src/data/recipes'

const COOKING_PLAN_STORAGE_KEY = 'moma-cooking-plan'

interface CookingPlanStorage {
  selectedCounts: Record<string, number>
  savedAt?: string
  planName?: string
}

function getItemName(itemId: string): string {
  const item = itemList.find((entry) => entry.id === itemId)
  return item?.name ?? itemId
}

function getItemImageUrl(itemId: string): string {
  const item = itemList.find((entry) => entry.id === itemId)
  return item?.imageUrl ?? '/images/items/default.webp'
}

function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.src = '/images/items/default.webp'
}

function getFacilityLevels(recipesFlat: Recipe[]): number[] {
  const levelSet = new Set<number>()
  recipesFlat.forEach((recipe) => {
    if (typeof recipe.facilityLevel === 'number') {
      levelSet.add(recipe.facilityLevel)
    }
  })
  return Array.from(levelSet).sort((a, b) => a - b)
}

function buildBuyableItems(allRecipes: Recipe[], groups: RecipeGroup[]): WeeklyBuyableItem[] {
  const buyableRecipes = allRecipes.filter((recipe) => recipe.category === RECIPE_CATEGORY.BUY)

  const itemBuyCounts = new Map<
    string,
    {
      itemId: string
      totalBuyableCount: number
      npcCounts: Map<string, number>
      recipes: Array<{ id: string; name: string; price: number; npcId: string }>
    }
  >()

  buyableRecipes.forEach((recipe) => {
    const goldRequirement = recipe.requiredItems.find((required) => required.itemId === 'gold' && required.buyNpcId)
    if (!goldRequirement?.buyNpcId) return

    const itemId = recipe.resultItemId
    const item = itemList.find((entry) => entry.id === itemId)

    if (!item) return

    const isIngredient =
      item.category === ITEM_CATEGORY.FOOD_INGREDIENT || item.category === ITEM_CATEGORY.MATERIAL || item.category === '재료'

    if (!isIngredient) return

    if (!itemBuyCounts.has(itemId)) {
      itemBuyCounts.set(itemId, {
        itemId,
        totalBuyableCount: 0,
        npcCounts: new Map(),
        recipes: [],
      })
    }

    const entry = itemBuyCounts.get(itemId)!

    if (!entry.npcCounts.has(goldRequirement.buyNpcId)) {
      entry.npcCounts.set(goldRequirement.buyNpcId, 30)
      entry.totalBuyableCount += 30
    }

    entry.recipes.push({
      id: recipe.id,
      name: recipe.name,
      price: goldRequirement.quantity,
      npcId: goldRequirement.buyNpcId,
    })
  })

  return Array.from(itemBuyCounts.values())
    .map((entry) => ({
      itemId: entry.itemId,
      totalBuyableCount: entry.totalBuyableCount,
      recipes: entry.recipes.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => getItemName(a.itemId).localeCompare(getItemName(b.itemId)))
}

export function CookingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFacilityLevel, setSelectedFacilityLevel] = useState('')
  const [selectedCounts, setSelectedCounts] = useState<Record<string, number>>({})

  const cookRecipesFlat = useMemo(
    () => recipes.filter((recipe) => recipe.category === RECIPE_CATEGORY.COOK),
    [],
  )

  const facilityLevels = useMemo(() => getFacilityLevels(cookRecipesFlat), [cookRecipesFlat])

  const filteredRecipes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return cookRecipesFlat.filter((recipe) => {
      const matchesName = !query || recipe.name.toLowerCase().includes(query) || recipe.id.toLowerCase().includes(query)
      const matchesLevel =
        !selectedFacilityLevel || recipe.facilityLevel?.toString() === selectedFacilityLevel
      return matchesName && matchesLevel
    })
  }, [cookRecipesFlat, searchQuery, selectedFacilityLevel])

  const selectedRecipes = useMemo(() => {
    const selectedIds = new Set(
      Object.entries(selectedCounts)
        .filter(([, count]) => count > 0)
        .map(([id]) => id),
    )
    if (selectedIds.size === 0) return []
    return cookRecipesFlat.filter((recipe) => selectedIds.has(recipe.id))
  }, [cookRecipesFlat, selectedCounts])

  const allBuyableFoodIngredients = useMemo(
    () => buildBuyableItems(recipes, recipesGrouped),
    [],
  )

  function saveCookingPlan() {
    try {
      const planData: CookingPlanStorage = {
        selectedCounts,
        savedAt: new Date().toISOString(),
        planName: 'My Cooking Plan',
      }
      window.localStorage.setItem(COOKING_PLAN_STORAGE_KEY, JSON.stringify(planData))
    } catch (error) {
      console.warn('Failed to save cooking plan:', error)
    }
  }

  function loadCookingPlan(): boolean {
    try {
      const saved = window.localStorage.getItem(COOKING_PLAN_STORAGE_KEY)
      if (!saved) return false
      const parsed = JSON.parse(saved) as CookingPlanStorage
      setSelectedCounts(parsed.selectedCounts ?? {})
      return true
    } catch (error) {
      console.warn('Failed to load cooking plan:', error)
      return false
    }
  }

  function resetCookingPlan() {
    setSelectedCounts({})
    try {
      window.localStorage.removeItem(COOKING_PLAN_STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to reset cooking plan:', error)
    }
  }

  function handleChangeCount(id: string, count: number) {
    setSelectedCounts((prev) => {
      const next = { ...prev }
      if (count <= 0) {
        delete next[id]
      } else {
        next[id] = count
      }
      return next
    })
  }

  function handleRemove(recipeId: string) {
    setSelectedCounts((prev) => {
      const next = { ...prev }
      delete next[recipeId]
      return next
    })
  }

  useEffect(() => {
    // Load saved plan on mount
    loadCookingPlan()
  }, [])

  useEffect(() => {
    // Auto-save when counts change
    saveCookingPlan()
  }, [selectedCounts])

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [])

  return (
    <div className="wrapper flex h-screen flex-col overflow-hidden bg-background">
      <div className="flex flex-shrink-0 flex-col gap-2 border-b border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <PageTitle size="sm">요리 시뮬레이팅</PageTitle>
        <div className="flex gap-1">
          <button
            type="button"
            className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-accent"
            onClick={saveCookingPlan}
          >
            저장
          </button>
          <button
            type="button"
            className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-accent"
            onClick={loadCookingPlan}
          >
            불러오기
          </button>
          <button
            type="button"
            className="rounded border border-border bg-destructive px-2 py-1 text-xs text-destructive-foreground hover:bg-destructive/90"
            onClick={resetCookingPlan}
          >
            초기화
          </button>
        </div>
      </div>

      <div className="main-container grid flex-1 grid-cols-1 gap-2 overflow-hidden p-2 lg:grid-cols-2">
        <div className="column-container flex flex-col overflow-hidden rounded border border-border bg-card shadow-sm">
          <div className="flex flex-shrink-0 items-center gap-2 border-b border-border bg-muted/50 p-2">
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="요리 이름 검색..."
              className="h-8 px-2 py-1 text-xs"
            />
            <Select value={selectedFacilityLevel} onValueChange={setSelectedFacilityLevel}>
              <SelectTrigger className="h-8 w-32 px-2 py-1 text-xs">
                <SelectValue>{selectedFacilityLevel ? `Lv.${selectedFacilityLevel}` : '모든 레벨'}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">모든 레벨</SelectItem>
                {facilityLevels.map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    Lv.{level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="scroll-container min-h-0 flex-1 overflow-y-auto p-2">
            <RecipeGrid
              recipes={filteredRecipes}
              selectedCounts={selectedCounts}
              getItemName={getItemName}
              getItemImageUrl={getItemImageUrl}
              handleImageError={handleImageError}
              onChangeCount={handleChangeCount}
            />
          </div>
        </div>

        <div className="column-container flex flex-col overflow-hidden rounded border border-border bg-card shadow-sm">
          <div className="flex flex-shrink-0 items-center border-b border-border bg-muted/50 p-2">
            <SectionTitle size="sm">필요 재료 및 비용</SectionTitle>
          </div>
          <div className="scroll-container min-h-0 flex-1 space-y-3 overflow-y-auto p-2">
            <WeeklyResetTimer />

            <div>
              <CategoryTitle size="xs" className="mb-1 text-muted-foreground">
                선택한 총 제작 요리 목록
              </CategoryTitle>
              <SelectedRecipeList
                recipes={selectedRecipes}
                selectedCounts={selectedCounts}
                getItemImageUrl={getItemImageUrl}
                handleImageError={handleImageError}
                onRemove={handleRemove}
              />
            </div>

            <MaterialsSummary
              selectedCounts={selectedCounts}
              recipesGrouped={recipesGrouped}
              items={itemList}
            />

            <WeeklyBuyableGrid
              items={allBuyableFoodIngredients}
              getItemName={getItemName}
              getItemImageUrl={getItemImageUrl}
              handleImageError={handleImageError}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookingPage


