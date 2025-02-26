/**
 * StateMachineCitation is used to track the fetching and results of
 * obtaining a formatted citation.
 *
 * We use this info within the React Component to kick off fetching results,
 * and then displaying those results or failure/login messages.
 */
import {
  assign, createMachine, Interpreter, MachineConfig,
} from 'xstate';
import AppMethods from '@/interfaces/browser/AppMethods';
import CitationEvent from '@/enums/stateMachine/CitationEvent';
import CitationState from '@/enums/stateMachine/CitationState';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import { store } from '@/store';

interface CitationStateSchema {
  initial: CitationState,
  states: {
    [CitationState.Init]: Record<string, unknown>,
    [CitationState.Fetching]: Record<string, unknown>,
    [CitationState.Success]: Record<string, unknown>,
    [CitationState.MissingVariables]: Record<string, unknown>,
    [CitationState.Failed]: Record<string, unknown>,
  },
}

export type CitationEventSchema =
    | { type: CitationEvent.ResetCitation, styleId: number, digitalResource: DigitalResource }
    | { type: CitationEvent.GetFormattedCitation, styleId: number, digitalResource: DigitalResource };

export type CitationContext = {
  citation: string,
  styleId: number,
  missingVariables?: string[],
};

export interface CitationTypeState {
  value: CitationState,
  context: CitationContext,
  event: CitationEventSchema,
  done: boolean,
}

export type StateInterpreterCitation = Interpreter<
CitationContext,
CitationStateSchema,
CitationEventSchema,
CitationTypeState
>;

/**
   * @param {string} styleId
   * @param {AppMethods["contentScript"]["getFormattedCitation"]} getFormattedCitation
   */
export default (
  getFormattedCitation: AppMethods['contentScript']['getFormattedCitation'],
) => {
  const machineConfig: MachineConfig<CitationContext, CitationStateSchema, CitationEventSchema> = {
    id: 'StateMachineCitation',
    predictableActionArguments: true,
    context: {
      citation: '',
      styleId: 0,
      missingVariables: [],
    },
    initial: CitationState.Init,
    on: {
      resetCitation: { target: CitationState.Init },
      getFormattedCitation: { target: CitationState.Fetching },
    },
    states: {
      [CitationState.Init]: {},
      [CitationState.Fetching]: {
        invoke: {
          src: (_, { styleId, digitalResource }) => getFormattedCitation(styleId, digitalResource),
          onDone: [
            {
              target: CitationState.Failed,
              cond: (_, { data }) => data.status === CitationState.Failed,
            },
            {
              target: CitationState.MissingVariables,
              cond: (_, { data }) => data.status === CitationState.MissingVariables,
              actions: [
                assign({
                  citation: (_, { data }) => data.citations[0].citation,
                  styleId: (_, { data }) => data.styleId,
                  missingVariables: (_, { data }) => data.citations[0].missingVariables,
                }),
                ({ styleId }) => {
                  store.setState({ citation: { ...store.getState().citation, recent: styleId } });
                },
              ],
            },
            {
              target: CitationState.Success,
              actions: [
                assign({
                  citation: (_, { data }) => data.citations[0].citation,
                  styleId: (_, { data }) => data.styleId,
                  missingVariables: [],
                }),
                ({ styleId }) => {
                  store.setState({ citation: { ...store.getState().citation, recent: styleId } });
                },
              ],
            },
          ],
          onError: CitationState.Failed,
        },
      },
      [CitationState.Failed]: {
        entry: [
          assign({
            citation: '',
            styleId: 0,
            missingVariables: [],
          }),
        ],
      },
      [CitationState.MissingVariables]: {},
      [CitationState.Success]: {},
    },
  };
  return createMachine<CitationContext, CitationEventSchema, CitationTypeState>(machineConfig);
};
