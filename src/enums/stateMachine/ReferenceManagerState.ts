/**
 * Represents the different states the reference manager can be in.
 */
enum ReferenceManagerState {
  Init = 'init',
  Off = 'off',
  NoUserSelected = 'noUserSelected',
  Login = 'login',
  SignOut = 'signOut',
  ReferenceSinglePage = 'referenceSinglePage',
  ReferenceSearchResults = 'referenceSearchResults',
  ReferenceNonAcademic = 'referenceNonAcademic',
  NotSupported = 'notSupported',
}

export default ReferenceManagerState;
