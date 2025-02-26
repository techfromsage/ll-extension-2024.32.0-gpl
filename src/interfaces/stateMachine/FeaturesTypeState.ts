/**
 * FeaturesTypeState is used in Xstate to show the shape of the output from the StateMachine.
 *
 * In this instance, we can see that the state machine presents 4 states: access, alternatives, assist and searchEnhancer.
 *
 * It also defines its context (the pool of data available to the state machine).
 *
 * See Xstate docs https://xstate.js.org/docs/guides/typescript.html#typestates
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';

interface FeaturesTypeState {
  value: {
    [key in Feature]: State;
  },
  context: FeaturesContext,
}

export default FeaturesTypeState;
