import {
  assign, createMachine, Interpreter, MachineConfig,
} from 'xstate';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import HighlightAndAnnotateContext from '@/interfaces/stateMachine/HighlightAndAnnotateContext';
import AppMethods from '@/interfaces/browser/AppMethods';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import { store } from '@/store';
import ShadowList from '@/enums/ShadowList';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';
import highlightExistingAnnotation from '@/modules/highlightAndAnnotate/highlightExistingAnnotation';
import replaceSpanWithText from '@/modules/highlightAndAnnotate/helpers/replaceSpanWithText';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';

interface HighlightAndAnnotateStateSchema {
  initial: HighlightAndAnnotateState,
  states: {
    [State in HighlightAndAnnotateState]: Record<string, unknown>
  },
}

export type HighlightAndAnnotateEventSchema = {
  [Event in HighlightAndAnnotateEvent]: {
    type: Event,
    pageData: HighlightAndAnnotatePageData,
    digitalResources: DigitalResource[],
    nonAcademicResources: NonAcademicResource[],
    annotations: Annotation[],
  }
}[HighlightAndAnnotateEvent];

export interface HighlightAndAnnotateTypeState {
  value: HighlightAndAnnotateState,
  context: HighlightAndAnnotateContext,
  event: HighlightAndAnnotateEventSchema,
  history?: HighlightAndAnnotateTypeState,
}

export type StateInterpreterHighlightAndAnnotate = Interpreter<HighlightAndAnnotateContext,
HighlightAndAnnotateStateSchema,
HighlightAndAnnotateEventSchema,
HighlightAndAnnotateTypeState>;

const afterTransitionToInit = [{
  target: HighlightAndAnnotateState.Init,
  delay: 5000,
}];

/**
 * @param onHighlightAndAnnotate
 * @param fetchAnnotations
 * @param saveHighlightedText
 * @param updateAnnotation
 * @param deleteAnnotation
 */
export default (
  onHighlightAndAnnotate: (context: HighlightAndAnnotateContext, event: HighlightAndAnnotateEventSchema) => void,
  fetchAnnotations: AppMethods['contentScript']['fetchAnnotations'],
  saveHighlightedText: AppMethods['contentScript']['saveHighlightedText'],
  updateAnnotation: AppMethods['contentScript']['updateAnnotation'],
  deleteAnnotation: AppMethods['contentScript']['deleteAnnotation'],
/* eslint-disable */
) => {
  const machineConfig: MachineConfig<
  HighlightAndAnnotateContext,
  HighlightAndAnnotateStateSchema,
  HighlightAndAnnotateEventSchema
  > = {
    id: 'StateMachineHighlightAndAnnotate',
    predictableActionArguments: true,
    initial: HighlightAndAnnotateState.Init,
    on: {
      [HighlightAndAnnotateEvent.TurnOff]: {
        target: HighlightAndAnnotateState.TurningOff,
        actions: ['setHighlightAndAnnotateInactive', 'registerListeners'],
      },
      [HighlightAndAnnotateEvent.FetchHighlights]: {
        target: HighlightAndAnnotateState.FetchingHighlights,
        cond: 'IsFetchingPossible',
      },
      [HighlightAndAnnotateEvent.DetermineResources]: { actions: 'updateDigitalResources' },
      [HighlightAndAnnotateEvent.TurnOn]: {
        target: HighlightAndAnnotateState.TurningOn,
        actions: ['setHighlightAndAnnotateActive', 'registerListeners'],
      },
      [HighlightAndAnnotateEvent.UpdateSelection]: { target: HighlightAndAnnotateState.On, actions: 'updateSelection' },
      [HighlightAndAnnotateEvent.SaveHighlightedText]: { target: HighlightAndAnnotateState.SavingHighlightedText },
      [HighlightAndAnnotateEvent.UpdateAnnotation]: { target: HighlightAndAnnotateState.UpdatingAnnotation },
      [HighlightAndAnnotateEvent.DeleteAnnotation]: { target: HighlightAndAnnotateState.DeletingAnnotation },
    },
    states: {
      [HighlightAndAnnotateState.Init]: {
        entry: assign({
          alert: () => [],
        }),
        always: [
          { target: HighlightAndAnnotateState.Off, cond: 'IsSciwheelDisabled' },
          { target: HighlightAndAnnotateState.NoUserSelected, cond: 'IsNoUserSelected' },
          { target: HighlightAndAnnotateState.Off, cond: 'IsHighlightAndAnnotateOff' },
          { target: HighlightAndAnnotateState.On, actions: 'registerListeners' },
        ],
      },
      [HighlightAndAnnotateState.Off]: {},
      [HighlightAndAnnotateState.NoUserSelected]: {},
      [HighlightAndAnnotateState.FetchingHighlights]: {
        invoke: {
          src: context =>
            fetchAnnotations(window.location.href, context.digitalResources[0] || {}, context.nonAcademicResources[0] || {}),
          onDone: [
            {
              target: HighlightAndAnnotateState.Success,
              cond: (_, { data }) => data.status === HighlightAndAnnotateState.Success,
              actions: [
                assign({
                  annotations: (_, { data }) => data.annotations,
                  libraryItemId: (_, { data }) => data.libraryItemId,
                }),
                // paint all the highlighted elements with the selected color
                (_, { data: { annotations } }) => {
                  annotations.forEach((annotation: Annotation) => {
                    highlightExistingAnnotation(annotation);
                  });
                },
              ],
            },
          ],
          onError: {
            target: HighlightAndAnnotateState.Error,
            actions: 'assignErrorAlert',
          },
        },
      },
      [HighlightAndAnnotateState.On]: {},
      [HighlightAndAnnotateState.TurningOff]: {
        after: afterTransitionToInit,
      },
      [HighlightAndAnnotateState.TurningOn]: {
        after: afterTransitionToInit,
      },
      [HighlightAndAnnotateState.Success]: {
        after: afterTransitionToInit,
      },
      [HighlightAndAnnotateState.Error]: {
        after: afterTransitionToInit,
      },
      [HighlightAndAnnotateState.SavingHighlightedText]: {
        invoke: {
          src: (context, { pageData }) =>
            saveHighlightedText(pageData, context.digitalResources[0] || {}, context.nonAcademicResources[0] || {}),
          onDone: [
            {
              target: HighlightAndAnnotateState.Success,
              cond: (_, { data }) => data.status === HighlightAndAnnotateState.Success,
              actions: [
                assign({
                  pageData: (_, { data: { newHighlight } }) => newHighlight,
                 // set message text depending on whether resource has been previously saved
                  alert: ({ libraryItemId }) =>  [{ message: `${libraryItemId ? 'Highlight saved!' : 'Highlight and reference saved!'}`, icon: 'check' }],
                  annotations: ({ annotations }, { data: { newHighlight } }) => [...annotations, newHighlight],
                }),
                // save the id of the highlight to the span, so it doesn't get removed
                (_, { data: { newHighlight } }) => window.document
                  .querySelectorAll(`.${ShadowList.HighlightAndAnnotateElement}`).forEach(element => {
                    const span = element as HTMLSpanElement;
                    if (!span.dataset.id) {
                      span.dataset.id = newHighlight.id;
                    }
                  }),
              ],
            },
            {
              target: HighlightAndAnnotateState.Error,
              cond: (_, { data }) => data.status === HighlightAndAnnotateState.Error,
              actions: 'assignErrorAlert',
            },
          ],
          onError: {
            target: HighlightAndAnnotateState.Error,
            actions: 'assignErrorAlert',
          },
        },
      },
      [HighlightAndAnnotateState.UpdatingAnnotation]: {
        invoke: {
          src: (context, { pageData }) => updateAnnotation(pageData, context.digitalResources[0] || {}),
          onDone: [
            {
              target: HighlightAndAnnotateState.Success,
              cond: (_, { data }) => data.status === HighlightAndAnnotateState.Success,
              actions: [
                assign({
                  alert: [{ message: 'Note saved!', icon: 'check' }],
                  annotations: ({ annotations }, { data: { highlight } }) => annotations.map(
                    annotation => annotation.id === highlight.id ?  highlight : annotation),
                }),
              ],
            },
            {
              target: HighlightAndAnnotateState.Error,
              cond: (_, { data }) => data.status === HighlightAndAnnotateState.Error,
              actions: 'assignErrorAlert',
            },
          ],
          onError: {
            target: HighlightAndAnnotateState.Error,
            actions: 'assignErrorAlert',
          },
        },
      },
      [HighlightAndAnnotateState.DeletingAnnotation]: {
        invoke: {
          src: (context, { pageData }) => deleteAnnotation(pageData, context.digitalResources[0] || {}),
          onDone: [
            {
              target: HighlightAndAnnotateState.Success,
              cond: (_, { data }) => data.status === HighlightAndAnnotateState.Success,
              actions: [
                assign({
                  alert: [{ message: 'Annotation deleted!' }],
                  annotations: ({ annotations }, { data: { annotationId } }) => annotations.filter(annotation => annotation.id !== annotationId),
                }),
                // remove span if it's the one that was deleted
                (_, { data: { annotationId } }) => window.document
                  .querySelectorAll(`.${ShadowList.HighlightAndAnnotateElement}`).forEach(element => {
                    const span = element as HTMLSpanElement;
                    if (span.dataset.id && span.dataset.id === annotationId) {
                      replaceSpanWithText(span);
                    }
                  }),
              ],
            },
            {
              target: HighlightAndAnnotateState.Error,
              cond: (_, { data }) => data.status === HighlightAndAnnotateState.Error,
              actions: 'assignErrorAlert',
            },
          ],
          onError: {
            target: HighlightAndAnnotateState.Error,
            actions: 'assignErrorAlert',
          },
        },
      },
    },
  };

  return createMachine<HighlightAndAnnotateContext, HighlightAndAnnotateEventSchema, HighlightAndAnnotateTypeState>(
    machineConfig,
    {
      guards: {
        IsSciwheelDisabled: ({ appSettings }) => !appSettings.sciwheelEnabled,
        IsNoUserSelected: ({ user }) => !user?.id,
        IsHighlightAndAnnotateOff: ({ appSettings }) => !appSettings.highlightAndAnnotateEnabled,
        IsFetchingPossible: ({ annotations }) => !annotations.length,
      },
      actions: {
        assignErrorAlert: assign({
          alert: [{ type: 'warning', message: 'Something went wrong. Please try again.', icon: 'warning' }],
        }),
        updateSelection: assign({
          pageData: (_, event) => event.pageData,
        }),
        updateDigitalResources: assign({
          digitalResources: ({ digitalResources }, event) => {
            // Data is passed in from invoke
            if ('data' in event && !!event.data) {
              return event.data as DigitalResource[];
            }
            // Data is passed in from send() event
            if ('digitalResources' in event && !!event.digitalResources) {
              return event.digitalResources;
            }
            return digitalResources;
          },
          nonAcademicResources: ({ nonAcademicResources }, event) => {
            // Data is passed in from invoke
            if ('data' in event && !!event.data) {
              return event.data as NonAcademicResource[];
            }
            // Data is passed in from send() event
            if ('nonAcademicResources' in event && !!event.nonAcademicResources) {
              return event.nonAcademicResources;
            }
            return nonAcademicResources;
          },
        }),

        registerListeners: (context, event) => {
          onHighlightAndAnnotate(context, event);
        },

        setHighlightAndAnnotateActive: assign({
          appSettings: () => ({
            ...store.getState().appSettings,
            highlightAndAnnotateEnabled: true,
          }),
          alert: () => [{ message: 'Highlight and note switched ON!', icon: 'check' }],
        }),
        setHighlightAndAnnotateInactive: assign({
          appSettings: () => ({
            ...store.getState().appSettings,
            highlightAndAnnotateEnabled: false,
          }),
          alert: () => [{ message: 'Highlight and note OFF.', button: 'Switch back on' }],
        }),
      },
    },
  );
};
