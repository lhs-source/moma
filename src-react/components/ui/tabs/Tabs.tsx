import { useEffect, useMemo, useState } from 'react'

import type { PropsWithChildren } from 'react'
import { TabsContext } from './TabsContext'

export interface TabsProps extends PropsWithChildren {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function Tabs({
  defaultValue = '',
  value,
  onValueChange,
  className,
  children,
}: TabsProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue)
    }
  }, [defaultValue, isControlled])

  const activeValue = isControlled ? value! : internalValue

  const handleSelect = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  const contextValue = useMemo(
    () => ({
      value: activeValue,
      onSelect: handleSelect,
    }),
    [activeValue],
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export default Tabs

