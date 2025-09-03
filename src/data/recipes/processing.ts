import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 가공 레시피 데이터
export const processingRecipes: Recipe[] = [
  {
    id: 'cream',
    name: '생크림',
    resultItemId: 'cream',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'milk', quantity: 12 },
      { itemId: 'egg', quantity: 6 },
      { itemId: 'sugar', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 3
  },
  {
    id: 'flour',
    name: '밀가루',
    resultItemId: 'flour',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'wheat', quantity: 15 },
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 2
  },
  // 가공: 마요네즈 x3 (Lv1, 45s) - 달걀 x10, 식용유 x2
  {
    id: 'mayonnaise_process',
    name: '마요네즈',
    resultItemId: 'mayonnaise',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'egg', quantity: 10 },
      { itemId: 'cooking_oil', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 1
  },
  // 가공: 식용유 x2 (Lv2, 600s) - 밀 x15
  {
    id: 'cooking_oil_process',
    name: '식용유',
    resultItemId: 'cooking_oil',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'wheat', quantity: 15 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 2
  },
  // 가공: 치즈 x3 (Lv2, 600s) - 우유 x6, 소금 x1
  {
    id: 'cheese_process',
    name: '치즈',
    resultItemId: 'cheese',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'milk', quantity: 6 },
      { itemId: 'salt', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 2
  },
  // 가공: 면 x3 (Lv3, 1500s) - 밀가루 x3, 달걀 x5, 물이 든 병 x1
  {
    id: 'noodle_process',
    name: '면',
    resultItemId: 'noodle',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'flour', quantity: 3 },
      { itemId: 'egg', quantity: 5 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 3
  },
  // 가공: 물에 불린 콩 x5 (Lv4, 1200s) - 콩 x30, 물이 든 병 x3
  {
    id: 'soaked_bean_process',
    name: '물에 불린 콩',
    resultItemId: 'soaked_bean',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bean', quantity: 30 },
      { itemId: 'water_bottle', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 4
  },
  // 가공: 두부 x3 (Lv4, 3300s) - 물에 불린 콩 x3, 물이 든 병 x3, 소금 x2, 옷감 x3
  {
    id: 'tofu_process',
    name: '두부',
    resultItemId: 'tofu',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'soaked_bean', quantity: 3 },
      { itemId: 'water_bottle', quantity: 3 },
      { itemId: 'salt', quantity: 2 },
      { itemId: 'fabric', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 4
  },
  // 가공: 두유 x3 (Lv4, 3300s) - 물에 불린 콩 x3, 물이 든 병 x3, 소금 x1, 식용유 x1
  {
    id: 'soy_milk_process',
    name: '두유',
    resultItemId: 'soy_milk',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'soaked_bean', quantity: 3 },
      { itemId: 'water_bottle', quantity: 3 },
      { itemId: 'salt', quantity: 1 },
      { itemId: 'cooking_oil', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.PROCESS,
    facilityLevel: 4
  }
]
