import { EVENT_TYPE, type GameEvent } from './schemas/event'

// 점검 일정
export const maintenanceEvents: GameEvent[] = [
  {
    id: 'maintenance-009',
    name: '10/23(목) 정기점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-10-23T06:00:00'),
    endDate: new Date('2025-10-23T08:15:00'),
    description: '정기점검',
  },
  {
    id: 'maintenance-010',
    name: '10/17(금) 임시점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-10-17T06:00:00'),
    endDate: new Date('2025-10-17T07:45:00'),
    description: '서버 안정화를 위한 임시 점검',
  },
  {
    id: 'maintenance-008',
    name: '10/16(목) 정기점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-10-16T06:00:00'),
    endDate: new Date('2025-10-16T11:30:00'),
    description: '정기점검',
  },
  {
    id: 'maintenance-001',
    name: '10/1(수) 임시점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-10-01T06:00:00'),
    endDate: new Date('2025-10-01T09:30:00'),
    description: '서버 안정화를 위한 임시 점검',
  },
  {
    id: 'maintenance-002',
    name: '9/30(화) 정기점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-09-30T06:00:00'),
    endDate: new Date('2025-09-30T08:35:00'),
    description: '정기점검',
  },
  {
    id: 'maintenance-003',
    name: '9/28(일) 임시점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-09-28T06:00:00'),
    endDate: new Date('2025-09-28T07:30:00'),
    description: '서버 안정화를 위한 임시 점검',
  },
  {
    id: 'maintenance-004',
    name: '9/27(토) 임시점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-09-27T06:00:00'),
    endDate: new Date('2025-09-27T08:30:00'),
    description: '서버 안정화를 위한 임시 점검',
  },
  {
    id: 'maintenance-005',
    name: '9/26(금) 임시점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-09-26T06:00:00'),
    endDate: new Date('2025-09-26T11:00:00'),
    description: '서버 안정화를 위한 임시 점검',
  },
  {
    id: 'maintenance-006',
    name: '9/25(목) 정기점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-09-25T00:00:00'),
    endDate: new Date('2025-09-25T07:15:00'),
    description: '정기점검',
  },
  {
    id: 'maintenance-007',
    name: '9/22(일) 임시점검',
    type: EVENT_TYPE.MAINTENANCE,
    startDate: new Date('2025-09-22T06:00:00'),
    endDate: new Date('2025-09-22T07:30:00'),
    description: '서버 안정화를 위한 임시 점검',
  },
]

// 게임 이벤트
export const inGameEvents: GameEvent[] = [
  {
    id: 'event-029',
    name: '11월 베스트 스텔라그램',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-11-01T06:00:00'),
    endDate: new Date('2025-12-01T05:59:00'),
    description: '스텔라 픽에 참여하고 베스트 스텔라그램 50인에 선정되어 특별한 선물을 받아보세요'
  },
  {
    id: 'event-030',
    name: '던바튼이 으스스해졌어요!',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-11-13T05:59:00'),
    description: '할로윈을 맞아 던바튼에 나타난 포토존에서 미션을 완료하고 다양한 선물을 획득하세요'
  },
  {
    id: "event-025",
    name: "Trick or 변신! 온타임",
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-30T12:00:00'),
    endDate: new Date('2025-11-02T23:59:00'),
    description: "매일 접속 시 변신 물약 등 다양한 아이템 지급 이벤트"
  },
  {
    id: "event-026",
    name: "괴도와 파수꾼",
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-30T12:00:00'),
    endDate: new Date('2025-11-13T05:59:00'),
    description: "참여형 미니 게임 이벤트, 참여 완료 보상 지급"
  },
  {
    id: "event-027",
    name: "한 번 더! 할로윈 고양이! 발바닥 스탬프!",
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-30T12:00:00'),
    endDate: new Date('2025-11-13T05:59:00'),
    description: "각종 미션 참여로 이벤트 스탬프와 보상 획득"
  },
  {
    id: "event-028",
    name: "할로윈의 한 컷! 스크린샷 콘테스트",
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-30T12:00:00'),
    endDate: new Date('2025-11-12T23:59:00'),
    description: "할로윈 기념 스크린샷 콘테스트, 추첨 보상 지급"
  },
  {
    id: 'event-020',
    name: '암흑술사 클래스 성장 지원',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-11-13T05:59:00'), 
    description: '암흑술사 클래스 성장 지원 이벤트',
  },
  {
    id: 'event-021',
    name: '모험 응원의 7일 출석',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-11-13T05:59:00'),
    description: '모험 응원의 7일 출석 이벤트',
  },
  {
    id: 'event-022', 
    name: '던바튼이 으스스해졌어요!',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-11-13T05:59:00'),
    description: '던바튼이 으스스해졌어요! 이벤트',
  },
  {
    id: 'event-023',
    name: '반가워하는 할로윈 고양이! 발바닥 스탬프!',
    type: EVENT_TYPE.EVENT, 
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-10-30T05:59:00'),
    description: '반가워하는 할로윈 고양이! 발바닥 스탬프! 이벤트',
  },
  {
    id: 'event-024',
    name: 'Trick or 변신! 온타임',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-10-19T23:59:59'),
    description: 'Trick or 변신! 온타임 이벤트',
  },
  {
    id: 'event-001',
    name: 'Google Play 코드퀘스트 기념 페이백',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-30T08:35:00'),
    endDate: new Date('2025-10-02T05:49:00'),
    description: 'Google Play 코드퀘스트 기념 페이백 이벤트',
  },
  {
    id: 'event-002',
    name: '추석 전야제 온타임',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-30T08:35:00'),
    endDate: new Date('2025-10-02T23:59:59'),
    description: '추석 전야제 특별 온타임 이벤트',
  },
  {
    id: 'event-003',
    name: '10월 베스트 스텔라그램',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-01T06:00:00'),
    endDate: new Date('2025-11-01T05:59:00'),
    description: '10월 베스트 스텔라그램 이벤트',
  },
  {
    id: 'event-004',
    name: '팔라딘 업데이트 기념 스크린샷',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-25T08:35:00'),
    endDate: new Date('2025-10-22T23:59:59'),
    description: '팔라딘 업데이트 기념 스크린샷 이벤트',
  },
  {
    id: 'event-005',
    name: '팔라딘 업데이트 기념 이벤트 모아보기',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-25T08:35:00'),
    endDate: new Date('2025-11-27T05:59:00'),
    description: '팔라딘 업데이트 기념 다양한 이벤트 모음',
  },
  {
    id: 'event-006',
    name: '팔라딘 업데이트 기념 롤롤 쿠폰',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-25T08:35:00'),
    endDate: new Date('2025-11-26T23:59:59'),
    description: '팔라딘 업데이트 기념 롤롤 쿠폰 이벤트',
  },
  {
    id: 'event-007',
    name: '모험가 길드의 특별 선물',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-25T08:35:00'),
    endDate: new Date('2025-11-26T23:59:59'),
    description: '돌아온 모험가를 위한 특별 선물 이벤트',
  },
  {
    id: 'event-008',
    name: '에린 버닝 챌린지',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-25T08:35:00'),
    endDate: new Date('2025-11-27T05:59:00'),
    description: '에린 버닝 챌린지 이벤트',
  },
  {
    id: 'event-009',
    name: '에린 버닝 챌린지 MAX',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-25T08:35:00'),
    endDate: new Date('2025-11-27T05:59:00'),
    description: '에린 버닝 챌린지 MAX 이벤트',
  },
  {
    id: 'event-010',
    name: '14일간의 출석',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-25T08:35:00'),
    endDate: new Date('2025-10-15T05:59:00'),
    description: '14일간 출석 체크 이벤트',
  },
  {
    id: 'event-011',
    name: '알쏭달쏭 보름달 상자',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-02T05:50:00'),
    endDate: new Date('2025-10-15T23:59:59'),
    description: '추석 기념 보름달 상자 이벤트',
  },
  {
    id: 'event-012',
    name: '추석맞이 매일매일 출석',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-02T05:50:00'),
    endDate: new Date('2025-10-15T23:59:59'),
    description: '추석 기간 출석 이벤트',
  },
  {
    id: 'event-013',
    name: '추석맞이 집중 플레이',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-02T05:50:00'),
    endDate: new Date('2025-10-15T23:59:59'),
    description: '추석 기간 집중 플레이 이벤트',
  },
  {
    id: 'event-014',
    name: '추석에는 달토끼 모자!',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-02T05:50:00'),
    endDate: new Date('2025-10-15T23:59:59'),
    description: '달토끼 모자 획득 이벤트',
  },
  {
    id: 'event-015',
    name: '뮤리엘의 특별한 선물',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-02T05:50:00'),
    endDate: new Date('2025-10-15T23:59:59'),
    description: '뮤리엘의 특별 선물 이벤트',
  },
  {
    id: 'event-016',
    name: '만들고, 모으고, 꾸미고!',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-02T05:50:00'),
    endDate: new Date('2025-10-15T23:59:59'),
    description: '제작 및 수집 이벤트',
  },
  {
    id: 'event-017',
    name: '개천절 온타임',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-03T00:00:00'),
    endDate: new Date('2025-10-03T23:59:59'),
    description: '개천절 특별 온타임 이벤트',
  },
  {
    id: 'event-018',
    name: '행복 가득 한가위 잔칫상',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-04T20:00:00'),
    endDate: new Date('2025-10-04T23:59:59'),
    description: '한가위 특별 잔칫상 이벤트',
  },
  {
    id: 'event-019',
    name: '한글날 기념 맞춤 접속 선물',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-09T00:00:00'),
    endDate: new Date('2025-10-09T23:59:59'),
    description: '한글날 기념 특별 선물',
  },
]

// 캐시샵 일정
export const cashShopEvents: GameEvent[] = [
  {
    id: 'cash-shop-007',
    name: '할로윈 스페셜 패키지 & 헤어 패키지 판매',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-10-30T00:00:00+09:00'),
    endDate: new Date('2025-11-27T05:59:00+09:00'),
    description: '할로윈 기념 특별 패키지 및 신규 헤어 패키지 판매',
    saleLocation: '[게임 내 메뉴] → [캐시샵] → [패키지]',
    packages: [
      {
        name: '레이어드 믹스 숏헤어 패키지(남성용)',
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '헤어 쿠폰: 레이어드 믹스 숏헤어', quantity: '1개' },
          { name: '프리미엄 패션 티켓', quantity: '20개' },
          { name: '환생석', quantity: '1개' },
          { name: '염색약', quantity: '5개' },
        ],
      },
      {
        name: '트윈번 믹스 헤어 패키지(여성용)',
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '헤어 쿠폰: 트윈번 믹스 헤어', quantity: '1개' },
          { name: '프리미엄 패션 티켓', quantity: '20개' },
          { name: '환생석', quantity: '1개' },
          { name: '염색약', quantity: '5개' },
        ],
      },
      {
        name: '할로윈 스페셜 패키지 1',
        price: '1,900 M캐시',
        cashPoint: '190',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '작은 은동전 상자', quantity: '5개' },
          { name: '작은 마족 공물 상자', quantity: '2개' },
          { name: '에픽 연금술 재연소 촉매', quantity: '1개' },
          { name: '엘리트 연금술 재연소 촉매', quantity: '5개' },
          { name: '미가공 골드 원석', quantity: '20개' },
        ],
      },
      {
        name: '할로윈 스페셜 패키지 2',
        price: '3,300 M캐시',
        cashPoint: '330',
        purchaseLimit: '캐릭터당 주 3회',
        items: [
          { name: '룬의 파편', quantity: '1,000개' },
          { name: '강화 재연소 촉매', quantity: '5개' },
          { name: '미가공 골드 원석', quantity: '40개' },
        ],
      },
      {
        name: '할로윈 맞이 까만 아기 올빼미 패키지',
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '까만 아기 올빼미(엘리트)', quantity: '1개' },
          { name: '프리미엄 펫 티켓', quantity: '20개' },
          { name: '펫 티켓', quantity: '20개' },
          { name: '미가공 골드 원석', quantity: '30개' },
        ],
      },
      {
        name: '할로윈 깜짝 패키지 1',
        price: '3,000 데카',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '룬의 파편', quantity: '200개' },
          { name: '작은 마족 공물 상자', quantity: '1개' },
          { name: '염색약', quantity: '10개' },
          { name: '스푸키 스티치 로브', quantity: '1개' },
        ],
      },
      {
        name: '할로윈 깜짝 패키지 2',
        price: '2,000 데카',
        purchaseLimit: '캐릭터당 주 3회',
        items: [
          { name: '룬의 파편', quantity: '200개' },
          { name: '강화 재연소 촉매', quantity: '2개' },
          { name: '작은 마족 공물 상자', quantity: '1개' },
        ],
      },
      {
        name: '달리자! 데카 연속 패키지 1단계',
        price: '100 데카',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '염색약', quantity: '1개' },
          { name: '미가공 골드 원석', quantity: '10개' },
        ],
      },
      {
        name: '달리자! 데카 연속 패키지 2단계',
        price: '1,000 데카',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '룬의 파편', quantity: '200개' },
          { name: '미가공 골드 원석', quantity: '20개' },
          { name: '강화 재연소 촉매', quantity: '1개' },
        ],
      },
      {
        name: '달리자! 데카 연속 패키지 3단계',
        price: '1,500 데카',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '패션 티켓', quantity: '20개' },
          { name: '염색약', quantity: '5개' },
        ],
      },
      {
        name: '달리자! 데카 연속 패키지 4단계',
        price: '2,000 데카',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '에픽 연금술 재연소 촉매', quantity: '1개' },
          { name: '엘리트 연금술 재연소 촉매', quantity: '2개' },
          { name: '미가공 골드 원석', quantity: '20개' },
        ],
      },
      {
        name: '달리자! 데카 연속 패키지 5단계',
        price: '500 데카',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '환생석', quantity: '1개' },
        ],
      },
    ],
  },
  // 공지 3201519: 신규 아이템샵 상품
  {
    id: 'cash-shop-008',
    name: '신규 아이템샵 상품 판매',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-10-30T00:00:00+09:00'),
    endDate: new Date('2025-11-27T05:59:00+09:00'),
    description: '크로스 서버 채널 생성기, 천공의 신성한 뿔피리, 액션, 염색약, 악기 선택 상자 판매',
    saleLocation: '[게임 내 메뉴] → [캐시샵] → [아이템샵]',
    packages: [
      {
        name: '가벼운 스텝 액션',
        price: '2,000 데카',
        purchaseLimit: '서버당 1회',
        items: [
          { name: '행동: 트위스트댄스', quantity: '1개' },
          { name: '행동: 브이스텝댄스', quantity: '1개' },
          { name: '행동: 투스텝댄스', quantity: '1개' },
        ],
      },
      {
        name: '염색약 선택 상자: 버건디',
        price: '500 캐시샵 포인트',
        purchaseLimit: '서버당 월 10회',
        items: [
          { name: '지정 염색약 (5종 색상 중 1종 선택)', quantity: '1개' },
        ],
      },
      {
        name: '염색약 선택 상자: 딥블루',
        price: '500 캐시샵 포인트',
        purchaseLimit: '서버당 월 10회',
        items: [
          { name: '지정 염색약 (5종 색상 중 1종 선택)', quantity: '1개' },
        ],
      },
      {
        name: '무도회 악기 선택 상자',
        price: '2,000 캐시샵 포인트',
        purchaseLimit: '구매 제한 없음',
        items: [
          { name: '에테르노 도미넌스 큰북', quantity: '1개 (선택)' },
          { name: '세라픽 레조넌스 큰북', quantity: '1개 (선택)' },
          { name: '로얄 글로리아 큰북', quantity: '1개 (선택)' },
          { name: '에테르노 도미넌스 피아노', quantity: '1개 (선택)' },
          { name: '세라픽 레조넌스 피아노', quantity: '1개 (선택)' },
          { name: '로얄 글로리아 피아노', quantity: '1개 (선택)' },
          { name: '2 화음 에테르노 도미넌스 피아노', quantity: '1개 (선택)' },
          { name: '2 화음 세라픽 레조넌스 피아노', quantity: '1개 (선택)' },
          { name: '2 화음 로얄 글로리아 피아노', quantity: '1개 (선택)' },
          { name: '3 화음 에테르노 도미넌스 피아노', quantity: '1개 (선택)' },
          { name: '3 화음 세라픽 레조넌스 피아노', quantity: '1개 (선택)' },
          { name: '3 화음 로얄 글로리아 피아노', quantity: '1개 (선택)' },
        ],
      },
    ],
  },
  {
    id: "elegant_muse_set",
    name: "[translate:은은한 끌림: 엘레강트 뮤즈 세트]",
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date("2025-10-30T00:00:00+09:00"),
    endDate: new Date("2025-11-27T05:59:00+09:00"),
    description: "판매 기간 : 2025년 10월 30일(목) 점검 후 ~ 2025년 11월 27일(목) 05:59까지"
  },
  {
    id: "timeless_minuet_set",
    name: "[translate:연회의 주인: 타임리스 미뉴엣 세트]",
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date("2025-10-30T00:00:00+09:00"),
    endDate: new Date("2025-11-27T05:59:00+09:00"),
    description: "판매 기간 : 2025년 10월 30일(목) 점검 후 ~ 2025년 11월 27일(목) 05:59까지"
  },
  {
    id: 'cash-shop-006',
    name: '펫 럭키박스 : 햄스터',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-10-23T08:15:00'),
    endDate: new Date('2025-12-18T05:59:00'),
    description: '펫 럭키박스 : 햄스터 판매',
    saleLocation: '[게임 내 메뉴] → [캐시샵] → [럭키박스]',
    packages: [
      {
        name: '펫 럭키박스 : 햄스터',
        price: '2,900 M캐시',
        cashPoint: '290',
        purchaseLimit: '무제한',
        items: []
      }
    ]
  },
  {
    id: 'cash-shop-005',
    name: '[암흑술사: 클래스 레벨] 미션 패키지',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-12-18T05:59:00'),
    description: '암흑술사 클래스 레벨업 미션 패키지 판매',
    saleLocation: '[게임 내 메뉴] → [캐시샵] → [패키지] → [클래스]',
    packages: [
      {
        name: '[암흑술사: 클래스 레벨] 미션 패키지 1',
        price: '3,900 M캐시',
        cashPoint: '390',
        purchaseLimit: '캐릭터당 1회',
        items: []
      },
      {
        name: '[암흑술사: 클래스 레벨] 미션 패키지 2', 
        price: '3,900 M캐시',
        cashPoint: '390',
        purchaseLimit: '캐릭터당 1회',
        items: []
      }
    ]
  },
  {
    id: 'cash-shop-004',
    name: '가을날 성장! 특별 지원 / 인챈트 증폭 패키지 & 급속 성장! 연속 패키지',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-10-16T08:35:00'),
    endDate: new Date('2025-10-30T05:59:00'),
    description: '가을 시즌 특별 성장 지원 패키지 판매',
    saleLocation: '[게임 내 메뉴] → [캐시샵] → [패키지] → [스페셜]',
    packages: [
      {
        name: '가을날 성장! 특별 지원 패키지',
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '캐릭터당 1회',
        items: []
      },
      {
        name: '가을날 인챈트 증폭 패키지',
        price: '3,900 M캐시',
        cashPoint: '390',
        purchaseLimit: '캐릭터당 1회',
        items: []
      },
      {
        name: '급속 성장! 연속 패키지',
        price: '5,900 M캐시',
        cashPoint: '590',
        purchaseLimit: '캐릭터당 1회',
        items: []
      }
    ]
  },
  {
    id: 'cash-shop-002',
    name: '[암흑술사: 클래스 레벨] 미션 패키지',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-10-16T11:30:00'),
    endDate: new Date('2025-12-18T06:00:00'),
    description: '암흑술사 클래스 레벨 달성 기념 미션 패키지 판매',
    saleLocation: '[게임 내 메뉴] → [캐시샵] → [패키지] → [클래스]',
    packages: [
      {
        name: '[암흑술사: 클래스 레벨] 미션 패키지 1',
        price: '3,300 M캐시',
        cashPoint: '330',
        purchaseLimit: '캐릭터당 1회',
        items: [
        ],
      },
      {
        name: '[암흑술사: 클래스 레벨] 미션 패키지 2', 
        price: '5,500 M캐시',
        cashPoint: '550',
        purchaseLimit: '캐릭터당 1회',
        items: [
        ],
      }
    ]
  },
  {
    id: 'cash-shop-001',
    name: '한가위 스페셜 패키지 판매',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-09-30T08:35:00'),
    endDate: new Date('2025-10-23T05:59:00'),
    description: '한가위 기념 다양한 패키지 판매',
    saleLocation: '[게임 내 메뉴] → [캐시샵] → [패키지] → [스페셜]',
    notes: [
      '공용 보관함 이용 불가',
      '월간 패키지의 구매 횟수는 매월 1일 오전 6시에 초기화',
      '작은 은동전 상자 1개 사용 시 은동전 10개 획득 (상자 사용 기간: 수령 후 30일)',
      '작은 마족 공물 상자는 55레벨 이후부터 사용 가능, 상자 1개 사용 시 마족 공물 1개 획득 (상자 사용 기간: 수령 후 30일)',
    ],
    packages: [
      {
        name: '한가위 인챈트 증폭 패키지 1',
        items: [
          { name: '증폭의 파편', quantity: '1,000개' },
          { name: '증폭 제거 물약', quantity: '4개' },
        ],
        price: '2,900 M캐시',
        cashPoint: '290',
        purchaseLimit: '캐릭터당 월 3회',
      },
      {
        name: '한가위 인챈트 증폭 패키지 2',
        items: [
          { name: '증폭의 파편', quantity: '1,600개' },
          { name: '증폭 제거 물약', quantity: '8개' },
        ],
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '캐릭터당 월 8회',
      },
      {
        name: '한가위 성장 특별 패키지 1',
        items: [
          { name: '작은 마족 공물 상자', quantity: '3개' },
          { name: '작은 은동전 상자', quantity: '5개' },
          { name: '미가공 골드 원석', quantity: '8개' },
          { name: '에픽 연금술 재연소 촉매', quantity: '1개' },
        ],
        price: '2,900 M캐시',
        cashPoint: '290',
        purchaseLimit: '캐릭터당 월 3회',
      },
      {
        name: '한가위 성장 특별 패키지 2',
        items: [
          { name: '작은 마족 공물 상자', quantity: '6개' },
          { name: '작은 은동전 상자', quantity: '10개' },
          { name: '미가공 골드 원석', quantity: '10개' },
        ],
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '캐릭터당 월 8회',
      },
      {
        name: '한가위 각인 강화 지원 패키지',
        items: [
          { name: '미가공 골드 원석', quantity: '100개' },
          { name: '룬의 파편', quantity: '3,000개' },
          { name: '강화 재연소 촉매', quantity: '30개' },
        ],
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '캐릭터당 월 8회',
      },
      {
        name: '성장! 보름달의 축복 패키지',
        items: [
          { name: '작은 마족 공물 상자', quantity: '3개' },
          { name: '작은 은동전 상자', quantity: '5개' },
          { name: '에픽 연금술 재연소 촉매', quantity: '2개' },
          { name: '강화 재연소 촉매', quantity: '5개' },
          { name: '프리미엄 패션 티켓', quantity: '15개' },
          { name: '프리미엄 펫 티켓', quantity: '15개' },
          { name: '미가공 골드 원석', quantity: '50개' },
        ],
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '캐릭터당 월 1회',
      },
      {
        name: '성장! 달빛의 응원 패키지',
        items: [
          { name: '룬의 파편', quantity: '300개' },
          { name: '강화 재연소 촉매', quantity: '2개' },
          { name: '미가공 골드 원석', quantity: '10개' },
        ],
        price: '2,000 데카',
        purchaseLimit: '캐릭터당 3회',
      },
      {
        name: '성장! 풍요의 계절 패키지',
        items: [
          { name: '작은 마족 공물 상자', quantity: '1개' },
          { name: '작은 은동전 상자', quantity: '3개' },
          { name: '에픽 연금술 재연소 촉매', quantity: '1개' },
        ],
        price: '3,000 데카',
        purchaseLimit: '캐릭터당 3회',
      },
      {
        name: '추석맞이 패션 티켓 패키지',
        items: [
          { name: '프리미엄 패션 티켓', quantity: '30개' },
          { name: '전설 재봉가위', quantity: '2개' },
          { name: '마법 실타래', quantity: '5개' },
        ],
        price: '3,300 M캐시',
        cashPoint: '330',
        purchaseLimit: '캐릭터당 5회',
      },
      {
        name: '한가위 두둥실 펫 패키지',
        items: [
          { name: '달맞이 토끼(엘리트)', quantity: '1개' },
          { name: '미가공 골드 원석', quantity: '30개' },
          { name: '프리미엄 펫 티켓', quantity: '20개' },
          { name: '펫 티켓', quantity: '20개' },
        ],
        price: '4,900 M캐시',
        cashPoint: '490',
        purchaseLimit: '캐릭터당 1회',
      },
      {
        name: '투박한 보석 선택 상자',
        items: [
          { name: '투박한 루비', quantity: '1개 (선택)' },
          { name: '투박한 토파즈', quantity: '1개 (선택)' },
          { name: '투박한 사파이어', quantity: '1개 (선택)' },
          { name: '투박한 자수정', quantity: '1개 (선택)' },
          { name: '투박한 에메랄드', quantity: '1개 (선택)' },
          { name: '투박한 다이아몬드', quantity: '1개 (선택)' },
          { name: '투박한 흑요석', quantity: '1개 (선택)' },
        ],
        price: '200 데카',
        purchaseLimit: '캐릭터당 15회',
      },
    ],
  },
]

// 전체 이벤트 (통합)
export const gameEvents: GameEvent[] = [
  ...maintenanceEvents,
  ...inGameEvents,
  ...cashShopEvents,
]
