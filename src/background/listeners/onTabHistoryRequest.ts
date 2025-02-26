/**
 * Register listener for when a tab's URL history from store is requested.
 */
import { sessionStore } from '@/store';

export default (tabId: number): Promise<string[]> => {
  const { tabsHistory } = sessionStore.getState();
  return Promise.resolve(tabsHistory?.[tabId] || []);
};
