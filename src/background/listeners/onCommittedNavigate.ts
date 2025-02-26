import {
  sessionStore, SessionStoreState, store, StoreState,
} from '@/store';
import AuthenticatedOpenAthens from '@/modules/shared/authentication/AuthenticatedOpenAthens';
import AuthenticatedSSO from '@/modules/shared/authentication/AuthenticatedSSO';
import Authentication from '@/modules/access/Authentication';
import ProxyURL from '@/modules/shared/ProxyURL';
import InstitutionAccess from '@/interfaces/InstitutionAccess';
import Institution from '@/interfaces/Institution';

/**
 * Checks if the user is authenticated via SSO.
 * @param prefixUrl
 * @param tabHistory
 * @param currentUrl
 */
const isAuthenticatedSSO = (accessConfig: InstitutionAccess, tabHistory: string[], currentUrl: string) =>
  AuthenticatedOpenAthens(accessConfig, new URL(currentUrl)) || AuthenticatedSSO(accessConfig, tabHistory);

/**
 * If the user has signed in via SSO, complete the sign-in process by adding the domain to the signed in domains list.
 * @param url
 * @param session
 * @param tabId
 */
const completeSignInForSSO = (url: string, session: SessionStoreState, storeState: StoreState, tabId: number) => {
  const { potentialSignedInDomain } = storeState;
  if (!potentialSignedInDomain) {
    return;
  }
  if (isAuthenticatedSSO(potentialSignedInDomain.accessConfig, session.tabsHistory[tabId], url)) {
    storeState.addSignedInDomain(potentialSignedInDomain.resourceDomain);
    storeState.clearPotentialSignedInDomain();
  }
};

const proxyUrlCheck = (institutes: Institution[], url: URL) => institutes.flatMap(({ access }) => {
  const proxyUrl = ProxyURL(access);
  return proxyUrl.isProxyUrl(url) ? proxyUrl : undefined;
});

/**
 * onCommittedNavigate runs after the navigation has finished but before Dom content has loaded
 *
 * onBeforeNavigate -> onCommitted -> [onDOMContentLoaded] -> onCompleted
 */
export default (tabId: number, url: string) => {
  const state = store.getState();
  if (!state.appActive) {
    return;
  }

  const currentUrl = new URL(url);
  const session = sessionStore.getState();

  completeSignInForSSO(url, session, state, tabId);

  /**
   * By default, we add all successful logins to the "signed in domain" list - which is session based.
   * However, regular proxy setups are not usually "session" based and require re-login per new tab.
   *
   * This means we have to remove the resource domain from the list IF it is a proxy.
   * If we didn't, the extension would (incorrectly) tell the user they are signed in when
   * visiting resource in a new tab (e.g. www.jstor.org).
   *
   * "Do not add ANY proxy to the signed in domain list!" I hear you say...
   *
   * Well, dear reader, SOME proxies actually use SSO under the hood (e.g. Shibboleth... I'm looking at you Utrecht) and
   * this method does not always rewrite the URL and IS session based.
   * The only certain way is to add everything to signed in domains and then remove the actual proxy ones
   * with URL rewrites.
   *
   * Why here? This is the earliest point we can tell if the URL has been rewritten.
   * */
  const [proxyUrl] = proxyUrlCheck(state.institutes, currentUrl);
  if (proxyUrl) {
    const targetUrl = proxyUrl.extractOriginal(currentUrl);
    state.removeSignedInDomain(targetUrl);
  }

  if (Authentication.detectSignOut(url)) {
    state.clearPotentialSignedInDomain();
    state.clearSignedInDomains();
  }
};
