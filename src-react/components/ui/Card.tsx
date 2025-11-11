import type { FC, HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: FC<CardProps> = ({ className, ...props }) => (
  <div
    className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
    {...props}
  />
)

export default Card

