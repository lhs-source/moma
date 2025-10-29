<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <PageTitle>데이터 제보</PageTitle>
      <p class="text-sm text-muted-foreground">
        잘못된 정보나 누락된 데이터를 제보해주세요
      </p>
    </div>

    <!-- 제보 폼 -->
    <div class="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>제보하기</CardTitle>
          <p class="text-sm text-muted-foreground">
            게임 데이터의 오류나 누락 사항을 제보해주시면 검토 후 반영하겠습니다.
          </p>
        </CardHeader>
        <CardContent>
          <ReportForm @submit="handleSubmit" />
        </CardContent>
      </Card>
    </div>

    <!-- 제보 가이드 링크 -->
    <div class="text-center">
      <Button variant="outline" @click="showGuide = true">
        제보 가이드 보기
      </Button>
    </div>

    <!-- 제보 가이드 섹션 -->
    <div v-if="showGuide" class="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>제보 가이드</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">좋은 제보의 예시:</h4>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• 아이템 가격이 실제와 다름 (예: 사과 가격이 100골드 → 120골드)</li>
                <li>• 새로운 레시피 발견 (예: 빵 + 버터 = 샌드위치)</li>
                <li>• NPC 위치 정보 오류</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium mb-2">제보 시 주의사항:</h4>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• 정확한 정보를 확인한 후 제보해주세요</li>
                <li>• 스크린샷이 있으면 더욱 도움이 됩니다</li>
                <li>• 개인정보는 입력하지 마세요</li>
              </ul>
            </div>
            <div class="text-right">
              <Button variant="outline" @click="showGuide = false">닫기</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * # ReportView 컴포넌트
 * 
 * ## 기능 설명
 * 사용자가 게임 데이터의 오류나 누락 사항을 제보할 수 있는 페이지
 * 
 * ## 주요 기능
 * - 제보 폼 제공
 * - 제보 가이드 표시
 * - 제보 제출 처리
 * 
 * ## 데이터 흐름
 * 1. 사용자가 제보 폼 작성
 * 2. 폼 제출 시 제보 데이터 처리
 * 3. 제보 성공 시 확인 메시지 표시
 */
import { ref } from 'vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import Card from '@/components/ui/card.vue'
import CardHeader from '@/components/ui/card-header.vue'
import CardTitle from '@/components/ui/card-title.vue'

import CardContent from '@/components/ui/card-content.vue'
import Button from '@/components/ui/Button.vue'

import ReportForm from '@/views/report/components/ReportForm.vue'
import type { ReportFormData } from './types.ts'

defineOptions({ name: 'ReportView' })

// 제보 가이드 모달 상태
const showGuide = ref(false)

/**
 * # 제보 제출 핸들러
 * 
 * 제보 폼에서 제출된 데이터를 처리
 * 
 * @param reportData - 제보 데이터
 */
function handleSubmit(reportData: ReportFormData): void {
  console.log('제보 제출:', reportData)
  // TODO: 실제 제보 데이터 저장 로직 구현
  // 현재는 콘솔에 출력만 함
}
</script>
