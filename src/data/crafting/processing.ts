import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 가공 레시피 데이터 (제작 시스템용)
export const craftingProcessingRecipes: Recipe[] = [
  // 금속 가공
  {
    id: 'craft_iron_ingot',
    name: '철괴',
    resultItemId: 'iron_ingot',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'iron_ore', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.PROCESS_METAL,
    facilityLevel: 1,
    craftingTime: 60
  },
  {
    id: 'craft_steel_ingot',
    name: '강철괴',
    resultItemId: 'steel_ingot',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'iron_ingot', quantity: 3 },
      { itemId: 'coal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.PROCESS_METAL,
    facilityLevel: 2,
    craftingTime: 960
  },
  {
    id: 'craft_alloy_steel_ingot',
    name: '합금강괴',
    resultItemId: 'alloy_steel_ingot',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'steel_ingot', quantity: 3 },
      { itemId: 'copper_ore', quantity: 15 },
      { itemId: 'coal', quantity: 8 }
    ],
    category: RECIPE_CATEGORY.PROCESS_METAL,
    facilityLevel: 3,
    craftingTime: 14400
  },
  {
    id: 'craft_special_steel',
    name: '특수강괴',
    resultItemId: 'special_steel',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'alloy_steel_ingot', quantity: 4 },
      { itemId: 'white_ore', quantity: 20 },
      { itemId: 'coal', quantity: 12 }
    ],
    facilityLevel: 4,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_METAL
  },
  {
    id: 'craft_silver_alloy_ingot',
    name: '은합금괴',
    resultItemId: 'silver_alloy_ingot',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'special_steel', quantity: 5 },
      { itemId: 'silver_ore', quantity: 20 },
      { itemId: 'coal', quantity: 16 }
    ],
    facilityLevel: 5,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_METAL
  },

  // 목재 가공
  {
    id: 'craft_wood',
    name: '목재',
    resultItemId: 'wood',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'log', quantity: 10 }
    ],
    facilityLevel: 1,
    craftingTime: 90,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },
  {
    id: 'craft_wood_plus',
    name: '목재+',
    resultItemId: 'wood_plus',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'wood', quantity: 3 },
      { itemId: 'tree_sap', quantity: 4 }
    ],
    facilityLevel: 2,
    craftingTime: 1080,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },
  {
    id: 'craft_superior_wood',
    name: '상급 목재',
    resultItemId: 'superior_wood',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'wood_plus', quantity: 3 },
      { itemId: 'superior_log', quantity: 15 },
      { itemId: 'tree_sap', quantity: 8 }
    ],
    facilityLevel: 3,
    craftingTime: 14400,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },
  {
    id: 'craft_superior_wood_plus',
    name: '상급 목재+',
    resultItemId: 'superior_wood_plus',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_wood', quantity: 4 },
      { itemId: 'superior_log_plus', quantity: 20 },
      { itemId: 'tree_sap', quantity: 12 }
    ],
    facilityLevel: 4,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },
  {
    id: 'craft_soft_wood',
    name: '부드러운 목재',
    resultItemId: 'smooth_wood',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_wood_plus', quantity: 15 },
      { itemId: 'smooth_log', quantity: 30 },
      { itemId: 'tree_sap', quantity: 30 }
    ],
    facilityLevel: 5,
    craftingTime: 28800,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },
  {
    id: 'craft_finest_wood',
    name: '최상급 목재',
    resultItemId: 'superior_wood_plus',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_wood_plus', quantity: 5 },
      { itemId: 'supreme_log', quantity: 20 },
      { itemId: 'tree_sap', quantity: 16 }
    ],
    facilityLevel: 5,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },

  // 가죽 가공
  {
    id: 'craft_leather',
    name: '가죽',
    resultItemId: 'leather_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'leather', quantity: 10 }
    ],
    facilityLevel: 1,
    craftingTime: 60,
    category: RECIPE_CATEGORY.PROCESS_LEATHER
  },
  {
    id: 'craft_leather_plus_processed',
    name: '가죽+',
    resultItemId: 'leather_plus_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'leather_processed', quantity: 3 },
      { itemId: 'tannin_powder', quantity: 4 }
    ],
    facilityLevel: 2,
    craftingTime: 960,
    category: RECIPE_CATEGORY.PROCESS_LEATHER
  },
  {
    id: 'craft_superior_leather_processed',
    name: '상급 가죽',
    resultItemId: 'superior_leather_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'leather_plus_processed', quantity: 3 },
      { itemId: 'superior_leather', quantity: 15 },
      { itemId: 'tannin_powder', quantity: 8 }
    ],
    facilityLevel: 3,
    craftingTime: 14400,
    category: RECIPE_CATEGORY.PROCESS_LEATHER
  },
  {
    id: 'craft_superior_leather_plus_processed',
    name: '상급 가죽+',
    resultItemId: 'superior_leather_plus_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_leather_processed', quantity: 4 },
      { itemId: 'superior_leather_plus', quantity: 20 },
      { itemId: 'tannin_powder', quantity: 12 }
    ],
    facilityLevel: 4,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_LEATHER
  },
  {
    id: 'craft_best_leather_processed',
    name: '최상급 가죽',
    resultItemId: 'best_leather_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_leather_plus_processed', quantity: 5 },
      { itemId: 'best_leather', quantity: 30 },
      { itemId: 'tannin_powder', quantity: 16 }
    ],
    facilityLevel: 5,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_LEATHER
  },

  // 옷감 가공
  {
    id: 'craft_fabric_processed',
    name: '옷감',
    resultItemId: 'fabric_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'wool', quantity: 10 }
    ],
    facilityLevel: 1,
    craftingTime: 90,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },
  {
    id: 'craft_fabric_plus_processed',
    name: '옷감+',
    resultItemId: 'fabric_plus_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'fabric_processed', quantity: 3 }
    ],
    facilityLevel: 2,
    craftingTime: 1080,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },
  {
    id: 'craft_superior_fabric',
    name: '상급 옷감',
    resultItemId: 'superior_fabric',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'fabric_plus_processed', quantity: 3 },
      { itemId: 'superior_wool', quantity: 15 },
      { itemId: 'wool', quantity: 8 }
    ],
    facilityLevel: 3,
    craftingTime: 14400,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },
  {
    id: 'craft_superior_fabric_plus_processed',
    name: '상급 옷감+',
    resultItemId: 'superior_fabric_plus_processed',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_fabric', quantity: 4 },
      { itemId: 'superior_wool_plus', quantity: 20 },
      { itemId: 'wool', quantity: 12 }
    ],
    facilityLevel: 4,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },
  {
    id: 'craft_silk',
    name: '실크',
    resultItemId: 'silk',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'spider_web', quantity: 10 }
    ],
    facilityLevel: 2,
    craftingTime: 180,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },
  {
    id: 'craft_superior_silk',
    name: '상급 실크',
    resultItemId: 'superior_silk',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'silk', quantity: 4 },
      { itemId: 'sturdy_mushroom_juice', quantity: 8 }
    ],
    facilityLevel: 4,
    craftingTime: 21600,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },
  {
    id: 'craft_supreme_fabric',
    name: '최상급 옷감',
    resultItemId: 'supreme_fabric',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_fabric_plus_processed', quantity: 5 },
      { itemId: 'supreme_wool', quantity: 20 },
      { itemId: 'wool', quantity: 16 }
    ],
    facilityLevel: 5,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },
  {
    id: 'craft_supreme_silk',
    name: '최상급 실크',
    resultItemId: 'supreme_silk',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_silk', quantity: 4 },
      { itemId: 'superior_web', quantity: 30 },
      { itemId: 'sturdy_mushroom_juice', quantity: 16 }
    ],
    facilityLevel: 5,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  },

  // 식재료 가공
  {
    id: 'craft_mayonnaise_process',
    name: '마요네즈',
    resultItemId: 'mayonnaise',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'egg', quantity: 10 },
      { itemId: 'cooking_oil', quantity: 2 }
    ],
    facilityLevel: 1,
    craftingTime: 90,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_flour_process',
    name: '밀가루',
    resultItemId: 'flour',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'wheat', quantity: 15 }
    ],
    facilityLevel: 2,
    craftingTime: 1200,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_cheese_process',
    name: '치즈',
    resultItemId: 'cheese',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'milk', quantity: 6 },
      { itemId: 'salt', quantity: 1 }
    ],
    facilityLevel: 2,
    craftingTime: 1200,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_noodle_process',
    name: '면',
    resultItemId: 'noodle',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'flour', quantity: 3 },
      { itemId: 'egg', quantity: 5 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    facilityLevel: 3,
    craftingTime: 3000,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_cream_process',
    name: '생크림',
    resultItemId: 'cream',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'milk', quantity: 12 },
      { itemId: 'egg', quantity: 6 },
      { itemId: 'sugar', quantity: 2 }
    ],
    facilityLevel: 3,
    craftingTime: 3000,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },

  // 약품 가공
  {
    id: 'craft_fresh_mushroom_spore',
    name: '새록 버섯 포자',
    resultItemId: 'fresh_mushroom_spores',
    resultQuantity: 15,
    requiredItems: [
      { itemId: 'fresh_mushroom', quantity: 30 },
      { itemId: 'paper', quantity: 3 }
    ],
    facilityLevel: 1,
    craftingTime: 600,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_fresh_mushroom_extract',
    name: '새록 버섯 진액',
    resultItemId: 'fresh_mushroom_juice',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'fresh_mushroom_spores', quantity: 10 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    facilityLevel: 1,
    craftingTime: 60,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_sturdy_mushroom_powder',
    name: '튼튼 버섯 가루',
    resultItemId: 'sturdy_mushroom_powder',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'sturdy_mushroom', quantity: 20 }
    ],
    facilityLevel: 2,
    craftingTime: 300,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_sturdy_mushroom_spore',
    name: '튼튼 버섯 포자',
    resultItemId: 'sturdy_mushroom_spores',
    resultQuantity: 15,
    requiredItems: [
      { itemId: 'sturdy_mushroom', quantity: 30 },
      { itemId: 'paper', quantity: 3 }
    ],
    facilityLevel: 2,
    craftingTime: 600,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_sturdy_mushroom_extract',
    name: '튼튼 버섯 진액',
    resultItemId: 'sturdy_mushroom_juice',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'sturdy_mushroom_spores', quantity: 10 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    facilityLevel: 2,
    craftingTime: 600,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_growing_mushroom_spore',
    name: '쑥쑥 버섯 포자',
    resultItemId: 'growing_mushroom_spores',
    resultQuantity: 15,
    requiredItems: [
      { itemId: 'growing_mushroom', quantity: 30 },
      { itemId: 'paper', quantity: 3 }
    ],
    facilityLevel: 3,
    craftingTime: 720,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_growing_mushroom_extract',
    name: '쑥쑥 버섯 진액',
    resultItemId: 'growing_mushroom_juice',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'growing_mushroom_spores', quantity: 10 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    facilityLevel: 3,
    craftingTime: 3600,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_clean_mushroom_spore',
    name: '깔끔 버섯 포자',
    resultItemId: 'clean_mushroom_spores',
    resultQuantity: 15,
    requiredItems: [
      { itemId: 'clean_mushroom', quantity: 30 },
      { itemId: 'paper', quantity: 3 }
    ],
    facilityLevel: 4,
    craftingTime: 3000,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_clean_mushroom_extract',
    name: '깔끔 버섯 진액',
    resultItemId: 'clean_mushroom_juice',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'clean_mushroom_spores', quantity: 10 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    facilityLevel: 4,
    craftingTime: 7200,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_light_crystal',
    name: '광휘의 결정',
    resultItemId: 'light_crystal',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'ghost_lantern', quantity: 3 },
      { itemId: 'mana_herb', quantity: 10 },
      { itemId: 'clay', quantity: 3 }
    ],
    facilityLevel: 3,
    craftingTime: 1200,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_fire_crystal',
    name: '불꽃의 결정',
    resultItemId: 'fire_crystal',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'sun_butterfly', quantity: 3 },
      { itemId: 'mana_herb', quantity: 10 },
      { itemId: 'clay', quantity: 3 }
    ],
    facilityLevel: 3,
    craftingTime: 1200,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_ice_crystal',
    name: '얼음의 결정',
    resultItemId: 'ice_crystal',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'white_ice_beetle', quantity: 3 },
      { itemId: 'mana_herb', quantity: 10 },
      { itemId: 'clay', quantity: 3 }
    ],
    facilityLevel: 3,
    craftingTime: 1200,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_hiding_flower_powder',
    name: '숨숨꽃 가루',
    resultItemId: 'hidden_flower_powder',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'hidden_flower', quantity: 20 }
    ],
    facilityLevel: 3,
    craftingTime: 1800,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  },
  {
    id: 'craft_wound_flower_powder',
    name: '생채기꽃 가루',
    resultItemId: 'scar_flower_powder',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'scar_flower', quantity: 20 }
    ],
    facilityLevel: 5,
    craftingTime: 30000,
    category: RECIPE_CATEGORY.PROCESS_ITEM
  }
]
