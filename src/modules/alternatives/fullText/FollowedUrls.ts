import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import InstitutionAccess from '@/interfaces/InstitutionAccess';
import urlIsFile from '@/modules/shared/UrlIsFile';

/**
 * Removes the proxy prefix from a url.
 * @param rawUrl
 * @param prefixUrls
 */
const stripPrefixUrl = (rawUrl: string, prefixUrls: string[]): string => {
  return prefixUrls.reduce((url: string, prefixUrl: string) => {
    return url
      .replace(/^http:/, 'https:')
      .replace(prefixUrl, '');
  }, rawUrl);
};

const urlsFromSearchParams = (url: string): string[] => {
  try {
    const { searchParams } = new URL(url);
    const urlsFromQueryParams: string[] = [];
    searchParams.forEach(value => {
      try {
        urlsFromQueryParams.push(new URL(value).href);
      } catch (e) {
        // ignore
      }
    });
    return urlsFromQueryParams;
  } catch (e) {
    return [];
  }
};

/**
 * Follows a url until it no longer redirects.
 * @param url
 * @param httpRequest
 */
const follow = async (receivedUrls: string[], prefixUrls: string[], httpRequest: HTTPRequest): Promise<string[]> => {
  try {
    const urlToCheck = receivedUrls[receivedUrls.length - 1];
    if (urlIsFile(urlToCheck)) {
      return receivedUrls;
    }

    const url = await httpRequest<string>({ method: 'redirect', url: urlToCheck });
    const urls: string[] = receivedUrls.concat(urlsFromSearchParams(url));
    if (!url) {
      return urls;
    }
    const targetUrl = decodeURIComponent(stripPrefixUrl(url, prefixUrls));
    return !urls.includes(targetUrl) ? await follow([...urls, targetUrl], prefixUrls, httpRequest) : urls;
  } catch (error) {
    return receivedUrls;
  }
};

/**
 * Follows (HTTP redirects) all urls in a given list.
 * Then returns the list of urls, either the same or with the redirect appended
 * @param  {string[]} urls
 * @param  {HTTPRequest} httpRequest
 * @returns Promise
 */
const FollowedUrls = async (url: string, accessConfigs: InstitutionAccess[], httpRequest: HTTPRequest): Promise<string[]> => {
  if (!url || urlIsFile(url)) {
    return [];
  }
  const prefixUrls = accessConfigs.map(accessConfig => accessConfig.prefixUrl).filter(Boolean);
  const allUrls = await follow([url], prefixUrls, httpRequest);
  return Array.from(new Set(allUrls.filter(Boolean)));
};

export default FollowedUrls;
