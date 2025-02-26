/**
 * librarySearches creates a slice for storing Futures
 * Search configs that an institution has set up.
 */

import { store, StoreSlice } from '@/store';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import FetchClient from '@/interfaces/http/FetchClient';

export interface LibrarySearchesSlice {
  librarySearches: KnowledgeBase[],
  fetchLibrarySearches: (
    url: string,
    resultsLimit: number,
    httpClient: FetchClient
  ) => Promise<KnowledgeBase[]>,
}

/**
 * Obtains the LibraryResource resource for an institution by making HTTP request.
 * Designed to be used in .map() function.
 */
const searchesForInstitution = async (url: string, instituteId: string, httpClient: FetchClient) => {
  try {
    const { librarySearch } = await httpClient
      .get<{ librarySearch: KnowledgeBase[] }>(url.replace(/{instituteId}/g, instituteId));
    return Object.values(librarySearch);
  } catch (error) {
    console.log('Error fetching library searches', error);
    return [];
  }
};

export const createLibrarySearchesSlice: StoreSlice<LibrarySearchesSlice> = set => ({
  librarySearches: [],
  fetchLibrarySearches: async (url, resultsLimit, httpClient) => {
    const { institutes: [institute] } = store.getState();
    if (!institute?.modules_enabled.library_search) {
      set({ librarySearches: [] });
      return [];
    }
    const items = await searchesForInstitution(url, institute.id, httpClient);
    const librarySearches = items.flatMap(item => ({ ...item, resultsLimit }));
    set({ librarySearches });
    return librarySearches;
  },
});
