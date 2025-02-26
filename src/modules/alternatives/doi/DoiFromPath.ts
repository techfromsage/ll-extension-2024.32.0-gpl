/**
 * Finds DOIs in URL path
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import DoiMatch from '@/modules/alternatives/doi/DoiMatch';

/**
 * e.g. https://someurl.com/10.1234/1234.pdf
 * @param path
 */

const DoiFromPath = (location: URL): ScrapedContent => {
  const path = decodeURIComponent(location.pathname);

  return {
    scrape(): string {
      return DoiMatch.first(path);
    },
    scrapeAll() {
      return DoiMatch.all(path).map(doi => {
        return {
          identifier: doi,
          scraper: ScraperType.Path,
        };
      });
    },
  };
};

export default DoiFromPath;
