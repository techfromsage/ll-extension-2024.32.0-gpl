/**
 * Provides Access connection status for a given location.
 *
 * @see @/modules/access/Access.ts for more implementation.
 */
import Access from '@/modules/access/Access';
import Institution from '@/interfaces/Institution';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import InstitutionItems from '@/interfaces/InstitutionItems';
import AccessConnection from '@/interfaces/access/AccessConnection';
import { StoreState } from '@/store';
import merge from 'lodash.merge';

/**
 * @param {URL} currentLocation
 * @param {Institution[]} institutions
 * @param {InstitutionItems<ResourceDomain>} resourceDomains
 * @returns {AccessConnection[]}
 */
export default {
  accessFromScrapedPageData: (scrapedDomain: string, storeState: StoreState) => {
    return storeState.institutes.flatMap(institution => {
      return storeState.resourceDomains[institution.id]
        .filter(({ domain }) => domain.includes(scrapedDomain))
        .map(resource => {
          return {
            supported: true,
            connected: true,
            resource: merge(resource, { institution }),
          };
        });
    });
  },
  accessFromSignedInDomains: (
    currentLocation: URL,
    institutions: Institution[],
    resourceDomains: InstitutionItems<ResourceDomain>,
    signedInDomains: ResourceDomain[],
  ): AccessConnection[] => {
    return institutions.flatMap(institution => {
      return Access(
        institution,
        resourceDomains[institution.id],
        currentLocation,
        signedInDomains,
      );
    });
  },
};
