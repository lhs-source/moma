// processing.ts에서 사용하는 아이템 ID들
const processingItems = [
  // resultItemId들
  'iron_ingot', 'steel_ingot', 'alloy_steel_ingot', 'special_steel_ingot', 'silver_alloy_ingot',
  'wood', 'wood_plus', 'superior_wood', 'superior_wood_plus', 'soft_wood', 'finest_wood',
  'leather', 'leather_plus', 'superior_leather', 'superior_leather_plus', 'finest_leather',
  'fabric', 'fabric_plus', 'superior_fabric', 'superior_fabric_plus', 'silk', 'superior_silk',
  'finest_fabric', 'finest_silk', 'mayonnaise', 'flour', 'cheese', 'noodle', 'cream',
  'fresh_mushroom_spore', 'fresh_mushroom_extract', 'sturdy_mushroom_powder', 'sturdy_mushroom_spore',
  'sturdy_mushroom_extract', 'growing_mushroom_spore', 'growing_mushroom_extract',
  'clean_mushroom_spore', 'clean_mushroom_extract', 'light_crystal', 'fire_crystal', 'ice_crystal',
  'hiding_flower_powder', 'wound_flower_powder',
  
  // requiredItems들
  'iron_ore', 'coal', 'copper_ore', 'white_copper_ore', 'silver_ore',
  'log', 'tree_sap', 'superior_log', 'superior_log_plus', 'soft_log', 'finest_log',
  'raw_leather', 'tannin_powder', 'superior_raw_leather', 'superior_raw_leather_plus', 'finest_raw_leather',
  'wool', 'superior_wool', 'superior_wool_plus', 'finest_wool', 'spider_silk', 'finest_spider_silk',
  'egg', 'cooking_oil', 'wheat', 'milk', 'salt', 'sugar', 'water_bottle',
  'fresh_mushroom', 'paper', 'sturdy_mushroom', 'growing_mushroom', 'clean_mushroom',
  'ghost_firefly', 'mana_herb', 'clay', 'sunset_butterfly', 'white_ice_beetle',
  'hiding_flower', 'wound_flower'
];

// items.ts에서 정의된 아이템 ID들 (일부만 추출)
const definedItems = [
  'iron_ingot', 'steel_ingot', 'alloy_steel_ingot', 'special_steel', 'silver_alloy_ingot',
  'wood', 'wood_plus', 'superior_wood', 'superior_wood_plus', 'smooth_wood', 'supreme_wood',
  'leather', 'leather_plus', 'superior_leather', 'superior_leather_plus', 'best_leather',
  'fabric', 'fabric_plus', 'superior_fabric', 'superior_fabric_plus', 'silk', 'superior_silk',
  'supreme_fabric', 'supreme_silk', 'mayonnaise', 'flour', 'cheese', 'noodle', 'cream',
  'fresh_mushroom_spores', 'fresh_mushroom_juice', 'sturdy_mushroom_powder', 'sturdy_mushroom_spores',
  'sturdy_mushroom_juice', 'growing_mushroom_spores', 'growing_mushroom_juice',
  'clean_mushroom_spores', 'clean_mushroom_juice', 'light_crystal', 'fire_crystal', 'ice_crystal',
  'hidden_flower_powder', 'scar_flower_powder',
  'iron_ore', 'coal', 'copper_ore', 'white_ore', 'silver_ore',
  'log', 'tree_sap', 'superior_log', 'superior_log_plus', 'smooth_log', 'supreme_log',
  'leather_processed', 'tannin_powder', 'superior_leather_processed', 'superior_leather_plus_processed',
  'best_leather_processed', 'wool', 'superior_wool', 'superior_wool_plus', 'supreme_wool',
  'spider_web', 'egg', 'cooking_oil', 'wheat', 'milk', 'salt', 'sugar', 'water_bottle',
  'fresh_mushroom', 'paper', 'sturdy_mushroom', 'clean_mushroom',
  'ghost_lantern', 'mana_herb', 'clay', 'sun_butterfly', 'white_ice_beetle',
  'hidden_flower', 'scar_flower'
];

console.log('=== Processing.ts에서 사용하는 아이템 ID들 ===');
console.log('총 개수:', processingItems.length);
console.log(processingItems.sort());

console.log('\n=== Items.ts에 정의된 아이템 ID들 ===');
console.log('총 개수:', definedItems.length);
console.log(definedItems.sort());

console.log('\n=== 누락된 아이템들 ===');
const missing = processingItems.filter(item => !definedItems.includes(item));
console.log('누락된 개수:', missing.length);
if (missing.length > 0) {
  console.log(missing.sort());
}

console.log('\n=== ID가 다른 아이템들 ===');
const differentIds = [
  { processing: 'special_steel_ingot', items: 'special_steel' },
  { processing: 'finest_wood', items: 'supreme_wood' },
  { processing: 'finest_leather', items: 'best_leather' },
  { processing: 'finest_fabric', items: 'supreme_fabric' },
  { processing: 'finest_silk', items: 'supreme_silk' },
  { processing: 'fresh_mushroom_spore', items: 'fresh_mushroom_spores' },
  { processing: 'fresh_mushroom_extract', items: 'fresh_mushroom_juice' },
  { processing: 'sturdy_mushroom_spore', items: 'sturdy_mushroom_spores' },
  { processing: 'sturdy_mushroom_extract', items: 'sturdy_mushroom_juice' },
  { processing: 'growing_mushroom_spore', items: 'growing_mushroom_spores' },
  { processing: 'growing_mushroom_extract', items: 'growing_mushroom_juice' },
  { processing: 'clean_mushroom_spore', items: 'clean_mushroom_spores' },
  { processing: 'clean_mushroom_extract', items: 'clean_mushroom_juice' },
  { processing: 'hiding_flower_powder', items: 'hidden_flower_powder' },
  { processing: 'wound_flower_powder', items: 'scar_flower_powder' },
  { processing: 'white_copper_ore', items: 'white_ore' },
  { processing: 'soft_log', items: 'smooth_log' },
  { processing: 'finest_log', items: 'supreme_log' },
  { processing: 'raw_leather', items: 'leather' },
  { processing: 'superior_raw_leather', items: 'superior_leather' },
  { processing: 'superior_raw_leather_plus', items: 'superior_leather_plus' },
  { processing: 'finest_raw_leather', items: 'best_leather' },
  { processing: 'finest_wool', items: 'supreme_wool' },
  { processing: 'spider_silk', items: 'spider_web' },
  { processing: 'finest_spider_silk', items: 'superior_web' },
  { processing: 'ghost_firefly', items: 'ghost_lantern' },
  { processing: 'sunset_butterfly', items: 'sun_butterfly' },
  { processing: 'hiding_flower', items: 'hidden_flower' },
  { processing: 'wound_flower', items: 'scar_flower' },
  { processing: 'growing_mushroom', items: 'mushroom' }
];

console.log('ID가 다른 아이템들:');
differentIds.forEach(item => {
  console.log(`- ${item.processing} (processing.ts) → ${item.items} (items.ts)`);
});
