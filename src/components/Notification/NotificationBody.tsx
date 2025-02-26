import React, { useContext } from 'react';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import NotificationButtons from '@/components/Notification/NotificationButtons';
import NotificationCards from '@/components/Notification/NotificationCards';
import NotificationInformation from '@/components/Notification/NotificationInformation';

interface Props {
  notification: NotificationUI,
  openUrlInNewTab: (url: string) => void,
  onClickHandler: () => void,
}

/**
 * Used to display the content of the notification in the popup or sidetray.
 *
 * @param {NotificationUI} notification
 * @param {(url: string) => void} openUrlInNewTab
 * @param {() => void} onClickHandler
 * @returns {JSX.Element}
 */
// eslint-disable-next-line complexity
const NotificationBody = ({ notification, openUrlInNewTab, onClickHandler }: Props) => {
  const { tabUuid } = useContext(AppActiveReactContext);
  const { cards, buttons } = notification;

  return (
    <>
      {cards?.length ? (
        <NotificationCards
          notification={notification}
          className=""
          openUrlInNewTab={openUrlInNewTab}
          onClickHandler={onClickHandler}
          tabUuid={tabUuid}
        />
      ) : null}

      { notification.openAccess && <NotificationInformation notification={notification} />}

      {buttons?.length ? (
        <NotificationButtons
          notification={notification}
          className=""
          openUrlInNewTab={openUrlInNewTab}
          onClickHandler={onClickHandler}
          tabUuid={tabUuid}
          buttons={buttons}
        />
      ) : null}
    </>
  );
};

export default NotificationBody;
