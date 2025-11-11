import type { FC, HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent: FC<CardContentProps> = ({ className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
)

export default CardContent

