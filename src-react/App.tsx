import { NavLink, Route, Routes } from 'react-router-dom'

import ThemeToggle from './components/ui/ThemeToggle'
import ComingSoonPage from './pages/ComingSoonPage'
import CookingPage from './pages/CookingPage'
import CraftingPage from './pages/CraftingPage'
import DataPage from './pages/DataPage'
import EventPage from './pages/EventPage'
import HomePage from './pages/HomePage'
import TradePage from './pages/TradePage'

const navigation = [
  { to: '/', label: '홈' },
  { to: '/trade', label: '물물교환' },
  { to: '/crafting', label: '제작 시스템' },
  { to: '/data', label: '데이터 목록' },
  { to: '/cooking', label: '요리 시뮬레이팅' },
  { to: '/events', label: '이벤트 캘린더' },
  { to: '/rune', label: '룬 도감' },
]

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <NavLink to="/" className="text-xl font-bold text-primary">
              Mabinogi Mobile
            </NavLink>

            <div className="flex items-center gap-6">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'text-sm font-medium transition-colors',
                      'text-muted-foreground hover:text-foreground',
                      isActive ? 'text-foreground' : '',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trade" element={<TradePage />} />
          <Route path="/crafting" element={<CraftingPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/cooking" element={<CookingPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route
            path="/report"
            element={<ComingSoonPage title="보고서 생성" />}
          />
          <Route
            path="/report/list"
            element={<ComingSoonPage title="보고서 목록" />}
          />
          <Route
            path="/report/:id"
            element={<ComingSoonPage title="보고서 상세" />}
          />
          <Route
            path="/rune"
            element={<ComingSoonPage title="룬 도감" />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App

