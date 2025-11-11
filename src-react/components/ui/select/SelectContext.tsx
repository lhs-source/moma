import { createContext, useContext } from 'react'

interface SelectContextValue {
  value: string
  isOpen: boolean
  toggleOpen: () => void
  close: () => void
  setValue: (value: string) => void
}

export const SelectContext = createContext<SelectContextValue | null>(null)

export function useSelectContext(component: string): SelectContextValue {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error(`${component} must be used within a Select component`)
  }
  return context
}

