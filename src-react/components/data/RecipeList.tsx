import { useEffect, useMemo, useState } from 'react'

import { getItemById } from '../../lib/dataAccess'
import { formatTime } from '../../../src/utils/timeUtils'
import { useRecipeDataStore } from '../../stores/recipeDataStore'
import Input from '../ui/Input'
import { Select } from '../ui/select/Select'
import { SelectContent } from '../ui/select/SelectContent'
import { SelectItem } from '../ui/select/SelectItem'
import { SelectTrigger } from '../ui/select/SelectTrigger'
import { SelectValue } from '../ui/select/SelectValue'

function getItemName(itemId: string) {
  return getItemById(itemId)?.name ?? itemId
}

function getItemImageUrl(itemId: string) {
  return getItemById(itemId)?.imageUrl ?? '/images/items/default.webp'
}

function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.src = '/images/items/default.webp'
}

export function RecipeList() {
  const initialize = useRecipeDataStore((state) => state.initialize)
  const categories = useRecipeDataStore((state) => state.categories)
  const facilityLevels = useRecipeDataStore((state) => state.facilityLevels)
  const getFilteredRecipes = useRecipeDataStore((state) => state.getFilteredRecipes)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFacilityLevel, setSelectedFacilityLevel] = useState('')

  useEffect(() => {
    initialize()
  }, [initialize])

  const filteredRecipes = useMemo(
    () =>
      getFilteredRecipes({
        searchQuery,
        category: selectedCategory || undefined,
        facilityLevel: selectedFacilityLevel || undefined,
      }),
    [getFilteredRecipes, searchQuery, selectedCategory, selectedFacilityLevel],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          type="text"
          placeholder="레시피 이름 또는 ID로 검색..."
        />

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue>{selectedCategory || '모든 카테고리'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">모든 카테고리</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedFacilityLevel} onValueChange={setSelectedFacilityLevel}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue>
              {selectedFacilityLevel ? `Lv.${selectedFacilityLevel}` : '모든 레벨'}
            </SelectValue>
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

      <div className="text-sm text-muted-foreground">총 {filteredRecipes.length}개의 레시피</div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredRecipes.map((recipe) => {
          const resultItem = getItemById(recipe.resultItemId)
          return (
            <div
              key={recipe.id}
              className="rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <img
                  src={getItemImageUrl(recipe.resultItemId)}
                  alt={recipe.name}
                  className="h-16 w-16 flex-shrink-0 rounded object-cover"
                  onError={handleImageError}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{recipe.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">ID: {recipe.id}</p>
                    </div>
                    {recipe.resultQuantity && recipe.resultQuantity > 1 ? (
                      <span className="text-sm font-medium text-foreground">
                        x{recipe.resultQuantity}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {recipe.category ? (
                      <span className="inline-flex items-center rounded-md border-2 border-slate-700 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-950 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100">
                        {recipe.category}
                      </span>
                    ) : null}
                    {recipe.facilityLevel ? (
                      <span className="inline-flex items-center rounded-md border-2 border-blue-700 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-950 dark:border-blue-500 dark:bg-blue-700 dark:text-blue-100">
                        요리 Lv.{recipe.facilityLevel}
                      </span>
                    ) : null}
                    {recipe.craftingTime ? (
                      <span className="inline-flex items-center rounded-md border-2 border-amber-600 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 dark:border-amber-500 dark:bg-amber-700 dark:text-amber-100">
                        {formatTime(recipe.craftingTime)}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-foreground">필요 재료:</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {recipe.requiredItems.map((material) => (
                        <div key={material.itemId} className="flex items-center gap-2 text-sm">
                          <img
                            src={getItemImageUrl(material.itemId)}
                            alt={getItemName(material.itemId)}
                            className="h-6 w-6 flex-shrink-0 rounded object-cover"
                            onError={handleImageError}
                          />
                          <span className="text-foreground">{getItemName(material.itemId)}</span>
                          <span className="ml-auto text-muted-foreground">x{material.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="rounded-lg border py-12 text-center text-muted-foreground">
          검색 조건에 맞는 레시피가 없습니다.
        </div>
      ) : null}
    </div>
  )
}

export default RecipeList


