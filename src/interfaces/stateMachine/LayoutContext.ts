import NotificationUI from '@/interfaces/ui/NotificationUI';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';

/**
 * Interface LayoutContext represents a "Xstate" state machine's context objects that can be used in guards and actions.
 *
 * See Xstate docs - https://xstate.js.org/docs/guides/context.html#context
 *
 * Note this is in no way related to React Contexts which is a different technology.
 */

interface LayoutContext {
  notifications: NotificationUI[],
  modalNotification: NotificationUI | undefined,
  libraryServices: LibraryServicesItem[],
  windowWidth: number,
  expandedNotifications?: string[],
  hasOpened: boolean,
}

export default LayoutContext;
