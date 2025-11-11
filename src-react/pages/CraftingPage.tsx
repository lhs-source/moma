import PageTitle from '../components/ui/PageTitle'
import { Tabs } from '../components/ui/tabs/Tabs'
import { TabsList } from '../components/ui/tabs/TabsList'
import { TabsTrigger } from '../components/ui/tabs/TabsTrigger'
import { TabsContent } from '../components/ui/tabs/TabsContent'
import CategoryList from '../components/crafting/CategoryList'
import ItemList from '../components/crafting/ItemList'
import SelectedItems from '../components/crafting/SelectedItems'
import CraftingResults from '../components/crafting/CraftingResults'
import MembershipToggle from '../components/crafting/MembershipToggle'
import {
  useCraftingStore,
  selectActiveTab,
  type CraftingTabType,
} from '../stores/craftingStore'

export function CraftingPage() {
  const activeTab = useCraftingStore(selectActiveTab)
  const setActiveTab = useCraftingStore((state) => state.setActiveTab)

  const handleTabChange = (value: string) => {
    setActiveTab(value as CraftingTabType)
  }

  const renderTabContent = () => (
    <div className="grid h-[calc(100vh-150px)] grid-cols-1 gap-3 lg:grid-cols-2">
      <div className="flex flex-col space-y-2">
        <CategoryList />
        <ItemList />
      </div>
      <div className="flex flex-col space-y-2">
        <SelectedItems />
        <CraftingResults />
      </div>
    </div>
  )

  return (
    <div className="crafting-view container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <PageTitle size="md">가공 시스템</PageTitle>
        <MembershipToggle />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="processing" className="w-full">
        <TabsList className="mb-3 flex gap-2">
          <TabsTrigger value="processing">재료 가공</TabsTrigger>
          <TabsTrigger value="crafting">제작</TabsTrigger>
        </TabsList>

        <TabsContent value="processing">{renderTabContent()}</TabsContent>
        <TabsContent value="crafting">{renderTabContent()}</TabsContent>
      </Tabs>
    </div>
  )
}

export default CraftingPage

