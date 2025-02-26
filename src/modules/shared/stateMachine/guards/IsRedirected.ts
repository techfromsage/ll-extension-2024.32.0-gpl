/**
 * Checks if a URL redirection state is valid.
 * (e.g. A user/institution has set a redirection to happen when authentication is possible for a domain)
 *
 * Relating to: Access.
 */

import RedirectType from '@/enums/RedirectType';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (redirectTypes: RedirectType[]) => ({
  sessionStoreState: { redirectedTabs },
  currentTabId,
}: FeaturesContext): boolean =>
  redirectedTabs.some(({ tabId, type }) =>
    tabId === currentTabId && redirectTypes.includes(type));
