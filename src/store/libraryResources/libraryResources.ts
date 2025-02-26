/**
 * libraryResources creates a slice for storing Futures
 * resources modules that an institution has set up.
 */

import { StoreSlice } from '@/store';
import LibraryResourcePayload from '@/interfaces/libraryResources/LibraryResourcePayload';
import FetchClient from '@/interfaces/http/FetchClient';
import Institution from '@/interfaces/Institution';

export interface LibraryResourcesSlice {
  libraryResources: LibraryResourcePayload[],
  fetchLibraryResources: (institutes: Institution[], url: string, httpClient: FetchClient) => Promise<LibraryResourcePayload[]>,
}

/**
 * Obtains the LibraryResource resource for an institution by making HTTP request.
 * Designed to be used in .map() function.
 */
const resourcesForInstitution = (urlTemplate: string, httpClient: FetchClient) =>
  async ({ id, modules_enabled }: Institution) => {
    if (!modules_enabled.futures) {
      return [];
    }
    try {
      const url = urlTemplate.replace(/{instituteId}/g, id);
      const { resources } = await httpClient.get<{ resources: LibraryResourcePayload[] }>(url);
      return Object.values(resources);
    } catch (error) {
      console.log('Error fetching library resources', error);
      return [];
    }
  };

export const createLibraryResourcesSlice: StoreSlice<LibraryResourcesSlice> = set => ({
  libraryResources: [],
  fetchLibraryResources: async (institutes, url, httpClient) => {
    const items = await Promise.all(institutes.map(resourcesForInstitution(url, httpClient)));
    const libraryResources = items.flat();
    set({ libraryResources });
    return libraryResources;
  },
});
