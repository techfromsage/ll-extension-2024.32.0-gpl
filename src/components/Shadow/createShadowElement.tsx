import { render } from 'react-dom';
import React from 'react';
import Shadow from '@/components/Shadow/shadow';
import ShadowList from '@/enums/ShadowList';
import { store } from '@/store';
import browserMethods from '@/browserMethods';

/**
 * Creates, renders and appends the Shadow DOM element.
 */
const createShadowElement = () => {
  browserMethods.app.platformErrorTracking.initialise(store.getState());
  const id = ShadowList.Wrapper;

  if (!document.getElementById(id)) {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    document.body.prepend(newDiv);
    render(<Shadow
      stateInterpreterLayout={window.stateInterpreterLayout}
      stateInterpreterAppActive={window.stateInterpreterAppActive}
      stateInterpreterSettingsForm={window.stateInterpreterSettingsForm}
      stateInterpreterCitation={window.stateInterpreterCitation}
      stateInterpreterReferenceManager={window.stateInterpreterReferenceManager}
      stateInterpreterHighlightAndAnnotate={window.stateInterpreterHighlightAndAnnotate}
    />, newDiv);
  }

  const platformId = ShadowList.Platform;

  if (!document.getElementById(platformId)) {
    const styleElement = document.createElement('style');
    styleElement.id = platformId;
    document.head.append(styleElement);
  }
};

export default createShadowElement;
