import React, { HTMLProps, forwardRef } from 'react';
import { useMergeRefs, FloatingPortal, FloatingFocusManager } from '@floating-ui/react';
import useTooltipWrapperContext from '@/components/KeywordEnhancements/useTooltipWrapperContext';
import ShadowList from '@/enums/ShadowList';

const TooltipContent = forwardRef<
HTMLDivElement,
HTMLProps<HTMLDivElement>
>((props, propRef) => {
  const { context: floatingContext, ...context } = useTooltipWrapperContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  // this is the shadow root where we will render the tooltip content
  const floatingPortalRoot = document.getElementById(ShadowList.KeywordEnhancementsContainer)
    ?.firstElementChild
    ?.shadowRoot;

  return (
    <FloatingPortal root={floatingPortalRoot as unknown as HTMLElement}>
      {context.isMounted && (
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
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

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
