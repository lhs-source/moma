import type { HTMLAttributes, PropsWithChildren, KeyboardEvent } from 'react'
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

  const items = Array.isArray(children) ? children : [children]
  const trigger = items.find((child: any) => child?.type === AccordionTrigger) ?? null
  const content = items.find((child: any) => child?.type === AccordionContent) ?? null

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <div className={cn('border-b border-border', className)} {...props}>
      <div
        className={cn(
          'flex w-full cursor-pointer select-none items-center justify-between py-4 font-medium transition-all hover:underline',
          '[&[data-state=open]>svg]:rotate-180',
        )}
        data-state={isOpen ? 'open' : 'closed'}
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
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
      </div>
      {isOpen ? (
        <div className="overflow-hidden text-sm transition-all">
          <div className="pb-4 pt-0">{content}</div>
        </div>
      ) : null}
    </div>
  )
}

export function AccordionTrigger({ children }: PropsWithChildren<unknown>) {
  return <>{children}</>
}

export function AccordionContent({ children }: PropsWithChildren<unknown>) {
  return <>{children}</>
}

export default Accordion

