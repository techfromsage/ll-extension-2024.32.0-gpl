import State from '@/enums/State';
import LLAStatType from '@/enums/LLAStatType';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';
import RedirectType from '@/enums/RedirectType';

type TabResources = Partial<Record<'fullText' | 'openAccess' | 'ebook', ArticleMetadata[]>>;

export interface StatSetTabState {
  type: LLAStatType.SET_TAB_STATE,
  instituteId: string,
  state: State,
  url: string,
  open: boolean,
  referenceId: string,
  resources?: {
    active: TabResources,
  },
  assistMessageId?: string,
  accessInstituteId?: string,
  accessResourceDomainId?: string,
}

export interface StatContentPopupRendered {
  type: LLAStatType.CONTENT_POPUP_RENDERED,
  instituteId: string,
  state: State,
  source: 'content',
  referenceId: string,
  assistMessageId?: string,
  openAccessProvider?: string,
}

export interface StatToolbarPopupRendered {
  type: LLAStatType.TOOLBAR_POPUP_RENDERED,
  instituteId: string,
  state: State,
  source: 'popup',
  referenceId: string,
  assistMessageId?: string,
  openAccessProvider?: string,
}

export interface StatAddBadge {
  type: LLAStatType.ADD_BADGES,
  instituteId: string,
  badges: string[],
}

export interface StatClickBadge {
  type: LLAStatType.CLICK_BADGE,
  instituteId: string,
}

export interface StatUpdateSettings {
  type: LLAStatType.UPDATE_SETTINGS,
  institutes: string[],
  synchronous: true,
  autoRedirect: boolean,
}

export interface StatEnhanceSearch {
  type: LLAStatType.ENHANCE_SEARCH,
  instituteId: string,
  url: string,
  redirectType: RedirectType,
}

export interface StatCustomRedirect {
  type: LLAStatType.CUSTOM_REDIRECT,
  instituteId: string,
  url: string,
  redirectType: 'customRedirected',
}

export interface StatAutoRedirect {
  type: LLAStatType.AUTO_REDIRECT,
  instituteId: string,
  url: string,
  redirectType: ResourceDomainTypes,
}

export interface StatOpenOnboardingTutorial {
  type: LLAStatType.OPEN_ONBOARDING_TUTORIAL,
  instituteId: string,
  openType: 'auto' | 'footerClick',
}

export interface StatSearchEngineSearch {
  type: LLAStatType.SEARCH_ENGINE_SEARCH,
  instituteId: string,
  searchEngineId: string,
}

export interface StatProcessClick {
  type: LLAStatType.PROCESS_CLICK,
  instituteId: string,
  state: State,
  createTab: string,
  linkType: State | 'content',
  referenceId: string,
  resourceReferenceId?: string,
  assistMessageId?: string,
  openAccessProvider?: string,
}

export interface StatConnect {
  type: LLAStatType.CONNECT,
  state: State,
  instituteId: string,
}

type StatAccess =
  | StatSetTabState
  | StatClickBadge
  | StatAddBadge
  | StatToolbarPopupRendered
  | StatContentPopupRendered
  | StatUpdateSettings
  | StatEnhanceSearch
  | StatCustomRedirect
  | StatAutoRedirect
  | StatOpenOnboardingTutorial
  | StatSearchEngineSearch
  | StatProcessClick
  | StatConnect;

export default StatAccess;
