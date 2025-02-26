/**
 * storeCustomRedirects creates a slice for storing Custom Redirects
 * that an institution has set up.
 *
 * We add in the institution ID as extra metadata so that we know which
 * institution triggered the redirect and can display the correct logo to the user.
 *
 */
import { StoreSlice } from '@/store';
import CustomRedirect from '@/interfaces/access/CustomRedirect';
import FetchClient from '@/interfaces/http/FetchClient';

export interface CustomRedirectsSlice {
  customRedirects: CustomRedirect[],
  fetchCustomRedirects: (instituteIds: string[], url: string, httpClient: FetchClient) => Promise<CustomRedirect[]>,
}

type CustomRedirectResponse = {
  customRedirects: CustomRedirect[],
};

export const createCustomRedirectsSlice: StoreSlice<CustomRedirectsSlice> = set => ({
  customRedirects: [],
  fetchCustomRedirects: async (instituteIds, url, httpClient) => {
    const promises = instituteIds.map(id => httpClient
      .get<CustomRedirectResponse>(url.replace(/{instituteId}/g, id))
      .then(data => data.customRedirects.map(redirect => ({ ...redirect, institution: id }))));
    const allRedirects = await Promise.all(promises);
    const customRedirects = allRedirects.flat();
    set({ customRedirects });
    return customRedirects;
  },
});
