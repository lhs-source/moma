import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// https://www.inven.co.kr/board/mabimo/6366/134
export const recipes: Recipe[] = [
  {
    id: 'travelers_snack',
    name: '여행자 간식',
    resultItemId: 'travelers_snack',
    requiredItems: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'meat', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'fried_egg',
    name: '달걀프라이',
    resultItemId: 'fried_egg',
    requiredItems: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'salt', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'boiled_egg',
    name: '삶은 달걀',
    resultItemId: 'boiled_egg',
    requiredItems: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'roasted_meat',
    name: '구운 고기',
    resultItemId: 'roasted_meat',
    requiredItems: [
      { itemId: 'meat', quantity: 4 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'salt', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'roasted_potato',
    name: '통감자구이',
    resultItemId: 'roasted_potato',
    requiredItems: [
      { itemId: 'potato', quantity: 4 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'sugar', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'apple_juice',
    name: '사과 주스',
    resultItemId: 'apple_juice',
    requiredItems: [
      { itemId: 'apple', quantity: 4 },
      { itemId: 'water_bottle', quantity: 1 },
      { itemId: 'sugar', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'mayonnaise_stir_fry',
    name: '마요네즈 고기볶음',
    resultItemId: 'mayonnaise_stir_fry',
    requiredItems: [
      { itemId: 'meat', quantity: 4 },
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'potato_salad',
    name: '감자 샐러드',
    resultItemId: 'potato_salad',
    requiredItems: [
      { itemId: 'potato', quantity: 4 },
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'apple_salad',
    name: '사과 샐러드',
    resultItemId: 'apple_salad',
    requiredItems: [
      { itemId: 'apple', quantity: 4 },
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'snack_to_eat',
    name: '짜먹는 간식',
    resultItemId: 'snack_to_eat',
    requiredItems: [
      { itemId: 'meat', quantity: 3 },
      { itemId: 'herb', quantity: 1 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 3
  },
  {
    id: 'fork_in_milk',
    name: '포크 인 밀크',
    resultItemId: 'fork_in_milk',
    requiredItems: [
      { itemId: 'meat', quantity: 8 },
      { itemId: 'milk', quantity: 4 },
      { itemId: 'garlic', quantity: 2 },
      { itemId: 'herb', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'stir_fried_vegetables',
    name: '야채볶음',
    resultItemId: 'stir_fried_vegetables',
    requiredItems: [
      { itemId: 'potato', quantity: 8 },
      { itemId: 'onion', quantity: 3 },
      { itemId: 'cabbage', quantity: 6 },
      { itemId: 'herb', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'corn_cheese',
    name: '콘치즈',
    resultItemId: 'corn_cheese',
    requiredItems: [
      { itemId: 'corn', quantity: 10 },
      { itemId: 'cheese', quantity: 2 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'sugar', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'cheese_fondue',
    name: '치즈 퐁뒤',
    resultItemId: 'cheese_fondue',
    requiredItems: [
      { itemId: 'meat', quantity: 8 },
      { itemId: 'cheese', quantity: 2 },
      { itemId: 'potato', quantity: 4 },
      { itemId: 'salt', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'ricotta_cheese_salad',
    name: '리코타 치즈 샐러드',
    resultItemId: 'ricotta_cheese_salad',
    requiredItems: [
      { itemId: 'cabbage', quantity: 4 },
      { itemId: 'cheese', quantity: 2 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'apple_souffle',
    name: '사과 수플레',
    resultItemId: 'apple_souffle',
    requiredItems: [
      { itemId: 'apple', quantity: 8 },
      { itemId: 'flour', quantity: 2 },
      { itemId: 'egg', quantity: 4 },
      { itemId: 'sugar', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'steamed_clams',
    name: '조개찜',
    resultItemId: 'clam_chowder',
    requiredItems: [
      { itemId: 'clam', quantity: 10 },
      { itemId: 'water_bottle', quantity: 5 },
      { itemId: 'lemon', quantity: 4 },
      { itemId: 'herb', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 10
  },
  {
    id: 'potato_soup',
    name: '감자수프',
    resultItemId: 'potato_soup',
    requiredItems: [
      { itemId: 'potato', quantity: 12 },
      { itemId: 'milk', quantity: 5 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'pepper', quantity: 6 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 10
  },
  {
    id: 'ice_strawberry_juice',
    name: '얼음 딸기주스',
    resultItemId: 'ice_fruit_juice',
    requiredItems: [
      { itemId: 'ice', quantity: 10 },
      { itemId: 'strawberry', quantity: 6 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'sugar', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 10
  },
  {
    id: 'cream_sauce_steak',
    name: '크림소스 스테이크',
    resultItemId: 'cream_sauce_steak',
    requiredItems: [
      { itemId: 'meat', quantity: 10 },
      { itemId: 'cream', quantity: 2 },
      { itemId: 'garlic', quantity: 4 },
      { itemId: 'pepper', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 10
  },
  {
    id: 'aglio_e_olio',
    name: '알리오 올리오',
    resultItemId: 'alrio_orio',
    requiredItems: [
      { itemId: 'garlic', quantity: 7 },
      { itemId: 'noodle', quantity: 2 },
      { itemId: 'onion', quantity: 2 },
      { itemId: 'pepper', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 10
  },
  {
    id: 'apple_cream_cake',
    name: '사과 생크림 케이크',
    resultItemId: 'apple_cream_cake',
    requiredItems: [
      { itemId: 'apple', quantity: 12 },
      { itemId: 'cream', quantity: 2 },
      { itemId: 'flour', quantity: 4 },
      { itemId: 'sugar', quantity: 9 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 10
  },
  {
    id: 'white_fish_meuniere',
    name: '화이트 피시 무니에르',
    resultItemId: 'white_fish_meuniere',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'bream', quantity: 5 },
      { itemId: 'silver_fish', quantity: 3 },
      { itemId: 'potato', quantity: 5 },
      { itemId: 'flour', quantity: 3 },
      { itemId: 'lemon', quantity: 5 },
      { itemId: 'salt', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 15
  },
  {
    id: 'bouillabaisse',
    name: '부야베스',
    resultItemId: 'bouillabaisse',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'rainbow_trout', quantity: 4 },
      { itemId: 'eel', quantity: 4 },
      { itemId: 'tomato', quantity: 6 },
      { itemId: 'clam', quantity: 5 },
      { itemId: 'onion', quantity: 2 },
      { itemId: 'garlic', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 15
  },
  {
    id: 'mackerel_and_salmon_steak',
    name: '고등어 연어 스테이크',
    resultItemId: 'mackerel_and_salmon_steak',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'mackerel', quantity: 5 },
      { itemId: 'salmon', quantity: 3 },
      { itemId: 'mayonnaise', quantity: 2 },
      { itemId: 'asparagus', quantity: 4 },
      { itemId: 'salt', quantity: 2 },
      { itemId: 'pepper', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 15
  },
  {
    id: 'catfish_fish_and_chips',
    name: '메기 피쉬 앤 칩스',
    resultItemId: 'catfish_fish_and_chips',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'catfish', quantity: 6 },
      { itemId: 'potato', quantity: 6 },
      { itemId: 'flour', quantity: 3 },
      { itemId: 'pea', quantity: 4 },
      { itemId: 'lemon', quantity: 2 },
      { itemId: 'salt', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 15
  },
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
    facilityLevel: 5
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
    facilityLevel: 5
  },
  {
    id: 'shawarma',
    name: '샤와르마',
    resultItemId: 'shawarma',
    requiredItems: [
      { itemId: 'lean_meat', quantity: 10 },
      { itemId: 'bean', quantity: 12 },
      { itemId: 'flour', quantity: 3 },
      { itemId: 'cabbage', quantity: 5 },
      { itemId: 'lemon', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 13
  },
  {
    id: 'meat_parmigiana',
    name: '미트 파르미자나',
    resultItemId: 'meat_parmigiana',
    requiredItems: [
      { itemId: 'lean_meat', quantity: 10 },
      { itemId: 'cheese', quantity: 3 },
      { itemId: 'tomato', quantity: 1 },
      { itemId: 'pepper', quantity: 1 },
      { itemId: 'salt', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 13
  },
  // 구매 가능한 아이템들
  {
    id: 'buy_salt',
    name: '소금 구매',
    resultItemId: 'salt',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1000, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_herb',
    name: '허브 구매',
    resultItemId: 'herb',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 30, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_sugar',
    name: '설탕 구매',
    resultItemId: 'sugar',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 1200, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_cabbage',
    name: '양배추 구매',
    resultItemId: 'cabbage',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 800, buyNpcId: 'kaitin' }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_lemon',
    name: '레몬 구매',
    resultItemId: 'lemon',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 3000 }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_pepper',
    name: '후추 구매',
    resultItemId: 'pepper',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 45 }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_garlic',
    name: '마늘 구매',
    resultItemId: 'garlic',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_tomato',
    name: '토마토 구매',
    resultItemId: 'tomato',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 30 }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  {
    id: 'buy_cooking_oil',
    name: '식용유 구매',
    resultItemId: 'cooking_oil',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'gold', quantity: 60 }
    ],
    category: RECIPE_CATEGORY.BUY,
    facilityLevel: 1
  },
  // 티르코네일 - 케이틴
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
  }
]