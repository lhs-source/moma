<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThemeToggle from '@/components/ui/theme-toggle.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="border-b">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <RouterLink to="/" class="text-xl font-bold text-primary">Mabinogi Mobile</RouterLink>
          </div>
          <div class="flex items-center space-x-6">
            <RouterLink to="/" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-foreground">
              홈
            </RouterLink>
            <RouterLink to="/trade"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-foreground">
              물물교환
            </RouterLink>
            <RouterLink to="/crafting"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-foreground">
              제작 시스템
            </RouterLink>
            <RouterLink to="/data"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-foreground">
              데이터 목록
            </RouterLink>
            <RouterLink to="/cooking"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-foreground">
              요리 시뮬레이팅
            </RouterLink>
            <RouterLink to="/events"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-foreground">
              이벤트 캘린더
            </RouterLink>
            <RouterLink to="/rune"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-foreground">
              룬 도감
            </RouterLink>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.router-link-active {
  color: rgb(var(--foreground));
}
</style>
