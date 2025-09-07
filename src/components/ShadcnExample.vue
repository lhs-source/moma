<template>
  <div class="p-6 space-y-4">
    <h2 class="text-2xl font-bold">shadcn/vue 컴포넌트 예제</h2>

    <!-- Button 예제 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Button 컴포넌트</h3>
      <div class="flex gap-2 flex-wrap">
        <Button>기본 버튼</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🚀</Button>
      </div>
    </div>

    <!-- Card 예제 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Card 컴포넌트</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>카드 제목</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              이것은 shadcn/vue Card 컴포넌트의 예제입니다.
              아름다운 디자인과 접근성을 제공합니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>또 다른 카드</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              shadcn/vue는 Radix UI와 Tailwind CSS를 기반으로 한
              재사용 가능한 컴포넌트 라이브러리입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './ui/button.vue'
import Card from './ui/card.vue'
import CardHeader from './ui/card-header.vue'
import CardTitle from './ui/card-title.vue'
import CardContent from './ui/card-content.vue'
</script>
