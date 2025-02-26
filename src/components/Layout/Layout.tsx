import React, { useContext, useEffect } from 'react';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutState from '@/enums/stateMachine/LayoutState';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import LayoutContent from '@/components/Layout/LayoutContent';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import ShadowList from '@/enums/ShadowList';

/**
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = () => {
  const { layoutValues, layoutEvent, sendLayoutState } = useContext(LayoutReactContext);
  const { storeState: { appSettings } } = useContext(AppActiveReactContext);

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!focused && layoutEvent.type !== LayoutEvent.AutoOpen) {
      return;
    }

    if (event.key === 'Escape') {
      const eventToSend = layoutValues.citationModal === LayoutState.CitationModalOpened
        ? LayoutEvent.CloseCitationModal
        : LayoutEvent.Close;
      sendLayoutState(eventToSend);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const extensionElement = target.offsetParent?.id === ShadowList.Wrapper
    || target.id === ShadowList.DevTrigger
    || target.id === ShadowList.Wrapper;
    if (!extensionElement && layoutValues.openedClosed === LayoutState.Opened) {
      sendLayoutState(LayoutEvent.Close);
    }

    // close the citation modal if the user clicks outside of it (on the backdrop)
    const shadowElement = event?.composedPath()?.[0] as HTMLElement;
    if (
      extensionElement
      && layoutValues.citationModal === LayoutState.CitationModalOpened
      && shadowElement?.id === ShadowList.LayoutBackdrop
    ) {
      sendLayoutState(LayoutEvent.CloseCitationModal);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [layoutValues, focused]);

  if (layoutValues.openedClosed === LayoutState.Closed) {
    return <></>;
  }

  return (
    <div
      className={`${layoutValues.screenSize} ${focused ? 'focused' : ''} layout__wrapper`}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      data-testid="Layout"
      style={{ display: 'none' }}
    >
      <div className={appSettings.customTextSize}>
        <LayoutContent />
      </div>
    </div>
  );
};

export default Layout;
