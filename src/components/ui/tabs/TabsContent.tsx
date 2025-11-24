import type { HTMLAttributes } from 'react'

import { cn } from '../../../lib/utils'
import { useTabsContext } from './TabsContext'

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { value: activeValue } = useTabsContext('TabsContent')
  const isActive = activeValue === value

  return (
    <div
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      hidden={!isActive}
      className={cn(isActive ? 'block' : 'hidden', className)}
      {...props}
    >
      {isActive ? children : null}
    </div>
  )
}

export default TabsContent

