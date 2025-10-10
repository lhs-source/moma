import type { Item } from "../../schemas/item";
import { ITEM_CATEGORY } from "../../schemas/item";

export const foodProcessingItems: Item[] = [
  {
    id: 'mayonnaise',
    name: '마요네즈',
    imageUrl: '/images/items/mayonnaise.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'cheese',
    name: '치즈',
    imageUrl: '/images/items/cheese.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'flour',
    name: '밀가루',
    imageUrl: '/images/items/flour.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'cream',
    name: '생크림',
    imageUrl: '/images/items/cream.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'noodle',
    name: '면',
    imageUrl: '/images/items/noodle.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'soaked_bean',
    name: '물에 불린 콩',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'tofu',
    name: '두부',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'soy_milk',
    name: '두유',
    imageUrl: '/images/items/soy_milk.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'wine',
    name: '와인',
    imageUrl: '/images/items/wine.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'cooked_rice',
    name: '밥',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.MATERIAL,
  },
  // 물고기
  {
    id: 'bream',
    name: '브리흐네 잉어',
    imageUrl: '/images/items/bream.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'silver_fish',
    name: '은붕어',
    imageUrl: '/images/items/silver_fish.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'rainbow_trout',
    name: '무지개 송어',
    imageUrl: '/images/items/rainbow_trout.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'eel',
    name: '은어',
    imageUrl: '/images/items/eel.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'mackerel',
    name: '고등어',
    imageUrl: '/images/items/mackerel.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'salmon',
    name: '연어',
    imageUrl: '/images/items/salmon.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'catfish',
    name: '메기',
    imageUrl: '/images/items/catfish.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'love_fish',
    name: '참사랑어',
    imageUrl: '/images/items/love_fish.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'dark_fish',
    name: '어둠 유령 고기',
    imageUrl: '/images/items/dark_fish.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'golden_carp',
    name: '금린어',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'brown_trout',
    name: '갈색송어',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.MATERIAL,
  },
];

