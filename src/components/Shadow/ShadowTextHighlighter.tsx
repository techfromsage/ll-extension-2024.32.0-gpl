import React, { useMemo } from 'react';
import root from 'react-shadow/emotion';
import { useSelector } from '@xstate/react';
import { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext, { layoutContextDefaultValues } from '@/components/Context/LayoutReactContext';
import { StateInterpreterLayout } from '@/modules/shared/stateMachine/StateMachineLayout';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';

import {
  selectAppActive, selectAppActiveEvent, selectLayout, selectStore, selectSessionStore, selectTabUuid,
} from './selectors';

import generateCustomCss from './generateCustomCss';
import './ShadowKeywordEnhancements.scss';

interface Props {
  stateInterpreterAppActive: StateInterpreterAppActive,
  stateInterpreterLayout: StateInterpreterLayout,
  children: React.ReactNode,
}

/**
 * Shadow wrapper for text highlighting features, such as keyword enhancements
 * and highlight and annotate, as they share the same setup,
 * but different styles.
*/
const ShadowTextHighlighter = ({
  stateInterpreterAppActive,
  stateInterpreterLayout,
  children,
}: Props) => {
  /** StateMachineAppActive * */
  const appActive = useSelector(stateInterpreterAppActive, selectAppActive);
  const appActiveEvent = useSelector(stateInterpreterAppActive, selectAppActiveEvent);
  const sendAppActiveState = stateInterpreterAppActive.send as (event: AppActiveEvent) => void;
  const storeState = useSelector(stateInterpreterAppActive, selectStore);
  const sessionStoreState = useSelector(stateInterpreterAppActive, selectSessionStore);
  const tabUuid = useSelector(stateInterpreterAppActive, selectTabUuid);
  const appActiveContext = useMemo(() => ({
    appActive,
    appActiveEvent,
    sendAppActiveState,
    storeState,
    sessionStoreState,
    tabUuid,
  }), [appActive, appActiveEvent, sendAppActiveState, storeState, sessionStoreState, tabUuid]);

  /** StateMachineLayout * */
  const layoutValues = useSelector(stateInterpreterLayout, selectLayout);

  /** General customization */
  const { appSettings: { customizations } } = storeState;

  const layoutContext = useMemo(() => ({
    ...layoutContextDefaultValues,
    layoutValues,
  }), [layoutValues]);

  return (
    <root.span>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('contentScript.css')} />
      <AppActiveReactContext.Provider value={appActiveContext}>
        <LayoutReactContext.Provider value={layoutContext}>
          {children}
        </LayoutReactContext.Provider>
      </AppActiveReactContext.Provider>
      <style type="text/css">
        {generateCustomCss(customizations)}
      </style>
    </root.span>
  );
};

export default ShadowTextHighlighter;
