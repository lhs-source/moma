import type { TradeType } from '../../../src/data/schemas/trade'
import { getItemById, getNpcById } from '../../lib/dataAccess'
import type { TradeListItem } from '../../lib/tradeCalculations'
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
    <div
      className={[
        'flex items-center justify-between rounded-lg border border-border p-3 shadow-sm transition-shadow',
        isDisabled
          ? 'bg-slate-50 text-slate-600 dark:border-slate-500 dark:bg-slate-400/50 dark:text-slate-500'
          : '',
        isFavorite ? 'bg-green-50 dark:border-green-800 dark:bg-green-500/20' : '',
        !isDisabled ? 'hover:shadow-md' : '',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => toggleFavorite(trade.id)}
          className={[
            'transition-colors',
            isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-yellow-500/50 hover:text-yellow-500',
          ].join(' ')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
        <img
          src={item?.imageUrl}
          alt={item?.name}
          className="h-10 w-10 object-contain"
        />
        <div>
          <h3
            className={[
              'font-medium text-foreground',
              isDisabled ? 'text-slate-600 dark:text-slate-500' : '',
              isFavorite ? 'font-bold' : '',
            ].join(' ')}
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
              <span className="ml-1">({getLimitText(trade.limitType, trade.limitCount)})</span>
            ) : null}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => toggleTrade(trade.id)}
        className={[
          'rounded-full px-3 py-1.5 text-sm transition-colors',
          isDisabled
            ? 'bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
            : 'bg-primary text-primary-foreground hover:bg-primary/90',
        ].join(' ')}
      >
        {isDisabled ? '비활성화' : '활성화'}
      </button>
    </div>
  )
}

export default TradeItem

