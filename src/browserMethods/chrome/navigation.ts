/**
 * Browser navigation functions.
 */

import NavigationMethods from '@/interfaces/browser/NavigationMethods';
import WebNavigationFramedCallbackDetails = chrome.webNavigation.WebNavigationFramedCallbackDetails;

const MAIN_TAB_CONTENT_WINDOW = 0;

const OnNavigateListener = (callback: (tabId: number, url: string) => void) => (details: WebNavigationFramedCallbackDetails) => {
  if (details.frameId !== MAIN_TAB_CONTENT_WINDOW) {
    return;
  }
  chrome.tabs.get(details.tabId, tab => {
    if (tab) {
      callback(tab.id || 0, details.url);
    }
  });
};

const navigation: NavigationMethods = {
  onBeforeNavigate: callback => chrome.webNavigation.onBeforeNavigate.addListener(OnNavigateListener(callback)),
  onCompleted: callback => chrome.webNavigation.onCompleted.addListener(OnNavigateListener(callback)),
  onCommitted: callback => chrome.webNavigation.onCommitted.addListener(OnNavigateListener(callback)),

};

export default navigation;
