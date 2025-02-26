/**
 * Interface Institution represents an Institution and their associated settings
 */
import CrossrefParamsAdapter from '@/interfaces/alternatives/CrossrefParamsAdapter';
import InstitutionAccess from '@/interfaces/InstitutionAccess';
import SearchEnhancer from '@/interfaces/SearchEnhancer';
import GeneralCustomization from '@/interfaces/GeneralCustomization';
import ModulesEnabled from '@/interfaces/ModulesEnabled';
import TocAlertSettings from '@/interfaces/tocAlerts/TocAlertSettings';
import { ContentConfig } from '@/interfaces/Config';
import State from '@/enums/State';
import FeatureFlags from '@/interfaces/FeatureFlags';

export interface AutoHide {
  fullTextFinder?: number,
  notSupported?: number,
  openAccess?: number,
  ebookFinder?: number,
  ebookFinderMultiple?: number,
}

export interface SearchEngine {
  id: number,
  name: string,
  url: string,
}

/**
 * Institution config from the Insyde API.
 */
export interface InstitutionInsyde {
  id: string,
  name: string,
  access: InstitutionAccess[],
  text: ContentConfig,
  styling: {
    logo: string,
  },
  searchEnhancers: SearchEnhancer[],
  alternatives: {
    enabled: boolean,
    openAccess: {
      enabled: boolean,
      accessPossiblePopupsEnabled?: boolean,
      priority: boolean,
      providers?: {
        id: string,
      }[],
    },
    holdingInformationUrl: string,
    ebookFinder: {
      enabled: boolean,
      useProxy?: boolean,
    },
    fullTextFinder: {
      enabled: boolean,
      url?: string,
      path?: string,
      params?: CrossrefParamsAdapter,
    },
    orderForm: {
      enabled: boolean,
      url?: string,
      params?: {
        articleTitle?: string,
        journalTitle?: string,
        author?: string,
        publisher?: string,
        startPage?: string,
        pages?: string,
        volume?: string,
        issue?: string,
        doi?: string,
        issn?: string,
        isbn?: string,
        issued?: string,
        type?: string,
      },
      ebookChaptersEnabled: boolean,
    },
  },
  autoHide: AutoHide,
  closePopup: {
    timeOut: number,
  },
  defaultSettings: {
    autoRedirect: {
      value: boolean,
      force: boolean,
    },
    showTimer: {
      value: boolean,
      force: boolean, // deprecated due to UX concerns
    },
  },
  enableOnCampusCheck: boolean,
  enableIpRangeValidation: boolean,
  showExtensionSettings: boolean,
  ipRanges: string[],
  contentPopups: State[],
  onboardingTutorialUrl: string | null,
  searchEngines: SearchEngine[],
  scite: {
    enabled: boolean,
    googleScholarEnabled: boolean,
    elsewhereEnabled: boolean,
  },
  citation: {
    enabled: boolean,
  },
  keywordEnhancements: {
    enabled: boolean,
  },
}

/**
 * Institution config from the newer LL API.
 */
export type InstitutionSettings = {
  general_customization: GeneralCustomization,
  modules_enabled: ModulesEnabled,
  logging_enabled: boolean,
  journal_alerts: TocAlertSettings,
  content_popups: State[],
  auto_hide: { [key in State]?: number | undefined },
  alternatives: {
    open_access_ebooks: {
      enabled: boolean,
    },
    print_book_alternatives: {
      enabled: boolean,
      url: string,
      search_string: string,
      holdings_lookup_enabled: boolean,
    },
    order_form: {
      isbn: {
        enabled: boolean,
        url?: string,
        params?: {
          article_title?: string,
          author?: string,
          doi?: string,
          isbn?: string,
          issn?: string,
          issue?: string,
          issued?: string,
          journal_title?: string,
          pages?: string,
          publisher?: string,
          start_page?: string,
          volume?: string,
        },
      },
    },
  },
  featureFlags: FeatureFlags,
};

// Thanks StackOverflow. @see
// https://stackoverflow.com/questions/63079777/how-do-i-merge-two-interface-types-with-the-overlapping-properties-types-being
// gets all viable keys from all interfaces in a union.
type AllKeysOf<T> = T extends any ? keyof T : never;
// basically does T[K] but when T is a union it only gives T[K] for the members of the union for which it is a valid key.
type Get<T, K extends keyof any, Fallback = never> = T extends Record<K, any> ? T[K] : Fallback;
// takes a union of interfaces and merges them so that any common key is a union of possibilities.
type Combine<T> = { [K in AllKeysOf<T>]: Get<T, K> };

type Institution = Combine<InstitutionInsyde & InstitutionSettings>;

export default Institution;
