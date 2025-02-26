import NotificationUI from '@/interfaces/ui/NotificationUI';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';
import FeatureStateValues from '@/interfaces/stateMachine/FeatureStateValues';
import AppSettings from '@/interfaces/AppSettings';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import { SessionStoreState, StoreState } from '@/store';
import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import StatAccess from '@/interfaces/StatEventsAccess';
import StatFutures from '@/interfaces/StatEventsFutures';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import CitationResponse from '@/interfaces/citation/CitationResponse';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';
import PageData from '@/interfaces/messages/PageData';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import PlatformErrorTracking from '../PlatformErrorTracking';

export interface SenderDetails {
  tabId: number,
  url: string,
}

export interface FeaturesDetermined {
  notifications: NotificationUI[],
  libraryServices: LibraryServicesItem[],
  featureValues: FeatureStateValues,
  knowledgeBases: KnowledgeBase[],
}

export type HTTPRequestOptions = {
  method: 'post' | 'get' | 'redirect',
  url: string,
  headers?: HeadersInit,
  body?: BodyInit,
};

export type HTTPRequest = <Payload>(request: HTTPRequestOptions) => Promise<Payload>;

/**
 * Methods that are app/domain specific.
 * e.g. updating institution
 */
interface AppMethods {
  statEventFutures: (stat: StatFutures) => void,
  statEventAccess: (stat: StatAccess) => void,
  platformErrorTracking: PlatformErrorTracking,
  contentScript: {
    updateInstitutions: (institutionIds: string[]) => Promise<BackgroundStoreResponse>,
    determineAvailableFeatures: (message: PageData) => Promise<FeaturesDetermined>,
    toggleAppActive: (appActive: boolean) => Promise<StoreState>,
    updateUserPreferences: (settings: Partial<AppSettings>) => Promise<StoreState>,
    fetchBaseData: () => Promise<BackgroundStoreResponse>,
    fetchUser: () => Promise<BackgroundStoreResponse>,
    signOut: () => Promise<BackgroundStoreResponse>,
    addClosedPopupToHistory: (popupId: string) => Promise<SessionStoreState>,
    librarySearchQuery: (knowledgeBase: KnowledgeBase, searchQuery: string) => Promise<KnowledgeBaseResponse>,
    getFormattedCitation: (styleId: number, digitalResource: DigitalResource) => Promise<CitationResponse>,
    saveHighlightedText: (
      pageData: HighlightAndAnnotatePageData,
      digitalResource: DigitalResource,
      nonAcademicResource: NonAcademicResource,
    ) => Promise<HighlightAndAnnotateResponse>,
    fetchAnnotations: (
      uri: string,
      digitalResource: DigitalResource,
      nonAcademicResource: NonAcademicResource
    ) => Promise<HighlightAndAnnotateResponse>,
    updateAnnotation: (pageData: HighlightAndAnnotatePageData, digitalResource: DigitalResource)
    => Promise<HighlightAndAnnotateResponse>,
    deleteAnnotation: (pageData: HighlightAndAnnotatePageData, digitalResource: DigitalResource)
    => Promise<HighlightAndAnnotateResponse>,
    httpRequest: <Payload>(request: HTTPRequestOptions) => Promise<Payload>,
    signedInDomains: () => Promise<ResourceDomain[]>,
    addSignedInDomains: (domains: ResourceDomain[]) => Promise<void>,
    openNewTab: (url: string) => Promise<void>,
  },
  background: {
    listeners: {
      onUpdateInstitutions: (
        callback: (institutionIds: string[]) => Promise<BackgroundStoreResponse>
      ) => void,
      onDetermineAvailableFeatures: (
        callback: (message: PageData, senderDetails: SenderDetails) => Promise<FeaturesDetermined>
      ) => void,
      onToggleAppActive: (
        callback: (appActive: boolean) => Promise<StoreState>
      ) => void,
      onInstalled: (
        callback: (installDetails: browser.runtime._OnInstalledDetails | chrome.runtime.InstalledDetails) => void
      ) => void,
      onUpdateUserPreferences: (
        callback: (settings: Partial<AppSettings>) => Promise<StoreState>
      ) => void,
      onFetchBaseData: (callback: () => Promise<BackgroundStoreResponse>) => void,
      onFetchUser: (callback: () => Promise<BackgroundStoreResponse>) => void,
      onSignOut: (callback: () => Promise<BackgroundStoreResponse>) => void,
      onAddClosedPopupToHistory: (callback: (popupId: string) => Promise<SessionStoreState>) => void,
      onLibrarySearchQuery: (
        callback: (knowledgeBase: KnowledgeBase, searchQuery: string) => Promise<KnowledgeBaseResponse>
      ) => void,
      onGetFormattedCitation: (
        callback: (styleId: number, metadata: DigitalResource) => Promise<CitationResponse>,
      ) => void,
      onFetchAnnotations: (
        callback: (
          uri: string,
          digitalResource: DigitalResource,
          nonAcademicResource: NonAcademicResource,
        ) => Promise<HighlightAndAnnotateResponse>,
      ) => void,
      onSaveHighlightedText: (
        callback: (
          pageData: HighlightAndAnnotatePageData,
          digitalResource: DigitalResource,
          nonAcademicResource: NonAcademicResource,
        ) => Promise<HighlightAndAnnotateResponse>,
      ) => void,
      onUpdateAnnotation: (
        callback: (pageData: HighlightAndAnnotatePageData, metadata: DigitalResource) => Promise<HighlightAndAnnotateResponse>,
      ) => void,
      onDeleteAnnotation: (
        callback: (pageData: HighlightAndAnnotatePageData, metadata: DigitalResource) => Promise<HighlightAndAnnotateResponse>,
      ) => void,
      onHttpRequest: (
        callback: (request: HTTPRequestOptions) => Promise<any>,
      ) => void,
      onStatEventAccess: (
        callback: (stat: StatAccess) => Promise<void>,
      ) => void,
      onStatEventFutures: (
        callback: (stat: StatFutures) => Promise<void>,
      ) => void,
      onSignedInDomainsRequest: (callback: () => Promise<ResourceDomain[]>) => void,
      onAddSignedInDomains: (callback: (domains: ResourceDomain[]) => Promise<void>) => void,
      onOpenNewTab: (callback: (url: string) => Promise<void>) => void,
    },
  },
}

export default AppMethods;
