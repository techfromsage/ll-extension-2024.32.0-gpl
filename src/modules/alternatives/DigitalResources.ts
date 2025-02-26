/**
 * Scrapes a document for any digital resources.
 * i.e. a DOI suggest an article and/or ISBN(s) suggest book(s).
 */
import { DoiScraperConfig } from '@/interfaces/Config';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DocumentWithId from '@/interfaces/alternatives/DocumentWithId';
import DocumentWithDoi from './doi/DocumentWithDoi';
import DocumentWithISBN from './isbn/DocumentWithISBN';
import DocumentWithPMID from './pmid/DocumentWithPMID';

/**
 * @param {DigitalResource[]} resources
 * @param {DocumentWithId} doc
 * @returns {DigitalResource[]}
 */
const reduceToFirstIdFound = (resources: DigitalResource[], doc: DocumentWithId) => {
  return resources.length ? resources : doc.scrapeAll();
};

/**
 * @param {Document} document The HTML of the page
 * @param {URL} location The URL of the page
 * @param {boolean} ebookEnabled True/false if ebook functionality is enabled for user
 * @param {DoiScraperConfig[]} doiScraperConfig The predefined scraping config for specific domains.
 *
 * @returns {{find: () => DigitalResource[]}} A set of zero or more ISBNs/DOIs
 * @constructor
 */
const DigitalResources = (
  document: Document,
  location: URL,
  ebookEnabled: boolean,
  doiScraperConfig: DoiScraperConfig[],
  demandMetadata = false,
) => ({
  find: (): DigitalResource[] => {
    const resources = [
      DocumentWithDoi(document, location, doiScraperConfig),
      ebookEnabled && DocumentWithISBN(document),
      DocumentWithPMID(document, location),
    ];

    // Normal case, for LL and Sciwheel article pages
    if (!demandMetadata) {
      return resources
        .filter(Boolean)
        .flat()
        .reduce(reduceToFirstIdFound, []);
    }

    // On-demand metadata for all resources with a greedy scrape, Sciwheel search pages
    return resources
      .filter(Boolean)
      .flat()
      .reduce((acc: DigitalResource[], doc: DocumentWithId) => {
        if (doc.scrapeGreedy) {
          return acc.length ? acc : doc.scrapeGreedy();
        }

        return acc.length ? acc : doc.scrapeAll();
      }, []);
  },
});

export default DigitalResources;
