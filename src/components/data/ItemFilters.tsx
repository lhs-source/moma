import type { ChangeEvent } from 'react'

import Input from '../ui/Input'
import { Select } from '../ui/select/Select'
import { SelectContent } from '../ui/select/SelectContent'
import { SelectItem } from '../ui/select/SelectItem'
import { SelectTrigger } from '../ui/select/SelectTrigger'
import { SelectValue } from '../ui/select/SelectValue'

export interface ItemFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  usageType: string
  onUsageTypeChange: (value: string) => void
  categories: string[]
}

export function ItemFilters({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  usageType,
  onUsageTypeChange,
  categories,
}: ItemFiltersProps) {
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Input
        value={searchQuery}
        onChange={handleSearchInput}
        type="text"
        placeholder="아이템 이름 또는 ID로 검색..."
      />

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue>모든 카테고리</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 카테고리</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={usageType} onValueChange={onUsageTypeChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue>모든 사용처</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 사용처</SelectItem>
          <SelectItem value="레시피">레시피 재료</SelectItem>
          <SelectItem value="교환">교환 아이템</SelectItem>
          <SelectItem value="구매">구매 가능</SelectItem>
          <SelectItem value="제작">제작 가능</SelectItem>
          <SelectItem value="교환으로 얻을 수 있음">교환으로 얻을 수 있음</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ItemFilters


