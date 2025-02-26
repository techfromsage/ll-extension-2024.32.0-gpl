/**
 * Finds DOIs in document meta tags.
 *
 * Most scholarly articles have some kind of DOI meta
 * tag in the head of the document.
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import DoiMatch from '@/modules/alternatives/doi/DoiMatch';

/**
 * A collection of the various ways different publishers may
 * indicate a given meta tag has the DOI.
 */
const commonMetaTags = () => [
  'meta[name="citation_doi"]',
  'meta[property="citation_doi"]',
  'meta[name="doi"]',
  'meta[property="doi"]',
  'meta[name="dc.doi"]',
  'meta[property="dc.doi"]',
  'meta[name="dc.identifier"]',
  'meta[property="dc.identifier"]',
  'meta[name="dc.identifier.doi"]',
  'meta[property="dc.identifier.doi"]',
  'meta[name="bepress_citation_doi"]',
  'meta[property="bepress_citation_doi"]',
  'meta[name="rft_id"]',
  'meta[property="rft_id"]',
  'meta[name="dcsext.wt_doi"]',
  'meta[property="dcsext.wt_doi"]',
].join(', ');

/**
 * Finds DOIs in the meta tags of the document.
 */
const DoiFromMetaTags = (document: Document): ScrapedContent => {
  const elements = Array.from(document.querySelectorAll(commonMetaTags()));
  const matches = elements.map(el => el.outerHTML).join('');

  return {
    scrape(): string {
      return DoiMatch.first(matches);
    },
    scrapeAll() {
      return DoiMatch.all(matches).map(doi => {
        return {
          identifier: doi,
          scraper: ScraperType.Meta,
        };
      });
    },
  };
};

export default DoiFromMetaTags;
