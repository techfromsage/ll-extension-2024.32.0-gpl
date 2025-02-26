import React, { ReactNode, useState, useMemo } from 'react';
import {
  useFloating,
  useTransitionStyles,
  autoUpdate,
  flip,
  shift,
  useHover,
  safePolygon,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
} from '@floating-ui/react';
import { TooltipWrapperContext } from '@/components/KeywordEnhancements/useTooltipWrapperContext';

interface TooltipWrapperOptions {
  initialOpen?: boolean,
  placement?: Placement,
  modal?: boolean,
  open?: boolean,
  onOpenChange?: (open: boolean) => void,
}

export function useTooltipWrapper({
  initialOpen = false,
  placement = 'bottom-start',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipWrapperOptions = {}) {
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
        fallbackAxisSideDirection: 'end',
      }),
      shift({ padding: 5 }),
    ],
  });

  const { context } = data;
  const { isMounted, styles } = useTransitionStyles(context);

  const hover = useHover(context, {
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([hover, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
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

const TooltipWrapper = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode,
} & TooltipWrapperOptions) => {
  const tooltipWrapper = useTooltipWrapper({ modal, ...restOptions });

  return (
    <TooltipWrapperContext.Provider value={tooltipWrapper}>
      {children}
    </TooltipWrapperContext.Provider>
  );
};

export default TooltipWrapper;
