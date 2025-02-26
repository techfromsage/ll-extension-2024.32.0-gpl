/**
 * StateMachineSettingsForm is used to handle UI interactions with the settings form.
 */
import {
  assign, createMachine, Interpreter, MachineConfig,
} from 'xstate';
import SettingsFormState from '@/enums/stateMachine/SettingsFormState';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import { StoreState } from '@/store';
import EnabledFormItems from '@/content-script/settingsForm/EnabledFormItems';

export interface EnabledItems {
  alternatives: {
    article: boolean,
    ebook: boolean,
    openAccess: boolean,
    orderForm: boolean,
  },
  autoRedirect: boolean,
  integrations: {
    scite: boolean,
    citation: boolean,
  },
  keywordEnhancements: boolean,
}

export interface SettingsFormContext {
  enabledItems: EnabledItems,
  alert: string[][],
}

interface SettingsFormStateSchema {
  initial: SettingsFormState.Ready,
  states: {
    [SettingsFormState.Ready]: Record<string, unknown>,
    [SettingsFormState.Pending]: Record<string, unknown>,
    [SettingsFormState.Submitted]: Record<string, unknown>,
  },
}

export type SettingsFormEventSchema =
  | { type: SettingsFormEvent.Submit, name: string, value: string[], withoutRefresh?: boolean }
  | { type: SettingsFormEvent.Init }
  | { type: SettingsFormEvent.InstitutionsUpdated }
  | { type: SettingsFormEvent.AppSettingsUpdated, settingName: string }
  | { type: SettingsFormEvent.RefreshStoreState, storeState: StoreState };

export interface SettingsFormTypeState {
  value: SettingsFormState,
  context: SettingsFormContext,
  event: SettingsFormEventSchema,
}

export type StateInterpreterSettingsForm = Interpreter<SettingsFormContext,
SettingsFormStateSchema,
SettingsFormEventSchema,
SettingsFormTypeState>;

export default (
  initialContext: SettingsFormContext,
  onSubmit: (context: SettingsFormContext, event: SettingsFormEventSchema) => Promise<void>,
) => {
  const machineConfig: MachineConfig<SettingsFormContext, SettingsFormStateSchema, SettingsFormEventSchema> = {
    id: 'StateMachineSettingsForm',
    predictableActionArguments: true,
    context: initialContext,
    initial: SettingsFormState.Ready,
    on: {
      [SettingsFormEvent.Submit]: {
        target: SettingsFormState.Pending,
      },
      [SettingsFormEvent.InstitutionsUpdated]: {
        actions: [
          assign({ alert: () => [['institutions', 'Your institute was updated and saved.']] }),
        ],
      },
      [SettingsFormEvent.AppSettingsUpdated]: {
        actions: assign({
          alert: (_, event) => [[event.settingName, 'Setting updated.']],
        }),
      },
      [SettingsFormEvent.RefreshStoreState]: {
        actions: assign({
          enabledItems: (_, event) => EnabledFormItems(event.storeState.institutes, event.storeState.keywordPackages),
        }),
      },
    },
    states: {
      [SettingsFormState.Ready]: {
        entry: assign({
          alert: () => [],
        }),
      },
      [SettingsFormState.Pending]: {
        invoke: {
          src: onSubmit,
          onDone: { target: SettingsFormState.Submitted },
        },
      },
      [SettingsFormState.Submitted]: {
        after: [{ target: SettingsFormState.Ready, delay: 5000 }],
      },
    },
  };

  return createMachine<SettingsFormContext, SettingsFormEventSchema, SettingsFormTypeState>(machineConfig);
};
