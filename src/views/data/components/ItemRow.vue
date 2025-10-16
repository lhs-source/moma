<template>
  <tr class="hover:bg-muted/30 transition-colors">
    <!-- 이미지 -->
    <td class="px-4 py-3 align-top">
      <img :src="item.imageUrl" :alt="item.name" class="w-16 min-w-16 h-16 object-cover rounded"
        @error="handleImageError" />
    </td>

    <!-- 기본 정보 -->
    <td class="px-4 py-3 align-top">
      <div v-if="item.category" class="text-xs text-muted-foreground mb-1">{{ item.category }}</div>
      <div class="font-bold text-base text-foreground">{{ item.name }}</div>
      <div class="text-xs text-muted-foreground mt-1">ID: {{ item.id }}</div>

      <!-- 사용처 태그 -->
      <div class="flex flex-wrap gap-1 mt-2">
        <span v-for="usageType in usageTypes" :key="usageType" :class="{
          'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded': true,
          'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100': usageType === '레시피',
          'bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-blue-100': usageType === '교환',
          'bg-emerald-100 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100': usageType === '구매',
          'bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100': usageType === '제작',
          'bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-100': usageType === '교환으로 얻을 수 있음'
        }">
          {{ usageType }}
        </span>
      </div>
    </td>

    <!-- 사용처 상세 정보 -->
    <td class="px-4 py-3 align-top">
      <div class="space-y-2 text-sm">
        <!-- 레시피 사용처 -->
        <div v-if="itemUsage?.usageTypes.recipes.length" class="bg-slate-50 dark:bg-slate-800 rounded p-2">
          <div class="font-semibold text-xs text-slate-900 dark:text-slate-200 mb-1">재료로 사용되는 레시피</div>
          <div v-for="recipeUsage in itemUsage.usageTypes.recipes" :key="recipeUsage.recipeId" class="text-xs py-0.5">
            • {{ recipeUsage.resultItemName }} x{{ recipeUsage.resultQuantity }} ({{ recipeUsage.quantity }}개 필요)
          </div>
        </div>

        <!-- 교환 사용처 -->
        <div v-if="itemUsage?.usageTypes.trades.length" class="bg-blue-50 dark:bg-blue-900 rounded p-2">
          <div class="font-semibold text-xs text-blue-900 dark:text-blue-200 mb-1">교환에 사용</div>
          <div v-for="tradeUsage in itemUsage.usageTypes.trades" :key="tradeUsage.tradeId" class="text-xs py-0.5">
            • {{ tradeUsage.npcName }} ({{ tradeUsage.locationName }}) → {{ tradeUsage.receiveItemName }} x{{
              tradeUsage.receiveQuantity }} ({{ tradeUsage.giveQuantity }}개 필요)
          </div>
        </div>

        <!-- 교환으로 얻을 수 있음 -->
        <div v-if="obtainableTrades.length" class="bg-green-50 dark:bg-green-900 rounded p-2">
          <div class="font-semibold text-xs text-green-900 dark:text-green-200 mb-1">교환으로 얻을 수 있음</div>
          <div v-for="trade in obtainableTrades" :key="trade.id" class="text-xs py-0.5">
            • {{ trade.npcName }} ({{ trade.locationName }}) - {{ trade.giveItemName }} x{{ trade.giveQuantity }} → {{
              trade.receiveQuantity }}개 획득
          </div>
        </div>

        <!-- 제작 레시피 -->
        <div v-if="craftableRecipes.length" class="bg-yellow-50 dark:bg-yellow-900 rounded p-2">
          <div class="font-semibold text-xs text-yellow-900 dark:text-yellow-200 mb-1">제작 가능</div>
          <div v-for="recipe in craftableRecipes" :key="recipe.id" class="text-xs py-0.5">
            • {{ recipe.name }} ({{ recipe.category }})
            <span v-if="recipe.craftingTime"> - ⏱️ {{ formatTime(recipe.craftingTime) }}</span>
          </div>
        </div>

        <!-- 사용처 정보 없음 -->
        <div v-if="!itemUsage?.usageTypes.recipes.length &&
          !itemUsage?.usageTypes.trades.length &&
          !obtainableTrades.length &&
          !craftableRecipes.length" class="text-xs text-muted-foreground">
          사용처 정보 없음
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
/**
 * # ItemRow 컴포넌트
 * 
 * ## 기능 설명
 * ItemList 테이블의 개별 행을 담당하는 컴포넌트
 * 아이템의 이미지, 기본 정보, 사용처 상세 정보를 표시
 * 
 * ## Props
 * - item: 표시할 아이템 객체
 * 
 * ## 주요 기능
 * - 아이템 이미지 표시 (에러 시 기본 이미지)
 * - 사용처 태그 표시
 * - 레시피, 교환, 구매, 제작 등 상세 사용처 정보 표시
 */
import { computed } from 'vue'
import type { Item } from '@/data/schemas/item'
import { itemUsageIndex } from '@/utils/itemUsageIndex'
import { recipes } from '@/data/recipes'
import { trades } from '@/data/trade'
import { npcs } from '@/data/npcs'
import { locations } from '@/data/locations'
import { items } from '@/data/items'
import { formatTime } from '@/utils/timeUtils'

const props = withDefaults(defineProps<{
  item: Item
}>(), {})

// 아이템 사용처 정보
const itemUsage = computed(() => itemUsageIndex.getItemUsage(props.item.id))

// 사용처 타입 목록
const usageTypes = computed(() => {
  const types: string[] = []
  
  if (itemUsage.value?.usageTypes.recipes.length) types.push('레시피')
  if (itemUsage.value?.usageTypes.trades.length) types.push('교환')
  if (itemUsage.value?.usageTypes.purchases.length) types.push('구매')
  
  if (craftableRecipes.value.length > 0) types.push('제작')
  if (obtainableTrades.value.length > 0) types.push('교환으로 얻을 수 있음')
  
  return types
})

// 교환으로 얻을 수 있는 정보
const obtainableTrades = computed(() => {
  return trades
    .filter(trade => trade.receiveItemId === props.item.id && trade.isEnabled)
    .map(trade => {
      const npc = npcs.find(n => n.id === trade.npcId)
      const location = locations.find(l => l.id === npc?.locationId)
      const giveItem = items.find(i => i.id === trade.giveItemId)

      return {
        id: trade.id,
        npcName: npc?.name || '알 수 없음',
        locationName: location?.name || '알 수 없음',
        giveItemName: giveItem?.name || trade.giveItemId,
        giveQuantity: trade.giveQuantity,
        receiveQuantity: trade.receiveQuantity
      }
    })
})

// 제작 가능한 레시피
const craftableRecipes = computed(() => {
  return recipes.filter(recipe => recipe.resultItemId === props.item.id)
})

// 이미지 로드 실패 시 기본 이미지로 대체
function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = '/images/items/default.webp'
}
</script>

