import LayoutEvent from '@/enums/stateMachine/LayoutEvent';

export type QueryInfo = chrome.tabs.QueryInfo | browser.tabs._QueryQueryInfo;

type Tab = (chrome.tabs.Tab | browser.tabs.Tab) & { pendingUrl?: string };

interface TabMethods {
  query(options: QueryInfo, callback: (tabs: Tab[]) => void): unknown,
  contentScript: {
    sendMessage(tabId: number, event: { type: string, event: LayoutEvent }, callback: () => void): unknown,
    tabHistory: () => Promise<string[]>,
    create: (url: string, active?: boolean) => void,
  },
  background: {
    update: (tabId: number, urlTo: string) => void,
    create: (url: string | null, active?: boolean) => void,
    listeners: {
      onTabHistoryRequest: (callback: (tabId: number) => Promise<string[]>) => void,
      onRemoved: (callback: (tabId: number) => void) => void,
      onActivated: (callback: (activeInfo: browser.tabs._OnActivatedActiveInfo) => void) => void,
      onTabCreate: () => void,
    },
  },
}

export default TabMethods;
