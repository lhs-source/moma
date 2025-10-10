import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 식재료 가공 레시피
export const foodProcessingRecipes: Recipe[] = [
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
    category: RECIPE_CATEGORY.PROCESS_FOOD
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
    category: RECIPE_CATEGORY.PROCESS_FOOD
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
    category: RECIPE_CATEGORY.PROCESS_FOOD
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
    category: RECIPE_CATEGORY.PROCESS_FOOD
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
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_bread',
    name: '빵',
    resultItemId: 'bread',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'flour', quantity: 2 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFTING_ITEM,
    facilityLevel: 1,
    craftingTime: 60
  },
]
