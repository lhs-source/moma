import type { Item } from "../../schemas/item";
import { ITEM_CATEGORY } from "../../schemas/item";

export const metalProcessingItems: Item[] = [
  // 광석
  {
    id: 'ore',
    name: '광석',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.OTHER,
  },
  {
    id: 'iron_ore',
    name: '철 광석',
    imageUrl: '/images/items/iron_ore.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'coal',
    name: '석탄',
    imageUrl: '/images/items/coal.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'copper_ore',
    name: '구리 광석',
    imageUrl: '/images/items/copper_ore.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'white_ore',
    name: '백동 광석',
    imageUrl: '/images/items/white_ore.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'silver_ore',
    name: '은광석',
    imageUrl: '/images/items/silver_ore.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'cloud_iron_ore',
    name: '운철광석',
    imageUrl: '/images/items/cloud_iron_ore.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'iron_ingot',
    name: '철괴',
    imageUrl: '/images/items/iron_ingot.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'steel_ingot',
    name: '강철괴',
    imageUrl: '/images/items/steel_ingot.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'alloy_steel_ingot',
    name: '합금강괴',
    imageUrl: '/images/items/alloy_steel_ingot.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'special_steel',
    name: '특수강괴',
    imageUrl: '/images/items/special_steel.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'silver_alloy_ingot',
    name: '은합금괴',
    imageUrl: '/images/items/silver_alloy_ingot.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'cloud_steel_ingot',
    name: '운철괴',
    imageUrl: '/images/items/cloud_steel_ingot.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
  {
    id: 'tar',
    name: '타르',
    imageUrl: '/images/items/tar.png',
    category: ITEM_CATEGORY.MATERIAL,
  },
];

