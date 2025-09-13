# Recipes Database

이 문서는 게임 데이터베이스의 모든 레시피를 테이블 형식으로 포함합니다.

## 레시피 구조

### 폴더 구조
```
src/data/recipes/
├── buying.ts          # 구매 레시피
├── drops.ts           # 드롭 레시피  
├── gathering.ts       # 수집 레시피
├── crafting/          # 제작 관련 레시피
│   ├── cooking.ts     # 요리 레시피
│   └── crafting_item.ts # 아이템 제작 레시피
└── processing/        # 가공 레시피
    ├── index.ts       # 통합 파일
    ├── metal.ts       # 금속 가공
    ├── wood.ts        # 목재 가공
    ├── leather.ts     # 가죽 가공
    ├── fabric.ts      # 옷감 가공
    ├── medicine.ts    # 약품 가공
    └── food.ts        # 식재료 가공
```

### 레시피 카테고리
- **PROCESS_METAL**: 금속 가공
- **PROCESS_WOOD**: 목재 가공
- **PROCESS_LEATHER**: 가죽 가공
- **PROCESS_FABRIC**: 옷감 가공
- **PROCESS_ITEM**: 약품/식재료 가공
- **COOKING**: 요리
- **CRAFTING**: 아이템 제작
- **GATHERING**: 수집
- **BUYING**: 구매
- **DROPS**: 드롭

## 금속 가공 (Metal Processing)

| ID | Item Name | Production Amount | Time (seconds) | Materials | Facility Level |
|----|-----------|-------------------|----------------|-----------|----------------|
| craft_iron_ingot | 철괴 | 3 | 60 | 철 광석 x10 | 1 |
| craft_steel_ingot | 강철괴 | 3 | 960 | 철괴 x3, 석탄 x4 | 2 |
| craft_alloy_steel_ingot | 합금강괴 | 3 | 14400 | 강철괴 x3, 동광석 x15, 석탄 x8 | 3 |
| craft_special_steel | 특수강괴 | 3 | 36000 | 합금강괴 x4, 백동 광석 x20, 석탄 x12 | 4 |
| craft_silver_alloy_ingot | 은합금괴 | 3 | 36000 | 특수강괴 x5, 은광석 x20, 석탄 x16 | 5 |

## 목재 가공 (Wood Processing)

| ID | Item Name | Production Amount | Time (seconds) | Materials | Facility Level |
|----|-----------|-------------------|----------------|-----------|----------------|
| craft_wood | 목재 | 3 | 90 | 통나무 x10 | 1 |
| craft_wood_plus | 목재+ | 3 | 1080 | 목재 x3, 나무진액 x4 | 2 |
| craft_superior_wood | 상급 목재 | 3 | 14400 | 목재+ x3, 상급 통나무 x15, 나무 진액 x8 | 3 |
| craft_superior_wood_plus | 상급 목재+ | 3 | 36000 | 상급 목재 x4, 상급 통나무+ x20, 나무 진액 x12 | 4 |
| craft_soft_wood | 부드러운 목재 | 3 | 28800 | 상급 목재+ x15, 부드러운 통나무 x30, 나무 진액 x30 | 5 |
| craft_finest_wood | 최상급 목재 | 3 | 36000 | 상급 목재+ x5, 최상급 통나무 x20, 나무 진액 x16 | 5 |

## 가죽 가공 (Leather Processing)

| ID | Item Name | Production Amount | Time (seconds) | Materials | Facility Level |
|----|-----------|-------------------|----------------|-----------|----------------|
| craft_leather | 가죽 | 3 | 60 | 생가죽 x10 | 1 |
| craft_leather_plus_processed | 가죽+ | 3 | 960 | 가죽 x3, 타닌 가루 x4 | 2 |
| craft_superior_leather_processed | 상급 가죽 | 3 | 14400 | 가죽+ x3, 상급 생가죽 x15, 타닌 가루 x8 | 3 |
| craft_superior_leather_plus_processed | 상급 가죽+ | 3 | 36000 | 상급 가죽 x4, 상급 생가죽+ x20, 타닌 가루 x12 | 4 |
| craft_best_leather_processed | 최상급 가죽 | 3 | 36000 | 상급 가죽+ x5, 최상급 생가죽 x30, 타닌 가루 x16 | 5 |

## 옷감 가공 (Fabric Processing)

| ID | Item Name | Production Amount | Time (seconds) | Materials | Facility Level |
|----|-----------|-------------------|----------------|-----------|----------------|
| craft_fabric_processed | 옷감 | 3 | 90 | 양털 x10 | 1 |
| craft_fabric_plus_processed | 옷감+ | 3 | 1080 | 옷감 x3 | 2 |
| craft_superior_fabric | 상급 옷감 | 3 | 14400 | 옷감+ x3, 상급 양털 x15, 양털 x8 | 3 |
| craft_superior_fabric_plus_processed | 상급 옷감+ | 3 | 36000 | 상급 옷감 x4, 상급 양털+ x20, 양털 x12 | 4 |
| craft_silk | 실크 | 2 | 180 | 거미줄 x10 | 2 |
| craft_superior_silk | 상급 실크 | 2 | 21600 | 실크 x4, 튼튼 버섯 진액 x8 | 4 |
| craft_supreme_fabric | 최상급 옷감 | 3 | 36000 | 상급 옷감+ x5, 최상급 양털 x20, 양털 x16 | 5 |
| craft_supreme_silk | 최상급 실크 | 3 | 36000 | 상급 실크 x4, 최상급 거미줄 x30, 튼튼 버섯 진액 x16 | 5 |

## 약품 가공 (Medicine Processing)

| ID | Item Name | Production Amount | Time (seconds) | Materials | Facility Level |
|----|-----------|-------------------|----------------|-----------|----------------|
| craft_fresh_mushroom_spore | 새록 버섯 포자 | 15 | 600 | 새록 버섯 x30, 종이 x3 | 1 |
| craft_fresh_mushroom_extract | 새록 버섯 진액 | 5 | 60 | 새록 버섯 포자 x10, 물병 x1 | 1 |
| craft_sturdy_mushroom_powder | 튼튼 버섯 가루 | 5 | 300 | 튼튼 버섯 x20 | 2 |
| craft_sturdy_mushroom_spore | 튼튼 버섯 포자 | 15 | 600 | 튼튼 버섯 x30, 종이 x3 | 2 |
| craft_sturdy_mushroom_extract | 튼튼 버섯 진액 | 5 | 600 | 튼튼 버섯 포자 x10, 물병 x1 | 2 |
| craft_growing_mushroom_spore | 쑥쑥 버섯 포자 | 15 | 720 | 쑥쑥 버섯 x30, 종이 x3 | 3 |
| craft_growing_mushroom_extract | 쑥쑥 버섯 진액 | 5 | 3600 | 쑥쑥 버섯 포자 x10, 물병 x1 | 3 |
| craft_clean_mushroom_spore | 깔끔 버섯 포자 | 15 | 3000 | 깔끔 버섯 x30, 종이 x3 | 4 |
| craft_clean_mushroom_extract | 깔끔 버섯 진액 | 5 | 7200 | 깔끔 버섯 포자 x10, 물병 x1 | 4 |
| craft_light_crystal | 광휘의 결정 | 3 | 1200 | 유령 반딧불이 x3, 마나 허브 x10, 점토 x3 | 3 |
| craft_fire_crystal | 불꽃의 결정 | 3 | 1200 | 석양나비 x3, 마나 허브 x10, 점토 x3 | 3 |
| craft_ice_crystal | 얼음의 결정 | 3 | 1200 | 흰얼음풍뎅이 x3, 마나 허브 x10, 점토 x3 | 3 |
| craft_hiding_flower_powder | 숨숨꽃 가루 | 5 | 1800 | 숨숨꽃 x20 | 3 |
| craft_wound_flower_powder | 생채기꽃 가루 | 3 | 30000 | 생채기꽃 x20 | 5 |

## 식재료 가공 (Food Processing)

| ID | Item Name | Production Amount | Time (seconds) | Materials | Facility Level |
|----|-----------|-------------------|----------------|-----------|----------------|
| craft_mayonnaise_process | 마요네즈 | 3 | 90 | 달걀 x10, 식용유 x2 | 1 |
| craft_flour_process | 밀가루 | 3 | 1200 | 밀 x15 | 2 |
| craft_cheese_process | 치즈 | 3 | 1200 | 우유 x6, 소금 x1 | 2 |
| craft_noodle_process | 면 | 3 | 3000 | 밀가루 x3, 달걀 x5, 물병 x1 | 3 |
| craft_cream_process | 생크림 | 3 | 3000 | 우유 x12, 달걀 x6, 설탕 x2 | 3 |




## 아이템 제작 (Item Crafting)

아이템 제작 레시피는 `src/data/recipes/crafting/crafting_item.ts`에 정의되어 있습니다.





## 음식 제작

This document contains all recipes from the game database in table format.

| ID | Name | Result Item | Required Items | Category | Facility Level |
|----|------|-------------|----------------|----------|----------------|
| travelers_snack | 여행자 간식 | travelers_snack | egg x1, meat x1 | 간편 | 1 |
| fried_egg | 달걀프라이 | fried_egg | egg x1, salt x1 | 간편 | 1 |
| boiled_egg | 삶은 달걀 | boiled_egg | egg x1, water_bottle x1 | 간편 | 1 |
| roasted_meat | 구운 고기 | roasted_meat | meat x4, herb x2, salt x1 | 힘 특화 | 1 |
| roasted_potato | 통감자구이 | roasted_potato | potato x4, herb x2, sugar x2 | 솜씨 특화 | 1 |
| apple_juice | 사과 주스 | apple_juice | apple x4, water_bottle x1, sugar x2 | 지력 특화 | 1 |
| mayonnaise_stir_fry | 마요네즈 고기볶음 | mayonnaise_stir_fry | meat x4, cabbage x1, mayonnaise x1 | 힘 특화 | 1 |
| potato_salad | 감자 샐러드 | potato_salad | potato x4, cabbage x2, mayonnaise x1 | 솜씨 특화 | 1 |
| apple_salad | 사과 샐러드 | apple_salad | apple x4, cabbage x2, mayonnaise x1 | 지력 특화 | 1 |
| snack_to_eat | 짜먹는 간식 | snack_to_eat | meat x3, herb x1, water_bottle x1 | 기타 | 3 |
| fork_in_milk | 포크 인 밀크 | fork_in_milk | meat x8, milk x4, garlic x2, herb x2 | 힘 특화 | 5 |
| stir_fried_vegetables | 야채볶음 | stir_fried_vegetables | potato x8, onion x3, cabbage x6, herb x2 | 솜씨 특화 | 5 |
| corn_cheese | 콘치즈 | corn_cheese | corn x10, cheese x2, herb x2, sugar x3 | 지력 특화 | 5 |
| cheese_fondue | 치즈 퐁뒤 | cheese_fondue | meat x8, cheese x2, potato x4, salt x2 | 힘 특화 | 5 |
| ricotta_cheese_salad | 리코타 치즈 샐러드 | ricotta_cheese_salad | cabbage x4, cheese x2, mayonnaise x1 | 솜씨 특화 | 5 |
| apple_souffle | 사과 수플레 | apple_souffle | apple x8, flour x2, egg x4, sugar x4 | 지력 특화 | 5 |
| steamed_clams | 조개찜 | clam_chowder | clam x10, water_bottle x5, lemon x4, herb x3 | 힘 특화 | 10 |
| potato_soup | 감자수프 | potato_soup | potato x12, milk x5, herb x3, pepper x6 | 솜씨 특화 | 10 |
| ice_strawberry_juice | 얼음 딸기주스 | ice_fruit_juice | ice x10, strawberry x6, herb x3, sugar x4 | 지력 특화 | 10 |
| cream_sauce_steak | 크림소스 스테이크 | cream_sauce_steak | meat x10, cream x2, garlic x4, pepper x3 | 힘 특화 | 10 |
| aglio_e_olio | 알리오 올리오 | alrio_orio | garlic x7, noodle x2, onion x2, pepper x2 | 솜씨 특화 | 10 |
| apple_cream_cake | 사과 생크림 케이크 | apple_cream_cake | apple x12, cream x2, flour x4, sugar x9 | 지력 특화 | 10 |
| white_fish_meuniere | 화이트 피시 무니에르 | white_fish_meuniere | bream x5, silver_fish x3, potato x5, flour x3, lemon x5, salt x3 | 쉐어링 | 15 |
| bouillabaisse | 부야베스 | bouillabaisse | rainbow_trout x4, eel x4, tomato x6, clam x5, onion x2, garlic x4 | 쉐어링 | 15 |
| mackerel_and_salmon_steak | 고등어 연어 스테이크 | mackerel_and_salmon_steak | mackerel x5, salmon x3, mayonnaise x2, asparagus x4, salt x2, pepper x3 | 쉐어링 | 15 |
| catfish_fish_and_chips | 메기 피쉬 앤 칩스 | catfish_fish_and_chips | catfish x6, potato x6, flour x3, pea x4, lemon x2, salt x3 | 쉐어링 | 15 |
| cream | 생크림 | cream | milk x12, egg x6, sugar x2 | 기타 | 5 |
| flour | 밀가루 | flour | wheat x15 | 기타 | 5 |
| shawarma | 샤와르마 | shawarma | lean_meat x10, bean x12, flour x3, cabbage x5, lemon x2 | 힘 특화 | 13 |
| meat_parmigiana | 미트 파르미자나 | meat_parmigiana | lean_meat x10, cheese x3, tomato x1, pepper x1, salt x1 | 힘 특화 | 13 |

## 레시피 통계

### 가공 레시피 (Processing Recipes)
- **금속 가공**: 5개 레시피 (철괴 → 은합금괴)
- **목재 가공**: 6개 레시피 (목재 → 최상급 목재)
- **가죽 가공**: 5개 레시피 (가죽 → 최상급 가죽)
- **옷감 가공**: 8개 레시피 (옷감, 실크 계열)
- **약품 가공**: 14개 레시피 (버섯류, 결정류, 꽃 가루)
- **식재료 가공**: 5개 레시피 (마요네즈, 밀가루, 치즈, 면, 생크림)

### 제작 레시피 (Crafting Recipes)
- **요리 레시피**: 25개 레시피 (간편 → 쉐어링)
- **아이템 제작**: 50개 레시피 (회복 아이템, 특수 붕대, 강화 아이템, 마법유탄, 염색약, 기타 음식, 재료, 캠프파이어, 설비 제작 도구)

### 총 레시피 수
- **가공 레시피**: 43개
- **요리 레시피**: 25개
- **아이템 제작 레시피**: 50개
- **기타 레시피**: 구매, 드롭, 수집 등

## Notes

- Korean text is preserved as in the original data
- Most recipes produce 1 result item (default), some produce multiple (e.g., cream produces 3)
- Required items are formatted as "item_name x quantity"
- Facility level indicates the minimum level required to craft the recipe
- Processing recipes include crafting time in seconds
- All recipes are categorized by type for better organization
