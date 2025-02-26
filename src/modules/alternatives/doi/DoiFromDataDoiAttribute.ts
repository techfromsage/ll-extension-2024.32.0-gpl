/**
* Finds DOIs in data-doi attributes
*/
import ScraperType from '@/enums/ScraperType';
import ScrapedContent, { ScrapedItem } from '@/interfaces/alternatives/ScrapedContent';
import DoiMatch from './DoiMatch';

const isSciteBadge = (tag: Element) => tag.getAttribute('class') === 'scite-badge';

const DoiFromDataDoiAttribute = (document: Document): ScrapedContent => {
  const elements = document.querySelectorAll('*[data-doi]');
  const identifiers = Array.from(elements).map(tag =>
    !isSciteBadge(tag) && tag.getAttribute('data-doi')) as string[];

  return {
    scrape(): string {
      const uniqueDois = DoiMatch.all(identifiers);

      // Multiple unique DOIs suggest we're on some kind of TOC page.
      // If so, we are not interested in providing alternatives or access.
      return uniqueDois.length === 1 ? uniqueDois[0] : '';
    },
    scrapeAll() {
      return DoiMatch.all(identifiers).map(doi => {
        return {
          identifier: doi,
          scraper: ScraperType.DataDoi,
        };
      });
    },
    scrapeGreedy() {
      const matches = Array.from(elements).map(tag => {
        // skip scite badges
        if (isSciteBadge(tag)) {
          return null;
        }

        const dois = DoiMatch.all(tag.getAttribute('data-doi') || '');

        // if the attribute contains more than one DOI, skip - we want unique tags
        if (dois.length !== 1) {
          return null;
        }

        // preferred tags for titles, ordered by likelihood of being a title
        const preferredTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'p', 'span'];

        // return the first tag in the list that exists in the element
        const bestTitle = preferredTags.map(t => {
          const title = tag.querySelector(t)?.textContent;
          if (title) {
            return {
              identifier: dois[0],
              title,
              scraper: ScraperType.DataDoi,
            };
          }

          return null;
        }).filter(Boolean);
        if (bestTitle.length > 0) {
          return bestTitle[0];
        }

        // if no preferred tags found, use the tag itself
        return {
          identifier: dois[0],
          title: tag.textContent?.trim() || dois[0],
          scraper: ScraperType.DataDoi,
        };
      }) as ScrapedItem[];

      return matches.filter(Boolean);
    },
  };
};

export default DoiFromDataDoiAttribute;
