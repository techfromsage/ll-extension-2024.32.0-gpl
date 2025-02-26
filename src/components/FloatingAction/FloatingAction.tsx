import React, { useContext } from 'react';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutState from '@/enums/stateMachine/LayoutState';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import NotificationDot from '@/modules/shared/notifications/NotificationDot';
import Logo from '@/subComponents/Logo/Logo';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import State from '@/enums/State';
import ShadowList from '@/enums/ShadowList';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import WildcardUrlMatch from '@/modules/shared/WildcardUrlMatch';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';

// eslint-disable-next-line complexity
const FloatingAction = () => {
  const url = new URL(document.location.href);
  const { appActive, storeState: { institutes, appSettings, keywordPackages } } = useContext(AppActiveReactContext);
  const { resources, referenceManager } = useContext(ReferenceManagerReactContext);
  const { layoutValues, sendLayoutState, notifications } = useContext(LayoutReactContext);

  const handleLayoutView = () => {
    if (institutes.length) {
      sendLayoutState(LayoutEvent.Notifications);
    } else {
      sendLayoutState(LayoutEvent.Settings);
    }
  };

  const isKeywordPackageDisabled = (keywordsPackage: KeywordPackage) => {
    return !keywordsPackage.resource_links.some(domain => WildcardUrlMatch(url).match(domain));
  };

  const anyKeywordPackageEnabled = !!(keywordPackages.find(keywordPackage => !isKeywordPackageDisabled(keywordPackage)));

  const noActiveFeatures = (): boolean => {
    const librarySearchSupported = layoutValues.librarySearch === LayoutState.LibrarySearchOpened;
    const onlyDisabledStates = notifications
      .every(notification =>
        ([State.NotSupported, State.OnCampusSupported, State.OnCampusNotSupported].includes(notification.state)));
    return !(librarySearchSupported || !onlyDisabledStates || anyKeywordPackageEnabled);
  };

  const { layout, openedClosed } = layoutValues;
  const sidetrayOpen = openedClosed === LayoutState.Opened
    && layout === LayoutState.ReferenceManager;

  if (appActive !== AppActiveState.On || noActiveFeatures() || sidetrayOpen) {
    return <></>;
  }

  // if this returns a string, then we can assume that the user has uploaded a custom logo specifically for the FAB
  const hasUniqueLogo = !!appSettings.customizations.floating_action_button;

  const fabDot = NotificationDot(
    notifications,
    { state: referenceManager, availableReferences: resources.digitalResources.length },
  );

  const classes = [
    'fab',
    `fab--${appSettings.fabPosition}`,
    hasUniqueLogo && 'fab--unique',
    fabDot.active && 'fab--dot',
  ].filter(Boolean);

  return (
    <button
      id={ShadowList.FloatingAction}
      type="button"
      className={classes.join(' ')}
      onClick={() => {
        if (layoutValues.openedClosed === LayoutState.Closed) {
          handleLayoutView();
          sendLayoutState(LayoutEvent.Open);
        } else if (layoutValues.openedClosed === LayoutState.Opened && layoutValues.layout === LayoutState.PopUp) {
          handleLayoutView();
        } else {
          sendLayoutState(LayoutEvent.Close);
        }
      }}
      tabIndex={0}
      aria-label={`Your Library ${institutes[0]?.name}`}
      aria-describedby="fab-screen-reader-description"
      style={{ visibility: 'hidden' }}
    >
      <div id="fab-screen-reader-description" className="screen-reader-only">
        Clicking this will
        {layoutValues.openedClosed === LayoutState.Closed ? 'open' : 'close'}
        the sidebar.
      </div>
      <div
        role="status"
        aria-live="polite"
        className="screen-reader-only"
      >
        {layoutValues.openedClosed === LayoutState.Closed
          ? 'Sidebar Closed'
          : 'Sidebar Open'}
      </div>
      <div className="fab__logo-wrapper">
        <Logo
          src={appSettings.customizations.floating_action_button || InstituteLogo(institutes[0])}
          type="fab"
          alt={`Your Library ${institutes[0]?.name} logo`}
        />
      </div>
    </button>
  );
};

export default FloatingAction;
