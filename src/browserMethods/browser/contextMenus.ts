import ContextMenusMethods from '@/interfaces/browser/ContextMenusMethods';

const contextMenus: ContextMenusMethods = {
  background: {
    create: properties => {
      browser.contextMenus.create({
        ...properties as browser.contextMenus._CreateCreateProperties,
      }, () => browser.runtime.lastError);
    },
    removeAll: () => {
      browser.contextMenus.removeAll();
    },
    listeners: {
      onClick: callback => {
        browser.contextMenus.onClicked.addListener(info => {
          callback(`${info.menuItemId}`, info.selectionText || '');
        });
      },
    },
  },
};

export default contextMenus;
