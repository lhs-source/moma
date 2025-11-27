import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../../lib/utils'
import { useSelectContext } from './SelectContext'

export interface SelectTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  placeholder?: string
}

export function SelectTrigger({
  placeholder = '선택하세요',
  className,
  children,
  ...props
}: SelectTriggerProps) {
  const { value, isOpen, toggleOpen } = useSelectContext('SelectTrigger')

  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onClick={(event) => {
        event.stopPropagation()
        toggleOpen()
      }}
      {...props}
    >
      <span className="truncate">
        {value ? value : <span className="text-muted-foreground">{placeholder}</span>}
      </span>
      <svg
        className={cn(
          'h-4 w-4 opacity-50 transition-transform',
          isOpen && 'rotate-180',
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      {children}
    </button>
  )
}

