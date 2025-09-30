export enum EVENT_TYPE {
  EVENT = '이벤트',
  CASH_SHOP = '캐시샵',
  ITEM = '아이템',
  MAINTENANCE = '점검',
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
}
