import type { CalendarViewType } from '../../hooks/useCalendarView'

export interface CalendarViewToggleProps {
  value: CalendarViewType
  onValueChange: (view: CalendarViewType) => void
}

const views: Array<{ value: CalendarViewType; label: string }> = [
  { value: 'month', label: '월별' },
  { value: 'week', label: '주간' },
]

export function CalendarViewToggle({ value, onValueChange }: CalendarViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-card p-1">
      {views.map((view) => (
        <button
          key={view.value}
          type="button"
          className={[
            'rounded-md px-4 py-2 text-sm font-medium transition-colors',
            value === view.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
          ].join(' ')}
          onClick={() => onValueChange(view.value)}
        >
          {view.label}
        </button>
      ))}
    </div>
  )
}

export default CalendarViewToggle


