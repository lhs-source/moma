import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 옷감 가공 레시피
export const fabricProcessingRecipes: Recipe[] = [
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
  {
    id: 'craft_supreme_fabric_plus',
    name: '최상급 옷감+',
    resultItemId: 'supreme_fabric_plus',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'supreme_fabric', quantity: 5 },
      { itemId: 'supreme_wool_plus', quantity: 20 },
      { itemId: 'wool', quantity: 20 }
    ],
    facilityLevel: 6,
    craftingTime: 18000,
    category: RECIPE_CATEGORY.PROCESS_FABRIC
  }
]
