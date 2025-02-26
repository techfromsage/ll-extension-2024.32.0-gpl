/**
 * React Context for providing values from StateMachineCitation.
 */
import { createContext } from 'react';
import CitationState from '@/enums/stateMachine/CitationState';
import CitationEvent from '@/enums/stateMachine/CitationEvent';
import { CitationContext } from '@/modules/shared/stateMachine/StateMachineCitation';

export interface CitationReactContextProps {
  citationValue: CitationState,
  citationData: CitationContext,
  sendCitationState: (value: CitationEvent, payload?: Record<string, any>) => void,
}

const CitationReactContext = createContext<CitationReactContextProps>({
  citationValue: CitationState.Init,
  citationData: {
    styleId: 0,
    citation: '',
  },
  sendCitationState: () => {
    /* Empty default function */
  },
});

export default CitationReactContext;
