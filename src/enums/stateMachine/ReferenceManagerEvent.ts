/**
 * ReferenceManagerEvent is used to represent and standardise the events that can be triggered
 */
enum ReferenceManagerEvent {
  Init = 'xstate.init',
  Off = 'off',
  On = 'on',
  CheckForUserSignIn = 'checkForUserSignIn',
  NoUserSelected = 'noUserSelected',
  Login = 'login',
  SignOut = 'signOut',
  RefreshStoreState = 'refreshStoreState',
  DetermineResources = 'determineResources',
  CiteGoogleScholar = 'citeGoogleScholar',
}

export default ReferenceManagerEvent;
