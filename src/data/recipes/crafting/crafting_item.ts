import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 아이템 제작 레시피 데이터
export const craftingItemRecipes: Recipe[] = [
  // 강화 아이템
  {
    id: 'craft_weapon_enchant_stone',
    name: '무기 강화석',
    resultItemId: 'weapon_enchant_stone',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'coal', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 120
  },
  {
    id: 'craft_armor_enchant_stone',
    name: '방어구 강화석',
    resultItemId: 'armor_enchant_stone',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'coal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 90
  },
  {
    id: 'craft_accessory_enchant_stone',
    name: '악세사리 강화석',
    resultItemId: 'accessory_enchant_stone',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'coal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 60
  },

  // 마법유탄
  {
    id: 'craft_fire_magic_bullet',
    name: '화염 마법유탄',
    resultItemId: 'fire_magic_bullet',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'flame_crystal', quantity: 1 },
      { itemId: 'iron_ore', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 60
  },
  {
    id: 'craft_ice_magic_bullet',
    name: '얼음 마법유탄',
    resultItemId: 'ice_magic_bullet',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'ice_crystal', quantity: 1 },
      { itemId: 'iron_ore', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 60
  },
  {
    id: 'craft_lightning_magic_bullet',
    name: '전기 마법유탄',
    resultItemId: 'lightning_magic_bullet',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'lightning_crystal', quantity: 1 },
      { itemId: 'iron_ore', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 60
  },

  // 염색약
  {
    id: 'craft_red_dye',
    name: '빨간 염색약',
    resultItemId: 'red_dye',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'red_flower', quantity: 3 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 30
  },
  {
    id: 'craft_blue_dye',
    name: '파란 염색약',
    resultItemId: 'blue_dye',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'blue_flower', quantity: 3 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 30
  },
  {
    id: 'craft_yellow_dye',
    name: '노란 염색약',
    resultItemId: 'yellow_dye',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'yellow_flower', quantity: 3 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 30
  },
  {
    id: 'craft_green_dye',
    name: '초록 염색약',
    resultItemId: 'green_dye',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'green_flower', quantity: 3 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 30
  },
  // 캠프파이어
  {
    id: 'craft_campfire_kit',
    name: '캠프파이어 키트',
    resultItemId: 'campfire_kit',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'log', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 30
  },
  {
    id: 'craft_skilled_campfire_kit',
    name: '숙련 캠프파이어 키트',
    resultItemId: 'skilled_campfire_kit',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'branch', quantity: 5 },
      { itemId: 'high_log', quantity: 4 },
      { itemId: 'stone', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 180
  },
  {
    id: 'craft_professional_campfire_kit',
    name: '전문 캠프파이어 키트',
    resultItemId: 'professional_campfire_kit',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'branch', quantity: 5 },
      { itemId: 'high_log_plus', quantity: 4 },
      { itemId: 'stone', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
    craftingTime: 360
  },

  // === 생활 업그레이드 부품 제작 (기본) ===
  {
    id: 'craft_spinning_whorl',
    name: '손바퀴',
    resultItemId: 'spinning_whorl',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 8 },
      { itemId: 'wood', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
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
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 5
  },
  // 설비 제작 도구
  {
    id: 'craft_bellows',
    name: '풀무',
    resultItemId: 'bellows',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 15 },
      { itemId: 'high_wood', quantity: 3 },
      { itemId: 'metal_processing_facility_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_wooden_pulley',
    name: '목공용 도르레',
    resultItemId: 'wooden_pulley',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 15 },
      { itemId: 'alloy_steel_ingot', quantity: 3 },
      { itemId: 'wood_processing_facility_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_flat_knife',
    name: '납작칼',
    resultItemId: 'flat_knife',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 15 },
      { itemId: 'alloy_steel_ingot', quantity: 3 },
      { itemId: 'leather_processing_facility_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_thread_making_rod',
    name: '실짜기 막대',
    resultItemId: 'thread_making_rod',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 15 },
      { itemId: 'high_wood', quantity: 3 },
      { itemId: 'fabric_processing_facility_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_pottery_wheel',
    name: '돌림통',
    resultItemId: 'pottery_wheel',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 15 },
      { itemId: 'high_wood', quantity: 3 },
      { itemId: 'medicine_processing_facility_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_food_input_port',
    name: '식재료 투입구',
    resultItemId: 'food_input_port',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 15 },
      { itemId: 'high_wood', quantity: 3 },
      { itemId: 'food_processing_facility_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_iron_anvil',
    name: '쇠 모루',
    resultItemId: 'iron_anvil',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 20 },
      { itemId: 'special_steel', quantity: 5 },
      { itemId: 'weapon_workbench_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_tailoring_scissors',
    name: '재단 가위',
    resultItemId: 'tailoring_scissors',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 20 },
      { itemId: 'special_steel', quantity: 5 },
      { itemId: 'armor_workbench_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_medicine_bowl',
    name: '약사발',
    resultItemId: 'medicine_bowl',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 20 },
      { itemId: 'special_steel', quantity: 5 },
      { itemId: 'medicine_workbench_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_iron_furnace',
    name: '쇠 화로',
    resultItemId: 'iron_furnace',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 20 },
      { itemId: 'special_steel', quantity: 5 },
      { itemId: 'food_workbench_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_rotary_grinder',
    name: '회전 연마기',
    resultItemId: 'rotary_grinder',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'facility_upgrade_part', quantity: 20 },
      { itemId: 'high_wood_plus', quantity: 5 },
      { itemId: 'multi_purpose_workbench_design_3', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  }
]
