/**
 * LibraryResourceFrequency is used (in combination with stats Shown and MarkedAsRead)
 * to determine when the futures feature libraryResources/popup should be shown.
 */

export enum LibraryResourceFrequency {
  Empty = '',
  ShowUntilMarkedAsRead = 'read',
  ShowOnce = 'once',
  ShowAlways = 'always',
  ShowNever = 'never',
}

export default LibraryResourceFrequency;
