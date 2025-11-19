import type { TradeType } from '../../../src/data/schemas/trade'
import { getItemById, getNpcById } from '../../lib/dataAccess'
import type { TradeListItem } from '../../lib/tradeCalculations'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { useTradeStore } from '../../stores/tradeStore'

const limitTextMap: Record<TradeType, (count: number) => string> = {
  daily: (count) => `일 ${count}회`,
  weekly: (count) => `주 ${count}회`,
  account: () => '계정당 1회',
  unlimited: () => '제한 없음',
  none: () => '제한 없음',
}

function getLimitText(limitType: TradeType, limitCount: number) {
  const formatter = limitTextMap[limitType]
  return formatter ? formatter(limitCount) : '제한 없음'
}

export function TradeItem({ trade }: { trade: TradeListItem }) {
  const disabledTrades = useTradeStore((state) => state.disabledTrades)
  const favoriteTrades = useTradeStore((state) => state.favoriteTrades)
  const toggleTrade = useTradeStore((state) => state.toggleTrade)
  const toggleFavorite = useTradeStore((state) => state.toggleFavorite)

  const item = getItemById(trade.itemId)
  const requiredItem = getItemById(trade.requiredItemId)
  const npc = getNpcById(trade.npcId)

  const isDisabled = disabledTrades.has(trade.id)
  const isFavorite = favoriteTrades.has(trade.id)

  return (
    <Card
      className={[
        'flex items-center justify-between p-3 transition-shadow',
        isDisabled ? 'opacity-60' : '',
        isFavorite ? 'ring-2 ring-yellow-500/50' : '',
        !isDisabled ? 'hover:shadow-md' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-1 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleFavorite(trade.id)}
          className={[
            'h-8 w-8 shrink-0',
            isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-muted-foreground hover:text-yellow-500',
          ].join(' ')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </Button>
        <img
          src={item?.imageUrl}
          alt={item?.name}
          className="h-10 w-10 shrink-0 object-contain"
        />
        <div className="min-w-0 flex-1">
          <h3
            className={[
              'font-medium text-foreground',
              isDisabled ? 'text-muted-foreground' : '',
              isFavorite ? 'font-bold' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {item?.name ?? trade.itemId} {trade.itemQuantity}개
          </h3>
          <p className={['text-sm text-muted-foreground', isFavorite ? 'font-semibold' : ''].join(' ')}>
            {trade.npcName} ({npc?.description ?? ''})<br />
            <span className="flex items-center gap-1">
              <img
                src={requiredItem?.imageUrl}
                alt={requiredItem?.name}
                className="h-4 w-4 object-contain"
              />
              {requiredItem?.name ?? trade.requiredItemId} {trade.requiredQuantity}개
            </span>
            {trade.limitType ? (
              <Badge variant="outline" className="ml-1 text-xs">
                {getLimitText(trade.limitType, trade.limitCount)}
              </Badge>
            ) : null}
          </p>
        </div>
      </div>
      <Button
        variant={isDisabled ? 'secondary' : 'default'}
        size="sm"
        onClick={() => toggleTrade(trade.id)}
        className="shrink-0"
      >
        {isDisabled ? '비활성화' : '활성화'}
      </Button>
    </Card>
  )
}

export default TradeItem

