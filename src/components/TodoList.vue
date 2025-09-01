<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  category: 'weekly' | 'daily'
}

const todos = ref<TodoItem[]>([
  { id: 'fieldboss', text: '필드보스 잡기', completed: false, category: 'weekly' },
  { id: 'abyss', text: '어비스 돌기', completed: false, category: 'weekly' },
  { id: 'glassgibnen', text: '레이드 글라스기브넨', completed: false, category: 'weekly' },
  { id: 'whitesuccubus', text: '레이드 화이트 서큐버스', completed: false, category: 'weekly' },
  { id: 'ingredients', text: '주간 식재료 구매', completed: false, category: 'weekly' },
  { id: 'membership', text: '멤버십 퀘스트', completed: false, category: 'weekly' },
  { id: 'monster', text: '마물 퇴치 증표 교환', completed: false, category: 'weekly' },
  { id: 'guild', text: '모험가 길드 정기 의뢰', completed: false, category: 'weekly' },
  { id: 'abyss_reward', text: '어비스 보상 받기', completed: false, category: 'daily' },
  { id: 'blackhole', text: '검은 구멍', completed: false, category: 'daily' },
  { id: 'silvercoin', text: '은동전 소모', completed: false, category: 'daily' },
  { id: 'tribute', text: '공물 소모', completed: false, category: 'daily' },
  { id: 'daily_job', text: '일일 아르바이트', completed: false, category: 'daily' },
  { id: 'abyss_blackhole', text: '어비스 검은 구멍', completed: false, category: 'daily' },
])

// 로컬 스토리지에서 TODO 상태 로드
onMounted(() => {
  const savedTodos = localStorage.getItem('moma-todos')
  const lastResetDate = localStorage.getItem('moma-last-reset')
  const lastDailyResetDate = localStorage.getItem('moma-last-daily-reset')
  const today = new Date().toDateString()

  if (savedTodos) {
    try {
      const parsedTodos = JSON.parse(savedTodos)
      // 기존 저장된 항목들과 새로운 기본 항목들을 병합
      const mergedTodos = todos.value.map(defaultTodo => {
        const savedTodo = parsedTodos.find((t: TodoItem) => t.id === defaultTodo.id)
        return savedTodo || defaultTodo
      })

      // 저장된 항목 중에서 기본 항목에 없는 새로운 항목들도 추가
      const newSavedTodos = parsedTodos.filter((savedTodo: TodoItem) =>
        !todos.value.some(defaultTodo => defaultTodo.id === savedTodo.id)
      )

      todos.value = [...mergedTodos, ...newSavedTodos]
    } catch (e) {
      console.error('Failed to parse saved todos:', e)
    }
  }

  // 월요일이면 주간 TODO 자동 리셋
  const currentDay = new Date().getDay() // 0: 일요일, 1: 월요일
  if (currentDay === 1 && lastResetDate !== today) {
    weeklyTodos.value.forEach(todo => {
      todo.completed = false
    })
    localStorage.setItem('moma-last-reset', today)
    saveTodos()
  }

  // 매일 자정에 일일 TODO 자동 리셋
  if (lastDailyResetDate !== today) {
    dailyTodos.value.forEach(todo => {
      todo.completed = false
    })
    localStorage.setItem('moma-last-daily-reset', today)
    saveTodos()
  }
})

// TODO 상태 변경 시 로컬 스토리지에 저장
const saveTodos = () => {
  localStorage.setItem('moma-todos', JSON.stringify(todos.value))
}

const weeklyTodos = computed(() => todos.value.filter(todo => todo.category === 'weekly'))
const dailyTodos = computed(() => todos.value.filter(todo => todo.category === 'daily'))

const toggleTodo = (todoId: string) => {
  const todo = todos.value.find(t => t.id === todoId)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

const resetWeeklyTodos = () => {
  weeklyTodos.value.forEach(todo => {
    todo.completed = false
  })
  saveTodos()
}

const resetDailyTodos = () => {
  dailyTodos.value.forEach(todo => {
    todo.completed = false
  })
  saveTodos()
}
</script>

<template>
  <div class="todo-list">
    <h2 class="text-xl font-bold mb-4">TODO 목록</h2>

    <!-- 월요일 리셋 -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-semibold text-blue-600">월요일 리셋</h3>
        <button @click="resetWeeklyTodos" class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          리셋
        </button>
      </div>
      <div class="space-y-2">
        <div v-for="todo in weeklyTodos" :key="todo.id"
          class="flex items-center p-2 bg-white border rounded-lg hover:bg-gray-50">
          <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" class="mr-3" />
          <span :class="{ 'line-through text-gray-500': todo.completed }">
            {{ todo.text }}
          </span>
        </div>
      </div>
    </div>

    <!-- 일일 -->
    <div>
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-semibold text-green-600">일일</h3>
        <button @click="resetDailyTodos" class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
          리셋
        </button>
      </div>
      <div class="space-y-2">
        <div v-for="todo in dailyTodos" :key="todo.id"
          class="flex items-center p-2 bg-white border rounded-lg hover:bg-gray-50">
          <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" class="mr-3" />
          <span :class="{ 'line-through text-gray-500': todo.completed }">
            {{ todo.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
