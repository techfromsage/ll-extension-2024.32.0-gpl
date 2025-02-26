import React, { useContext } from 'react';
import NotificationUI, { NotificationUIButton, NotificationUIButtonLevel } from '@/interfaces/ui/NotificationUI';
import Button from '@/subComponents/Buttons/Button';
import Feature from '@/enums/Feature';
import browserMethods from '@/browserMethods';
import FuturesStatType from '@/enums/FuturesStatType';
import eventProcessClick from '@/modules/stats/access/eventProcessClick';
import eventConnect from '@/modules/stats/access/eventConnect';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutReactContext from '../Context/LayoutReactContext';
import AppActiveReactContext from '../Context/AppActiveReactContext';

interface Props {
  notification: NotificationUI,
  className: string,
  openUrlInNewTab: (url: string) => void,
  onClickHandler: () => void,
  tabUuid: string,
  buttons?: NotificationUIButton[],
}

/**
 * Used to display the notification buttons - primary, secondary (citation) and tertiary (ebook print).
 * Also handles the click event for the buttons and stats tracking for the buttons.
 *
 * @param {NotificationUI} notification
 * @param {string} className
 * @param {NotificationUI} openUrlInNewTab
 * @param {NotificationUI} onClickHandler
 * @param {string} tabUuid
 * @param {NotificationUIButton[]} buttons
 * @returns {JSX.Element}
 */
const NotificationButtons = ({
  notification, className, openUrlInNewTab, onClickHandler, tabUuid, buttons = [],
}: Props) => {
  const { storeState: { institutes, userPreferences } } = useContext(AppActiveReactContext);
  const { sendLayoutState } = useContext(LayoutReactContext);

  const shouldOpenInNewTab = [
    Feature.Campaign,
    Feature.Modal,
    Feature.LibraryServices,
    Feature.Alternatives,
    Feature.AlternativesPhysical,
  ].includes(notification.feature);

  const handleStats = (level: NotificationUIButtonLevel, url: URL) => {
    // handle print holdings click
    if (level === NotificationUIButtonLevel.Tertiary) {
      browserMethods.app.statEventFutures({
        type: FuturesStatType.PrintHoldingsClick,
        institute_id: notification.institution.id,
        reference_uuid: tabUuid,
      });
    }

    const featureActions: { [key in Feature]?: () => void } = {
      // submit campaign
      [Feature.Campaign]: () => browserMethods.app.statEventFutures({
        type: FuturesStatType.CampaignShown,
        module_uuid: `${notification.id}`,
        trigger_url: window.location.href,
        institute_id: notification.institution.id,
      }),
      // handle standard click
      [Feature.Alternatives]: () => eventProcessClick(notification, new URL(url), tabUuid),
      [Feature.Access]: () => eventConnect(notification),
    };

    featureActions[notification.feature]?.();
  };

  const handleClick = (url: URL, level: NotificationUIButtonLevel) => {
    // handle stats before redirecting
    handleStats(level, url);

    if (!['https:', 'http:'].includes(url.protocol)) {
      return onClickHandler();
    }

    return shouldOpenInNewTab
      ? openUrlInNewTab(url.href)
      : window.location.assign(url.href);
  };

  const isCitationEnabledByInstitute = institutes.some(institute => institute.modules_enabled.citations !== false);
  const isCitationEnabledByUser = userPreferences.integrations?.citation?.enabled !== false;

  const showCitationButton = ['journal-article', 'book', 'monograph', 'edited-book']
    .includes(notification?.metadata?.digitalResource?.metadata?.type || '')
    && isCitationEnabledByInstitute
    && isCitationEnabledByUser;

  return (
    <div className="notification__buttons">
      {
        buttons?.map((button: NotificationUIButton, index) => {
          if (!button?.url?.length) {
            return '';
          }

          const level = button.level || NotificationUIButtonLevel.Primary;

          // show citation button if enabled
          if (level === NotificationUIButtonLevel.Secondary) {
            return showCitationButton ? (
              <button
                className={buttons.length > 1 ? 'button-secondary' : 'button-primary'}
                onClick={() => sendLayoutState(LayoutEvent.OpenCitationModal)}
                key="citation-button"
                id="get-citation-button"
                type="button"
                data-testid="Button-Get Citation"
                aria-label="Get Citation"
                aria-describedby="get-citation-button-screen-reader-description"
              >
                <div id="get-citation-button-screen-reader-description" className="screen-reader-only">
                  Clicking this will open the citation modal.
                </div>
                Get Citation
              </button>
            ) : '';
          }

          // show primary or tertiary (ebook print) button
          return (
            <Button
              className={`button-${level} ${className}`}
              onClick={() => handleClick(new URL(button.url), level)}
              text={button.text}
              key={`button-${index}-${level}`}
              buttonType={level === NotificationUIButtonLevel.Tertiary ? 'newtab' : ''}
            />
          );
        })
      }
    </div>
  );
};

export default NotificationButtons;
