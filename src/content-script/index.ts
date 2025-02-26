import bootstrap from '@bootstrap/index';
import { sessionStore, store } from '@/store';
import browserMethods from '@/browserMethods';
import onPopupToggle from '@/content-script/listeners/onPopupToggle';
import createShadowElement from '@/components/Shadow/createShadowElement';
import createTestingTriggers from '@/dev/createTestingTriggers';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import initStateMachines from '@/content-script/initStateMachines';
import resizeObserver from '@/content-script/listeners/resizeObserver';
import registerNetworkChange from '@/content-script/registerNetworkChange';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import createShadowHighlightAndAnnotateContainer from '@/components/Shadow/createShadowHighlightAndAnnotateContainer';
import mutationObserver from '@/content-script/listeners/mutationObserver';
import HostnameMatch from '@/modules/shared/HostnameMatch';

/**
 * Start here! On Finish Hydrate (when the stores have been updated from local storage).
 */
const contentScript = store.persist.onFinishHydration(storeState => {
  const hostnameMatch = HostnameMatch(window.location.hostname);
  const isDenied = storeState.globalDenylist.some(domain => hostnameMatch.match({ domain, strict: false }));
  if (isDenied) {
    return;
  }

  const sessionStoreState = sessionStore.getState();
  if (!window.stateInterpreterSettingsForm || !window.stateInterpreterAppActive || !window.stateInterpreterReferenceManager) {
    initStateMachines(storeState, sessionStoreState, window.location.href);
    mutationObserver();
    resizeObserver();
    createShadowElement();

    if (storeState.appSettings.sciwheelEnabled) {
      createShadowHighlightAndAnnotateContainer();
    }
  } else {
    window.stateInterpreterAppActive.send(AppActiveEvent.RefreshStoreState, { storeState });
    window.stateInterpreterAppActive.send(AppActiveEvent.RefreshSessionStoreState, { sessionStoreState });
    window.stateInterpreterSettingsForm.send(SettingsFormEvent.RefreshStoreState, { storeState });
  }

  if (window.location.origin === bootstrap.api.sciwheel.base) {
    window.stateInterpreterReferenceManager.send(ReferenceManagerEvent.CheckForUserSignIn, { storeState });
  }

  // Dev only
  createTestingTriggers();
});

/**
 * Register Listeners
 */
browserMethods.popup.contentScript.listeners.onToggle(onPopupToggle);

registerNetworkChange();

export default contentScript;
