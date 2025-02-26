/**
 * Session tab history store
 * Creates a store
 */
import { SessionStoreSlice } from '@/store';

interface TabHistory {
  [tabId: number]: string[],
}

export interface SessionTabHistorySlice {
  tabsHistory: TabHistory,
  addUrlToTabHistory: (tabId: number, url: string) => void,
  removeTabHistory: (tabIdToRemove: number) => void,
  clearTabHistory: () => void,
}

const DeleteTabHistoryKey = (obj: TabHistory, prop: number) => {
  const cleanObj = { ...obj };
  delete cleanObj[prop];
  return cleanObj;
};

export const createSessionTabHistorySlice: SessionStoreSlice<SessionTabHistorySlice> = set => ({
  tabsHistory: {},
  addUrlToTabHistory: (tabId, url) => {
    set(state => {
      const tabHistory = state.tabsHistory[tabId]
        ? [...state.tabsHistory[tabId], url]
        : [url];
      return {
        tabsHistory: {
          ...state.tabsHistory,
          [tabId]: Array.from(new Set(tabHistory)),
        },
      };
    });
  },
  removeTabHistory: tabIdToRemove => {
    set(state => ({
      tabsHistory: DeleteTabHistoryKey(state.tabsHistory, tabIdToRemove),
    }));
  },
  clearTabHistory: () => {
    set({ tabsHistory: {} });
  },
});
