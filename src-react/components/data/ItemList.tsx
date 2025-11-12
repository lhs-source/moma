import { useEffect, useMemo, useState } from 'react'

import { useSchemaFilter } from '../../hooks/useSchemaFilter'
import { useItemDataStore } from '../../stores/itemDataStore'
import ItemFilters from './ItemFilters'
import ItemRow from './ItemRow'
import ItemSchemaFilter from './ItemSchemaFilter'

export function ItemList() {
  const initialize = useItemDataStore((state) => state.initialize)
  const categories = useItemDataStore((state) => state.categories)
  const schemaCounts = useItemDataStore((state) => state.schemaCounts)
  const getFilteredItems = useItemDataStore((state) => state.getFilteredItems)

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedUsageType, setSelectedUsageType] = useState('')

  const { selectedSchema, updateSchema, availableSchemas } = useSchemaFilter()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  const schemaOptions = useMemo(
    () =>
      availableSchemas.map((schema) => ({
        ...schema,
        count: schemaCounts[schema.value] ?? (schema.value === '' ? schemaCounts[''] : undefined),
      })),
    [availableSchemas, schemaCounts],
  )

  const filteredItems = useMemo(
    () =>
      getFilteredItems({
        searchQuery: debouncedSearchQuery,
        category: selectedCategory || undefined,
        usageType: selectedUsageType || undefined,
        schema: selectedSchema || undefined,
      }),
    [debouncedSearchQuery, selectedCategory, selectedUsageType, selectedSchema, getFilteredItems],
  )

  return (
    <div className="space-y-4">
      <ItemFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
        usageType={selectedUsageType}
        onUsageTypeChange={setSelectedUsageType}
        categories={categories}
      />

      <ItemSchemaFilter
        selectedSchema={selectedSchema}
        availableSchemas={schemaOptions}
        schemaCounts={schemaCounts}
        onSchemaChange={updateSchema}
      />

      <div className="text-sm text-muted-foreground">총 {filteredItems.length}개의 아이템</div>

      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b">
                <th className="w-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  이미지
                </th>
                <th className="w-48 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  기본 정보
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  사용처 상세
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-muted-foreground">검색 조건에 맞는 아이템이 없습니다.</p>
        </div>
      ) : null}
    </div>
  )
}

export default ItemList


