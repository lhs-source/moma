import type { HTMLAttributes } from 'react'

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <div role="tablist" className={className} {...props}>
      {children}
    </div>
  )
}

export default TabsList

