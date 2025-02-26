/**
 * Browser network functions and events.
 */
import NetworkMethods from '@/interfaces/browser/NetworkMethods';
import BrowserEvent from '@/enums/BrowserEvent';

const network: NetworkMethods = {
  contentScript: {
    change: () => new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.NetworkChange }, resolve);
    }),
  },
  background: {
    listeners: {
      onChanged(callback) {
        chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
          if (request.event === BrowserEvent.NetworkChange) {
            callback().then(sendResponse);
            return true;
          }
          return false;
        });
      },
    },
  },
};

export default network;
