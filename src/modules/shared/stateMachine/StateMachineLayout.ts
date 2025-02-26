/**
 * StateMachineLayout is used to track and determine how to show the popup/sidetray.
 * It tracks several states, if the popup/sidetray is:
 * 1. Opened or Closed
 * 2. Which 'view' it is in, i.e. popup, notifications or settings.
 *
 * We use this info within the React Component to decide what to show.
 * Additionally, we then send states BACK to this state machine to change the state.
 *
 * e.g. When the close button is clicked, we send the state update "LayoutEvent.Close"
 * to update the state machine to the closed state.
 */

import {
  assign, createMachine, Interpreter, MachineConfig, StateMachine,
} from 'xstate';
import LayoutState from '@/enums/stateMachine/LayoutState';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutStateSchema from '@/interfaces/stateMachine/LayoutStateSchema';
import LayoutTypeState from '@/interfaces/stateMachine/LayoutTypeState';
import LayoutContext from '@/interfaces/stateMachine/LayoutContext';
import LayoutEventSchema from '@/interfaces/stateMachine/LayoutEventSchema';
import ScreenSize from '@/enums/ui/ScreenSize';
import Layout from '@/enums/stateMachine/Layout';

/**
 * The signature of the running instance Layout State Machine.
 * We use this one to interact with the state machine the most.
 */
export type StateInterpreterLayout = Interpreter<LayoutContext,
LayoutStateSchema,
LayoutEventSchema,
LayoutTypeState>;

/**
 * @param {number} windowWidth
 * @returns {StateMachine<LayoutContext, LayoutStateSchema, LayoutEventSchema, LayoutTypeState>}
 */
export default (windowWidth: number): StateMachine<LayoutContext,
LayoutStateSchema,
LayoutEventSchema,
LayoutTypeState> => {
  const config: MachineConfig<LayoutContext, LayoutStateSchema, LayoutEventSchema> = {
    id: 'StateMachineLayout',
    type: 'parallel',
    predictableActionArguments: true,
    context: {
      notifications: [],
      modalNotification: undefined,
      libraryServices: [],
      windowWidth,
      expandedNotifications: undefined,
      hasOpened: false,
    },
    on: {
      [LayoutEvent.ExpandNotifications]: { actions: 'updateExpandedNotifications' },
    },
    states: {
      [Layout.Layout]: {
        initial: LayoutState.PopUp,
        on: {
          [LayoutEvent.Minimise]: `${Layout.Layout}.${LayoutState.PopUp}`,
          [LayoutEvent.Notifications]: `${Layout.Layout}.${LayoutState.Notifications}`,
          [LayoutEvent.Modal]: { target: `${Layout.Layout}.${LayoutState.Modal}`, actions: 'setModalNotification' },
          [LayoutEvent.Settings]: `${Layout.Layout}.${LayoutState.Settings}`,
          [LayoutEvent.ReferenceManager]: `${Layout.Layout}.${LayoutState.ReferenceManager}`,
        },
        states: {
          [LayoutState.PopUp]: {},
          [LayoutState.Notifications]: {},
          [LayoutState.Settings]: {},
          [LayoutState.ReferenceManager]: {},
          [LayoutState.Modal]: {},
        },
      },
      [Layout.OpenedClosed]: {
        initial: LayoutState.Closed,
        on: {
          [LayoutEvent.Open]: {
            target: `${Layout.OpenedClosed}.${LayoutState.Opened}`,
            actions: ['setNotifications', 'setLibraryServices'],
          },
          [LayoutEvent.Close]: {
            target: `${Layout.OpenedClosed}.${LayoutState.Closing}`,
            actions: ['setNotifications', 'setLibraryServices'],
          },
          [LayoutEvent.AutoOpen]: {
            target: `${Layout.OpenedClosed}.${LayoutState.Opened}`,
            actions: ['setNotifications', 'setLibraryServices'],
            cond: 'HasNotAlreadyOpened',
          },
        },
        states: {
          [LayoutState.Opened]: {
            on: {
              [LayoutEvent.Toggle]: {
                target: LayoutState.Closing,
                actions: ['setNotifications', 'setLibraryServices'],
              },
            },
            entry: ['setHasOpened'],
          },
          [LayoutState.Closing]: {
            after: {
              // after 0.4 seconds, transition to closed
              400: { target: LayoutState.Closed },
            },
          },
          [LayoutState.Closed]: {
            on: {
              [LayoutEvent.Toggle]: {
                target: LayoutState.Opened,
                actions: ['setNotifications', 'setLibraryServices'],
              },
            },
            entry: ['setHasClosed'],
          },
        },
      },
      [Layout.ScreenSize]: {
        initial: ScreenSize.Idle,
        on: {
          [LayoutEvent.WindowResize]: {
            target: `${Layout.ScreenSize}.${LayoutState.Idle}`,
            actions: ['updateWindowWidth'],
          },
        },
        states: {
          [ScreenSize.Idle]: {
            always: [
              { target: ScreenSize.Small, cond: 'IsScreenSizeSmall' },
              { target: ScreenSize.Medium, cond: 'IsScreenSizeMedium' },
              { target: ScreenSize.Large },
            ],
          },
          [ScreenSize.Small]: {},
          [ScreenSize.Medium]: {},
          [ScreenSize.Large]: {},
        },
      },
      [Layout.LibrarySearch]: {
        initial: LayoutState.LibrarySearchClosed,
        on: {
          [LayoutEvent.OpenLibrarySearch]: {
            target: `${Layout.LibrarySearch}.${LayoutState.LibrarySearchOpened}`,
          },
          [LayoutEvent.CloseLibrarySearch]: {
            target: `${Layout.LibrarySearch}.${LayoutState.LibrarySearchClosing}`,
          },
        },
        states: {
          [LayoutState.LibrarySearchClosed]: {},
          [LayoutState.LibrarySearchClosing]: {
            after: {
              // after 0.4 seconds, transition to closed
              400: { target: LayoutState.LibrarySearchClosed },
            },
          },
          [LayoutState.LibrarySearchOpened]: {},
        },
      },
      [Layout.CitationModal]: {
        initial: LayoutState.CitationModalClosed,
        on: {
          [LayoutEvent.OpenCitationModal]: {
            target: `${Layout.CitationModal}.${LayoutState.CitationModalOpened}`,
          },
          [LayoutEvent.CloseCitationModal]: {
            target: `${Layout.CitationModal}.${LayoutState.CitationModalClosing}`,
          },
        },
        states: {
          [LayoutState.CitationModalClosed]: {},
          [LayoutState.CitationModalClosing]: {
            after: {
              // after 0.4 seconds, transition to closed
              400: { target: LayoutState.CitationModalClosed },
            },
          },
          [LayoutState.CitationModalOpened]: {},
        },
      },
    },
  };

  return createMachine<LayoutContext, LayoutEventSchema, LayoutTypeState>(config, {
    actions: {
      setNotifications: assign({
        notifications: (context, event) => ('notifications' in event ? event.notifications : context.notifications),
      }),
      setLibraryServices: assign({
        libraryServices: (context, event) => ('libraryServices' in event ? event.libraryServices : context.libraryServices),
      }),
      updateExpandedNotifications: assign({
        expandedNotifications: (context, event) =>
          ('expandedNotifications' in event ? event.expandedNotifications : context.expandedNotifications),
      }),
      updateWindowWidth: assign({
        windowWidth: (context, event) => ('windowWidth' in event ? event.windowWidth : context.windowWidth),
      }),
      setModalNotification: assign({
        modalNotification: (context, event) =>
          ('modalNotification' in event ? event.modalNotification : context.modalNotification),
      }),
      setHasOpened: assign({
        hasOpened: () => true,
      }),
      setHasClosed: assign({
        hasOpened: () => false,
      }),
    },
    guards: {
      IsScreenSizeSmall: (context: LayoutContext) => context.windowWidth <= 1336,
      IsScreenSizeMedium: (context: LayoutContext) => context.windowWidth > 1336 && context.windowWidth <= 1920,
      HasNotAlreadyOpened: (context: LayoutContext) => !context.hasOpened,
    },
  });
};
