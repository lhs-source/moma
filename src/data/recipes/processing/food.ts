import { RECIPE_CATEGORY, type Recipe } from '../../schemas/recipe'

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
    id: 'craft_soaked_bean_process',
    name: '물에 불린 콩',
    resultItemId: 'soaked_bean',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bean', quantity: 30 },
      { itemId: 'water_bottle', quantity: 3 }
    ],
    facilityLevel: 4,
    craftingTime: 1200,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_tofu_process',
    name: '두부',
    resultItemId: 'tofu',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'soaked_bean', quantity: 3 },
      { itemId: 'water_bottle', quantity: 3 },
      { itemId: 'salt', quantity: 2 },
      { itemId: 'fabric_processed', quantity: 3 }
    ],
    facilityLevel: 4,
    craftingTime: 3300,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_soy_milk_process',
    name: '두유',
    resultItemId: 'soy_milk',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'soaked_bean', quantity: 3 },
      { itemId: 'water_bottle', quantity: 3 },
      { itemId: 'salt', quantity: 1 },
      { itemId: 'cooking_oil', quantity: 1 }
    ],
    facilityLevel: 4,
    craftingTime: 3300,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_aged_large_meat_process',
    name: '숙성된 커다란 고기',
    resultItemId: 'aged_large_meat',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'large_meat', quantity: 1 },
      { itemId: 'herb', quantity: 6 },
      { itemId: 'garlic', quantity: 2 },
      { itemId: 'salt', quantity: 2 },
      { itemId: 'pepper', quantity: 1 }
    ],
    facilityLevel: 4,
    craftingTime: 9000,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_soaked_rice_process',
    name: '물에 불린 쌀',
    resultItemId: 'soaked_rice',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'rice', quantity: 30 },
      { itemId: 'water_bottle', quantity: 6 }
    ],
    facilityLevel: 5,
    craftingTime: 600,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_cooked_rice_process',
    name: '밥',
    resultItemId: 'cooked_rice',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'soaked_rice', quantity: 8 },
      { itemId: 'water_bottle', quantity: 2 }
    ],
    facilityLevel: 5,
    craftingTime: 4500,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_dried_tea_leaf_process',
    name: '말린 찻잎',
    resultItemId: 'dried_tea_leaf',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'tea_leaf', quantity: 30 }
    ],
    facilityLevel: 5,
    craftingTime: 3600,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  },
  {
    id: 'craft_fermented_tea_leaf_process',
    name: '발효된 찻잎',
    resultItemId: 'fermented_tea_leaf',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'dried_tea_leaf', quantity: 5 },
      { itemId: 'fabric_processed', quantity: 1 }
    ],
    facilityLevel: 5,
    craftingTime: 3600,
    category: RECIPE_CATEGORY.PROCESS_FOOD
  }
]
