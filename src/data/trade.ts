import type { Trade } from './schemas/trade'

export const trades: Trade[] = [
  {
    id: 'nora_travelers_snack',
    npcId: 'nora',
    giveItemId: 'malcolms_pillow',
    receiveItemId: 'travelers_snack', // 여행자 간식
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'deian_superior_wool',
    npcId: 'deian',
    giveItemId: 'pet_food',
    receiveItemId: 'superior_wool', // 상급 양털
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'dilis_four_leaf_clover',
    npcId: 'dilis',
    giveItemId: 'growing_mushroom',
    receiveItemId: 'four_leaf_clover', // 네잎클로버
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'lasa_alchemy_catalyst_1',
    npcId: 'lasa',
    giveItemId: 'apple_juice',
    receiveItemId: 'alchemy_catalyst', // 고급 룬합성 촉매
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'lasa_alchemy_catalyst_2',
    npcId: 'lasa',
    giveItemId: 'alchemy_powder',
    receiveItemId: 'alchemy_catalyst', // 고급 룬합성 촉매
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'none',
    scope: 'character',
    maxExchanges: 0,
    isEnabled: true
  },
  {
    id: 'lasa_rare_alchemy_catalyst',
    npcId: 'lasa',
    giveItemId: 'alchemy_catalyst',
    receiveItemId: 'rare_alchemy_catalyst', // 레어 룬합성 촉매
    giveQuantity: 15,
    receiveQuantity: 1,
    type: 'none',
    scope: 'character',
    maxExchanges: 0,
    isEnabled: true
  },
  {
    id: 'reynald_critical_potion',
    npcId: 'reynald',
    giveItemId: 'mayonnaise_stir_fry',
    receiveItemId: 'critical_potion', // 치명타 비약
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'malcolm_blank_score',
    npcId: 'malcolm',
    giveItemId: 'wool',
    receiveItemId: 'blank_score', // 빈 악보
    giveQuantity: 50,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'malcolm_pillow',
    npcId: 'malcolm',
    giveItemId: 'spider_web',
    receiveItemId: 'malcolms_pillow', // 말콤의 푹신한 양털 베개
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'malcolm_workbench',
    npcId: 'malcolm',
    giveItemId: 'campfire_kit',
    receiveItemId: 'workbench_blueprint', // 다목적 제작대 설계도 (3레벨)
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'maven_holy_water',
    npcId: 'maven',
    giveItemId: 'kaitin_bread',
    receiveItemId: 'holy_water', // 성수
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'account',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'alisa_alchemy_powder_1',
    npcId: 'alisa',
    giveItemId: 'egg',
    receiveItemId: 'alchemy_powder', // 연금술 부스러기
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'alisa_alchemy_powder_2',
    npcId: 'alisa',
    giveItemId: 'lavender',
    receiveItemId: 'alchemy_powder', // 연금술 부스러기
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'alisa_wheat_flour_1',
    npcId: 'alisa',
    giveItemId: 'egg',
    receiveItemId: 'wheat_flour', // 밀가루
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'alisa_wheat_flour_2',
    npcId: 'alisa',
    giveItemId: 'lavender',
    receiveItemId: 'wheat_flour', // 밀가루
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'endelion_holy_water',
    npcId: 'endelion',
    giveItemId: 'kaitin_bread',
    receiveItemId: 'holy_water', // 성수
    giveQuantity: 10,
    receiveQuantity: 10,
    type: 'account',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'kaitin_bread_trade',
    npcId: 'kaitin',
    giveItemId: 'milk',
    receiveItemId: 'kaitin_bread', // 케이틴 특제 통밀빵
    giveQuantity: 10,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'kaitin_food_processing',
    npcId: 'kaitin',
    giveItemId: 'wheat_flour',
    receiveItemId: 'food_processing_blueprint', // 식재료 가공 시설 설계도 (3레벨)
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'fergus_iron_ore',
    npcId: 'fergus',
    giveItemId: 'equipment_parts',
    receiveItemId: 'iron_ore', // 철 광석
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'fergus_coal',
    npcId: 'fergus',
    giveItemId: 'equipment_parts',
    receiveItemId: 'coal', // 석탄
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'fergus_alloy_steel',
    npcId: 'fergus',
    giveItemId: 'steel_ingot',
    receiveItemId: 'alloy_steel_ingot', // 합금강괴
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 4,
    isEnabled: true
  },
  // 두갈드아일 > 엘빈
  {
    id: 'elvin_tannin',
    npcId: 'elvin',
    giveItemId: 'leather',
    receiveItemId: 'tannin_powder', // 타닌 가루
    giveQuantity: 5,
    receiveQuantity: 5,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'elvin_superior_log',
    npcId: 'elvin',
    giveItemId: 'superior_leather',
    receiveItemId: 'superior_log', // 상급 통나무
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'elvin_superior_wood',
    npcId: 'elvin',
    giveItemId: 'stir_fried_vegetables',
    receiveItemId: 'superior_wood', // 상급 목재
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'elvin_leather_processing',
    npcId: 'elvin',
    giveItemId: 'superior_fabric_plus',
    receiveItemId: 'leather_processing_blueprint', // 가죽 가공 시설 설계도 (3레벨)
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  // 두갈드아일 > 트레이시
  {
    id: 'tracy_leather',
    npcId: 'tracy',
    giveItemId: 'log',
    receiveItemId: 'leather', // 생가죽
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'tracy_superior_leather',
    npcId: 'tracy',
    giveItemId: 'log',
    receiveItemId: 'superior_leather', // 상급 생가죽
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'tracy_tree_sap',
    npcId: 'tracy',
    giveItemId: 'superior_log',
    receiveItemId: 'tree_sap', // 나무 진액
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'tracy_wood_carving',
    npcId: 'tracy',
    giveItemId: 'clam_chowder',
    receiveItemId: 'tracy_wood_carving', // 트레이시의 원목 오르골
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'tracy_wood_processing',
    npcId: 'tracy',
    giveItemId: 'caterpillar',
    receiveItemId: 'wood_processing_blueprint', // 목재 가공 시설 설계도 (3레벨)
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'glenis_glenis_cake',
    npcId: 'glenis',
    giveItemId: 'fork_in_milk',
    receiveItemId: 'glenis_cake', // 글리니스 수제 케이크
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'glenis_glenis_apple_milk_tea',
    npcId: 'glenis',
    giveItemId: 'cream',
    receiveItemId: 'glenis_apple_milk_tea', // 글리니스의 애플 밀크티
    giveQuantity: 4,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'glenis_food_processing',
    npcId: 'glenis',
    giveItemId: 'apple_soup',
    receiveItemId: 'food_processing_blueprint', // 식재료 가공 시설 설계도 (3레벨)
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'manus_life_gem',
    npcId: 'manus',
    giveItemId: 'pet_food',
    receiveItemId: 'life_gem', // 생명의 마나석
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'walter_superior_wood',
    npcId: 'walter',
    giveItemId: 'tracy_wood_carving',
    receiveItemId: 'processed_leather', // 가죽
    giveQuantity: 1,
    receiveQuantity: 6,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'walter_heart_token',
    npcId: 'walter',
    giveItemId: 'love_fish',
    receiveItemId: 'heart_token', // 하트 토큰
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'walter_fire_bomb',
    npcId: 'walter',
    giveItemId: 'dark_fish',
    receiveItemId: 'fire_bomb', // 화염 마법 유탄
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'walter_thunder_bomb',
    npcId: 'walter',
    giveItemId: 'dark_fish',
    receiveItemId: 'thunder_bomb', // 번개 마법 유탄
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'walter_wind_bomb',
    npcId: 'walter',
    giveItemId: 'dark_fish',
    receiveItemId: 'wind_bomb', // 바람 마법 유탄
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'walter_acid_bomb',
    npcId: 'walter',
    giveItemId: 'dark_fish',
    receiveItemId: 'acid_bomb', // 산성 마법 유탄
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'stewart_fire_crystal',
    npcId: 'stewart',
    giveItemId: 'alchemy_powder',
    receiveItemId: 'fire_crystal', // 불꽃의 결정
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'stewart_ice_crystal',
    npcId: 'stewart',
    giveItemId: 'alchemy_powder',
    receiveItemId: 'ice_crystal', // 얼음의 결정
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'stewart_electric_crystal',
    npcId: 'stewart',
    giveItemId: 'alchemy_powder',
    receiveItemId: 'electric_crystal', // 전기의 결정
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'stewart_light_crystal',
    npcId: 'stewart',
    giveItemId: 'alchemy_powder',
    receiveItemId: 'light_crystal', // 광휘의 결정
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'stewart_seal_crystal',
    npcId: 'stewart',
    giveItemId: 'alchemy_powder',
    receiveItemId: 'seal_crystal', // 봉인의 결정
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'simon_dye_base',
    npcId: 'simon',
    giveItemId: 'superior_silk',
    receiveItemId: 'dye_base', // 염료 기본재
    giveQuantity: 10,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'simon_silk_fabric',
    npcId: 'simon',
    giveItemId: 'ghost_lantern',
    receiveItemId: 'silk_fabric', // 옷감 가공 시설 설계도 (3레벨)
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'simon_armor_blueprint',
    npcId: 'simon',
    giveItemId: 'sanded_ferodotS',
    receiveItemId: 'armor_blueprint', // 방어구 제작대 설계도 (3레벨)
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'aranwen_ultimate_potion',
    npcId: 'aranwen',
    giveItemId: 'potato_salad',
    receiveItemId: 'ultimate_potion', // 궁극의 물약
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'aranwen_spirit_trace',
    npcId: 'aranwen',
    giveItemId: 'class_master_medal',
    receiveItemId: 'spirit_trace', // 정령의 흔적
    giveQuantity: 1,
    receiveQuantity: 20,
    type: 'none',
    scope: 'character',
    maxExchanges: 0,
    isEnabled: true
  },
  {
    id: 'aira_paper',
    npcId: 'aira',
    giveItemId: 'orphan_novel',
    receiveItemId: 'paper', // 종이
    giveQuantity: 1,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'jerome_silk',
    npcId: 'jerome',
    giveItemId: 'ricotta_cheese_salad',
    receiveItemId: 'silk', // 실크
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'jerome_superior_silk',
    npcId: 'jerome',
    giveItemId: 'cream_sauce_steak',
    receiveItemId: 'superior_silk', // 상급 실크
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'jamie_superior_fabric',
    npcId: 'jamie',
    giveItemId: 'apple_soup',
    receiveItemId: 'superior_fabric', // 상급 옷감
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'jamie_superior_fabric_plus',
    npcId: 'jamie',
    giveItemId: 'apple_cream_cake',
    receiveItemId: 'superior_fabric_plus', // 상급 옷감+
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'calix_superior_wood',
    npcId: 'calix',
    giveItemId: 'glenis_apple_milk_tea',
    receiveItemId: 'leather_plus', // 가죽+
    giveQuantity: 2,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'flora_orphan_novel',
    npcId: 'flora',
    giveItemId: 'glenis_cake',
    receiveItemId: 'orphan_novel', // 주인 없는 소설책
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'karin_pet_food',
    npcId: 'karin',
    giveItemId: 'potato_soup',
    receiveItemId: 'pet_food', // 펫 먹이
    giveQuantity: 3,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'armis_special_steel',
    npcId: 'armis',
    giveItemId: 'special_steel',
    receiveItemId: 'silver_alloy_ingot', // 은합금괴
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'armis_copper_ore',
    npcId: 'armis',
    giveItemId: 'white_ore',
    receiveItemId: 'copper_ore', // 구리 광석
    giveQuantity: 1,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'armis_metal_processing',
    npcId: 'armis',
    giveItemId: 'coal',
    receiveItemId: 'metal_processing_blueprint', // 금속 가공 시설 설계도 (3레벨)
    giveQuantity: 20,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'armis_weapon_blueprint',
    npcId: 'armis',
    giveItemId: 'fire_bomb',
    receiveItemId: 'weapon_blueprint', // 무기 제작대 설계도 (3레벨)
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'keaira_cave_gem',
    npcId: 'keaira',
    giveItemId: 'superior_wood_plus',
    receiveItemId: 'condensed_wind', // 응축된 바람
    giveQuantity: 10,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'keaira_ruin_gem',
    npcId: 'keaira',
    giveItemId: 'superior_wood_plus',
    receiveItemId: 'poison_sac', // 독주머니
    giveQuantity: 10,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'keaira_superior_critical_potion',
    npcId: 'keaira',
    giveItemId: 'ice_fruit_juice',
    receiveItemId: 'superior_critical_potion', // 상급 치명타 비약
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'conor_four_leaf_clover',
    npcId: 'conner',
    giveItemId: 'health_drink',
    receiveItemId: 'four_leaf_clover', // 네잎클로버
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'conor_ruin_gem',
    npcId: 'conner',
    giveItemId: 'chrysanthemum_ear',
    receiveItemId: 'ruin_gem', // 폐허의 마나석
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'killian_healthy_drink',
    npcId: 'killian',
    giveItemId: 'clean_mushroom_spores',
    receiveItemId: 'healthy_drink', // 건강 음료
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'killian_four_leaf_clover',
    npcId: 'killian',
    giveItemId: 'alrio_orio',
    receiveItemId: 'four_leaf_clover', // 네잎클로버
    giveQuantity: 1,
    receiveQuantity: 8,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'killian_medicine_processing',
    npcId: 'killian',
    giveItemId: 'poison_bag',
    receiveItemId: 'medicine_processing_blueprint', // 의약품 가공 시설 설계도 (3레벨)
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'killian_medicine_blueprint',
    npcId: 'killian',
    giveItemId: 'sun_butterfly',
    receiveItemId: 'medicine_blueprint', // 의약품 제작대 설계도 (3레벨)
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'simon_perfect_bandage',
    npcId: 'simon',
    giveItemId: 'perfect_bandage',
    receiveItemId: 'fabric_plus', // 옷감+
    giveQuantity: 100,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'armis_curse_removal_bandage',
    npcId: 'armis',
    giveItemId: 'curse_removal_potion_bandage',
    receiveItemId: 'holy_water', // 성수
    giveQuantity: 100,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'keaira_holy_water',
    npcId: 'keaira',
    giveItemId: 'holy_water',
    receiveItemId: 'water_bottle', // 물이 든 병
    giveQuantity: 10,
    receiveQuantity: 50,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'calix_immortality_powder_lemon',
    npcId: 'calix',
    giveItemId: 'immortality_powder',
    receiveItemId: 'lemon', // 레몬
    giveQuantity: 5,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'calix_immortality_powder_pepper',
    npcId: 'calix',
    giveItemId: 'immortality_powder',
    receiveItemId: 'pepper', // 후추
    giveQuantity: 5,
    receiveQuantity: 2,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'stewart_enhanced_catalyst',
    npcId: 'stewart',
    giveItemId: 'enhanced_reignition_catalyst',
    receiveItemId: 'raw_gold_ore', // 미가공 골드 원석
    giveQuantity: 5,
    receiveQuantity: 7,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'stewart_rare_catalyst',
    npcId: 'stewart',
    giveItemId: 'rare_alchemy_reignition_catalyst',
    receiveItemId: 'raw_gold_ore', // 미가공 골드 원석
    giveQuantity: 50,
    receiveQuantity: 7,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'fergus_ore',
    npcId: 'fergus',
    giveItemId: 'ore',
    receiveItemId: 'equipment_parts', // 분해된 장비 부품
    giveQuantity: 100,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'dungeon_cat_travelers_snack',
    npcId: 'dungeon_cat_merchant',
    giveItemId: 'travelers_snack',
    receiveItemId: 'salt', // 소금
    giveQuantity: 100,
    receiveQuantity: 2,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'dungeon_cat_bandage',
    npcId: 'dungeon_cat_merchant',
    giveItemId: 'bandage',
    receiveItemId: 'sugar', // 설탕
    giveQuantity: 100,
    receiveQuantity: 2,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'dungeon_cat_healing_potion',
    npcId: 'dungeon_cat_merchant',
    giveItemId: 'healing_potion',
    receiveItemId: 'cabbage', // 양배추
    giveQuantity: 100,
    receiveQuantity: 2,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  // 새로운 교환들 - 나무위키에서 추출
  {
    id: 'lasa_rare_catalyst',
    npcId: 'lasa',
    giveItemId: 'apple_juice',
    receiveItemId: 'rare_alchemy_catalyst', // 레어 룬합성 촉매
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'account',
    scope: 'account',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'malcolm_blank_score',
    npcId: 'malcolm',
    giveItemId: 'wool',
    receiveItemId: 'blank_score', // 빈 악보
    giveQuantity: 50,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'kaitin_special_bread',
    npcId: 'kaitin',
    giveItemId: 'milk',
    receiveItemId: 'kaitin_special_bread', // 케이틴 특제 통밀빵
    giveQuantity: 10,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'neris_special_steel',
    npcId: 'neris',
    giveItemId: 'alloy_steel_ingot',
    receiveItemId: 'special_steel_ingot', // 특수강괴
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 4,
    isEnabled: true
  },
  {
    id: 'shamus_wrapping_paper',
    npcId: 'shamus',
    giveItemId: 'water_filled_bottle',
    receiveItemId: 'antique_wrapping_paper', // 고풍스러운 포장지
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'aidern_silver_ingot',
    npcId: 'aidern',
    giveItemId: 'spicy_bass_soup',
    receiveItemId: 'silver_alloy_ingot', // 은합금괴
    giveQuantity: 1,
    receiveQuantity: 10,
    type: 'weekly',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'eileen_silver_ingot',
    npcId: 'eileen',
    giveItemId: 'special_steel_ingot',
    receiveItemId: 'silver_alloy_ingot', // 은합금괴
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'gilmore_supreme_silk',
    npcId: 'gilmore',
    giveItemId: 'supreme_wood',
    receiveItemId: 'supreme_silk', // 최상급 실크
    giveQuantity: 10,
    receiveQuantity: 5,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'sean_water_bottle',
    npcId: 'sean',
    giveItemId: 'scar_flower',
    receiveItemId: 'water_filled_bottle', // 물이 든 병
    giveQuantity: 10,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'comgan_healing_potion',
    npcId: 'comgan',
    giveItemId: 'soy_parsnip_cake',
    receiveItemId: 'excellent_healing_potion', // 뛰어난 회복 물약
    giveQuantity: 1,
    receiveQuantity: 6,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'evi_autumn_moth',
    npcId: 'evi',
    giveItemId: 'heartfelt_bouquet',
    receiveItemId: 'autumn_leaf_moth', // 낙엽나방
    giveQuantity: 1,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'jennifer_light_meat',
    npcId: 'jennifer',
    giveItemId: 'beans',
    receiveItemId: 'light_meat', // 담백한 고기
    giveQuantity: 10,
    receiveQuantity: 15,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  }
] 