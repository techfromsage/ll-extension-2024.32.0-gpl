/**
 * StateMachineKeywordEnhancements is used to track the rendering of
 * each KeywordEnhancements package.
 *
 * We use this info within the page to start looping through the
 * packages, and then highlighting keywords from it.
 */
import {
  assign, createMachine, Interpreter, MachineConfig,
} from 'xstate';
import KeywordEnhancementsState from '@/enums/stateMachine/KeywordEnhancementsState';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import KeywordEnhancementsEvent from '@/enums/stateMachine/KeywordEnhancementsEvent';

interface KeywordEnhancementsStateSchema {
  initial: KeywordEnhancementsState,
  states: {
    [KeywordEnhancementsState.Init]: Record<string, unknown>,
    [KeywordEnhancementsState.Off]: Record<string, unknown>,
    [KeywordEnhancementsState.On]: Record<string, unknown>,
  },
}

export type KeywordEnhancementsEventSchema = { type: KeywordEnhancementsEvent };

export type KeywordEnhancementsContext = {
  keywordPackage: KeywordPackage,
  enabled: boolean,
};

export interface KeywordEnhancementsTypeState {
  value: KeywordEnhancementsState,
  context: KeywordEnhancementsContext,
  done: boolean,
}

export type StateInterpreterKeywordEnhancements = Interpreter<
KeywordEnhancementsContext,
KeywordEnhancementsStateSchema,
KeywordEnhancementsEventSchema,
KeywordEnhancementsTypeState>;

/**
 * @param keywordPackage
 * @param enabled
 */
export default (keywordPackage: KeywordPackage, enabled: boolean) => {
  const machineConfig: MachineConfig<
  KeywordEnhancementsContext,
  KeywordEnhancementsStateSchema,
  KeywordEnhancementsEventSchema
  > = {
    id: `StateMachineKeywordEnhancements-${keywordPackage.uuid}`,
    predictableActionArguments: true,
    context: { keywordPackage, enabled },
    initial: KeywordEnhancementsState.Init,
    states: {
      [KeywordEnhancementsState.Init]: {
        always: [
          { target: KeywordEnhancementsState.On, cond: 'IsEnabled' },
          { target: KeywordEnhancementsState.Off },
        ],
      },
      [KeywordEnhancementsState.Off]: {
        on: {
          [KeywordEnhancementsEvent.TurnOn]: { target: KeywordEnhancementsState.On, actions: 'setEnabledTrue' },
        },
      },
      [KeywordEnhancementsState.On]: {
        on: {
          [KeywordEnhancementsEvent.TurnOff]: { target: KeywordEnhancementsState.Off, actions: 'setEnabledFalse' },
        },
      },
    },
  };

  return createMachine<KeywordEnhancementsContext, KeywordEnhancementsEventSchema, KeywordEnhancementsTypeState>(machineConfig, {
    guards: {
      IsEnabled: context => context.enabled,
    },
    actions: {
      setEnabledTrue: assign({ enabled: () => true }),
      setEnabledFalse: assign({ enabled: () => false }),
    },
  });
};
