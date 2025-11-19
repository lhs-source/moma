import PageTitle from '../components/ui/PageTitle'
import RuneList from '../components/rune/RuneList'

export function RunePage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle>8성 룬 도감</PageTitle>
      </div>
      <RuneList />
    </div>
  )
}

export default RunePage


