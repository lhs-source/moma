export enum EVENT_TYPE {
  EVENT = '이벤트',
  CASH_SHOP = '캐시샵',
  ITEM = '아이템',
  MAINTENANCE = '점검',
}

export interface PackageItem {
  name: string // 구성품 이름
  quantity: string // 수량
}

export interface ShopPackage {
  name: string // 상품명
  items: PackageItem[] // 구성품 목록
  price: string // 가격
  cashPoint?: string // 캐시샵 포인트
  purchaseLimit: string // 구매 제한
}

export interface GameEvent {
  id: string
  name: string
  type: EVENT_TYPE
  startDate: Date
  endDate: Date
  description?: string
  isRecurringWeekly?: boolean // 주간 반복 (매주 목요일)
  isRecurringMonthly?: boolean // 월간 반복 (매월 마지막 날)
  packages?: ShopPackage[] // 캐시샵 패키지 목록
  saleLocation?: string // 판매 위치
  notes?: string[] // 참고사항
}
