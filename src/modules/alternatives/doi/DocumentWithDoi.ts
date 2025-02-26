/**
 * DocumentWithDOI uses several methods to extract a DOI from a Document, if one exists.
 */
import { v4 as uuidv4 } from 'uuid';
import uniqBy from 'lodash.uniqby';
import DigitalResourceType from '@/enums/DigitalResourceType';
import DocumentWithId from '@/interfaces/alternatives/DocumentWithId';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ScrapedContent, { ScrapedItem } from '@/interfaces/alternatives/ScrapedContent';
import { DoiScraperConfig } from '@/interfaces/Config';
import DoiFromConfigs from '@/modules/alternatives/doi/DoiFromConfigs';
import DoiFromMetaTags from '@/modules/alternatives/doi/DoiFromMetaTags';
import DoiFromDataDoiAttribute from '@/modules/alternatives/doi/DoiFromDataDoiAttribute';
import DoiFromPath from '@/modules/alternatives/doi/DoiFromPath';
import DoiFromJSONLD from '@/modules/alternatives/doi/DoiFromJSONLD';
import DoiFromCoins from '@/modules/alternatives/doi/DoiFromCoins';
import DoiFromText from '@/modules/alternatives/doi/DoiFromText';

/**
 * Array Reducer function to get the first identifier it finds.
 *
 * @param result
 * @param scraper
 */
const reduceToFirstDoi = (result: string, scraper: ScrapedContent): string => {
  return result.length ? result : scraper.scrape();
};

/**
 * Returns a config that matches the current location's domain and URL.
 * Designed to be used in a filter function.
 *
 * @param {URL} location
 * @returns {(config: DoiScraperConfig) => (boolean | boolean)}
 */
const filterByHostnameAndPath = (location: URL) => (config: DoiScraperConfig) => {
  if (!config.xpath) {
    return false;
  }
  const domainMatch = location.hostname.includes(config.domain);

  if (!config.path.length) {
    return domainMatch;
  }

  const pathMatch = location.pathname.includes(config.path);
  return domainMatch && pathMatch;
};

const DocumentWithDoi = (
  document: Document,
  location: URL,
  scraperConfigs: DoiScraperConfig[],
): DocumentWithId => {
  const configs = scraperConfigs.filter(filterByHostnameAndPath(location));

  const scrapeItems = (scrapeMethod: 'scrapeAll' | 'scrapeGreedy'): ScrapedItem[] => {
    return [
      DoiFromPath(location),
      DoiFromConfigs(document, configs),
      DoiFromMetaTags(document),
      DoiFromDataDoiAttribute(document),
      DoiFromJSONLD(document),
      DoiFromText(document),
      DoiFromCoins(document),
    ]
      .map(scraper => {
        if (scrapeMethod === 'scrapeGreedy') {
          return scraper.scrapeGreedy?.() || scraper.scrapeAll();
        }
        return scraper[scrapeMethod]?.();
      })
      .flat()
      .filter(Boolean);
  };

  return {
    scrape: (): DigitalResource[] => {
      const identifier: string = [
        DoiFromPath(location),
        DoiFromConfigs(document, configs),
        DoiFromMetaTags(document),
        DoiFromDataDoiAttribute(document),
        DoiFromJSONLD(document),
        DoiFromText(document),
        DoiFromCoins(document),
      ].reduce(reduceToFirstDoi, '');

      return identifier
        ? [{
          type: DigitalResourceType.Article,
          urls: [],
          identifier,
          referenceId: uuidv4(),
          title: document.title,
        }]
        : [];
    },
    scrapeAll: (): DigitalResource[] => {
      const uniqueItems = uniqBy(scrapeItems('scrapeAll'), item => item.identifier);

      return uniqueItems.map(item => ({
        type: DigitalResourceType.Article,
        urls: [item.url].filter(Boolean),
        identifier: item.identifier,
        referenceId: uuidv4(),
        scraperType: item.scraper,
        title: item.title || item.identifier,
      }));
    },
    scrapeGreedy: (): DigitalResource[] => {
      const uniqueItems = uniqBy(scrapeItems('scrapeGreedy'), item => item.identifier);

      return uniqueItems.map(item => ({
        type: DigitalResourceType.Article,
        urls: [item.url].filter(Boolean),
        identifier: item.identifier,
        referenceId: uuidv4(),
        scraperType: item.scraper,
        title: item.title || item.identifier,
      }));
    },
  };
};

export default DocumentWithDoi;
