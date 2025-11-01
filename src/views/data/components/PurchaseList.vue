<template>
  <div class="space-y-4">
    <!-- 검색 및 필터 -->
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- 아이템명 검색 -->
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="아이템명 검색..."
          class="w-full"
        />
      </div>
      
      <!-- NPC 필터 -->
      <div class="w-full sm:w-48">
        <Select v-model="selectedNpc">
          <SelectTrigger>
            <SelectValue placeholder="NPC 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">모든 NPC</SelectItem>
            <SelectItem
              v-for="npc in uniqueNPCs"
              :key="npc.id"
              :value="npc.id"
            >
              {{ npc.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <!-- 채집 가능 필터 -->
      <div class="flex items-center space-x-2">
        <input
          id="collectible-filter"
          v-model="collectibleOnly"
          type="checkbox"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label for="collectible-filter" class="text-sm font-medium">
          채집 가능만
        </label>
      </div>
    </div>

    <!-- 결과 개수 표시 -->
    <div class="text-sm text-muted-foreground">
      총 {{ groupedPurchases.length }}명의 NPC, {{ filteredPurchases.length }}개의 아이템
    </div>

    <!-- NPC별 구매 정보 테이블 -->
    <div v-if="groupedPurchases.length > 0" class="space-y-6">
      <div
        v-for="npcGroup in groupedPurchases"
        :key="npcGroup.npcId"
        class="border rounded-lg overflow-hidden"
      >
        <!-- NPC 헤더 -->
        <div class="bg-muted/50 px-4 py-3 border-b">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">{{ npcGroup.npcName }}</h3>
              <p class="text-sm text-muted-foreground">{{ npcGroup.locationName }}</p>
            </div>
            <div class="text-sm text-muted-foreground">
              {{ npcGroup.items.length }}개 아이템
            </div>
          </div>
        </div>

        <!-- 아이템 테이블 -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-muted/30">
              <tr class="border-b">
                <th class="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">
                  이미지
                </th>
                <th class="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  아이템명
                </th>
                <th class="px-3 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-28">
                  가격
                </th>
                <th class="px-3 py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                  채집 가능
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="item in npcGroup.items"
                :key="item.itemId"
                class="hover:bg-muted/30 transition-colors"
              >
                <!-- 아이템 이미지 -->
                <td class="px-3 py-2 align-top">
                  <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      v-if="item.imageUrl"
                      :src="item.imageUrl"
                      :alt="item.itemName"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                    <div v-else class="text-muted-foreground text-xs text-center">
                      이미지<br />없음
                    </div>
                  </div>
                </td>

                <!-- 아이템명 -->
                <td class="px-3 py-2 align-top">
                  <div class="font-medium text-foreground text-sm">{{ item.itemName }}</div>
                  <div class="text-xs text-muted-foreground mt-0.5">ID: {{ item.itemId }}</div>
                </td>

                <!-- 가격 -->
                <td class="px-3 py-2 align-top text-right">
                  <span class="text-sm font-bold text-green-600">
                    {{ item.price.toLocaleString() }}골드
                  </span>
                </td>

                <!-- 채집 가능 여부 -->
                <td class="px-3 py-2 align-top text-center">
                  <span
                    v-if="item.isCollectible"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-100 whitespace-nowrap"
                  >
                    채집 가능
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap"
                  >
                    구매 전용
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-else class="text-center py-12 border rounded-lg">
      <p class="text-muted-foreground">
        검색 조건에 맞는 구매 정보가 없습니다.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePurchaseStore } from '@/stores/purchase.ts'
import type { EnrichedPurchaseItem } from '@/stores/purchase.ts'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import SelectContent from '@/components/ui/select-content.vue'
import SelectItem from '@/components/ui/select-item.vue'
import SelectTrigger from '@/components/ui/select-trigger.vue'
import SelectValue from '@/components/ui/select-value.vue'

/**
 * # NPC별 구매 정보 그룹 인터페이스
 */
interface NPCPurchaseGroup {
  npcId: string
  npcName: string
  locationName: string
  items: EnrichedPurchaseItem[]
}

const purchaseStore = usePurchaseStore()

// 검색 및 필터 상태
const searchQuery = ref('')
const selectedNpc = ref('')
const collectibleOnly = ref(false)

// 고유 NPC 목록
const uniqueNPCs = computed(() => {
  return purchaseStore.getUniqueNPCs()
})

// 필터링된 구매 정보 목록
const filteredPurchases = computed(() => {
  return purchaseStore.getFilteredPurchases({
    searchQuery: searchQuery.value,
    npcId: selectedNpc.value || undefined,
    collectibleOnly: collectibleOnly.value
  })
})

// NPC별로 그룹화된 구매 정보
const groupedPurchases = computed(() => {
  const groups = new Map<string, NPCPurchaseGroup>()

  filteredPurchases.value.forEach(purchase => {
    if (!groups.has(purchase.npcId)) {
      groups.set(purchase.npcId, {
        npcId: purchase.npcId,
        npcName: purchase.npcName,
        locationName: purchase.locationName,
        items: []
      })
    }
    groups.get(purchase.npcId)!.items.push(purchase)
  })

  // NPC명으로 정렬
  return Array.from(groups.values()).sort((a, b) => a.npcName.localeCompare(b.npcName))
})

/**
 * # 이미지 에러 핸들러
 */
function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

/**
 * # 컴포넌트 마운트 시 초기화
 */
onMounted(() => {
  purchaseStore.initializePurchaseList()
})
</script>

<style scoped>
/* 테이블 반응형 스타일 */
@media (max-width: 640px) {
  .overflow-x-auto {
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.375rem !important;
  }
  
  .w-10 {
    width: 2rem !important;
    height: 2rem !important;
  }
  
  /* 채집 가능 컬럼 최소 너비 보장 */
  .w-24 {
    min-width: 5rem !important;
  }
}
</style>
