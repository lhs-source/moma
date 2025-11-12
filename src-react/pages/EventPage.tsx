import { useEffect, useMemo, useState } from 'react'

import { gameEvents } from '../../src/data/events'
import type { GameEvent } from '../../src/data/schemas/event'
import CalendarViewToggle from '../components/events/CalendarViewToggle'
import EventBar from '../components/events/EventBar'
import EventDetailSheet from '../components/events/EventDetailSheet'
import MonthCalendar from '../components/events/MonthCalendar'
import WeekCalendar from '../components/events/WeekCalendar'
import PageTitle from '../components/ui/PageTitle'
import SectionTitle from '../components/ui/SectionTitle'
import { useCalendarView } from '../hooks/useCalendarView'

export function EventPage() {
  const { calendarView, setView } = useCalendarView()
  const [selectedEvent, setSelectedEvent] = useState<GameEvent | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => window.clearInterval(intervalId)
  }, [])

  const activeEvents = useMemo(
    () =>
      gameEvents
        .filter((event) => event.startDate <= currentTime && event.endDate >= currentTime)
        .sort((a, b) => a.endDate.getTime() - b.endDate.getTime()),
    [currentTime],
  )

  const upcomingEvents = useMemo(
    () =>
      gameEvents
        .filter((event) => event.startDate > currentTime)
        .sort((a, b) => a.endDate.getTime() - b.endDate.getTime()),
    [currentTime],
  )

  const pastEvents = useMemo(
    () =>
      gameEvents
        .filter((event) => event.endDate < currentTime)
        .sort((a, b) => b.endDate.getTime() - a.endDate.getTime()),
    [currentTime],
  )

  function handleEventClick(event: GameEvent) {
    setSelectedEvent(event)
    setIsSheetOpen(true)
  }

  function handleCloseDetail() {
    setIsSheetOpen(false)
    setTimeout(() => {
      setSelectedEvent(null)
    }, 300)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle>이벤트 & 캐시샵 캘린더</PageTitle>
        <CalendarViewToggle value={calendarView} onValueChange={setView} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {calendarView === 'month' ? (
            <MonthCalendar events={gameEvents} onEventClick={handleEventClick} />
          ) : (
            <WeekCalendar events={gameEvents} onEventClick={handleEventClick} />
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionTitle>진행 중인 일정</SectionTitle>
          </div>
          <div className="space-y-3">
            {activeEvents.map((event) => (
              <EventBar key={event.id} event={event} onClick={handleEventClick} />
            ))}
            {activeEvents.length === 0 ? (
              <div className="rounded-lg border border-border bg-card py-8 text-center text-muted-foreground">
                진행 중인 일정이 없습니다
              </div>
            ) : null}
          </div>

          <div className="mt-8">
            <SectionTitle className="mb-3">예정된 일정</SectionTitle>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <EventBar key={event.id} event={event} onClick={handleEventClick} />
              ))}
              {upcomingEvents.length === 0 ? (
                <div className="rounded-lg border border-border bg-card py-8 text-center text-muted-foreground">
                  예정된 일정이 없습니다
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-8">
            <SectionTitle className="mb-3">종료된 일정</SectionTitle>
            <div className="space-y-3">
              {pastEvents.map((event) => (
                <EventBar key={event.id} event={event} onClick={handleEventClick} />
              ))}
              {pastEvents.length === 0 ? (
                <div className="rounded-lg border border-border bg-card py-8 text-center text-muted-foreground">
                  종료된 일정이 없습니다
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <EventDetailSheet event={selectedEvent} isOpen={isSheetOpen} onClose={handleCloseDetail} />
    </div>
  )
}

export default EventPage


