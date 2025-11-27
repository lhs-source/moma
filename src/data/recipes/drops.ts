import { RECIPE_CATEGORY, type Recipe } from '../schemas/recipe'

// 드랍 레시피 데이터 (몬스터 사냥으로 얻는 아이템)
export const dropRecipes: Recipe[] = [
  {
    id: 'gather_meat',
    name: '고기 채집',
    resultItemId: 'meat',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'wolf', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.DROP,
    facilityLevel: 1
  }
]
