<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- 제보 유형 선택 -->
    <div class="space-y-2">
      <label for="report-type" class="text-sm font-medium">제보 유형 *</label>
      <Select v-model="formData.type" required>
        <SelectTrigger>
          <SelectValue placeholder="제보 유형을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="error">오류 수정</SelectItem>
          <SelectItem value="addition">새 데이터 추가</SelectItem>
          <SelectItem value="other">기타</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- 관련 카테고리 선택 -->
    <div class="space-y-2">
      <label for="report-category" class="text-sm font-medium">관련 카테고리 *</label>
      <Select v-model="formData.category" required>
        <SelectTrigger>
          <SelectValue placeholder="관련 카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="item">아이템</SelectItem>
          <SelectItem value="recipe">레시피</SelectItem>
          <SelectItem value="npc">NPC</SelectItem>
          <SelectItem value="location">위치</SelectItem>
          <SelectItem value="event">이벤트</SelectItem>
          <SelectItem value="other">기타</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- 제보 제목 -->
    <div class="space-y-2">
      <label for="report-title" class="text-sm font-medium">제보 제목 *</label>
      <Input
        v-model="formData.title"
        placeholder="제보 내용을 간단히 요약해주세요"
        required
      />
    </div>

    <!-- 오류 내용 설명 -->
    <div class="space-y-2">
      <label for="report-description" class="text-sm font-medium">상세 설명 *</label>
      <textarea
        v-model="formData.description"
        placeholder="오류 내용이나 추가할 정보를 자세히 설명해주세요"
        rows="4"
        class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        required
      />
    </div>


    <!-- 제출 버튼 -->
    <div class="flex justify-end space-x-2">
      <Button type="button" variant="outline" @click="resetForm" :disabled="props.disabled">
        초기화
      </Button>
      <Button type="submit" :disabled="!isFormValid || props.disabled">
        {{ props.disabled ? '제출 중...' : '제보하기' }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
/**
 * # ReportForm 컴포넌트
 * 
 * ## 기능 설명
 * 사용자가 게임 데이터 제보를 위한 폼 컴포넌트
 * 
 * ## 주요 기능
 * - 제보 유형 선택 (오류 수정, 새 데이터 추가, 기타)
 * - 관련 카테고리 선택 (아이템, 레시피, NPC, 위치, 이벤트)
 * - 제보 내용 입력 (제목, 상세 설명, 정확한 정보)
 * - 스크린샷 첨부 기능
 * - 제보자 정보 입력 (선택적)
 * - 폼 유효성 검증
 * 
 * ## 데이터 흐름
 * 1. 사용자가 폼 필드 입력
 * 2. 실시간 유효성 검증
 * 3. 폼 제출 시 부모 컴포넌트로 데이터 전달
 */
import { ref, computed } from 'vue'
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'
import type { ReportFormData, ReportType, ReportCategory } from '../types'

// Props
interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

// Emits
interface Emits {
  (e: 'submit', data: ReportFormData): void
}

const emit = defineEmits<Emits>()

// 폼 데이터
const formData = ref<ReportFormData>({
  type: 'error' as ReportType,
  category: 'item' as ReportCategory,
  title: '',
  description: ''
})

// 폼 유효성 검증
const isFormValid = computed(() => {
  return formData.value.title.trim() !== '' && 
         formData.value.description.trim() !== ''
})

/**
 * # 파일 변경 핸들러
 * 
 * 스크린샷 파일 선택 시 호출
 * 
 * @param event - 파일 입력 이벤트
 */


/**
 * # 폼 제출 핸들러
 * 
 * 폼 데이터를 검증하고 부모 컴포넌트로 전달
 */
function handleSubmit(): void {
  if (!isFormValid.value) {
    alert('필수 항목을 모두 입력해주세요.')
    return
  }
  
  emit('submit', { ...formData.value })
}

/**
 * # 폼 초기화
 * 
 * 폼 데이터를 기본값으로 리셋
 */
function resetForm(): void {
  formData.value = {
    type: 'error' as ReportType,
    category: 'item' as ReportCategory,
    title: '',
    description: ''
  }
}
</script>
