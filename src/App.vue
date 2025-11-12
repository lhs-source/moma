<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import ThemeToggle from '@/components/ui/theme-toggle.vue'

const navigationLinks = [
  { to: '/', label: '홈' },
  { to: '/trade', label: '물물교환' },
  { to: '/crafting', label: '제작 시스템' },
  { to: '/data', label: '데이터 목록' },
  { to: '/cooking', label: '요리 시뮬레이팅' },
  { to: '/events', label: '이벤트 캘린더' },
  { to: '/rune', label: '룬 도감' }
]

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function handleNavigate() {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="border-b">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex flex-wrap items-center justify-between gap-4">
          <RouterLink
            to="/"
            class="text-xl font-bold text-primary"
            @click="handleNavigate"
          >
            Mabinogi Mobile
          </RouterLink>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary lg:hidden"
            @click="toggleMenu"
            :aria-expanded="isMenuOpen"
            aria-controls="primary-navigation"
            :aria-label="isMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
          >
            <span class="sr-only">{{ isMenuOpen ? '메뉴 닫기' : '메뉴 열기' }}</span>
            <svg
              v-if="!isMenuOpen"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            :class="[
              'w-full lg:w-auto',
              isMenuOpen ? 'flex' : 'hidden',
              'flex-col',
              'gap-4',
              'border-t border-border pt-4',
              'lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-t-0 lg:pt-0'
            ]"
            id="primary-navigation"
          >
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6 lg:pt-0">
              <RouterLink
                v-for="link in navigationLinks"
                :key="link.to"
                :to="link.to"
                class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                active-class="text-foreground"
                @click="handleNavigate"
              >
                {{ link.label }}
              </RouterLink>
            </div>
            <div class="flex justify-start lg:justify-center">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
