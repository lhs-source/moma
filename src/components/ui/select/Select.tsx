import type { PropsWithChildren } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'

import { cn } from '../../../lib/utils'
import { SelectContext } from './SelectContext'

export interface SelectProps extends PropsWithChildren {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function Select({
  value,
  defaultValue = '',
  onValueChange,
  className,
  children,
}: SelectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  const selectedValue = isControlled ? value! : internalValue

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
      setIsOpen(false)
    },
    [isControlled, onValueChange],
  )

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      value: selectedValue,
      isOpen,
      toggleOpen,
      close,
      setValue,
    }),
    [selectedValue, isOpen, toggleOpen, close, setValue],
  )

  return (
    <SelectContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn('relative', className)}
        data-select
      >
        {children}
      </div>
    </SelectContext.Provider>
  )
}

