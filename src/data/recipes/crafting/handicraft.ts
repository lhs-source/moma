import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 핸디크래프트 - 생활도구 제작 레시피
export const handicraftRecipes: Recipe[] = [
  // === 기본 재료 ===
  {
    id: 'craft_nail',
    name: '못',
    resultItemId: 'nail',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'iron_ingot', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },
  // === 생활 업그레이드 부품 제작 (기본) ===
  {
    id: 'craft_spinning_whorl',
    name: '손바퀴',
    resultItemId: 'spinning_whorl',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'iron_ingot', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },
  {
    id: 'craft_plywood_cover',
    name: '합판 덮개',
    resultItemId: 'plywood_cover',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 8 },
      { itemId: 'wood', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 3
  },
  {
    id: 'craft_washing_tub',
    name: '세척통',
    resultItemId: 'washing_tub',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 8 },
      { itemId: 'wood', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 3
  },
  {
    id: 'craft_vacuum_comb',
    name: '진공증 빗',
    resultItemId: 'vacuum_comb',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 8 },
      { itemId: 'wood', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 3
  },
  {
    id: 'craft_rotary_handle',
    name: '돌림 손잡이',
    resultItemId: 'rotary_handle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 8 },
      { itemId: 'wood', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 3
  },
  {
    id: 'craft_link_handle',
    name: '연결 손잡이',
    resultItemId: 'link_handle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 8 },
      { itemId: 'wood', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 3
  },
  {
    id: 'craft_forging_tongs',
    name: '단조 집게',
    resultItemId: 'forging_tongs',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 12 },
      { itemId: 'steel_ingot', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_needle_holder',
    name: '바늘꽂이',
    resultItemId: 'needle_holder',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 12 },
      { itemId: 'wood_plus', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_leg_bracket',
    name: '다리쇠',
    resultItemId: 'leg_bracket',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 12 },
      { itemId: 'steel_ingot', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_iron_plate',
    name: '쇠붙판',
    resultItemId: 'iron_plate',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 12 },
      { itemId: 'steel_ingot', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_work_hammer',
    name: '작업용 망치',
    resultItemId: 'work_hammer',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 12 },
      { itemId: 'wood_plus', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  // === 기본 생활도구 (Lv.2, 다목적 제작대 Lv.1) ===
  // 금속 도구
  {
    id: 'craft_herb_picker',
    name: '약초 캐기',
    resultItemId: 'herb_picker',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },
  {
    id: 'craft_sickle',
    name: '낫',
    resultItemId: 'sickle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },
  {
    id: 'craft_hoe',
    name: '호미',
    resultItemId: 'hoe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },
  {
    id: 'craft_wool_scissors',
    name: '양털 가위',
    resultItemId: 'wool_scissors',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },
  {
    id: 'craft_logging_axe',
    name: '벌목 도끼',
    resultItemId: 'logging_axe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1,
  },
  {
    id: 'craft_pickaxe',
    name: '곡괭이',
    resultItemId: 'pickaxe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1,
  },
  // 목재 도구
  {
    id: 'craft_insect_net',
    name: '곤충 채집망',
    resultItemId: 'insect_net',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'wood_plus', quantity: 3 },
      { itemId: 'nail', quantity: 6 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },
  {
    id: 'craft_fishing_rod',
    name: '낚싯대',
    resultItemId: 'fishing_rod',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'wood_plus', quantity: 3 },
      { itemId: 'nail', quantity: 6 },
      { itemId: 'tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 1
  },

  // === 개량된 생활도구 (Lv.7, 다목적 제작대 Lv.2) ===
  // 금속 도구
  {
    id: 'craft_improved_herb_picker',
    name: '개량된 약초 캐기',
    resultItemId: 'improved_herb_picker',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'alloy_steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },
  {
    id: 'craft_improved_sickle',
    name: '개량된 낫',
    resultItemId: 'improved_sickle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'alloy_steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },
  {
    id: 'craft_improved_hoe',
    name: '개량된 호미',
    resultItemId: 'improved_hoe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'alloy_steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },
  {
    id: 'craft_improved_wool_scissors',
    name: '개량된 양털 가위',
    resultItemId: 'improved_wool_scissors',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'alloy_steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },
  {
    id: 'craft_improved_logging_axe',
    name: '개량된 벌목 도끼',
    resultItemId: 'improved_logging_axe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'alloy_steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },
  {
    id: 'craft_improved_pickaxe',
    name: '개량된 곡괭이',
    resultItemId: 'improved_pickaxe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'alloy_steel_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 3 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },
  // 목재 도구
  {
    id: 'craft_improved_insect_net',
    name: '개량된 곤충 채집망',
    resultItemId: 'improved_insect_net',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'superior_wood', quantity: 3 },
      { itemId: 'nail', quantity: 6 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },
  {
    id: 'craft_improved_fishing_rod',
    name: '개량된 낚싯대',
    resultItemId: 'improved_fishing_rod',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'superior_wood', quantity: 3 },
      { itemId: 'nail', quantity: 6 },
      { itemId: 'improved_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 2
  },

  // === 정교한 생활도구 (Lv.15, 다목적 제작대 Lv.4) ===
  // 금속 도구
  {
    id: 'craft_refined_herb_picker',
    name: '정교한 약초 캐기',
    resultItemId: 'refined_herb_picker',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'silver_alloy_ingot', quantity: 1 },
      { itemId: 'special_steel', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },
  {
    id: 'craft_refined_sickle',
    name: '정교한 낫',
    resultItemId: 'refined_sickle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'silver_alloy_ingot', quantity: 1 },
      { itemId: 'special_steel', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },
  {
    id: 'craft_refined_hoe',
    name: '정교한 호미',
    resultItemId: 'refined_hoe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'silver_alloy_ingot', quantity: 1 },
      { itemId: 'special_steel', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },
  {
    id: 'craft_refined_wool_scissors',
    name: '정교한 양털 가위',
    resultItemId: 'refined_wool_scissors',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'silver_alloy_ingot', quantity: 1 },
      { itemId: 'special_steel', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },
  {
    id: 'craft_refined_logging_axe',
    name: '정교한 벌목 도끼',
    resultItemId: 'refined_logging_axe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'silver_alloy_ingot', quantity: 1 },
      { itemId: 'special_steel', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },
  {
    id: 'craft_refined_pickaxe',
    name: '정교한 곡괭이',
    resultItemId: 'refined_pickaxe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'silver_alloy_ingot', quantity: 1 },
      { itemId: 'special_steel', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },
  // 목재 도구
  {
    id: 'craft_refined_insect_net',
    name: '정교한 곤충 채집망',
    resultItemId: 'refined_insect_net',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'supreme_wood', quantity: 1 },
      { itemId: 'superior_wood_plus', quantity: 3 },
      { itemId: 'nail', quantity: 8 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },
  {
    id: 'craft_refined_fishing_rod',
    name: '정교한 낚싯대',
    resultItemId: 'refined_fishing_rod',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'supreme_wood', quantity: 1 },
      { itemId: 'superior_wood_plus', quantity: 3 },
      { itemId: 'nail', quantity: 8 },
      { itemId: 'refined_tool_part', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 4
  },

  // === 섬세한 생활도구 (Lv.22, 다목적 제작대 Lv.5) ===
  // 금속 도구
  {
    id: 'craft_delicate_herb_picker',
    name: '섬세한 약초 캐기',
    resultItemId: 'delicate_herb_picker',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'cloud_steel_ingot', quantity: 1 },
      { itemId: 'silver_alloy_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_delicate_sickle',
    name: '섬세한 낫',
    resultItemId: 'delicate_sickle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'cloud_steel_ingot', quantity: 1 },
      { itemId: 'silver_alloy_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_delicate_hoe',
    name: '섬세한 호미',
    resultItemId: 'delicate_hoe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'cloud_steel_ingot', quantity: 1 },
      { itemId: 'silver_alloy_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_delicate_wool_scissors',
    name: '섬세한 양털 가위',
    resultItemId: 'delicate_wool_scissors',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'cloud_steel_ingot', quantity: 1 },
      { itemId: 'silver_alloy_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_delicate_logging_axe',
    name: '섬세한 벌목 도끼',
    resultItemId: 'delicate_logging_axe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'cloud_steel_ingot', quantity: 1 },
      { itemId: 'silver_alloy_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_delicate_pickaxe',
    name: '섬세한 곡괭이',
    resultItemId: 'delicate_pickaxe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'cloud_steel_ingot', quantity: 1 },
      { itemId: 'silver_alloy_ingot', quantity: 2 },
      { itemId: 'nail', quantity: 4 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  // 목재 도구
  {
    id: 'craft_delicate_insect_net',
    name: '섬세한 곤충 채집망',
    resultItemId: 'delicate_insect_net',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'supreme_wood_plus', quantity: 1 },
      { itemId: 'supreme_wood', quantity: 3 },
      { itemId: 'nail', quantity: 8 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  },
  {
    id: 'craft_delicate_fishing_rod',
    name: '섬세한 낚싯대',
    resultItemId: 'delicate_fishing_rod',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'supreme_wood_plus', quantity: 1 },
      { itemId: 'supreme_wood', quantity: 3 },
      { itemId: 'nail', quantity: 8 },
      { itemId: 'delicate_tool_part', quantity: 1 },
      { itemId: 'barrack_mana_stone', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_HANDICRAFT,
    facilityLevel: 5
  }
]

