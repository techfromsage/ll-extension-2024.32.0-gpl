import ContextMenusMethods from '@/interfaces/browser/ContextMenusMethods';

const contextMenus: ContextMenusMethods = {
  background: {
    create: properties => {
      chrome.contextMenus.create({
        ...properties as chrome.contextMenus.CreateProperties,
      }, () => chrome.runtime.lastError);
    },
    removeAll: () => {
      chrome.contextMenus.removeAll();
    },
    listeners: {
      onClick: callback => {
        chrome.contextMenus.onClicked.addListener(info => {
          callback(`${info.menuItemId}`, info.selectionText || '');
        });
      },
    },
  },
};

export default contextMenus;
