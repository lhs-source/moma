<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">마비노기 모바일 도구</h1>
    <p class="text-lg text-gray-600">물물교환, 제작 시스템, 아이템 및 레시피 정보를 한눈에!</p>
  </div>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>물물교환 시스템</template>

    NPC들과의 물물교환을 효율적으로 관리하세요. 필요한 재료와 주간 요구사항을 추적하고, 
    최적의 교환 경로를 찾아보세요.
    <br />
    <RouterLink to="/trade" class="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      물물교환 페이지로 이동
    </RouterLink>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>제작 시스템</template>

    다양한 카테고리의 아이템 제작을 계획하고 관리하세요. 필요한 재료를 미리 확인하고 
    효율적인 제작 계획을 세울 수 있습니다.
    <br />
    <RouterLink to="/crafting" class="inline-block mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
      제작 시스템으로 이동
    </RouterLink>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>아이템 목록</template>

    게임 내 모든 아이템을 검색하고 확인하세요. 이름이나 ID로 검색이 가능하며, 
    카테고리별로 필터링할 수 있습니다.
    <br />
    <RouterLink to="/items" class="inline-block mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
      아이템 목록으로 이동
    </RouterLink>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>레시피 목록</template>

    모든 제작 레시피를 한눈에 확인하세요. 카테고리별, 레벨별로 필터링하여 
    원하는 레시피를 쉽게 찾을 수 있습니다.
    <br />
    <RouterLink to="/recipes" class="inline-block mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
      레시피 목록으로 이동
    </RouterLink>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>업데이트 정보</template>

    최신 음식 레시피와 아이템 정보가 추가되었습니다. 웹페이지 데이터를 기반으로 
    정확한 제작 정보를 제공합니다.
    <br />
    <small class="text-gray-500 mt-2 block">
      데이터 출처: <a href="https://www.inven.co.kr/board/mabimo/6366/134" target="_blank" rel="noopener" class="text-blue-500 hover:underline">마비노기 모바일 인벤</a>
    </small>
  </WelcomeItem>
</template>
