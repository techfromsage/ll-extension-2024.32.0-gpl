import browserMethods from '@/browserMethods';
import {
  sessionStore, SessionStoreState, store, StoreState,
} from '@/store';
import BrowserRedirect from '@/modules/access/BrowserRedirect';
import RedirectType from '@/enums/RedirectType';
import SearchEnhanced from '@/modules/searchEnhancers/SearchEnhanced';
import Campus from '@/modules/shared/Campus';
import eventEnhanceSearch from '@/modules/stats/access/eventEnhanceSearch';
import eventCustomRedirect from '@/modules/stats/access/eventCustomRedirect';
import togglePopup from '@/background/togglePopup';
import Authentication from '@/modules/access/Authentication';
import AutoRedirectIfNecessary from '@/modules/shared/stateMachine/actions/AutoRedirectIfNecessary';
import Institution from '@/interfaces/Institution';
import { NotificationMetadata } from '@/interfaces/ui/NotificationUI';
import Access from '@/modules/access/Access';
import AuthenticatedShibbolethProxy from '@/modules/shared/authentication/AuthenticatedShibbolethProxy';

/**
 * Handles custom redirects that the institution provide.
 *
 * Relates to: Access
 * @param {number} tabId
 * @param {string} url
 * @param {StoreState} state
 */
const customRedirect = (tabId: number, url: string, state: StoreState, sessionState: SessionStoreState): void => {
  const redirect = state.customRedirects.find(({ urlFrom }) => urlFrom === url);
  const institution = state.institutes.find(() => redirect?.institution);
  if (!redirect || !institution) {
    return;
  }

  eventCustomRedirect(url, institution.id);

  BrowserRedirect(
    tabId,
    redirect.urlTo,
    institution,
    RedirectType.Custom,
    sessionState.addRedirectedTab,
    browserMethods.tabs.background.update,
  );
};

/**
 * Handles search enhancer redirections.
 * If the user lands on one of the preconfigured "search sites" e.g. Google Scholar,
 * we ensure that the correct query parameters are added to the URL.
 *
 * These predefined parameters are picked up by the website and add features to the page.
 *
 * Relates to: Access
 * @param {number} tabId
 * @param {URL} url
 * @param {StoreState} state
 * @param sessionStore
 */
const searchEnhancer = (tabId: number, url: URL, state: StoreState, sessionState: SessionStoreState): void => {
  state.institutes.forEach(institution => {
    const isOnCampus = Campus().get(institution.id, state.onCampus);
    const { searchEnhancerRedirectOnce } = sessionState;
    const searchEnhanced = SearchEnhanced(url, institution.searchEnhancers, isOnCampus, searchEnhancerRedirectOnce);

    const validSearchEnhancer = searchEnhanced.validEnhancer();

    if (!validSearchEnhancer) {
      return;
    }

    eventEnhanceSearch(validSearchEnhancer.type, url.href, institution.id);

    BrowserRedirect(
      tabId,
      searchEnhanced.generateUrl(validSearchEnhancer),
      institution,
      validSearchEnhancer.type,
      sessionState.addRedirectedTab,
      browserMethods.tabs.background.update,
    );

    if (validSearchEnhancer.redirectOnce) {
      sessionState.addSearchEnhancerRedirectOnce(validSearchEnhancer.type);
    }
  });
};

/**
 * Handles redirection to the login page for the user if the user is not signed in and the
 * institution and user has this switched on.
 * @param tabId
 * @param currentUrl
 * @param state
 * @param sessionState
 */
const autoRedirect = (tabId: number, currentUrl: URL, state: StoreState, sessionState: SessionStoreState) => {
  const accessConnections = state.institutes.flatMap(
    institution => Access(institution, state.resourceDomains[institution.id], currentUrl, state.signedInDomains),
  );

  if (accessConnections.length > 0 && sessionState.autoRedirectCount === 0) {
    AutoRedirectIfNecessary(
      currentUrl,
      accessConnections,
      state.appSettings,
      sessionState,
      (urlTo: string, institution: Institution, metadata?: NotificationMetadata) => BrowserRedirect(
        tabId,
        urlTo,
        institution,
        RedirectType.Auto,
        sessionState.addRedirectedTab,
        browserMethods.tabs.background.update,
        metadata,
      ),
      () => {
        sessionState.addRedirectedTab({
          type: RedirectType.RedirectLoop,
          tabId,
          institution: state.institutes[0],
        });
      },
    );
  }
};

/**
 * If the user is signed in to the proxy, we need to complete the sign-in process by adding the domain to the signed in domains.
 * @param url
 * @param state
 * @param sessionState
 */
const completeSignInForShibbolethProxy = (url: string, state: StoreState) => {
  const { potentialSignedInDomain } = state;
  if (potentialSignedInDomain && AuthenticatedShibbolethProxy(new URL(url))) {
    state.addSignedInDomain(potentialSignedInDomain.resourceDomain);
    state.clearPotentialSignedInDomain();
  }
};

/**
 * onBeforeNavigate runs after the navigation has finished but before Dom content has loaded
 *
 * onBeforeNavigate -> onCommitted -> [onDOMContentLoaded] -> onCompleted
 */
export default (tabId: number, url: string) => {
  togglePopup(url);

  const state = store.getState();

  if (!state.appActive) {
    return;
  }
  const currentUrl = new URL(url);
  const sessionState = sessionStore.getState();
  sessionState.addUrlToTabHistory(tabId, url);

  // Redirect if necessary
  customRedirect(tabId, url, state, sessionState);
  autoRedirect(tabId, currentUrl, state, sessionState);
  searchEnhancer(tabId, currentUrl, state, sessionState);

  // Detect potential sign in and complete sign in for proxy (SSO handled in OnCommittedNavigate)
  const potential = Authentication.detectSignIn(url, state.institutes, state.resourceDomains, state.signedInDomains);
  if (potential) {
    state.setPotentialSignedInDomain(potential);
  } else {
    // Not all proxies are what they seem.  Some use SSO under the hood.
    // See Utrecht University for an example.
    completeSignInForShibbolethProxy(url, state);
  }
};
