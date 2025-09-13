import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 약품 가공 레시피
export const medicineProcessingRecipes: Recipe[] = [
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
