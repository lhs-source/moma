import { useEffect, useMemo, useState } from 'react'

import { cn } from '../lib/utils'

interface TimerEvent {
  name: string
  times: string[]
  days?: string[]
  duration?: number
}

const TIMER_EVENTS: TimerEvent[] = [
  {
    name: '필드보스',
    times: ['12:00', '18:00', '20:00', '22:00'],
    duration: 30,
  },
  {
    name: '콜헨 불꽃놀이',
    times: ['20:00'],
    days: ['금요일', '토요일', '일요일'],
  },
  {
    name: '결계',
    times: [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
    ],
    duration: 4,
  },
]

const DAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

function getEventNextTime(event: TimerEvent, now: Date, currentDay: string) {
  if (event.days && !event.days.includes(currentDay)) {
    return null
  }

  for (const time of event.times) {
    const [hours, minutes] = time.split(':').map(Number)
    const eventTime = new Date(now)
    eventTime.setHours(hours, minutes, 0, 0)
    if (eventTime > now) {
      return time
    }
  }

  return event.times[0] ?? null
}

function getTimeUntil(timeStr: string, now: Date) {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const targetTime = new Date(now)
  targetTime.setHours(hours, minutes, 0, 0)

  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1)
  }

  const diff = targetTime.getTime() - now.getTime()
  const hoursDiff = Math.floor(diff / (1000 * 60 * 60))
  const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secondsDiff = Math.floor((diff % (1000 * 60)) / 1000)

  return `${hoursDiff}시간 ${minutesDiff}분 ${secondsDiff}초`
}

function isEventActive(event: TimerEvent, now: Date, currentDay: string) {
  if (event.days && !event.days.includes(currentDay)) {
    return false
  }

  return event.times.some((time) => {
    const [hours, minutes] = time.split(':').map(Number)
    const eventStart = new Date(now)
    eventStart.setHours(hours, minutes, 0, 0)

    const eventEnd = new Date(eventStart)
    eventEnd.setMinutes(eventEnd.getMinutes() + (event.duration ?? 0))

    return now >= eventStart && now < eventEnd
  })
}

function getCurrentEventRemaining(event: TimerEvent, now: Date) {
  if (!event.duration) {
    return null
  }

  for (const time of event.times) {
    const [hours, minutes] = time.split(':').map(Number)
    const eventStart = new Date(now)
    eventStart.setHours(hours, minutes, 0, 0)

    const eventEnd = new Date(eventStart)
    eventEnd.setMinutes(eventEnd.getMinutes() + event.duration)

    if (now >= eventStart && now < eventEnd) {
      const remainingTime = eventEnd.getTime() - now.getTime()
      const hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60))
      const minutesRemaining = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      const secondsRemaining = Math.floor((remainingTime % (1000 * 60)) / 1000)

      return `${hoursRemaining}시간 ${minutesRemaining}분 ${secondsRemaining}초`
    }
  }

  return null
}

export function TimerInfo() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  }, [])

  const currentDay = useMemo(() => DAYS[now.getDay()], [now])

  return (
    <div className="timer-info">
      <h2 className="mb-4 text-xl font-bold text-foreground">타이머 정보</h2>
      <div className="space-y-3">
        {TIMER_EVENTS.map((event) => {
          const isActive = isEventActive(event, now, currentDay)
          const nextTime = getEventNextTime(event, now, currentDay)
          const remaining = isActive ? getCurrentEventRemaining(event, now) : null
          const timeUntil = nextTime ? getTimeUntil(nextTime, now) : null

          return (
            <div
              key={event.name}
              className={cn(
                'rounded-lg border p-3',
                isActive ? 'border-destructive/30 bg-destructive/10' : 'border-border bg-card',
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.times.join(', ')}
                    {event.days ? <span className="ml-2">({event.days.join(', ')})</span> : null}
                    {event.duration ? <span className="ml-2">({event.duration}분)</span> : null}
                  </p>
                </div>
                <div className="min-w-32 whitespace-nowrap text-right">
                  {isActive ? (
                    <div className="font-bold text-destructive">등장 중!</div>
                  ) : nextTime ? (
                    <div className="font-medium text-primary">다음: {nextTime}</div>
                  ) : (
                    <div className="text-muted-foreground">오늘 없음</div>
                  )}
                  {remaining ? (
                    <div className="text-sm text-destructive">남은 시간: {remaining}</div>
                  ) : null}
                  {timeUntil ? (
                    <div className="text-sm text-muted-foreground">{timeUntil}</div>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TimerInfo

