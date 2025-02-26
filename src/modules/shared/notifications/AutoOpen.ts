/**
 * AutoOpen determines if a popup should automatically display/open based on the
 * institution's configuration.
 *
 * Returns 'true' to auto-open, 'false' to stay closed.
 */
import Institution from '@/interfaces/Institution';
import State from '@/enums/State';
import ManagedDomain from '@/modules/shared/notifications/ManagedDomain';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (
  institution: Institution,
  state: State,
  notificationId: string,
  { storeState, sessionStoreState, currentUrl }: FeaturesContext,
): boolean => {
  const { isBlocked } = ManagedDomain(storeState.appSettings, currentUrl.hostname);
  const { closedPopupHistory } = sessionStoreState;
  return institution.content_popups.includes(state)
    && !closedPopupHistory.includes(notificationId)
    && !isBlocked;
};
