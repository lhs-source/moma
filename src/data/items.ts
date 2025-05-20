import type { Item } from "./schemas/item";

export const items: Item[] = [
    {
      id: 'travelers_snack',
      name: '여행자 간식',
      imageUrl: '/images/items/travelers_snack.png',
      description: '여행 중에 먹기 좋은 간식',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'malcolms_pillow',
      name: '말콤의 푹신한 양털 베개',
      imageUrl: '/images/items/malcolms_pillow.png',
      description: '말콤이 만든 푹신한 베개',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'spider_web', quantity: 5 }
      ],
      category: '가구',
      isFromTraded: true
    },
    {
      id: 'superior_wool',
      name: '상급 양털',
      imageUrl: '/images/items/superior_wool.png',
      description: '고급 양털',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'pet_food',
      name: '펫 먹이',
      imageUrl: '/images/items/pet_food.png',
      description: '펫을 위한 먹이',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'four_leaf_clover',
      name: '네잎클로버',
      imageUrl: '/images/items/four_leaf_clover.png',
      description: '행운을 가져다주는 네잎클로버',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'mushroom',
      name: '쑥쑥 버섯',
      imageUrl: '/images/items/mushroom.png',
      description: '자라는 버섯',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'alchemy_catalyst',
      name: '고급 룬합성 촉매',
      imageUrl: '/images/items/alchemy_catalyst.png',
      description: '연금술 실험에 사용되는 촉매',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'apple_juice',
      name: '사과 주스',
      imageUrl: '/images/items/apple_juice.png',
      description: '신선한 사과 주스',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'apple', quantity: 3 }
      ],
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'alchemy_powder',
      name: '연금술 부스러기',
      imageUrl: '/images/items/alchemy_powder.png',
      description: '연금술 실험의 부산물',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'rare_alchemy_catalyst',
      name: '레어 룬합성 촉매',
      imageUrl: '/images/items/rare_alchemy_catalyst.png',
      description: '희귀한 연금술 촉매',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'critical_potion',
      name: '치명타 비약',
      imageUrl: '/images/items/critical_potion.png',
      description: '치명타 확률을 높여주는 비약',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'mayonnaise_stir_fry',
      name: '마요네즈 고기볶음',
      imageUrl: '/images/items/mayonnaise_stir_fry.png',
      description: '마요네즈로 볶은 고기 요리',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'meat', quantity: 2 },
        { itemId: 'mayonnaise', quantity: 1 }
      ],
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'blank_score',
      name: '빈 악보',
      imageUrl: '/images/items/blank_score.png',
      description: '작곡에 사용되는 빈 악보',
      isCraftable: false,
      category: '음악',
      isFromTraded: false
    },
    {
      id: 'wool',
      name: '양털',
      imageUrl: '/images/items/wool.png',
      description: '부드러운 양털',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'spider_web',
      name: '거미줄',
      imageUrl: '/images/items/spider_web.png',
      description: '거미가 만든 거미줄',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'workbench_blueprint',
      name: '다목적 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '다목적 제작대를 만들 수 있는 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'campfire_kit',
      name: '전문 캠프파이어 키트',
      imageUrl: '/images/items/campfire_kit.png',
      description: '전문가용 캠프파이어 키트',
      isCraftable: false,
      category: '도구',
      isFromTraded: false
    },
    {
      id: 'holy_water',
      name: '성수',
      imageUrl: '/images/items/holy_water.png',
      description: '신성한 물',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'kaitin_bread',
      name: '케이틴 특제 통밀빵',
      imageUrl: '/images/items/kaitin_bread.png',
      description: '케이틴이 만든 특제 빵',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'wheat_flour', quantity: 2 },
        { itemId: 'milk', quantity: 1 }
      ],
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'egg',
      name: '달걀',
      imageUrl: '/images/items/egg.png',
      description: '신선한 달걀입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'meat',
      name: '고기',
      imageUrl: '/images/items/meat.png',
      description: '신선한 고기입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'salt',
      name: '소금',
      imageUrl: '/images/items/salt.png',
      description: '소금입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'water_bottle',
      name: '물이 든 병',
      imageUrl: '/images/items/water_bottle.png',
      description: '물이 담긴 병입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'herb',
      name: '허브',
      imageUrl: '/images/items/herb.png',
      description: '향긋한 허브입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'potato',
      name: '감자',
      imageUrl: '/images/items/potato.png',
      description: '신선한 감자입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'sugar',
      name: '설탕',
      imageUrl: '/images/items/sugar.png',
      description: '설탕입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'apple',
      name: '사과',
      imageUrl: '/images/items/apple.png',
      description: '신선한 사과입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cabbage',
      name: '양배추',
      imageUrl: '/images/items/cabbage.png',
      description: '신선한 양배추입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'mayonnaise',
      name: '마요네즈',
      imageUrl: '/images/items/mayonnaise.png',
      description: '마요네즈입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'onion',
      name: '양파',
      imageUrl: '/images/items/onion.png',
      description: '신선한 양파입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'corn',
      name: '옥수수',
      imageUrl: '/images/items/corn.png',
      description: '신선한 옥수수입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cheese',
      name: '치즈',
      imageUrl: '/images/items/cheese.png',
      description: '신선한 치즈입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'flour',
      name: '밀가루',
      imageUrl: '/images/items/flour.png',
      description: '밀가루입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'clam',
      name: '조개',
      imageUrl: '/images/items/clam.png',
      description: '신선한 조개입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'lemon',
      name: '레몬',
      imageUrl: '/images/items/lemon.png',
      description: '신선한 레몬입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'pepper',
      name: '후추',
      imageUrl: '/images/items/pepper.png',
      description: '후추입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'ice',
      name: '얼음',
      imageUrl: '/images/items/ice.png',
      description: '얼음입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'strawberry',
      name: '딸기',
      imageUrl: '/images/items/strawberry.png',
      description: '신선한 딸기입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'garlic',
      name: '마늘',
      imageUrl: '/images/items/garlic.png',
      description: '신선한 마늘입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cream',
      name: '생크림',
      imageUrl: '/images/items/cream.png',
      description: '신선한 생크림입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'noodle',
      name: '면',
      imageUrl: '/images/items/noodle.png',
      description: '면입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'milk',
      name: '우유',
      imageUrl: '/images/items/milk.png',
      description: '신선한 우유입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'lavender',
      name: '라벤더 꽃',
      imageUrl: '/images/items/lavender.png',
      description: '향기로운 라벤더 꽃',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'wheat_flour',
      name: '밀가루',
      imageUrl: '/images/items/wheat_flour.png',
      description: '제분된 밀가루',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'wheat', quantity: 2 }
      ],
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'food_processing_blueprint',
      name: '식재료 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '식재료 가공 시설을 만들 수 있는 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'iron_ore',
      name: '철 광석',
      imageUrl: '/images/items/iron_ore.png',
      description: '제련이 필요한 철 광석',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'coal',
      name: '석탄',
      imageUrl: '/images/items/coal.png',
      description: '제련에 사용되는 석탄',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'equipment_parts',
      name: '분해된 장비 부품',
      imageUrl: '/images/items/equipment_parts.png',
      description: '장비를 분해해서 얻은 부품',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'alloy_steel_ingot',
      name: '합금강괴',
      imageUrl: '/images/items/alloy_steel_ingot.png',
      description: '강철괴를 합금한 금속',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'steel_ingot', quantity: 2 }
      ],
      category: '금속',
      isFromTraded: false
    },
    {
      id: 'steel_ingot',
      name: '강철괴',
      imageUrl: '/images/items/steel_ingot.png',
      description: '제련된 강철괴',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'iron_ore', quantity: 1 },
        { itemId: 'coal', quantity: 1 }
      ],
      category: '금속',
      isFromTraded: false
    },
    {
      id: 'tannin_powder',
      name: '타닌 가루',
      imageUrl: '/images/items/tannin_powder.png',
      description: '가죽 가공에 사용되는 타닌 가루',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_log',
      name: '상급 통나무',
      imageUrl: '/images/items/superior_log.png',
      description: '고급 목재로 사용되는 통나무',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_leather',
      name: '상급 생가죽',
      imageUrl: '/images/items/superior_leather.png',
      description: '고급 가죽',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'stir_fried_vegetables',
      name: '야채볶음',
      imageUrl: '/images/items/stir_fried_vegetables.png',
      description: '신선한 야채를 볶은 요리',
      isCraftable: true,
      craftingRecipe: [
        { itemId: 'vegetable', quantity: 3 }
      ],
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'log',
      name: '통나무',
      imageUrl: '/images/items/log.png',
      description: '기본적인 목재',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'tree_sap',
      name: '나무 진액',
      imageUrl: '/images/items/tree_sap.png',
      description: '나무에서 채취한 수액',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'glenis_cake',
      name: '글리니스 수제 케이크',
      imageUrl: '/images/items/glenis_cake.png',
      description: '글리니스가 만든 특제 케이크',
      isCraftable: false,
      category: '음식',
      isFromTraded: true
    },
    {
      id: 'fork_in_milk',
      name: '포크 인 밀크',
      imageUrl: '/images/items/fork_in_milk.png',
      description: '우유에 담긴 포크',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'glenis_apple_milk_tea',
      name: '글리니스의 애플 밀크티',
      imageUrl: '/images/items/glenis_apple_milk_tea.png',
      description: '글리니스가 만든 특제 밀크티',
      isCraftable: false,
      category: '음식',
      isFromTraded: true,
    },
    {
      id: 'cream',
      name: '생크림',
      imageUrl: '/images/items/cream.png',
      description: '부드러운 생크림입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'apple_soup',
      name: '사과 수플레',
      imageUrl: '/images/items/apple_soup.png',
      description: '사과로 만든 수프',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'special_steel',
      name: '특수강괴',
      imageUrl: '/images/items/special_steel.png',
      description: '특별한 강철괴',
      isCraftable: false,
      category: '금속',
      isFromTraded: false
    },
    {
      id: 'life_gem',
      name: '생명의 마나석',
      imageUrl: '/images/items/life_gem.png',
      description: '생명력을 담은 보석',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'heart_token',
      name: '하트 토큰',
      imageUrl: '/images/items/heart_token.png',
      description: '하트 모양의 토큰',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'love_fish',
      name: '참사랑어',
      imageUrl: '/images/items/love_fish.png',
      description: '사랑을 상징하는 물고기',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'fire_bomb',
      name: '화염 마법 유탄',
      imageUrl: '/images/items/fire_bomb.png',
      description: '화염 속성의 폭탄',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'dark_fish',
      name: '어둠 유령 고기',
      imageUrl: '/images/items/dark_fish.png',
      description: '어둠 유령에서 얻은 고기',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'thunder_bomb',
      name: '번개 마법 유탄',
      imageUrl: '/images/items/thunder_bomb.png',
      description: '번개 속성의 폭탄',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'wind_bomb',
      name: '바람 마법 유탄',
      imageUrl: '/images/items/wind_bomb.png',
      description: '바람 속성의 폭탄',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'acid_bomb',
      name: '산성 마법 유탄',
      imageUrl: '/images/items/acid_bomb.png',
      description: '산성 속성의 폭탄',
      isCraftable: false,
      category: '무기',
      isFromTraded: false
    },
    {
      id: 'fire_crystal',
      name: '불꽃의 결정',
      imageUrl: '/images/items/fire_crystal.png',
      description: '화염 속성의 결정',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'ice_crystal',
      name: '얼음의 결정',
      imageUrl: '/images/items/ice_crystal.png',
      description: '얼음 속성의 결정',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'electric_crystal',
      name: '전기의 결정',
      imageUrl: '/images/items/electric_crystal.png',
      description: '전기 속성의 결정',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'light_crystal',
      name: '광휘의 결정',
      imageUrl: '/images/items/light_crystal.png',
      description: '빛 속성의 결정',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'seal_crystal',
      name: '봉인의 결정',
      imageUrl: '/images/items/seal_crystal.png',
      description: '봉인 속성의 결정',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'dye_base',
      name: '염료 기본재',
      imageUrl: '/images/items/dye_base.png',
      description: '염료의 기본 재료',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_silk',
      name: '상급 실크',
      imageUrl: '/images/items/superior_silk.png',
      description: '고급 실크',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'silk_fabric',
      name: '옷감 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '옷감 가공 시설을 만들 수 있는 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'ghost_lantern',
      name: '유령 반딧불이',
      imageUrl: '/images/items/ghost_lantern.png',
      description: '유령의 빛을 담은 등불',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'armor_blueprint',
      name: '방어구 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '방어구 제작 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'sanded_ferodotS',
      name: '세공된 페리도트S',
      imageUrl: '/images/items/sanded_ferodotS.png',
      description: '연마된 페리도트S',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'ultimate_potion',
      name: '궁극의 물약',
      imageUrl: '/images/items/ultimate_potion.png',
      description: '최상급 회복 물약',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'potato_salad',
      name: '감자 샐러드',
      imageUrl: '/images/items/potato_salad.png',
      description: '감자로 만든 샐러드',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'spirit_trace',
      name: '정령의 흔적',
      imageUrl: '/images/items/spirit_trace.png',
      description: '정령이 남긴 흔적',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'class_master_medal',
      name: '클래스 마스터 메달',
      imageUrl: '/images/items/class_master_medal.png',
      description: '클래스 마스터의 증명',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'paper',
      name: '종이',
      imageUrl: '/images/items/paper.png',
      description: '기본적인 종이',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'orphan_novel',
      name: '주인 없는 소설책',
      imageUrl: '/images/items/orphan_novel.png',
      description: '고아를 주인공으로 한 소설',
      isCraftable: false,
      category: '책',
      isFromTraded: false
    },
    {
      id: 'silk',
      name: '실크',
      imageUrl: '/images/items/silk.png',
      description: '기본적인 실크',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'ricotta_cheese_salad',
      name: '리코타 치즈 샐러드',
      imageUrl: '/images/items/ricotta_cheese_salad.png',
      description: '리코타 치즈를 넣은 샐러드',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'cream_sauce_steak',
      name: '크림 소스 스테이크',
      imageUrl: '/images/items/cream_sauce_steak.png',
      description: '크림 소스를 곁들인 스테이크',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'superior_fabric',
      name: '상급 옷감',
      imageUrl: '/images/items/superior_fabric.png',
      description: '고급 천',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'apple_cream_cake',
      name: '사과 생크림 케이크',
      imageUrl: '/images/items/apple_cream_cake.png',
      description: '사과와 크림을 넣은 케이크',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'superior_fabric_plus',
      name: '상급 옷감+',
      imageUrl: '/images/items/superior_fabric_plus.png',
      description: '최고급 천',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'copper_ore',
      name: '구리 광석',
      imageUrl: '/images/items/copper_ore.png',
      description: '제련이 필요한 구리 광석',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'white_ore',
      name: '백동 광석',
      imageUrl: '/images/items/white_ore.png',
      description: '제련이 필요한 백금 광석',
      isCraftable: false,
      category: '광물',
      isFromTraded: false
    },
    {
      id: 'metal_processing_blueprint',
      name: '금속 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '금속 가공 시설을 만들 수 있는 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'weapon_blueprint',
      name: '무기 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '무기 제작 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'cave_gem',
      name: '협곡의 마나석',
      imageUrl: '/images/items/cave_gem.png',
      description: '동굴에서 발견된 보석',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'ruin_gem',
      name: '폐허의 마나석',
      imageUrl: '/images/items/ruin_gem.png',
      description: '유적에서 발견된 보석',
      isCraftable: false,
      category: '보석',
      isFromTraded: false
    },
    {
      id: 'superior_critical_potion',
      name: '상급 치명타 비약',
      imageUrl: '/images/items/superior_critical_potion.png',
      description: '치명타 확률을 크게 높여주는 비약',
      isCraftable: false,
      category: '물약',
      isFromTraded: false
    },
    {
      id: 'ice_fruit_juice',
      name: '얼음 딸기주스',
      imageUrl: '/images/items/ice_fruit_juice.png',
      description: '얼음 속성의 과일로 만든 주스',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'healthy_drink',
      name: '건강 음료',
      imageUrl: '/images/items/healthy_drink.png',
      description: '건강에 좋은 음료',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'chrysanthemum_ear',
      name: '초롱아귀',
      imageUrl: '/images/items/chrysanthemum_ear.png',
      description: '국화 모양의 귀걸이',
      isCraftable: false,
      category: '장식품',
      isFromTraded: false
    },
    {
      id: 'clean_mushroom_spores',
      name: '깔끔 버섯 포자',
      imageUrl: '/images/items/clean_mushroom_spores.png',
      description: '정화된 버섯의 포자',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'alrio_orio',
      name: '알리오 올리오',
      imageUrl: '/images/items/alrio_orio.png',
      description: '특별한 오리오 요리',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'medicine_processing_blueprint',
      name: '의약품 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '의약품 가공 시설을 만들 수 있는 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'poison_bag',
      name: '독 주머니',
      imageUrl: '/images/items/poison_bag.png',
      description: '독을 담은 주머니',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'medicine_blueprint',
      name: '의약품 제작대 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '의약품 제작 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'sun_butterfly',
      name: '석양나비',
      imageUrl: '/images/items/sun_butterfly.png',
      description: '태양의 빛을 받은 나비',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_wood',
      name: '상급 목재',
      imageUrl: '/images/items/superior_wood.png',
      description: '고급 가구 제작에 사용되는 상급 목재입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'superior_wood_plus',
      name: '상급 목재+',
      imageUrl: '/images/items/superior_wood_plus.png',
      description: '최고급 가구 제작에 사용되는 상급 목재입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'leather',
      name: '생가죽',
      imageUrl: '/images/items/leather.png',
      description: '기본적인 가죽',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'leather_processing_blueprint',
      name: '가죽 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '가죽 가공 시설을 만들 수 있는 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'wood_processing_blueprint',
      name: '목재 가공 시설 설계도 (3레벨)',
      imageUrl: '/images/items/blueprint.png',
      description: '목재 가공 시설을 만들 수 있는 설계도',
      isCraftable: false,
      category: '설계도',
      isFromTraded: false
    },
    {
      id: 'tracy_wood_carving',
      name: '트레이시의 원목 오르골',
      imageUrl: '/images/items/tracy_wood_carving.png',
      description: '트레이시가 만든 나무 오르골',
      isCraftable: false,
      category: '장식품',
      isFromTraded: true
    },
    {
      id: 'clam_chowder',
      name: '조개찜',
      imageUrl: '/images/items/clam_chowder.png',
      description: '신선한 조개로 만든 찜',
      isCraftable: false,
      category: '음식',
      isFromTraded: false
    },
    {
      id: 'caterpillar',
      name: '애벌레',
      imageUrl: '/images/items/caterpillar.png',
      description: '나뭇잎을 먹는 애벌레',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'meat',
      name: '고기',
      imageUrl: '/images/items/meat.png',
      description: '신선한 고기입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'salt',
      name: '소금',
      imageUrl: '/images/items/salt.png',
      description: '소금입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'water_bottle',
      name: '물이 든 병',
      imageUrl: '/images/items/water_bottle.png',
      description: '깨끗한 물이 담긴 병입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'herb',
      name: '허브',
      imageUrl: '/images/items/herb.png',
      description: '향긋한 허브입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'potato',
      name: '감자',
      imageUrl: '/images/items/potato.png',
      description: '신선한 감자입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'sugar',
      name: '설탕',
      imageUrl: '/images/items/sugar.png',
      description: '설탕입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cabbage',
      name: '양배추',
      imageUrl: '/images/items/cabbage.png',
      description: '신선한 양배추입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'mayonnaise',
      name: '마요네즈',
      imageUrl: '/images/items/mayonnaise.png',
      description: '크리미한 마요네즈입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'garlic',
      name: '마늘',
      imageUrl: '/images/items/garlic.png',
      description: '향긋한 마늘입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'onion',
      name: '양파',
      imageUrl: '/images/items/onion.png',
      description: '신선한 양파입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'corn',
      name: '옥수수',
      imageUrl: '/images/items/corn.png',
      description: '신선한 옥수수입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cheese',
      name: '치즈',
      imageUrl: '/images/items/cheese.png',
      description: '부드러운 치즈입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'flour',
      name: '밀가루',
      imageUrl: '/images/items/flour.png',
      description: '고운 밀가루입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'clam',
      name: '조개',
      imageUrl: '/images/items/clam.png',
      description: '신선한 조개입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'lemon',
      name: '레몬',
      imageUrl: '/images/items/lemon.png',
      description: '상큼한 레몬입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'pepper',
      name: '후추',
      imageUrl: '/images/items/pepper.png',
      description: '향긋한 후추입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'ice',
      name: '얼음',
      imageUrl: '/images/items/ice.png',
      description: '차가운 얼음입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'strawberry',
      name: '딸기',
      imageUrl: '/images/items/strawberry.png',
      description: '달콤한 딸기입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'cream',
      name: '생크림',
      imageUrl: '/images/items/cream.png',
      description: '부드러운 생크림입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'noodle',
      name: '면',
      imageUrl: '/images/items/noodle.png',
      description: '신선한 면입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'bream',
      name: '브리흐네 잉어',
      imageUrl: '/images/items/bream.png',
      description: '신선한 브리흐네 잉어입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'silver_fish',
      name: '은붕어',
      imageUrl: '/images/items/silver_fish.png',
      description: '신선한 은붕어입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'rainbow_trout',
      name: '무지개 송어',
      imageUrl: '/images/items/rainbow_trout.png',
      description: '신선한 무지개 송어입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'eel',
      name: '은어',
      imageUrl: '/images/items/eel.png',
      description: '신선한 은어입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'tomato',
      name: '토마토',
      imageUrl: '/images/items/tomato.png',
      description: '신선한 토마토입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'mackerel',
      name: '고등어',
      imageUrl: '/images/items/mackerel.png',
      description: '신선한 고등어입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'salmon',
      name: '연어',
      imageUrl: '/images/items/salmon.png',
      description: '신선한 연어입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'asparagus',
      name: '아스파라거스',
      imageUrl: '/images/items/asparagus.png',
      description: '신선한 아스파라거스입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'catfish',
      name: '메기',
      imageUrl: '/images/items/catfish.png',
      description: '신선한 메기입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    },
    {
      id: 'pea',
      name: '완두콩',
      imageUrl: '/images/items/pea.png',
      description: '신선한 완두콩입니다.',
      isCraftable: false,
      category: '재료',
      isFromTraded: false
    }
  ]