/**
 * Enum LayoutState represents and standardises the different states that are available in
 * the Layout State Machine.
 */
export enum LayoutState {
  Idle = 'idle',
  PopUp = 'popup',
  Modal = 'modal',
  Notifications = 'notifications',
  Settings = 'settings',
  ReferenceManager = 'referenceManager',
  Closed = 'closed',
  Closing = 'closing',
  Opened = 'opened',
  LibrarySearchClosed = 'librarySearchClosed',
  LibrarySearchClosing = 'librarySearchClosing',
  LibrarySearchOpened = 'librarySearchOpened',
  CitationModalClosed = 'citationModalClosed',
  CitationModalClosing = 'citationModalClosing',
  CitationModalOpened = 'citationModalOpened',
}

export default LayoutState;
