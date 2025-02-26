/**
 * Register listener for when the active tab changes
 */
import browserMethods from '@/browserMethods';
import { store } from '@/store';
import togglePopup from '@/background/togglePopup';
import fetchSciwheelData from '../fetchData/fetchSciwheelData';

export default (activeInfo: any) => {
  const queryOptions = { active: true, windowId: activeInfo.windowId, currentWindow: true };
  browserMethods.tabs.query(queryOptions, tabs => {
    const [tab] = tabs;
    if (!tab) {
      return;
    }
    togglePopup(tab.url || tab.pendingUrl || '');
  });

  browserMethods.tabs.query({ url: 'https://*.sciwheel.com/work/*', discarded: false, active: false }, tabs => {
    if (tabs.length > 0) {
      fetchSciwheelData();
    }
  });

  store.persist.rehydrate();
};
