/**
 * Browser navigation functions.
 */

import NavigationMethods from '@/interfaces/browser/NavigationMethods';

const MAIN_TAB_CONTENT_WINDOW = 0;

const OnNavigateListener = (callback: (tabId: number, url: string) => void) => (details: any) => {
  if (details.frameId !== MAIN_TAB_CONTENT_WINDOW) {
    return;
  }
  browser.tabs.get(details.tabId).then(tab => {
    if (tab) {
      callback(tab.id || 0, details.url);
    }
  });
};

const navigation: NavigationMethods = {
  onBeforeNavigate: callback => browser.webNavigation.onBeforeNavigate.addListener(OnNavigateListener(callback)),
  onCompleted: callback => browser.webNavigation.onCompleted.addListener(OnNavigateListener(callback)),
  onCommitted: callback => browser.webNavigation.onCommitted.addListener(OnNavigateListener(callback)),
};

export default navigation;
