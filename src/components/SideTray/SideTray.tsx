/* eslint-disable complexity */
import React, { useContext } from 'react';
import bootstrap from '@bootstrap/index';
import LayoutState from '@/enums/stateMachine/LayoutState';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import Navigation from '@/subComponents/Navigation/Navigation';
import Link from '@/subComponents/Link/Link';
import Loading from '@/components/App/Loading';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import ExpandIcon from '@/icons/ExpandIcon';
import Institution from '@/interfaces/Institution';
import { store } from '@/store';
import withLoadingDelay from '@/components/App/withLoadingDelay';

interface Props {
  children: JSX.Element,
  footer?: JSX.Element,
  isOptions?: boolean,
  showLoading?: boolean,
}

interface IRenderFooter {
  appActive: AppActiveState,
  footer: JSX.Element | undefined,
  referenceManager: ReferenceManagerState,
  institutes: Institution[],
}

const RenderFooter = ({
  appActive, footer, referenceManager, institutes,
}: IRenderFooter) => {
  const storeState = store.getState();
  if (storeState.appSettings.sciwheelEnabled
    && (appActive === AppActiveState.ShowPinTooltipOnboardingTab
    || AppActiveState.ShowSciwheelOnboardingTab)) {
    return null;
  }

  if (referenceManager === ReferenceManagerState.NotSupported) {
    return (
      <div className="footer footer--sidetray footer--referenceManager">
        <a
          href={bootstrap.api.sciwheel.base}
          className="button-tertiary button-inline"
          target="_blank"
          rel="noreferrer"
        >
          <ExpandIcon />
          {' '}
          Sciwheel dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="footer__wrapper">
      {footer}
      <div className="footer footer--sidetray footer--links">
        <Link href="https://technologyfromsage.com/legal/privacy-policy/" text="Privacy Policy" />
        {institutes[0]?.onboardingTutorialUrl
          && <Link href={institutes[0].onboardingTutorialUrl} text="Online tutorial" />}
      </div>
    </div>
  );
};

const SideTray = ({
  children, footer, isOptions, showLoading,
}: Props) => {
  const { referenceManager } = useContext(ReferenceManagerReactContext);
  const { storeState: { institutes }, appActive } = useContext(AppActiveReactContext);
  const { layoutValues } = useContext(LayoutReactContext);
  const { layout, openedClosed } = layoutValues;
  const closing = openedClosed === LayoutState.Closing;

  const classes = [
    'layout',
    'layout--sidetray',
    'layout--fixed',
    `layout--sidetray--${layout}`,
    closing && 'dissolve',
    !closing && 'animate--slide-right',
    isOptions && 'layout--isOptions',
    'flex-column',
  ].filter(Boolean);

  const sidetrayClasses = `layout__content layout__content--sidetray--${layout} flex-column`;

  return (
    <div data-testid={`SideTray-${layout}`} className={classes.join(' ')} data-test-selector="LayoutInner">
      {showLoading && <Loading text="Loading..." asOverlay />}
      {
        [AppActiveState.Init, AppActiveState.DeterminingPage].includes(appActive)
        && <Loading text="🤖 Lean Library is initialising..." asOverlay />
      }
      {appActive === AppActiveState.FetchBaseData && <Loading text="🤖 Fetching base data..." asOverlay />}
      {appActive === AppActiveState.FetchInstitutionData
        && <Loading text="🤖 Setting up institution(s)..." asOverlay />}
      <div className="layout__container flex-column">
        <div className="layout__header layout__header--sidetray">
          { !isOptions && <Navigation type="sidetray" /> }
        </div>
        <div className={sidetrayClasses} data-testid="LayoutContent">
          {children}
        </div>
        <RenderFooter appActive={appActive} footer={footer} referenceManager={referenceManager} institutes={institutes} />
      </div>
    </div>
  );
};

export default withLoadingDelay(SideTray);
