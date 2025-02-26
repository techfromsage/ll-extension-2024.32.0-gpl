import { render } from 'react-dom';
import React from 'react';
import ShadowHighlightAndAnnotateContainer from '@/components/Shadow/ShadowHighlightAndAnnotateContainer';
import ShadowList from '@/enums/ShadowList';

const id = ShadowList.HighlightAndAnnotateContainer;

export const destroyShadowHighlightAndAnnotateContainer = () => {
  document.getElementById(id)?.remove();
};

/**
 * Creates, renders and appends the highlight and annotate wrapper shadow DOM element.
 * This is where the color palette, input note window and alert component
 * will be rendered using floating UI portal.
 */
const createShadowHighlightAndAnnotateContainer = () => {
  if (!document.getElementById(id)) {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    document.body.append(newDiv);
    render(<ShadowHighlightAndAnnotateContainer
      stateInterpreterLayout={window.stateInterpreterLayout}
      stateInterpreterAppActive={window.stateInterpreterAppActive}
      stateInterpreterSettingsForm={window.stateInterpreterSettingsForm}
      stateInterpreterCitation={window.stateInterpreterCitation}
      stateInterpreterReferenceManager={window.stateInterpreterReferenceManager}
      stateInterpreterHighlightAndAnnotate={window.stateInterpreterHighlightAndAnnotate}
    />, newDiv);
  }
};

export default createShadowHighlightAndAnnotateContainer;
