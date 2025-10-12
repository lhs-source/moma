import { RECIPE_CATEGORY, type Recipe } from '@/data/schemas/recipe'

// 물약 조제 레시피 데이터
export const potionCraftRecipes: Recipe[] = [
  // Lv1 - 회복 물약
  {
    id: 'craft_healing_potion',
    name: '회복 물약',
    resultItemId: 'healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 2 },
      { itemId: 'fresh_mushroom', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 1
  },
  // Lv1 - 붕대
  {
    id: 'craft_bandage',
    name: '붕대',
    resultItemId: 'bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'fabric_processed', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 1
  },
  // Lv2 - 자동회복 물약
  {
    id: 'craft_auto_healing_potion',
    name: '자동회복 물약',
    resultItemId: 'auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 2
  },
  // Lv3 - 상급 회복 물약
  {
    id: 'craft_high_healing_potion',
    name: '상급 회복 물약',
    resultItemId: 'high_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 6 },
      { itemId: 'fresh_mushroom_juice', quantity: 5 },
      { itemId: 'growing_mushroom', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3
  },
  // Lv5 - 상급 자동회복 물약
  {
    id: 'craft_high_auto_healing_potion',
    name: '상급 자동회복 물약',
    resultItemId: 'high_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5
  },
  // Lv5 - 내열 붕대
  {
    id: 'craft_heat_resistant_bandage',
    name: '내열 붕대',
    resultItemId: 'heat_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'flame_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5
  },
  // Lv5 - 방한 붕대
  {
    id: 'craft_cold_resistant_bandage',
    name: '방한 붕대',
    resultItemId: 'cold_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'ice_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5
  },
  // Lv5 - 절연 붕대
  {
    id: 'craft_insulation_bandage',
    name: '절연 붕대',
    resultItemId: 'insulation_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'lightning_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5
  },
  // Lv5 - 축복의 붕대
  {
    id: 'craft_blessing_bandage',
    name: '축복의 붕대',
    resultItemId: 'blessing_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'radiance_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5
  },
  // Lv5 - 봉인의 붕대
  {
    id: 'craft_seal_bandage',
    name: '봉인의 붕대',
    resultItemId: 'seal_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bandage', quantity: 5 },
      { itemId: 'sturdy_mushroom_powder', quantity: 3 },
      { itemId: 'seal_crystal', quantity: 1 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 5
  },
  // Lv8 - 최상급 회복 물약
  {
    id: 'craft_supreme_healing_potion',
    name: '최상급 회복 물약',
    resultItemId: 'supreme_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 12 },
      { itemId: 'clean_mushroom', quantity: 6 },
      { itemId: 'hidden_flower', quantity: 6 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 8
  },
  // Lv8 - 상급 붕대
  {
    id: 'craft_high_bandage',
    name: '상급 붕대',
    resultItemId: 'high_bandage',
    resultQuantity: 10,
    requiredItems: [
      { itemId: 'high_fabric', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 8
  },
  // Lv13 - 최상급 자동회복 물약
  {
    id: 'craft_supreme_auto_healing_potion',
    name: '최상급 자동회복 물약',
    resultItemId: 'supreme_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 60 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13
  },
  // Lv13 - 상급 내열 붕대
  {
    id: 'craft_high_heat_resistant_bandage',
    name: '상급 내열 붕대',
    resultItemId: 'high_heat_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'flame_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13
  },
  // Lv13 - 상급 방한 붕대
  {
    id: 'craft_high_cold_resistant_bandage',
    name: '상급 방한 붕대',
    resultItemId: 'high_cold_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'ice_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13
  },
  // Lv13 - 상급 절연 붕대
  {
    id: 'craft_high_insulation_bandage',
    name: '상급 절연 붕대',
    resultItemId: 'high_insulation_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'lightning_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13
  },
  // Lv13 - 상급 축복의 붕대
  {
    id: 'craft_high_blessing_bandage',
    name: '상급 축복의 붕대',
    resultItemId: 'high_blessing_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'radiance_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13
  },
  // Lv13 - 상급 봉인의 붕대
  {
    id: 'craft_high_seal_bandage',
    name: '상급 봉인의 붕대',
    resultItemId: 'high_seal_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'high_bandage', quantity: 5 },
      { itemId: 'hidden_flower_powder', quantity: 6 },
      { itemId: 'seal_crystal', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 13
  },
  // Lv15 - 뛰어난 회복 물약
  {
    id: 'craft_excellent_healing_potion',
    name: '뛰어난 회복 물약',
    resultItemId: 'excellent_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 16 },
      { itemId: 'clean_mushroom_juice', quantity: 6 },
      { itemId: 'life_gem', quantity: 2 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 15
  },
  // Lv20 - 뛰어난 자동회복 물약
  {
    id: 'craft_excellent_auto_healing_potion',
    name: '뛰어난 자동회복 물약',
    resultItemId: 'excellent_auto_healing_potion',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'excellent_healing_potion', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 20
  },
  // Lv22 - 뛰어난 붕대
  {
    id: 'craft_excellent_bandage',
    name: '뛰어난 붕대',
    resultItemId: 'excellent_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'superior_fabric_plus_processed', quantity: 5 },
      { itemId: 'scar_flower_powder', quantity: 6 },
      { itemId: 'flame_crystal', quantity: 10 },
      { itemId: 'ice_crystal', quantity: 10 },
      { itemId: 'lightning_crystal', quantity: 10 },
      { itemId: 'radiance_crystal', quantity: 10 },
      { itemId: 'seal_crystal', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 22
  },
  // Lv25 - 뛰어난 회복 물약S
  {
    id: 'craft_excellent_healing_potion_s',
    name: '뛰어난 회복 물약S',
    resultItemId: 'excellent_healing_potion_s',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 20 },
      { itemId: 'sleepy_mushroom_juice', quantity: 5 },
      { itemId: 'life_gem', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 25
  },
  // Lv27 - 최상급 내열 붕대
  {
    id: 'craft_supreme_heat_resistant_bandage',
    name: '최상급 내열 붕대',
    resultItemId: 'supreme_heat_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'calming_herb_powder', quantity: 6 },
      { itemId: 'flame_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27
  },
  // Lv27 - 최상급 방한 붕대
  {
    id: 'craft_supreme_cold_resistant_bandage',
    name: '최상급 방한 붕대',
    resultItemId: 'supreme_cold_resistant_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'calming_herb_powder', quantity: 6 },
      { itemId: 'ice_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27
  },
  // Lv27 - 최상급 절연 붕대
  {
    id: 'craft_supreme_insulation_bandage',
    name: '최상급 절연 붕대',
    resultItemId: 'supreme_insulation_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'calming_herb_powder', quantity: 6 },
      { itemId: 'lightning_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27
  },
  // Lv27 - 최상급 축복의 붕대
  {
    id: 'craft_supreme_blessing_bandage',
    name: '최상급 축복의 붕대',
    resultItemId: 'supreme_blessing_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'calming_herb_powder', quantity: 6 },
      { itemId: 'radiance_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27
  },
  // Lv27 - 최상급 봉인의 붕대
  {
    id: 'craft_supreme_seal_bandage',
    name: '최상급 봉인의 붕대',
    resultItemId: 'supreme_seal_bandage',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'supreme_bandage', quantity: 5 },
      { itemId: 'calming_herb_powder', quantity: 6 },
      { itemId: 'seal_crystal', quantity: 4 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 27
  },
  // Lv29 - 뛰어난 자동회복 물약S
  {
    id: 'craft_excellent_auto_healing_potion_s',
    name: '뛰어난 자동회복 물약S',
    resultItemId: 'excellent_auto_healing_potion_s',
    resultQuantity: 5,
    requiredItems: [
      { itemId: 'excellent_healing_potion_s', quantity: 5 },
      { itemId: 'disassembled_equipment_part', quantity: 180 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 29
  },
  
  // === 비약 제작 레시피 (이미지에서 추가) ===
  
  // 약품 제작대 Lv.1 레시피
  {
    id: 'craft_ultimate_skill_potion',
    name: '궁극기 비약',
    resultItemId: 'ultimate_skill_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'tenacity_grass', quantity: 10 },
      { itemId: 'growth_mushroom_extract', quantity: 3 },
      { itemId: 'white_flower_butterfly', quantity: 6 },
      { itemId: 'alchemy_scraps', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 1,
    requiredLevel: 4
  },
  {
    id: 'craft_damage_reduction_potion',
    name: '피해 감소 비약',
    resultItemId: 'damage_reduction_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 10 },
      { itemId: 'growth_mushroom_extract', quantity: 3 },
      { itemId: 'scythe', quantity: 6 },
      { itemId: 'alchemy_scraps', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 1,
    requiredLevel: 6
  },
  {
    id: 'craft_movement_speed_potion',
    name: '이동 속도 비약',
    resultItemId: 'movement_speed_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'arrow_flower', quantity: 10 },
      { itemId: 'growth_mushroom_extract', quantity: 3 },
      { itemId: 'bulbous', quantity: 6 },
      { itemId: 'alchemy_scraps', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 1,
    requiredLevel: 6
  },
  
  // 약품 제작대 Lv.2 레시피
  {
    id: 'craft_advanced_critical_potion',
    name: '상급 치명타 비약',
    resultItemId: 'superior_critical_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'critical_potion', quantity: 9 },
      { itemId: 'clean_mushroom_extract', quantity: 5 },
      { itemId: 'ruin_gem', quantity: 1 },
      { itemId: 'alchemy_scraps', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 2,
    requiredLevel: 10
  },
  {
    id: 'craft_advanced_ultimate_skill_potion',
    name: '상급 궁극기 비약',
    resultItemId: 'advanced_ultimate_skill_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'ultimate_skill_potion', quantity: 9 },
      { itemId: 'clean_mushroom_extract', quantity: 5 },
      { itemId: 'ruin_gem', quantity: 1 },
      { itemId: 'alchemy_scraps', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 2,
    requiredLevel: 10
  },
  {
    id: 'craft_advanced_damage_reduction_potion',
    name: '상급 피해 감소 비약',
    resultItemId: 'advanced_damage_reduction_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'damage_reduction_potion', quantity: 9 },
      { itemId: 'clean_mushroom_extract', quantity: 5 },
      { itemId: 'ruin_gem', quantity: 1 },
      { itemId: 'alchemy_scraps', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 2,
    requiredLevel: 14
  },
  {
    id: 'craft_advanced_movement_speed_potion',
    name: '상급 이동 속도 비약',
    resultItemId: 'advanced_movement_speed_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'movement_speed_potion', quantity: 9 },
      { itemId: 'clean_mushroom_extract', quantity: 5 },
      { itemId: 'ruin_gem', quantity: 1 },
      { itemId: 'alchemy_scraps', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 2,
    requiredLevel: 14
  },
  
  // 약품 제작대 Lv.3 레시피
  {
    id: 'craft_strike_enhancement_potion',
    name: '강타 강화 비약',
    resultItemId: 'strike_enhancement_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'bloody_herb', quantity: 10 },
      { itemId: 'clean_mushroom_extract', quantity: 3 },
      { itemId: 'scythe', quantity: 10 },
      { itemId: 'alchemy_scraps', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3,
    requiredLevel: 16
  },
  {
    id: 'craft_combo_enhancement_potion',
    name: '연타 강화 비약',
    resultItemId: 'combo_enhancement_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'arrow_flower', quantity: 10 },
      { itemId: 'growth_mushroom_extract', quantity: 3 },
      { itemId: 'bulbous', quantity: 10 },
      { itemId: 'alchemy_scraps', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3,
    requiredLevel: 16
  },
  {
    id: 'craft_area_enhancement_potion',
    name: '광역 강화 비약',
    resultItemId: 'area_enhancement_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'mana_herb', quantity: 10 },
      { itemId: 'growth_mushroom_extract', quantity: 3 },
      { itemId: 'white_flower_butterfly', quantity: 10 },
      { itemId: 'alchemy_scraps', quantity: 10 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3,
    requiredLevel: 16
  },
  {
    id: 'craft_mixed_enhancement_potion_landslide',
    name: '혼합 강화 비약(산사태)',
    resultItemId: 'mixed_enhancement_potion_landslide',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'strike_enhancement_potion', quantity: 3 },
      { itemId: 'combo_enhancement_potion', quantity: 3 },
      { itemId: 'enhanced_potion_emulsifier', quantity: 6 },
      { itemId: 'life_mana_stone', quantity: 10 },
      { itemId: 'fragment_of_rage', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3,
    requiredLevel: 21
  },
  {
    id: 'craft_mixed_enhancement_potion_storm',
    name: '혼합 강화 비약(폭풍우)',
    resultItemId: 'mixed_enhancement_potion_storm',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'strike_enhancement_potion', quantity: 3 },
      { itemId: 'area_enhancement_potion', quantity: 3 },
      { itemId: 'enhanced_potion_emulsifier', quantity: 6 },
      { itemId: 'life_mana_stone', quantity: 10 },
      { itemId: 'fragment_of_oblivion', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3,
    requiredLevel: 21
  },
  {
    id: 'craft_mixed_enhancement_potion_raging_waves',
    name: '혼합 강화 비약(성난 파도)',
    resultItemId: 'mixed_enhancement_potion_raging_waves',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'combo_enhancement_potion', quantity: 3 },
      { itemId: 'area_enhancement_potion', quantity: 3 },
      { itemId: 'enhanced_potion_emulsifier', quantity: 6 },
      { itemId: 'life_mana_stone', quantity: 10 },
      { itemId: 'fragment_of_wildness', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 3,
    requiredLevel: 21
  },
  
  // 약품 제작대 Lv.4 레시피
  {
    id: 'craft_advanced_strike_enhancement_potion',
    name: '상급 강타 강화 비약',
    resultItemId: 'advanced_strike_enhancement_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'strike_enhancement_potion', quantity: 5 },
      { itemId: 'amplification_mushroom_extract', quantity: 5 },
      { itemId: 'mine_mana_stone', quantity: 6 },
      { itemId: 'alchemy_scraps', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 4,
    requiredLevel: 22
  },
  {
    id: 'craft_advanced_combo_enhancement_potion',
    name: '상급 연타 강화 비약',
    resultItemId: 'advanced_combo_enhancement_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'combo_enhancement_potion', quantity: 5 },
      { itemId: 'amplification_mushroom_extract', quantity: 5 },
      { itemId: 'mine_mana_stone', quantity: 6 },
      { itemId: 'alchemy_scraps', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 4,
    requiredLevel: 22
  },
  {
    id: 'craft_advanced_area_enhancement_potion',
    name: '상급 광역 강화 비약',
    resultItemId: 'advanced_area_enhancement_potion',
    resultQuantity: 3,
    requiredItems: [
      { itemId: 'area_enhancement_potion', quantity: 5 },
      { itemId: 'amplification_mushroom_extract', quantity: 5 },
      { itemId: 'mine_mana_stone', quantity: 6 },
      { itemId: 'alchemy_scraps', quantity: 20 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 4,
    requiredLevel: 22
  },
  {
    id: 'craft_advanced_mixed_enhancement_potion_landslide',
    name: '상급 혼합 강화 비약(산사태)',
    resultItemId: 'advanced_mixed_enhancement_potion_landslide',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'advanced_strike_enhancement_potion', quantity: 3 },
      { itemId: 'advanced_combo_enhancement_potion', quantity: 3 },
      { itemId: 'enhanced_potion_emulsifier', quantity: 10 },
      { itemId: 'life_mana_stone', quantity: 25 },
      { itemId: 'fragment_of_wildness', quantity: 60 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 4,
    requiredLevel: 24
  },
  {
    id: 'craft_advanced_mixed_enhancement_potion_storm',
    name: '상급 혼합 강화 비약(폭풍우)',
    resultItemId: 'advanced_mixed_enhancement_potion_storm',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'advanced_strike_enhancement_potion', quantity: 3 },
      { itemId: 'advanced_area_enhancement_potion', quantity: 3 },
      { itemId: 'enhanced_potion_emulsifier', quantity: 10 },
      { itemId: 'life_mana_stone', quantity: 25 },
      { itemId: 'fragment_of_rage', quantity: 60 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 4,
    requiredLevel: 24
  },
  {
    id: 'craft_advanced_mixed_enhancement_potion_raging_waves',
    name: '상급 혼합 강화 비약(성난 파도)',
    resultItemId: 'advanced_mixed_enhancement_potion_raging_waves',
    resultQuantity: 2,
    requiredItems: [
      { itemId: 'advanced_combo_enhancement_potion', quantity: 3 },
      { itemId: 'advanced_area_enhancement_potion', quantity: 3 },
      { itemId: 'enhanced_potion_emulsifier', quantity: 10 },
      { itemId: 'life_mana_stone', quantity: 25 },
      { itemId: 'fragment_of_oblivion', quantity: 60 }
    ],
    category: RECIPE_CATEGORY.CRAFT_POTION,
    facilityLevel: 4,
    requiredLevel: 24
  },
]

