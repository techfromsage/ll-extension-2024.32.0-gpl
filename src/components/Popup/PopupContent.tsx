import React from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import browserMethods from '@/browserMethods';
import NotificationPopup from '@/components/Notification/NotificationPopup';
import AppOff from '@/components/App/AppOff';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import Loading from '@/components/App/Loading';
import withLoadingDelay from '@/components/App/withLoadingDelay';

/**
 * @param {NotificationUI | undefined} notification
 * @param {boolean} isAppActive
 * @param isSwitchedOn
 * @returns {JSX.Element}
 * @constructor
 */

interface Props {
  notification: NotificationUI,
  appActive: AppActiveState,
  showLoading?: boolean,
}

const PopupContent = ({ notification, appActive, showLoading }: Props) => {
  if (appActive === AppActiveState.Off || appActive === AppActiveState.GlobalDeny) {
    return <AppOff state={appActive} />;
  }

  return !notification || showLoading
    ? <Loading text="Loading..." />
    : (
      <NotificationPopup
        notification={notification}
        openUrlInNewTab={browserMethods.tabs.contentScript.create}
      />
    );
};

export default withLoadingDelay(PopupContent);
