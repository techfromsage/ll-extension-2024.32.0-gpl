import XPath from '@/modules/alternatives/XPath';
import { AuthenticationScraper } from '@/modules/access/authenticationScraper';

/**
 * Provides Access connection status for a given location by scraping the content to see if specific elements are present.
 * This is useful for when we can't always rely on the other methods to determine access.
 * For example, for Proxy we rely on the URL being rewritten, however OED.com doesn't rewrite the URL.
 */
export default (
  document: Document,
  url: URL,
  authenticationScraper: AuthenticationScraper[],
): string => {
  const scraperConfig = authenticationScraper.find(scraper => url.hostname.includes(scraper.domain));
  if (!scraperConfig) {
    return '';
  }

  const scraperMatch = XPath(document).match(scraperConfig.xpath);
  if (!scraperMatch.length) {
    return '';
  }

  return scraperConfig.domain;
};
