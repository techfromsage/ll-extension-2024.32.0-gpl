/**
 * Finds PMIDs in URL path
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import PMIDMatch from '@/modules/alternatives/pmid/PMIDMatch';

/**
 * e.g. https://pubmed.ncbi.nlm.nih.gov/33745784/
 * @param path
 */

const PMIDFromPath = (location: URL): ScrapedContent => {
  const path = decodeURIComponent(location.pathname);
  const pmidPath = path.replace(/\.pdf$/, '');

  return {
    scrape(): string {
      return PMIDMatch.first(pmidPath);
    },
    scrapeAll() {
      return PMIDMatch.all(pmidPath).map(pmid => {
        return {
          identifier: pmid,
          scraper: ScraperType.Path,
        };
      });
    },
  };
};

export default PMIDFromPath;
