import State from '@/enums/State';

/**
 * Interface BootstrapConfig is the minimal config needed to
 * bootstrap the app
 */

// TODO: Investigate if sciwheelEnabled could be only boolean instead of string | boolean.
export interface BootstrapConfig {
  environment: string,
  datadog: {
    clientToken: string,
    rumApplicationId: string,
    rumClientToken: string,
    service: string,
    site: string,
  },
  api: ApiEndpointsConfig,
  sentry: {
    dsn: string,
  },
  leanlibraryOpenId: string,
  searchResultsLimit: number,
  onCampusCheckInterval: number,
}

/**
 * Interface ApiEndpointsConfig represents the APIs we use to bootstrap the app.
 */
export interface ApiEndpointsConfig {
  configUrl: string,
  institute: string,
  instituteSettings: string,
  institutionList: string,
  customMessages: string,
  customRedirects: string,
  deniedDomains: string,
  llaEvent: string,
  resourceDomains: string,
  libraryResources: string,
  libraryResource: string,
  librarySearch: string,
  isbnMetadata: string,
  campaignItem: string,
  keywordEnhancements: string,
  citation: {
    styles: string,
    format: string,
  },
  ip: string,
  defaultInstitution: string,
  search: string,
  globalDeny: string,
  uninstallUrl: string, // requires &instituteId={instituteId}&clientId={clientId}
  tocAlerts: {
    issnCheckUrl: string,
    buttonUrl: string,
  },
  openAccess: OpenAccessConfig,
  llApi: {
    url: string,
    token: string,
  },
  translations: string,
  scite: {
    tallies: string,
    papers: string,
  },
  printHoldings: string,
  sciwheel: SciwheelApiEndpointsConfig,
}

export interface SciwheelApiEndpointsConfig {
  base: string,
  authentication: string,
  // workspace logout
  logOut: string,
  // token / local logout
  signOut: string,
  projects: string,
  // add resource to library
  importIds: string,
  usersSavedArticles: string,
  // add annotations
  annotations: string,
  fetchAnnotations: string,
  canCreateProject: string,
  addNewProject: string,
  viewLibraryItem: string,
}

/**
 * Interface DoiScraperConfig is used to standardise the values needed in scrapping
 * a DOI from a specific path/domain using Xpath.
 *
 * This is primarily used in Alternatives.
 */
export interface DoiScraperConfig {
  domain: string,
  path: string,
  xpath: string,
}

/**
 * Interface OpenAccessConfig represents values for looking up OpenAccess data.
 */
export interface OpenAccessConfig {
  coreApiKey: string,
  core: string,
}

/**
 * Interface ContentConfig represents the values passed in from the API
 * that can be used as content labels in the extension.
 */
export interface ContentConfig {
  footer?: string,
  // eslint-disable-next-line camelcase
  language_id?: string,
  buttonAddInstitute: string,
  buttonClose: string,
  buttonEbookFinder: string,
  buttonFullTextFinder: string,
  buttonOpenAccess: string,
  buttonOpenAccessEbook: string,
  buttonOpenAthensAccessPossible: string,
  buttonOpenAthensLoginRequired: string,
  buttonOpenAthensPossible: string,
  buttonOpenSettings: string,
  buttonOrderForm: string,
  buttonPrintBook: string,
  buttonProxyAccessPossible: string,
  buttonSave: string,
  buttonShibbolethAccessPossible: string,
  contentAutoRedirected: string,
  contentConnected: string,
  contentCustomRedirected: string,
  contentEbookFinderAchieved: string,
  contentEbookFinderMultiple: string,
  contentEbookFinder: string,
  contentFullTextFinderAchieved: string,
  contentFullTextFinder: string,
  contentGoogleScholarSearchEnhanced: string,
  contentNotSupported: string,
  contentOnCampusSupported: string,
  contentOnCampusNotSupported: string,
  contentOpenAccessAchieved: string,
  contentOpenAccess: string,
  contentOpenAccessEbook: string,
  contentOpenAthensAccessAchieved: string,
  contentOpenAthensAccessPossible: string,
  contentOrderForm: string,
  contentPrintBook: string,
  contentProxyAccessAchieved: string,
  contentProxyAccessPossible: string,
  contentPubMedSearchEnhanced: string,
  contentSettings: string,
  contentShibbolethAccessAchieved: string,
  contentShibbolethAccessPossible: string,
  countdown: string,
  errorRequired: string,
  flashSettingsSaved: string,
  infoOpenAccessAcceptedVersion: string,
  infoOpenAccessCore: string,
  infoOpenAccessPublishedVersion: string,
  infoOpenAccessSubmittedVersion: string,
  labelAutoRedirect: string,
  labelInstitute: string,
  labelShowTimer: string,
  linkJumpToPopup: string,
  onboardingTutorialFooterLinkText: string,
  onboardingTutorialFooterText: string,
  pause: string,
  privacyLinkText: string,
  privacyText: string,
  privacyUrl: string,
  resume: string,
  screenReaderCountdown: string,
  screenReaderPopupClosed: string,
  screenReaderTargetBlank: string,
  titleAutoRedirected: string,
  titleConnected: string,
  titleCustomRedirected: string,
  titleEbookFinderAchieved: string,
  titleEbookFinderMultiple: string,
  titleEbookFinder: string,
  titleFullTextFinderAchieved: string,
  titleFullTextFinder: string,
  titleGoogleScholarSearchEnhanced: string,
  titleNotSupported: string,
  titleOnCampusSupported: string,
  titleOnCampusNotSupported: string,
  titleOpenAccessAchieved: string,
  titleOpenAccess: string,
  titleOpenAccessEbook: string,
  titleOpenAthensAccessAchieved: string,
  titleOpenAthensAccessPossible: string,
  titleOrderForm: string,
  titlePrintBook: string,
  titleProxyAccessAchieved: string,
  titleProxyAccessPossible: string,
  titlePubMedSearchEnhanced: string,
  titleSettings: string,
  titleShibbolethAccessAchieved: string,
  titleShibbolethAccessPossible: string,
  tocAlertSubscribeButton: string,
}

/**
 * Interface Config represents global configuration for the application from the backend APIs
 */
export interface Config extends BootstrapConfig {
  doiScraper: DoiScraperConfig[],
  styling: {
    stylesheet: string,
  },
  tocAlerts: {
    settingsUrl: string,
    issnCheckUrl: string,
    buttonUrl: string,
  },
  multiInstitutePopupOrder: State[][],
  text: ContentConfig,
  version: string,
}
