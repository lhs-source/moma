import {
  useCraftingStore,
  selectIsMembershipEnabled,
} from '../../stores/craftingStore'

export function MembershipToggle() {
  const isMembershipEnabled = useCraftingStore(selectIsMembershipEnabled)
  const toggleMembership = useCraftingStore((state) => state.toggleMembership)

  return (
    <div className="membership-toggle flex items-center space-x-2 py-2">
      <span className="text-sm font-medium text-foreground">멤버십 혜택</span>
      <button
        type="button"
        onClick={toggleMembership}
        className={[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          isMembershipEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600',
        ].join(' ')}
        aria-pressed={isMembershipEnabled}
      >
        <span
          className={[
            'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform',
            isMembershipEnabled ? 'translate-x-6' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
      <span
        className={[
          'text-sm',
          isMembershipEnabled ? 'text-foreground font-medium' : 'text-muted-foreground',
        ].join(' ')}
      >
        {isMembershipEnabled ? '활성화' : '비활성화'}
      </span>
    </div>
  )
}

export default MembershipToggle

