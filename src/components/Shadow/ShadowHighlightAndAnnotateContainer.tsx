import React from 'react';
import root from 'react-shadow/emotion';
import './ShadowHighlightAndAnnotate.scss';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import HighlightAndAnnotateAlert from '@/components/HighlightAndAnnotate/HighlightAndAnnotateAlert';
import generateCustomCss from './generateCustomCss';
import Setup, { RenderElementProps } from './Setup';
import HighlightAndAnnotateReactContext from '../Context/HighlightAndAnnotateReactContext';

const ShadowHighlightAndAnnotateContainerElement = ({
  storeState,
  appActiveContext,
  layoutContext,
  highlightAndAnnotateContext,
}: RenderElementProps) => {
  const {
    appSettings: { customizations },
  } = storeState;

  return (
    <root.div>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('contentScript.css')} />
      <style type="text/css">
        {generateCustomCss(customizations)}
      </style>
      <AppActiveReactContext.Provider value={appActiveContext}>
        <LayoutReactContext.Provider value={layoutContext}>
          <HighlightAndAnnotateReactContext.Provider value={highlightAndAnnotateContext}>
            <HighlightAndAnnotateAlert />
          </HighlightAndAnnotateReactContext.Provider>
        </LayoutReactContext.Provider>
      </AppActiveReactContext.Provider>
    </root.div>
  );
};

const ShadowHighlightAndAnnotateContainer = ({
  stateInterpreterLayout,
  stateInterpreterAppActive,
  stateInterpreterSettingsForm,
  stateInterpreterCitation,
  stateInterpreterReferenceManager,
  stateInterpreterHighlightAndAnnotate,
}: any) => {
  return Setup({
    stateInterpreterLayout,
    stateInterpreterAppActive,
    stateInterpreterSettingsForm,
    stateInterpreterCitation,
    stateInterpreterReferenceManager,
    stateInterpreterHighlightAndAnnotate,
    RenderElement: ShadowHighlightAndAnnotateContainerElement,
  });
};

export default ShadowHighlightAndAnnotateContainer;
