import { useEffect, useMemo, useState } from 'react'

import { recipes } from '../../src/data/recipes'
import { getItemById } from '../lib/dataAccess'
import {
  computeActiveTrades,
  computeWeeklyRequirements,
  filterTradesBySearch,
  groupTradesByLocation,
  sortTrades,
  type WeeklyTrade,
} from '../lib/tradeCalculations'
import Accordion, { AccordionContent, AccordionTrigger } from '../components/ui/Accordion'
import CategoryTitle from '../components/ui/CategoryTitle'
import Input from '../components/ui/Input'
import SectionTitle from '../components/ui/SectionTitle'
import TradeItem from '../components/trade/TradeItem'
import WeeklySummaryTable from '../components/trade/WeeklySummaryTable'
import { useTradeStore } from '../stores/tradeStore'

export function TradePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const tradeList = useTradeStore((state) => state.tradeList)
  const disabledTrades = useTradeStore((state) => state.disabledTrades)
  const favoriteTrades = useTradeStore((state) => state.favoriteTrades)
  const disabledLocations = useTradeStore((state) => state.disabledLocations)
  const toggleLocation = useTradeStore((state) => state.toggleLocation)
  const loadFromStorage = useTradeStore((state) => state.loadFromStorage)

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  const tradesByLocation = useMemo(
    () => groupTradesByLocation(tradeList),
    [tradeList],
  )

  const formattedTrades = useMemo(
    () => sortTrades(tradesByLocation, disabledTrades, favoriteTrades),
    [tradesByLocation, disabledTrades, favoriteTrades],
  )

  const filteredTrades = useMemo(
    () =>
      filterTradesBySearch(
        formattedTrades,
        searchQuery,
        (itemId) => getItemById(itemId)?.name,
      ),
    [formattedTrades, searchQuery],
  )

  const activeTrades = useMemo(
    () => computeActiveTrades(tradeList, disabledTrades),
    [tradeList, disabledTrades],
  )

  const weeklyRequirements: WeeklyTrade = useMemo(
    () => computeWeeklyRequirements(activeTrades, recipes),
    [activeTrades],
  )

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle>교환 목록</SectionTitle>
            <div className="w-64">
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="아이템 이름 검색..."
              />
            </div>
          </div>

          <div className="grid gap-4">
            {Object.entries(filteredTrades).map(([location, trades]) => (
              <div key={location} className="rounded-lg border border-border bg-card">
                <Accordion defaultOpen className="px-4">
                  <AccordionTrigger>
                    <div className="mr-4 flex flex-1 items-center justify-between">
                      <CategoryTitle size="lg">{location}</CategoryTitle>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleLocation(
                            location,
                            trades.map((trade) => trade.id),
                          )
                        }}
                        className={[
                          'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                          disabledLocations.has(location)
                            ? 'bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90',
                        ].join(' ')}
                      >
                        {disabledLocations.has(location) ? '마을 비활성화' : '마을 활성화'}
                      </button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2 px-4">
                      {trades.map((trade, index) => (
                        <TradeItem key={`${trade.id}-${index}`} trade={trade} />
                      ))}
                    </div>
                  </AccordionContent>
                </Accordion>
              </div>
            ))}
          </div>

          {Object.keys(filteredTrades).length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">검색 결과가 없습니다.</div>
          ) : null}
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <WeeklySummaryTable weeklyRequirements={weeklyRequirements} recipes={recipes} />
        </div>
      </div>
    </div>
  )
}

export default TradePage

