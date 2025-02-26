/**
 * Session redirectedTabs store
 * Creates a store to track tabs that have been redirected.
 * We do this, so we can notify the user if a redirect happened.
 */
import { SessionStoreSlice } from '@/store';
import TabRedirect from '@/interfaces/TabRedirect';
import RedirectType from '@/enums/RedirectType';

export interface SessionRedirectedTabsSlice {
  redirectedTabs: TabRedirect[],
  // autoRedirectCount is used to limit the number of auto redirects.
  autoRedirectCount: number,
  addRedirectedTab: (redirect: TabRedirect) => void,
  removeRedirectedTab: (tabIdToRemove: number) => void,
  clearRedirectedTabs: () => void,
  incrementAutoRedirectCount: () => void,
  resetAutoRedirectCount: () => void,
  searchEnhancerRedirectOnce: RedirectType[],
  addSearchEnhancerRedirectOnce: (type: RedirectType) => void,
}

export const createSessionRedirectedTabsSlice: SessionStoreSlice<SessionRedirectedTabsSlice> = set => ({
  redirectedTabs: [],
  autoRedirectCount: 0,
  addRedirectedTab: tabRedirect => {
    set(state => ({ redirectedTabs: [...state.redirectedTabs, tabRedirect] }));
  },
  removeRedirectedTab: tabIdToRemove => {
    set(state => ({
      redirectedTabs: state.redirectedTabs.filter((tab: TabRedirect) => tab.tabId !== tabIdToRemove),
    }));
  },
  clearRedirectedTabs: () => {
    set({ redirectedTabs: [] });
  },
  incrementAutoRedirectCount: () => set(state => ({ autoRedirectCount: state.autoRedirectCount + 1 })),
  resetAutoRedirectCount: () => set({ autoRedirectCount: 0 }),
  searchEnhancerRedirectOnce: [],
  addSearchEnhancerRedirectOnce: type => set(state => (
    { searchEnhancerRedirectOnce: [...state.searchEnhancerRedirectOnce, type] }
  )),
});
