import type { Recipe } from '@/data/schemas/recipe'

export const recipes: Recipe[] = [
  {
    id: 'travelers_snack',
    name: '여행자 간식',
    resultItemId: 'travelers_snack',
    requiredItems: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'meat', quantity: 1 }
    ],
    category: '간편',
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
    category: '간편',
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
    category: '간편',
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
    category: '힘 특화',
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
    category: '솜씨 특화',
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
    category: '지력 특화',
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
    category: '힘 특화',
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
    category: '솜씨 특화',
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
    category: '지력 특화',
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
    category: '기타',
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
    category: '힘 특화',
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
    category: '솜씨 특화',
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
    category: '지력 특화',
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
    category: '힘 특화',
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
    category: '솜씨 특화',
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
    category: '지력 특화',
    facilityLevel: 5
  },
  {
    id: 'steamed_clams',
    name: '조개찜',
    resultItemId: 'steamed_clams',
    requiredItems: [
      { itemId: 'clam', quantity: 10 },
      { itemId: 'water_bottle', quantity: 5 },
      { itemId: 'lemon', quantity: 4 },
      { itemId: 'herb', quantity: 3 }
    ],
    category: '힘 특화',
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
    category: '솜씨 특화',
    facilityLevel: 10
  },
  {
    id: 'ice_strawberry_juice',
    name: '얼음 딸기주스',
    resultItemId: 'ice_strawberry_juice',
    requiredItems: [
      { itemId: 'ice', quantity: 10 },
      { itemId: 'strawberry', quantity: 6 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'sugar', quantity: 4 }
    ],
    category: '지력 특화',
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
    category: '힘 특화',
    facilityLevel: 10
  },
  {
    id: 'aglio_e_olio',
    name: '알리오 올리오',
    resultItemId: 'aglio_e_olio',
    requiredItems: [
      { itemId: 'garlic', quantity: 7 },
      { itemId: 'noodle', quantity: 2 },
      { itemId: 'onion', quantity: 2 },
      { itemId: 'pepper', quantity: 2 }
    ],
    category: '솜씨 특화',
    facilityLevel: 10
  },
  {
    id: 'apple_cream_cake',
    name: '사과 생크림케이트',
    resultItemId: 'apple_cream_cake',
    requiredItems: [
      { itemId: 'apple', quantity: 12 },
      { itemId: 'cream', quantity: 2 },
      { itemId: 'flour', quantity: 4 },
      { itemId: 'sugar', quantity: 9 }
    ],
    category: '지력 특화',
    facilityLevel: 10
  },
  {
    id: 'white_fish_meuniere',
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
    facilityLevel: 15,
    type: '쉐어링'
  },
  {
    id: 'bouillabaisse',
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
    facilityLevel: 15,
    type: '쉐어링'
  },
  {
    id: 'mackerel_and_salmon_steak',
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
    facilityLevel: 15,
    type: '쉐어링'
  },
  {
    id: 'catfish_fish_and_chips',
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
    facilityLevel: 15,
    type: '쉐어링'
  }
] 