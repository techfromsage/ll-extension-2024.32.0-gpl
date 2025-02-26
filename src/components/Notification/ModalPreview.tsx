import React, { MouseEvent, useContext, useEffect } from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import browserMethods from '@/browserMethods';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import HidingCheckbox from '@/subComponents/Checkbox/HidingCheckbox';
import Button from '@/subComponents/Buttons/Button';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import GeneralCustomization from '@/interfaces/GeneralCustomization';
import resourceTypeToEventReadMap from '@/modules/stats/futures/resourceTypeToEventReadMap';
import resourceTypeToEventUnreadMap from '@/modules/stats/futures/resourceTypeToEventUnreadMap';
import fetchModalItem from '@/modules/shared/notifications/fetchModalItem';
import PopupType from '@/enums/futures/PopupType';
import LayoutState from '@/enums/stateMachine/LayoutState';

interface Props {
  modalNotification: NotificationUI,
  closeOption: boolean,
}

/**
 * Provides the specific text for a given resource type.
 *
 * @param {LibraryResourceType | undefined} libraryResourceType
 * @param {GeneralCustomization} customizations
 * @returns {string}
 */
const notificationButtonText = (
  libraryResourceType: LibraryResourceType | undefined,
  customizations: GeneralCustomization,
): string => {
  switch (libraryResourceType) {
    case LibraryResourceType.Onboarding:
      return customizations.onboarding_text;
    case LibraryResourceType.Survey:
      return customizations.survey_text;
    case LibraryResourceType.Campaign:
      return customizations.nps_text;
    default:
      return `View ${libraryResourceType}`;
  }
};

const ModalPreview = ({ modalNotification, closeOption }: Props) => {
  const { sendLayoutState, addToClosedHistory, layoutValues } = useContext(LayoutReactContext);
  const { storeState: { appSettings: { customizations }, config } } = useContext(AppActiveReactContext);

  useEffect(() => {
    fetchModalItem(
      config?.api.libraryResource || '',
      `${modalNotification.id}`,
      browserMethods.app.contentScript.httpRequest,
      modalNotification.libraryResourceType,
    ).then(res => {
      if (layoutValues.layout === LayoutState.PopUp && res?.popupType === PopupType.Modal) {
        sendLayoutState(LayoutEvent.Modal, { modalNotification });
      }
    });
  }, []);

  const handleClick = () => {
    sendLayoutState(LayoutEvent.Modal, { modalNotification });
  };

  const handleCheckboxClick = (event: MouseEvent) => {
    const target = event.target as HTMLInputElement;
    const statEvent = target.checked
      ? resourceTypeToEventReadMap(modalNotification.libraryResourceType)
      : resourceTypeToEventUnreadMap(modalNotification.libraryResourceType);

    if (statEvent) {
      browserMethods.app.statEventFutures({
        type: statEvent,
        module_uuid: `${modalNotification.id}`,
        trigger_url: window.location.href,
        institute_id: modalNotification.institution.id,
      });
    }
    addToClosedHistory(modalNotification);
  };

  return (
    <>
      {modalNotification.image
        && (
          <button
            className={[
              'notification__image',
              'notification__image--popup',
              modalNotification.image ? '' : 'notification__image--empty',
            ].join(' ')}
            type="button"
            onClick={() => handleClick()}
            data-testid="FuturesContentLinkPopup"
          >
            <img
              src={`${browserMethods.runtime.getURL(modalNotification.image)}`}
              alt={`Thumbnail for ${modalNotification.title}`}
            />
          </button>
        )}
      <Button
        className="button-primary"
        onClick={() => handleClick()}
        text={notificationButtonText(modalNotification.libraryResourceType, customizations)}
      />
      {closeOption && !modalNotification.hasBeenClosed && (
        <HidingCheckbox
          name="notification-read"
          text="Do not show again"
          defaultChecked={false}
          onClick={handleCheckboxClick}
        />
      )}
    </>
  );
};

export default ModalPreview;
