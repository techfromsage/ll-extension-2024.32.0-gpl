import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';

/**
 * Allowed events in Layout state machine
 */
type LayoutEventSchema =
  | { type: LayoutEvent.Minimise }
  | { type: LayoutEvent.Settings }
  | { type: LayoutEvent.Notifications }
  | { type: LayoutEvent.ReferenceManager }
  | { type: LayoutEvent.Modal, modalNotification: NotificationUI, libraryServices: LibraryServicesItem[] }
  | { type: LayoutEvent.Close, notifications: NotificationUI[], libraryServices: LibraryServicesItem[] }
  | { type: LayoutEvent.Open, notifications: NotificationUI[], libraryServices: LibraryServicesItem[] }
  | { type: LayoutEvent.AutoOpen, notifications: NotificationUI[], libraryServices: LibraryServicesItem[] }
  | { type: LayoutEvent.Toggle }
  | { type: LayoutEvent.ExpandNotifications, expandedNotifications: string[] }
  | { type: LayoutEvent.WindowResize, windowWidth: number }
  | { type: LayoutEvent.OpenLibrarySearch }
  | { type: LayoutEvent.CloseLibrarySearch }
  | { type: LayoutEvent.OpenCitationModal }
  | { type: LayoutEvent.CloseCitationModal };

export default LayoutEventSchema;
