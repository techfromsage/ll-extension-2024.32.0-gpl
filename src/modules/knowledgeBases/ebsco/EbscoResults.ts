/**
 * Extracts results from an EBSCO response.
 *
 * [
 *   {
 *      "Name": "Title",
 *      "Label": "Title",
 *      "Group": "Ti",
 *      "Data": "Gold : the race for the worlds most seductive metal / Matthew Hart."
 *    },
 *    {
 *      "Name": "Author",
 *      "Label": "Authors",
 *      "Group": "Au",
 *      "Data": "Some Author"
 *    },
 * ]
 *
 * becomes:
 *
 * {
 *   Title: 'Gold : the race for the worlds most seductive metal / Matthew Hart.',
 *   Author: 'Some Author',
 * }
 */

import ProviderResponseEbsco, {
  ResponseEbscoResultItem,
} from '@/interfaces/librarySearches/ebsco/ProviderResponseEbsco';

/**
 * Converts the array of key value pairs into a single key value pair object.
 * A seen in the example at top of this page.
 *
 * @param {Record<string, any>} all
 * @param {ResponseSharepointResult} entry
 * @returns Record<string, any>
 */
const reduceToKeyValuePair = (all: Record<string, any>, { Name, Data }: ResponseEbscoResultItem) =>
  ({ ...all, [Name]: Data });

export default (response: ProviderResponseEbsco): Record<string, any>[] =>
  (response.SearchResult.Data.Records
    ? response.SearchResult.Data.Records
      .map(record => {
        return {
          ...record.Items.reduce(reduceToKeyValuePair, {}),
          db: record.Header.DbId,
          an: record.Header.An,
        };
      })
    : []);
