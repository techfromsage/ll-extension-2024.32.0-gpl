import RedirectType from '@/enums/RedirectType';
import SearchEnhancer from '@/interfaces/SearchEnhancer';
import LocationAllowed from '@/modules/shared/LocationAllowed';

/**
 * Checks if the current URL matches a search enhancer.
 *
 * @param {URL} url
 * @param {string} domainRegex
 * @returns {boolean}
 */
const isEnhancedMatch = (url: URL, domainRegex: string): boolean => {
  const regex = new RegExp(domainRegex, 'i');
  const urlWithoutScheme = url.toString().replace(/^(http|https):\/\//, '');
  return regex.test(urlWithoutScheme);
};

/**
 * Checks if all the search parameters are already added in a set of search parameters.
 * If they are it means don't need to redirect.
 * @param {URLSearchParams} searchParams
 * @param {key/value pair} enhancedParams
 * @returns {boolean}
 */
const parametersAlreadyPresent = (searchParams: URLSearchParams, enhancedParams: { [name: string]: string }): boolean => {
  const paramsToCheck = Object.keys(enhancedParams);
  return paramsToCheck.length > 0 && paramsToCheck.every(param => searchParams.has(param));
};

/**
 * Checks if the search enhancer has already redirected once
 *
 * @param {RedirectType[]} searchEnhancerRedirectOnce
 * @param {RedirectType} type
 * @returns
 */
const hasAlreadyRedirectedOnce = (searchEnhancerRedirectOnce: RedirectType[], type: RedirectType): boolean => {
  return searchEnhancerRedirectOnce.includes(type);
};

/**
 * Search Enhancers are part of Access and add on query parameters for specific URLs
 * which enhance the page.
 *
 * e.g. Google Scholar will add Full Text links if the `inst` param is present.
 *
 * Relating to: Access
 * @param {URL} url
 * @param {SearchEnhancer[]} searchEnhancers
 * @param {boolean} isOnCampus
 */
export default (
  url: URL,
  searchEnhancers: SearchEnhancer[],
  isOnCampus: boolean,
  searchEnhancerRedirectOnce: RedirectType[],
) => ({
  /**
   * Extracts a valid search enhancer configuration for current URL.
   */
  validEnhancer: (): SearchEnhancer | undefined => {
    return searchEnhancers.find((searchEnhancer => {
      // if enhancer is set to redirect once and has already redirected once, we don't want to redirect.
      if (searchEnhancer.redirectOnce && hasAlreadyRedirectedOnce(searchEnhancerRedirectOnce, searchEnhancer.type)) {
        return false;
      }

      // If the URL is a Pubmed downloadHistory URL, we don't want to redirect.
      if (searchEnhancer.type === RedirectType.SearchEnhancedPubMed && url.href.includes('downloadHistory')) {
        return false;
      }
      return LocationAllowed(searchEnhancer.redirectOption, isOnCampus)
        && isEnhancedMatch(url, searchEnhancer.domain)
        && !parametersAlreadyPresent(url.searchParams, searchEnhancer.parameters);
    }));
  },

  /**
   * Generates a search enhanced URL for the browser to be redirected to.
   * @param {SearchEnhancer} searchEnhancer
   */
  generateUrl: (searchEnhancer: SearchEnhancer): string => {
    Object
      .entries(searchEnhancer.parameters)
      .forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  },
});
