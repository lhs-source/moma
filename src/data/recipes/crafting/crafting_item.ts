import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 아이템 제작 레시피 데이터
export const craftingItemRecipes: Recipe[] = [
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
  },
  // Lv.15 레시피 (다목적 제작대 Lv.3)
  {
    id: 'craft_advanced_spinning_whorl',
    name: '상급 손바퀴',
    resultItemId: 'advanced_spinning_whorl',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 22 },
      { itemId: 'high_wood', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 15
  },
  {
    id: 'craft_advanced_plywood_cover',
    name: '상급 합판 덮개',
    resultItemId: 'advanced_plywood_cover',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 22 },
      { itemId: 'high_wood', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 15
  },
  {
    id: 'craft_advanced_washing_tub',
    name: '상급 세척통',
    resultItemId: 'advanced_washing_tub',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 22 },
      { itemId: 'high_wood', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 15
  },
  {
    id: 'craft_advanced_vacuum_comb',
    name: '상급 직조용 빗',
    resultItemId: 'advanced_vacuum_comb',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 22 },
      { itemId: 'high_wood', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 15
  },
  {
    id: 'craft_advanced_rotary_handle',
    name: '상급 돌림 손잡이',
    resultItemId: 'advanced_rotary_handle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 22 },
      { itemId: 'high_wood', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 15
  },
  {
    id: 'craft_advanced_link_handle',
    name: '상급 연결 손잡이',
    resultItemId: 'advanced_link_handle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 22 },
      { itemId: 'high_wood', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 15
  },

  // Lv.17 레시피
  {
    id: 'craft_advanced_forging_tongs',
    name: '상급 단조 집게',
    resultItemId: 'advanced_forging_tongs',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 27 },
      { itemId: 'silver_alloy_ingot', quantity: 3 },
      { itemId: 'special_steel_ingot', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 17
  },
  {
    id: 'craft_advanced_needle_holder',
    name: '상급 바늘꽂이',
    resultItemId: 'advanced_needle_holder',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 27 },
      { itemId: 'supreme_fabric', quantity: 3 },
      { itemId: 'advanced_fabric', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 17
  },
  {
    id: 'craft_advanced_leg_bracket',
    name: '상급 다리쇠',
    resultItemId: 'advanced_leg_bracket',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 27 },
      { itemId: 'silver_alloy_ingot', quantity: 3 },
      { itemId: 'special_steel_ingot', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 17
  },
  {
    id: 'craft_advanced_iron_plate',
    name: '상급 쇠불판',
    resultItemId: 'advanced_iron_plate',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 27 },
      { itemId: 'silver_alloy_ingot', quantity: 3 },
      { itemId: 'special_steel_ingot', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 17
  },
  {
    id: 'craft_advanced_work_hammer',
    name: '상급 작업용 망치',
    resultItemId: 'advanced_work_hammer',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 27 },
      { itemId: 'supreme_wood', quantity: 3 },
      { itemId: 'high_wood', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 17
  },

  // Lv.19 레시피 (다목적 제작대 Lv.4) - DIY팩
  {
    id: 'craft_processing_facility_modification_diy_pack_5',
    name: '가공 시설 개조 DIY팩 (5레벨)',
    resultItemId: 'processing_facility_modification_diy_pack_5',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 25 },
      { itemId: 'silver_alloy_ingot', quantity: 5 },
      { itemId: 'supreme_wood', quantity: 5 },
      { itemId: 'supreme_fabric', quantity: 5 },
      { itemId: 'advanced_facility_expansion_blueprint', quantity: 4 },
      { itemId: 'disassembled_equipment_part', quantity: 500 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 19
  },
  {
    id: 'craft_workbench_modification_diy_pack_5',
    name: '제작대 개조 DIY팩 (5레벨)',
    resultItemId: 'workbench_modification_diy_pack_5',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'advanced_facility_upgrade_part', quantity: 30 },
      { itemId: 'meteorite_ingot', quantity: 3 },
      { itemId: 'supreme_wood', quantity: 3 },
      { itemId: 'supreme_fabric', quantity: 3 },
      { itemId: 'advanced_facility_expansion_blueprint', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 700 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 19
  },

  // === 마법유탄 레시피 (이미지에서 추가) ===

  // 다목적 제작대 Lv.3 - Lv.10
  {
    id: 'craft_magic_grenade_part',
    name: '마법 유탄 부품',
    resultItemId: 'magic_grenade_part',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'disassembled_equipment_part', quantity: 50 },
      { itemId: 'mana_herb', quantity: 10 },
      { itemId: 'cave_gem', quantity: 1 },
      { itemId: 'alchemy_powder', quantity: 50 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 10
  },
  {
    id: 'craft_fire_magic_bullet_lv10',
    name: '화염 마법 유탄',
    resultItemId: 'fire_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'fire_crystal', quantity: 3 },
      { itemId: 'magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 10
  },
  {
    id: 'craft_thunder_magic_bullet_lv10',
    name: '번개 마법 유탄',
    resultItemId: 'thunder_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'lightning_crystal', quantity: 3 },
      { itemId: 'magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 10
  },
  {
    id: 'craft_wind_magic_bullet_lv10',
    name: '바람 마법 유탄',
    resultItemId: 'wind_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'condensed_wind', quantity: 3 },
      { itemId: 'magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 10
  },
  {
    id: 'craft_acid_magic_bullet_lv10',
    name: '산성 마법 유탄',
    resultItemId: 'acid_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'poison_sac', quantity: 3 },
      { itemId: 'magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 3,
    requiredLevel: 10
  },

  // 다목적 제작대 Lv.4 - Lv.20
  {
    id: 'craft_advanced_magic_grenade_part_method1',
    name: '상급 마법 유탄 부품',
    resultItemId: 'advanced_magic_grenade_part',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'magic_grenade_part', quantity: 5 },
      { itemId: 'magic_power_detonator', quantity: 25 },
      { itemId: 'cave_gem', quantity: 24 },
      { itemId: 'alchemy_powder', quantity: 100 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 20
  },
  {
    id: 'craft_advanced_magic_grenade_part_method2',
    name: '상급 마법 유탄 부품',
    resultItemId: 'advanced_magic_grenade_part',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'disassembled_equipment_part', quantity: 150 },
      { itemId: 'magic_power_detonator', quantity: 15 },
      { itemId: 'wilderness_mana_stone', quantity: 25 },
      { itemId: 'alchemy_powder', quantity: 100 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 20
  },
  {
    id: 'craft_advanced_fire_magic_bullet',
    name: '상급 화염 마법 유탄',
    resultItemId: 'advanced_fire_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'fire_crystal', quantity: 9 },
      { itemId: 'advanced_magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 20
  },
  {
    id: 'craft_advanced_thunder_magic_bullet',
    name: '상급 번개 마법 유탄',
    resultItemId: 'advanced_thunder_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'lightning_crystal', quantity: 9 },
      { itemId: 'advanced_magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 20
  },
  {
    id: 'craft_advanced_wind_magic_bullet',
    name: '상급 바람 마법 유탄',
    resultItemId: 'advanced_wind_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'condensed_wind', quantity: 9 },
      { itemId: 'advanced_magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 20
  },
  {
    id: 'craft_advanced_acid_magic_bullet',
    name: '상급 산성 마법 유탄',
    resultItemId: 'advanced_acid_magic_bullet',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'poison_sac', quantity: 9 },
      { itemId: 'advanced_magic_grenade_part', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 4,
    requiredLevel: 20
  }
]
