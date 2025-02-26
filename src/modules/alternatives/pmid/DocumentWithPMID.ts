/**
 * DocumentWithPMID uses several methods to extract a PubMedID / PMID / PMCID from a Document, if one exists.
 */
import { v4 as uuidv4 } from 'uuid';
import DigitalResourceType from '@/enums/DigitalResourceType';
import DocumentWithId from '@/interfaces/alternatives/DocumentWithId';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ScrapedContent, { ScrapedItem } from '@/interfaces/alternatives/ScrapedContent';
import PMIDFromPath from '@/modules/alternatives/pmid/PMIDFromPath';
import PMIDFromMetaTags from '@/modules/alternatives/pmid/PMIDFromMetaTags';
import PMIDFromBody from '@/modules/alternatives/pmid//PMIDFromBody';
import uniqBy from 'lodash.uniqby';
import PMIDFromCoins from '@/modules/alternatives/pmid/PMIDFromCoins';

/**
 * Array Reducer function to get the first identifier it finds.
 *
 * @param result
 * @param scraper
 */
const reduceToFirstPMID = (result: string, scraper: ScrapedContent): string => {
  return result.length ? result : scraper.scrape();
};

const DocumentWithPMID = (
  document: Document,
  location: URL,
): DocumentWithId => {
  return {
    scrape: (): DigitalResource[] => {
      // Only documents that are NIH/PMC websites have PMIDs
      if (!(location.hostname.endsWith('nih.gov') || location.hostname.endsWith('europepmc.org'))) {
        return [];
      }

      const identifier: string = [
        PMIDFromPath(location),
        PMIDFromMetaTags(document),
        PMIDFromBody(document),
        PMIDFromCoins(document),
      ].reduce(reduceToFirstPMID, '');

      return identifier
        ? [{
          type: DigitalResourceType.ArticlePubMed,
          urls: [],
          identifier,
          referenceId: uuidv4(),
          title: document.title,
        }]
        : [];
    },
    scrapeAll: (): DigitalResource[] => {
      // Only documents that are NIH/PMC websites have PMIDs
      if (!(location.hostname.endsWith('nih.gov') || location.hostname.endsWith('europepmc.org'))) {
        return [];
      }

      const allItems: ScrapedItem[] = [
        PMIDFromPath(location),
        PMIDFromMetaTags(document),
        PMIDFromBody(document),
        PMIDFromCoins(document),
      ]
        .map(scraper => scraper.scrapeAll())
        .flat()
        .filter(Boolean);

      const uniqueItems = uniqBy(allItems, item => item.identifier);

      return uniqueItems.map(item => ({
        type: DigitalResourceType.ArticlePubMed,
        urls: [],
        identifier: item.identifier,
        referenceId: uuidv4(),
        scraperType: item.scraper,
        title: document.title,
      }));
    },
  };
};

export default DocumentWithPMID;
