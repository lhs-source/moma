<template>
  <div class="p-4 space-y-4">
    <h3 class="text-lg font-semibold text-foreground">Select 테스트</h3>

    <div class="space-y-2">
      <label class="text-sm font-medium text-foreground">카테고리 선택:</label>
      <Select v-model="testValue" default-value="">
        <SelectTrigger class="w-[200px]">
          <SelectValue placeholder="선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">모든 카테고리</SelectItem>
          <SelectItem value="무기">무기</SelectItem>
          <SelectItem value="방어구">방어구</SelectItem>
          <SelectItem value="소모품">소모품</SelectItem>
        </SelectContent>
      </Select>
      <p class="text-sm text-muted-foreground">선택된 값: {{ testValue || '없음' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'

const testValue = ref('')
</script>
