import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 목재 가공 레시피
export const woodProcessingRecipes: Recipe[] = [
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
    id: 'craft_supreme_wood',
    name: '최상급 목재',
    resultItemId: 'supreme_wood',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'supreme_wood', quantity: 5 },
      { itemId: 'supreme_log', quantity: 20 },
      { itemId: 'tree_sap', quantity: 16 }
    ],
    facilityLevel: 5,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },
  {
    id: 'craft_supreme_wood_plus',
    name: '최상급 목재+',
    resultItemId: 'supreme_wood_plus',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'supreme_wood', quantity: 5 },
      { itemId: 'supreme_log_plus', quantity: 20 },
      { itemId: 'tree_sap', quantity: 20 }
    ],
    facilityLevel: 6,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  },
  {
    id: 'craft_hard_wood',
    name: '단단한 목재',
    resultItemId: 'hard_wood',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'superior_wood_plus', quantity: 15 },
      { itemId: 'hard_log', quantity: 30 },
      { itemId: 'tree_sap', quantity: 30 }
    ],
    facilityLevel: 5,
    craftingTime: 28800,
    category: RECIPE_CATEGORY.PROCESS_WOOD
  }
]
