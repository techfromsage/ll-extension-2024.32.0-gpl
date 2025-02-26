import React from 'react';
import { render } from 'react-dom';
import parser from 'ua-parser-js';

import browserMethods from '@/browserMethods';
import { sessionStore, store } from '@/store';
import initStateMachines from '@/content-script/initStateMachines';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import PermissionsPrompt from '@/components/SideTray/PermissionsPrompt';
import { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { StateInterpreterLayout } from '@/modules/shared/stateMachine/StateMachineLayout';
import { StateInterpreterSettingsForm } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import { StateInterpreterCitation } from '@/modules/shared/stateMachine/StateMachineCitation';
import { StateInterpreterReferenceManager } from '@/modules/shared/stateMachine/StateMachineReferenceManager';
import { StateInterpreterHighlightAndAnnotate } from '@/modules/shared/stateMachine/StateMachineHighlightAndAnnotate';

const removeLoadingSpinner = () => {
  Array.from(window.document.getElementsByClassName('toolbar-popup-spinner')).forEach(el => el.remove());
};

type AppType = (props: {
  stateInterpreterAppActive: StateInterpreterAppActive,
  stateInterpreterLayout: StateInterpreterLayout,
  stateInterpreterSettingsForm: StateInterpreterSettingsForm,
  stateInterpreterCitation: StateInterpreterCitation,
  stateInterpreterReferenceManager: StateInterpreterReferenceManager,
  stateInterpreterHighlightAndAnnotate: StateInterpreterHighlightAndAnnotate,
}) => React.ReactElement;

/**
 * Check if the extension needs permissions popup to run.
 */
const needsPermissions = (browser: string | undefined, origins: string[] | undefined) => {
  if (browser === 'Safari') {
    return false;
  }
  if (!origins?.length) {
    return true;
  }
  return !(origins.includes('<all_urls>') || origins.includes('*://*/*'));
};

const PermissionsSwitch = (App: AppType, tabUrl: string) => {
  browserMethods.permissions.background.getAll().then(permissions => {
    const userAgent = navigator ? navigator.userAgent : 'other';
    const browserInfo = parser(userAgent);

    if (needsPermissions(browserInfo.browser.name, permissions.origins)) {
      render(
        <div className="medium-screen">
          <div className="medium">
            <PermissionsPrompt isToolbar />
          </div>
        </div>,
        window.document.querySelector('#app-container'),
      );
      removeLoadingSpinner();
      return;
    }

    store.persist.onFinishHydration(() => {
      const storeState = store.getState();
      const sessionStoreState = sessionStore.getState();
      if (!window.stateInterpreterAppActive
      || !window.stateInterpreterLayout
      || !window.stateInterpreterSettingsForm
      || !window.stateInterpreterReferenceManager
      || !window.stateInterpreterHighlightAndAnnotate
      ) {
        initStateMachines(storeState, sessionStoreState, tabUrl);
        render(
          <App
            stateInterpreterAppActive={window.stateInterpreterAppActive}
            stateInterpreterLayout={window.stateInterpreterLayout}
            stateInterpreterSettingsForm={window.stateInterpreterSettingsForm}
            stateInterpreterCitation={window.stateInterpreterCitation}
            stateInterpreterReferenceManager={window.stateInterpreterReferenceManager}
            stateInterpreterHighlightAndAnnotate={window.stateInterpreterHighlightAndAnnotate}
          />,
          window.document.querySelector('#app-container'),
        );
        removeLoadingSpinner();
      } else {
        window.stateInterpreterAppActive.send(AppActiveEvent.RefreshStoreState, { storeState });
        window.stateInterpreterAppActive.send(AppActiveEvent.RefreshSessionStoreState, { sessionStoreState });
        window.stateInterpreterSettingsForm.send(SettingsFormEvent.RefreshStoreState, { storeState });
      }
    });
  });
};

export default PermissionsSwitch;
