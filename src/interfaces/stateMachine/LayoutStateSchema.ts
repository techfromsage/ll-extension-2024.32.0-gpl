import Layout from '@/enums/stateMachine/Layout';
import LayoutState from '@/enums/stateMachine/LayoutState';
import ScreenSize from '@/enums/ui/ScreenSize';

/**
 * LayoutStateSchema maps out all the different allowed states the StateMachineLayout can get into.
 *
 * It's like an overview of the states for the state machine.
 */
interface LayoutStateSchema {
  states: {
    [Layout.Layout]: {
      initial: LayoutState,
      states: {
        [LayoutState.PopUp]: Record<string, unknown>,
        [LayoutState.Notifications]: Record<string, unknown>,
        [LayoutState.Settings]: Record<string, unknown>,
        [LayoutState.ReferenceManager]: Record<string, unknown>,
        [LayoutState.Modal]: Record<string, unknown>,
      },
    },
    [Layout.OpenedClosed]: {
      initial: LayoutState,
      states: {
        [LayoutState.Opened]: Record<string, unknown>,
        [LayoutState.Closing]: Record<string, unknown>,
        [LayoutState.Closed]: Record<string, unknown>,
      },
    },
    [Layout.ScreenSize]: {
      initial: ScreenSize,
      states: {
        [ScreenSize.Idle]: Record<string, unknown>,
        [ScreenSize.Small]: Record<string, unknown>,
        [ScreenSize.Medium]: Record<string, unknown>,
        [ScreenSize.Large]: Record<string, unknown>,
      },
    },
    [Layout.LibrarySearch]: {
      initial: LayoutState,
      states: {
        [LayoutState.LibrarySearchOpened]: Record<string, unknown>,
        [LayoutState.LibrarySearchClosed]: Record<string, unknown>,
        [LayoutState.LibrarySearchClosing]: Record<string, unknown>,
      },
    },
    [Layout.CitationModal]: {
      initial: LayoutState,
      states: {
        [LayoutState.CitationModalOpened]: Record<string, unknown>,
        [LayoutState.CitationModalClosed]: Record<string, unknown>,
        [LayoutState.CitationModalClosing]: Record<string, unknown>,
      },
    },
  },
}

export default LayoutStateSchema;
