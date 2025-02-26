/**
 * Popup functions and events.
 */
import BrowserEvent from '@/enums/BrowserEvent';
import PopupMethods from '@/interfaces/browser/PopupMethods';

const popup: PopupMethods = {
  background: {
    toggle: (tabId: number) => browser.tabs.sendMessage(tabId, { event: BrowserEvent.PopupToggle }),
  },
  contentScript: {
    listeners: {
      onToggle: callback => {
        browser.runtime.onMessage.addListener(
          message => {
            if (message.event === BrowserEvent.PopupToggle) {
              return callback();
            }
            return false;
          },
        );
      },
    },
  },
};

export default popup;
