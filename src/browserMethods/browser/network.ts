/**
 * Browser network functions and events.
 */
import NetworkMethods from '@/interfaces/browser/NetworkMethods';
import BrowserEvent from '@/enums/BrowserEvent';

const network: NetworkMethods = {
  contentScript: {
    change: () => browser.runtime.sendMessage({ event: BrowserEvent.NetworkChange }),
  },
  background: {
    listeners: {
      onChanged: callback => {
        browser.runtime.onMessage.addListener(request => {
          if (request.event === BrowserEvent.NetworkChange) {
            callback();
            return true;
          }
          return false;
        });
      },
    },
  },
};

export default network;
