import {
  assign, createMachine, Interpreter, MachineConfig,
} from 'xstate';
import { StoreState } from '@/store';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import ReferenceManagerContext from '@/interfaces/stateMachine/ReferenceManagerContext';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import IsReferenceSinglePage from './guards/IsReferenceSinglePage';
import IsReferenceSearchResults from './guards/IsReferenceSearchResults';
import IsReferenceNonAcademicPage from './guards/IsReferenceNonAcademicPage';
import HostnameMatch from '../HostnameMatch';

interface ReferenceManagerStateSchema {
  initial: ReferenceManagerState,
  states: {
    [ReferenceManagerState.Init]: Record<string, unknown>,
    [ReferenceManagerState.Off]: Record<string, unknown>,
    [ReferenceManagerState.NoUserSelected]: Record<string, unknown>,
    [ReferenceManagerState.Login]: Record<string, unknown>,
    [ReferenceManagerState.SignOut]: Record<string, unknown>,
    [ReferenceManagerState.ReferenceSinglePage]: Record<string, unknown>,
    [ReferenceManagerState.ReferenceSearchResults]: Record<string, unknown>,
    [ReferenceManagerState.ReferenceNonAcademic]: Record<string, unknown>,
    [ReferenceManagerState.NotSupported]: Record<string, unknown>,
  },
}

export type ReferenceManagerEventSchema =
  | { type: ReferenceManagerEvent.Init }
  | { type: ReferenceManagerEvent.On }
  | { type: ReferenceManagerEvent.Off }
  | { type: ReferenceManagerEvent.Login }
  | { type: ReferenceManagerEvent.CheckForUserSignIn }
  | { type: ReferenceManagerEvent.SignOut }
  | { type: ReferenceManagerEvent.NoUserSelected }
  | { type: ReferenceManagerEvent.RefreshStoreState, storeState: StoreState }
  | {
    type: ReferenceManagerEvent.DetermineResources,
    resources: ReferenceManagerContext['resources'],
  }
  | { type: ReferenceManagerEvent.CiteGoogleScholar, referenceResource: DigitalResource };

export interface ReferenceManagerTypeState {
  value: ReferenceManagerState,
  context: ReferenceManagerContext,
  event: ReferenceManagerEventSchema,
  history?: ReferenceManagerTypeState,
}

export type StateInterpreterReferenceManager = Interpreter<ReferenceManagerContext,
ReferenceManagerStateSchema,
ReferenceManagerEventSchema,
ReferenceManagerTypeState>;

/**
 * @param onReferenceManager
 * @param fetchBaseData
 */
export default (
  onReferenceManager: (context: ReferenceManagerContext, event: ReferenceManagerEventSchema) => void,
  invokeUserLogin: () => Promise<StoreState>,
  invokeUserSignOut: () => Promise<StoreState>,
  updateAppActiveStoreState: (storeState: ReferenceManagerContext['storeState']) => void,
  enableHighlightAndAnnotate: () => void,
) => {
  const machineConfig: MachineConfig<ReferenceManagerContext, ReferenceManagerStateSchema, ReferenceManagerEventSchema> = {
    id: 'StateMachineReferenceManager',
    predictableActionArguments: true,
    initial: ReferenceManagerState.Init,
    on: {
      [ReferenceManagerEvent.On]: { target: ReferenceManagerState.Init, actions: 'setReferenceManagerActive' },
      [ReferenceManagerEvent.Off]: { target: ReferenceManagerState.Off, actions: 'setReferenceManagerInactive' },
      [ReferenceManagerEvent.CheckForUserSignIn]: { target: ReferenceManagerState.Login, cond: 'IsNoUserSelected' },
      [ReferenceManagerEvent.Login]: { target: ReferenceManagerState.Login },
      [ReferenceManagerEvent.SignOut]: { target: ReferenceManagerState.SignOut },
      [ReferenceManagerEvent.RefreshStoreState]: {
        target: ReferenceManagerState.Init,
        actions: ['updateStoreState'],
      },
      [ReferenceManagerEvent.DetermineResources]: { target: ReferenceManagerState.Init, actions: 'updateResources' },
      [ReferenceManagerEvent.NoUserSelected]: {
        target: ReferenceManagerState.NoUserSelected,
        actions: 'updateResources',
      },
      [ReferenceManagerEvent.CiteGoogleScholar]: {
        target: ReferenceManagerState.ReferenceSinglePage,
        actions: 'setReferenceResource',
      },
    },
    states: {
      [ReferenceManagerState.Init]: {
        always: [
          { target: ReferenceManagerState.Off, cond: 'IsReferenceManagerOff' },
          { target: ReferenceManagerState.NoUserSelected, cond: 'IsNoUserSelected' },
          { target: ReferenceManagerState.NotSupported, cond: 'IsDenied' },
          { target: ReferenceManagerState.ReferenceSinglePage, cond: 'IsReferenceSinglePage' },
          { target: ReferenceManagerState.ReferenceSearchResults, cond: 'IsReferenceSearchResults' },
          { target: ReferenceManagerState.ReferenceNonAcademic, cond: 'IsReferenceNonAcademicPage' },
          { target: ReferenceManagerState.NotSupported },
        ],
      },
      [ReferenceManagerState.Off]: {},
      [ReferenceManagerState.NoUserSelected]: {},
      [ReferenceManagerState.Login]: {
        invoke: {
          id: 'invokeUserLogin',
          src: invokeUserLogin,
          onDone: {
            target: ReferenceManagerState.Init,
            actions: [
              'updateStoreState',
              'updateAppActiveStoreState',
              'enableHighlightAndAnnotate',
            ],
          },
        },
      },
      [ReferenceManagerState.SignOut]: {
        invoke: {
          src: invokeUserSignOut,
          onDone: { target: ReferenceManagerState.Init, actions: ['updateStoreState'] },
        },
      },
      [ReferenceManagerState.ReferenceSinglePage]: {},
      [ReferenceManagerState.ReferenceSearchResults]: {},
      [ReferenceManagerState.ReferenceNonAcademic]: {},
      [ReferenceManagerState.NotSupported]: {},
    },
  };

  return createMachine<ReferenceManagerContext, ReferenceManagerEventSchema, ReferenceManagerTypeState>(
    machineConfig,
    {
      guards: {
        IsReferenceManagerOff: ({ storeState }) => !storeState.appSettings.sciwheelEnabled,
        IsNoUserSelected: ({ storeState }) => !storeState.user?.id,
        IsReferenceSinglePage,
        IsReferenceSearchResults,
        IsReferenceNonAcademicPage,
        IsDenied: ({ storeState, currentLocation }) =>
          storeState.referenceDenyList.some((domain: string) =>
            HostnameMatch(currentLocation.hostname).match({ domain, strict: false })),
      },
      actions: {
        onReferenceManager,
        updateStoreState: assign({
          storeState: ({ storeState }, event) => {
            // Data is passed in from invoke
            if ('data' in event && !!event.data) {
              return event.data as StoreState;
            }
            // Data is passed in from send() event
            if ('storeState' in event && !!event.storeState) {
              return event.storeState;
            }
            return storeState;
          },
        }),
        updateResources: assign({
          resources: ({ resources }, event) => {
            // Data is passed in from invoke
            if ('data' in event && !!event.data) {
              return event.data as ReferenceManagerContext['resources'];
            }
            // Data is passed in from send() event
            if ('resources' in event && !!event.resources) {
              return event.resources;
            }
            return resources;
          },
        }),
        updateAppActiveStoreState: ({ storeState }) => updateAppActiveStoreState(storeState),
        setReferenceResource: assign({
          referenceResource: (context, event) =>
            ('referenceResource' in event ? event.referenceResource : context.referenceResource),
        }),
        enableHighlightAndAnnotate: () => enableHighlightAndAnnotate(),
        setReferenceManagerActive: assign({}),
        setReferenceManagerInactive: assign({}),
      },
    },
  );
};
