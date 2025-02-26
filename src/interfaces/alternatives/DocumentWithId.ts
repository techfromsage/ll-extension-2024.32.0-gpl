/**
 * Interface DocumentWithId is used to standardise scraping an Identifier (DOI or ISBN)
 * from an HTMl/XML document.
 *
 * Classes/Functions that implement this can be relied on to
 * provide a standardised method to obtain this data.
 *
 * @see DocumentWithDOI
 */
import DigitalResource from '@/interfaces/alternatives/DigitalResource';

interface DocumentWithId {
  // returns first identifier found or empty array, and stops scraping
  scrape: () => DigitalResource[],
  // returns all identifiers found
  scrapeAll: () => DigitalResource[],
  scrapeGreedy?: () => DigitalResource[],
}

export default DocumentWithId;
