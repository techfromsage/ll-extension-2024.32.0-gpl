/**
 * storeResourceDomains creates a slice for storing Resource Domains
 * that an institution has subscribed access to.
 *
 * We store these so that we can then compare them to the users current
 * URL to see if they match. If so, we provide access.
 */
import { StoreSlice } from '@/store';
import InstitutionItems from '@/interfaces/InstitutionItems';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import FetchClient from '@/interfaces/http/FetchClient';

export interface ResourceDomainsSlice {
  resourceDomains: InstitutionItems<ResourceDomain>,
  fetchResourceDomains: (
    instituteIds: string[],
    url: string,
    httpClient: FetchClient
  ) => Promise<InstitutionItems<ResourceDomain>>,
}

type ResourceDomainsResponse = {
  resourceDomains: { [type: string]: ResourceDomain[] },
};

export const createResourceDomainsSlice: StoreSlice<ResourceDomainsSlice> = set => ({
  resourceDomains: {},
  fetchResourceDomains: async (instituteIds, url, httpClient) => {
    const promises = instituteIds.map(id => httpClient
      .get<ResourceDomainsResponse>(url.replace(/{instituteId}/g, id))
      .then(data => [id, Object.values(data.resourceDomains).flat()]));
    const items = await Promise.all(promises);
    const resourceDomains = Object.fromEntries(items);
    set({ resourceDomains });
    return resourceDomains;
  },
});
