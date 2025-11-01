<template>
  <div class="space-y-6">
    <!-- 헤더 -->
    <div class="flex items-center justify-between">
      <PageTitle>제보 상세</PageTitle>
      <Button variant="outline" @click="goBack">목록으로</Button>
    </div>

    <!-- 로딩/에러 -->
    <div v-if="loading" class="text-muted-foreground">불러오는 중...</div>
    <div v-else-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>

    <!-- 상세 카드 -->
    <Card v-else>
      <CardHeader>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{{ formatDate(report?.created_at || '') }}</span>
          <span>•</span>
          <span>{{ toKoreanType(report?.type || '') }}</span>
          <span>•</span>
          <span>{{ toKoreanCategory(report?.category || '') }}</span>
          <span>•</span>
          <span class="font-medium">{{ toKoreanStatus(report?.status || '') }}</span>
        </div>
        <CardTitle class="mt-2">{{ report?.title }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="prose dark:prose-invert max-w-none whitespace-pre-wrap">{{ report?.description }}</div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageTitle from '@/components/ui/PageTitle.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/card.vue'
import CardHeader from '@/components/ui/card-header.vue'
import CardTitle from '@/components/ui/card-title.vue'
import CardContent from '@/components/ui/card-content.vue'
import { useReportStore } from '@/stores/report'

const route = useRoute()
const router = useRouter()
const reportStore = useReportStore()

const report = ref<import('@/stores/report').Report | null>(null)
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  const id = String(route.params.id || '')
  if (!id) {
    errorMessage.value = '잘못된 접근입니다.'
    loading.value = false
    return
  }
  try {
    const data = await reportStore.fetchReportById(id)
    report.value = data
  } catch (e) {
    errorMessage.value = '제보를 불러오는 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
})

function goBack(): void {
  router.push({ name: 'report-list' })
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

function toKoreanType(v: string): string {
  if (v === 'error') return '오류 수정'
  if (v === 'addition') return '새 데이터 추가'
  if (v === 'other') return '기타'
  return v
}

function toKoreanCategory(v: string): string {
  const map: Record<string,string> = { item:'아이템', recipe:'레시피', npc:'NPC', location:'위치', event:'이벤트', other:'기타' }
  return map[v] ?? v
}

function toKoreanStatus(v: string): string {
  const map: Record<string,string> = { pending:'대기중', reviewing:'검토중', approved:'완료', rejected:'반려' }
  return map[v] ?? v
}
</script>
