import { RECIPE_CATEGORY, type Recipe } from '../../schemas/recipe'

// 가죽 가공 레시피
export const leatherProcessingRecipes: Recipe[] = [
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
      { itemId: 'best_leather', quantity: 20 },
      { itemId: 'tannin_powder', quantity: 16 }
    ],
    facilityLevel: 5,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_LEATHER
  },
  {
    id: 'craft_supreme_leather_plus',
    name: '최상급 가죽+',
    resultItemId: 'supreme_leather_plus',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'best_leather_processed', quantity: 5 },
      { itemId: 'best_leather_plus', quantity: 20 },
      { itemId: 'tannin_powder', quantity: 20 }
    ],
    facilityLevel: 6,
    craftingTime: 36000,
    category: RECIPE_CATEGORY.PROCESS_LEATHER
  }
]
