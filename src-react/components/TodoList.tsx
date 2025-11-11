import { useEffect, useMemo, useState } from 'react'

import { cn } from '../lib/utils'

type TodoCategory = 'weekly' | 'daily'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  category: TodoCategory
}

const DEFAULT_TODOS: TodoItem[] = [
  { id: 'fieldboss', text: '필드보스 잡기', completed: false, category: 'weekly' },
  { id: 'abyss', text: '어비스 돌기', completed: false, category: 'weekly' },
  { id: 'glassgibnen', text: '레이드 글라스기브넨', completed: false, category: 'weekly' },
  { id: 'whitesuccubus', text: '레이드 화이트 서큐버스', completed: false, category: 'weekly' },
  { id: 'ingredients', text: '주간 식재료 구매', completed: false, category: 'weekly' },
  { id: 'membership', text: '멤버십 퀘스트', completed: false, category: 'weekly' },
  { id: 'monster', text: '마물 퇴치 증표 교환', completed: false, category: 'weekly' },
  { id: 'guild', text: '모험가 길드 정기 의뢰', completed: false, category: 'weekly' },
  { id: 'abyss_reward', text: '어비스 보상 받기', completed: false, category: 'weekly' },
  { id: 'blackhole', text: '검은 구멍', completed: false, category: 'daily' },
  { id: 'silvercoin', text: '은동전 소모', completed: false, category: 'daily' },
  { id: 'tribute', text: '공물 소모', completed: false, category: 'daily' },
  { id: 'daily_job', text: '일일 아르바이트', completed: false, category: 'daily' },
  { id: 'abyss_blackhole', text: '어비스 검은 구멍', completed: false, category: 'daily' },
]

function mergeTodos(saved: TodoItem[]) {
  const merged = DEFAULT_TODOS.map((defaultTodo) => {
    const savedTodo = saved.find((item) => item.id === defaultTodo.id)
    return savedTodo ?? defaultTodo
  })

  const newSavedTodos = saved.filter(
    (savedTodo) => !DEFAULT_TODOS.some((defaultTodo) => defaultTodo.id === savedTodo.id),
  )

  return [...merged, ...newSavedTodos]
}

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>(() => DEFAULT_TODOS)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const savedTodos = window.localStorage.getItem('moma-todos')
    const lastResetDate = window.localStorage.getItem('moma-last-reset')
    const lastDailyResetDate = window.localStorage.getItem('moma-last-daily-reset')
    const today = new Date().toDateString()
    const currentDay = new Date().getDay()

    let initialTodos = DEFAULT_TODOS

    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos) as TodoItem[]
        initialTodos = mergeTodos(parsed)
      } catch (error) {
        console.error('Failed to parse saved todos:', error)
      }
    }

    let nextTodos = initialTodos

    if (currentDay === 1 && lastResetDate !== today) {
      nextTodos = nextTodos.map((todo) =>
        todo.category === 'weekly' ? { ...todo, completed: false } : todo,
      )
      window.localStorage.setItem('moma-last-reset', today)
    }

    if (lastDailyResetDate !== today) {
      nextTodos = nextTodos.map((todo) =>
        todo.category === 'daily' ? { ...todo, completed: false } : todo,
      )
      window.localStorage.setItem('moma-last-daily-reset', today)
    }

    setTodos(nextTodos)
    window.localStorage.setItem('moma-todos', JSON.stringify(nextTodos))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem('moma-todos', JSON.stringify(todos))
  }, [hydrated, todos])

  const weeklyTodos = useMemo(
    () => todos.filter((todo) => todo.category === 'weekly'),
    [todos],
  )
  const dailyTodos = useMemo(
    () => todos.filter((todo) => todo.category === 'daily'),
    [todos],
  )

  function toggleTodo(todoId: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function resetWeeklyTodos() {
    const today = new Date().toDateString()
    setTodos((prev) =>
      prev.map((todo) =>
        todo.category === 'weekly' ? { ...todo, completed: false } : todo,
      ),
    )
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('moma-last-reset', today)
    }
  }

  function resetDailyTodos() {
    const today = new Date().toDateString()
    setTodos((prev) =>
      prev.map((todo) =>
        todo.category === 'daily' ? { ...todo, completed: false } : todo,
      ),
    )
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('moma-last-daily-reset', today)
    }
  }

  return (
    <div className="todo-list">
      <h2 className="mb-4 text-xl font-bold text-foreground">TODO 목록</h2>

      <div className="mb-6 space-y-2">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">월요일 리셋</h3>
          <button
            type="button"
            onClick={resetWeeklyTodos}
            className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
          >
            리셋
          </button>
        </div>
        {weeklyTodos.map((todo) => (
          <label
            key={todo.id}
            className="flex items-center rounded-lg border border-border bg-card p-2 hover:bg-accent"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-3 accent-primary"
            />
            <span
              className={cn(
                'text-foreground',
                todo.completed && 'line-through text-muted-foreground',
              )}
            >
              {todo.text}
            </span>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">일일</h3>
          <button
            type="button"
            onClick={resetDailyTodos}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            리셋
          </button>
        </div>
        {dailyTodos.map((todo) => (
          <label
            key={todo.id}
            className="flex items-center rounded-lg border border-border bg-card p-2 hover:bg-accent"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-3 accent-primary"
            />
            <span
              className={cn(
                'text-foreground',
                todo.completed && 'line-through text-muted-foreground',
              )}
            >
              {todo.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TodoList

