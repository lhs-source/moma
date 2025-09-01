import type { Item } from "./schemas/item";
import { ITEM_CATEGORY } from "./schemas/item";

export const items: Item[] = [
    {
      id: 'travelers_snack',
      name: '여행자 간식',
      imageUrl: '/images/items/travelers_snack.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'malcolms_pillow',
      name: '말콤의 푹신한 양털 베개',
      imageUrl: '/images/items/malcolms_pillow.png',
      isCraftable: true,
      category: '가구',
      isFromTraded: true
    },
    {
      id: 'superior_wool',
      name: '상급 양털',
      imageUrl: '/images/items/superior_wool.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'pet_food',
      name: '펫 먹이',
      imageUrl: '/images/items/pet_food.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'four_leaf_clover',
      name: '네잎클로버',
      imageUrl: '/images/items/four_leaf_clover.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'mushroom',
      name: '쑥쑥 버섯',
      imageUrl: '/images/items/mushroom.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'alchemy_catalyst',
      name: '고급 룬합성 촉매',
      imageUrl: '/images/items/alchemy_catalyst.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'apple_juice',
      name: '사과 주스',
      imageUrl: '/images/items/apple_juice.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'alchemy_powder',
      name: '연금술 부스러기',
      imageUrl: '/images/items/alchemy_powder.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'rare_alchemy_catalyst',
      name: '레어 룬합성 촉매',
      imageUrl: '/images/items/rare_alchemy_catalyst.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'critical_potion',
      name: '치명타 비약',
      imageUrl: '/images/items/critical_potion.png',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'mayonnaise_stir_fry',
      name: '마요네즈 고기볶음',
      imageUrl: '/images/items/mayonnaise_stir_fry.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'blank_score',
      name: '빈 악보',
      imageUrl: '/images/items/blank_score.png',
      isCraftable: false,
      category: '음악',
      isFromTraded: false
    },
    {
      id: 'wool',
      name: '양털',
      imageUrl: '/images/items/wool.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'spider_web',
      name: '거미줄',
      imageUrl: '/images/items/spider_web.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'workbench_blueprint',
      name: '다목적 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'campfire_kit',
      name: '전문 캠프파이어 키트',
      imageUrl: '/images/items/campfire_kit.png',
      isCraftable: false,
      category: '도구',
      isFromTraded: false
    },
    {
      id: 'holy_water',
      name: '성수',
      imageUrl: '/images/items/holy_water.png',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'kaitin_bread',
      name: '케이틴 특제 통밀빵',
      imageUrl: '/images/items/kaitin_bread.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'egg',
      name: '달걀',
      imageUrl: '/images/items/egg.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'meat',
      name: '고기',
      imageUrl: '/images/items/meat.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'salt',
      name: '소금',
      imageUrl: '/images/items/salt.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'water_bottle',
      name: '물이 든 병',
      imageUrl: '/images/items/water_bottle.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'herb',
      name: '허브',
      imageUrl: '/images/items/herb.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'potato',
      name: '감자',
      imageUrl: '/images/items/potato.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'sugar',
      name: '설탕',
      imageUrl: '/images/items/sugar.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'apple',
      name: '사과',
      imageUrl: '/images/items/apple.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cabbage',
      name: '양배추',
      imageUrl: '/images/items/cabbage.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'mayonnaise',
      name: '마요네즈',
      imageUrl: '/images/items/mayonnaise.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'onion',
      name: '양파',
      imageUrl: '/images/items/onion.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'corn',
      name: '옥수수',
      imageUrl: '/images/items/corn.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cheese',
      name: '치즈',
      imageUrl: '/images/items/cheese.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'flour',
      name: '밀가루',
      imageUrl: '/images/items/flour.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'clam',
      name: '조개',
      imageUrl: '/images/items/clam.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'lemon',
      name: '레몬',
      imageUrl: '/images/items/lemon.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'pepper',
      name: '후추',
      imageUrl: '/images/items/pepper.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'ice',
      name: '얼음',
      imageUrl: '/images/items/ice.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'strawberry',
      name: '딸기',
      imageUrl: '/images/items/strawberry.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'garlic',
      name: '마늘',
      imageUrl: '/images/items/garlic.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'cream',
      name: '생크림',
      imageUrl: '/images/items/cream.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'noodle',
      name: '면',
      imageUrl: '/images/items/noodle.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'milk',
      name: '우유',
      imageUrl: '/images/items/milk.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'tomato',
      name: '토마토',
      imageUrl: '/images/items/tomato.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'cooking_oil',
      name: '식용유',
      imageUrl: '/images/items/cooking_oil.png',
      isCraftable: false,
      category: ITEM_CATEGORY.FOOD_INGREDIENT,
      isFromTraded: false
    },
    {
      id: 'bean',
      name: '콩',
      imageUrl: '/images/items/bean.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'wheat',
      name: '밀',
      imageUrl: '/images/items/wheat.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'fried_egg',
      name: '달걀 프라이',
      imageUrl: '/images/items/fried_egg.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'boiled_egg',
      name: '삶은 달걀',
      imageUrl: '/images/items/boiled_egg.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'roasted_meat',
      name: '구운 고기',
      imageUrl: '/images/items/roasted_meat.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'shawarma',
      name: '샤와르마',
      imageUrl: '/images/items/shawarma.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'meat_parmigiana',
      name: '미트 파르미자나',
      imageUrl: '/images/items/meat_parmigiana.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'potato_soup',
      name: '감자수프',
      imageUrl: '/images/items/potato_soup.png',    
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'corn_cheese',
      name: '콘치즈',
      imageUrl: '/images/items/corn_cheese.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'apple_souffle',
      name: '사과 수플레',
      imageUrl: '/images/items/apple_souffle.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'apple_salad',
      name: '사과 샐러드',
      imageUrl: '/images/items/apple_salad.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'lavender',
      name: '라벤더 꽃',
      imageUrl: '/images/items/lavender.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'wheat_flour',
      name: '밀가루',
      imageUrl: '/images/items/wheat_flour.png',
      isCraftable: true,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'food_processing_blueprint',
      name: '식재료 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'iron_ore',
      name: '철 광석',
      imageUrl: '/images/items/iron_ore.png',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'coal',
      name: '석탄',
      imageUrl: '/images/items/coal.png',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'equipment_parts',
      name: '분해된 장비 부품',
      imageUrl: '/images/items/equipment_parts.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'alloy_steel_ingot',
      name: '합금강괴',
      imageUrl: '/images/items/alloy_steel_ingot.png',
      isCraftable: true,
      category: '금속',
      isFromTraded: false
    },
    {
      id: 'steel_ingot',
      name: '강철괴',
      imageUrl: '/images/items/steel_ingot.png',
      isCraftable: true,
      category: '금속',
      isFromTraded: false
    },
    {
      id: 'tannin_powder',
      name: '타닌 가루',
      imageUrl: '/images/items/tannin_powder.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_log',
      name: '상급 통나무',
      imageUrl: '/images/items/superior_log.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_leather',
      name: '상급 생가죽',
      imageUrl: '/images/items/superior_leather.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'stir_fried_vegetables',
      name: '야채볶음',
      imageUrl: '/images/items/stir_fried_vegetables.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'log',
      name: '통나무',
      imageUrl: '/images/items/log.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'tree_sap',
      name: '나무 진액',
      imageUrl: '/images/items/tree_sap.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'glenis_cake',
      name: '글리니스 수제 케이크',
      imageUrl: '/images/items/glenis_cake.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: true
    },
    {
      id: 'fork_in_milk',
      name: '포크 인 밀크',
      imageUrl: '/images/items/fork_in_milk.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'glenis_apple_milk_tea',
      name: '글리니스의 애플 밀크티',
      imageUrl: '/images/items/glenis_apple_milk_tea.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: true,
    },
    {
      id: 'processed_leather',
      name: '가죽',
      imageUrl: '/images/items/processed_leather.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'apple_soup',
      name: '사과 수플레',
      imageUrl: '/images/items/apple_soup.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'special_steel',
      name: '특수강괴',
      imageUrl: '/images/items/special_steel.png',
      isCraftable: false,
      category: '금속',
      isFromTraded: false
    },
    {
      id: 'life_gem',
      name: '생명의 마나석',
      imageUrl: '/images/items/life_gem.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'heart_token',
      name: '하트 토큰',
      imageUrl: '/images/items/heart_token.png',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'love_fish',
      name: '참사랑어',
      imageUrl: '/images/items/love_fish.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'fire_bomb',
      name: '화염 마법 유탄',
      imageUrl: '/images/items/fire_bomb.png',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'dark_fish',
      name: '어둠 유령 고기',
      imageUrl: '/images/items/dark_fish.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'thunder_bomb',
      name: '번개 마법 유탄',
      imageUrl: '/images/items/thunder_bomb.png',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'wind_bomb',
      name: '바람 마법 유탄',
      imageUrl: '/images/items/wind_bomb.png',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'acid_bomb',
      name: '산성 마법 유탄',
      imageUrl: '/images/items/acid_bomb.png',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'fire_crystal',
      name: '불꽃의 결정',
      imageUrl: '/images/items/fire_crystal.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'ice_crystal',
      name: '얼음의 결정',
      imageUrl: '/images/items/ice_crystal.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'electric_crystal',
      name: '전기의 결정',
      imageUrl: '/images/items/electric_crystal.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'light_crystal',
      name: '광휘의 결정',
      imageUrl: '/images/items/light_crystal.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'seal_crystal',
      name: '봉인의 결정',
      imageUrl: '/images/items/seal_crystal.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'dye_base',
      name: '염료 기본재',
      imageUrl: '/images/items/dye_base.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_silk',
      name: '상급 실크',
      imageUrl: '/images/items/superior_silk.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'silk_fabric',
      name: '옷감 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'ghost_lantern',
      name: '유령 반딧불이',
      imageUrl: '/images/items/ghost_lantern.png',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'armor_blueprint',
      name: '방어구 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'sanded_ferodotS',
      name: '세공된 페리도트S',
      imageUrl: '/images/items/sanded_ferodotS.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'ultimate_potion',
      name: '궁극의 물약',
      imageUrl: '/images/items/ultimate_potion.png',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'healing_potion',
      name: '회복 물약',
      imageUrl: '/images/items/healing_potion.png',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'potato_salad',
      name: '감자 샐러드',
      imageUrl: '/images/items/potato_salad.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'roasted_potato',
      name: '통감자 구이',
      imageUrl: '/images/items/roasted_potato.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'potato_soup',
      name: '감자 수프',
      imageUrl: '/images/items/potato_soup.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'spirit_trace',
      name: '정령의 흔적',
      imageUrl: '/images/items/spirit_trace.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'class_master_medal',
      name: '클래스 마스터 메달',
      imageUrl: '/images/items/class_master_medal.png',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'paper',
      name: '종이',
      imageUrl: '/images/items/paper.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'orphan_novel',
      name: '주인 없는 소설책',
      imageUrl: '/images/items/orphan_novel.png',
      isCraftable: false,
      category: '책',
      isFromTraded: false
    },
    {
      id: 'silk',
      name: '실크',
      imageUrl: '/images/items/silk.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'ricotta_cheese_salad',
      name: '리코타 치즈 샐러드',
      imageUrl: '/images/items/ricotta_cheese_salad.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'cheese_fondue',
      name: '치즈 퐁뒤',
      imageUrl: '/images/items/cheese_fondue.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'cream_sauce_steak',
      name: '크림 소스 스테이크',
      imageUrl: '/images/items/cream_sauce_steak.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'superior_fabric',
      name: '상급 옷감',
      imageUrl: '/images/items/superior_fabric.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'fabric_plus',
      name: '옷감+',
      imageUrl: '/images/items/fabric_plus.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'apple_cream_cake',
      name: '사과 생크림 케이크',
      imageUrl: '/images/items/apple_cream_cake.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'superior_fabric_plus',
      name: '상급 옷감+',
      imageUrl: '/images/items/superior_fabric_plus.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'copper_ore',
      name: '구리 광석',
      imageUrl: '/images/items/copper_ore.png',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'white_ore',
      name: '백동 광석',
      imageUrl: '/images/items/white_ore.png',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'metal_processing_blueprint',
      name: '금속 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'weapon_blueprint',
      name: '무기 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'cave_gem',
      name: '협곡의 마나석',
      imageUrl: '/images/items/cave_gem.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'ruin_gem',
      name: '폐허의 마나석',
      imageUrl: '/images/items/ruin_gem.png',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'superior_critical_potion',
      name: '상급 치명타 비약',
      imageUrl: '/images/items/superior_critical_potion.png',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'ice_fruit_juice',
      name: '얼음 딸기주스',
      imageUrl: '/images/items/ice_fruit_juice.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'healthy_drink',
      name: '건강 음료',
      imageUrl: '/images/items/healthy_drink.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'chrysanthemum_ear',
      name: '초롱아귀',
      imageUrl: '/images/items/chrysanthemum_ear.png',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'clean_mushroom_spores',
      name: '깔끔 버섯 포자',
      imageUrl: '/images/items/clean_mushroom_spores.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'alrio_orio',
      name: '알리오 올리오',
      imageUrl: '/images/items/alrio_orio.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'medicine_processing_blueprint',
      name: '의약품 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'poison_bag',
      name: '독 주머니',
      imageUrl: '/images/items/poison_bag.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'medicine_blueprint',
      name: '의약품 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'sun_butterfly',
      name: '석양나비',
      imageUrl: '/images/items/sun_butterfly.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_wood',
      name: '상급 목재',
      imageUrl: '/images/items/superior_wood.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_wood_plus',
      name: '상급 목재+',
      imageUrl: '/images/items/superior_wood_plus.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'leather',
      name: '생가죽',
      imageUrl: '/images/items/leather.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'processed_leather',
      name: '가죽',
      imageUrl: '/images/items/processed_leather.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'leather_processing_blueprint',
      name: '가죽 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'wood_processing_blueprint',
      name: '목재 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'tracy_wood_carving',
      name: '트레이시의 원목 오르골',
      imageUrl: '/images/items/tracy_wood_carving.png',
      isCraftable: false,
      category: '장식품',
      isFromTraded: true
    },
    {
      id: 'clam_chowder',
      name: '조개찜',
      imageUrl: '/images/items/clam_chowder.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'caterpillar',
      name: '애벌레',
      imageUrl: '/images/items/caterpillar.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'bream',
      name: '브리흐네 잉어',
      imageUrl: '/images/items/bream.png',  
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'silver_fish',
      name: '은붕어',
      imageUrl: '/images/items/silver_fish.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'rainbow_trout',
      name: '무지개 송어',
      imageUrl: '/images/items/rainbow_trout.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'eel',
      name: '은어',
      imageUrl: '/images/items/eel.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'mackerel',
      name: '고등어',
      imageUrl: '/images/items/mackerel.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'salmon',
      name: '연어',
      imageUrl: '/images/items/salmon.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'asparagus',
      name: '아스파라거스',
      imageUrl: '/images/items/asparagus.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'catfish',
      name: '메기',
      imageUrl: '/images/items/catfish.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'pea',
      name: '완두콩',
      imageUrl: '/images/items/pea.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'perfect_bandage',
      name: '완벽한 붕대',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '의료',
      isFromTraded: false
    },
    {
      id: 'curse_removal_potion_bandage',
      name: '저주 해제 물약 붕대',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '의료',
      isFromTraded: false
    },
    {
      id: 'immortality_powder',
      name: '불사의 가루',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'enhanced_reignition_catalyst',
      name: '강화 재연소 촉매',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'rare_alchemy_reignition_catalyst',
      name: '레어 연금술 재연소 촉매',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'raw_gold_ore',
      name: '미가공 골드 원석',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'silver_alloy_ingot',
      name: '은합금괴',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'condensed_wind',
      name: '응축된 바람',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'poison_sac',
      name: '독주머니',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'health_drink',
      name: '건강 드링크',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '음료',
      isFromTraded: false
    },
    {
      id: 'ore',
      name: '광석',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'bandage',
      name: '붕대',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '의료',
      isFromTraded: false
    },
    {
      id: 'leather_plus',
      name: '가죽+',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'blank_score',
      name: '빈 악보',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: true
    },
    {
      id: 'kaitin_special_bread',
      name: '케이틴 특제 통밀빵',
      imageUrl: '/images/items/kaitin_bread.png',
      isCraftable: false,
      category: '음식',
      isFromTraded: true
    },
    {
      id: 'special_steel_ingot',
      name: '특수강괴',
      imageUrl: '/images/items/special_steel.png',
      isCraftable: true,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'antique_wrapping_paper',
      name: '고풍스러운 포장지',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: true
    },
    {
      id: 'water_filled_bottle',
      name: '물이 든 병',
      imageUrl: '/images/items/water_bottle.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'spicy_bass_soup',
      name: '농어 매운탕',
      imageUrl: '/images/items/default.webp',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'silver_alloy_ingot',
      name: '은합금괴',
      imageUrl: '/images/items/default.webp',
      isCraftable: true,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'supreme_silk',
      name: '최상급 실크',
      imageUrl: '/images/items/superior_silk.png',
      isCraftable: true,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'supreme_wood',
      name: '최상급 목재',
      imageUrl: '/images/items/superior_wood_plus.png',
      isCraftable: true,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'scar_flower',
      name: '생채기꽃',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'excellent_healing_potion',
      name: '뛰어난 회복 물약',
      imageUrl: '/images/items/default.webp',
      isCraftable: true,
      category: '소모품',
      isFromTraded: false
    },
    {
      id: 'soy_parsnip_cake',
      name: '두유 파스닙 케이크',
      imageUrl: '/images/items/soy_parsnip_cake.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'autumn_leaf_moth',
      name: '낙엽나방',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'heartfelt_bouquet',
      name: '정성 담긴 꽃다발',
      imageUrl: '/images/items/default.webp',
      isCraftable: true,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'light_meat',
      name: '담백한 고기',
      imageUrl: '/images/items/light_meat.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'beans',
      name: '콩',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'gold',
      name: '골드',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '통화',
      isFromTraded: false
    },
    {
      id: 'wax',
      name: '밀랍',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'best_leather',
      name: '최상급 생가죽',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_leather_plus',
      name: '상급 생가죽+',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_web',
      name: '최상급 거미줄',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'coin_bug',
      name: '동전무당벌레',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'tin_powder',
      name: '타닌 가루',
      imageUrl: '/images/items/tannin_powder.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'tree_juice',
      name: '나무 진액',
      imageUrl: '/images/items/tree_sap.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'scythe',
      name: '장수풍뎅이',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'bulbous',
      name: '뚝딱 반딧불이',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'soaked_bean',
      name: '물에 불린 콩',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'tofu',
      name: '두부',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'soy_milk',
      name: '두유',
      imageUrl: '/images/items/soy_milk.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'fabric',
      name: '옷감',
      imageUrl: '/images/items/default.webp',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'white_fish_meuniere',
      name: '흰살생선 뫼니에르',
      imageUrl: '/images/items/white_fish_meuniere.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'bouillabaisse',
      name: '부야베스',
      imageUrl: '/images/items/bouillabaisse.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'mackerel_and_salmon_steak',
      name: '고등어와 연어 스테이크',
      imageUrl: '/images/items/mackerel_and_salmon_steak.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'catfish_fish_and_chips',
      name: '메기 피시 앤 칩스',
      imageUrl: '/images/items/catfish_fish_and_chips.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'perch_spicy_soup',
      name: '농어 매운탕',
      imageUrl: '/images/items/perch_spicy_soup.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'taiwanese_beef_bourguignon',
      name: '대만찬: 꺼지지 않는 불의 뵈프 부르기뇽',
      imageUrl: '/images/items/taiwanese_beef_bourguignon.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'tofu_noodles',
      name: '두부 국수',
      imageUrl: '/images/items/tofu_noodles.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'soy_milk_bingsu',
      name: '두유 빙수',
      imageUrl: '/images/items/soy_milk_bingsu.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'tofu_steak',
      name: '두부 스테이크',
      imageUrl: '/images/items/tofu_steak.png',
      isCraftable: true,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'parsnip',
      name: '파스닙',
      imageUrl: '/images/items/parsnip.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'radish',
      name: '무',
      imageUrl: '/images/items/radish.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'wine',
      name: '와인',
      imageUrl: '/images/items/wine.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },

    {
      id: 'eternal_flame',
      name: '꺼지지 않는 불',
      imageUrl: '/images/items/eternal_flame.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'aged_large_meat',
      name: '숙성된 커다란 고기',
      imageUrl: '/images/items/aged_large_meat.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'heavy_potato',
      name: '묵직한 감자',
      imageUrl: '/images/items/heavy_potato.png',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    }
  ]