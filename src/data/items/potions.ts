import type { Item } from "../schemas/item";
import { ITEM_CATEGORY } from "../schemas/item";

export const potionItems: Item[] = [
  // 회복 물약
  {
    id: 'healing_potion',
    name: '회복 물약',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'excellent_healing_potion',
    name: '뛰어난 회복 물약',
    imageUrl: '/images/items/excellent_healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'auto_healing_potion',
    name: '자동회복 물약',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_healing_potion',
    name: '상급 회복 물약',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_auto_healing_potion',
    name: '상급 자동회복 물약',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_healing_potion',
    name: '최상급 회복 물약',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_auto_healing_potion',
    name: '최상급 자동회복 물약',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 기본 붕대
  {
    id: 'bandage',
    name: '붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'excellent_bandage',
    name: '뛰어난 붕대',
    imageUrl: '/images/items/excellent_bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'perfect_bandage',
    name: '완벽한 붕대',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_bandage',
    name: '상급 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 내열 붕대
  {
    id: 'heat_resistant_bandage',
    name: '내열 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_heat_resistant_bandage',
    name: '상급 내열 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_heat_resistant_bandage',
    name: '최상급 내열 붕대',
    imageUrl: '/images/items/supreme_heat_resistant_bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 방한 붕대
  {
    id: 'cold_resistant_bandage',
    name: '방한 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_cold_resistant_bandage',
    name: '상급 방한 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_anti_magic_bandage',
    name: '최상급 방항 붕대',
    imageUrl: '/images/items/supreme_anti_magic_bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 절연 붕대
  {
    id: 'insulation_bandage',
    name: '절연 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_insulation_bandage',
    name: '상급 절연 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_insulation_bandage',
    name: '최상급 절연 붕대',
    imageUrl: '/images/items/supreme_insulation_bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 축복의 붕대
  {
    id: 'blessing_bandage',
    name: '축복의 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_blessing_bandage',
    name: '상급 축복의 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_blessing_bandage',
    name: '최상급 축복의 붕대',
    imageUrl: '/images/items/supreme_blessing_bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 봉인의 붕대
  {
    id: 'seal_bandage',
    name: '봉인의 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'high_seal_bandage',
    name: '상급 봉인의 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_seal_bandage',
    name: '최상급 봉인의 붕대',
    imageUrl: '/images/items/supreme_seal_bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 비약류
  // 치명타 비약
  {
    id: 'critical_potion',
    name: '치명타 비약',
    imageUrl: '/images/items/critical_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'superior_critical_potion',
    name: '상급 치명타 비약',
    imageUrl: '/images/items/superior_critical_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'ultimate_potion',
    name: '궁극의 물약',
    imageUrl: '/images/items/ultimate_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 마법 유탄
  {
    id: 'fire_bomb',
    name: '화염 마법 유탄',
    imageUrl: '/images/items/fire_bomb.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'fire_magic_bullet',
    name: '화염 마법유탄',
    imageUrl: '/images/items/fire_bomb.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'ice_magic_bullet',
    name: '얼음 마법유탄',
    imageUrl: '/images/items/default.webp',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'thunder_bomb',
    name: '번개 마법 유탄',
    imageUrl: '/images/items/thunder_bomb.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'lightning_magic_bullet',
    name: '전기 마법유탄',
    imageUrl: '/images/items/thunder_bomb.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'wind_bomb',
    name: '바람 마법 유탄',
    imageUrl: '/images/items/wind_bomb.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'acid_bomb',
    name: '산성 마법 유탄',
    imageUrl: '/images/items/acid_bomb.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 퀴아난 시리즈
  {
    id: 'quianan_healing_potion_5',
    name: '퀴아난 회복 물약 x5',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'quianan_auto_healing_potion_5',
    name: '퀴아난 자동회복 물약 x5',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'quianan_bandage_5',
    name: '퀴아난 붕대 x5',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'quianan_healing_potion_s_5',
    name: '퀴아난 회복 물약S x5',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'quianan_auto_healing_potion_s_5',
    name: '퀴아난 자동회복 물약S x5',
    imageUrl: '/images/items/healing_potion.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 최상급 붕대 시리즈
  {
    id: 'supreme_bandage_10',
    name: '최상급 붕대 x10',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_blue_bandage_10',
    name: '최상급 붕대 x10',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_heat_resistant_bandage_5',
    name: '최상급 내열 붕대 x5',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_cold_resistant_bandage_5',
    name: '최상급 방한 붕대 x5',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_insulation_bandage_5',
    name: '최상급 절연 붕대 x5',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_blessing_bandage_5',
    name: '최상급 축복의 붕대 x5',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_seal_bandage_5',
    name: '최상급 봉인의 붕대 x5',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  // 단일 아이템
  {
    id: 'quianan_bandage',
    name: '퀴아난 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
  {
    id: 'supreme_bandage',
    name: '최상급 붕대',
    imageUrl: '/images/items/bandage.png',
    category: ITEM_CATEGORY.POTION,
  },
];
