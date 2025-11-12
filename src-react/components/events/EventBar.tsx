import { useEffect, useMemo, useState } from 'react'

import { EVENT_TYPE, type GameEvent } from '../../../src/data/schemas/event'

export interface EventBarProps {
  event: GameEvent
  onClick: (event: GameEvent) => void
}

function formatDateTime(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function EventBar({ event, onClick }: EventBarProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 60000)
    return () => window.clearInterval(intervalId)
  }, [])

  const barClass = useMemo(() => {
    if (event.type === EVENT_TYPE.EVENT) {
      return 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700'
    }
    if (event.type === EVENT_TYPE.CASH_SHOP) {
      return 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
    }
    return 'bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700'
  }, [event.type])

  const timeRemaining = useMemo(() => {
    const diff = event.endDate.getTime() - now.getTime()
    if (diff <= 0) return '종료됨'
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}일 ${hours}시간 남음`
    if (hours > 0) return `${hours}시간 ${minutes}분 남음`
    return `${minutes}분 남음`
  }, [event.endDate, now])

  return (
    <div
      className={[
        barClass,
        'cursor-pointer rounded-lg border px-3 py-2 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]',
      ].join(' ')}
      onClick={() => onClick(event)}
    >
      <div className="pointer-events-none flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">{event.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            <div>시작: {formatDateTime(event.startDate)}</div>
            <div>종료: {formatDateTime(event.endDate)}</div>
          </div>
        </div>
        <div className="ml-3 text-right">
          <div className="whitespace-nowrap text-xs font-medium text-foreground">{timeRemaining}</div>
        </div>
      </div>
    </div>
  )
}

export default EventBar


