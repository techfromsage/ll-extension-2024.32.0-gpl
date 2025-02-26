import React, { HTMLProps, forwardRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import useHighlightAndAnnotateWrapperContext from '@/components/HighlightAndAnnotate/useHighlightAndAnnotateWrapperContext';

interface HighlightAndAnnotateTriggerProps {
  asChild?: boolean,
  asOverlay?: boolean,
}

const HighlightAndAnnotateTrigger = forwardRef<
HTMLElement,
HTMLProps<HTMLElement> & HighlightAndAnnotateTriggerProps
>(({ ...props }, propRef) => {
  const context = useHighlightAndAnnotateWrapperContext();
  const ref = useMergeRefs([context.refs.setReference, propRef]);
  const { asOverlay, ...restProps } = props;
  const width = asOverlay ? '100%' : 0;

  const classes = [
    'highlight-and-annotate-trigger',
    asOverlay && 'highlight-and-annotate-trigger--overlay',
  ];
  const className = classes.filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      style={{
        width, padding: 0, margin: 0, border: 0,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...context.getReferenceProps(restProps)}
      data-testid="Button-Highlight and annotate trigger"
    />
  );
});

HighlightAndAnnotateTrigger.displayName = 'HighlightAndAnnotateTrigger';

export default HighlightAndAnnotateTrigger;
