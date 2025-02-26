import {
  assign, createMachine, Interpreter, MachineConfig,
} from 'xstate';
import merge from 'lodash.merge';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import AppActiveContext from '@/interfaces/stateMachine/AppActiveContext';
import { SessionStoreState, StoreState } from '@/store';
import HostnameMatch from '@/modules/shared/HostnameMatch';
import clearPageFeatures from '@/content-script/listeners/clearPageFeatures';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import isSciwheelTutorialShown from './guards/isSciwheelTutorialShown';
import isPinTooltipTutorialShown from './guards/isPinTooltipTutorialShown';
import IsOptionsPage from './IsOptionsPage';

const RETRY_LOADING_IN_MS = 8_000;
const MAX_RELOAD_COUNT = 10;

interface AppStateSchema {
  initial: AppActiveState,
  states: {
    [AppActiveState.Init]: Record<string, unknown>,
    [AppActiveState.FetchBaseData]: Record<string, unknown>,
    [AppActiveState.FetchInstitutionData]: Record<string, unknown>,
    [AppActiveState.NoInstitutionsSelected]: Record<string, unknown>,
    [AppActiveState.DeterminingPage]: Record<string, unknown>,
    [AppActiveState.GlobalDeny]: Record<string, unknown>,
    [AppActiveState.Loading]: Record<string, unknown>,
    [AppActiveState.On]: Record<string, unknown>,
    [AppActiveState.Off]: Record<string, unknown>,
    [AppActiveState.ShowPinTooltipOnboardingTab]: Record<string, unknown>,
    [AppActiveState.ShowSciwheelOnboardingTab]: Record<string, unknown>,
  },
}

export type AppEventSchema =
  | { type: AppActiveEvent.Init }
  | { type: AppActiveEvent.On }
  | { type: AppActiveEvent.Off }
  | { type: AppActiveEvent.Toggle }
  | { type: AppActiveEvent.RedeterminePage }
  | { type: AppActiveEvent.RefreshStoreState, storeState: StoreState }
  | { type: AppActiveEvent.RefreshSessionStoreState, sessionStoreState: SessionStoreState }
  | { type: AppActiveEvent.UpdateInstitutions, institutionIds: string[] }
  | { type: AppActiveEvent.ShowPinTooltipOnboardingTab }
  | { type: AppActiveEvent.ShowSciwheelOnboardingTab }
  | { type: AppActiveEvent.StoreDigitalResourceIds, digitalResources: DigitalResource[] };

export interface AppTypeState {
  value: AppActiveState,
  context: AppActiveContext,
  event: AppEventSchema,
  history?: AppTypeState,
}

export type StateInterpreterAppActive = Interpreter<AppActiveContext,
AppStateSchema,
AppEventSchema,
AppTypeState>;

/**
 * @param onAppActive
 * @param fetchBaseData
 * @param fetchInstitutionData
 */
export default (
  onAppActive: (context: AppActiveContext, event: AppEventSchema) => Promise<void>,
  invokeFetchBaseDataAction: () => Promise<StoreState>,
  invokeFetchInstitutionDataAction: (_: unknown, event: AppEventSchema) => Promise<StoreState>,
) => {
  const machineConfig: MachineConfig<AppActiveContext, AppStateSchema, AppEventSchema> = {
    id: 'StateMachineAppActive',
    predictableActionArguments: true,
    initial: AppActiveState.Init,
    on: {
      [AppActiveEvent.On]: { target: AppActiveState.On, actions: 'setAppActive' },
      [AppActiveEvent.Off]: { target: AppActiveState.Off, actions: 'setAppInactive' },
      [AppActiveEvent.RefreshStoreState]: { target: AppActiveState.Init, actions: 'updateStoreState' },
      [AppActiveEvent.RefreshSessionStoreState]: { target: AppActiveState.Init, actions: 'updateSessionStoreState' },
      [AppActiveEvent.RedeterminePage]: { target: AppActiveState.DeterminingPage },
      [AppActiveEvent.UpdateInstitutions]: { target: AppActiveState.FetchInstitutionData },
      [AppActiveEvent.StoreDigitalResourceIds]: { actions: 'storeDigitalResourceIds' },
    },
    states: {
      [AppActiveState.FetchBaseData]: {
        invoke: {
          src: invokeFetchBaseDataAction,
          onDone: { target: AppActiveState.Init, actions: 'updateStoreState' },
        },
      },
      [AppActiveState.FetchInstitutionData]: {
        invoke: {
          src: invokeFetchInstitutionDataAction,
          onDone: { target: AppActiveState.Init, actions: 'updateStoreState' },
          onError: { target: AppActiveState.Init },
        },
      },
      [AppActiveState.Init]: {
        always: [
          { target: AppActiveState.Loading, cond: 'IsHydrating' },
          { target: AppActiveState.FetchBaseData, cond: 'IsNoBaseData' },
          {
            target: AppActiveState.NoInstitutionsSelected,
            cond: 'IsNoInstitutionsSelected',
            actions: 'clearPageFeatures',
          },
          {
            target: AppActiveState.ShowPinTooltipOnboardingTab,
            cond: 'IsPinTooltipTutorialShown',
          },
          {
            target: AppActiveState.ShowSciwheelOnboardingTab,
            cond: 'IsSciwheelTutorialShown',
          },
          { target: AppActiveState.DeterminingPage },
        ],
      },
      [AppActiveState.ShowPinTooltipOnboardingTab]: {},
      [AppActiveState.ShowSciwheelOnboardingTab]: {},
      [AppActiveState.DeterminingPage]: {
        always: [
          { target: AppActiveState.Off, cond: 'IsAppOff' },
          { target: AppActiveState.GlobalDeny, cond: 'IsDenied' },
          { target: AppActiveState.Loading, cond: 'IsDeterminingAvailableFeatures', actions: 'incrementReloadCount' },
          { target: AppActiveState.On },
        ],
      },
      [AppActiveState.NoInstitutionsSelected]: {},
      [AppActiveState.GlobalDeny]: {},
      [AppActiveState.Loading]: {
        invoke: {
          src: onAppActive,
          onDone: { target: AppActiveState.On },
          onError: { target: AppActiveState.DeterminingPage },
        },
        after: {
          [RETRY_LOADING_IN_MS]: { target: AppActiveState.DeterminingPage },
        },
      },
      [AppActiveState.Off]: {
        on: { [AppActiveEvent.Toggle]: { target: AppActiveState.DeterminingPage, actions: 'setAppActive' } },
      },
      [AppActiveState.On]: {
        entry: ['resetReloadCount'],
        on: { [AppActiveEvent.Toggle]: { target: AppActiveState.DeterminingPage, actions: 'setAppInactive' } },
      },
    },
  };

  return createMachine<AppActiveContext, AppEventSchema, AppTypeState>(
    machineConfig,
    {
      guards: {
        IsHydrating: ({ storeState }) => !!storeState && !storeState._hasHydrated,
        IsNoBaseData: ({ storeState }) => !storeState.institutionsList.length,
        IsNoInstitutionsSelected: ({ storeState }) => !storeState.institutes.length,
        IsPinTooltipTutorialShown: ({ storeState, currentLocation, extensionUrl }) =>
          isPinTooltipTutorialShown(
            currentLocation,
            extensionUrl,
            storeState.appSettings.showPinTooltipTutorialTab,
            storeState.institutes.length,
          ),
        IsSciwheelTutorialShown: ({ storeState, currentLocation, extensionUrl }) =>
          isSciwheelTutorialShown(
            currentLocation,
            extensionUrl,
            storeState?.user?.firstName,
            storeState.appSettings.showSciwheelTutorialTab,
            storeState.appSettings.sciwheelEnabled,
            storeState.institutes.length,
          ),
        IsAppOff: ({ storeState }) => !!storeState.institutes.length
          && !storeState.appActive,
        IsDenied: ({ storeState, currentLocation }) =>
          storeState.globalDenylist.some((domain: string) =>
            HostnameMatch(currentLocation.hostname).match({ domain, strict: false })),
        IsDeterminingAvailableFeatures: ({
          storeState, currentLocation, extensionUrl, reloadCount,
        }) =>
          reloadCount < MAX_RELOAD_COUNT
          && !IsOptionsPage(currentLocation, extensionUrl)
          && storeState.institutes.length > 0
          && storeState.appActive,
      },
      actions: {
        incrementReloadCount: assign({
          reloadCount: ({ reloadCount }) => reloadCount + 1,
        }),
        resetReloadCount: assign({
          reloadCount: 0,
        }),
        setAppActive: assign({
          storeState: ({ toggleAppActive, storeState }) => {
            toggleAppActive(true);
            return merge(storeState, { appActive: true });
          },
        }),
        setAppInactive: assign({
          storeState: ({ toggleAppActive, storeState }) => {
            toggleAppActive(false);
            return merge(storeState, { appActive: false });
          },
        }),
        onAppActive,
        clearPageFeatures,
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

        updateSessionStoreState: assign({
          sessionStoreState: ({ sessionStoreState }, event) => {
            // Data is passed in from send() event
            if ('sessionStoreState' in event && !!event.sessionStoreState) {
              return event.sessionStoreState;
            }
            return sessionStoreState;
          },
        }),
        storeDigitalResourceIds: assign({
          digitalResourceIds: ({ digitalResourceIds }, event) => {
            if (!('digitalResources' in event)) {
              return digitalResourceIds;
            }
            // Check this is a valid event
            if (!event.digitalResources) {
              return [];
            }
            const ids = new Set(event.digitalResources.map(resource => resource.identifier));
            return Array.from(ids);
          },
        }),
      },
    },
  );
};
