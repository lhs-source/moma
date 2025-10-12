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
    receiveItemId: 'multi_purpose_workbench_design_3', // 다목적 제작대 설계도 (3레벨)
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
    receiveItemId: 'flour', // 밀가루
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
    receiveItemId: 'flour', // 밀가루
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
    receiveItemId: 'food_processing_facility_design_3', // 식재료 가공 시설 설계도 (3레벨)
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
    receiveItemId: 'leather_processing_facility_design_3', // 가죽 가공 시설 설계도 (3레벨)
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
    receiveItemId: 'wood_processing_facility_design_3', // 목재 가공 시설 설계도 (3레벨)
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'glenis_cake_to_fork_in_milk',
    npcId: 'glenis',
    giveItemId: 'fork_in_milk', // 포크 인 밀크
    receiveItemId: 'glenis_cake',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'glenis_apple_milk_tea_to_cream',
    npcId: 'glenis',
    giveItemId: 'cream', // 생크림
    receiveItemId: 'glenis_apple_milk_tea',
    giveQuantity: 4,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'glenis_food_blueprint_to_apple_souffle',
    npcId: 'glenis',
    giveItemId: 'apple_souffle', // 사과 수플레
    receiveItemId: 'food_processing_facility_design_3',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'manus_life_gem_to_pet_food',
    npcId: 'manus',
    giveItemId: 'pet_food', // 펫 먹이
    receiveItemId: 'life_gem',
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'walter_leather_to_wood_carving',
    npcId: 'walter',
    giveItemId: 'tracy_wood_carving', // 트레이시의 원목 오르골
    receiveItemId: 'leather_processed',
    giveQuantity: 1,
    receiveQuantity: 6,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'walter_heart_token_to_love_fish',
    npcId: 'walter',
    giveItemId: 'love_fish', // 참사랑어
    receiveItemId: 'heart_token',
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'walter_fire_magic_bullet_to_dark_fish',
    npcId: 'walter',
    giveItemId: 'dark_fish', // 어둠유령고기
    receiveItemId: 'fire_magic_bullet',
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'walter_thunder_magic_bullet_to_dark_fish',
    npcId: 'walter',
    giveItemId: 'dark_fish', // 어둠유령고기
    receiveItemId: 'thunder_magic_bullet',
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'walter_wind_magic_bullet_to_dark_fish',
    npcId: 'walter',
    giveItemId: 'dark_fish', // 어둠유령고기
    receiveItemId: 'wind_magic_bullet',
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'walter_acid_magic_bullet_to_dark_fish',
    npcId: 'walter',
    giveItemId: 'dark_fish', // 어둠유령고기
    receiveItemId: 'acid_magic_bullet',
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
    giveItemId: 'superior_silk', // 상급 실크
    receiveItemId: 'dye_base',
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'simon_silk_fabric',
    npcId: 'simon',
    giveItemId: 'ghost_lantern', // 유령 반딧불이
    receiveItemId: 'fabric_processing_facility_design_3',
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
    giveItemId: 'sanded_ferodotS', // 세공된 페리도트S
    receiveItemId: 'armor_workbench_design_3',
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
    giveItemId: 'potato_salad', // 감자 샐러드
    receiveItemId: 'ultimate_potion',
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
    giveItemId: 'class_master_medal', // 클래스 마스터 메달
    receiveItemId: 'spirit_trace',
    giveQuantity: 1,
    receiveQuantity: 20,
    type: 'daily',
    scope: 'character',
    maxExchanges: 20,
    isEnabled: true
  },
  {
    id: 'aira_paper',
    npcId: 'aira',
    giveItemId: 'orphan_novel', // 주인 없는 소설책
    receiveItemId: 'paper',
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
    giveItemId: 'ricotta_cheese_salad', // 리코타 치즈 샐러드
    receiveItemId: 'silk',
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
    giveItemId: 'cream_sauce_steak', // 크림소스 스테이크
    receiveItemId: 'superior_silk',
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
    giveItemId: 'apple_souffle', // 사과 수플레
    receiveItemId: 'superior_fabric',
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
    giveItemId: 'apple_cream_cake', // 사과 생크림케이크
    receiveItemId: 'superior_fabric_plus_processed',
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'calix_leather_plus_to_milk_tea',
    npcId: 'calix',
    giveItemId: 'glenis_apple_milk_tea', // 글리니스의 애플 밀크티
    receiveItemId: 'leather_plus_processed',
    giveQuantity: 2,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'flora_orphan_novel',
    npcId: 'flora',
    giveItemId: 'glenis_cake', // 글리니스 수제 케이크
    receiveItemId: 'orphan_novel',
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
    maxExchanges: 1,
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
    receiveItemId: 'metal_processing_facility_design_3', // 금속 가공 시설 설계도 (3레벨)
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
    giveItemId: 'heat_resistant_bandage',
    receiveItemId: 'weapon_workbench_design_3', // 무기 제작대 설계도 (3레벨)
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
    giveItemId: 'poison_sac',
    receiveItemId: 'medicine_processing_facility_design_3', // 의약품 가공 시설 설계도 (3레벨)
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
    receiveItemId: 'medicine_workbench_design_3', // 의약품 제작대 설계도 (3레벨)
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
    giveItemId: 'perfect_bandage', // 완벽한 붕대
    receiveItemId: 'fabric_plus_processed',
    giveQuantity: 100,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'simon_gold_ingot_pile',
    npcId: 'simon',
    giveItemId: 'dream_reflecting_mirror_fragment', // 꿈을 비추는 거울 조각
    receiveItemId: 'gold_ingot_pile',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'none',
    scope: 'character',
    maxExchanges: 0,
    isEnabled: true
  },
  {
    id: 'armis_curse_removal_potion',
    npcId: 'armis',
    giveItemId: 'curse_removal_potion',
    receiveItemId: 'holy_water', // 성수
    giveQuantity: 1,
    receiveQuantity: 1,
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
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'calix_lemon_to_immortality_powder',
    npcId: 'calix',
    giveItemId: 'immortality_powder', // 불사의 가루
    receiveItemId: 'lemon',
    giveQuantity: 5,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'calix_pepper_to_immortality_powder',
    npcId: 'calix',
    giveItemId: 'immortality_powder', // 불사의 가루
    receiveItemId: 'pepper',
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
    receiveItemId: 'kaitin_bread', // 케이틴 특제 통밀빵
    giveQuantity: 10,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'neris_superior_leather_to_copper',
    npcId: 'neris',
    giveItemId: 'copper_ore',
    receiveItemId: 'superior_leather', // 상급 생가죽
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'neris_special_steel',
    npcId: 'neris',
    giveItemId: 'alloy_steel_ingot',
    receiveItemId: 'special_steel', // 특수강괴
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 4,
    isEnabled: true
  },
  // 반호르, 가이레흐
  {
    id: 'shamus_wrapping_paper',
    npcId: 'shamus',
    giveItemId: 'water_bottle',
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
    giveItemId: 'special_steel',
    receiveItemId: 'silver_alloy_ingot', // 은합금괴
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'eileen_silver_ingot_2',
    npcId: 'eileen',
    giveItemId: 'alloy_steel_ingot',
    receiveItemId: 'silver_alloy_ingot', // 은합금괴
    giveQuantity: 30,
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
    receiveItemId: 'water_bottle', // 물이 든 병
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
    giveItemId: 'bean',
    receiveItemId: 'light_meat', // 담백한 고기
    giveQuantity: 10,
    receiveQuantity: 15,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'sean_wrapping_paper_to_bouquet',
    npcId: 'sean',
    giveItemId: 'heartfelt_bouquet', // 정성 담긴 꽃다발
    receiveItemId: 'antique_wrapping_paper',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'shamus_shawarma_to_bandage',
    npcId: 'shamus',
    giveItemId: 'excellent_bandage', // 뛰어난 붕대
    receiveItemId: 'shawarma',
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  // 이멘 마하 물물교환
  // 1. 도나
  {
    id: 'donna_holy_water_bundle',
    npcId: 'donna',
    giveItemId: 'pumpkin_pie', // 호박 파이
    receiveItemId: 'holy_water_bundle', // 성수 묶음
    giveQuantity: 3,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'donna_holy_water',
    npcId: 'donna',
    giveItemId: 'gift_bouquet', // 선물용 꽃다발
    receiveItemId: 'holy_water', // 성수
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  // 2. 델
  {
    id: 'dell_arrow_flower',
    npcId: 'dell',
    giveItemId: 'blue_hydrangea', // 파란 수국
    receiveItemId: 'arrow_flower', // 화살꽃
    giveQuantity: 10,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'dell_hidden_flower',
    npcId: 'dell',
    giveItemId: 'blue_hydrangea', // 파란 수국
    receiveItemId: 'hidden_flower', // 숨숨꽃
    giveQuantity: 10,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'dell_scar_flower',
    npcId: 'dell',
    giveItemId: 'blue_hydrangea', // 파란 수국
    receiveItemId: 'scar_flower', // 생채기꽃
    giveQuantity: 10,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'dell_calming_herb',
    npcId: 'dell',
    giveItemId: 'blue_hydrangea', // 파란 수국
    receiveItemId: 'calming_herb', // 진정초
    giveQuantity: 10,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'dell_gift_bouquet',
    npcId: 'dell',
    giveItemId: 'clay', // 점토
    receiveItemId: 'gift_bouquet', // 선물용 꽃다발
    giveQuantity: 100,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  // 3. 델렌
  {
    id: 'dellen_supreme_leather_plus',
    npcId: 'dellen',
    giveItemId: 'pumpkin_soup', // 호박 수프
    receiveItemId: 'supreme_leather_plus', // 최상급 가죽+
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'dellen_supreme_wood_plus',
    npcId: 'dellen',
    giveItemId: 'pumpkin_soup', // 호박 수프
    receiveItemId: 'supreme_wood_plus', // 최상급 목재+
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  // 4. 엘레노아
  {
    id: 'eleanor_supreme_fabric_plus',
    npcId: 'eleanor',
    giveItemId: 'green_tea_crepe_case', // 녹차 크레이프 케이스
    receiveItemId: 'supreme_fabric_plus', // 최상급 옷감+
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  // 5. 갈빈
  {
    id: 'galvin_tough_rope',
    npcId: 'galvin',
    giveItemId: 'equipment_parts', // 분해된 장비 부품
    receiveItemId: 'strong_rope', // 튼튼한 밧줄
    giveQuantity: 1000,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  // 6. 오슬라
  {
    id: 'osla_iron_ingot',
    npcId: 'osla',
    giveItemId: 'curry_rice', // 카레라이스
    receiveItemId: 'iron_ingot', // 철괴
    giveQuantity: 1,
    receiveQuantity: 5,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'osla_cloud_steel_ingot',
    npcId: 'osla',
    giveItemId: 'curry_rice', // 카레라이스
    receiveItemId: 'cloud_steel_ingot', // 운철괴
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  // 7. 고든
  {
    id: 'gordon_flour',
    npcId: 'gordon',
    giveItemId: 'rice', // 쌀
    receiveItemId: 'flour', // 밀가루
    giveQuantity: 30,
    receiveQuantity: 10,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'gordon_heavy_potato',
    npcId: 'gordon',
    giveItemId: 'fermented_tea_leaves', // 발효된 찻잎
    receiveItemId: 'heavy_potato', // 묵직한 감자
    giveQuantity: 10,
    receiveQuantity: 5,
    type: 'account',
    scope: 'account',
    maxExchanges: 1,
    isEnabled: true
  },
  // 8. 크레이그
  {
    id: 'craig_supreme_heat_resistant_bandage',
    npcId: 'craig',
    giveItemId: 'golden_spicy_soup', // 금은 매운탕
    receiveItemId: 'supreme_heat_resistant_bandage', // 최상급 내열 붕대
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'account',
    scope: 'account',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'craig_supreme_anti_magic_bandage',
    npcId: 'craig',
    giveItemId: 'golden_spicy_soup', // 금은 매운탕
    receiveItemId: 'supreme_anti_magic_bandage', // 최상급 방항 붕대
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'account',
    scope: 'account',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'craig_supreme_insulation_bandage',
    npcId: 'craig',
    giveItemId: 'golden_spicy_soup', // 금은 매운탕
    receiveItemId: 'supreme_insulation_bandage', // 최상급 절연 붕대
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'account',
    scope: 'account',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'craig_supreme_blessing_bandage',
    npcId: 'craig',
    giveItemId: 'golden_spicy_soup', // 금은 매운탕
    receiveItemId: 'supreme_blessing_bandage', // 최상급 축복의 붕대
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'account',
    scope: 'account',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'craig_supreme_seal_bandage',
    npcId: 'craig',
    giveItemId: 'golden_spicy_soup', // 금은 매운탕
    receiveItemId: 'supreme_seal_bandage', // 최상급 봉인의 붕대
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'account',
    scope: 'account',
    maxExchanges: 1,
    isEnabled: true
  }
] 