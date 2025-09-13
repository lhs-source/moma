import type { Item } from "../schemas/item";
import { ITEM_CATEGORY } from "../schemas/item";

export const foodIngredientItems: Item[] = [
  {
    id: 'salt',
    name: '소금',
    imageUrl: '/images/items/salt.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'herb',
    name: '허브',
    imageUrl: '/images/items/herb.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'sugar',
    name: '설탕',
    imageUrl: '/images/items/sugar.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'cabbage',
    name: '양배추',
    imageUrl: '/images/items/cabbage.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'lemon',
    name: '레몬',
    imageUrl: '/images/items/lemon.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'pepper',
    name: '후추',
    imageUrl: '/images/items/pepper.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'garlic',
    name: '마늘',
    imageUrl: '/images/items/garlic.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'tomato',
    name: '토마토',
    imageUrl: '/images/items/tomato.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
  {
    id: 'cooking_oil',
    name: '식용유',
    imageUrl: '/images/items/cooking_oil.png',
    category: ITEM_CATEGORY.FOOD_INGREDIENT,
  },
];
