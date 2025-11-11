import type { FC, PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

type CategoryTitleSize = 'xs' | 'sm' | 'md' | 'lg'

const sizeClasses: Record<CategoryTitleSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
}

export interface CategoryTitleProps {
  size?: CategoryTitleSize
  className?: string
}

export const CategoryTitle: FC<PropsWithChildren<CategoryTitleProps>> = ({
  children,
  size = 'md',
  className = '',
}) => (
  <h3 className={cn('font-semibold text-foreground', sizeClasses[size], className)}>
    {children}
  </h3>
)

export default CategoryTitle

