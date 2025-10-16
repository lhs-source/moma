<template>
  <div class="flex flex-col sm:flex-row gap-2">
    <!-- 검색 입력 -->
    <Input :model-value="searchQuery" type="text" placeholder="아이템 이름 또는 ID로 검색..."
      @update:model-value="updateSearchQuery" />

    <!-- 카테고리 필터 -->
    <Select :model-value="category" default-value="" @update:model-value="updateCategory">
      <SelectTrigger class="w-full sm:w-[200px]">
        <SelectValue placeholder="모든 카테고리" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">모든 카테고리</SelectItem>
        <SelectItem v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </SelectItem>
      </SelectContent>
    </Select>

    <!-- 사용처 필터 -->
    <Select :model-value="usageType" default-value="" @update:model-value="updateUsageType">
      <SelectTrigger class="w-full sm:w-[200px]">
        <SelectValue placeholder="모든 사용처" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">모든 사용처</SelectItem>
        <SelectItem value="레시피">레시피 재료</SelectItem>
        <SelectItem value="교환">교환 아이템</SelectItem>
        <SelectItem value="구매">구매 가능</SelectItem>
        <SelectItem value="제작">제작 가능</SelectItem>
        <SelectItem value="교환으로 얻을 수 있음">교환으로 얻을 수 있음</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
/**
 * # ItemFilters 컴포넌트
 * 
 * ## 기능 설명
 * 아이템 목록을 필터링하기 위한 검색 및 필터 UI 컴포넌트
 * 
 * ## 주요 기능
 * - 아이템 이름/ID 검색 입력
 * - 카테고리별 필터링
 * - 사용처별 필터링
 * 
 * ## Props
 * - searchQuery: 검색어
 * - category: 선택된 카테고리
 * - usageType: 선택된 사용처 타입
 * - categories: 카테고리 목록
 * 
 * ## Emits
 * - update:searchQuery: 검색어 변경 이벤트
 * - update:category: 카테고리 변경 이벤트
 * - update:usageType: 사용처 변경 이벤트
 */
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'

const props = withDefaults(defineProps<{
  searchQuery: string
  category: string
  usageType: string
  categories: string[]
}>(), {
  searchQuery: '',
  category: '',
  usageType: '',
  categories: () => []
})

const emit = defineEmits<{
  (eventName: 'update:searchQuery', value: string): void
  (eventName: 'update:category', value: string): void
  (eventName: 'update:usageType', value: string): void
}>()

function updateSearchQuery(value: string) {
  emit('update:searchQuery', value)
}

function updateCategory(value: string) {
  emit('update:category', value)
}

function updateUsageType(value: string) {
  emit('update:usageType', value)
}
</script>

