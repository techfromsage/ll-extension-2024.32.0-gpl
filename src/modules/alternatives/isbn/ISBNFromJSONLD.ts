/**
 * Finds ISBNs in JSON-LD (Linked Data)
 * @see https://json-ld.org/
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import ISBNMatch from '@/modules/alternatives/isbn/ISBNMatch';
import GetIdFromJSONLD from '@/modules/alternatives/jsonld/GetIdFromJSONLD';

const ISBNFromJSONLD = (document: Document): ScrapedContent => {
  const findISBN = (): string => {
    const element = document.querySelector('script[type="application/ld+json"]');
    if (!element?.innerHTML) {
      return '';
    }
    const jsonString = element.innerHTML.trim().replace(/[\r\n]/gm, '');
    const identifier = GetIdFromJSONLD(jsonString, 'isbn');
    return ISBNMatch.first(identifier);
  };

  return {
    scrape: findISBN,
    scrapeAll() {
      const isbn = findISBN();
      return isbn ? [{
        scraper: ScraperType.JSONLD,
        identifier: isbn,
      }] : [];
    },
  };
};

export default ISBNFromJSONLD;
