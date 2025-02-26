import { sessionStore, statStore, store } from '@/store';
import togglePopup from '@/background/togglePopup';
import handleOnboardingCourseStats from '@/modules/libraryResources/handleOnboardingCourseStats';

/**
 * handleAccess adds the URL to the tab history
 * @param tabId
 * @param url
 */
const handleAccess = (tabId: number, url: string) => {
  const session = sessionStore.getState();
  session.addUrlToTabHistory(tabId, url);
  session.resetAutoRedirectCount();
};

/**
 * onCompletedNavigate runs after the navigation has finished and
 * Dom content has loaded
 *
 * onBeforeNavigate -> onCommitted -> [onDOMContentLoaded] -> onCompleted
 */
export default (tabId: number, url: string) => {
  togglePopup(url);

  const { appActive } = store.getState();
  if (!appActive) {
    return;
  }

  handleAccess(tabId, url);
  handleOnboardingCourseStats(new URL(url), store.getState(), statStore.getState().pushStatEventFutures);
};
