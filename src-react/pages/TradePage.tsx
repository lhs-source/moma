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
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import CategoryTitle from '../components/ui/CategoryTitle'
import Input from '../components/ui/Input'
import PageTitle from '../components/ui/PageTitle'
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
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageTitle>물물교환</PageTitle>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-4">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SectionTitle>교환 목록</SectionTitle>
              <div className="w-full sm:w-64">
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="아이템 이름 검색..."
                />
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(filteredTrades).map(([location, trades]) => (
                <Card key={location}>
                  <Accordion defaultOpen>
                    <AccordionTrigger className="px-4">
                      <div className="mr-4 flex flex-1 items-center justify-between">
                        <CategoryTitle size="lg">{location}</CategoryTitle>
                        <Button
                          variant={disabledLocations.has(location) ? 'secondary' : 'default'}
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation()
                            toggleLocation(
                              location,
                              trades.map((trade) => trade.id),
                            )
                          }}
                        >
                          {disabledLocations.has(location) ? '마을 비활성화' : '마을 활성화'}
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 px-4 pb-4">
                        {trades.map((trade, index) => (
                          <TradeItem key={`${trade.id}-${index}`} trade={trade} />
                        ))}
                      </div>
                    </AccordionContent>
                  </Accordion>
                </Card>
              ))}
            </div>

            {Object.keys(filteredTrades).length === 0 ? (
              <Card className="py-8">
                <div className="text-center text-muted-foreground">검색 결과가 없습니다.</div>
              </Card>
            ) : null}
          </Card>
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <WeeklySummaryTable weeklyRequirements={weeklyRequirements} recipes={recipes} />
        </div>
      </div>
    </div>
  )
}

export default TradePage

