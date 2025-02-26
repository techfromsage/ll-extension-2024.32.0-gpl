/**
 * defaultAppSettings present a baseline/default values for the app settings.
 * Most of these settings will be overwritten based on institution config and user preferences.
 */
import AppSettings from '@/interfaces/AppSettings';
import CustomSize from '@/enums/ui/CustomSize';
import FloatingActionPosition from '@/enums/ui/FloatingActionPosition';
import Language from '@/enums/Language';

const defaultAppSettings: AppSettings = {
  autoRedirect: false,
  onBoardingShown: false,
  showTimer: false,
  journalAlerts: false,
  journalAlertsInstitution: false,
  customTextSize: CustomSize.Medium,
  fabPosition: FloatingActionPosition.BottomRight,
  onCampus: false,
  showPinTooltipTutorialTab: false,
  showSciwheelTutorialTab: false,
  sciwheelEnabled: false,
  integrations: {
    scite: {
      enabled: true,
      elsewhere: true,
      googleScholar: true,
    },
    citation: {
      enabled: true,
    },
  },
  librarySearch: true,
  recentLibrarySearch: 0,
  keywordEnhancements: {
    enabled: true,
    packages: {},
  },
  alternatives: {
    article: false,
    ebook: false,
    printBook: false,
    openAccess: false,
    openAccessEbook: false,
    orderForm: false,
    orderFormBook: false,
  },
  managedDomains: {
    enabled: true,
    domains: [],
  },
  language: Language.English,
  customizations: {
    logo: null,
    floating_action_button: null,
    primary_button_color: '#00B387',
    secondary_button_color: '#3B55AD',
    onboarding_text: 'Library Guides',
    survey_text: 'Library Survey',
    nps_text: 'Library Feedback',
    tools_text: 'Tools',
    tools_description: 'Use one of our tools to make your studying easier',
    keyword_enhancement_text: 'Library Content',
    additional_library_search_text: 'Additional Library Search',
    services_text: 'Services',
    services_description: 'How can your library help you today?',
  },
  logging_enabled: false,
  featureBannerShown: {
    ebookPrint: false,
    citation: false,
  },
  highlightAndAnnotateEnabled: true,
};

export default defaultAppSettings;
