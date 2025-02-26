/**
 * React Context for providing values from StateMachineHighlightAndAnnotate.
 */
import { createContext } from 'react';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import HighlightAndAnnotateContext from '@/interfaces/stateMachine/HighlightAndAnnotateContext';
import { StoreState } from '@/store';

export interface HighlightAndAnnotateReactContextProps {
  highlightAndAnnotateValue: HighlightAndAnnotateState,
  highlightAndAnnotateData: HighlightAndAnnotateContext,
  sendHighlightAndAnnotateState: (value: HighlightAndAnnotateEvent, payload?: Record<string, any>) => void,
}

const HighlightAndAnnotateReactContext = createContext<HighlightAndAnnotateReactContextProps>({
  highlightAndAnnotateValue: HighlightAndAnnotateState.Init,
  highlightAndAnnotateData: {
    appSettings: {} as StoreState['appSettings'],
    user: {} as StoreState['user'],
    alert: [],
    digitalResources: [],
    nonAcademicResources: [],
    annotations: [],
    libraryItemId: null,
    pageData: {
      color: '',
      page: {
        uri: '',
        title: '',
      },
      selection: {},
    },
  },
  sendHighlightAndAnnotateState: () => {
    /* Empty default function */
  },
});

export default HighlightAndAnnotateReactContext;
