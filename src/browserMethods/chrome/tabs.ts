/**
 * Tabs functions
 */
import TabMethods from '@/interfaces/browser/TabMethods';
import BrowserEvent from '@/enums/BrowserEvent';
import EventMessage from '@/interfaces/browser/EventMessage';

const tabs: TabMethods = {
  query: (options, callback): void => chrome.tabs.query(options, callback),
  background: {
    update: (tabId, urlTo) => chrome.tabs.update(tabId, { url: urlTo }),
    create: (url, active = true) => {
      if (!url) {
        return;
      }

      chrome.tabs.create({ url, active });
    },
    listeners: {
      onTabHistoryRequest: callback => {
        chrome.runtime.onMessage.addListener((message: EventMessage<Record<string, never>>, sender, sendResponse) => {
          if (message.event === BrowserEvent.TabHistory) {
            if (!sender.tab?.id) {
              return false;
            }
            callback(sender.tab.id).then(sendResponse);
            return true;
          }
          return false;
        });
      },
      onRemoved: callback => {
        chrome.tabs.onRemoved.addListener(tabId => {
          callback(tabId);
        });
      },
      onActivated: callback => {
        chrome.tabs.onActivated.addListener(activeInfo => {
          callback(activeInfo);
        });
      },
      onTabCreate: () => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ url: string, active: boolean }>) => {
            if (event === BrowserEvent.TabCreate) {
              tabs.background.create(message.url, message.active);
            }
          },
        );
      },
    },
  },
  contentScript: {
    tabHistory: () => {
      return new Promise(resolve => {
        chrome.runtime.sendMessage({ event: BrowserEvent.TabHistory }, resolve);
      });
    },
    create: (url, active = true) => {
      chrome.runtime.sendMessage({ event: BrowserEvent.TabCreate, message: { url, active } });
    },
    sendMessage: (tabId, event, callback) => {
      chrome.tabs.sendMessage(tabId, { event, message: { tabId } }, {}, callback);
    },
  },
};

export default tabs;
