/**
 * React Context for providing values from StateMachineAppActive.
 */
import { createContext } from 'react';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import { StoreState } from '@/store';

interface ReactContext {
  appActive: AppActiveState,
  appActiveEvent: AppActiveEvent,
  storeState: StoreState,
  sendAppActiveState: (value: AppActiveEvent, payload?: Record<string, any>) => void,
  tabUuid: string,
}

const AppActiveReactContext = createContext<ReactContext>({
  appActive: AppActiveState.On,
  appActiveEvent: AppActiveEvent.Init,
  storeState: {} as StoreState,
  tabUuid: '',
  sendAppActiveState: () => {
    /* Empty default function */
  },
});

export default AppActiveReactContext;
