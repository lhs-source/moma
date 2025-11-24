import type { HTMLAttributes, PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'

import { cn } from '../../../lib/utils'
import { useSelectContext } from './SelectContext'

export interface SelectContentProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

export function SelectContent({ className, children, ...props }: SelectContentProps) {
  const { isOpen, close } = useSelectContext('SelectContent')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (contentRef.current?.contains(target)) {
        return
      }
      const selectRoot = contentRef.current?.closest('[data-select]')
      if (selectRoot && selectRoot.contains(target)) {
        return
      }
      close()
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, close])

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={contentRef}
      className={cn(
        'absolute left-0 top-full z-[9999] w-full rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

