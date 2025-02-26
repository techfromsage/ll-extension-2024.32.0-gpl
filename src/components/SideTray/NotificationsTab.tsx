/**
 * Component `NotificationsTab` presents notifications in the expanded "tray mode".
 * This mode can display several notifications at once.
 * These notifications are grouped using an accordions.
 */
import React, { useContext, useEffect } from 'react';
import browserMethods from '@/browserMethods';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import AppSettings from '@/interfaces/AppSettings';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import NotificationSideTray from '@/components/Notification/NotificationSideTray';
import ServicesLinks from '@/components/SideTray/ServicesLinks';
import LibchatLinks from '@/components/SideTray/LibchatLinks';
import Accordion, { AccordionItemValues } from '@/subComponents/Accordion/Accordion';
import Card from '@/subComponents/Card/Card';
import ServicesIcon from '@/icons/ServicesIcon';
import EnabledTools from '@/components/SideTray/Tools/EnabledTools';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import LayoutState from '@/enums/stateMachine/LayoutState';
import CitationModal from '@/components/Citation/CitationModal';

interface Props {
  notifications: NotificationUI[],
}

const accordionItems = (
  notifications: NotificationUI[],
  libraryServices: LibraryServicesItem[],
  appSettings: AppSettings,
  keywordPackages: KeywordPackage[],
): AccordionItemValues[] => {
  const services = [ServicesLinks(libraryServices), LibchatLinks(libraryServices)].flat();

  return [
    ...notifications.map((notification, index) => {
      return {
        uuid: `notifications-${notification.id}`,
        expanded: index === 0,
        title: notification.title,
        content: (
          <NotificationSideTray
            key={notification.id}
            notification={notification}
            openUrlInNewTab={browserMethods.tabs.contentScript.create}
          />
        ),
      };
    }),
    {
      ...EnabledTools(appSettings, keywordPackages),
    },
    {
      uuid: 'services',
      expanded: true,
      contentLength: libraryServices.length || 0,
      icon: <ServicesIcon />,
      title: appSettings.customizations.services_text,
      strapline: appSettings.customizations.services_description,
      content: (
        <Card>
          {services}
        </Card>
      ),
    },
  ].filter(Boolean);
};

/**
 * @param {NotificationUI[]} notifications
 * @returns {JSX.Element}
 * @constructor
 */
const NotificationsTab = ({ notifications }: Props) => {
  const {
    layoutValues: { citationModal }, sendLayoutState, libraryServices, expandedNotifications,
  } = useContext(LayoutReactContext);
  const { storeState: { appSettings, keywordPackages } } = useContext(AppActiveReactContext);

  const items = accordionItems(notifications, libraryServices, appSettings, keywordPackages);

  useEffect(() => {
    const uuids = items
      .filter(({ expanded }) => expanded)
      .map(({ uuid }) => uuid);
    sendLayoutState(LayoutEvent.ExpandNotifications, { expandedNotifications: uuids });
  }, []);

  const onChange = (uuids: string[]) => {
    sendLayoutState(LayoutEvent.ExpandNotifications, { expandedNotifications: uuids });
  };

  return (
    <>
      <div className="wrapper" data-testid="FadeInElement">
        {
          expandedNotifications
          && (
          <Accordion
            items={items}
            allowZeroExpanded
            preExpandedUuids={expandedNotifications}
            onChange={onChange}
          />
          )
        }
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
      {citationModal !== LayoutState.CitationModalClosed && <CitationModal notifications={notifications} />}
    </>
  );
};

export default NotificationsTab;
