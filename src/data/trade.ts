import type { NPC } from './schemas/npc'
import type { Item } from './schemas/item'
import type { Trade } from './schemas/trade'

export const npcs: NPC[] = [
  {
    id: 'npc_1',
    name: 'NPC 이름',
    location: '지역명',
    description: 'NPC 설명',
    imageUrl: '/images/npcs/npc_1.png'
  }
  // ... 추가 NPC 데이터
]

export const items: Item[] = [
  {
    id: 'item_1',
    name: '아이템 이름',
    imageUrl: '/images/items/item_1.png',
    description: '아이템 설명',
    isCraftable: true,
    craftingRecipe: [
      { itemId: 'material_1', quantity: 2 },
      { itemId: 'material_2', quantity: 1 }
    ],
    category: '재료'
  }
  // ... 추가 아이템 데이터
]

export const trades: Trade[] = [
  {
    id: 'trade_1',
    npcId: 'npc_1',
    giveItemId: 'item_1',
    receiveItemId: 'item_2',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  }
  // ... 추가 교환 데이터
]

interface TradeData {
  npc: string
  item: string
  required: string
  limit: string
}

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

export const barterData: LocationTrades = {
  '티르코네일': [
    {
      npc: '노라',
      item: '여행자 간식 x1',
      required: '말콤의 푹신한 양털 베개 x1',
      limit: '일 3회'
    },
    // ... 나머지 데이터는 동일하게 유지
  ],
  // ... 나머지 지역 데이터는 동일하게 유지
} 