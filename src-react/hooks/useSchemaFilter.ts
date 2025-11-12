import { useCallback, useEffect, useMemo, useState } from 'react'

import { ITEM_CATEGORY } from '../../src/data/schemas/item'

export type SchemaFilterOption = '' | ITEM_CATEGORY

const STORAGE_KEY = 'moma_item_schema_filter'

function readStoredSchema(): SchemaFilterOption {
  try {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (stored && Object.values(ITEM_CATEGORY).includes(stored as ITEM_CATEGORY)) {
      return stored as ITEM_CATEGORY
    }
  } catch (error) {
    console.warn('Failed to load schema filter from localStorage:', error)
  }
  return ''
}

function writeStoredSchema(schema: SchemaFilterOption) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, schema)
    }
  } catch (error) {
    console.warn('Failed to save schema filter to localStorage:', error)
  }
}

export function useSchemaFilter() {
  const [selectedSchema, setSelectedSchema] = useState<SchemaFilterOption>(() => readStoredSchema())

  const updateSchema = useCallback((schema: SchemaFilterOption) => {
    setSelectedSchema(schema)
    writeStoredSchema(schema)
  }, [])

  const resetSchema = useCallback(() => {
    setSelectedSchema('')
    writeStoredSchema('')
  }, [])

  useEffect(() => {
    // Sync with storage changes (e.g., across tabs)
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        const nextValue = event.newValue as SchemaFilterOption | null
        setSelectedSchema(nextValue ?? '')
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorage)
      return () => window.removeEventListener('storage', handleStorage)
    }
    return undefined
  }, [])

  const availableSchemas = useMemo(
    () => [
      { value: '' as SchemaFilterOption, label: '전체' },
      ...Object.values(ITEM_CATEGORY).map((category) => ({
        value: category as SchemaFilterOption,
        label: category,
      })),
    ],
    [],
  )

  return {
    selectedSchema,
    updateSchema,
    resetSchema,
    availableSchemas,
  }
}


