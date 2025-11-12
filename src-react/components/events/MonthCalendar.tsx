import { useMemo, useState } from 'react'

import type { GameEvent } from '../../../src/data/schemas/event'
import {
  calculateEventBars,
  formatDateTime,
  getEventBarClass,
  getEventBarStyle,
  type EventBar,
} from '../../lib/eventCalendar'

export interface MonthCalendarProps {
  events: GameEvent[]
  onEventClick: (event: GameEvent) => void
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토']
const EVENT_BAR_HEIGHT = 26
const BASE_HEIGHT = 50
const MIN_HEIGHT = 100

export function MonthCalendar({ events, onEventClick }: MonthCalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)

  const currentMonthLabel = useMemo(
    () => `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`,
    [currentDate],
  )

  const calendarWeeks = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()

    const days: Array<Date | null> = []
    for (let i = 0; i < startPadding; i++) {
      days.push(null)
    }
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day))
    }

    const weeks: Array<Array<Date | null>> = []
    for (let index = 0; index < days.length; index += 7) {
      weeks.push(days.slice(index, index + 7))
    }
    return weeks
  }, [currentDate])

  const weekEventBarsCache = useMemo(() => {
    const cache = new Map<number, EventBar[]>()
    calendarWeeks.forEach((week, index) => {
      cache.set(index, calculateEventBars(week, events))
    })
    return cache
  }, [calendarWeeks, events])

  function previousMonth() {
    setCurrentDate((prev) => {
      const next = new Date(prev)
      next.setMonth(prev.getMonth() - 1)
      return next
    })
  }

  function nextMonth() {
    setCurrentDate((prev) => {
      const next = new Date(prev)
      next.setMonth(prev.getMonth() + 1)
      return next
    })
  }

  function getDayClass(day: Date | null): string {
    if (!day) return 'bg-muted/30'
    const today = new Date()
    if (day.toDateString() === today.toDateString()) {
      return 'bg-primary/20 border-2 border-primary/50 ring-2 ring-primary/30'
    }
    return 'bg-card hover:bg-accent/30'
  }

  function getDayNumberClass(day: Date): string {
    const today = new Date()
    if (day.toDateString() === today.toDateString()) {
      return 'inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold'
    }
    const dayOfWeek = day.getDay()
    if (dayOfWeek === 0) return 'text-red-500'
    if (dayOfWeek === 6) return 'text-blue-500'
    return 'text-foreground'
  }

  function getWeekHeight(weekIndex: number): number {
    const eventBars = weekEventBarsCache.get(weekIndex) ?? []
    if (eventBars.length === 0) return MIN_HEIGHT
    const maxRow = Math.max(...eventBars.map((bar) => bar.row))
    const calculatedHeight = BASE_HEIGHT + (maxRow + 1) * EVENT_BAR_HEIGHT
    return Math.max(calculatedHeight, MIN_HEIGHT)
  }

  function getEventBarHoverClass(event: GameEvent): string {
    if (hoveredEventId === event.id) {
      return 'ring-2 ring-yellow-400 ring-offset-1 scale-105 z-50 shadow-lg'
    }
    return 'hover:opacity-90'
  }

  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          className="rounded border border-border bg-background px-4 py-2 text-foreground transition-colors hover:bg-accent"
          onClick={previousMonth}
        >
          ← 이전 달
        </button>
        <h2 className="text-2xl font-bold text-foreground">{currentMonthLabel}</h2>
        <button
          type="button"
          className="rounded border border-border bg-background px-4 py-2 text-foreground transition-colors hover:bg-accent"
          onClick={nextMonth}
        >
          다음 달 →
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid grid-cols-7">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="border-border border-b border-r py-3 text-center font-semibold text-muted-foreground last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {calendarWeeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="relative border-b border-border last:border-b-0"
            style={{ height: `${getWeekHeight(weekIndex)}px` }}
          >
            <div className="absolute inset-0 grid h-full grid-cols-7">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`border-border border-r p-1 last:border-r-0 ${getDayClass(day)}`}
                >
                  {day ? (
                    <div className="px-1 text-right text-sm font-medium">
                      <span className={getDayNumberClass(day)}>{day.getDate()}</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="pointer-events-none relative h-full">
              {(weekEventBarsCache.get(weekIndex) ?? []).map((eventBar, barIndex) => (
                <div
                  key={`${weekIndex}-${barIndex}`}
                  className={[
                    'absolute cursor-pointer truncate rounded px-2 py-1 text-xs font-medium shadow-sm transition-all pointer-events-auto',
                    getEventBarClass(eventBar),
                    getEventBarHoverClass(eventBar.event),
                  ].join(' ')}
                  style={getEventBarStyle(eventBar, {
                    colWidth: 100 / 7,
                    padding: 0.3,
                    topOffset: 28,
                    barHeight: EVENT_BAR_HEIGHT,
                  })}
                  title={`${eventBar.event.name}\n${formatDateTime(eventBar.event.startDate)} ~ ${formatDateTime(eventBar.event.endDate)}`}
                  onMouseEnter={() => setHoveredEventId(eventBar.event.id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                  onClick={() => onEventClick(eventBar.event)}
                >
                  {eventBar.showName ? eventBar.event.name : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthCalendar


