import { useEffect, useMemo, useState } from 'react'

import { usePurchaseDataStore, type EnrichedPurchaseItem } from '../../stores/purchaseDataStore'
import Input from '../ui/Input'
import { Select } from '../ui/select/Select'
import { SelectContent } from '../ui/select/SelectContent'
import { SelectItem } from '../ui/select/SelectItem'
import { SelectTrigger } from '../ui/select/SelectTrigger'
import { SelectValue } from '../ui/select/SelectValue'

function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = 'none'
}

export function PurchaseList() {
  const initialize = usePurchaseDataStore((state) => state.initialize)
  const getFilteredPurchases = usePurchaseDataStore((state) => state.getFilteredPurchases)
  const getUniqueNPCs = usePurchaseDataStore((state) => state.getUniqueNPCs)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNpc, setSelectedNpc] = useState('')
  const [collectibleOnly, setCollectibleOnly] = useState(false)

  useEffect(() => {
    initialize()
  }, [initialize])

  const filteredPurchases = useMemo(
    () =>
      getFilteredPurchases({
        searchQuery,
        npcId: selectedNpc || undefined,
        collectibleOnly,
      }),
    [collectibleOnly, getFilteredPurchases, searchQuery, selectedNpc],
  )

  const groupedPurchases = useMemo(() => {
    const groups = new Map<
      string,
      {
        npcId: string
        npcName: string
        locationName: string
        items: EnrichedPurchaseItem[]
      }
    >()

    filteredPurchases.forEach((purchase) => {
      if (!groups.has(purchase.npcId)) {
        groups.set(purchase.npcId, {
          npcId: purchase.npcId,
          npcName: purchase.npcName,
          locationName: purchase.locationName,
          items: [],
        })
      }
      groups.get(purchase.npcId)!.items.push(purchase)
    })

    return Array.from(groups.values()).sort((a, b) => a.npcName.localeCompare(b.npcName))
  }, [filteredPurchases, getFilteredPurchases])

  const uniqueNPCs = useMemo(() => getUniqueNPCs(), [getUniqueNPCs])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="아이템명 검색..."
        />

        <Select value={selectedNpc} onValueChange={setSelectedNpc}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue>
              {selectedNpc
                ? uniqueNPCs.find((npc) => npc.id === selectedNpc)?.name ?? 'NPC 선택'
                : 'NPC 선택'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">모든 NPC</SelectItem>
            {uniqueNPCs.map((npc) => (
              <SelectItem key={npc.id} value={npc.id}>
                {npc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={collectibleOnly}
            onChange={(event) => setCollectibleOnly(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>채집 가능만</span>
        </label>
      </div>

      <div className="text-sm text-muted-foreground">
        총 {groupedPurchases.length}명의 NPC, {filteredPurchases.length}개의 아이템
      </div>

      {groupedPurchases.length > 0 ? (
        <div className="space-y-6">
          {groupedPurchases.map((group) => (
            <div key={group.npcId} className="overflow-hidden rounded-lg border">
              <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
                <div>
                  <h3 className="text-lg font-semibold">{group.npcName}</h3>
                  <p className="text-sm text-muted-foreground">{group.locationName}</p>
                </div>
                <span className="text-sm text-muted-foreground">{group.items.length}개 아이템</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/30">
                    <tr>
                      <th className="w-16 px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        이미지
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        아이템명
                      </th>
                      <th className="w-28 px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        가격
                      </th>
                      <th className="w-24 px-3 py-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        채집 가능
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {group.items.map((item) => (
                      <tr key={`${group.npcId}-${item.itemId}`} className="transition-colors hover:bg-muted/30">
                        <td className="px-3 py-2 align-top">
                          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-muted">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.itemName}
                                className="h-full w-full object-cover"
                                onError={handleImageError}
                              />
                            ) : (
                              <span className="text-xs text-muted-foreground">이미지 없음</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 align-top">
                          <div className="text-sm font-medium text-foreground">{item.itemName}</div>
                          <div className="mt-0.5 text-xs text-muted-foreground">ID: {item.itemId}</div>
                        </td>
                        <td className="px-3 py-2 align-top text-right">
                          <span className="text-sm font-semibold text-green-600">
                            {item.price.toLocaleString()}골드
                          </span>
                        </td>
                        <td className="px-3 py-2 align-top text-center">
                          {item.isCollectible ? (
                            <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-900 dark:bg-green-700 dark:text-green-100">
                              채집 가능
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              구매 전용
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border py-12 text-center text-muted-foreground">
          검색 조건에 맞는 구매 정보가 없습니다.
        </div>
      )}
    </div>
  )
}

export default PurchaseList


