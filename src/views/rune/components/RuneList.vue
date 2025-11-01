<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- 검색 -->
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="룬 이름 또는 ID 검색..."
          class="w-full"
        />
      </div>
      
      <!-- 룬 타입 필터 -->
      <div class="w-full sm:w-48">
        <Select v-model="selectedType">
          <SelectTrigger>
            <SelectValue placeholder="타입 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">모든 타입</SelectItem>
            <SelectItem
              v-for="type in runeTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <!-- 룬 등급 필터 -->
      <div class="w-full sm:w-48">
        <Select v-model="selectedGrade">
          <SelectTrigger>
            <SelectValue placeholder="등급 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">모든 등급</SelectItem>
            <SelectItem
              v-for="grade in runeGrades"
              :key="grade.value"
              :value="grade.value"
            >
              {{ grade.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- 결과 개수 표시 -->
    <div class="text-sm text-muted-foreground">
      총 {{ filteredRunes.length }}개의 룬
    </div>

    <!-- 룬 그리드 -->
    <div
      v-if="filteredRunes.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <RuneCard
        v-for="rune in filteredRunes"
        :key="rune.id"
        :rune="rune"
        @click="openRuneDetail(rune)"
      />
    </div>

    <!-- 빈 결과 메시지 -->
    <div
      v-else
      class="text-center py-12 border rounded-lg"
    >
      <p class="text-muted-foreground">
        검색 조건에 맞는 룬이 없습니다.
      </p>
    </div>

    <!-- 룬 상세 정보 시트 -->
    <RuneDetailSheet
      v-model:open="isDetailOpen"
      :rune="selectedRune"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * # RuneList 컴포넌트
 * 
 * ## 기능 설명
 * 8성 룬을 검색, 필터링하여 그리드 형태로 표시하는 컴포넌트
 * 
 * ## 주요 기능
 * - 룬 이름/ID로 실시간 검색
 * - 룬 타입별 필터링 (무기, 방어구, 장신구)
 * - 룬 등급별 필터링 (전설, 신화)
 * - 필터링된 룬 개수 표시
 * - 룬 클릭 시 상세 정보 표시 (효과, 획득처 포함)
 * - 반응형 그리드 레이아웃
 */
import { ref, computed } from 'vue'
import type { Rune } from '@/data/equip/weapons'
import { RuneType, RuneGrade, runes } from '@/data/equip/weapons'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import RuneCard from './RuneCard.vue'
import RuneDetailSheet from './RuneDetailSheet.vue'

// 검색어
const searchQuery = ref('')
// 선택된 룬 타입 필터
const selectedType = ref<RuneType | ''>('')
// 선택된 룬 등급 필터
const selectedGrade = ref<RuneGrade | ''>('')

// 룬 타입 옵션
const runeTypes = [
  { value: RuneType.Weapon, label: RuneType.Weapon },
  { value: RuneType.Armor, label: RuneType.Armor },
  { value: RuneType.Accessory, label: RuneType.Accessory },
]

// 룬 등급 옵션
const runeGrades = [
  { value: RuneGrade.Legendary, label: RuneGrade.Legendary },
  { value: RuneGrade.Mythic, label: RuneGrade.Mythic },
]

/**
 * ## filteredRunes
 * 
 * 모든 필터 조건을 적용하여 최종 룬 목록 반환
 * 
 * ### 필터링 조건
 * 1. 검색어 필터 - 룬 이름 또는 ID에 검색어 포함
 * 2. 타입 필터 - 선택된 룬 타입과 일치
 * 3. 등급 필터 - 선택된 룬 등급과 일치
 * 
 * ### 조건 조합
 * 세 가지 조건을 모두 만족하는 룬만 반환 (AND 조건)
 */
const filteredRunes = computed(() => {
  return runes.filter(rune => {
    const matchesSearch = !searchQuery.value ||
      rune.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      rune.id.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesType = !selectedType.value || rune.type === selectedType.value

    const matchesGrade = !selectedGrade.value || rune.grade === selectedGrade.value

    return matchesSearch && matchesType && matchesGrade
  })
})

// 상세 정보 표시 상태
const isDetailOpen = ref(false)
const selectedRune = ref<Rune | null>(null)

/**
 * 룬 상세 정보 열기
 */
function openRuneDetail(rune: Rune) {
  selectedRune.value = rune
  isDetailOpen.value = true
}
</script>

