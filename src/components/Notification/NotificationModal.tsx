import React, { useContext, useState } from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import ModalItem from '@/interfaces/libraryResources/ModalItem';
import Loading from '@/components/App/Loading';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import HidingCheckbox from '@/subComponents/Checkbox/HidingCheckbox';
import ContentType from '@/enums/futures/ContentType';
import resourceTypeToEventReadMap from '@/modules/stats/futures/resourceTypeToEventReadMap';
import browserMethods from '@/browserMethods';
import Alert from '@/subComponents/Alert/Alert';
import ComponentType from '@/enums/ui/ComponentType';
import InfoIcon from '@/icons/InfoIcon';
import Button from '@/subComponents/Buttons/Button';

interface Props {
  notification: NotificationUI,
  modalItem: ModalItem | undefined,
  reloadIframe: number,
}

const ModalContent = ({ modalItem, reloadIframe }: { modalItem: ModalItem, reloadIframe: number }) => {
  const [loadCount, setLoadCount] = useState(0);

  const iframeLoad = () => {
    setLoadCount(loadCount + 1);
  };

  return modalItem.contentType === ContentType.iFrame
    ? (
      <div className="notification__iframe_wrapper">
        { loadCount > 1 && (
          <Alert
            type={ComponentType.Info}
            message={(
              <>
                Sometimes navigating to a new page may not work. If this has happened,
                <Button
                  className="button-tertiary button-inline"
                  text="click here"
                  buttonType="newtab"
                  onClick={() => window.open(modalItem?.content, '_blank')?.focus()}
                />
                to open in a new tab.
              </>
            )}
            icon={<InfoIcon backgroundColor="#3356b5" />}
          />
        ) }
        <iframe
          id="notification__iframe"
          src={modalItem.content}
          className="notification__iframe"
          title={modalItem.title}
          data-testid="modalContentIframe"
          key={reloadIframe}
          onLoad={iframeLoad}
        />
        <div className="notification__iframe_loading">
          <Loading />
        </div>
      </div>
    )
    : (
      <div
        dangerouslySetInnerHTML={{ __html: modalItem.content }}
        data-testid="modalContentHTML"
      />
    );
};

/**
 * @param {NotificationUI} notification
 * @param modalItem
 * @param reloadIframe
 * @returns {JSX.Element}
 * @constructor
 */
const NotificationModal = ({ notification, modalItem, reloadIframe }: Props) => {
  const { addToClosedHistory } = useContext(LayoutReactContext);

  if (!modalItem) {
    return <Loading />;
  }

  const onClickHandler = () => {
    const statEvent = resourceTypeToEventReadMap(notification.libraryResourceType);
    if (statEvent) {
      browserMethods.app.statEventFutures({
        type: statEvent,
        module_uuid: `${notification.id}`,
        trigger_url: window.location.href,
        institute_id: notification.institution.id,
      });
    }
    addToClosedHistory(notification);
  };

  return (
    <div className="notification notification--modal" data-testid={`NotificationState-${notification.state}`}>
      <div className="notification__header notification__header--modal">
        {
          !notification.hasBeenClosed && (
            <HidingCheckbox
              name="notification-read"
              text="Do not show again"
              defaultChecked={false}
              onClick={onClickHandler}
            />
          )
        }
      </div>
      <div className="notification__body notification__body--modal">
        <ModalContent modalItem={modalItem} reloadIframe={reloadIframe} />
      </div>
    </div>
  );
};

export default NotificationModal;
