import React, { useContext, useState } from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import Feature from '@/enums/Feature';
import FormatNotificationMessage from '@/modules/shared/FormatNotificationMessage';
import CampaignContent from '@/subComponents/Campaign/CampaignContent';
import ModalPreview from '@/components/Notification/ModalPreview';
import eventProcessClick from '@/modules/stats/access/eventProcessClick';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
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
const NotificationPopup = ({ notification, openUrlInNewTab }: Props) => {
  const [showSecondView, setShowSecondView] = useState(false);
  const { tabUuid } = useContext(AppActiveReactContext);

  const onClickHandler = () => setShowSecondView(true);

  const message = notification.message
    ? FormatNotificationMessage(
      notification.message,
      (url: string) => eventProcessClick(notification, new URL(url), tabUuid),
    )
    : <></>;

  return (
    <div className="notification notification--popup" data-testid={`NotificationState-${notification.state}`}>
      { !showSecondView && (
      <div>
        <h1 data-testid="NotificationHeading" className="notification__title--popup">{notification.title}</h1>
        <div
          data-testid="NotificationMessage"
          className="notification__body--popup"
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
        notification.feature === Feature.Modal
        && (
        <ModalPreview
          modalNotification={notification}
          closeOption
        />
        )
      }
      { (notification.feature === Feature.Campaign && showSecondView)
        && <CampaignContent notification={notification} />}
    </div>
  );
};

export default NotificationPopup;
