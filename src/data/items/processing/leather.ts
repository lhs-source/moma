import type { Item } from "../../schemas/item";
import { ITEM_CATEGORY } from "../../schemas/item";

export const leatherProcessingItems: Item[] = [
  // 생가죽
  {
    id: 'leather',
    name: '생가죽',
    imageUrl: '/images/items/leather.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'superior_leather',
    name: '상급 생가죽',
    imageUrl: '/images/items/superior_leather.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'superior_leather_plus',
    name: '상급 생가죽+',
    imageUrl: '/images/items/superior_leather_plus.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'best_leather',
    name: '최상급 생가죽',
    imageUrl: '/images/items/best_leather.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'best_leather_plus',
    name: '최상급 생가죽+',
    imageUrl: '/images/items/best_leather_plus.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  // 가죽 가공품
  {
    id: 'leather_processed',
    name: '가죽',
    imageUrl: '/images/items/leather_processed.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'leather_plus_processed',
    name: '가죽+',
    imageUrl: '/images/items/leather_plus.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'superior_leather_processed',
    name: '상급 가죽',
    imageUrl: '/images/items/superior_leather_processed.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'superior_leather_plus_processed',
    name: '상급 가죽+',
    imageUrl: '/images/items/superior_leather_plus_processed.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'best_leather_processed',
    name: '최상급 가죽',
    imageUrl: '/images/items/best_leather_processed.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'supreme_leather_plus',
    name: '최상급 가죽+',
    imageUrl: '/images/items/supreme_leather_plus.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
];

