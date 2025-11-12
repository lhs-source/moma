import { EVENT_TYPE, type GameEvent } from '../../src/data/schemas/event'
import type { CSSProperties } from 'react'

export interface EventBar {
  event: GameEvent
  startCol: number
  endCol: number
  row: number
  showName: boolean
  isEnding: boolean
  endTimeRatio?: number
}

export interface EventBarStyleConfig {
  colWidth: number
  padding: number
  topOffset: number
  barHeight: number
}

function normaliseDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function filterEventsInRange(events: GameEvent[], startDate: Date, endDate: Date): GameEvent[] {
  const rangeStart = normaliseDate(startDate)
  const rangeEnd = normaliseDate(endDate)

  return events.filter((event) => {
    const eventStart = normaliseDate(event.startDate)
    const eventEnd = normaliseDate(event.endDate)
    return eventEnd >= rangeStart && eventStart <= rangeEnd
  })
}

export function calculateEventBars(days: Array<Date | null>, events: GameEvent[]): EventBar[] {
  const eventBars: EventBar[] = []
  const firstValidDay = days.find((day) => day !== null)
  const lastValidDay = [...days].reverse().find((day) => day !== null) ?? firstValidDay

  if (!firstValidDay) return []

  const rangeStart = normaliseDate(firstValidDay)
  const rangeEnd = lastValidDay ? normaliseDate(lastValidDay) : rangeStart

  const sortedEvents = [...events].sort((a, b) => a.endDate.getTime() - b.endDate.getTime())

  sortedEvents.forEach((event) => {
    const eventStart = normaliseDate(event.startDate)
    const eventEnd = normaliseDate(event.endDate)

    if (eventEnd < rangeStart || eventStart > rangeEnd) return

    let startCol = -1
    let endCol = -1

    days.forEach((day, index) => {
      if (!day) return
      const normalised = normaliseDate(day)
      if (normalised >= eventStart && normalised <= eventEnd) {
        if (startCol === -1) startCol = index
        endCol = index
      }
    })

    if (startCol === -1 || endCol === -1) return

    const showName = true
    const lastDayInRange = days[endCol]
    const lastDayDate = lastDayInRange ? normaliseDate(lastDayInRange) : null
    const isEnding = lastDayDate ? lastDayDate.getTime() >= eventEnd.getTime() : false

    let endTimeRatio: number | undefined
    if (lastDayDate && isEnding) {
      const dayStart = new Date(lastDayDate)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(lastDayDate)
      dayEnd.setHours(23, 59, 59, 999)
      if (event.endDate >= dayStart && event.endDate <= dayEnd) {
        const dayDuration = dayEnd.getTime() - dayStart.getTime()
        const elapsedTime = event.endDate.getTime() - dayStart.getTime()
        endTimeRatio = Math.max(0, Math.min(1, elapsedTime / dayDuration))
      }
    }

    let row = 0
    while (
      eventBars.some(
        (bar) => bar.row === row && !(bar.endCol < startCol || bar.startCol > endCol),
      )
    ) {
      row++
    }

    eventBars.push({
      event,
      startCol,
      endCol,
      row,
      showName,
      isEnding,
      endTimeRatio,
    })
  })

  return eventBars.sort((a, b) => a.row - b.row)
}

export function getEventBarStyle(eventBar: EventBar, config: EventBarStyleConfig): CSSProperties {
  const { colWidth, padding, topOffset, barHeight } = config
  const left = eventBar.startCol * colWidth + padding

  let width: number
  if (eventBar.startCol === eventBar.endCol) {
    if (eventBar.endTimeRatio !== undefined) {
      width = colWidth * eventBar.endTimeRatio - padding * 2
    } else {
      width = colWidth - padding * 2
    }
  } else {
    const fullCols = eventBar.endCol - eventBar.startCol + 1
    let baseWidth = fullCols * colWidth - padding * 2
    if (eventBar.endTimeRatio !== undefined && eventBar.isEnding) {
      const lastColWidth = colWidth * eventBar.endTimeRatio
      baseWidth = baseWidth - colWidth + lastColWidth
    }
    width = baseWidth
  }

  width = Math.max(0, width)
  const top = topOffset + eventBar.row * barHeight

  return {
    left: `${left}%`,
    width: `${width}%`,
    top: `${top}px`,
  }
}

export function getEventBarClass(eventBar: EventBar): string {
  const isEvent = eventBar.event.type === EVENT_TYPE.EVENT
  const isCashShop = eventBar.event.type === EVENT_TYPE.CASH_SHOP

  if (eventBar.isEnding) {
    if (isEvent) {
      return 'bg-gradient-to-r from-blue-400 to-blue-700 text-white border-r-4 border-red-600'
    }
    if (isCashShop) {
      return 'bg-gradient-to-r from-green-400 to-green-700 text-white border-r-4 border-red-600'
    }
    return 'bg-gradient-to-r from-purple-400 to-purple-700 text-white border-r-4 border-red-600'
  }

  if (isEvent) return 'bg-blue-500 text-white'
  if (isCashShop) return 'bg-green-500 text-white'
  return 'bg-purple-500 text-white'
}

export function formatDateTime(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function getWeekStart(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  result.setDate(result.getDate() - day)
  result.setHours(0, 0, 0, 0)
  return result
}

export function getWeekEnd(date: Date): Date {
  const result = getWeekStart(date)
  result.setDate(result.getDate() + 6)
  result.setHours(23, 59, 59, 999)
  return result
}

export function getWeekLabel(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const weekStart = getWeekStart(date)
  const firstDayOfMonth = new Date(year, date.getMonth(), 1)
  const weekNumber = Math.ceil((weekStart.getDate() + firstDayOfMonth.getDay()) / 7)
  return `${year}년 ${month}월 ${weekNumber}주차`
}


