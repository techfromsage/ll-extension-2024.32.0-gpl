import React, { useContext, useState } from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import FormatNotificationMessage from '@/modules/shared/FormatNotificationMessage';
import Feature from '@/enums/Feature';
import ModalPreview from '@/components/Notification/ModalPreview';
import CampaignContent from '@/subComponents/Campaign/CampaignContent';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import ManageDomain from '@/components/SideTray/ManageDomain';
import ManagedDomain from '@/modules/shared/notifications/ManagedDomain';
import eventProcessClick from '@/modules/stats/access/eventProcessClick';
import NotificationBody from '@/components/Notification/NotificationBody';

interface Props {
  notification: NotificationUI,
  openUrlInNewTab: (url: string) => void,
}

/**
 * @param {NotificationUI} notification
 * @param {(url: string) => void} openUrlInNewTab
 * @returns {JSX.Element}
 * @constructor
 */
const NotificationSideTray = ({ notification, openUrlInNewTab }: Props) => {
  const { storeState: { appSettings }, tabUuid } = useContext(AppActiveReactContext);
  const [showSecondView, setShowSecondView] = useState(false);
  const { domain, isBlocked } = ManagedDomain(appSettings, window.location.hostname);

  const onClickHandler = () => setShowSecondView(true);

  const message = notification.message
    ? FormatNotificationMessage(
      notification.message,
      (url: string) => eventProcessClick(notification, new URL(url), tabUuid),
    )
    : <></>;

  return (
    <div className="notification notification--sidetray" data-testid={`NotificationState-${notification.state}`}>
      { !showSecondView && (
      <div>
        <div
          data-testid="NotificationMessage"
          className="notification__body--sidetray"
        >
          {message}
        </div>
        <NotificationBody
          notification={notification}
          openUrlInNewTab={openUrlInNewTab}
          onClickHandler={onClickHandler}
        />
      </div>
      ) }
      {
        appSettings.managedDomains.enabled
        && (
        <ManageDomain
          domain={domain}
          isBlocked={isBlocked}
        />
        )
      }
      {
        notification.feature === Feature.Modal
        && (
        <ModalPreview
          modalNotification={notification}
          closeOption={false}
        />
        )
      }
      { (notification.feature === Feature.Campaign && showSecondView)
        && <CampaignContent notification={notification} />}
    </div>
  );
};

export default NotificationSideTray;
