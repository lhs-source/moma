import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 아이템 제작 레시피 데이터
export const craftingItemRecipes: Recipe[] = [
  // 회복 아이템
  {
    id: 'craft_healing_potion',
    name: '회복 물약',
    resultItemId: 'healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 2 },
      { itemId: 'saelok_mushroom', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_bandage',
    name: '붕대',
    resultItemId: 'bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'fabric', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_auto_healing_potion',
    name: '자동회복 물약',
    resultItemId: 'auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_high_healing_potion',
    name: '상급 회복 물약',
    resultItemId: 'high_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 6 },
      { itemId: 'saelok_mushroom_essence', quantity: 5 },
      { itemId: 'sprout_mushroom', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_high_auto_healing_potion',
    name: '상급 자동회복 물약',
    resultItemId: 'high_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_heat_resistant_bandage',
    name: '내열 붕대',
    resultItemId: 'heat_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'flame_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_cold_resistant_bandage',
    name: '방한 붕대',
    resultItemId: 'cold_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'ice_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_insulation_bandage',
    name: '절연 붕대',
    resultItemId: 'insulation_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'lightning_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_blessing_bandage',
    name: '축복의 붕대',
    resultItemId: 'blessing_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'radiance_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
  },
  {
    id: 'craft_seal_bandage',
    name: '봉인의 붕대',
    resultItemId: 'seal_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'seal_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_supreme_healing_potion',
    name: '최상급 회복 물약',
    resultItemId: 'supreme_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 12 },
      { itemId: 'clean_mushroom', quantity: 6 },
      { itemId: 'hidden_flower', quantity: 6 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_high_bandage',
    name: '상급 붕대',
    resultItemId: 'high_bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'superior_fabric', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_supreme_auto_healing_potion',
    name: '최상급 자동회복 물약',
    resultItemId: 'supreme_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 60 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_high_heat_resistant_bandage',
    name: '상급 내열 붕대',
    resultItemId: 'high_heat_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'flame_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
  },
  {
    id: 'craft_high_cold_resistant_bandage',
    name: '상급 방한 붕대',
    resultItemId: 'high_cold_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'ice_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
    craftingTime: 780
  },
  {
    id: 'craft_high_insulation_bandage',
    name: '상급 절연 붕대',
    resultItemId: 'high_insulation_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'lightning_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
    craftingTime: 780
  },
  {
    id: 'craft_high_blessing_bandage',
    name: '상급 축복의 붕대',
    resultItemId: 'high_blessing_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'radiance_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
    craftingTime: 780
  },
  {
    id: 'craft_high_seal_bandage',
    name: '상급 봉인의 붕대',
    resultItemId: 'high_seal_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'seal_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 2,
    craftingTime: 780
  },

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
