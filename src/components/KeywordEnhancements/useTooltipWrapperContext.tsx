import {
  createContext, Dispatch, SetStateAction, useContext,
} from 'react';
import { useTooltipWrapper } from './TooltipWrapper';

type ContextType =
  | (ReturnType<typeof useTooltipWrapper> & {
    setLabelId: Dispatch<SetStateAction<string | undefined>>,
    setDescriptionId: Dispatch<SetStateAction<string | undefined>>,
  })
  | null;

export const TooltipWrapperContext = createContext<ContextType>(null);

const useTooltipWrapperContext = () => {
  const context = useContext(TooltipWrapperContext);

  if (!context) {
    throw new Error('TooltipWrapper components must be wrapped in <TooltipWrapper />');
  }

  return context;
};

export default useTooltipWrapperContext;
