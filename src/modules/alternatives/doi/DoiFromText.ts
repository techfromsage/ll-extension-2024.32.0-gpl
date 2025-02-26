/**
 * Finds DOIs in a document based on just text
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import DoiMatch from '@/modules/alternatives/doi/DoiMatch';

const DoiFromText = (document: Document): ScrapedContent => {
  const text = document.body.innerHTML;
  return {
    scrape(): string {
      return DoiMatch.first([text]) || '';
    },
    scrapeAll() {
      return DoiMatch.all([text]).map(doi => {
        return {
          scraper: ScraperType.Text,
          identifier: doi,
        };
      });
    },
    scrapeGreedy() {
      return DoiMatch.fromDocument(document).map(doi => {
        return {
          scraper: ScraperType.Text,
          identifier: doi.doi,
          title: doi.title,
          url: doi.url,
        };
      });
    },
  };
};

export default DoiFromText;
