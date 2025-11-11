import type { FC, HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader: FC<CardHeaderProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
)

export default CardHeader

