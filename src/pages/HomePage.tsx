import Card from '../components/ui/Card'
import PageTitle from '../components/ui/PageTitle'
import TimerInfo from '../components/TimerInfo'
import TodoList from '../components/TodoList'

export function HomePage() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <PageTitle className="text-center">마비노기 모바일 도우미</PageTitle>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <TimerInfo />
        </Card>
        <Card className="p-6">
          <TodoList />
        </Card>
      </div>
    </div>
  )
}

export default HomePage

