import { EVENT_TYPE, type GameEvent } from './schemas/event'

export const gameEvents: GameEvent[] = [
  {
    id: 'event-001',
    name: '추석 이벤트',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-09-29T00:00:00'),
    endDate: new Date('2025-10-13T23:59:59'),
    description: '추석 기념 특별 이벤트',
  },
  {
    id: 'cash-001',
    name: '가을 패키지 판매',
    type: EVENT_TYPE.CASH_SHOP,
    startDate: new Date('2025-09-25T10:00:00'),
    endDate: new Date('2025-10-09T23:59:59'),
    description: '가을 시즌 한정 패키지',
  },
  {
    id: 'event-002',
    name: '출석 체크 이벤트',
    type: EVENT_TYPE.EVENT,
    startDate: new Date('2025-10-01T00:00:00'),
    endDate: new Date('2025-10-31T23:59:59'),
    description: '10월 출석 이벤트',
  },
]
