/**
 * Finds DOIs in JSON-LD (Linked Data)
 * @see https://json-ld.org/
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import DoiMatch from '@/modules/alternatives/doi/DoiMatch';
import GetIdFromJSONLD from '@/modules/alternatives/jsonld/GetIdFromJSONLD';

const DoiFromJSONLD = (document: Document): ScrapedContent => {
  const findDoi = () => {
    const element = document.querySelector('script[type="application/ld+json"]');
    if (!element?.innerHTML) {
      return '';
    }
    const jsonString = element.innerHTML.trim().replace(/[\r\n]/gm, '');
    const identifier = GetIdFromJSONLD(jsonString, 'doi');
    return DoiMatch.first(identifier);
  };

  return {
    scrape: findDoi,
    scrapeAll() {
      const doi = findDoi();
      return doi ? [{
        scraper: ScraperType.JSONLD,
        identifier: doi,
      }] : [];
    },
  };
};

export default DoiFromJSONLD;
