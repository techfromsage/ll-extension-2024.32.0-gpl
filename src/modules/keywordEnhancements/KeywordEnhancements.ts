/**
 * Provides Keyword Enhancement Packages (group of keywords) that are available for the current page
 *
 * @see:
 * https://newleanlibrary.atlassian.net/wiki/spaces/TEC/pages/624689565
 * for more product documentation.
 *
 */
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import WildcardUrlMatch from '@/modules/shared/WildcardUrlMatch';

/**
 * Returns a set of keyword packages that should be shown on the current URL.
 *
 * @param {URL} url
 * @param keywordPackages
 */
export default (
  url: URL,
  keywordPackages: KeywordPackage[],
) => keywordPackages.filter(({ resource_links: resourceLinks }) => {
  return resourceLinks.some(domain => WildcardUrlMatch(url).match(domain));
});
