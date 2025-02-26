/**
 * Finds DOIs in a document based on configuration
 */
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import { DoiScraperConfig } from '@/interfaces/Config';
import PathSortShortest from '@/modules/alternatives/PathSortShortest';
import XPath from '@/modules/alternatives/XPath';
import DoiMatch from '@/modules/alternatives/doi/DoiMatch';
import ScraperType from '@/enums/ScraperType';

const getDois = (document: Document, config: DoiScraperConfig): string[] => {
  return XPath(document)
    .match(config.xpath)
    .map(DoiMatch.first)
    .filter(Boolean);
};

const DoiFromConfigs = (document: Document, doiScraperConfig: DoiScraperConfig[]): ScrapedContent => ({
  scrape(): string {
    doiScraperConfig.sort(PathSortShortest);
    return doiScraperConfig.reduce((result: string, config: DoiScraperConfig): string => {
      if (result) {
        return result;
      }

      const dois: string[] = getDois(document, config);
      return dois[0] || '';
    }, '');
  },
  scrapeAll() {
    doiScraperConfig.sort(PathSortShortest);
    return doiScraperConfig.map(config => {
      const dois: string[] = getDois(document, config);

      return dois.map(doi => {
        return {
          identifier: doi,
          scraper: ScraperType.Config,
        };
      });
    }).flat();
  },
});

export default DoiFromConfigs;
