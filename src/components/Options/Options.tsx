import React, { useMemo } from 'react';
import { useSelector } from '@xstate/react';
import {
  selectAppActive,
  selectAppActiveEvent,
  selectLayout,
  selectSettingsForm,
  selectSettingsFormData,
  selectSettingsFormEvent,
  selectReferenceManager,
  selectReferenceManagerEvent,
  selectStore,
  selectSessionStore,
  selectTabUuid,
  selectResources,
  selectReferenceResource,
} from '@/components/Shadow/selectors';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import LayoutState from '@/enums/stateMachine/LayoutState';
import { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { StateInterpreterLayout } from '@/modules/shared/stateMachine/StateMachineLayout';
import { StateInterpreterSettingsForm } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import { StateInterpreterReferenceManager } from '@/modules/shared/stateMachine/StateMachineReferenceManager';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import SideTrayPanel from '@/components/SideTray/SideTrayPanel';
import SideTray from '@/components/SideTray/SideTray';
import SetupPanel from '@/components/SideTray/SetupPanel';
import generateCustomCss from '@/components/Shadow/generateCustomCss';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import PinExtensionTab from '@/components/SideTray/Onboarding/PinExtension/PinExtensionTab';
import SciwheelOnboardingTab from '@/components/SideTray/Onboarding/SciwheelOnboardingTab/SciwheelOnboardingTab';
import '@/components/Shadow/shadow.scss';

interface Props {
  stateInterpreterAppActive: StateInterpreterAppActive,
  stateInterpreterLayout: StateInterpreterLayout,
  stateInterpreterSettingsForm: StateInterpreterSettingsForm,
  stateInterpreterReferenceManager: StateInterpreterReferenceManager,
}

export const Options = ({
  stateInterpreterAppActive,
  stateInterpreterLayout,
  stateInterpreterSettingsForm,
  stateInterpreterReferenceManager,
}: Props) => {
  /** StateMachineAppActive * */
  const appActive = useSelector(stateInterpreterAppActive, selectAppActive);
  const appActiveEvent = useSelector(stateInterpreterAppActive, selectAppActiveEvent);
  const sendAppActiveState = stateInterpreterAppActive.send as (event: AppActiveEvent) => void;
  const storeState = useSelector(stateInterpreterAppActive, selectStore);
  const sessionStoreState = useSelector(stateInterpreterAppActive, selectSessionStore);
  const tabUuid = useSelector(stateInterpreterAppActive, selectTabUuid);

  const appActiveContext = useMemo(
    () => ({
      appActive,
      appActiveEvent,
      sendAppActiveState,
      storeState,
      sessionStoreState,
      tabUuid,
    }),
    [appActive, appActiveEvent, sendAppActiveState, storeState, sessionStoreState, tabUuid],
  );

  /** StateMachineSettingsForm */
  const settingsFormValue = useSelector(stateInterpreterSettingsForm, selectSettingsForm);
  const settingsFormEvent = useSelector(stateInterpreterSettingsForm, selectSettingsFormEvent);
  const settingsFormData = useSelector(stateInterpreterSettingsForm, selectSettingsFormData);
  const sendSettingsFormsState = stateInterpreterSettingsForm.send as (event: SettingsFormEvent) => void;

  const settingsFormContext = useMemo(() => ({
    settingsFormValue,
    settingsFormEvent,
    settingsFormData,
    sendSettingsFormsState,
  }), [settingsFormValue, settingsFormEvent, settingsFormData, sendSettingsFormsState]);

  /** StateMachineReferenceManager * */
  const referenceManager = useSelector(stateInterpreterReferenceManager, selectReferenceManager);
  const referenceManagerEvent = useSelector(stateInterpreterReferenceManager, selectReferenceManagerEvent);
  const resources = useSelector(stateInterpreterReferenceManager, selectResources);
  const referenceResource = useSelector(stateInterpreterReferenceManager, selectReferenceResource);
  const sendReferenceManagerState = stateInterpreterReferenceManager.send as (event: ReferenceManagerEvent) => void;

  const referenceManagerContext = useMemo(
    () => ({
      referenceManager,
      referenceManagerEvent,
      resources,
      referenceResource,
      sendReferenceManagerState,
    }),
    [referenceManager, referenceManagerEvent, sendReferenceManagerState],
  );

  const {
    appSettings: { customizations },
    institutionsList,
  } = storeState;

  const layoutValues = useSelector(stateInterpreterLayout, selectLayout);
  const { sciwheelEnabled } = storeState.appSettings;
  return (
    <>
      <div className={`${layoutValues.screenSize}`}>
        <div className={storeState.appSettings.customTextSize}>
          <SettingsFormReactContext.Provider value={settingsFormContext}>
            <AppActiveReactContext.Provider value={appActiveContext}>
              <ReferenceManagerReactContext.Provider value={referenceManagerContext}>
                {appActive === AppActiveState.ShowPinTooltipOnboardingTab && (<PinExtensionTab />)}
                {appActive === AppActiveState.ShowSciwheelOnboardingTab && sciwheelEnabled && (
                  <SciwheelOnboardingTab />)}
                { appActive === AppActiveState.On && <SideTrayPanel notifications={[]} layout={LayoutState.Settings} isOptions />}
                {(appActive === AppActiveState.NoInstitutionsSelected || appActive === AppActiveState.FetchInstitutionData) && (
                  <SideTray isOptions><SetupPanel institutionsList={institutionsList} isOptions /></SideTray>
                )}
              </ReferenceManagerReactContext.Provider>
            </AppActiveReactContext.Provider>
          </SettingsFormReactContext.Provider>
        </div>
      </div>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('options.css')} />
      <style type="text/css">
        {generateCustomCss(customizations)}
      </style>
    </>
  );
};

export default Options;
