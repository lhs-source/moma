import { createPortal } from 'react-dom'

import type { Rune } from '../../../src/data/equip/weapons'
import { getRuneGradeBadgeClassLarge, getRuneTypeBadgeClassLarge } from '../../../src/utils/runeUtils'

export interface RuneDetailSheetProps {
  rune: Rune | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RuneDetailSheet({ rune, open, onOpenChange }: RuneDetailSheetProps) {
  if (!open || !rune) {
    return null
  }

  const handleClose = () => onOpenChange(false)

  const content = (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={handleClose} />
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl transition-all duration-300"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="truncate text-lg font-semibold text-foreground">{rune.name}</h2>
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
            onClick={handleClose}
            aria-label="닫기"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded border border-border bg-muted/50">
              {rune.image ? (
                <img src={rune.image} alt={rune.name} className="h-full w-full object-contain" />
              ) : (
                <span className="text-xs text-muted-foreground">이미지 없음</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mt-2 flex items-center gap-2">
                <span className={getRuneTypeBadgeClassLarge(rune.type)}>{rune.type}</span>
                <span className={getRuneGradeBadgeClassLarge(rune.grade)}>{rune.grade}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">효과</h3>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">{rune.effect}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">획득처</h3>
            {rune.obtainSources && rune.obtainSources.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {rune.obtainSources.map((source) => (
                  <span key={source} className="rounded bg-muted px-2 py-1 text-sm text-muted-foreground">
                    {source}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">획득처 정보가 없습니다.</p>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">ID</h3>
            <p className="font-mono text-sm text-muted-foreground">{rune.id}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default RuneDetailSheet


