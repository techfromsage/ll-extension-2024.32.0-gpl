/**
 * initialises the global state machines for content scripts
 */
import { SessionStoreState, StoreState } from '@/store';
import StateMachineSettingsForm, {
  SettingsFormContext,
  StateInterpreterSettingsForm,
} from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import EnabledFormItems from '@/content-script/settingsForm/EnabledFormItems';
import { interpret } from 'xstate';
import onSubmit from '@/content-script/settingsForm/onSubmit';
import consoleDev from '@/dev/consoleDev';
import StateMachineAppActive, { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import StateMachineLayout, { StateInterpreterLayout } from '@/modules/shared/stateMachine/StateMachineLayout';
import browserMethods from '@/browserMethods';
import onAppActive from '@/content-script/listeners/onAppActive';
import InvokeFetchBaseData from '@/modules/shared/stateMachine/actions/InvokeFetchBaseData';
import InvokeFetchInstitutionData from '@/modules/shared/stateMachine/actions/InvokeFetchInstitutionData';
import { v4 as uuidv4 } from 'uuid';
import StateMachineCitation, { StateInterpreterCitation } from '@/modules/shared/stateMachine/StateMachineCitation';
import StateMachineReferenceManager, {
  StateInterpreterReferenceManager,
} from '@/modules/shared/stateMachine/StateMachineReferenceManager';
import onReferenceManager from '@/content-script/listeners/onReferenceManager';
import InvokeUserLogin from '@/modules/shared/stateMachine/actions/InvokeUserLogin';
import InvokeUserSignOut from '@/modules/shared/stateMachine/actions/InvokeUserSignOut';
import StateMachineHighlightAndAnnotate, {
  StateInterpreterHighlightAndAnnotate,
} from '@/modules/shared/stateMachine/StateMachineHighlightAndAnnotate';
import ReferenceManagerContext from '@/interfaces/stateMachine/ReferenceManagerContext';
import Institution from '@/interfaces/Institution';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import onHighlightAndAnnotate from './listeners/onHighlightAndAnnotate';

const RETRY_FETCH_IN_MS = 6_000;

/**
 * State Machine for determining popup/side tray layout.
 * We create a global object, so it's easier to access later when the Layout StateMachine renders
 * the popup/side tray.
 */
const initStateMachineLayout = () => {
  const stateMachineLayout = StateMachineLayout(window.outerWidth);
  return interpret(stateMachineLayout).start() as unknown as StateInterpreterLayout;
};

/**
 * Initialise the state machine for the settings form
 *
 * @param storeState
 */
const initStateMachineSettingsForm = (institutes: Institution[], keywordPackages: KeywordPackage[]) => {
  const context: SettingsFormContext = {
    enabledItems: EnabledFormItems(institutes, keywordPackages),
    alert: [],
  };
  return interpret(StateMachineSettingsForm(context, onSubmit)).start() as unknown as StateInterpreterSettingsForm;
};

/**
 * Callback for when the institutions have been updated and the returned store state
 * needs to be sent to the settings form and reference manager.
 *
 * @param storeState
 */
const onInstitutionsUpdated = (storeState: StoreState) => {
  window.stateInterpreterSettingsForm.send(SettingsFormEvent.InstitutionsUpdated);
  window.stateInterpreterSettingsForm.send(SettingsFormEvent.RefreshStoreState, { storeState });
  window.stateInterpreterReferenceManager.send(ReferenceManagerEvent.RefreshStoreState, { storeState });
};

/**
 * Initialise the state machine for the app active state.
 *
 * @param storeState
 * @param sessionStoreState
 */
const initStateMachineAppActive = (storeState: StoreState, sessionStoreState: SessionStoreState, tabUrl: string) => {
  const { toggleAppActive, fetchBaseData, updateInstitutions } = browserMethods.app.contentScript;
  const stateMachineAppActive = StateMachineAppActive(
    onAppActive,
    InvokeFetchBaseData(fetchBaseData, RETRY_FETCH_IN_MS),
    InvokeFetchInstitutionData(updateInstitutions, RETRY_FETCH_IN_MS, onInstitutionsUpdated),
  );
  return interpret(
    stateMachineAppActive.withContext({
      toggleAppActive,
      currentLocation: new URL(tabUrl),
      storeState,
      sessionStoreState,
      sendLayoutState: window.stateInterpreterLayout.send,
      sendSettingsFormState: window.stateInterpreterSettingsForm.send,
      tabUuid: uuidv4(),
      extensionUrl: new URL(browserMethods.runtime.getURL('/')),
      digitalResourceIds: [],
      reloadCount: 0,
    }),
  ).start()
    .onTransition(newStateValues => {
      consoleDev({
        title: `App State [${newStateValues.value}]`,
        message: JSON.parse(JSON.stringify(newStateValues)),
      });
    }) as unknown as StateInterpreterAppActive;
};

/**
 * Initialise the state machine for citation.
 *
 * @param storeState
 */
const initStateMachineCitation = (citation: StoreState['citation']) => {
  const stateMachineCitation = StateMachineCitation(
    browserMethods.app.contentScript.getFormattedCitation,
  );
  const { styles, recent } = citation;

  // Use APA 7th edition style if available (id 204), if not use default (id 1)
  const defaultStyle = styles.some(stylesArray => stylesArray.some(style => style.id === 204)) ? 204 : 1;

  return interpret(
    stateMachineCitation.withContext({
      citation: '',
      styleId: recent || defaultStyle,
    }),
  ).start()
    .onTransition(newStateValues => {
      consoleDev({
        title: `Citation State [${newStateValues.value}]`,
        message: JSON.parse(JSON.stringify(newStateValues)),
      });
    }) as unknown as StateInterpreterCitation;
};

const initStateMachineReferenceManager = (
  storeState: ReferenceManagerContext['storeState'],
  updateAppActiveStoreState: (storeState: ReferenceManagerContext['storeState']) => void,
  enableHighlightAndAnnotate: () => void,
) => {
  const { fetchUser, signOut } = browserMethods.app.contentScript;
  const stateMachineReferenceManager = StateMachineReferenceManager(
    onReferenceManager,
    InvokeUserLogin(fetchUser, RETRY_FETCH_IN_MS),
    InvokeUserSignOut(signOut),
    updateAppActiveStoreState,
    enableHighlightAndAnnotate,
  );

  return interpret(
    stateMachineReferenceManager.withContext({
      storeState: {
        appSettings: storeState.appSettings,
        user: storeState.user,
        referenceDenyList: storeState.referenceDenyList,
        config: storeState.config,
      },
      resources: {
        digitalResources: [],
        nonAcademicResources: [],
        citedArticles: [],
      },
      currentLocation: window.location,
      referenceResource: undefined,
    }),
  ).start()
    .onTransition(newStateValues => {
      consoleDev({
        title: `Sciwheel State [${newStateValues.value}]`,
        message: JSON.parse(JSON.stringify(newStateValues)),
      });
    }) as unknown as StateInterpreterReferenceManager;
};

const initStateMachineHighlightAndAnnotate = (appSettings: StoreState['appSettings'], user: StoreState['user']) => {
  const stateMachineHighlightAndAnnotate = StateMachineHighlightAndAnnotate(
    onHighlightAndAnnotate,
    browserMethods.app.contentScript.fetchAnnotations,
    browserMethods.app.contentScript.saveHighlightedText,
    browserMethods.app.contentScript.updateAnnotation,
    browserMethods.app.contentScript.deleteAnnotation,
  );

  return interpret(
    stateMachineHighlightAndAnnotate.withContext({
      appSettings,
      user,
      alert: [],
      digitalResources: [],
      nonAcademicResources: [],
      annotations: [],
      libraryItemId: null,
      pageData: {
        color: '',
        page: {
          uri: '',
          title: '',
        },
        selection: {},
      },
    }),
  ).start()
    .onTransition(newStateValues => {
      consoleDev({
        title: `Sciwheel Highlight and annotate State [${newStateValues.value}]`,
        message: JSON.parse(JSON.stringify(newStateValues)),
      });
    }) as unknown as StateInterpreterHighlightAndAnnotate;
};

export default (storeState: StoreState, sessionStoreState: SessionStoreState, tabUrl: string) => {
  window.stateInterpreterLayout = initStateMachineLayout();
  window.stateInterpreterSettingsForm = initStateMachineSettingsForm(storeState.institutes, storeState.keywordPackages);
  window.stateInterpreterAppActive = initStateMachineAppActive(storeState, sessionStoreState, tabUrl);
  window.stateInterpreterCitation = initStateMachineCitation(storeState.citation);
  window.stateInterpreterHighlightAndAnnotate = initStateMachineHighlightAndAnnotate(storeState.appSettings, storeState.user);
  window.stateInterpreterReferenceManager = initStateMachineReferenceManager(
    {
      appSettings: storeState.appSettings,
      user: storeState.user,
      referenceDenyList: storeState.referenceDenyList,
      config: storeState.config,
    },
    (newState: ReferenceManagerContext['storeState']) =>
      window.stateInterpreterAppActive.send(AppActiveEvent.RefreshStoreState, { storeState: newState }),
    () => window.stateInterpreterHighlightAndAnnotate.send(HighlightAndAnnotateEvent.TurnOn),
  );
};
