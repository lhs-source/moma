import { RECIPE_CATEGORY, type Recipe } from '../schemas/recipe'

// 구매 레시피 데이터
export const buyingRecipes: Recipe[] = [
  // 티르코네일 - 카이틴
  {
    id: 'buy_meat_tirchonaill',
    name: '고기 구매 (티르코네일)',
    resultItemId: 'meat',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 250, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_salt_tirchonaill',
    name: '소금 구매 (티르코네일)',
    resultItemId: 'salt',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1000, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_sugar_tirchonaill',
    name: '설탕 구매 (티르코네일)',
    resultItemId: 'sugar',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1200, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_apple_tirchonaill',
    name: '사과 구매 (티르코네일)',
    resultItemId: 'apple',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 800, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_cabbage_tirchonaill',
    name: '양배추 구매 (티르코네일)',
    resultItemId: 'cabbage',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 800, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_cooking_oil_tirchonaill',
    name: '식용유 구매 (티르코네일)',
    resultItemId: 'cooking_oil',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1200, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  // 던바튼 - 글리니스
  {
    id: 'buy_meat_dunbarton',
    name: '고기 구매 (던바튼)',
    resultItemId: 'meat',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 250, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_salt_dunbarton',
    name: '소금 구매 (던바튼)',
    resultItemId: 'salt',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1000, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_sugar_dunbarton',
    name: '설탕 구매 (던바튼)',
    resultItemId: 'sugar',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1200, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_cabbage_dunbarton',
    name: '양배추 구매 (던바튼)',
    resultItemId: 'cabbage',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 800, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_cooking_oil_dunbarton',
    name: '식용유 구매 (던바튼)',
    resultItemId: 'cooking_oil',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1200, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_apple_dunbarton',
    name: '사과 구매 (던바튼)',
    resultItemId: 'apple',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 800, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_garlic_dunbarton',
    name: '마늘 구매 (던바튼)',
    resultItemId: 'garlic',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1200, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_pepper_dunbarton',
    name: '후추 구매 (던바튼)',
    resultItemId: 'pepper',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 2000, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_lemon_dunbarton',
    name: '레몬 구매 (던바튼)',
    resultItemId: 'lemon',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 3000, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_tomato_dunbarton',
    name: '토마토 구매 (던바튼)',
    resultItemId: 'tomato',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 6800, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_asparagus_dunbarton',
    name: '아스파라거스 구매 (던바튼)',
    resultItemId: 'asparagus',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 10000, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_pea_dunbarton',
    name: '완두콩 구매 (던바튼)',
    resultItemId: 'pea',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 10000, buyNpcId: 'glenis' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  // 콜헨 - 코너
  {
    id: 'buy_meat_colhen',
    name: '고기 구매 (콜헨)',
    resultItemId: 'meat',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 250, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_clam_colhen',
    name: '조개 구매 (콜헨)',
    resultItemId: 'clam',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 600, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_ice_colhen',
    name: '얼음 구매 (콜헨)',
    resultItemId: 'ice',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 600, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_strawberry_colhen',
    name: '딸기 구매 (콜헨)',
    resultItemId: 'strawberry',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1200, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_pepper_colhen',
    name: '후추 구매 (콜헨)',
    resultItemId: 'pepper',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 2000, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_tomato_colhen',
    name: '토마토 구매 (콜헨)',
    resultItemId: 'tomato',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 6800, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_asparagus_colhen',
    name: '아스파라거스 구매 (콜헨)',
    resultItemId: 'asparagus',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 10000, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_pea_colhen',
    name: '완두콩 구매 (콜헨)',
    resultItemId: 'pea',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 10000, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_wax_conner',
    name: '밀랍 구매 (콜헨)',
    resultItemId: 'wax',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 3600, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_superior_leather_conner',
    name: '상급 생가죽 구매 (콜헨)',
    resultItemId: 'superior_leather',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 600, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_superior_leather_plus_conner',
    name: '상급 생가죽+ 구매 (콜헨)',
    resultItemId: 'superior_leather_plus',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 600, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_scythe_conner',
    name: '장수풍뎅이 구매 (콜헨)',
    resultItemId: 'scythe',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 500, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_bulbous_conner',
    name: '뚝딱 반딧불이 구매 (콜헨)',
    resultItemId: 'bulbous',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 400, buyNpcId: 'conner' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  // 반호르 - 길모어
  {
    id: 'buy_superior_leather_plus_bangor',
    name: '상급 생가죽+ 구매 (반호르)',
    resultItemId: 'superior_leather_plus',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 600, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_superior_leather_bangor',
    name: '상급 생가죽 구매 (반호르)',
    resultItemId: 'superior_leather',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 600, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_best_leather_bangor',
    name: '최상급 생가죽 구매 (반호르)',
    resultItemId: 'best_leather',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 900, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_superior_web_bangor',
    name: '최상급 거미줄 구매 (반호르)',
    resultItemId: 'superior_web',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 900, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_coin_bug_bangor',
    name: '동전무당벌레 구매 (반호르)',
    resultItemId: 'coin_bug',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1000, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_tin_powder_bangor',
    name: '타닌 가루 구매 (반호르)',
    resultItemId: 'tin_powder',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 500, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_tree_juice_bangor',
    name: '나무 진액 구매 (반호르)',
    resultItemId: 'tree_juice',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 500, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_wax_bangor',
    name: '밀랍 구매 (반호르)',
    resultItemId: 'wax',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 3600, buyNpcId: 'gilmore' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  }
]
