import React, { ReactNode, useState, useMemo } from 'react';
import {
  useFloating,
  useTransitionStyles,
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
  offset,
} from '@floating-ui/react';
import { HighlightAndAnnotateWrapperContext } from '@/components/HighlightAndAnnotate/useHighlightAndAnnotateWrapperContext';

interface HighlightAndAnnotateWrapperOptions {
  originalText?: string,
  initialOpen?: boolean,
  placement?: Placement,
  modal?: boolean,
  open?: boolean,
  onOpenChange?: (open: boolean) => void,
}

export function useHighlightAndAnnotateWrapper({
  initialOpen = true,
  placement = 'bottom-end',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: HighlightAndAnnotateWrapperOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift({ padding: 5 }),
      offset(10),
    ],
  });

  const { context } = data;
  const { isMounted, styles } = useTransitionStyles(context);

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  const focusManagerElement = context.refs.floating.current?.parentElement;

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      elements: {
        ...context.elements,
        focusManagerElement,
      },
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
      isMounted,
      styles,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId, isMounted, styles],
  );
}

const HighlightAndAnnotateWrapper = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode,
} & HighlightAndAnnotateWrapperOptions) => {
  const highlightAndAnnotateWrapper = useHighlightAndAnnotateWrapper({ modal, ...restOptions });

  return (
    <HighlightAndAnnotateWrapperContext.Provider value={highlightAndAnnotateWrapper}>
      {children}
    </HighlightAndAnnotateWrapperContext.Provider>
  );
};

export default HighlightAndAnnotateWrapper;
