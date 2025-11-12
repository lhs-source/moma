export interface WeeklyBuyableItem {
  itemId: string
  totalBuyableCount: number
  recipes: Array<{ id: string; name: string; price: number; npcId: string }>
}

export interface WeeklyBuyableGridProps {
  items: WeeklyBuyableItem[]
  getItemName: (id: string) => string
  getItemImageUrl: (id: string) => string
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement>) => void
}

export function WeeklyBuyableGrid({
  items,
  getItemName,
  getItemImageUrl,
  handleImageError,
}: WeeklyBuyableGridProps) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-foreground">주간 구매 가능 횟수 및 가격</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.itemId} className="rounded-lg border border-border bg-muted/50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <img
                src={getItemImageUrl(item.itemId)}
                alt={getItemName(item.itemId)}
                className="h-6 w-6 rounded object-cover"
                onError={handleImageError}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  {getItemName(item.itemId)}
                </div>
                <div className="text-xs text-muted-foreground">총 {item.totalBuyableCount}개 구매 가능</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">{item.totalBuyableCount}개</div>
                <div className="text-xs text-muted-foreground">주간</div>
              </div>
            </div>
            <div className="space-y-1 rounded bg-card p-2">
              {item.recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex items-center justify-between border-b border-border pb-1 text-xs last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-1">
                    <span className="truncate font-medium text-foreground">{recipe.name}</span>
                    <span className="text-muted-foreground">({recipe.npcId})</span>
                  </div>
                  <div className="ml-2 text-right">
                    <div className="font-semibold text-foreground">{recipe.price}G</div>
                  </div>
                </div>
              ))}
              {item.recipes.length === 0 ? (
                <div className="py-2 text-center text-xs text-muted-foreground">
                  구매 정보가 없습니다
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {items.length === 0 ? (
          <div className="col-span-2 py-4 text-center text-sm text-muted-foreground">
            구매 가능한 식재료가 없습니다
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default WeeklyBuyableGrid


