import React, { useContext } from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import PopupAutoClose from '@/components/Popup/PopupAutoClose';
import PopupContent from '@/components/Popup/PopupContent';
import Logo from '@/subComponents/Logo/Logo';
import Footer from '@/subComponents/Footer/Footer';
import Content from '@/modules/shared/Content';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import Navigation from '@/subComponents/Navigation/Navigation';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import ManageDomain from '@/components/SideTray/ManageDomain';
import ManagedDomain from '@/modules/shared/notifications/ManagedDomain';
import LayoutState from '@/enums/stateMachine/LayoutState';
import CitationModal from '@/components/Citation/CitationModal';

interface Props {
  notification: NotificationUI,
  closing: boolean,
  isToolbar?: boolean,
  hideHomeIcon?: boolean,
  close?: () => void,
}

/**
 * @param {NotificationUI} notification
 * @param {boolean} closed
 * @returns {JSX.Element}
 * @constructor
 */
// eslint-disable-next-line complexity
const Popup = ({
  notification,
  closing,
  isToolbar = false,
  hideHomeIcon,
  close,
}: Props) => {
  const { appActive, storeState } = useContext(AppActiveReactContext);
  const { institutes, appSettings } = storeState;
  const { layoutEvent, layoutValues, addToClosedHistory } = useContext(LayoutReactContext);
  const { openedClosed, citationModal } = layoutValues;
  const { domain, isBlocked } = ManagedDomain(appSettings, window.location.hostname);

  const onClose = () => {
    addToClosedHistory(notification);
    if (close) {
      close();
    }
  };

  const classes = [
    'layout',
    'layout--popup',
    !isToolbar && 'layout--fixed',
    layoutEvent.type === LayoutEvent.Toggle && openedClosed === LayoutState.Closing && 'animate--slide-up',
    layoutEvent.type === LayoutEvent.Toggle && openedClosed === LayoutState.Opened && 'animate--slide-down',
    closing && 'dissolve',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        data-testid="Popup"
        data-test-selector="LayoutInner"
        data-state={notification?.state}
        data-feature={notification?.feature}
        className={classes}
      >
        <div className="layout__container">
          <PopupAutoClose notification={notification}>
            <div className="layout__header layout__header--popup">
              <Navigation type="popup" onClose={() => onClose()} hideHomeIcon={hideHomeIcon} />
            </div>
            <div className="layout__content layout__content--popup" data-testid="LayoutContent">
              <Logo
                src={notification?.logo || InstituteLogo(notification?.institution || institutes[0])}
                type="popup"
                alt="Institution Logo"
              />
              <PopupContent
                notification={notification}
                appActive={appActive}
              />
              {
              appSettings.managedDomains.enabled
              && (
                <ManageDomain
                  domain={domain}
                  isBlocked={isBlocked}
                />
              )
            }
            </div>
            {notification && <Footer text={Content(notification.institution.id, 'footer', storeState.content)} />}
          </PopupAutoClose>
        </div>
      </div>
      <div
        role="status"
        aria-live="polite"
        className="screen-reader-only"
      >
        {citationModal === LayoutState.CitationModalOpened
          ? 'Citation modal open'
          : 'Citation modal closed'}
      </div>
      {citationModal !== LayoutState.CitationModalClosed && <CitationModal notifications={[notification]} />}
    </>
  );
};
export default Popup;
