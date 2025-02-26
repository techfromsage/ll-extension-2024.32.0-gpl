/**
 * Finds PMIDs in the document body
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import PMIDMatch from '@/modules/alternatives/pmid/PMIDMatch';

/**
 * A collection of the various ways different pmids may be stored in the documents body
 * - as they're often just numbers we need to look for common places
 */
const commonBodyMentions = () => new RegExp([
  'PMID:\\D*(\\d+)',
  'PubMed:\\D*(\\d+)',
  'PubMed ID:\\D*(\\d+)',
  'PMCID:\\D*(\\d+)',
  'pubmed\\/(\\d+)',
  'MED\\/(\\d+)',
  'list_uids\\D?(\\d+)',
].join('|'), 'gi');

/**
 * Finds DOIs in the meta tags of the document.
 */
const PMIDFromBody = (document: Document): ScrapedContent => {
  const mentions = document.body.textContent?.match(commonBodyMentions());
  const matches = mentions?.join(' ') || '';

  return {
    scrape(): string {
      if (!matches) {
        return '';
      }
      return PMIDMatch.first(matches);
    },
    scrapeAll() {
      return PMIDMatch.all(matches).map(pmid => {
        return {
          identifier: pmid,
          scraper: ScraperType.Text,
        };
      });
    },
  };
};

export default PMIDFromBody;
