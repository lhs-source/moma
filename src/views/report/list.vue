<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <PageTitle>제보 내역</PageTitle>
      <div class="text-sm text-muted-foreground">Supabase에서 최신 제보 목록을 불러옵니다</div>
    </div>

    <!-- 필터 -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="space-y-2">
        <label class="text-sm font-medium">유형</label>
        <Select v-model="typeFilter">
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem value="error">오류 수정</SelectItem>
            <SelectItem value="addition">새 데이터 추가</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">상태</label>
        <Select v-model="statusFilter">
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem value="pending">대기중</SelectItem>
            <SelectItem value="reviewing">검토중</SelectItem>
            <SelectItem value="approved">완료</SelectItem>
            <SelectItem value="rejected">반려</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">카테고리</label>
        <Select v-model="categoryFilter">
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem value="item">아이템</SelectItem>
            <SelectItem value="recipe">레시피</SelectItem>
            <SelectItem value="npc">NPC</SelectItem>
            <SelectItem value="location">위치</SelectItem>
            <SelectItem value="event">이벤트</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- 목록 -->
    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted/50">
            <tr class="border-b">
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-40">생성일</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-28">유형</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-28">카테고리</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">제목</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-28">상태</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr 
              v-for="r in filteredReports" 
              :key="r.id" 
              class="hover:bg-muted/30 cursor-pointer"
              @click="goDetail(r.id)">
              <td class="px-4 py-3 text-sm text-muted-foreground">{{ formatDate(r.created_at) }}</td>
              <td class="px-4 py-3 text-sm">{{ toKoreanType(r.type) }}</td>
              <td class="px-4 py-3 text-sm">{{ toKoreanCategory(r.category) }}</td>
              <td class="px-4 py-3 text-sm">{{ r.title }}</td>
              <td class="px-4 py-3 text-sm">{{ toKoreanStatus(r.status) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-if="!loading && filteredReports.length === 0" class="text-center py-12 border rounded-lg">
      <p class="text-muted-foreground">표시할 제보가 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageTitle from '@/components/ui/PageTitle.vue'
import Select from '@/components/ui/select.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import { useReportStore } from '@/stores/report'

const router = useRouter()
const reportStore = useReportStore()

const loading = ref(false)
const typeFilter = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')

onMounted(async () => {
  loading.value = true
  try {
    await reportStore.fetchReports()
  } finally {
    loading.value = false
  }
})

const filteredReports = computed(() => {
  return reportStore.reports.filter(r => {
    const t = !typeFilter.value || r.type === typeFilter.value
    const s = !statusFilter.value || r.status === statusFilter.value
    const c = !categoryFilter.value || r.category === categoryFilter.value
    return t && s && c
  })
})

function goDetail(id: string): void {
  router.push({ name: 'report-detail', params: { id } })
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
  } catch {
    return iso
  }
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
