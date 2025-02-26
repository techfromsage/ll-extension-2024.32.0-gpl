/**
 * BrowserRedirect handles redirecting and tracking to another URL in the browser.
 */
import TabRedirect from '@/interfaces/TabRedirect';
import RedirectType from '@/enums/RedirectType';
import Institution from '@/interfaces/Institution';
import { NotificationMetadata } from '@/interfaces/ui/NotificationUI';

export default (
  tabId: number,
  urlTo: string,
  institution: Institution,
  redirectType: RedirectType,
  addRedirectedTab: (tabRedirect: TabRedirect) => void,
  redirectTo: (tabId: number, urlTo: string) => void,
  metadata?: NotificationMetadata,
): void => {
  addRedirectedTab({
    tabId, institution, type: redirectType, metadata,
  });
  redirectTo(tabId, urlTo);
};
