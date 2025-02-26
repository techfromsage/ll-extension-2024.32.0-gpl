import React from 'react';
import NotificationUI, { NotificationUICard } from '@/interfaces/ui/NotificationUI';
import BookIcon from '@/icons/BookIcon';
import Card from '@/subComponents/Card/Card';
import NotificationButtons from '@/components/Notification/NotificationButtons';

interface Props {
  notification: NotificationUI,
  className: string,
  openUrlInNewTab: (url: string) => void,
  onClickHandler: () => void,
  tabUuid: string,
}

/**
 * Used to display the notification buttons with a card wrapper.
 *
 * @param {NotificationUI} notification
 * @param {string} className
 * @param {NotificationUI} openUrlInNewTab
 * @param {NotificationUI} onClickHandler
 * @param {string} tabUuid
 * @returns {JSX.Element}
 */
const NotificationCards = ({
  notification,
  className,
  openUrlInNewTab,
  onClickHandler,
  tabUuid,
}: Props) => {
  return (
    <>
      {
        notification.cards?.map(({ title, buttons }: NotificationUICard, index: number) => {
          return (
            <Card className="card--bordered" title={title} titleIcon={<BookIcon />} key={`item-${index}`}>
              <NotificationButtons
                notification={notification}
                className={className}
                openUrlInNewTab={openUrlInNewTab}
                onClickHandler={onClickHandler}
                tabUuid={tabUuid}
                buttons={buttons}
              />
            </Card>
          );
        })
      }
    </>
  );
};

export default NotificationCards;
