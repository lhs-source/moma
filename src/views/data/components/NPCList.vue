<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- 검색 입력 -->
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="NPC 이름, 설명, 위치로 검색..."
          class="w-full"
        />
      </div>
      
      <!-- 위치 필터 -->
      <div class="flex gap-2">
        <Select v-model:value="selectedLocation">
          <SelectTrigger class="w-40">
            <SelectValue placeholder="위치 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem
              v-for="location in npcStore.uniqueLocations"
              :key="location.id"
              :value="location.id"
            >
              {{ location.name }} ({{ npcStore.locationCounts[location.id] || 0 }})
            </SelectItem>
          </SelectContent>
        </Select>
        
        <!-- 물물교환 필터 -->
        <Select v-model:value="tradeFilter">
          <SelectTrigger class="w-32">
            <SelectValue placeholder="교환 여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem value="true">교환 가능</SelectItem>
            <SelectItem value="false">교환 불가</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- 결과 개수 표시 -->
    <div class="text-sm text-muted-foreground">
      총 {{ filteredNPCs.length }}개의 NPC
    </div>

    <!-- NPC 그리드 -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
      <div
        v-for="npc in filteredNPCs"
        :key="npc.id"
        class="bg-card border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
        @click="selectNPC(npc)"
      >
        <!-- NPC 이미지 -->
        <div class="aspect-square mb-2 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          <img
            v-if="npc.imageUrl"
            :src="npc.imageUrl"
            :alt="npc.name"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <div v-else class="text-muted-foreground text-xs">
            이미지 없음
          </div>
        </div>

        <!-- NPC 정보 -->
        <div class="space-y-1">
          <h3 class="font-semibold text-sm">{{ npc.name }}</h3>
          <p class="text-xs text-muted-foreground line-clamp-2">{{ npc.description }}</p>
          <p class="text-xs text-muted-foreground">{{ npc.location.name }}</p>
          
          <!-- 물물교환 정보 -->
          <div v-if="npc.tradeCount > 0" class="flex items-center gap-1 text-xs text-blue-600">
            <span>교환 가능</span>
            <span class="bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full text-xs">
              {{ npc.tradeCount }}개
            </span>
          </div>
          <div v-else class="text-xs text-muted-foreground">
            교환 불가
          </div>
        </div>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-if="filteredNPCs.length === 0" class="text-center py-12">
      <div class="text-muted-foreground">
        <p class="text-lg font-medium">NPC를 찾을 수 없습니다</p>
        <p class="text-sm">검색어나 필터를 변경해보세요</p>
      </div>
    </div>

    <!-- NPC 상세 정보 Sheet -->
    <NPCDetailSheet
      :open="sheetOpen"
      :selected-npc="selectedNPC"
      @update:open="sheetOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNpcStore } from '@/stores/npc'
import type { EnrichedNPC } from '@/stores/npc'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'
import NPCDetailSheet from './NPCDetailSheet.vue'

/**
 * # NPCList 컴포넌트
 * 
 * NPC 목록을 표시하고 검색/필터링 기능을 제공하는 컴포넌트
 * 물물교환 정보와 위치 정보를 연관하여 표시
 */

// NPC Store
const npcStore = useNpcStore()

// 검색어 상태
const searchQuery = ref('')
// 선택된 위치 필터
const selectedLocation = ref('')
// 물물교환 필터 (문자열로 처리)
const tradeFilter = ref('')
// Sheet 상태
const sheetOpen = ref(false)
const selectedNPC = ref<EnrichedNPC | null>(null)

/**
 * # 필터링된 NPC 목록
 * 
 * 검색어와 필터 조건에 따라 NPC 목록을 필터링
 */
const filteredNPCs = computed(() => {
  return npcStore.getFilteredNPCs({
    searchQuery: searchQuery.value,
    locationId: selectedLocation.value || undefined,
    hasTrades: tradeFilter.value ? tradeFilter.value === 'true' : undefined
  })
})

/**
 * # NPC 선택 핸들러
 * 
 * NPC를 클릭했을 때 호출되는 이벤트 핸들러
 * NPC 상세 정보 Sheet를 열고 선택된 NPC를 설정
 * 
 * @param npc - 선택된 NPC
 */
function selectNPC(npc: EnrichedNPC): void {
  selectedNPC.value = npc
  sheetOpen.value = true
}

/**
 * # 이미지 에러 핸들러
 * 
 * NPC 이미지 로드 실패 시 호출되는 핸들러
 * 
 * @param event - 이미지 에러 이벤트
 */
function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<style scoped>
/* 모바일에서 그리드 반응형 최적화 */
@media (max-width: 640px) {
  .grid {
    gap: 0.5rem;
  }
}

/* 카드 호버 효과 */
.bg-card:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease-in-out;
}
</style>
