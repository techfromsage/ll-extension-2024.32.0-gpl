import { useMemo } from 'react';
import { useSelector } from '@xstate/react';
import browserMethods from '@/browserMethods';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { StateInterpreterLayout } from '@/modules/shared/stateMachine/StateMachineLayout';
import { ReactContext } from '@/components/Context/LayoutReactContext';
import { SettingsFormDefaultValues } from '@/components/Context/SettingsFormReactContext';
import { StateInterpreterSettingsForm } from '@/modules/shared/stateMachine/StateMachineSettingsForm';

import { StoreState, SessionStoreState } from '@/store';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import LayoutStateValues from '@/interfaces/stateMachine/LayoutStateValues';

import { StateInterpreterCitation } from '@/modules/shared/stateMachine/StateMachineCitation';
import CitationEvent from '@/enums/stateMachine/CitationEvent';
import { CitationReactContextProps } from '@/components/Context/CitationReactContext';

import { StateInterpreterReferenceManager } from '@/modules/shared/stateMachine/StateMachineReferenceManager';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import { ReferenceManagerContextProps } from '@/components/Context/ReferenceManagerReactContext';

import { StateInterpreterHighlightAndAnnotate } from '@/modules/shared/stateMachine/StateMachineHighlightAndAnnotate';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import {
  selectAppActive,
  selectAppActiveEvent,
  selectCitation,
  selectCitationData,
  selectExpandedNotifications,
  selectLayout,
  selectLayoutEvent,
  selectLibraryServices,
  selectModalNotification,
  selectNotifications,
  selectSettingsForm,
  selectSettingsFormData,
  selectSettingsFormEvent,
  selectStore,
  selectSessionStore,
  selectTabUuid,
  selectReferenceManager,
  selectReferenceManagerEvent,
  selectResources,
  selectReferenceResource,
  selectHighlightAndAnnotate,
  selectHighlightAndAnnotateData,
} from './selectors';
import { HighlightAndAnnotateReactContextProps } from '../Context/HighlightAndAnnotateReactContext';

/**
 * @param {NotificationUI} notification
 */
const addToClosedHistory = (notification?: NotificationUI) => {
  if (!notification) {
    return;
  }
  browserMethods.app.contentScript.addClosedPopupToHistory(`${notification?.id}`)
    .then(newSessionStoreState => {
      if (notification?.hasBeenClosed) {
        window.stateInterpreterAppActive.send(
          AppActiveEvent.RefreshSessionStoreState,
          { sessionStoreState: newSessionStoreState },
        );
      }
    });
};

export interface RenderElementProps {
  storeState: StoreState,
  sessionStoreState: SessionStoreState,
  settingsFormContext: SettingsFormDefaultValues,
  appActiveContext: AppActiveContext,
  layoutContext: ReactContext,
  layoutValues: LayoutStateValues,
  appActive: AppActiveState,
  notifications: NotificationUI[],
  citationContext: CitationReactContextProps,
  referenceManagerContext: ReferenceManagerContextProps,
  highlightAndAnnotateContext: HighlightAndAnnotateReactContextProps,
}

interface SetupProps {
  stateInterpreterLayout: StateInterpreterLayout,
  stateInterpreterAppActive: StateInterpreterAppActive,
  stateInterpreterSettingsForm: StateInterpreterSettingsForm,
  stateInterpreterCitation: StateInterpreterCitation,
  stateInterpreterReferenceManager: StateInterpreterReferenceManager,
  stateInterpreterHighlightAndAnnotate: StateInterpreterHighlightAndAnnotate,
  RenderElement: (props: RenderElementProps) => any,
}

interface AppActiveContext {
  appActive: AppActiveState,
  appActiveEvent: AppActiveEvent,
  sendAppActiveState: (event: AppActiveEvent) => void,
  storeState: StoreState,
  sessionStoreState: SessionStoreState,
  tabUuid: string,
}

const Setup = ({
  stateInterpreterLayout,
  stateInterpreterAppActive,
  stateInterpreterSettingsForm,
  stateInterpreterCitation,
  stateInterpreterReferenceManager,
  stateInterpreterHighlightAndAnnotate,
  RenderElement,
}: SetupProps): any => {
  /** StateMachineAppActive * */
  const appActive = useSelector(stateInterpreterAppActive, selectAppActive);
  const appActiveEvent = useSelector(stateInterpreterAppActive, selectAppActiveEvent);
  const sendAppActiveState = stateInterpreterAppActive.send as (event: AppActiveEvent) => void;
  const storeState = useSelector(stateInterpreterAppActive, selectStore);
  const sessionStoreState = useSelector(stateInterpreterAppActive, selectSessionStore);
  const tabUuid = useSelector(stateInterpreterAppActive, selectTabUuid);

  /** StateMachineLayout * */
  const layoutValues = useSelector(stateInterpreterLayout, selectLayout);
  const expandedNotifications = useSelector(stateInterpreterLayout, selectExpandedNotifications);
  const notifications = useSelector(stateInterpreterLayout, selectNotifications(sessionStoreState.closedPopupHistory));
  const libraryServices = useSelector(stateInterpreterLayout, selectLibraryServices);
  const modalNotification = useSelector(stateInterpreterLayout, selectModalNotification);

  const layoutEvent = useSelector(stateInterpreterLayout, selectLayoutEvent);
  const sendLayoutState = stateInterpreterLayout.send as (layout: LayoutEvent) => void;

  /** StateMachineSettingsForm */
  const settingsFormValue = useSelector(stateInterpreterSettingsForm, selectSettingsForm);
  const settingsFormEvent = useSelector(stateInterpreterSettingsForm, selectSettingsFormEvent);
  const settingsFormData = useSelector(stateInterpreterSettingsForm, selectSettingsFormData);
  const sendSettingsFormsState = stateInterpreterSettingsForm.send as (event: SettingsFormEvent) => void;

  /* StateMachineCitation */
  const citationValue = useSelector(stateInterpreterCitation, selectCitation);
  const citationData = useSelector(stateInterpreterCitation, selectCitationData);
  const sendCitationState = stateInterpreterCitation.send as (event: CitationEvent) => void;

  /** StateMachineReferenceManager * */
  const referenceManager = useSelector(stateInterpreterReferenceManager, selectReferenceManager);
  const referenceManagerEvent = useSelector(stateInterpreterReferenceManager, selectReferenceManagerEvent);
  const resources = useSelector(stateInterpreterReferenceManager, selectResources);
  const referenceResource = useSelector(stateInterpreterReferenceManager, selectReferenceResource);
  const sendReferenceManagerState = stateInterpreterReferenceManager.send as (event: ReferenceManagerEvent) => void;

  /* StateMachineHighlightAndAnnotate */
  const highlightAndAnnotateValue = useSelector(stateInterpreterHighlightAndAnnotate, selectHighlightAndAnnotate);
  const highlightAndAnnotateData = useSelector(stateInterpreterHighlightAndAnnotate, selectHighlightAndAnnotateData);
  const sendHighlightAndAnnotateState = stateInterpreterHighlightAndAnnotate.send as (event: HighlightAndAnnotateEvent) => void;

  const appActiveContext: AppActiveContext = useMemo(() => ({
    appActive,
    appActiveEvent,
    sendAppActiveState,
    storeState,
    sessionStoreState,
    tabUuid,
  }), [appActive, appActiveEvent, sendAppActiveState, storeState, sessionStoreState, tabUuid]);

  const layoutContext: ReactContext = useMemo(
    () => ({
      layoutValues,
      notifications,
      libraryServices,
      sendLayoutState,
      layoutEvent,
      addToClosedHistory,
      expandedNotifications,
      modalNotification,
    }),
    [
      layoutValues,
      notifications,
      libraryServices,
      sendLayoutState,
      layoutEvent,
      addToClosedHistory,
      expandedNotifications,
      modalNotification,
    ],
  );

  const settingsFormContext: SettingsFormDefaultValues = useMemo(() => ({
    settingsFormValue,
    settingsFormEvent,
    settingsFormData,
    sendSettingsFormsState,
  }), [settingsFormValue, settingsFormEvent, settingsFormData, sendSettingsFormsState]);

  const citationContext: CitationReactContextProps = useMemo(() => ({
    citationValue,
    citationData,
    sendCitationState,
  }), [citationValue, citationData, sendCitationState]);

  const referenceManagerContext: ReferenceManagerContextProps = useMemo(() => ({
    referenceManager,
    referenceManagerEvent,
    resources,
    referenceResource,
    sendReferenceManagerState,
  }), [referenceManager, referenceManagerEvent, resources, referenceResource, sendReferenceManagerState]);

  const highlightAndAnnotateContext: HighlightAndAnnotateReactContextProps = useMemo(() => ({
    highlightAndAnnotateValue,
    highlightAndAnnotateData,
    sendHighlightAndAnnotateState,
  }), [highlightAndAnnotateValue, highlightAndAnnotateData, sendHighlightAndAnnotateState]);

  return RenderElement({
    storeState,
    sessionStoreState,
    settingsFormContext,
    appActiveContext,
    layoutContext,
    layoutValues,
    appActive,
    notifications,
    citationContext,
    referenceManagerContext,
    highlightAndAnnotateContext,
  });
};

export default Setup;
