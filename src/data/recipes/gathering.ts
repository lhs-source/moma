import { RECIPE_CATEGORY, type Recipe } from '../schemas/recipe'

// 채집 레시피 데이터
export const gatheringRecipes: Recipe[] = [
  {
    id: 'gather_strawberry',
    name: '딸기 채집',
    resultItemId: 'strawberry',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'strawberry_bush', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.GATHER,
    facilityLevel: 1
  },
  {
    id: 'gather_apple',
    name: '사과 채집',
    resultItemId: 'apple',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'apple_tree', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.GATHER,
    facilityLevel: 1
  },
  {
    id: 'gather_ice',
    name: '얼음 채집',
    resultItemId: 'ice',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'ice_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.GATHER,
    facilityLevel: 1
  },
  {
    id: 'gather_clam',
    name: '조개 채집',
    resultItemId: 'clam',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'clam_bed', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.GATHER,
    facilityLevel: 1
  }
]
