import React, { HTMLProps, forwardRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import useTooltipWrapperContext from '@/components/KeywordEnhancements/useTooltipWrapperContext';

interface TooltipTriggerProps {
  children: string,
  asChild?: boolean,
  backgroundColor?: string,
}

const TooltipTrigger = forwardRef<
HTMLElement,
HTMLProps<HTMLElement> & TooltipTriggerProps
>(({ backgroundColor = '#000000', children, ...props }, propRef) => {
  const context = useTooltipWrapperContext();
  const ref = useMergeRefs([context.refs.setReference, propRef]);

  return (
    <button
      ref={ref}
      type="button"
      className="tooltip-trigger"
      style={{ backgroundColor }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
