import { createContext, useContext } from 'react'

interface TabsContextValue {
  value: string
  onSelect: (value: string) => void
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext(component: string) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error(`${component} must be used within a Tabs component`)
  }
  return context
}

