/**
 * Enum State provides the set of hierarchical notification states used in the app.
 * For example, popup will have Priority Assist (priorityAssist) messages shown before an Alternatives one (fullTextFinder).
 * For example, side tray will have priorityAssist shown above a fullTextFinder
 *
 * These are provided by the API and can be overridden per institution
 */
enum State {
  Idle = 'idle',
  // Assist
  PriorityAssist = 'priorityAssist',
  Assist = 'assist',
  // Access
  CustomRedirected = 'customRedirected',
  RedirectLoop = 'redirectLoop',
  AutoRedirected = 'autoRedirected',
  ProxyAccessPossible = 'proxyAccessPossible',
  OpenAthensAccessPossible = 'openAthensAccessPossible',
  ShibbolethAccessPossible = 'shibbolethAccessPossible',
  ProxyAccessAchieved = 'proxyAccessAchieved',
  ShibbolethAccessAchieved = 'shibbolethAccessAchieved',
  OpenAthensAccessAchieved = 'openAthensAccessAchieved',
  Connected = 'connected',
  // Alternatives
  FullTextFinder = 'fullTextFinder',
  OpenAccess = 'openAccess',
  OpenAccessEbook = 'openAccessEbook',
  EbookFinderMultiple = 'ebookFinderMultiple',
  EbookFinder = 'ebookFinder',
  OrderForm = 'orderForm',
  FullTextFinderAchieved = 'fullTextFinderAchieved',
  OpenAccessAchieved = 'openAccessAchieved',
  EbookFinderAchieved = 'ebookFinderAchieved',
  OnCampusSupported = 'onCampusSupported',
  // Search Enhancers
  SearchEnhanced = 'searchEnhanced',
  GoogleScholarSearchEnhanced = 'googleScholarSearchEnhanced',
  PubMedSearchEnhanced = 'pubMedSearchEnhanced',
  // Other
  OnboardingTutorial = 'onboardingTutorial',
  OnCampusNotSupported = 'onCampusNotSupported',
  NotSupported = 'notSupported',
  Supported = 'supported',
  SciteOnGoogleScholarSupported = 'sciteOnGoogleScholarSupported',
  SciteOnPublisherWebsiteSupported = 'sciteOnPublisherWebsiteSupported',
  Campaign = 'campaign',
  Modal = 'modal',
  SystemMessage = 'systemMessage',
  PrintBookAvailable = 'printBookAvailable',
}

export default State;
