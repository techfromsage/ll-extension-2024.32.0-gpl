/**
 * Finds PMIDs in document meta tags.
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import PMIDMatch from '@/modules/alternatives/pmid/PMIDMatch';

/**
 * A collection of the various ways different pmids may
 * be stored in the documents head as meta tags
 */
const commonMetaTags = () => [
  'meta[name="citation_pmid"]',
  'meta[property="citation_pmid"]',
  'meta[name="ncbi_article_id"]',
  'meta[property="ncbi_article_id"]',
  'meta[name="ncbi_uidlist"]',
  'meta[property="ncbi_uidlist"]',
  'meta[name="log_displayeduids"]',
  'meta[property="log_displayeduids"]',
].join(', ');

/**
 * Finds DOIs in the meta tags of the document.
 */
const PMIDFromMetaTags = (document: Document): ScrapedContent => {
  const elements = Array.from(document.querySelectorAll(commonMetaTags()));
  const matches = elements.map(el => el.outerHTML).join('');

  return {
    scrape(): string {
      return PMIDMatch.first(matches);
    },
    scrapeAll() {
      return PMIDMatch.all(matches).map(pmid => {
        return {
          identifier: pmid,
          scraper: ScraperType.Meta,
        };
      });
    },
  };
};

export default PMIDFromMetaTags;
