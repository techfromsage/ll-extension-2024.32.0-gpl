/**
 * Component Shadow is the highest element and entrypoint in the app.
 */
import React from 'react';
import root from 'react-shadow/emotion';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import Layout from '@/components/Layout/Layout';
import FloatingAction from '@/components/FloatingAction/FloatingAction';
import CitationReactContext from '@/components/Context/CitationReactContext';
import ShadowList from '@/enums/ShadowList';
import Setup, { RenderElementProps } from './Setup';
import generateCustomCss from './generateCustomCss';
import './shadow.scss';
import HighlightAndAnnotateReactContext from '../Context/HighlightAndAnnotateReactContext';

const ShadowElement = ({
  storeState,
  settingsFormContext,
  appActiveContext,
  layoutContext,
  citationContext,
  referenceManagerContext,
  highlightAndAnnotateContext,
}: RenderElementProps) => {
  const {
    appSettings: { customizations },
  } = storeState;

  return (
    <root.div id={ShadowList.Wrapper}>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('contentScript.css')} />
      <SettingsFormReactContext.Provider value={settingsFormContext}>
        <AppActiveReactContext.Provider value={appActiveContext}>
          <LayoutReactContext.Provider value={layoutContext}>
            <CitationReactContext.Provider value={citationContext}>
              <ReferenceManagerReactContext.Provider value={referenceManagerContext}>
                <HighlightAndAnnotateReactContext.Provider value={highlightAndAnnotateContext}>
                  <FloatingAction />
                  <Layout />
                </HighlightAndAnnotateReactContext.Provider>
              </ReferenceManagerReactContext.Provider>
            </CitationReactContext.Provider>
          </LayoutReactContext.Provider>
        </AppActiveReactContext.Provider>
      </SettingsFormReactContext.Provider>
      <style type="text/css">
        {generateCustomCss(customizations)}
      </style>
    </root.div>
  );
};

const Shadow = ({
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
    RenderElement: ShadowElement,
  });
};

export default Shadow;
