<template>
  <div class="space-y-4">
    <!-- 검색 -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="위치 이름 검색..."
          class="w-full"
        />
      </div>
    </div>

    <!-- Location 목록 -->
    <div v-if="filteredLocations.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="location in filteredLocations"
        :key="location.id"
        class="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">{{ location.name }}</h3>
          
          <!-- NPC 목록 -->
          <div v-if="location.npcs.length > 0" class="space-y-1">
            <div class="text-xs font-medium text-muted-foreground">NPC:</div>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="npc in location.npcs"
                :key="npc.id"
                class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
              >
                {{ npc.name }}
              </span>
            </div>
          </div>
          
          <!-- NPC 없음 -->
          <div v-else class="text-xs text-muted-foreground">
            NPC 없음
          </div>
        </div>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-else class="text-center py-12">
      <p class="text-lg font-medium">위치를 찾을 수 없습니다</p>
      <p class="text-sm">검색어를 변경해보세요</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLocationStore } from '@/stores/location.ts'
import Input from '@/components/ui/input.vue'

const locationStore = useLocationStore()

const searchQuery = ref('')

const filteredLocations = computed(() => {
  return locationStore.getFilteredLocations({
    searchQuery: searchQuery.value
  })
})

onMounted(() => {
  locationStore.initializeLocationList()
})
</script>

<style scoped>
@media (max-width: 640px) {
  .grid {
    gap: 0.5rem;
  }
}

.bg-card:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease-in-out;
}
</style>
