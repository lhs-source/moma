import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import { Tabs } from '../components/ui/tabs/Tabs'
import { TabsContent } from '../components/ui/tabs/TabsContent'
import { TabsList } from '../components/ui/tabs/TabsList'
import { TabsTrigger } from '../components/ui/tabs/TabsTrigger'
import ItemList from '../components/data/ItemList'
import LocationList from '../components/data/LocationList'
import NPCList from '../components/data/NPCList'
import PurchaseList from '../components/data/PurchaseList'
import RecipeList from '../components/data/RecipeList'

type TabValue = 'items' | 'recipes' | 'npcs' | 'locations' | 'purchases'

const VALID_TABS: TabValue[] = ['items', 'recipes', 'npcs', 'locations', 'purchases']
const DEFAULT_TAB: TabValue = 'items'

function isValidTab(value: string | null): value is TabValue {
  return value !== null && VALID_TABS.includes(value as TabValue)
}

export function DataPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabValue>(DEFAULT_TAB)

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab')
    if (isValidTab(tabFromUrl)) {
      setActiveTab((prev) => (prev === tabFromUrl ? prev : tabFromUrl))
    } else if (tabFromUrl !== null) {
      const next = new URLSearchParams(searchParams)
      next.set('tab', DEFAULT_TAB)
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const handleTabChange = (value: string) => {
    if (!isValidTab(value)) return
    if (activeTab === value && searchParams.get('tab') === value) {
      return
    }

    setActiveTab(value)

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('tab', value)
      return next
    }, { replace: true })
  }

  const tabList = useMemo(
    () => [
      { value: 'items' as TabValue, label: '아이템' },
      { value: 'recipes' as TabValue, label: '레시피' },
      { value: 'npcs' as TabValue, label: 'NPC' },
      { value: 'locations' as TabValue, label: '위치' },
      { value: 'purchases' as TabValue, label: '구매정보' },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle>데이터 목록</PageTitle>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue={DEFAULT_TAB}>
        <TabsList className="grid w-full grid-cols-5">
          {tabList.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="items">
          <ItemList />
        </TabsContent>
        <TabsContent value="recipes">
          <RecipeList />
        </TabsContent>
        <TabsContent value="npcs">
          <NPCList />
        </TabsContent>
        <TabsContent value="locations">
          <LocationList />
        </TabsContent>
        <TabsContent value="purchases">
          <PurchaseList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DataPage


