/**
 * Tabs functions
 */
import TabMethods from '@/interfaces/browser/TabMethods';
import BrowserEvent from '@/enums/BrowserEvent';
import EventMessage from '@/interfaces/browser/EventMessage';

const tabs: TabMethods = {
  query: (options, callback) => browser.tabs.query(options).then(callback),
  background: {
    update: (tabId, urlTo) => browser.tabs.update(tabId, { url: urlTo }),
    create: (url, active = true) => {
      if (!url) {
        return;
      }

      browser.tabs.create({ url, active });
    },
    listeners: {
      onTabHistoryRequest: callback => {
        browser.runtime.onMessage.addListener((message: EventMessage<Record<string, never>>, sender) => {
          if (message.event === BrowserEvent.TabHistory) {
            if (!sender.tab?.id) {
              return false;
            }
            return callback(sender.tab.id);
          }
          return false;
        });
      },
      onRemoved: callback => {
        browser.tabs.onRemoved.addListener(tabId => {
          callback(tabId);
        });
      },
      onActivated: callback => {
        browser.tabs.onActivated.addListener(activeInfo => {
          callback(activeInfo);
        });
      },
      onTabCreate: () => {
        browser.runtime.onMessage.addListener(
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
    tabHistory: () => browser.runtime.sendMessage({ event: BrowserEvent.TabHistory }),
    create: (url, active = true) => browser.runtime.sendMessage({ event: BrowserEvent.TabCreate, message: { url, active } }),
    sendMessage: (tabId, event, callback) => {
      browser.tabs.sendMessage(tabId, { event, message: { tabId } }, {}).then(callback);
    },
  },
};

export default tabs;
