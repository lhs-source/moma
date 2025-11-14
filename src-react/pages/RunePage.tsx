import PageTitle from '../components/ui/PageTitle'
import RuneList from '../components/rune/RuneList'

export function RunePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle>8성 룬 도감</PageTitle>
      </div>
      <RuneList />
    </div>
  )
}

export default RunePage


