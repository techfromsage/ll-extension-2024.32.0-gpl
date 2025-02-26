import LayoutState from '@/enums/stateMachine/LayoutState';
import LayoutContext from '@/interfaces/stateMachine/LayoutContext';
import ScreenSize from '@/enums/ui/ScreenSize';
import LayoutEventSchema from './LayoutEventSchema';

/**
 * FeaturesTypeState is used in Xstate to show the shape of the output from the StateMachine.
 *
 * In this instance, we can see that the state machine presents 4 states: access, alternatives, assist and searchEnhancer.
 *
 * It also defines its context (the pool of data available to the state machine).
 *
 * See Xstate docs https://xstate.js.org/docs/guides/typescript.html#typestates
 */
interface LayoutTypeState {
  value: {
    layout: LayoutState,
    openedClosed: LayoutState,
    librarySearch: LayoutState,
    citationModal: LayoutState,
    screenSize: ScreenSize,
  },
  context: LayoutContext,
  event: LayoutEventSchema,
}

export default LayoutTypeState;
