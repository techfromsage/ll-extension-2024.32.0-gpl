/**
 * AutoOpenModal determines if a modal popup should automatically display/open based on the
 * the "frequency" and if it's been previously closed.
 *
 * Returns 'true' to auto-open, 'false' to stay closed.
 */
import { StoreState, SessionStoreState } from '@/store';
import LibraryResourceFrequency from '@/enums/futures/LibraryResourceFrequency';
import ManagedDomain from '@/modules/shared/notifications/ManagedDomain';

export default (
  id: string,
  storeState: StoreState,
  sessionStoreState: SessionStoreState,
  currentUrl : URL,
  frequency?: LibraryResourceFrequency,
): boolean => {
  const { isBlocked } = ManagedDomain(storeState.appSettings, currentUrl.hostname);
  const { closedPopupHistory } = sessionStoreState;
  return (frequency !== LibraryResourceFrequency.ShowNever)
    && !closedPopupHistory.includes(id)
    && !isBlocked;
};
