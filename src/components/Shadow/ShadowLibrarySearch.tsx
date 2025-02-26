import React, { useMemo } from 'react';
import root from 'react-shadow/emotion';
import { useSelector } from '@xstate/react';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import { StateInterpreterLayout } from '@/modules/shared/stateMachine/StateMachineLayout';
import { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { StateInterpreterLibrarySearch } from '@/modules/shared/stateMachine/StateMachineLibrarySearch';
import { StateInterpreterSettingsForm } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext, { layoutContextDefaultValues } from '@/components/Context/LayoutReactContext';
import SettingsFormReactContext, { settingsFormDefaultValues } from '@/components/Context/SettingsFormReactContext';
import LibrarySearch from '@/components/LibrarySearch/LibrarySearch';

import {
  selectAppActive, selectAppActiveEvent, selectLayout, selectStore, selectSessionStore, selectTabUuid,
} from './selectors';

import './ShadowLibrarySearch.scss';

interface Props {
  stateInterpreterLayout: StateInterpreterLayout,
  stateInterpreterAppActive: StateInterpreterAppActive,
  stateInterpreterSettingsForm: StateInterpreterSettingsForm,
  stateInterpretersLibrarySearch: StateInterpreterLibrarySearch[],
}

const ShadowLibrarySearch = ({
  stateInterpreterLayout,
  stateInterpreterAppActive,
  stateInterpreterSettingsForm,
  stateInterpretersLibrarySearch,
}: Props) => {
  /** StateMachineLayout * */
  const layoutValues = useSelector(stateInterpreterLayout, selectLayout);
  /** StateMachineAppActive * */
  const appActive = useSelector(stateInterpreterAppActive, selectAppActive);
  const appActiveEvent = useSelector(stateInterpreterAppActive, selectAppActiveEvent);
  const sendAppActiveState = stateInterpreterAppActive.send as (event: AppActiveEvent) => void;
  const sendSettingsFormsState = stateInterpreterSettingsForm.send as (event: SettingsFormEvent) => void;
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

  const layoutContext = useMemo(() => ({
    ...layoutContextDefaultValues,
    layoutValues,
  }), [layoutValues]);

  const settingsFormContext = useMemo(() => ({
    ...settingsFormDefaultValues,
    sendSettingsFormsState,
  }), [sendSettingsFormsState]);

  return (
    <root.div>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('contentScript.css')} />
      <AppActiveReactContext.Provider value={appActiveContext}>
        <LayoutReactContext.Provider value={layoutContext}>
          <SettingsFormReactContext.Provider value={settingsFormContext}>
            <LibrarySearch stateInterpretersLibrarySearch={stateInterpretersLibrarySearch} />
          </SettingsFormReactContext.Provider>
        </LayoutReactContext.Provider>
      </AppActiveReactContext.Provider>
    </root.div>
  );
};

export default ShadowLibrarySearch;
