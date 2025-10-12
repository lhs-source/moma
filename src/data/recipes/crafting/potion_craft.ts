import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 물약 조제 레시피 데이터
export const potionCraftRecipes: Recipe[] = [
  // Lv1 - 회복 물약
  {
    id: 'craft_healing_potion',
    name: '회복 물약',
    resultItemId: 'healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 2 },
      { itemId: 'saelok_mushroom', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 1,
    craftingTime: 60
  },
  // Lv1 - 붕대
  {
    id: 'craft_bandage',
    name: '붕대',
    resultItemId: 'bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'fabric', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 1,
    craftingTime: 30
  },
  // Lv2 - 자동회복 물약
  {
    id: 'craft_auto_healing_potion',
    name: '자동회복 물약',
    resultItemId: 'auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 2,
    craftingTime: 120
  },
  // Lv3 - 상급 회복 물약
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3,
    craftingTime: 180
  },
  // Lv5 - 상급 자동회복 물약
  {
    id: 'craft_high_auto_healing_potion',
    name: '상급 자동회복 물약',
    resultItemId: 'high_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5,
    craftingTime: 300
  },
  // Lv5 - 내열 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5,
    craftingTime: 300
  },
  // Lv5 - 방한 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5,
    craftingTime: 300
  },
  // Lv5 - 절연 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5,
    craftingTime: 300
  },
  // Lv5 - 축복의 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5,
    craftingTime: 300
  },
  // Lv5 - 봉인의 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5,
    craftingTime: 480
  },
  // Lv8 - 최상급 회복 물약
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 8,
    craftingTime: 480
  },
  // Lv8 - 상급 붕대
  {
    id: 'craft_high_bandage',
    name: '상급 붕대',
    resultItemId: 'high_bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'high_fabric', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 8,
    craftingTime: 480
  },
  // Lv13 - 최상급 자동회복 물약
  {
    id: 'craft_supreme_auto_healing_potion',
    name: '최상급 자동회복 물약',
    resultItemId: 'supreme_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 60 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13,
    craftingTime: 780
  },
  // Lv13 - 상급 내열 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13,
    craftingTime: 780
  },
  // Lv13 - 상급 방한 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13,
    craftingTime: 780
  },
  // Lv13 - 상급 절연 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13,
    craftingTime: 780
  },
  // Lv13 - 상급 축복의 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13,
    craftingTime: 780
  },
  // Lv13 - 상급 봉인의 붕대
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
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13,
    craftingTime: 780
  },
  // Lv15 - 뛰어난 회복 물약
  {
    id: 'craft_excellent_healing_potion',
    name: '뛰어난 회복 물약',
    resultItemId: 'excellent_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 16 },
      { itemId: 'clean_mushroom_juice', quantity: 6 },
      { itemId: 'sprout_mushroom', quantity: 5 },
      { itemId: 'sturdy_mushroom', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 15,
    craftingTime: 960
  },
  // Lv20 - 뛰어난 자동회복 물약
  {
    id: 'craft_excellent_auto_healing_potion',
    name: '뛰어난 자동회복 물약',
    resultItemId: 'excellent_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'excellent_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 20,
    craftingTime: 1200
  },
  // Lv22 - 뛰어난 붕대
  {
    id: 'craft_excellent_bandage',
    name: '뛰어난 붕대',
    resultItemId: 'excellent_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_fabric', quantity: 5 },
      { itemId: 'life_flower_powder', quantity: 6 },
      { itemId: 'flame_crystal', quantity: 10 },
      { itemId: 'ice_crystal', quantity: 10 },
      { itemId: 'lightning_crystal', quantity: 10 },
      { itemId: 'radiance_crystal', quantity: 10 },
      { itemId: 'seal_crystal', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 22,
    craftingTime: 1440
  },
  // Lv25 - 뛰어난 회복 물약S
  {
    id: 'craft_excellent_healing_potion_s',
    name: '뛰어난 회복 물약S',
    resultItemId: 'excellent_healing_potion_s',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 20 },
      { itemId: 'sleepy_mushroom_juice', quantity: 5 },
      { itemId: 'life_gem', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 25,
    craftingTime: 1800
  },
  // Lv27 - 최상급 붕대 (첫 번째)
  {
    id: 'craft_supreme_bandage_v1',
    name: '최상급 붕대',
    resultItemId: 'supreme_bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'supreme_fabric', quantity: 2 },
      { itemId: 'life_flower_powder', quantity: 6 },
      { itemId: 'life_flower', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27,
    craftingTime: 2040
  },
  // Lv27 - 최상급 붕대 (두 번째, 파란색 붕대)
  {
    id: 'craft_supreme_bandage_v2',
    name: '최상급 붕대',
    resultItemId: 'supreme_blue_bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'excellent_bandage', quantity: 5 },
      { itemId: 'fire_mana_stone', quantity: 10 },
      { itemId: 'life_flower', quantity: 5 },
      { itemId: 'alchemy_fragment', quantity: 50 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27,
    craftingTime: 2040
  },
  // Lv27 - 최상급 내열 붕대
  {
    id: 'craft_supreme_heat_resistant_bandage',
    name: '최상급 내열 붕대',
    resultItemId: 'supreme_heat_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'strong_herb_powder', quantity: 6 },
      { itemId: 'flame_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27,
    craftingTime: 2040
  },
  // Lv27 - 최상급 방한 붕대
  {
    id: 'craft_supreme_cold_resistant_bandage',
    name: '최상급 방한 붕대',
    resultItemId: 'supreme_cold_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'strong_herb_powder', quantity: 6 },
      { itemId: 'ice_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27,
    craftingTime: 2040
  },
  // Lv27 - 최상급 절연 붕대
  {
    id: 'craft_supreme_insulation_bandage',
    name: '최상급 절연 붕대',
    resultItemId: 'supreme_insulation_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'strong_herb_powder', quantity: 6 },
      { itemId: 'lightning_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27,
    craftingTime: 2040
  },
  // Lv27 - 최상급 축복의 붕대
  {
    id: 'craft_supreme_blessing_bandage',
    name: '최상급 축복의 붕대',
    resultItemId: 'supreme_blessing_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'strong_herb_powder', quantity: 6 },
      { itemId: 'radiance_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27,
    craftingTime: 2040
  },
  // Lv27 - 최상급 봉인의 붕대
  {
    id: 'craft_supreme_seal_bandage',
    name: '최상급 봉인의 붕대',
    resultItemId: 'supreme_seal_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'strong_herb_powder', quantity: 6 },
      { itemId: 'seal_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27,
    craftingTime: 2040
  },
  // Lv29 - 뛰어난 자동회복 물약S
  {
    id: 'craft_excellent_auto_healing_potion_s',
    name: '뛰어난 자동회복 물약S',
    resultItemId: 'excellent_auto_healing_potion_s',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'excellent_healing_potion_s', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 180 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 29,
    craftingTime: 2400
  },
]

