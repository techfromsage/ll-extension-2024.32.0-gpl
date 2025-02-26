import React, { useContext, useEffect, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Logo from '@/subComponents/Logo/Logo';
import NotificationModal from '@/components/Notification/NotificationModal';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import Navigation from '@/subComponents/Navigation/Navigation';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import ModalItem from '@/interfaces/libraryResources/ModalItem';
import fetchModalItem from '@/modules/shared/notifications/fetchModalItem';
import Button from '@/subComponents/Buttons/Button';
import ContentType from '@/enums/futures/ContentType';
import LibraryResourceFrequency from '@/enums/futures/LibraryResourceFrequency';
import browserMethods from '@/browserMethods';
import resourceTypeToEventShownMap from '@/modules/stats/futures/resourceTypeToEventShownMap';

const sendShownStatEvent = (notification: NotificationUI) => {
  const statEvent = resourceTypeToEventShownMap(notification.libraryResourceType);
  if (statEvent) {
    browserMethods.app.statEventFutures({
      type: statEvent,
      module_uuid: `${notification.id}`,
      trigger_url: window.location.href,
      institute_id: notification.institution.id,
    });
  }
};

interface Props {
  notification: NotificationUI,
  closed: boolean,
}

/**
 * @param {NotificationUI} notification
 * @param {boolean} closed
 * @returns {JSX.Element}
 * @constructor
 */
const Modal = ({ notification, closed }: Props) => {
  const { storeState: { institutes, config } } = useContext(AppActiveReactContext);
  const {
    layoutEvent, layoutValues, sendLayoutState, addToClosedHistory,
  } = useContext(LayoutReactContext);
  const { layout } = layoutValues;

  const [modalItem, setModalItem] = useState<ModalItem>();
  const [reloadIframe, setReloadIframe] = useState(0);

  useEffect(() => {
    fetchModalItem(
      config?.api.libraryResource || '',
      `${notification.id}`,
      browserMethods.app.contentScript.httpRequest,
      notification.libraryResourceType,
    ).then(res => {
      setModalItem(res);

      // If the modal type is link, open it in a new tab
      if (res?.contentType === ContentType.Link) {
        window.open(res?.content, '_blank')?.focus();
        sendLayoutState(LayoutEvent.Notifications);
        sendLayoutState(LayoutEvent.Close);
      }

      if (res?.frequency === LibraryResourceFrequency.ShowOnce && !notification.hasBeenClosed) {
        addToClosedHistory(notification);
      }
    }).then(() => sendShownStatEvent(notification));
  }, []);

  const handleTitleClick = () => {
    setReloadIframe(reloadIframe + 1);
  };

  const onClose = () => {
    sendLayoutState(LayoutEvent.Notifications);
  };

  const classes = [
    'layout',
    'layout--modal',
    'layout--fixed',
    closed && 'dissolve',
    layoutEvent.type === LayoutEvent.Toggle && 'animate--slide-right',
  ].filter(Boolean);

  return (
    <FocusTrap>
      <div data-testid={`SideTray-${layout}`} className={classes.join(' ')} data-test-selector="LayoutInner">
        <div className="layout__container">
          <div className="layout__header layout__header--modal">
            <Navigation
              type="modal"
              hasNewtab={modalItem?.contentType === ContentType.iFrame}
              onNewtab={() => window.open(modalItem?.content, '_blank')?.focus()}
              onClose={onClose}
            />
            <Button
              data-testid="NotificationHeading"
              className="button-as-link layout__header__title"
              text={notification.title}
              onClick={handleTitleClick}
            />
            <Logo
              src={InstituteLogo(notification.institution || institutes[0])}
              type="modal"
              alt="Institution Logo"
            />
          </div>
          <div className="layout__content layout__content--modal" data-testid="LayoutContent">
            <NotificationModal notification={notification} modalItem={modalItem} reloadIframe={reloadIframe} />
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default Modal;
