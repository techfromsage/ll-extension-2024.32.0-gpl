import NotificationUI from '@/interfaces/ui/NotificationUI';
import PageData from '@/interfaces/messages/PageData';
import NotificationDot from '@/modules/shared/notifications/NotificationDot';
import browserMethods from '@/browserMethods';

/**
 * Update the badge label based on data sent from content-script.
 */
export default (
  tabId: number,
  notifications: NotificationUI[],
  referenceManager: PageData['referenceManager'],
) => {
  const notificationDot = NotificationDot(notifications, referenceManager);
  if (!notificationDot.active) {
    return;
  }
  browserMethods.toolbar.background.activeIcon(tabId, notificationDot.isDotOnly);
  browserMethods.toolbar.background.badgeLabel(tabId, notificationDot.value);
};
