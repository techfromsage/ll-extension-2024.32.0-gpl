import AppMethods, { HTTPRequestOptions } from '@/interfaces/browser/AppMethods';
import BrowserEvent from '@/enums/BrowserEvent';
import EventMessage from '@/interfaces/browser/EventMessage';
import AppSettings from '@/interfaces/AppSettings';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import StatAccess from '@/interfaces/StatEventsAccess';
import StatFutures from '@/interfaces/StatEventsFutures';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';
import PageData from '@/interfaces/messages/PageData';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import platformErrorTracking from './platformErrorTracking';

const app: AppMethods = {
  statEventFutures: stat => {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.StatEventFutures, message: { stat } }, resolve);
    });
  },
  statEventAccess: stat => {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.StatEventAccess, message: { stat } }, resolve);
    });
  },
  platformErrorTracking,
  contentScript: {
    updateInstitutions: institutionIds => {
      return new Promise(resolve => {
        chrome.runtime.sendMessage({ event: BrowserEvent.UpdateInstitutions, message: { institutionIds } }, resolve);
      });
    },
    determineAvailableFeatures: message => {
      return new Promise(resolve => {
        chrome.runtime.sendMessage({ event: BrowserEvent.DetermineNotifications, message }, resolve);
      });
    },
    toggleAppActive: appActive => {
      return new Promise(resolve => {
        chrome.runtime.sendMessage({ event: BrowserEvent.AppStatusToggle, message: { appActive } }, resolve);
      });
    },
    updateUserPreferences: settings => {
      return new Promise(resolve => {
        chrome.runtime.sendMessage(
          { event: BrowserEvent.UpdateUserPreferences, message: { settings } },
          resolve,
        );
      });
    },
    fetchBaseData: () => new Promise<BackgroundStoreResponse>(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.FetchBaseData }, resolve);
    }),
    fetchUser: () => new Promise<BackgroundStoreResponse>(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.FetchUser }, resolve);
    }),
    signOut: () => new Promise<BackgroundStoreResponse>(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.SignOut }, resolve);
    }),
    addClosedPopupToHistory: popupId => new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.AddClosedPopupToHistory, message: { popupId } }, resolve);
    }),
    librarySearchQuery: (knowledgeBase, searchQuery) => new Promise(resolve => {
      chrome.runtime.sendMessage({
        event: BrowserEvent.LibrarySearchQuery,
        message: { knowledgeBase, searchQuery },
      }, resolve);
    }),
    getFormattedCitation: (styleId, digitalResource) => new Promise(resolve => {
      chrome.runtime.sendMessage({
        event: BrowserEvent.GetFormattedCitation,
        message: { styleId, digitalResource },
      }, resolve);
    }),
    fetchAnnotations: (uri, digitalResource, nonAcademicResource) => new Promise(resolve => {
      chrome.runtime.sendMessage({
        event: BrowserEvent.FetchAnnotations,
        message: { uri, digitalResource, nonAcademicResource },
      }, resolve);
    }),
    saveHighlightedText: (pageData, digitalResource, nonAcademicResource) => new Promise(resolve => {
      chrome.runtime.sendMessage({
        event: BrowserEvent.SaveHighlightedText,
        message: { pageData, digitalResource, nonAcademicResource },
      }, resolve);
    }),
    updateAnnotation: (pageData, digitalResource) => new Promise(resolve => {
      chrome.runtime.sendMessage({
        event: BrowserEvent.UpdateAnnotation,
        message: { pageData, digitalResource },
      }, resolve);
    }),
    deleteAnnotation: (pageData, digitalResource) => new Promise(resolve => {
      chrome.runtime.sendMessage({
        event: BrowserEvent.DeleteAnnotation,
        message: { pageData, digitalResource },
      }, resolve);
    }),
    httpRequest: request => new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.HTTPRequest, message: { request } }, resolve);
    }),
    signedInDomains: () => new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.SignedInDomains }, resolve);
    }),
    addSignedInDomains: domains => new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.AddSignedInDomains, message: { domains } }, resolve);
    }),
    openNewTab: url => new Promise(resolve => {
      chrome.runtime.sendMessage({ event: BrowserEvent.OpenNewTab, message: { url } }, resolve);
    }),
  },
  background: {
    listeners: {
      onUpdateInstitutions: (callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ institutionIds: string[] }>, _, sendResponse) => {
            if (event === BrowserEvent.UpdateInstitutions) {
              callback(message.institutionIds).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      }),
      onDetermineAvailableFeatures: callback => {
        chrome.runtime.onMessage.addListener(
          (message: EventMessage<PageData>, sender, sendResponse) => {
            if (message.event === BrowserEvent.DetermineNotifications) {
              const senderDetails = { tabId: sender.tab?.id || 0, url: sender.url || '' };
              callback(message.message, senderDetails).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onToggleAppActive: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ appActive: boolean }>, _, sendResponse) => {
            if (event === BrowserEvent.AppStatusToggle) {
              callback(message.appActive).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onInstalled: callback => {
        chrome.runtime.onInstalled.addListener(details => {
          callback(details);
        });
      },
      onUpdateUserPreferences: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ settings: Partial<AppSettings> }>, _, sendResponse) => {
            if (event === BrowserEvent.UpdateUserPreferences) {
              callback(message.settings).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onFetchBaseData: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event }: EventMessage<Record<string, never>>, _, sendResponse) => {
            if (event === BrowserEvent.FetchBaseData) {
              callback().then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onFetchUser: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event }: EventMessage<Record<string, never>>, _, sendResponse) => {
            if (event === BrowserEvent.FetchUser) {
              callback().then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onSignOut: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event }: EventMessage<Record<string, never>>, _, sendResponse) => {
            if (event === BrowserEvent.SignOut) {
              callback().then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onAddClosedPopupToHistory: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ popupId: string }>, _, sendResponse) => {
            if (event === BrowserEvent.AddClosedPopupToHistory) {
              callback(message.popupId).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onLibrarySearchQuery: callback => {
        chrome.runtime.onMessage.addListener(
          ({
            event,
            message,
          }: EventMessage<{ knowledgeBase: KnowledgeBase, searchQuery: string }>, _, sendResponse) => {
            if (event === BrowserEvent.LibrarySearchQuery) {
              callback(message.knowledgeBase, message.searchQuery).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onGetFormattedCitation: callback => {
        chrome.runtime.onMessage.addListener(
          ({
            event,
            message,
          }: EventMessage<{ styleId: number, digitalResource: DigitalResource }>, _, sendResponse) => {
            if (event === BrowserEvent.GetFormattedCitation) {
              callback(message.styleId, message.digitalResource).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onFetchAnnotations: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{
            uri: string,
            digitalResource: DigitalResource,
            nonAcademicResource: NonAcademicResource,
          }>, _, sendResponse) => {
            if (event === BrowserEvent.FetchAnnotations) {
              callback(message.uri, message.digitalResource, message.nonAcademicResource).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onSaveHighlightedText: callback => {
        chrome.runtime.onMessage.addListener(
          ({
            event,
            message,
          }: EventMessage<{
            pageData: HighlightAndAnnotatePageData,
            digitalResource: DigitalResource,
            nonAcademicResource: NonAcademicResource,
          }>, _, sendResponse) => {
            if (event === BrowserEvent.SaveHighlightedText) {
              callback(message.pageData, message.digitalResource, message.nonAcademicResource).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onUpdateAnnotation: callback => {
        chrome.runtime.onMessage.addListener(
          ({
            event,
            message,
          }: EventMessage<{ pageData: HighlightAndAnnotatePageData, digitalResource: DigitalResource }>, _, sendResponse) => {
            if (event === BrowserEvent.UpdateAnnotation) {
              callback(message.pageData, message.digitalResource).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onDeleteAnnotation: callback => {
        chrome.runtime.onMessage.addListener(
          ({
            event,
            message,
          }: EventMessage<{ pageData: HighlightAndAnnotatePageData, digitalResource: DigitalResource }>, _, sendResponse) => {
            if (event === BrowserEvent.DeleteAnnotation) {
              callback(message.pageData, message.digitalResource).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onHttpRequest: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ request: HTTPRequestOptions }>, _, sendResponse) => {
            if (event === BrowserEvent.HTTPRequest) {
              callback(message.request).then(sendResponse).catch(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onStatEventAccess: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ stat: StatAccess }>, _, sendResponse) => {
            if (event === BrowserEvent.StatEventAccess) {
              callback(message.stat).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onStatEventFutures: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ stat: StatFutures }>, _, sendResponse) => {
            if (event === BrowserEvent.StatEventFutures) {
              callback(message.stat).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onSignedInDomainsRequest: callback => {
        chrome.runtime.onMessage.addListener((message: EventMessage<Record<string, never>>, _, sendResponse) => {
          if (message.event === BrowserEvent.SignedInDomains) {
            callback().then(sendResponse);
            return true;
          }
          return false;
        });
      },
      onAddSignedInDomains: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ domains: ResourceDomain[] }>, _, sendResponse) => {
            if (event === BrowserEvent.AddSignedInDomains) {
              callback(message.domains).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
      onOpenNewTab: callback => {
        chrome.runtime.onMessage.addListener(
          ({ event, message }: EventMessage<{ url: string }>, _, sendResponse) => {
            if (event === BrowserEvent.OpenNewTab) {
              callback(message.url).then(sendResponse);
              return true;
            }
            return false;
          },
        );
      },
    },
  },
};

export default app;
