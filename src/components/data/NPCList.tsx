import { useEffect, useMemo, useState } from 'react'

import { useNpcDataStore, type EnrichedNPC } from '../../stores/npcDataStore'
import Input from '../ui/Input'
import { Select } from '../ui/select/Select'
import { SelectContent } from '../ui/select/SelectContent'
import { SelectItem } from '../ui/select/SelectItem'
import { SelectTrigger } from '../ui/select/SelectTrigger'
import { SelectValue } from '../ui/select/SelectValue'

function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = 'none'
}

export function NPCList() {
  const initialize = useNpcDataStore((state) => state.initialize)
  const locationCounts = useNpcDataStore((state) => state.locationCounts)
  const uniqueLocations = useNpcDataStore((state) => state.uniqueLocations)
  const getFilteredNPCs = useNpcDataStore((state) => state.getFilteredNPCs)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [tradeFilter, setTradeFilter] = useState('')
  const [selectedNpc, setSelectedNpc] = useState<EnrichedNPC | null>(null)

  useEffect(() => {
    initialize()
  }, [initialize])

  const filteredNPCs = useMemo(
    () =>
      getFilteredNPCs({
        searchQuery,
        locationId: selectedLocation || undefined,
        hasTrades: tradeFilter === '' ? undefined : tradeFilter === 'true',
      }),
    [getFilteredNPCs, searchQuery, selectedLocation, tradeFilter],
  )

  const locationOptions = useMemo(
    () => uniqueLocations.sort((a, b) => a.name.localeCompare(b.name)),
    [uniqueLocations],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="NPC 이름, 설명, 위치로 검색..."
        />

        <div className="flex gap-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {selectedLocation
                  ? locationOptions.find((option) => option.id === selectedLocation)?.name ?? '위치 선택'
                  : '위치 선택'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              {locationOptions.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name} ({locationCounts[location.id] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={tradeFilter} onValueChange={setTradeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue>
                {tradeFilter === '' ? '교환 여부' : tradeFilter === 'true' ? '교환 가능' : '교환 불가'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              <SelectItem value="true">교환 가능</SelectItem>
              <SelectItem value="false">교환 불가</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">총 {filteredNPCs.length}개의 NPC</div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {filteredNPCs.map((npc) => (
          <button
            key={npc.id}
            type="button"
            className="cursor-pointer rounded-lg border border-border bg-card p-3 text-left transition-shadow hover:shadow-md"
            onClick={() => setSelectedNpc(npc)}
          >
            <div className="mb-2 flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-muted">
              {npc.imageUrl ? (
                <img
                  src={npc.imageUrl}
                  alt={npc.name}
                  className="h-full w-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <span className="text-xs text-muted-foreground">이미지 없음</span>
              )}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">{npc.name}</h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">{npc.description}</p>
              <p className="text-xs text-muted-foreground">{npc.location.name}</p>
              {npc.tradeCount > 0 ? (
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <span>교환 가능</span>
                  <span className="rounded-full bg-blue-100 px-1 py-0.5 text-xs text-blue-800">
                    {npc.tradeCount}개
                  </span>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">교환 불가</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredNPCs.length === 0 ? (
        <div className="rounded-lg border py-12 text-center text-muted-foreground">
          검색 조건에 맞는 NPC가 없습니다.
        </div>
      ) : null}

      {selectedNpc ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-start gap-4">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              {selectedNpc.imageUrl ? (
                <img
                  src={selectedNpc.imageUrl}
                  alt={selectedNpc.name}
                  className="h-full w-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  이미지 없음
                </span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-lg font-semibold">{selectedNpc.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedNpc.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-muted px-2 py-1">{selectedNpc.location.name}</span>
                {selectedNpc.tradeCount > 0 ? (
                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                    물물교환 가능 {selectedNpc.tradeCount}개
                  </span>
                ) : (
                  <span className="rounded bg-gray-100 px-2 py-1 text-gray-600">물물교환 불가</span>
                )}
              </div>
            </div>
            <button
              type="button"
              className="rounded-md border border-border px-2 py-1 text-sm text-muted-foreground hover:bg-muted"
              onClick={() => setSelectedNpc(null)}
            >
              닫기
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">물물교환 가능 아이템</h3>
            {selectedNpc.availableTrades.length > 0 ? (
              <div className="space-y-2">
                {selectedNpc.availableTrades.map((trade) => (
                  <div key={trade.tradeId} className="rounded border border-border bg-background p-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        {trade.giveQuantity}x {trade.giveItemName}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium">
                        {trade.receiveQuantity}x {trade.receiveItemName}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {trade.type} · 최대 {trade.maxExchanges}회 교환 가능
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded border border-dashed py-6 text-center text-sm text-muted-foreground">
                물물교환 가능한 아이템이 없습니다.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NPCList


