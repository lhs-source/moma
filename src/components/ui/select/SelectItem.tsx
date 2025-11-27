import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../../lib/utils'
import { useSelectContext } from './SelectContext'

export interface SelectItemProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  value: string
}

export function SelectItem({ value, className, children, ...props }: SelectItemProps) {
  const { value: selectedValue, setValue } = useSelectContext('SelectItem')
  const isSelected = selectedValue === value

  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        isSelected && 'bg-blue-50 text-blue-900',
        className,
      )}
      onClick={(event) => {
        event.stopPropagation()
        setValue(value)
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected ? (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}
      </span>
      {children}
    </div>
  )
}

