import { useMemo, useState } from 'react'

import type { GameEvent } from '../../../src/data/schemas/event'
import {
  calculateEventBars,
  formatDateTime,
  getEventBarClass,
  getEventBarStyle,
  getWeekLabel,
  getWeekStart,
  type EventBar,
} from '../../lib/eventCalendar'

export interface WeekCalendarProps {
  events: GameEvent[]
  onEventClick: (event: GameEvent) => void
}

const WEEK_DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']
const EVENT_BAR_HEIGHT = 28
const BASE_HEIGHT = 60
const MIN_HEIGHT = 200

export function WeekCalendar({ events, onEventClick }: WeekCalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)

  const weekDays = useMemo(() => {
    const start = getWeekStart(currentDate)
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start)
      date.setDate(start.getDate() + index)
      return date
    })
  }, [currentDate])

  const eventBars = useMemo<EventBar[]>(() => calculateEventBars(weekDays, events), [events, weekDays])

  const weekHeight = useMemo(() => {
    if (eventBars.length === 0) return MIN_HEIGHT
    const maxRow = Math.max(...eventBars.map((bar) => bar.row))
    const calculatedHeight = BASE_HEIGHT + (maxRow + 1) * EVENT_BAR_HEIGHT
    return Math.max(calculatedHeight, MIN_HEIGHT)
  }, [eventBars])

  const weekLabel = useMemo(() => getWeekLabel(currentDate), [currentDate])

  function handlePreviousWeek() {
    setCurrentDate((prev) => {
      const next = new Date(prev)
      next.setDate(prev.getDate() - 7)
      return next
    })
  }

  function handleNextWeek() {
    setCurrentDate((prev) => {
      const next = new Date(prev)
      next.setDate(prev.getDate() + 7)
      return next
    })
  }

  function getDayClass(day: Date): string {
    const today = new Date()
    if (day.toDateString() === today.toDateString()) {
      return 'bg-primary/20 border-2 border-primary/50 ring-2 ring-primary/30'
    }
    return 'bg-card hover:bg-accent/30'
  }

  function getDayNumberClass(day: Date): string {
    const today = new Date()
    if (day.toDateString() === today.toDateString()) {
      return 'inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold'
    }
    const dayOfWeek = day.getDay()
    if (dayOfWeek === 0) return 'text-red-500'
    if (dayOfWeek === 6) return 'text-blue-500'
    return 'text-foreground'
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
          onClick={handlePreviousWeek}
        >
          ← 이전 주
        </button>
        <h2 className="text-2xl font-bold text-foreground">{weekLabel}</h2>
        <button
          type="button"
          className="rounded border border-border bg-background px-4 py-2 text-foreground transition-colors hover:bg-accent"
          onClick={handleNextWeek}
        >
          다음 주 →
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid grid-cols-7">
          {WEEK_DAY_LABELS.map((label) => (
            <div
              key={label}
              className="border-border border-b border-r py-3 text-center font-semibold text-muted-foreground last:border-r-0"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="relative" style={{ height: `${weekHeight}px` }}>
          <div className="absolute inset-0 grid h-full grid-cols-7">
            {weekDays.map((day, index) => (
              <div
                key={`${day.toDateString()}-${index}`}
                className={`border-border border-r p-2 last:border-r-0 ${getDayClass(day)}`}
              >
                <div className="text-right text-lg font-medium">
                  <span className={getDayNumberClass(day)}>{day.getDate()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none relative h-full">
            {eventBars.map((eventBar, index) => (
              <div
                key={`${eventBar.event.id}-${index}`}
                className={[
                  'absolute cursor-pointer truncate rounded px-2 py-1 text-xs font-medium shadow-sm transition-all pointer-events-auto',
                  getEventBarClass(eventBar),
                  getEventBarHoverClass(eventBar.event),
                ].join(' ')}
                style={getEventBarStyle(eventBar, {
                  colWidth: 100 / 7,
                  padding: 0.3,
                  topOffset: 40,
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
      </div>
    </div>
  )
}

export default WeekCalendar


