import { useMemo, useState } from 'react'

import { RuneGrade, RuneType, runes, type Rune } from '../../../src/data/equip/weapons'
import Input from '../ui/Input'
import { Select } from '../ui/select/Select'
import { SelectContent } from '../ui/select/SelectContent'
import { SelectItem } from '../ui/select/SelectItem'
import { SelectTrigger } from '../ui/select/SelectTrigger'
import { SelectValue } from '../ui/select/SelectValue'
import RuneCard from './RuneCard'
import RuneDetailSheet from './RuneDetailSheet'

interface RuneTypeOption {
  value: RuneType
  label: string
}

interface RuneGradeOption {
  value: RuneGrade
  label: string
}

const runeTypes: RuneTypeOption[] = [
  { value: RuneType.Weapon, label: RuneType.Weapon },
  { value: RuneType.Armor, label: RuneType.Armor },
  { value: RuneType.Accessory, label: RuneType.Accessory },
]

const runeGrades: RuneGradeOption[] = [
  { value: RuneGrade.Legendary, label: RuneGrade.Legendary },
  { value: RuneGrade.Mythic, label: RuneGrade.Mythic },
]

export function RuneList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<RuneType | ''>('')
  const [selectedGrade, setSelectedGrade] = useState<RuneGrade | ''>('')
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredRunes = useMemo(() => {
    const lowered = searchQuery.trim().toLowerCase()
    return runes.filter((rune) => {
      const matchesSearch =
        lowered.length === 0 ||
        rune.name.toLowerCase().includes(lowered) ||
        rune.id.toLowerCase().includes(lowered)
      const matchesType = !selectedType || rune.type === selectedType
      const matchesGrade = !selectedGrade || rune.grade === selectedGrade
      return matchesSearch && matchesType && matchesGrade
    })
  }, [searchQuery, selectedGrade, selectedType])

  function openDetail(rune: Rune) {
    setSelectedRune(rune)
    setIsDetailOpen(true)
  }

  function handleDetailOpenChange(open: boolean) {
    if (!open) {
      setIsDetailOpen(false)
      // wait for animation? we don't have, but consistent to clear
      setTimeout(() => setSelectedRune(null), 200)
    } else {
      setIsDetailOpen(true)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="룬 이름 또는 ID 검색..."
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={selectedType} onValueChange={(value) => setSelectedType((value as RuneType) || '')}>
            <SelectTrigger>
              <SelectValue>{selectedType || '모든 타입'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">모든 타입</SelectItem>
              {runeTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={selectedGrade}
            onValueChange={(value) => setSelectedGrade((value as RuneGrade) || '')}
          >
            <SelectTrigger>
              <SelectValue>{selectedGrade || '모든 등급'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">모든 등급</SelectItem>
              {runeGrades.map((grade) => (
                <SelectItem key={grade.value} value={grade.value}>
                  {grade.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">총 {filteredRunes.length}개의 룬</div>

      {filteredRunes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRunes.map((rune) => (
            <RuneCard key={rune.id} rune={rune} onClick={openDetail} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border py-12 text-center text-muted-foreground">
          검색 조건에 맞는 룬이 없습니다.
        </div>
      )}

      <RuneDetailSheet rune={selectedRune} open={isDetailOpen} onOpenChange={handleDetailOpenChange} />
    </div>
  )
}

export default RuneList


