/**
 * ProxyURL provides methods for handling 'proxy modified' URLs.
 */
import InstitutionAccess from '@/interfaces/InstitutionAccess';

interface ProxyURL {
  extractOriginal: (url: URL) => URL,
  isProxyUrl: (url: URL) => boolean,
}

/**
 * @param proxyDomain proxy domain from an institution's proxy config.
 * @returns {ProxyURL}
 */
export default (accessConfigs: InstitutionAccess[]): ProxyURL => ({
  /**
   * Extract original url from a 'proxy modified' url.
   *
   * @param {URL} url
   * @returns {URL}
   */
  extractOriginal: url => {
    const [originalUrl] = accessConfigs
      .map(accessConfig => {
        if (!('domain' in accessConfig) || !url.host.endsWith(accessConfig.domain)) {
          return null;
        }
        const nonProxy = url.host
          .replace(`.${accessConfig.domain}`, '')
          .replace(/-/g, '.');
        return new URL(`${url.protocol}//${nonProxy}${url.pathname}${url.search}`);
      })
      .filter(Boolean);

    return originalUrl || url;
  },
  /**
   * Checks if the URL is a 'proxy' URL from institution.
   * @param {URL} url
   * @returns {boolean}
   */
  isProxyUrl: url => {
    return accessConfigs.some(accessConfig => {
      if (!('domain' in accessConfig)) {
        return false;
      }
      const regex = new RegExp(`${accessConfig.domain}$`);
      return regex.test(url.host);
    });
  },
});
