/**
 * keywordEnhancements creates a slice for storing Futures
 * keyword enhancement (ex content integration) that an
 * institution has set up.
 */

import { store, StoreSlice } from '@/store';

import keywordPackageColors from '@/store/keywordPackages/keywordPackageColors';
import FetchClient from '@/interfaces/http/FetchClient';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';

export interface KeywordPackagesSlice {
  keywordPackages: KeywordPackage[],
  fetchKeywordPackages: (urlTemplate: string, httpClient: FetchClient) => Promise<KeywordPackage[]>,
}

/**
 * Obtains the KeywordEnhancements packages for an institution
 */
export const createKeywordPackagesSlice: StoreSlice<KeywordPackagesSlice> = set => ({
  keywordPackages: [],
  fetchKeywordPackages: async (urlTemplate, httpClient) => {
    const { institutes: [institute] } = store.getState();
    if (!institute?.modules_enabled.keyword_enhancement) {
      set({ keywordPackages: [] });
      return [];
    }
    try {
      const url = urlTemplate.replace(/{instituteId}/g, institute.id);
      const { packages } = await httpClient.get<{ packages: KeywordPackage[] }>(url);
      const keywordPackages = packages.map((keywordPackage, index) => ({
        ...keywordPackage,
        color: keywordPackageColors[index],
      }));
      set({ keywordPackages });
      return keywordPackages;
    } catch (error) {
      set({ keywordPackages: [] });
      return [];
    }
  },
});
