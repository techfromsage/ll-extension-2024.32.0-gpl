/**
 * Checks to see if a user is authenticated using an SSO config.
 */
import urlParser from 'url';
import InstitutionAccess from '@/interfaces/InstitutionAccess';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';

/**
 * @param {string} url
 */
const stripProtocolFromUrl = (url: string) => {
  const parsedUrl = urlParser.parse(url);
  return `${parsedUrl.hostname}${parsedUrl.path}`;
};

/**
 * Extract the target url from the url by removing the SSO redirect prefix
 * And then URL decode... Open Athens requires the redirect URL to be encoded.
 * See the following files where this is encoded:
 *  - AutoRedirectIfNecessary.ts
 *  - notificationAccessPossible.ts
 *
 * @param {string} prefixUrl
 * @param {string} url
 * @returns {{targetUrl: string, hasAccess: boolean}}
 */
const extractTargetUrl = (prefixUrl: string, url: string): { targetUrl: string, hasAccess: boolean } => {
  const targetUrl = urlParser.parse(
    decodeURIComponent(
      url.replace(prefixUrl, ''),
    ),
  );
  return {
    targetUrl: targetUrl.hostname || '',
    hasAccess: url.startsWith(prefixUrl),
  };
};

/**
 *
 * @param accessConfig
 * @param tabHistory
 */
export default (accessConfig: InstitutionAccess, tabHistory: string[]): boolean => {
  if ([ResourceDomainTypes.OpenAthens, ResourceDomainTypes.Proxy].includes(accessConfig.type) || !accessConfig.prefixUrl) {
    return false;
  }

  const prefixUrl = stripProtocolFromUrl(accessConfig.prefixUrl);
  return tabHistory.some((url: string) => {
    const { targetUrl, hasAccess } = extractTargetUrl(prefixUrl, stripProtocolFromUrl(url));
    return hasAccess && targetUrl.length;
  });
};
