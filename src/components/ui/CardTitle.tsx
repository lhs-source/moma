import type { FC, HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle: FC<CardTitleProps> = ({ className, ...props }) => (
  <h3
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
)

export default CardTitle

