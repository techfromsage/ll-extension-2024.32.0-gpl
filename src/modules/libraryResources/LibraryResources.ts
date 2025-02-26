/**
 * Provides LibraryResource objects that available for the current page
 *
 * @see:
 *  https://newleanlibrary.atlassian.net/wiki/spaces/TEC/pages/624689153/Feature+Futures+-+Surveys
 *  https://newleanlibrary.atlassian.net/wiki/spaces/TEC/pages/620691457/Feature+Futures+-+Service+Desk
 *  https://newleanlibrary.atlassian.net/wiki/spaces/TEC/pages/621936865/Feature+Futures+-+FAQs
 *
 * for more product documentation.
 *
 */
import LibraryResourcePayload from '@/interfaces/libraryResources/LibraryResourcePayload';
import LibraryResource from '@/interfaces/libraryResources/LibraryResource';
import Institution from '@/interfaces/Institution';
import WildcardUrlMatch from '@/modules/shared/WildcardUrlMatch';

/**
 * Returns a set of libraryResources that should be shown on the current URL.
 *
 * @param {URL} url
 * @param {LibraryResourcePayload[]} libraryResourcePayloads
 * @param {Institution[]} institutions
 * @returns {LibraryResource[]}
 */
export default (url: URL, libraryResourcePayloads: LibraryResourcePayload[], institutions: Institution[]): LibraryResource[] => {
  return libraryResourcePayloads.filter(
    resourcePayload => {
      const match = WildcardUrlMatch(url);
      return resourcePayload.triggerUrls.some(domain => match.match(domain));
    },
  )
    .map(resourcePayload => {
      const institution = institutions.find(({ id }) => resourcePayload.institution === id);
      if (!institution) {
        return false;
      }
      return {
        ...resourcePayload,
        institution,
        shown: false,
        read: false,
      };
    })
    .filter(Boolean);
};
