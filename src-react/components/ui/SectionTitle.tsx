import type { FC, PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

type SectionTitleSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<SectionTitleSize, string> = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-2xl',
}

export interface SectionTitleProps {
  size?: SectionTitleSize
  className?: string
}

export const SectionTitle: FC<PropsWithChildren<SectionTitleProps>> = ({
  children,
  size = 'md',
  className = '',
}) => (
  <h2 className={cn('font-bold text-foreground', sizeClasses[size], className)}>
    {children}
  </h2>
)

export default SectionTitle

