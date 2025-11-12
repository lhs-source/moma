import type { Recipe } from '../../../src/data/schemas/recipe'

export interface SelectedRecipeListProps {
  recipes: Recipe[]
  selectedCounts: Record<string, number>
  getItemImageUrl: (id: string) => string
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onRemove: (recipeId: string) => void
}

export function SelectedRecipeList({
  recipes,
  selectedCounts,
  getItemImageUrl,
  handleImageError,
  onRemove,
}: SelectedRecipeListProps) {
  return (
    <div className="max-h-64 space-y-2 overflow-auto pr-1">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="flex items-center gap-2 rounded border border-border bg-card p-2"
        >
          <img
            src={getItemImageUrl(recipe.resultItemId)}
            alt={recipe.name}
            className="h-8 w-8 rounded object-cover"
            onError={handleImageError}
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-foreground">{recipe.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-foreground">x{selectedCounts[recipe.id] ?? 0}</div>
            <button
              type="button"
              className="text-xs text-destructive hover:underline"
              onClick={() => onRemove(recipe.id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}

      {recipes.length === 0 ? (
        <div className="py-4 text-center text-sm text-muted-foreground">선택된 요리가 없습니다</div>
      ) : null}
    </div>
  )
}

export default SelectedRecipeList


