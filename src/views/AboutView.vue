<template>
  <div class="about container mx-auto px-4 py-8">
    <div class="bg-card border border-border rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-6 text-foreground">소개</h1>
      <div class="prose prose-slate dark:prose-invert max-w-none">
        <p class="text-muted-foreground text-lg leading-relaxed">
          마비노기 모바일 도우미는 게임 내 다양한 시스템을 효율적으로 관리할 수 있도록 도와주는 웹 애플리케이션입니다.
        </p>
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-foreground">주요 기능</h2>
        <ul class="space-y-2 text-muted-foreground">
          <li class="flex items-center gap-2">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            물물교환 시스템 관리
          </li>
          <li class="flex items-center gap-2">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            제작 시스템 시뮬레이션
          </li>
          <li class="flex items-center gap-2">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            요리 시뮬레이션
          </li>
          <li class="flex items-center gap-2">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            장비 시뮬레이터
          </li>
          <li class="flex items-center gap-2">
            <span class="w-2 h-2 bg-primary rounded-full"></span>
            아이템 및 레시피 데이터베이스
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
