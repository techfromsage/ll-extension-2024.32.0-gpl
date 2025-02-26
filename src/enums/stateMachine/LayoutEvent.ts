/**
 * LayoutEvent is used to represent and standardise the events that can be triggered in the Layout State Machine.
 * e.g. The Layout can be put into the "popup mode" by sending a Minimise state to the machine.
 */
enum LayoutEvent {
  Minimise = 'minimise',
  Settings = 'settings',
  Modal = 'modal',
  Notifications = 'notifications',
  ReferenceManager = 'referenceManager',
  Close = 'close',
  Open = 'open',
  Toggle = 'toggle',
  AutoOpen = 'autoOpen',
  ExpandNotifications = 'expandNotifications',
  WindowResize = 'windowResize',
  OpenLibrarySearch = 'openLibrarySearch',
  CloseLibrarySearch = 'closeLibrarySearch',
  OpenCitationModal = 'openCitationModal',
  CloseCitationModal = 'closeCitationModal',
}

export default LayoutEvent;
