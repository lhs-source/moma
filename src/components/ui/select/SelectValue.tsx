import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../../lib/utils'

export interface SelectValueProps
  extends HTMLAttributes<HTMLSpanElement>,
    PropsWithChildren {}

export function SelectValue({ className, children, ...props }: SelectValueProps) {
  return (
    <span className={cn('block truncate', className)} {...props}>
      {children}
    </span>
  )
}

