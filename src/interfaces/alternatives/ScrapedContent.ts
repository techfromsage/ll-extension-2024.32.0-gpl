import ScraperType from '@/enums/ScraperType';

/**
 * Interface ScrapedContent provides a standardised way of scraping content from
 * a data source such as an HTML page.
 *
 * This standardisation allows us to chain scraping methods.
 *
 * @see DocumentWithDoi for an example.
 */
interface ScrapedContent {
  // returns first identifier found or empty array
  scrape: () => string,
  // returns all identifiers found
  scrapeAll: () => ScrapedItem[],
  scrapeGreedy?: () => ScrapedItem[],
}

export interface ScrapedItem {
  identifier: string,
  // the type of scraper used to obtain this identifier
  // used to determine priority of identifiers; search vs article with references
  scraper: ScraperType,
  title?: string,
  url?: string,
}

export default ScrapedContent;
