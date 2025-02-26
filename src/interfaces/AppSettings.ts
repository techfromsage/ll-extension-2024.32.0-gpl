/**
 * Interface AppSettings presents the different settings the app can have.
 * These are based on institution config and user preferences.
 */
import Language from '@/enums/Language';
import FloatingActionPosition from '@/enums/ui/FloatingActionPosition';
import GeneralCustomization from '@/interfaces/GeneralCustomization';

interface IntegrationSettings {
  enabled: boolean,
}
interface SciteSettings extends IntegrationSettings {
  elsewhere: boolean,
  googleScholar: boolean,
}
interface AppSettings {
  autoRedirect: boolean,
  onBoardingShown: boolean,
  showTimer: boolean,
  journalAlerts: boolean, // user preference
  journalAlertsInstitution: boolean, // institution setting
  customTextSize: string,
  fabPosition: FloatingActionPosition,
  onCampus: boolean,
  showPinTooltipTutorialTab: boolean,
  showSciwheelTutorialTab: boolean,
  sciwheelEnabled: boolean,
  integrations: {
    [key: string]: IntegrationSettings | SciteSettings,
    scite: SciteSettings,
    citation: IntegrationSettings,
  },
  librarySearch: boolean,
  recentLibrarySearch: number,
  keywordEnhancements: {
    enabled: boolean,
    packages: {
      [key: string]: boolean,
    },
  },
  alternatives: {
    article: boolean,
    ebook: boolean,
    printBook: boolean,
    openAccess: boolean,
    openAccessEbook: boolean,
    orderForm: boolean,
    orderFormBook: boolean,
  },
  managedDomains: {
    enabled: boolean,
    domains: string[],
  },
  language: Language,
  customizations: GeneralCustomization,
  logging_enabled: boolean,
  featureBannerShown: {
    ebookPrint: boolean,
    citation: boolean,
  },
  highlightAndAnnotateEnabled: boolean,
}

export default AppSettings;
