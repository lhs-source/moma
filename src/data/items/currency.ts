import type { Item } from "../schemas/item";
import { ITEM_CATEGORY } from "../schemas/item";

export const currencyItems: Item[] = [
  {
    id: 'gold',
    name: '골드',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.CURRENCY,
  },
];
