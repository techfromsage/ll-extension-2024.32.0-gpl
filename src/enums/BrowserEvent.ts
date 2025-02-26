/**
 * Enum BrowserEvent provides options for sending messages between different parts of the browser.
 */
enum BrowserEvent {
  PopupToggle = 'popupToggle',
  NetworkChange = 'networkChange',
  DetermineNotifications = 'determineNotifications',
  UpdateInstitutions = 'updateInstitutions',
  TabHistory = 'tabHistory',
  TabCreate = 'tabCreate',
  AppStatusToggle = 'AppStatusToggle',
  AlarmRefreshData = 'refreshData',
  AlarmSendStats = 'alarmSendStats',
  AlarmInstalledInstitutions = 'alarmInstalledInstitutions',
  UpdateUserPreferences = 'updateUserPreferences',
  FetchBaseData = 'fetchBaseData',
  FetchUser = 'fetchUser',
  SignOut = 'signOut',
  AddClosedPopupToHistory = 'addClosedPopupToHistory',
  LibrarySearchQuery = 'librarySearchQuery',
  GetFormattedCitation = 'getFormattedCitation',
  FetchAnnotations = 'fetchAnnotations',
  SaveHighlightedText = 'saveHighlightedTexts',
  UpdateAnnotation = 'updateAnnotation',
  DeleteAnnotation = 'deleteAnnotation',
  HTTPRequest = 'httpRequest',
  StatEventAccess = 'statEventAccess',
  StatEventFutures = 'statEventFutures',
  SignedInDomains = 'signedInDomains',
  AddSignedInDomains = 'addSignedInDomain',
  AlarmClearSignedInDomains = 'alarmClearSignedInDomains',
  OpenNewTab = 'openNewTab',
}

export default BrowserEvent;
