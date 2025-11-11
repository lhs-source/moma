import type { ButtonHTMLAttributes } from 'react'

import { cn } from '../../../lib/utils'
import { useTabsContext } from './TabsContext'

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: activeValue, onSelect } = useTabsContext('TabsTrigger')
  const isActive = activeValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-primary text-primary-foreground shadow'
          : 'bg-muted text-muted-foreground hover:bg-muted/80',
        className,
      )}
      onClick={() => onSelect(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export default TabsTrigger

