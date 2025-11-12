import type { SchemaFilterOption } from '../../hooks/useSchemaFilter'

export interface ItemSchemaFilterProps {
  selectedSchema: SchemaFilterOption
  availableSchemas: Array<{ value: SchemaFilterOption; label: string; count?: number }>
  schemaCounts: Record<string, number>
  onSchemaChange: (value: SchemaFilterOption) => void
}

export function ItemSchemaFilter({
  selectedSchema,
  availableSchemas,
  schemaCounts,
  onSchemaChange,
}: ItemSchemaFilterProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-foreground">스키마별 필터</div>
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {availableSchemas.map((schema) => {
          const isActive = selectedSchema === schema.value
          const count = schema.count ?? schemaCounts[schema.value] ?? undefined
          return (
            <button
              key={schema.value}
              type="button"
              className={[
                'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-muted/80',
              ].join(' ')}
              onClick={() => onSchemaChange(schema.value)}
            >
              {schema.label}
              {count !== undefined ? <span className="ml-1 text-xs opacity-75">({count})</span> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ItemSchemaFilter


