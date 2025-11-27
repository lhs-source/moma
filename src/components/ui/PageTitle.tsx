import type { FC, PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

type PageTitleSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<PageTitleSize, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
}

export interface PageTitleProps {
  size?: PageTitleSize
  className?: string
}

export const PageTitle: FC<PropsWithChildren<PageTitleProps>> = ({
  children,
  size = 'lg',
  className = '',
}) => (
  <h1 className={cn('font-bold text-foreground', sizeClasses[size], className)}>
    {children}
  </h1>
)

export default PageTitle

