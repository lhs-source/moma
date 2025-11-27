import { RECIPE_CATEGORY, type Recipe } from '../../schemas/recipe'

// 요리 레시피 데이터
export const cookingRecipes: Recipe[] = [
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
    id: 'shawarma',
    name: '샤와르마',
    resultItemId: 'shawarma',
    requiredItems: [
      { itemId: 'light_meat', quantity: 10 },
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
      { itemId: 'light_meat', quantity: 10 },
      { itemId: 'cheese', quantity: 3 },
      { itemId: 'tomato', quantity: 1 },
      { itemId: 'pepper', quantity: 1 },
      { itemId: 'salt', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 13
  },
  {
    id: 'tofu_noodles',
    name: '두부 국수',
    resultItemId: 'tofu_noodles',
    requiredItems: [
      { itemId: 'tofu', quantity: 5 },
      { itemId: 'water_bottle', quantity: 5 },
      { itemId: 'onion', quantity: 5 },
      { itemId: 'radish', quantity: 1 },
      { itemId: 'salt', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 13
  },
  {
    id: 'soy_milk_bingsu',
    name: '두유 빙수',
    resultItemId: 'soy_milk_bingsu',
    requiredItems: [
      { itemId: 'soy_milk', quantity: 4 },
      { itemId: 'ice', quantity: 10 },
      { itemId: 'lemon', quantity: 2 },
      { itemId: 'sugar', quantity: 6 },
      { itemId: 'herb', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 13
  },
  {
    id: 'tofu_steak',
    name: '두부 스테이크',
    resultItemId: 'tofu_steak',
    requiredItems: [
      { itemId: 'tofu', quantity: 5 },
      { itemId: 'parsnip', quantity: 6 },
      { itemId: 'garlic', quantity: 4 },
      { itemId: 'pepper', quantity: 3 },
      { itemId: 'cooking_oil', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 13
  },
  {
    id: 'soy_parsnip_cake',
    name: '두유 파스닙 케이크',
    resultItemId: 'soy_parsnip_cake',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'soy_milk', quantity: 4 },
      { itemId: 'parsnip', quantity: 6 },
      { itemId: 'cream', quantity: 2 },
      { itemId: 'flour', quantity: 4 },
      { itemId: 'sugar', quantity: 9 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 8
  },
  {
    id: 'taiwanese_beef_bourguignon_eternal',
    name: '대만찬: 꺼지지 않는 불의 뵈프 부르기뇽',
    resultItemId: 'taiwanese_beef_bourguignon',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'eternal_flame', quantity: 4 },
      { itemId: 'aged_large_meat', quantity: 8 },
      { itemId: 'heavy_potato', quantity: 24 },
      { itemId: 'tomato', quantity: 16 },
      { itemId: 'onion', quantity: 16 },
      { itemId: 'parsnip', quantity: 16 },
      { itemId: 'salt', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 20
  },
  {
    id: 'golden_silver_spicy_soup',
    name: '금은 매운탕',
    resultItemId: 'golden_silver_spicy_soup',
    requiredItems: [
      { itemId: 'golden_carp', quantity: 4 },
      { itemId: 'silver_fish', quantity: 4 },
      { itemId: 'radish', quantity: 6 },
      { itemId: 'water_bottle', quantity: 5 },
      { itemId: 'onion', quantity: 10 },
      { itemId: 'chili_powder', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'trout_papillote',
    name: '송어 파피요트',
    resultItemId: 'trout_papillote',
    requiredItems: [
      { itemId: 'brown_trout', quantity: 6 },
      { itemId: 'asparagus', quantity: 4 },
      { itemId: 'garlic', quantity: 6 },
      { itemId: 'lemon', quantity: 5 },
      { itemId: 'salt', quantity: 2 },
      { itemId: 'pepper', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'green_tea_crepe_cake',
    name: '녹차 크레이프 케이크',
    resultItemId: 'green_tea_crepe_cake',
    requiredItems: [
      { itemId: 'dried_tea_leaf', quantity: 10 },
      { itemId: 'strawberry', quantity: 6 },
      { itemId: 'cream', quantity: 6 },
      { itemId: 'flour', quantity: 4 },
      { itemId: 'sugar', quantity: 6 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'pumpkin_pie',
    name: '호박 파이',
    resultItemId: 'pumpkin_pie',
    requiredItems: [
      { itemId: 'pumpkin', quantity: 10 },
      { itemId: 'ginger', quantity: 2 },
      { itemId: 'cream', quantity: 3 },
      { itemId: 'flour', quantity: 4 },
      { itemId: 'sugar', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'tomato_risotto',
    name: '토마토 리소토',
    resultItemId: 'tomato_risotto',
    requiredItems: [
      { itemId: 'cooked_rice', quantity: 4 },
      { itemId: 'tomato', quantity: 2 },
      { itemId: 'onion', quantity: 3 },
      { itemId: 'cheese', quantity: 8 },
      { itemId: 'salt', quantity: 3 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'pumpkin_soup',
    name: '호박 수프',
    resultItemId: 'pumpkin_soup',
    requiredItems: [
      { itemId: 'pumpkin', quantity: 10 },
      { itemId: 'potato', quantity: 6 },
      { itemId: 'onion', quantity: 6 },
      { itemId: 'ginger', quantity: 2 },
      { itemId: 'cream', quantity: 5 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  },
  {
    id: 'curry_rice',
    name: '카레라이스',
    resultItemId: 'curry_rice',
    requiredItems: [
      { itemId: 'meat', quantity: 10 },
      { itemId: 'cooked_rice', quantity: 3 },
      { itemId: 'carrot', quantity: 3 },
      { itemId: 'potato', quantity: 8 },
      { itemId: 'curry_powder', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 5
  },
  {
    id: 'meat_pot_pie',
    name: '미트 포트파이',
    resultItemId: 'meat_pot_pie',
    requiredItems: [
      { itemId: 'light_meat', quantity: 10 },
      { itemId: 'pea', quantity: 2 },
      { itemId: 'parsnip', quantity: 6 },
      { itemId: 'flour', quantity: 4 },
      { itemId: 'milk', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.COOK,
    facilityLevel: 1
  }
]
