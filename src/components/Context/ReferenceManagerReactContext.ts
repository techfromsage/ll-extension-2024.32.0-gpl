/**
 * React Context for providing values from StateMachineReferenceManager.
 */
import { createContext } from 'react';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ReferenceManagerContext from '@/interfaces/stateMachine/ReferenceManagerContext';

export interface ReferenceManagerContextProps {
  referenceManager: ReferenceManagerState,
  referenceManagerEvent: ReferenceManagerEvent,
  resources: ReferenceManagerContext['resources'],
  referenceResource: DigitalResource | undefined,
  sendReferenceManagerState: (value: ReferenceManagerEvent, payload?: Record<string, any>) => void,
}

const ReferenceManagerReactContext = createContext<ReferenceManagerContextProps>({
  referenceManager: ReferenceManagerState.Init,
  referenceManagerEvent: ReferenceManagerEvent.Init,
  resources: {
    digitalResources: [],
    nonAcademicResources: [],
    citedArticles: [],
  },
  referenceResource: undefined,
  sendReferenceManagerState: () => {
    /* Empty default function */
  },
});

export default ReferenceManagerReactContext;
