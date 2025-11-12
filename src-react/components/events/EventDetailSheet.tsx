import { useMemo } from 'react'
import { createPortal } from 'react-dom'

import { EVENT_TYPE, type GameEvent } from '../../../src/data/schemas/event'

export interface EventDetailSheetProps {
  event: GameEvent | null
  isOpen: boolean
  onClose: () => void
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function EventDetailSheet({ event, isOpen, onClose }: EventDetailSheetProps) {
  const typeClass = useMemo(() => {
    if (!event) return ''
    switch (event.type) {
      case EVENT_TYPE.EVENT:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case EVENT_TYPE.CASH_SHOP:
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case EVENT_TYPE.MAINTENANCE:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case EVENT_TYPE.ITEM:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }, [event])

  if (!isOpen || !event) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-gray-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-2xl font-bold text-gray-900 dark:text-white">{event.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <span className={['text-xs font-medium', typeClass].join(' ')}>{event.type}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="ml-4 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={onClose}
              aria-label="닫기"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {event.description ? (
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">설명</h3>
              <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
            </div>
          ) : null}

          {event.saleLocation ? (
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">판매 위치</h3>
              <p className="text-gray-600 dark:text-gray-400">{event.saleLocation}</p>
            </div>
          ) : null}

          {event.packages && event.packages.length > 0 ? (
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">판매 패키지</h3>
              <div className="space-y-4">
                {event.packages.map((pkg, index) => (
                  <div
                    key={`${pkg.name}-${index}`}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition-colors hover:border-blue-500/50 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">{pkg.name}</h4>
                      <div className="ml-4 text-right">
                        <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{pkg.price}</div>
                        {pkg.cashPoint ? (
                          <div className="text-xs text-gray-600 dark:text-gray-400">포인트: {pkg.cashPoint}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">구성품</div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {pkg.items.map((item, itemIndex) => (
                          <div
                            key={`${item.name}-${itemIndex}`}
                            className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          >
                            <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                            <span className="flex-1">{item.name}</span>
                            <span className="font-medium">{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded bg-gray-200 px-3 py-2 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      구매 제한: {pkg.purchaseLimit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {event.notes && event.notes.length > 0 ? (
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">참고사항</h3>
              <div className="space-y-2 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                {event.notes.map((note, index) => (
                  <div
                    key={`${note}-${index}`}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 text-amber-600 dark:text-amber-400">•</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default EventDetailSheet


