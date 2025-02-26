import browserMethods from '@/browserMethods';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// Slice Imports
// --- --- --- :) --- --- ---
// Shared
import { AppActiveSlice, createAppActiveSlice } from '@/store/shared/appActive';
import { AppSettingsSlice, createAppSettingsSlice } from '@/store/shared/appSettings/appSettings';
import { ContentSlice, createContentSlice } from '@/store/shared/content';
import { createInstitutionSlice, InstitutionSlice } from '@/store/shared/institution';
import { createNotificationsOrderSlice, NotificationsOrderSlice } from '@/store/shared/notificationsOrder';
import { createSettingsSlice, SettingsSlice } from '@/store/shared/settings';
import { createUserPreferencesSlice, UserPreferencesSlice } from '@/store/shared/userPreferences/userPreferences';
import { createStatEventsSlice, StatEventsSlice } from '@/store/shared/stats/stats';
import { createDefaultInstitutionSlice, DefaultInstitutionSlice } from '@/store/shared/defaultInstitution';
import { createCurrentIpSlice, CurrentIpSlice } from '@/store/shared/currentIp';
import { createSignedInDomainsSlice, SignedInDomainsSlice } from '@/store/shared/signedInDomains';

// Session
import { createSessionSlice, SessionSlice } from '@/store/shared/session/session';
import { createSessionRedirectedTabsSlice, SessionRedirectedTabsSlice } from '@/store/shared/session/redirectedTabs';
import { createSessionTabHistorySlice, SessionTabHistorySlice } from '@/store/shared/session/tabHistory';
import { createSessionPopupSlice, SessionPopupSlice } from '@/store/shared/session/popup';

// Library Resources / Searches
import { createLibraryResourcesSlice, LibraryResourcesSlice } from '@/store/libraryResources/libraryResources';
import { createLibrarySearchesSlice, LibrarySearchesSlice } from '@/store/librarySearches/librarySearches';

// Assist
import { createCustomMessagesSlice, CustomMessagesSlice } from '@/store/assist/customMessages';

// Access
import { createResourceDomainsSlice, ResourceDomainsSlice } from '@/store/access/storeResourceDomains';
import { createCustomRedirectsSlice, CustomRedirectsSlice } from '@/store/access/storeCustomRedirects';

// Keyword Enhancements
import { createKeywordPackagesSlice, KeywordPackagesSlice } from '@/store/keywordPackages/keywordPackages';
import StoreNamespace from '@/enums/StoreNamespace';

// Citation
import { CitationStylesSlice, createCitationStylesSlice } from '@/store/citationStyles/citationStyles';

// Sciwheel
import { createUserSlice, UserSlice } from '@/store/sciwheel/user';
import { createProjectSlice, ProjectSlice } from './sciwheel/projects';
import { createReferenceManagerSettingsSlice, ReferenceManagerSettingsSlice } from './sciwheel/settings';

export type StoreState =
  AppActiveSlice &
  AppSettingsSlice &
  ContentSlice &
  CustomMessagesSlice &
  CustomRedirectsSlice &
  InstitutionSlice &
  LibraryResourcesSlice &
  NotificationsOrderSlice &
  ResourceDomainsSlice &
  SettingsSlice &
  UserPreferencesSlice &
  LibrarySearchesSlice &
  KeywordPackagesSlice &
  CitationStylesSlice &
  DefaultInstitutionSlice &
  CurrentIpSlice &
  UserSlice &
  ProjectSlice &
  ReferenceManagerSettingsSlice &
  SignedInDomainsSlice;

export type SessionStoreState =
  SessionRedirectedTabsSlice &
  SessionSlice &
  SessionTabHistorySlice &
  SessionPopupSlice;

export type StoreSlice<T extends Partial<StoreState>> =
  StateCreator<StoreState, [['zustand/devtools', never], ['zustand/persist', unknown]], [], T>;

export const store = create<StoreState, [['zustand/devtools', never], ['zustand/persist', unknown]]>(
  devtools(
    persist(
      (...args) => (
        {
          ...createAppActiveSlice(...args),
          ...createAppSettingsSlice(...args),
          ...createContentSlice(...args),
          ...createCustomMessagesSlice(...args),
          ...createCustomRedirectsSlice(...args),
          ...createInstitutionSlice(...args),
          ...createLibraryResourcesSlice(...args),
          ...createNotificationsOrderSlice(...args),
          ...createResourceDomainsSlice(...args),
          ...createSettingsSlice(...args),
          ...createUserPreferencesSlice(...args),
          ...createLibrarySearchesSlice(...args),
          ...createKeywordPackagesSlice(...args),
          ...createCitationStylesSlice(...args),
          ...createDefaultInstitutionSlice(...args),
          ...createCurrentIpSlice(...args),
          ...createUserSlice(...args),
          ...createProjectSlice(...args),
          ...createReferenceManagerSettingsSlice(...args),
          ...createSignedInDomainsSlice(...args),
        }
      ),
      {
        name: StoreNamespace.PersistedDefault,
        storage: createJSONStorage(browserMethods.runtime.storage),
        onRehydrateStorage: () => () => {
          store.setState({ _hasHydrated: true });
        },
      },
    ),
  ),
);

/**
 * Session Store - separate storage due to the frequency of changes.
*/
export type SessionStoreSlice<T extends Partial<SessionStoreState>> =
StateCreator<SessionStoreState, [['zustand/persist', unknown]], [], T>;

export const sessionStore = create<SessionStoreState, [['zustand/persist', unknown]]>(
  persist(
    (...args) => (
      {
        ...createSessionRedirectedTabsSlice(...args),
        ...createSessionSlice(...args),
        ...createSessionTabHistorySlice(...args),
        ...createSessionPopupSlice(...args),
      }
    ),
    {
      name: StoreNamespace.Session,
      storage: createJSONStorage(browserMethods.runtime.session),
    },
  ),
);

/**
 * Stats Store - separate storage due to the frequency of changes.
 */
export type StatsStoreSlice<T extends Partial<StatEventsSlice>> =
  StateCreator<StatEventsSlice, [['zustand/persist', unknown]], [], T>;

export const statStore = create<StatEventsSlice, [['zustand/persist', unknown]]>(
  persist(
    createStatEventsSlice,
    {
      name: StoreNamespace.PersistedStat,
      storage: createJSONStorage(browserMethods.runtime.storage),
    },
  ),
);
