import type { Recipe } from '@/data/schemas/recipe'

export const recipes: Recipe[] = [
  {
    id: 'traveler_snack',
    resultItemId: 'traveler_snack',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'meat', quantity: 1 }
    ],
    facilityLevel: 1,
    type: '간편'
  },
  {
    id: 'fried_egg',
    resultItemId: 'fried_egg',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'salt', quantity: 1 }
    ],
    facilityLevel: 1,
    type: '간편'
  },
  {
    id: 'boiled_egg',
    resultItemId: 'boiled_egg',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'egg', quantity: 1 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    facilityLevel: 1,
    type: '간편'
  },
  {
    id: 'roasted_meat',
    resultItemId: 'roasted_meat',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'meat', quantity: 4 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'salt', quantity: 1 }
    ],
    facilityLevel: 1,
    type: '힘 특화'
  },
  {
    id: 'baked_potato',
    resultItemId: 'baked_potato',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'potato', quantity: 4 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'sugar', quantity: 2 }
    ],
    facilityLevel: 1,
    type: '솜씨 특화'
  },
  {
    id: 'apple_juice',
    resultItemId: 'apple_juice',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'apple', quantity: 4 },
      { itemId: 'water_bottle', quantity: 1 },
      { itemId: 'sugar', quantity: 2 }
    ],
    facilityLevel: 1,
    type: '지력 특화'
  },
  {
    id: 'mayonnaise_stir_fry',
    resultItemId: 'mayonnaise_stir_fry',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'meat', quantity: 4 },
      { itemId: 'cabbage', quantity: 1 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    facilityLevel: 1,
    type: '힘 특화'
  },
  {
    id: 'potato_salad',
    resultItemId: 'potato_salad',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'potato', quantity: 4 },
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    facilityLevel: 1,
    type: '솜씨 특화'
  },
  {
    id: 'apple_salad',
    resultItemId: 'apple_salad',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'apple', quantity: 4 },
      { itemId: 'cabbage', quantity: 2 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    facilityLevel: 1,
    type: '지력 특화'
  },
  {
    id: 'snack_to_chew',
    resultItemId: 'snack_to_chew',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'meat', quantity: 3 },
      { itemId: 'herb', quantity: 1 },
      { itemId: 'water_bottle', quantity: 1 }
    ],
    facilityLevel: 3,
    type: '기타'
  },
  {
    id: 'pork_in_milk',
    resultItemId: 'pork_in_milk',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'meat', quantity: 8 },
      { itemId: 'milk', quantity: 4 },
      { itemId: 'garlic', quantity: 2 },
      { itemId: 'herb', quantity: 2 }
    ],
    facilityLevel: 5,
    type: '힘 특화'
  },
  {
    id: 'stir_fried_vegetables',
    resultItemId: 'stir_fried_vegetables',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'potato', quantity: 8 },
      { itemId: 'onion', quantity: 3 },
      { itemId: 'cabbage', quantity: 6 },
      { itemId: 'herb', quantity: 2 }
    ],
    facilityLevel: 5,
    type: '솜씨 특화'
  },
  {
    id: 'corn_cheese',
    resultItemId: 'corn_cheese',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'corn', quantity: 10 },
      { itemId: 'cheese', quantity: 2 },
      { itemId: 'herb', quantity: 2 },
      { itemId: 'sugar', quantity: 3 }
    ],
    facilityLevel: 5,
    type: '지력 특화'
  },
  {
    id: 'cheese_fondue',
    resultItemId: 'cheese_fondue',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'meat', quantity: 8 },
      { itemId: 'cheese', quantity: 2 },
      { itemId: 'potato', quantity: 4 },
      { itemId: 'salt', quantity: 2 }
    ],
    facilityLevel: 5,
    type: '힘 특화'
  },
  {
    id: 'ricotta_cheese_salad',
    resultItemId: 'ricotta_cheese_salad',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'cabbage', quantity: 4 },
      { itemId: 'cheese', quantity: 2 },
      { itemId: 'mayonnaise', quantity: 1 }
    ],
    facilityLevel: 5,
    type: '솜씨 특화'
  },
  {
    id: 'apple_souffle',
    resultItemId: 'apple_souffle',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'apple', quantity: 8 },
      { itemId: 'flour', quantity: 2 },
      { itemId: 'egg', quantity: 4 },
      { itemId: 'sugar', quantity: 4 }
    ],
    facilityLevel: 5,
    type: '지력 특화'
  },
  {
    id: 'steamed_clams',
    resultItemId: 'steamed_clams',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'clam', quantity: 10 },
      { itemId: 'water_bottle', quantity: 5 },
      { itemId: 'lemon', quantity: 4 },
      { itemId: 'herb', quantity: 3 }
    ],
    facilityLevel: 10,
    type: '힘 특화'
  },
  {
    id: 'potato_soup',
    resultItemId: 'potato_soup',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'potato', quantity: 12 },
      { itemId: 'milk', quantity: 5 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'pepper', quantity: 6 }
    ],
    facilityLevel: 10,
    type: '솜씨 특화'
  },
  {
    id: 'ice_strawberry_juice',
    resultItemId: 'ice_strawberry_juice',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'ice', quantity: 10 },
      { itemId: 'strawberry', quantity: 6 },
      { itemId: 'herb', quantity: 3 },
      { itemId: 'sugar', quantity: 4 }
    ],
    facilityLevel: 10,
    type: '지력 특화'
  },
  {
    id: 'cream_sauce_steak',
    resultItemId: 'cream_sauce_steak',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'meat', quantity: 10 },
      { itemId: 'cream', quantity: 2 },
      { itemId: 'garlic', quantity: 4 },
      { itemId: 'pepper', quantity: 3 }
    ],
    facilityLevel: 10,
    type: '힘 특화'
  },
  {
    id: 'aglio_e_olio',
    resultItemId: 'aglio_e_olio',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'garlic', quantity: 7 },
      { itemId: 'noodle', quantity: 2 },
      { itemId: 'onion', quantity: 2 },
      { itemId: 'pepper', quantity: 2 }
    ],
    facilityLevel: 10,
    type: '솜씨 특화'
  },
  {
    id: 'apple_cream_cake',
    resultItemId: 'apple_cream_cake',
    resultQuantity: 1,
    requiredItems: [
      { itemId: 'apple', quantity: 12 },
      { itemId: 'cream', quantity: 2 },
      { itemId: 'flour', quantity: 4 },
      { itemId: 'sugar', quantity: 9 }
    ],
    facilityLevel: 10,
    type: '지력 특화'
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