import type { PurchaseData } from './schemas/purchase'

export const purchaseData: PurchaseData = {
  npcs: [
    {
      npcId: 'kaitin',
      locationName: '티르코네일',
      items: [
        { itemId: 'meat', price: 250, isCollectible: false },
        { itemId: 'salt', price: 1000, isCollectible: false },
        { itemId: 'sugar', price: 1200, isCollectible: false },
        { itemId: 'apple', price: 800, isCollectible: true },
        { itemId: 'cabbage', price: 800, isCollectible: false },
        { itemId: 'cooking_oil', price: 1200, isCollectible: false }
      ]
    },
    {
      npcId: 'glenis',
      locationName: '던바튼',
      items: [
        { itemId: 'meat', price: 250, isCollectible: false },
        { itemId: 'salt', price: 1000, isCollectible: false },
        { itemId: 'sugar', price: 1200, isCollectible: false },
        { itemId: 'cabbage', price: 800, isCollectible: false },
        { itemId: 'cooking_oil', price: 1200, isCollectible: false },
        { itemId: 'apple', price: 800, isCollectible: true },
        { itemId: 'garlic', price: 1200, isCollectible: false },
        { itemId: 'pepper', price: 2000, isCollectible: false },
        { itemId: 'lemon', price: 3000, isCollectible: false },
        { itemId: 'tomato', price: 6800, isCollectible: false },
        { itemId: 'asparagus', price: 10000, isCollectible: false },
        { itemId: 'pea', price: 10000, isCollectible: false }
      ]
    },
    {
      npcId: 'conner',
      locationName: '콜헨',
      items: [
        { itemId: 'meat', price: 250, isCollectible: false },
        { itemId: 'clam', price: 600, isCollectible: true },
        { itemId: 'ice', price: 600, isCollectible: true },
        { itemId: 'strawberry', price: 1200, isCollectible: false },
        { itemId: 'pepper', price: 2000, isCollectible: false },
        { itemId: 'tomato', price: 6800, isCollectible: false },
        { itemId: 'asparagus', price: 10000, isCollectible: false },
        { itemId: 'pea', price: 10000, isCollectible: false }
      ]
    }
  ]
}
