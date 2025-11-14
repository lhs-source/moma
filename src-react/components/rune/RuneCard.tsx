import type { Rune } from '../../../src/data/equip/weapons'
import { getRuneGradeBadgeClass, getRuneTypeBadgeClass } from '../../../src/utils/runeUtils'

export interface RuneCardProps {
  rune: Rune
  onClick: (rune: Rune) => void
}

export function RuneCard({ rune, onClick }: RuneCardProps) {
  return (
    <button
      type="button"
      className="w-full cursor-pointer rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted/50"
      onClick={() => onClick(rune)}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded border border-border bg-muted/50">
          {rune.image ? (
            <img src={rune.image} alt={rune.name} className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-muted-foreground">이미지 없음</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-foreground">{rune.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className={getRuneTypeBadgeClass(rune.type)}>{rune.type}</span>
                <span className={getRuneGradeBadgeClass(rune.grade)}>{rune.grade}</span>
              </div>
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{rune.effect}</p>
        </div>
      </div>
    </button>
  )
}

export default RuneCard


