import React, { HTMLProps, forwardRef, useEffect } from 'react';
import { useMergeRefs, FloatingPortal, FloatingFocusManager } from '@floating-ui/react';
import ShadowList from '@/enums/ShadowList';
import useHighlightAndAnnotateWrapperContext from '@/components/HighlightAndAnnotate/useHighlightAndAnnotateWrapperContext';
import replaceSpanWithText from '@/modules/highlightAndAnnotate/helpers/replaceSpanWithText';

const HighlightAndAnnotateContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, propRef) => {
  const {
    elements: { focusManagerElement },
    context: floatingContext, ...context
  } = useHighlightAndAnnotateWrapperContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  useEffect(() => {
    // reset the span if the user didn't select a color
    if (!context.open) {
      // remove all highlight spans and leave the text
      window.document.querySelectorAll(`.${ShadowList.HighlightAndAnnotateElement}`).forEach(element => {
        const span = element as HTMLSpanElement;
        if (!span.dataset.id) {
          replaceSpanWithText(span);
          // remove the tooltip
          focusManagerElement?.remove();
        }
      });
    }
  }, [context.open]);

  // This is the shadow root where we will render the color palette and input note
  // We will use Floating portal to display the content right below the highlighted text
  const floatingPortalRoot = document.getElementById(ShadowList.HighlightAndAnnotateContainer)
    ?.firstElementChild
    ?.shadowRoot;

  return (
    <FloatingPortal root={floatingPortalRoot as unknown as HTMLElement}>
      {context.isMounted && (
        <FloatingFocusManager
          context={floatingContext}
          modal={context.modal}
          returnFocus
          order={['reference', 'floating', 'content']}
        >
          <div
            ref={ref}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              zIndex: 999999,
              width: 'max-content',
              ...context.styles,
            }}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
});

HighlightAndAnnotateContent.displayName = 'HighlightAndAnnotateContent';

export default HighlightAndAnnotateContent;
