/**
 * Register listener for when a tab is removed / closed
 */
import { sessionStore } from '@/store';

export default (tabId: number) => {
  const { removeTabHistory, removeRedirectedTab } = sessionStore.getState();
  removeTabHistory(tabId);
  removeRedirectedTab(tabId);
};
