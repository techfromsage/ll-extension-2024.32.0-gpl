import AppMethods, { HTTPRequestOptions } from '@/interfaces/browser/AppMethods';
import BrowserEvent from '@/enums/BrowserEvent';
import EventMessage from '@/interfaces/browser/EventMessage';
import AppSettings from '@/interfaces/AppSettings';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import StatAccess from '@/interfaces/StatEventsAccess';
import StatFutures from '@/interfaces/StatEventsFutures';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';
import PageData from '@/interfaces/messages/PageData';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import platformErrorTracking from './platformErrorTracking';

const app: AppMethods = {
  statEventFutures: stat => browser.runtime.sendMessage({ event: BrowserEvent.StatEventFutures, message: { stat } }),
  statEventAccess: stat => browser.runtime.sendMessage({ event: BrowserEvent.StatEventAccess, message: { stat } }),
  platformErrorTracking,
  contentScript: {
    updateInstitutions: institutionIds => {
      return browser.runtime.sendMessage({
        event: BrowserEvent.UpdateInstitutions,
        message: { institutionIds },
      });
    },
    determineAvailableFeatures: message => browser.runtime.sendMessage({
      event: BrowserEvent.DetermineNotifications,
      message,
    }),
    toggleAppActive: appActive => browser.runtime.sendMessage({
      event: BrowserEvent.AppStatusToggle,
      message: { appActive },
    }),
    updateUserPreferences: settings => browser.runtime.sendMessage({
      event: BrowserEvent.UpdateUserPreferences,
      message: { settings },
    }),
    fetchBaseData: () => browser.runtime.sendMessage({ event: BrowserEvent.FetchBaseData }),
    fetchUser: () => browser.runtime.sendMessage({ event: BrowserEvent.FetchUser }),
    signOut: () => browser.runtime.sendMessage({ event: BrowserEvent.SignOut }),
    addClosedPopupToHistory: popupId => browser.runtime.sendMessage({
      event: BrowserEvent.AddClosedPopupToHistory,
      message: { popupId },
    }),
    librarySearchQuery: (knowledgeBase, searchQuery) => browser.runtime.sendMessage({
      event: BrowserEvent.LibrarySearchQuery,
      message: { knowledgeBase, searchQuery },
    }),
    getFormattedCitation: (styleId, digitalResource) => browser.runtime.sendMessage({
      event: BrowserEvent.GetFormattedCitation,
      message: { styleId, digitalResource },
    }),
    fetchAnnotations: (uri, digitalResource, nonAcademicResource) => browser.runtime.sendMessage({
      event: BrowserEvent.FetchAnnotations,
      message: { uri, digitalResource, nonAcademicResource },
    }),
    saveHighlightedText: (pageData, digitalResource, nonAcademicResource) => browser.runtime.sendMessage({
      event: BrowserEvent.SaveHighlightedText,
      message: { pageData, digitalResource, nonAcademicResource },
    }),
    updateAnnotation: (pageData, digitalResource) => browser.runtime.sendMessage({
      event: BrowserEvent.UpdateAnnotation,
      message: { pageData, digitalResource },
    }),
    deleteAnnotation: (pageData, digitalResource) => browser.runtime.sendMessage({
      event: BrowserEvent.DeleteAnnotation,
      message: { pageData, digitalResource },
    }),
    httpRequest: request => browser.runtime.sendMessage({
      event: BrowserEvent.HTTPRequest,
      message: { request },
    }),
    signedInDomains: () => browser.runtime.sendMessage(
      { event: BrowserEvent.SignedInDomains },
    ),
    addSignedInDomains: domains => browser.runtime.sendMessage({
      event: BrowserEvent.AddSignedInDomains,
      message: { domains },
    }),
    openNewTab: url => browser.runtime.sendMessage({
      event: BrowserEvent.OpenNewTab,
      message: { url },
    }),
  },
  background: {
    listeners: {
      onUpdateInstitutions: (callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ institutionIds: string[] }>) => {
            if (event === BrowserEvent.UpdateInstitutions) {
              return callback(message.institutionIds);
            }
            return false;
          },
        );
      }),
      onDetermineAvailableFeatures: callback => {
        browser.runtime.onMessage.addListener(
          (message: EventMessage<PageData>, sender) => {
            if (message.event === BrowserEvent.DetermineNotifications) {
              const senderDetails = { tabId: sender.tab?.id || 0, url: sender.url || '' };
              return callback(message.message, senderDetails);
            }
            return false;
          },
        );
      },
      onToggleAppActive: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ appActive: boolean }>) => {
            if (event === BrowserEvent.AppStatusToggle) {
              return callback(message.appActive);
            }
            return false;
          },
        );
      },
      onInstalled: callback => {
        browser.runtime.onInstalled.addListener(details => {
          callback(details);
        });
      },
      onUpdateUserPreferences: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ settings: Partial<AppSettings> }>) => {
            if (event === BrowserEvent.UpdateUserPreferences) {
              return callback(message.settings);
            }
            return false;
          },
        );
      },
      onFetchBaseData: callback => {
        browser.runtime.onMessage.addListener(
          ({ event }) => {
            if (event === BrowserEvent.FetchBaseData) {
              return callback();
            }
            return false;
          },
        );
      },
      onFetchUser: callback => {
        browser.runtime.onMessage.addListener(
          ({ event }) => {
            if (event === BrowserEvent.FetchUser) {
              return callback();
            }
            return false;
          },
        );
      },
      onSignOut: callback => {
        browser.runtime.onMessage.addListener(
          ({ event }) => {
            if (event === BrowserEvent.SignOut) {
              return callback();
            }
            return false;
          },
        );
      },
      onAddClosedPopupToHistory: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ popupId: string }>) => {
            if (event === BrowserEvent.AddClosedPopupToHistory) {
              return callback(message.popupId);
            }
            return false;
          },
        );
      },
      onLibrarySearchQuery: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ knowledgeBase: KnowledgeBase, searchQuery: string }>) => {
            if (event === BrowserEvent.LibrarySearchQuery) {
              return callback(message.knowledgeBase, message.searchQuery);
            }
            return false;
          },
        );
      },
      onGetFormattedCitation: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ styleId: number, digitalResource: DigitalResource }>) => {
            if (event === BrowserEvent.GetFormattedCitation) {
              return callback(message.styleId, message.digitalResource);
            }
            return false;
          },
        );
      },
      onFetchAnnotations: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{
            uri: string,
            digitalResource: DigitalResource,
            nonAcademicResource: NonAcademicResource,
          }>) => {
            if (event === BrowserEvent.FetchAnnotations) {
              return callback(message.uri, message.digitalResource, message.nonAcademicResource);
            }
            return false;
          },
        );
      },
      onSaveHighlightedText: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{
            pageData: HighlightAndAnnotatePageData,
            digitalResource: DigitalResource,
            nonAcademicResource: NonAcademicResource,
          }>) => {
            if (event === BrowserEvent.SaveHighlightedText) {
              return callback(message.pageData, message.digitalResource, message.nonAcademicResource);
            }
            return false;
          },
        );
      },
      onUpdateAnnotation: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ pageData: HighlightAndAnnotatePageData, digitalResource: DigitalResource }>) => {
            if (event === BrowserEvent.UpdateAnnotation) {
              return callback(message.pageData, message.digitalResource);
            }
            return false;
          },
        );
      },
      onDeleteAnnotation: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ pageData: HighlightAndAnnotatePageData, digitalResource: DigitalResource }>) => {
            if (event === BrowserEvent.DeleteAnnotation) {
              return callback(message.pageData, message.digitalResource);
            }
            return false;
          },
        );
      },
      onHttpRequest: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ request: HTTPRequestOptions }>) => {
            if (event === BrowserEvent.HTTPRequest) {
              return callback(message.request);
            }
            return false;
          },
        );
      },
      onStatEventAccess: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ stat: StatAccess }>) => {
            return (event === BrowserEvent.StatEventAccess) && callback(message.stat);
          },
        );
      },
      onStatEventFutures: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ stat: StatFutures }>) => {
            return (event === BrowserEvent.StatEventFutures) && callback(message.stat);
          },
        );
      },
      onSignedInDomainsRequest: callback => {
        browser.runtime.onMessage.addListener(({ event }: EventMessage<Record<string, never>>) => {
          return (event === BrowserEvent.SignedInDomains) && callback();
        });
      },
      onAddSignedInDomains: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ domains: ResourceDomain[] }>) => {
            return (event === BrowserEvent.AddSignedInDomains) && callback(message.domains);
          },
        );
      },
      onOpenNewTab: callback => {
        browser.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ url: string }>) => {
            return (event === BrowserEvent.OpenNewTab) && callback(message.url);
          },
        );
      },
    },
  },
};

export default app;
