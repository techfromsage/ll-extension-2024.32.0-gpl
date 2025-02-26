/**
 * Popup functions and events.
 */
import BrowserEvent from '@/enums/BrowserEvent';
import PopupMethods from '@/interfaces/browser/PopupMethods';
import EventMessage from '@/interfaces/browser/EventMessage';

const popup: PopupMethods = {
  /**
   * Can be called by background.
   */
  background: {
    toggle: (tabId: number) => chrome.tabs.sendMessage(tabId, { event: BrowserEvent.PopupToggle }),
  },
  contentScript: {
    listeners: {
      onToggle: callback => {
        chrome.runtime.onMessage.addListener(
          (message: EventMessage<Record<string, never>>, _, sendResponse) => {
            if (message.event === BrowserEvent.PopupToggle) {
              callback().then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
    },
  },
};

export default popup;
