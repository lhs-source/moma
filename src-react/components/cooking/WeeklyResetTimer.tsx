import { useEffect, useMemo, useState } from 'react'

function getNextMonday(): Date {
  const now = new Date()
  const nextMonday = new Date(now)
  const currentDay = now.getDay()
  const daysUntilMonday = currentDay === 0 ? 1 : (8 - currentDay) % 7 || 7
  nextMonday.setDate(now.getDate() + daysUntilMonday)
  nextMonday.setHours(0, 0, 0, 0)
  return nextMonday
}

function getWeekProgress(): number {
  const now = new Date()
  const currentDay = now.getDay()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const dayFromMonday = currentDay === 0 ? 6 : currentDay - 1
  const timeDecimal = currentHour + currentMinute / 60
  const totalHoursInWeek = 7 * 24
  const elapsedHours = dayFromMonday * 24 + timeDecimal
  return Math.min((elapsedHours / totalHoursInWeek) * 100, 100)
}

function formatTimeDifference(diffMs: number): { display: string; isUrgent: boolean } {
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  const isUrgent = diffMs < 1000 * 60 * 60 * 24

  if (days > 0) {
    return { display: `${days}일 ${hours}시간`, isUrgent }
  }
  if (hours > 0) {
    return { display: `${hours}시간 ${minutes}분`, isUrgent }
  }
  return { display: `${minutes}분`, isUrgent }
}

export function WeeklyResetTimer() {
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => window.clearInterval(intervalId)
  }, [])

  const nextResetDate = useMemo(() => {
    const nextMonday = getNextMonday()
    return (
      nextMonday.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }) + ' 00:00'
    )
  }, [currentTime])

  const timeLeft = useMemo(() => {
    const nextMonday = getNextMonday()
    const diffMs = nextMonday.getTime() - currentTime.getTime()
    if (diffMs <= 0) {
      return { display: '리셋됨', isUrgent: false }
    }
    return formatTimeDifference(diffMs)
  }, [currentTime])

  const progressPercentage = useMemo(() => getWeekProgress(), [currentTime])

  return (
    <div className="rounded border border-border bg-card p-2">
      <h3 className="mb-2 text-sm font-semibold text-foreground">주간 리셋 정보</h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">다음 리셋:</span>
          <span className="text-foreground">{nextResetDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">남은 시간:</span>
          <span className={timeLeft.isUrgent ? 'font-semibold text-destructive' : 'text-foreground'}>
            {timeLeft.display}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
          <div
            className="h-1.5 rounded-full bg-primary transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default WeeklyResetTimer


