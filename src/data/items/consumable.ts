import type { Item } from "../schemas/item";
import { ITEM_CATEGORY } from "../schemas/item";

export const consumableItems: Item[] = [
  {
    id: 'curse_removal_potion',
    name: '저주 해제 물약',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'holy_water',
    name: '성수',
    imageUrl: '/images/items/holy_water.png',
    category: ITEM_CATEGORY.POTION,
  },
]