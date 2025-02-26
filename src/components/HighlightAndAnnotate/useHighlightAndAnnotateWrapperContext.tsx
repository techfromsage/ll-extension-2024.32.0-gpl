import {
  createContext, Dispatch, SetStateAction, useContext,
} from 'react';
import { useHighlightAndAnnotateWrapper } from './HighlightAndAnnotateWrapper';

type ContextType =
  | (ReturnType<typeof useHighlightAndAnnotateWrapper> & {
    setLabelId: Dispatch<SetStateAction<string | undefined>>,
    setDescriptionId: Dispatch<SetStateAction<string | undefined>>,
  })
  | null;

export const HighlightAndAnnotateWrapperContext = createContext<ContextType>(null);

const useHighlightAndAnnotateWrapperContext = () => {
  const context = useContext(HighlightAndAnnotateWrapperContext);

  if (!context) {
    throw new Error('HighlightAndAnnotateWrapper components must be wrapped in <HighlightAndAnnotateWrapper />');
  }

  return context;
};

export default useHighlightAndAnnotateWrapperContext;
