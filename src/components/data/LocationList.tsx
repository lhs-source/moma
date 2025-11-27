import { useEffect, useMemo, useState } from 'react'

import { useLocationDataStore } from '../../stores/locationDataStore'
import Input from '../ui/Input'

export function LocationList() {
  const initialize = useLocationDataStore((state) => state.initialize)
  const getFilteredLocations = useLocationDataStore((state) => state.getFilteredLocations)

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    initialize()
  }, [initialize])

  const filteredLocations = useMemo(
    () => getFilteredLocations({ searchQuery }),
    [getFilteredLocations, searchQuery],
  )

  return (
    <div className="space-y-4">
      <Input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="위치 이름 검색..."
      />

      {filteredLocations.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className="rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">{location.name}</h3>
                {location.npcs.length > 0 ? (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">NPC</div>
                    <div className="flex flex-wrap gap-1">
                      {location.npcs.map((npc) => (
                        <span
                          key={npc.id}
                          className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
                        >
                          {npc.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">NPC 없음</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-lg font-medium">위치를 찾을 수 없습니다</p>
          <p className="text-sm text-muted-foreground">검색어를 변경해보세요</p>
        </div>
      )}
    </div>
  )
}

export default LocationList


