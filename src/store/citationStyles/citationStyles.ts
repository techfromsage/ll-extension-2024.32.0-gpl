/**
 * citationStyles creates a slice for storing citation styles
 * for an institution.
 */

import { store, StoreSlice } from '@/store';

import FetchClient from '@/interfaces/http/FetchClient';
import CitationStyle from '@/interfaces/citation/CitationStyle';

export interface CitationStylesSlice {
  citation: {
    styles: CitationStyle[][],
    recent?: number,
  },
  fetchCitationStyles: (urlTemplate: string, httpClient: FetchClient) => Promise<void>,
}

/**
 * Obtains the citation styles for an institution
 */
export const createCitationStylesSlice: StoreSlice<CitationStylesSlice> = set => ({
  citation: {
    styles: [],
  },
  fetchCitationStyles: async (urlTemplate, httpClient) => {
    const { institutes, citation: { recent } } = store.getState();
    const promises = await Promise.all(institutes.map(async institute => {
      if (!institute.modules_enabled?.citations) {
        return [];
      }

      try {
        const url = urlTemplate.replace(/{instituteId}/g, institute.id);
        const { styles } = await httpClient.get<{ styles: CitationStyle[] }>(url);
        return styles;
      } catch (error) {
        return [];
      }
    }));
    set({ citation: { styles: promises, recent } });
  },
});
