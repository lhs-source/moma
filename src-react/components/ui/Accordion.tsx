import type { HTMLAttributes, PropsWithChildren } from 'react'
import { useState } from 'react'

import { cn } from '../../lib/utils'

export interface AccordionProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  defaultOpen?: boolean
}

export function Accordion({
  defaultOpen = false,
  className,
  children,
  ...props
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const trigger = Array.isArray(children)
    ? children.find((child: any) => child?.props?.slot === 'trigger')
    : null
  const content = Array.isArray(children)
    ? children.find((child: any) => child?.props?.slot === 'content')
    : null

  return (
    <div className={cn('border-b border-border', className)} {...props}>
      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-between py-4 font-medium transition-all hover:underline',
          '[&[data-state=open]>svg]:rotate-180',
        )}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {trigger}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 transition-transform duration-200"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen ? (
        <div className="overflow-hidden text-sm transition-all">
          <div className="pb-4 pt-0">{content}</div>
        </div>
      ) : null}
    </div>
  )
}

export default Accordion

