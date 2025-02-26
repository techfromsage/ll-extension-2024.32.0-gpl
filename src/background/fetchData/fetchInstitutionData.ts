import { store, StoreState } from '@/store';
import browserMethods from '@/browserMethods';
import bootstrap from '@bootstrap/index';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import StoreNamespace from '@/enums/StoreNamespace';
import StoreInstituteIds from '@/interfaces/StoreInstituteIds';
import configure from '@/background/fetchData/configure';

/**
 * Handles retrying a function call if it fails.
 */
const fetchWithRetry = async (
  fetchFunc: (storeState: StoreState) => any,
  storeState: StoreState,
  retries = 3,
): Promise<unknown> => {
  try {
    return fetchFunc(storeState);
  } catch (error) {
    if (retries === 0) {
      console.log('A fetch function broke');
      throw error;
    }
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    return fetchWithRetry(fetchFunc, storeState, retries - 1);
  }
};

/**
 * Iterate through each fetch function and fetch the data.
 * Each function is wrapped in a fetchWithRetry function in case it fails and needs to try again
 */
const serialFetches = async (promise: Promise<any>, fetchFunc: (storeState: StoreState) => any) =>
  promise.then(() => fetchWithRetry(fetchFunc, store.getState()));

/**
 * Fetches institution data from APIs.
 * This gets called:
 * - after the user has selected/changed their institutions
 * - Periodically see refreshData alarm
 * - on extension update
 */
const fetchInstitutionData = async (retries = 3): Promise<BackgroundStoreResponse> => {
  try {
    const res = await browserMethods.storage.getItem<StoreInstituteIds>(StoreNamespace.InstituteIds);
    const { instituteIds } = res;
    const fetchFuncs: ((state: StoreState) => any)[] = [
      state => state.fetchInstitution(instituteIds, bootstrap.api.institute, bootstrap.api.instituteSettings, HTTPClient),
      state => state.fetchInstitutionTranslations(instituteIds, bootstrap.api.translations, HTTPClient),
      state => state.fetchInstitutionsDeniedDomains(instituteIds, bootstrap.api.deniedDomains, HTTPClient),
      state => state.fetchResourceDomains(instituteIds, bootstrap.api.resourceDomains, HTTPClient),
      state => state.fetchCustomMessages(instituteIds, bootstrap.api.customMessages, HTTPClient),
      state => state.fetchCustomRedirects(instituteIds, bootstrap.api.customRedirects, HTTPClient),
      state => state.fetchLibraryResources(state.institutes, bootstrap.api.libraryResources, HTTPClient),
      state => state.fetchLibrarySearches(bootstrap.api.librarySearch, bootstrap.searchResultsLimit, HTTPClient),
      state => state.fetchKeywordPackages(bootstrap.api.keywordEnhancements, HTTPClient),
      state => state.fetchCitationStyles(bootstrap.api.citation.styles, HTTPClient),
    ];

    await fetchFuncs.reduce(serialFetches, Promise.resolve());
    configure(store.getState());
    return { storeState: store.getState(), status: 'success' };
  } catch (error) {
    console.log('Institution data did not sync', error);
    if (retries === 0) {
      return { storeState: store.getState(), status: 'failed' };
    }
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    return fetchInstitutionData(retries - 1);
  }
};

export default fetchInstitutionData;
