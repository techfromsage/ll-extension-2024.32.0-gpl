/**
 * DocumentWithISBN extracts valid ISBNs from a Document, if they exist.
 */
import { v4 as uuidv4 } from 'uuid';
import uniqBy from 'lodash.uniqby';
import DigitalResourceType from '@/enums/DigitalResourceType';
import DocumentWithId from '@/interfaces/alternatives/DocumentWithId';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ScrapedContent, { ScrapedItem } from '@/interfaces/alternatives/ScrapedContent';
import ISBNFromText from '@/modules/alternatives/isbn//ISBNFromText';
import ISBNFromJSONLD from '@/modules/alternatives/isbn//ISBNFromJSONLD';

/**
 * Array Reducer function to get the first identifier it finds.
 *
 * @param result
 * @param scraper
 */
const reduceToFirstISBN = (result: string, scraper: ScrapedContent): string => {
  return result.length ? result : scraper.scrape();
};

/**
 * Creates a DocumentWithId object from a Document.
 * The scrape method extracts unique, validated ISBNs from the document's text
 * Returns an array of DigitalResource objects
 *
 * Additionally, removes phone and fax numbers inferred from context, as
 * the phone and fax numbers are formatted for ease of reading in identical
 * ways to ISBNs.
 *
 * @param {Document} document - The Document object to extract ISBNs from.
 * @returns {DocumentWithId} - An object with a scrape method that extracts ISBNs from the document.
 */
const DocumentWithISBN = (document: Document): DocumentWithId => {
  return {
    scrape: (): DigitalResource[] => {
      const identifier: string = [
        ISBNFromJSONLD(document),
        ISBNFromText(document),
      ].reduce(reduceToFirstISBN, '');

      return identifier
        ? [{
          type: DigitalResourceType.EBook,
          urls: [],
          identifier,
          referenceId: uuidv4(),
        }]
        : [];
    },
    scrapeAll: (): DigitalResource[] => {
      const identifiers: ScrapedItem[] = [
        ISBNFromJSONLD(document),
        ISBNFromText(document),
      ]
        .map(scraper => scraper.scrapeAll?.())
        .flat()
        .filter(Boolean);

      const uniqueItems = uniqBy(identifiers, item => item.identifier);

      return uniqueItems.map(item => ({
        type: DigitalResourceType.EBook,
        identifier: item.identifier,
        referenceId: uuidv4(),
        scraperType: item.scraper,
        urls: [],
      }));
    },
  };
};

export default DocumentWithISBN;
