/**
 * DoiScraperAdapter adapts the config to replace null values with empty strings.
 * this makes working with the empty values a lot easier.
 */
import { DoiScraperConfig } from '@/interfaces/Config';

export default (config: DoiScraperConfig) => ({
  domain: config.domain,
  xpath: config.xpath || '',
  path: config.path || '',
});
