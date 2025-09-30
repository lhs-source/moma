import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 금속 가공 레시피
export const metalProcessingRecipes: Recipe[] = [
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
  {
    id: 'craft_cloud_steel_ingot',
    name: '운철괴',
    resultItemId: 'cloud_steel_ingot',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'silver_alloy_ingot', quantity: 5 },
      { itemId: 'cloud_iron_ore', quantity: 20 },
      { itemId: 'coal', quantity: 20 }
    ],
    facilityLevel: 6,
    craftingTime: 18000,
    category: RECIPE_CATEGORY.PROCESS_METAL
  }
]
