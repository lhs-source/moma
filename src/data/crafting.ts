// 제작 아이템 데이터 구조
export interface CraftingMaterial {
  [materialName: string]: number;
}

export interface CraftingItem {
  생산량: number;
  시간: number;
  재료: CraftingMaterial;
}

export interface CraftingCategory {
  [itemName: string]: CraftingItem;
}

export interface CraftingData {
  [category: string]: CraftingCategory;
}

export const craftingData: CraftingData = {
  "금속 가공": {
    "철괴(광석)": {
      생산량: 3,
      시간: 60,
      재료: {
        "광석": 20
      }
    },
    "철괴(철광석)": {
      생산량: 3,
      시간: 60,
      재료: {
        "철 광석": 10
      }
    },
    "강철괴": {
      생산량: 3,
      시간: 960,
      재료: {
        "철괴": 3,
        "석탄": 4
      }
    },
    "합금강괴": {
      생산량: 3,
      시간: 14400,
      재료: {
        "강철괴": 3,
        "동광석": 15,
        "석탄": 8
      }
    },
    "특수강괴": {
      생산량: 3,
      시간: 36000,
      재료: {
        "합금강괴": 4,
        "백동 광석": 20,
        "석탄": 12
      }
    },
    "은합금괴": {
      생산량: 3,
      시간: 36000,
      재료: {
        "특수강괴": 5,
        "은광석": 20,
        "석탄": 16
      }
    }
  },
  "목재 가공": {
    "목재": {
      생산량: 3,
      시간: 90,
      재료: {
        "통나무": 10
      }
    },
    "목재+": {
      생산량: 3,
      시간: 1080,
      재료: {
        "목재": 3,
        "나무진액": 4
      }
    },
    "상급 목재": {
      생산량: 3,
      시간: 14400,
      재료: {
        "목재+": 3,
        "상급 통나무": 15,
        "나무 진액": 8
      }
    },
    "상급 목재+": {
      생산량: 3,
      시간: 36000,
      재료: {
        "상급 목재": 4,
        "상급 통나무+": 20,
        "나무 진액": 12
      }
    },
    "부드로운 목재": {
      생산량: 3,
      시간: 28800,
      재료: {
        "상급 목재+": 15,
        "부드러운 통나무": 30,
        "나무 진액": 30
      }
    },
    "최상급 목재": {
      생산량: 3,
      시간: 36000,
      재료: {
        "상급 목재+": 5,
        "최상급 통나무": 20,
        "나무 진액": 16
      }
    }
  },
  "가죽 가공": {
    "가죽": {
      생산량: 3,
      시간: 60,
      재료: {
        "생가죽": 10
      }
    },
    "가죽+": {
      생산량: 3,
      시간: 960,
      재료: {
        "가죽": 3,
        "타닌 가루": 4
      }
    },
    "상급 가죽": {
      생산량: 3,
      시간: 14400,
      재료: {
        "가죽+": 3,
        "상급 생가죽": 15,
        "타닌 가루": 8
      }
    },
    "상급 가죽+": {
      생산량: 3,
      시간: 36000,
      재료: {
        "상급 가죽": 4,
        "상급 생가죽+": 20,
        "타닌 가루": 12
      }
    },
    "최상급 가죽": {
      생산량: 3,
      시간: 36000,
      재료: {
        "상급 가죽+": 5,
        "최상급 생가죽": 30,
        "타닌 가루": 16
      }
    }
  },
  "옷감 가공": {
    "옷감": {
      생산량: 3,
      시간: 90,
      재료: {
        "양털": 10
      }
    },
    "옷감+": {
      생산량: 3,
      시간: 1080,
      재료: {
        "옷감": 3
      }
    },
    "상급 옷감": {
      생산량: 3,
      시간: 14400,
      재료: {
        "옷감+": 3,
        "상급 양털": 15,
        "양털": 8
      }
    },
    "상급 옷감+": {
      생산량: 3,
      시간: 36000,
      재료: {
        "상급 옷감": 4,
        "상급 양털+": 20,
        "양털": 12
      }
    },
    "실크": {
      생산량: 2,
      시간: 180,
      재료: {
        "거미줄": 10
      }
    },
    "상급 실크": {
      생산량: 2,
      시간: 21600,
      재료: {
        "실크": 4,
        "튼튼 버섯 진액": 8
      }
    },
    "최상급 옷감": {
      생산량: 3,
      시간: 36000,
      재료: {
        "상급 옷감+": 5,
        "최상급 양털": 20,
        "양털": 16
      }
    },
    "최상급 실크": {
      생산량: 3,
      시간: 36000,
      재료: {
        "상급 실크": 4,
        "최상급 거미줄": 30,
        "튼튼 버섯 진액": 16
      }
    }
  },
  "식재료 가공": {
    "마요네즈": {
      생산량: 3,
      시간: 90,
      재료: {
        "달걀": 10,
        "식용유": 2
      }
    },
    "밀가루": {
      생산량: 3,
      시간: 1200,
      재료: {
        "밀": 15
      }
    },
    "치즈": {
      생산량: 3,
      시간: 1200,
      재료: {
        "우유": 6,
        "소금": 1
      }
    },
    "면": {
      생산량: 3,
      시간: 3000,
      재료: {
        "밀가루": 3,
        "달걀": 5,
        "물병": 1
      }
    },
    "생크림": {
      생산량: 3,
      시간: 3000,
      재료: {
        "우유": 12,
        "달걀": 6,
        "설탕": 2
      }
    }
  },
  "약품 가공": {
    "새록 버섯 포자": {
      생산량: 15,
      시간: 600,
      재료: {
        "새록 버섯": 30,
        "종이": 3
      }
    },
    "새록 버섯 진액": {
      생산량: 5,
      시간: 60,
      재료: {
        "새록 버섯 포자": 10,
        "물병": 1
      }
    },
    "튼튼 버섯 가루": {
      생산량: 5,
      시간: 300,
      재료: {
        "튼튼 버섯": 20
      }
    },
    "튼튼 버섯 포자": {
      생산량: 15,
      시간: 600,
      재료: {
        "튼튼 버섯": 30,
        "종이": 3
      }
    },
    "튼튼 버섯 진액": {
      생산량: 5,
      시간: 600,
      재료: {
        "튼튼 버섯 포자": 10,
        "물병": 1
      }
    },
    "쑥쑥 버섯 포자": {
      생산량: 15,
      시간: 720,
      재료: {
        "쑥쑥 버섯": 30,
        "종이": 3
      }
    },
    "쑥쑥 버섯 진액": {
      생산량: 5,
      시간: 3600,
      재료: {
        "쑥쑥 버섯 포자": 10,
        "물병": 1
      }
    },
    "깔끔 버섯 포자": {
      생산량: 15,
      시간: 3000,
      재료: {
        "깔끔 버섯": 30,
        "종이": 3
      }
    },
    "깔끔 버섯 진액": {
      생산량: 5,
      시간: 7200,
      재료: {
        "깔끔 버섯 포자": 10,
        "물병": 1
      }
    },
    "광휘의 결정": {
      생산량: 3,
      시간: 1200,
      재료: {
        "유령 반딧불이": 3,
        "마나 허브": 10,
        "점토": 3
      }
    },
    "불꽃의 결정": {
      생산량: 3,
      시간: 1200,
      재료: {
        "석양나비": 3,
        "마나 허브": 10,
        "점토": 3
      }
    },
    "얼음의 결정": {
      생산량: 3,
      시간: 1200,
      재료: {
        "흰얼음풍뎅이": 3,
        "마나 허브": 10,
        "점토": 3
      }
    },
    "숨숨꽃 가루": {
      생산량: 5,
      시간: 1800,
      재료: {
        "숨숨꽃": 20
      }
    },
    "생채기꽃 가루": {
      생산량: 3,
      시간: 30000,
      재료: {
        "생채기꽃": 20
      }
    }
  }
};
