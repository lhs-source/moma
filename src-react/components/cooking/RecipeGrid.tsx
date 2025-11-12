import type { Recipe } from '../../../src/data/schemas/recipe'

export interface RecipeGridProps {
  recipes: Recipe[]
  selectedCounts: Record<string, number>
  getItemName: (id: string) => string
  getItemImageUrl: (id: string) => string
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onChangeCount: (id: string, count: number) => void
}

export function RecipeGrid({
  recipes,
  selectedCounts,
  getItemName,
  getItemImageUrl,
  handleImageError,
  onChangeCount,
}: RecipeGridProps) {
  function increment(id: string) {
    const current = selectedCounts[id] ?? 0
    onChangeCount(id, current + 1)
  }

  function decrement(id: string) {
    const current = selectedCounts[id] ?? 0
    onChangeCount(id, Math.max(0, current - 1))
  }

  function handleCountChange(id: string, value: string) {
    const parsed = Number(value)
    const next = Number.isFinite(parsed) ? Math.max(0, parsed) : 0
    onChangeCount(id, next)
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="rounded border border-border bg-card p-3 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-start gap-3">
            <img
              src={getItemImageUrl(recipe.resultItemId)}
              alt={recipe.name}
              className="h-12 w-12 rounded object-cover"
              onError={handleImageError}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="truncate font-semibold text-foreground">{recipe.name}</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded border border-border bg-background px-2 py-1 text-foreground hover:bg-accent"
                    onClick={() => decrement(recipe.id)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={0}
                    className="w-16 rounded border border-border bg-background px-2 py-1 text-center text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    value={selectedCounts[recipe.id] ?? 0}
                    onChange={(event) => handleCountChange(recipe.id, event.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded border border-border bg-background px-2 py-1 text-foreground hover:bg-accent"
                    onClick={() => increment(recipe.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                {recipe.requiredItems.map((required) => (
                  <div key={required.itemId} className="flex items-center gap-2">
                    <img
                      src={getItemImageUrl(required.itemId)}
                      alt={getItemName(required.itemId)}
                      className="h-5 w-5 rounded object-cover"
                      onError={handleImageError}
                    />
                    <span className="truncate text-foreground">{getItemName(required.itemId)}</span>
                    <span className="ml-auto text-muted-foreground">x{required.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeGrid


