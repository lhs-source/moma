import type { NPC } from './schemas/npc'
import type { Item } from './schemas/item'
import type { Trade } from './schemas/trade'
import type { TradeData } from './schemas/trade'

export const npcs: NPC[] = [
  {
    id: 'nora',
    name: '노라',
    location: '티르코네일',
    description: '물품관리소',
    imageUrl: '/images/npcs/nora.png'
  },
  {
    id: 'deian',
    name: '데이안',
    location: '티르코네일',
    description: '목장',
    imageUrl: '/images/npcs/deian.png'
  },
  {
    id: 'dilis',
    name: '딜리스',
    location: '티르코네일',
    description: '치료소',
    imageUrl: '/images/npcs/dilis.png'
  },
  {
    id: 'lasa',
    name: '라사',
    location: '티르코네일',
    description: '학교',
    imageUrl: '/images/npcs/lasa.png'
  },
  {
    id: 'reynald',
    name: '레이널드',
    location: '티르코네일',
    description: '무술교실',
    imageUrl: '/images/npcs/reynald.png'
  },
  {
    id: 'malcolm',
    name: '말콤',
    location: '티르코네일',
    description: '잡화점',
    imageUrl: '/images/npcs/malcolm.png'
  },
  {
    id: 'maven',
    name: '메이븐',
    location: '티르코네일',
    description: '봉헌소',
    imageUrl: '/images/npcs/maven.png'
  },
  {
    id: 'alisa',
    name: '알리사',
    location: '티르코네일',
    description: '방앗간',
    imageUrl: '/images/npcs/alisa.png'
  },
  {
    id: 'endelion',
    name: '엔델리온',
    location: '티르코네일',
    description: '교회',
    imageUrl: '/images/npcs/endelion.png'
  },
  {
    id: 'kaitin',
    name: '케이틴',
    location: '티르코네일',
    description: '식료품점',
    imageUrl: '/images/npcs/kaitin.png'
  },
  {
    id: 'fergus',
    name: '퍼거스',
    location: '티르코네일',
    description: '대장간',
    imageUrl: '/images/npcs/fergus.png'
  },
  {
    id: 'elvin',
    name: '엘빈',
    location: '두갈드아일',
    description: '도구점',
    imageUrl: '/images/npcs/elvin.png'
  },
  {
    id: 'tracy',
    name: '트레이시',
    location: '두갈드아일',
    description: '목공소',
    imageUrl: '/images/npcs/tracy.png'
  },
  {
    id: 'glenis',
    name: '글리니스',
    location: '던바튼',
    description: '식료품점',
    imageUrl: '/images/npcs/glenis.png'
  },
  {
    id: 'neris',
    name: '네리스',
    location: '던바튼',
    description: '대장간',
    imageUrl: '/images/npcs/neris.png'
  },
  {
    id: 'manus',
    name: '마누스',
    location: '던바튼',
    description: '치료소',
    imageUrl: '/images/npcs/manus.png'
  },
  {
    id: 'walter',
    name: '발터',
    location: '던바튼',
    description: '잡화점',
    imageUrl: '/images/npcs/walter.png'
  },
  {
    id: 'stewart',
    name: '스튜어트',
    location: '던바튼',
    description: '마법교실',
    imageUrl: '/images/npcs/stewart.png'
  },
  {
    id: 'simon',
    name: '시몬',
    location: '던바튼',
    description: '의상점',
    imageUrl: '/images/npcs/simon.png'
  },
  {
    id: 'aranwen',
    name: '아란웬',
    location: '던바튼',
    description: '학교',
    imageUrl: '/images/npcs/aranwen.png'
  },
  {
    id: 'aira',
    name: '아이라',
    location: '던바튼',
    description: '서점',
    imageUrl: '/images/npcs/aira.png'
  },
  {
    id: 'jerome',
    name: '제롬',
    location: '던바튼',
    description: '의상작업실',
    imageUrl: '/images/npcs/jerome.png'
  },
  {
    id: 'jamie',
    name: '제이미',
    location: '던바튼',
    description: '의상작업실',
    imageUrl: '/images/npcs/jamie.png'
  },
  {
    id: 'kalis',
    name: '칼릭스',
    location: '던바튼',
    description: '상인조합',
    imageUrl: '/images/npcs/kalis.png'
  },
  {
    id: 'flora',
    name: '플로라',
    location: '던바튼',
    description: '여관',
    imageUrl: '/images/npcs/flora.png'
  },
  {
    id: 'karin',
    name: '카린',
    location: '얼음 협곡',
    description: '설산구조대',
    imageUrl: '/images/npcs/karin.png'
  },
  {
    id: 'armis',
    name: '아르미스',
    location: '콜헨',
    description: '대장간',
    imageUrl: '/images/npcs/armis.png'
  },
  {
    id: 'keaira',
    name: '케아라',
    location: '콜헨',
    description: '용병사무소',
    imageUrl: '/images/npcs/keaira.png'
  },
  {
    id: 'conor',
    name: '코너',
    location: '콜헨',
    description: '잡화점',
    imageUrl: '/images/npcs/conor.png'
  },
  {
    id: 'killian',
    name: '킬리언',
    location: '콜헨',
    description: '치료소',
    imageUrl: '/images/npcs/killian.png'
  }
]

export const items: Item[] = [
  {
    id: 'travelers_snack',
    name: '여행자 간식',
    imageUrl: '/images/items/travelers_snack.png',
    description: '여행 중에 먹기 좋은 간식',
    isCraftable: false,
    category: '음식'
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
    category: '가구'
  },
  {
    id: 'superior_wool',
    name: '상급 양털',
    imageUrl: '/images/items/superior_wool.png',
    description: '고급 양털',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'pet_food',
    name: '펫 먹이',
    imageUrl: '/images/items/pet_food.png',
    description: '펫을 위한 먹이',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'four_leaf_clover',
    name: '네잎클로버',
    imageUrl: '/images/items/four_leaf_clover.png',
    description: '행운을 가져다주는 네잎클로버',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'mushroom',
    name: '쑥쑥 버섯',
    imageUrl: '/images/items/mushroom.png',
    description: '자라는 버섯',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'alchemy_catalyst',
    name: '고급 연금술 재연소 촉매',
    imageUrl: '/images/items/alchemy_catalyst.png',
    description: '연금술 실험에 사용되는 촉매',
    isCraftable: false,
    category: '재료'
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
    category: '음식'
  },
  {
    id: 'alchemy_powder',
    name: '연금술 부스러기',
    imageUrl: '/images/items/alchemy_powder.png',
    description: '연금술 실험의 부산물',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'rare_alchemy_catalyst',
    name: '레어 연금술 재연소 촉매',
    imageUrl: '/images/items/rare_alchemy_catalyst.png',
    description: '희귀한 연금술 촉매',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'critical_potion',
    name: '치명타 비약',
    imageUrl: '/images/items/critical_potion.png',
    description: '치명타 확률을 높여주는 비약',
    isCraftable: false,
    category: '물약'
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
    category: '음식'
  },
  {
    id: 'blank_score',
    name: '빈 악보',
    imageUrl: '/images/items/blank_score.png',
    description: '작곡에 사용되는 빈 악보',
    isCraftable: false,
    category: '음악'
  },
  {
    id: 'wool',
    name: '양털',
    imageUrl: '/images/items/wool.png',
    description: '부드러운 양털',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'spider_web',
    name: '거미줄',
    imageUrl: '/images/items/spider_web.png',
    description: '거미가 만든 거미줄',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'workbench_blueprint',
    name: '다목적 제작대 설계도 (3레벨)',
    imageUrl: '/images/items/workbench_blueprint.png',
    description: '다목적 제작대를 만들 수 있는 설계도',
    isCraftable: false,
    category: '설계도'
  },
  {
    id: 'campfire_kit',
    name: '전문 캠프파이어 키트',
    imageUrl: '/images/items/campfire_kit.png',
    description: '전문가용 캠프파이어 키트',
    isCraftable: false,
    category: '도구'
  },
  {
    id: 'holy_water',
    name: '성수',
    imageUrl: '/images/items/holy_water.png',
    description: '신성한 물',
    isCraftable: false,
    category: '물약'
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
    category: '음식'
  },
  {
    id: 'egg',
    name: '달걀',
    imageUrl: '/images/items/egg.png',
    description: '신선한 달걀',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'lavender',
    name: '라벤더 꽃',
    imageUrl: '/images/items/lavender.png',
    description: '향기로운 라벤더 꽃',
    isCraftable: false,
    category: '재료'
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
    category: '재료'
  },
  {
    id: 'milk',
    name: '우유',
    imageUrl: '/images/items/milk.png',
    description: '신선한 우유',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'food_processing_blueprint',
    name: '식재료 가공 시설 설계도 (3레벨)',
    imageUrl: '/images/items/food_processing_blueprint.png',
    description: '식재료 가공 시설을 만들 수 있는 설계도',
    isCraftable: false,
    category: '설계도'
  },
  {
    id: 'iron_ore',
    name: '철 광석',
    imageUrl: '/images/items/iron_ore.png',
    description: '제련이 필요한 철 광석',
    isCraftable: false,
    category: '광물'
  },
  {
    id: 'coal',
    name: '석탄',
    imageUrl: '/images/items/coal.png',
    description: '제련에 사용되는 석탄',
    isCraftable: false,
    category: '광물'
  },
  {
    id: 'equipment_parts',
    name: '분해된 장비 부품',
    imageUrl: '/images/items/equipment_parts.png',
    description: '장비를 분해해서 얻은 부품',
    isCraftable: false,
    category: '재료'
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
    category: '금속'
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
    category: '금속'
  },
  {
    id: 'tannin_powder',
    name: '타닌 가루',
    imageUrl: '/images/items/tannin_powder.png',
    description: '가죽 가공에 사용되는 타닌 가루',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'superior_log',
    name: '상급 통나무',
    imageUrl: '/images/items/superior_log.png',
    description: '고급 목재로 사용되는 통나무',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'superior_leather',
    name: '상급 가죽',
    imageUrl: '/images/items/superior_leather.png',
    description: '고급 가죽',
    isCraftable: false,
    category: '재료'
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
    category: '음식'
  },
  {
    id: 'log',
    name: '통나무',
    imageUrl: '/images/items/log.png',
    description: '기본적인 목재',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'tree_sap',
    name: '나무 수액',
    imageUrl: '/images/items/tree_sap.png',
    description: '나무에서 채취한 수액',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'glenis_cake',
    name: '글리니스 케이크',
    imageUrl: '/images/items/glenis_cake.png',
    description: '글리니스가 만든 특제 케이크',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'fork_in_milk',
    name: '우유에 담긴 포크',
    imageUrl: '/images/items/fork_in_milk.png',
    description: '우유에 담긴 포크',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'glenis_apple_milk_tea',
    name: '글리니스 특제 사과 밀크티',
    imageUrl: '/images/items/glenis_apple_milk_tea.png',
    description: '글리니스가 만든 특제 밀크티',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'cream',
    name: '크림',
    imageUrl: '/images/items/cream.png',
    description: '신선한 크림',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'apple_soup',
    name: '사과 수프',
    imageUrl: '/images/items/apple_soup.png',
    description: '사과로 만든 수프',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'special_steel',
    name: '특수강괴',
    imageUrl: '/images/items/special_steel.png',
    description: '특별한 강철괴',
    isCraftable: false,
    category: '금속'
  },
  {
    id: 'life_gem',
    name: '생명의 보석',
    imageUrl: '/images/items/life_gem.png',
    description: '생명력을 담은 보석',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'stewart_wood_carving',
    name: '스튜어트의 나무 조각',
    imageUrl: '/images/items/stewart_wood_carving.png',
    description: '스튜어트가 만든 나무 조각',
    isCraftable: false,
    category: '장식품'
  },
  {
    id: 'heart_token',
    name: '하트 토큰',
    imageUrl: '/images/items/heart_token.png',
    description: '하트 모양의 토큰',
    isCraftable: false,
    category: '장식품'
  },
  {
    id: 'love_fish',
    name: '사랑의 물고기',
    imageUrl: '/images/items/love_fish.png',
    description: '사랑을 상징하는 물고기',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'fire_bomb',
    name: '화염 폭탄',
    imageUrl: '/images/items/fire_bomb.png',
    description: '화염 속성의 폭탄',
    isCraftable: false,
    category: '무기'
  },
  {
    id: 'dark_fish',
    name: '어둠의 물고기',
    imageUrl: '/images/items/dark_fish.png',
    description: '어둠의 힘을 가진 물고기',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'thunder_bomb',
    name: '번개 폭탄',
    imageUrl: '/images/items/thunder_bomb.png',
    description: '번개 속성의 폭탄',
    isCraftable: false,
    category: '무기'
  },
  {
    id: 'wind_bomb',
    name: '바람 폭탄',
    imageUrl: '/images/items/wind_bomb.png',
    description: '바람 속성의 폭탄',
    isCraftable: false,
    category: '무기'
  },
  {
    id: 'acid_bomb',
    name: '산성 폭탄',
    imageUrl: '/images/items/acid_bomb.png',
    description: '산성 속성의 폭탄',
    isCraftable: false,
    category: '무기'
  },
  {
    id: 'fire_crystal',
    name: '화염 결정',
    imageUrl: '/images/items/fire_crystal.png',
    description: '화염 속성의 결정',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'ice_crystal',
    name: '얼음 결정',
    imageUrl: '/images/items/ice_crystal.png',
    description: '얼음 속성의 결정',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'electric_crystal',
    name: '전기 결정',
    imageUrl: '/images/items/electric_crystal.png',
    description: '전기 속성의 결정',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'light_crystal',
    name: '빛 결정',
    imageUrl: '/images/items/light_crystal.png',
    description: '빛 속성의 결정',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'seal_crystal',
    name: '봉인 결정',
    imageUrl: '/images/items/seal_crystal.png',
    description: '봉인 속성의 결정',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'dye_base',
    name: '염료 기본재',
    imageUrl: '/images/items/dye_base.png',
    description: '염료의 기본 재료',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'superior_silk',
    name: '상급 실크',
    imageUrl: '/images/items/superior_silk.png',
    description: '고급 실크',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'silk_fabric',
    name: '실크 천',
    imageUrl: '/images/items/silk_fabric.png',
    description: '실크로 만든 천',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'ghost_lantern',
    name: '유령 등불',
    imageUrl: '/images/items/ghost_lantern.png',
    description: '유령의 빛을 담은 등불',
    isCraftable: false,
    category: '장식품'
  },
  {
    id: 'armor_blueprint',
    name: '방어구 설계도',
    imageUrl: '/images/items/armor_blueprint.png',
    description: '방어구 제작 설계도',
    isCraftable: false,
    category: '설계도'
  },
  {
    id: 'sanded_ferodotS',
    name: '연마된 페로도트S',
    imageUrl: '/images/items/sanded_ferodotS.png',
    description: '연마된 페로도트S',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'ultimate_potion',
    name: '궁극의 물약',
    imageUrl: '/images/items/ultimate_potion.png',
    description: '최상급 회복 물약',
    isCraftable: false,
    category: '물약'
  },
  {
    id: 'potato_salad',
    name: '감자 샐러드',
    imageUrl: '/images/items/potato_salad.png',
    description: '감자로 만든 샐러드',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'spirit_trace',
    name: '정령의 흔적',
    imageUrl: '/images/items/spirit_trace.png',
    description: '정령이 남긴 흔적',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'class_master_medal',
    name: '클래스 마스터 메달',
    imageUrl: '/images/items/class_master_medal.png',
    description: '클래스 마스터의 증명',
    isCraftable: false,
    category: '장식품'
  },
  {
    id: 'paper',
    name: '종이',
    imageUrl: '/images/items/paper.png',
    description: '기본적인 종이',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'orphan_novel',
    name: '고아 소설',
    imageUrl: '/images/items/orphan_novel.png',
    description: '고아를 주인공으로 한 소설',
    isCraftable: false,
    category: '책'
  },
  {
    id: 'silk',
    name: '실크',
    imageUrl: '/images/items/silk.png',
    description: '기본적인 실크',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'ricotta_cheese_salad',
    name: '리코타 치즈 샐러드',
    imageUrl: '/images/items/ricotta_cheese_salad.png',
    description: '리코타 치즈를 넣은 샐러드',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'cream_sauce_steak',
    name: '크림 소스 스테이크',
    imageUrl: '/images/items/cream_sauce_steak.png',
    description: '크림 소스를 곁들인 스테이크',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'superior_fabric',
    name: '상급 천',
    imageUrl: '/images/items/superior_fabric.png',
    description: '고급 천',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'apple_cream_cake',
    name: '사과 크림 케이크',
    imageUrl: '/images/items/apple_cream_cake.png',
    description: '사과와 크림을 넣은 케이크',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'superior_fabric_plus',
    name: '최상급 천',
    imageUrl: '/images/items/superior_fabric_plus.png',
    description: '최고급 천',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'copper_ore',
    name: '구리 광석',
    imageUrl: '/images/items/copper_ore.png',
    description: '제련이 필요한 구리 광석',
    isCraftable: false,
    category: '광물'
  },
  {
    id: 'white_ore',
    name: '백금 광석',
    imageUrl: '/images/items/white_ore.png',
    description: '제련이 필요한 백금 광석',
    isCraftable: false,
    category: '광물'
  },
  {
    id: 'metal_processing_blueprint',
    name: '금속 가공 시설 설계도',
    imageUrl: '/images/items/metal_processing_blueprint.png',
    description: '금속 가공 시설 설계도',
    isCraftable: false,
    category: '설계도'
  },
  {
    id: 'weapon_blueprint',
    name: '무기 설계도',
    imageUrl: '/images/items/weapon_blueprint.png',
    description: '무기 제작 설계도',
    isCraftable: false,
    category: '설계도'
  },
  {
    id: 'cave_gem',
    name: '동굴 보석',
    imageUrl: '/images/items/cave_gem.png',
    description: '동굴에서 발견된 보석',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'ruin_gem',
    name: '유적 보석',
    imageUrl: '/images/items/ruin_gem.png',
    description: '유적에서 발견된 보석',
    isCraftable: false,
    category: '보석'
  },
  {
    id: 'superior_critical_potion',
    name: '상급 치명타 비약',
    imageUrl: '/images/items/superior_critical_potion.png',
    description: '치명타 확률을 크게 높여주는 비약',
    isCraftable: false,
    category: '물약'
  },
  {
    id: 'ice_fruit_juice',
    name: '얼음 과일 주스',
    imageUrl: '/images/items/ice_fruit_juice.png',
    description: '얼음 속성의 과일로 만든 주스',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'healthy_drink',
    name: '건강 음료',
    imageUrl: '/images/items/healthy_drink.png',
    description: '건강에 좋은 음료',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'chrysanthemum_ear',
    name: '국화 귀걸이',
    imageUrl: '/images/items/chrysanthemum_ear.png',
    description: '국화 모양의 귀걸이',
    isCraftable: false,
    category: '장식품'
  },
  {
    id: 'clean_mushroom_spores',
    name: '정화된 버섯 포자',
    imageUrl: '/images/items/clean_mushroom_spores.png',
    description: '정화된 버섯의 포자',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'alrio_orio',
    name: '알리오 오리오',
    imageUrl: '/images/items/alrio_orio.png',
    description: '특별한 오리오 요리',
    isCraftable: false,
    category: '음식'
  },
  {
    id: 'medicine_processing_blueprint',
    name: '의약품 가공 시설 설계도',
    imageUrl: '/images/items/medicine_processing_blueprint.png',
    description: '의약품 가공 시설 설계도',
    isCraftable: false,
    category: '설계도'
  },
  {
    id: 'poison_bag',
    name: '독 주머니',
    imageUrl: '/images/items/poison_bag.png',
    description: '독을 담은 주머니',
    isCraftable: false,
    category: '재료'
  },
  {
    id: 'medicine_blueprint',
    name: '의약품 설계도',
    imageUrl: '/images/items/medicine_blueprint.png',
    description: '의약품 제작 설계도',
    isCraftable: false,
    category: '설계도'
  },
  {
    id: 'sun_butterfly',
    name: '태양 나비',
    imageUrl: '/images/items/sun_butterfly.png',
    description: '태양의 빛을 받은 나비',
    isCraftable: false,
    category: '재료'
  }
]

export const trades: Trade[] = [
  {
    id: 'nora_travelers_snack',
    npcId: 'nora',
    giveItemId: 'malcolms_pillow',
    receiveItemId: 'travelers_snack',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'malcolm_blank_score',
    npcId: 'malcolm',
    giveItemId: 'wool',
    receiveItemId: 'blank_score',
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
    receiveItemId: 'malcolms_pillow',
    giveQuantity: 5,
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
    receiveItemId: 'iron_ore',
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
    receiveItemId: 'coal',
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
    receiveItemId: 'alloy_steel_ingot',
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 4,
    isEnabled: true
  },
  {
    id: 'elvin_tannin',
    npcId: 'elvin',
    giveItemId: 'leather',
    receiveItemId: 'tannin_powder',
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
    receiveItemId: 'superior_log',
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
    receiveItemId: 'superior_wood',
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'tracy_leather',
    npcId: 'tracy',
    giveItemId: 'log',
    receiveItemId: 'leather',
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
    receiveItemId: 'superior_leather',
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
    receiveItemId: 'tree_sap',
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  }
]

interface LocationTrades {
  [key: string]: TradeData[]
}

export const npcLocations: { [key: string]: string } = {
  '노라': '물품관리소',
  '데이안': '목장',
  '딜리스': '치료소',
  '라사': '학교',
  '레이널드': '무술교실',
  '말콤': '잡화점',
  '메이븐': '봉헌소',
  '알리사': '방앗간',
  '엔델리온': '교회',
  '케이틴': '식료품점',
  '퍼거스': '대장간',
  '엘빈': '도구점',
  '트레이시': '목공소',
  '글리니스': '식료품점',
  '네리스': '대장간',
  '마누스': '치료소',
  '발터': '잡화점',
  '스튜어트': '마법교실',
  '시몬': '의상점',
  '아란웬': '학교',
  '아이라': '서점',
  '제롬': '의상작업실',
  '제이미': '의상작업실',
  '칼릭스': '상인조합',
  '플로라': '여관',
  '카린': '설산구조대',
  '아르미스': '대장간',
  '케아라': '용병사무소',
  '코너': '잡화점',
  '킬리언': '치료소'
}

export const tradeData: { [key: string]: TradeData[] } = {
  '티르코네일': [
    {
      id: 'nora_travelers_snack',
      npc: '노라',
      itemId: 'travelers_snack',
      itemQuantity: 1,
      requiredItemId: 'malcolms_pillow',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'deian_superior_wool',
      npc: '데이안',
      itemId: 'superior_wool',
      itemQuantity: 4,
      requiredItemId: 'pet_food',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'dilis_four_leaf_clover',
      npc: '딜리스',
      itemId: 'four_leaf_clover',
      itemQuantity: 1,
      requiredItemId: 'mushroom',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'lasa_alchemy_catalyst_1',
      npc: '라사',
      itemId: 'alchemy_catalyst',
      itemQuantity: 1,
      requiredItemId: 'apple_juice',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'lasa_alchemy_catalyst_2',
      npc: '라사',
      itemId: 'alchemy_catalyst',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 3,
      limitType: 'none',
      limitCount: 0
    },
    {
      id: 'lasa_rare_alchemy_catalyst',
      npc: '라사',
      itemId: 'rare_alchemy_catalyst',
      itemQuantity: 1,
      requiredItemId: 'alchemy_catalyst',
      requiredQuantity: 15,
      limitType: 'none',
      limitCount: 0
    },
    {
      id: 'reynald_critical_potion',
      npc: '레이널드',
      itemId: 'critical_potion',
      itemQuantity: 1,
      requiredItemId: 'mayonnaise_stir_fry',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'malcolm_blank_score',
      npc: '말콤',
      itemId: 'blank_score',
      itemQuantity: 1,
      requiredItemId: 'wool',
      requiredQuantity: 50,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'malcolm_pillow',
      npc: '말콤',
      itemId: 'malcolms_pillow',
      itemQuantity: 1,
      requiredItemId: 'spider_web',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'malcolm_workbench',
      npc: '말콤',
      itemId: 'workbench_blueprint',
      itemQuantity: 1,
      requiredItemId: 'campfire_kit',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'maven_holy_water',
      npc: '메이븐',
      itemId: 'holy_water',
      itemQuantity: 1,
      requiredItemId: 'kaitin_bread',
      requiredQuantity: 1,
      limitType: 'account',
      limitCount: 1
    },
    {
      id: 'alisa_alchemy_powder_1',
      npc: '알리사',
      itemId: 'alchemy_powder',
      itemQuantity: 1,
      requiredItemId: 'egg',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'alisa_alchemy_powder_2',
      npc: '알리사',
      itemId: 'alchemy_powder',
      itemQuantity: 1,
      requiredItemId: 'lavender',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'alisa_wheat_flour_1',
      npc: '알리사',
      itemId: 'wheat_flour',
      itemQuantity: 1,
      requiredItemId: 'egg',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'alisa_wheat_flour_2',
      npc: '알리사',
      itemId: 'wheat_flour',
      itemQuantity: 1,
      requiredItemId: 'lavender',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'endelion_holy_water',
      npc: '엔델리온',
      itemId: 'holy_water',
      itemQuantity: 10,
      requiredItemId: 'kaitin_bread',
      requiredQuantity: 10,
      limitType: 'account',
      limitCount: 1
    },
    {
      id: 'kaitin_bread_trade',
      npc: '케이틴',
      itemId: 'kaitin_bread',
      itemQuantity: 3,
      requiredItemId: 'milk',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'kaitin_food_processing',
      npc: '케이틴',
      itemId: 'food_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'wheat_flour',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'fergus_iron_ore',
      npc: '퍼거스',
      itemId: 'iron_ore',
      itemQuantity: 1,
      requiredItemId: 'equipment_parts',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'fergus_coal',
      npc: '퍼거스',
      itemId: 'coal',
      itemQuantity: 3,
      requiredItemId: 'equipment_parts',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'fergus_alloy_steel',
      npc: '퍼거스',
      itemId: 'alloy_steel_ingot',
      itemQuantity: 1,
      requiredItemId: 'steel_ingot',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 4
    }
  ],
  '두갈드아일': [
    {
      id: 'elvin_tannin',
      npc: '엘빈',
      itemId: 'tannin_powder',
      itemQuantity: 5,
      requiredItemId: 'leather',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'elvin_superior_log',
      npc: '엘빈',
      itemId: 'superior_log',
      itemQuantity: 1,
      requiredItemId: 'superior_leather',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'elvin_superior_wood',
      npc: '엘빈',
      itemId: 'superior_wood',
      itemQuantity: 4,
      requiredItemId: 'stir_fried_vegetables',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'elvin_leather_processing',
      npc: '엘빈',
      itemId: 'leather_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'superior_fabric_plus',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'tracy_leather',
      npc: '트레이시',
      itemId: 'leather',
      itemQuantity: 1,
      requiredItemId: 'log',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'tracy_superior_leather',
      npc: '트레이시',
      itemId: 'superior_leather',
      itemQuantity: 1,
      requiredItemId: 'log',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'tracy_tree_sap',
      npc: '트레이시',
      itemId: 'tree_sap',
      itemQuantity: 4,
      requiredItemId: 'superior_log',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'tracy_wood_carving',
      npc: '트레이시',
      itemId: 'tracy_wood_carving',
      itemQuantity: 1,
      requiredItemId: 'clam_chowder',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'tracy_wood_processing',
      npc: '트레이시',
      itemId: 'wood_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'caterpillar',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    }
  ],
  '던바튼': [
    {
      id: 'glenis_glenis_cake',
      npc: '글리니스',
      itemId: 'glenis_cake',
      itemQuantity: 1,
      requiredItemId: 'fork_in_milk',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'glenis_glenis_apple_milk_tea',
      npc: '글리니스',
      itemId: 'glenis_apple_milk_tea',
      itemQuantity: 1,
      requiredItemId: 'cream',
      requiredQuantity: 4,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'glenis_food_processing',
      npc: '글리니스',
      itemId: 'food_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'apple_soup',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'neris_superior_log',
      npc: '네리스',
      itemId: 'superior_log',
      itemQuantity: 1,
      requiredItemId: 'iron_ore',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'neris_special_steel',
      npc: '네리스',
      itemId: 'special_steel',
      itemQuantity: 1,
      requiredItemId: 'alloy_steel_ingot',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 4
    },
    {
      id: 'manus_life_gem',
      npc: '마누스',
      itemId: 'life_gem',
      itemQuantity: 1,
      requiredItemId: 'pet_food',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'walter_superior_wood',
      npc: '발터',
      itemId: 'superior_wood',
      itemQuantity: 16,
      requiredItemId: 'stewart_wood_carving',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'walter_heart_token',
      npc: '발터',
      itemId: 'heart_token',
      itemQuantity: 1,
      requiredItemId: 'love_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'walter_fire_bomb',
      npc: '발터',
      itemId: 'fire_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'walter_thunder_bomb',
      npc: '발터',
      itemId: 'thunder_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'walter_wind_bomb',
      npc: '발터',
      itemId: 'wind_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'walter_acid_bomb',
      npc: '발터',
      itemId: 'acid_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'stewart_fire_crystal',
      npc: '스튜어트',
      itemId: 'fire_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_ice_crystal',
      npc: '스튜어트',
      itemId: 'ice_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_electric_crystal',
      npc: '스튜어트',
      itemId: 'electric_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_light_crystal',
      npc: '스튜어트',
      itemId: 'light_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_seal_crystal',
      npc: '스튜어트',
      itemId: 'seal_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'simon_dye_base',
      npc: '시몬',
      itemId: 'dye_base',
      itemQuantity: 3,
      requiredItemId: 'superior_silk',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'simon_silk_fabric',
      npc: '시몬',
      itemId: 'silk_fabric',
      itemQuantity: 1,
      requiredItemId: 'ghost_lantern',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'simon_armor_blueprint',
      npc: '시몬',
      itemId: 'armor_blueprint',
      itemQuantity: 1,
      requiredItemId: 'sanded_ferodotS',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'aranwen_ultimate_potion',
      npc: '아란웬',
      itemId: 'ultimate_potion',
      itemQuantity: 1,
      requiredItemId: 'potato_salad',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'aranwen_spirit_trace',
      npc: '아란웬',
      itemId: 'spirit_trace',
      itemQuantity: 20,
      requiredItemId: 'class_master_medal',
      requiredQuantity: 1,
      limitType: 'none',
      limitCount: 0
    },
    {
      id: 'aira_paper',
      npc: '아이라',
      itemId: 'paper',
      itemQuantity: 10,
      requiredItemId: 'orphan_novel',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'jerome_silk',
      npc: '제롬',
      itemId: 'silk',
      itemQuantity: 4,
      requiredItemId: 'ricotta_cheese_salad',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'jerome_superior_silk',
      npc: '제롬',
      itemId: 'superior_silk',
      itemQuantity: 4,
      requiredItemId: 'cream_sauce_steak',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'jamie_superior_fabric',
      npc: '제이미',
      itemId: 'superior_fabric',
      itemQuantity: 4,
      requiredItemId: 'apple_soup',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'jamie_superior_fabric_plus',
      npc: '제이미',
      itemId: 'superior_fabric_plus',
      itemQuantity: 4,
      requiredItemId: 'apple_cream_cake',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'kalis_superior_wood',
      npc: '칼릭스',
      itemId: 'superior_wood',
      itemQuantity: 12,
      requiredItemId: 'glenis_apple_milk_tea',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'flora_orphan_novel',
      npc: '플로라',
      itemId: 'orphan_novel',
      itemQuantity: 1,
      requiredItemId: 'glenis_cake',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    }
  ],
  '얼음 협곡': [
    {
      id: 'karin_pet_food',
      npc: '카린',
      itemId: 'pet_food',
      itemQuantity: 10,
      requiredItemId: 'potato_soup',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    }
  ],
  '콜헨': [
    {
      id: 'armis_special_steel',
      npc: '아르미스',
      itemId: 'special_steel',
      itemQuantity: 1,
      requiredItemId: 'steel_ingot',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'armis_copper_ore',
      npc: '아르미스',
      itemId: 'copper_ore',
      itemQuantity: 10,
      requiredItemId: 'white_ore',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'armis_metal_processing',
      npc: '아르미스',
      itemId: 'metal_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'coal',
      requiredQuantity: 20,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'armis_weapon_blueprint',
      npc: '아르미스',
      itemId: 'weapon_blueprint',
      itemQuantity: 1,
      requiredItemId: 'fire_bomb',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'keaira_cave_gem',
      npc: '케아라',
      itemId: 'cave_gem',
      itemQuantity: 1,
      requiredItemId: 'superior_fabric',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'keaira_ruin_gem',
      npc: '케아라',
      itemId: 'ruin_gem',
      itemQuantity: 1,
      requiredItemId: 'superior_fabric',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'keaira_superior_critical_potion',
      npc: '케아라',
      itemId: 'superior_critical_potion',
      itemQuantity: 1,
      requiredItemId: 'ice_fruit_juice',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'conor_four_leaf_clover',
      npc: '코너',
      itemId: 'four_leaf_clover',
      itemQuantity: 1,
      requiredItemId: 'healthy_drink',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'conor_ruin_gem',
      npc: '코너',
      itemId: 'ruin_gem',
      itemQuantity: 1,
      requiredItemId: 'chrysanthemum_ear',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'killian_healthy_drink',
      npc: '킬리언',
      itemId: 'healthy_drink',
      itemQuantity: 1,
      requiredItemId: 'clean_mushroom_spores',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'killian_four_leaf_clover',
      npc: '킬리언',
      itemId: 'four_leaf_clover',
      itemQuantity: 2,
      requiredItemId: 'alrio_orio',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'killian_medicine_processing',
      npc: '킬리언',
      itemId: 'medicine_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'poison_bag',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'killian_medicine_blueprint',
      npc: '킬리언',
      itemId: 'medicine_blueprint',
      itemQuantity: 1,
      requiredItemId: 'sun_butterfly',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    }
  ]
} 