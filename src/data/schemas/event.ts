export enum EVENT_TYPE {
  EVENT = '이벤트',
  CASH_SHOP = '캐시샵',
}

export interface GameEvent {
  id: string
  name: string
  type: EVENT_TYPE
  startDate: Date
  endDate: Date
  description?: string
}
