import { useCallback, useEffect, useState } from 'react'

export type CalendarViewType = 'month' | 'week'

const STORAGE_KEY = 'moma-calendar-view'

function readStoredView(): CalendarViewType {
  if (typeof window === 'undefined') return 'month'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'month' || stored === 'week') {
      return stored
    }
  } catch (error) {
    console.warn('Failed to load calendar view from localStorage:', error)
  }
  return 'month'
}

function writeStoredView(view: CalendarViewType) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, view)
  } catch (error) {
    console.warn('Failed to save calendar view to localStorage:', error)
  }
}

export function useCalendarView() {
  const [calendarView, setCalendarView] = useState<CalendarViewType>(() => readStoredView())

  const setView = useCallback((view: CalendarViewType) => {
    setCalendarView(view)
    writeStoredView(view)
  }, [])

  const toggleView = useCallback(() => {
    setCalendarView((prev) => {
      const next = prev === 'month' ? 'week' : 'month'
      writeStoredView(next)
      return next
    })
  }, [])

  useEffect(() => {
    // Keep state in sync if localStorage is changed elsewhere (e.g., other tab)
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        const next = event.newValue === 'week' ? 'week' : 'month'
        setCalendarView(next)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return {
    calendarView,
    setView,
    toggleView,
  }
}


