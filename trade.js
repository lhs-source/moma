
// NPC 위치 정보
const npcLocations = {
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
};

// 추천 교환 데이터
const recommendedExchanges = {
    '퍼거스': [{
        from: '강철괴',
        to: '합금강괴'
    }],
    '라사': [{
        from: '사과주스',
        to: '고급 룬합성 촉매'
    }, {
        from: '연금술 부스러기',
        to: '고급 룬합성 촉매'
    }, {
        from: '고급 룬합성 촉매',
        to: '레어 룬합성 초개'
    }],
    '알리사': [{
        from: '달걀',
        to: '연금술 부스러기'
    }, {
        from: '달걀',
        to: '밀가루'
    }, {
        from: '라벤더 꽃',
        to: '연금술 부스러기'
    }, {
        from: '라벤더 꽃',
        to: '밀가루'
    }],
    '엘빈': [{
        from: '야채볶음',
        to: '상급목재'
    }],
    '트레이시': [{
        from: '통나무',
        to: '생가죽'
    }, {
        from: '통나무',
        to: '상급 생가죽'
    }, {
        from: '상급 통나무',
        to: '나무 진액'
    }],
    '네리스': [{
        from: '동광석',
        to: '상급 생가죽'
    }, {
        from: '합금강괴',
        to: '특수강괴'
    }],
    '글리니스': [{
        from: '생크림',
        to: '애플 밀크티'
    }],
    '아란웬': [{
        from: '감자 샐러드',
        to: '궁극기 비약'
    }],
    '제이미': [{
        from: '사과 수플레',
        to: '상급 옷감'
    }],
    '칼릭스': [{
        from: '애플 밀크티',
        to: '상급 목재'
    }]
};

// 물물교환 데이터
const barterData = {
    '티르코네일': [{
        npc: '노라',
        item: '여행자 간식 x1',
        required: '말콤의 푹신한 양털 베개 x1',
        limit: '일 3회'
    }, {
        npc: '데이안',
        item: '상급 양털 x4',
        required: '펫 먹이 x1',
        limit: '일 10회'
    }, {
        npc: '딜리스',
        item: '네잎클로버 x1',
        required: '쑥쑥 버섯 x3',
        limit: '일 1회'
    }, {
        npc: '라사',
        item: '고급 연금술 재연소 촉매 x1',
        required: '사과 주스 x1',
        limit: '일 1회'
    }, {
        npc: '라사',
        item: '고급 연금술 재연소 촉매 x1',
        required: '연금술 부스러기 x3',
        limit: ''
    }, {
        npc: '라사',
        item: '레어 연금술 재연소 촉매 x1',
        required: '고급 연금술 재연소 촉매 x15',
        limit: ''
    }, {
        npc: '레이널드',
        item: '치명타 비약 x1',
        required: '마요네즈 고기볶음 x2',
        limit: '일 1회'
    }, {
        npc: '말콤',
        item: '빈 악보 x1',
        required: '양털 x50',
        limit: '일 1회'
    }, {
        npc: '말콤',
        item: '말콤의 푹신한 양털 베개 x1',
        required: '거미줄 x5',
        limit: '일 1회'
    }, {
        npc: '말콤',
        item: '다목적 제작대 설계도 (3레벨) x1',
        required: '전문 캠프파이어 키트 x1',
        limit: '일 1회'
    }, {
        npc: '메이븐',
        item: '성수 x1',
        required: '케이틴 특제 통밀빵 x1',
        limit: '계정당 1회'
    }, {
        npc: '알리사',
        item: '연금술 부스러기 x1',
        required: '달걀 x10',
        limit: '일 1회'
    }, {
        npc: '알리사',
        item: '연금술 부스러기 x1',
        required: '라벤더 꽃 x1',
        limit: '일 1회'
    }, {
        npc: '알리사',
        item: '밀가루 x1',
        required: '달걀 x3',
        limit: '일 1회'
    }, {
        npc: '알리사',
        item: '밀가루 x1',
        required: '라벤더 꽃 x1',
        limit: '일 1회'
    }, {
        npc: '엔델리온',
        item: '성수 x10',
        required: '케이틴 특제 통밀빵 x10',
        limit: '계정당 1회'
    }, {
        npc: '케이틴',
        item: '케이틴 특제 통밀빵 x3',
        required: '우유 x10',
        limit: '일 1회'
    }, {
        npc: '케이틴',
        item: '식재료 가공 시설 설계도 (3레벨) x1',
        required: '밀가루 x10',
        limit: '일 1회'
    }, {
        npc: '퍼거스',
        item: '철 광석 x1',
        required: '분해된 장비 부품 x1',
        limit: '일 10회'
    }, {
        npc: '퍼거스',
        item: '석탄 x3',
        required: '분해된 장비 부품 x1',
        limit: '일 10회'
    }, {
        npc: '퍼거스',
        item: '합금강괴 x1',
        required: '강철괴 x2',
        limit: '일 4회'
    }],
    '두갈드아일': [{
        npc: '엘빈',
        item: '타닌 가루 x5',
        required: '생가죽 x5',
        limit: '일 10회'
    }, {
        npc: '엘빈',
        item: '상급 통나무 x1',
        required: '상급 가죽 x1',
        limit: '일 10회'
    }, {
        npc: '엘빈',
        item: '상급 목재 x4',
        required: '야채 볶음 x1',
        limit: '일 2회'
    }, {
        npc: '엘빈',
        item: '가죽 가공 시설 설계도 (3레벨) x1',
        required: '옷감+ x5',
        limit: '일 1회'
    }, {
        npc: '트레이시',
        item: '생가죽 x1',
        required: '통나무 x1',
        limit: '일 10회'
    }, {
        npc: '트레이시',
        item: '상급 생가죽 x1',
        required: '통나무 x10',
        limit: '일 10회'
    }, {
        npc: '트레이시',
        item: '나무 진액 x4',
        required: '상급 통나무 x1',
        limit: '일 5회'
    }, {
        npc: '트레이시',
        item: '트레이시의 원목 오르골 x1',
        required: '조개찜 x2',
        limit: '일 1회'
    }, {
        npc: '트레이시',
        item: '목재 가공 시설 설계도 (3레벨) x1',
        required: '애벌레 x5',
        limit: '일 1회'
    }],
    '던바튼': [{
        npc: '글리니스',
        item: '글리니스 수제 케이크 x1',
        required: '포크 인 밀크 x1',
        limit: '일 1회'
    }, {
        npc: '글리니스',
        item: '글리니스의 애플 밀크티 x1',
        required: '생크림 x4',
        limit: '일 1회'
    }, {
        npc: '글리니스',
        item: '음식 제작대 설계도 (3레벨) x1',
        required: '사과 수플레 x1',
        limit: '일 1회'
    }, {
        npc: '네리스',
        item: '상급 생가죽 x1',
        required: '동 광석 x1',
        limit: '일 10회'
    }, {
        npc: '네리스',
        item: '특수강괴 x1',
        required: '합금강괴 x2',
        limit: '일 4회'
    }, {
        npc: '마누스',
        item: '생명의 마나석 x1',
        required: '펫 먹이 x10',
        limit: '일 2회'
    }, {
        npc: '발터',
        item: '상급 목재 x16',
        required: '트레이시의 원목 오르골 x1',
        limit: '일 2회'
    }, {
        npc: '발터',
        item: '하트 토큰 x1',
        required: '참사랑어 x5',
        limit: '일 2회'
    }, {
        npc: '발터',
        item: '화염 마법 유탄 x1',
        required: '어둠 유령 고기 x5',
        limit: '일 3회'
    }, {
        npc: '발터',
        item: '번개 마법 유탄 x1',
        required: '어둠 유령 고기 x5',
        limit: '일 3회'
    }, {
        npc: '발터',
        item: '바람 마법 유탄 x1',
        required: '어둠 유령 고기 x5',
        limit: '일 3회'
    }, {
        npc: '발터',
        item: '산성 마법 유탄 x1',
        required: '어둠 유령 고기 x5',
        limit: '일 3회'
    }, {
        npc: '스튜어트',
        item: '불꽃의 결정 x1',
        required: '연금술 부스러기 x1',
        limit: '일 5회'
    }, {
        npc: '스튜어트',
        item: '얼음의 결정 x1',
        required: '연금술 부스러기 x1',
        limit: '일 5회'
    }, {
        npc: '스튜어트',
        item: '전기의 결정 x1',
        required: '연금술 부스러기 x1',
        limit: '일 5회'
    }, {
        npc: '스튜어트',
        item: '광휘의 결정 x1',
        required: '연금술 부스러기 x1',
        limit: '일 5회'
    }, {
        npc: '스튜어트',
        item: '봉인의 결정 x1',
        required: '연금술 부스러기 x1',
        limit: '일 5회'
    }, {
        npc: '시몬',
        item: '염색약 베이스 x3',
        required: '상급 실크 x10',
        limit: '일 1회'
    }, {
        npc: '시몬',
        item: '옷감 가공 시설 설계도 (3레벨) x1',
        required: '유령 반딧불이 x2',
        limit: '일 1회'
    }, {
        npc: '시몬',
        item: '방어구 제작대 설계도 (3레벨) x1',
        required: '세공된 페리도트S x1',
        limit: '일 1회'
    }, {
        npc: '아란웬',
        item: '궁극기 비약 x1',
        required: '감자 샐러드 x2',
        limit: '일 1회'
    }, {
        npc: '아란웬',
        item: '정령의 흔적 x20',
        required: '클래스 마스터 메달 x1',
        limit: ''
    }, {
        npc: '아이라',
        item: '종이 x10',
        required: '주인 없는 소설책 x1',
        limit: '일 1회'
    }, {
        npc: '제롬',
        item: '실크 x4',
        required: '리코타 치즈 샐러드 x1',
        limit: '일 2회'
    }, {
        npc: '제롬',
        item: '상급 실크 x4',
        required: '크림소스 스테이크 x1',
        limit: '일 1회'
    }, {
        npc: '제이미',
        item: '상급 옷감 x4',
        required: '사과 수플레 x1',
        limit: '일 2회'
    }, {
        npc: '제이미',
        item: '상급 옷감+ x4',
        required: '사과 생크림 케이크 x1',
        limit: '일 1회'
    }, {
        npc: '칼릭스',
        item: '상급 목재+ x12',
        required: '글리니스의 애플 밀크티 x3',
        limit: '일 2회'
    }, {
        npc: '플로라',
        item: '주인 없는 소설책 x1',
        required: '글리니스 수제 케이크 x2',
        limit: '일 1회'
    }],
    '얼음 협곡': [{
        npc: '카린',
        item: '펫 먹이 x10',
        required: '감자수프 x3',
        limit: '일 1회'
    }],
    '콜헨': [{
        npc: '아르미스',
        item: '분해된 장비 부품 x1',
        required: '특수강괴 x1',
        limit: '일 3회'
    }, {
        npc: '아르미스',
        item: '동광석 x10',
        required: '백동 광석 x1',
        limit: '일 1회'
    }, {
        npc: '아르미스',
        item: '금속 가공 시설 설계도 (3레벨) x1',
        required: '석탄 x20',
        limit: '일 1회'
    }, {
        npc: '아르미스',
        item: '무기 제작대 설계도 (3레벨) x1',
        required: '내열 붕대 x5',
        limit: '일 1회'
    }, {
        npc: '케아라',
        item: '협곡의 마나석 x1',
        required: '상급 생가죽+ x10',
        limit: '일 3회'
    }, {
        npc: '케아라',
        item: '폐허의 마나석 x1',
        required: '상급 생가죽+ x10',
        limit: '일 3회'
    }, {
        npc: '케아라',
        item: '상급 치명타 비약 x1',
        required: '얼음 딸기주스 x2',
        limit: '일 1회'
    }, {
        npc: '코너',
        item: '네잎클로버 x1',
        required: '건강 드링크 x1',
        limit: '일 3회'
    }, {
        npc: '코너',
        item: '폐허의 마나석 x1',
        required: '초롱아귀 x5',
        limit: '일 3회'
    }, {
        npc: '킬리언',
        item: '건강 드링크 x1',
        required: '깔끔 버섯 포자 x5',
        limit: '일 5회'
    }, {
        npc: '킬리언',
        item: '네잎클로버 x2',
        required: '알리오 올리오 x1',
        limit: '일 1회'
    }, {
        npc: '킬리언',
        item: '약품 가공 시설 설계도 (3레벨) x1',
        required: '독주머니 x3',
        limit: '일 1회'
    }, {
        npc: '킬리언',
        item: '약품 제작대 설계도 (3레벨) x1',
        required: '석양나비 x2',
        limit: '일 1회'
    }]
};