/**
 * Toolbar events.
 */
import ToolbarMethods from '@/interfaces/browser/ToolbarMethods';

const toolbar: ToolbarMethods = {
  background: {
    setPopup: details => {
      return chrome.action.setPopup(details);
    },
    activeIcon: (tabId, isDotOnly) => {
      const name = isDotOnly ? 'icon-dot' : 'icon';
      return chrome.action.setIcon({
        tabId,
        path: {
          16: `icons/active/${name}-16.png`,
          32: `icons/active/${name}-32.png`,
          192: `icons/active/${name}-192.png`,
        },
      });
    },
    badgeLabel: (tabId, text) => {
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#3B55AF' }); // cobalt
      chrome.action.setBadgeText({
        tabId,
        text,
      });
    },
    listeners: {
      onClicked: (callback): void => {
        chrome.action.onClicked.addListener(tab => callback(tab.id || 0));
      },
    },
  },
};

export default toolbar;
