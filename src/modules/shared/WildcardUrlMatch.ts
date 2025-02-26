/**
 * WildcardUrlMatch matches regular URLs with Lean Library's wildcard matching.
 * e.g. ://*.example.com/* matches https://www.example.com/foo/bar
 *
 * This covers the matching for Futures resources as well as matching Custom messages and Blocked domains
 *
 * See tests for more examples.
 *
 */

/**
 * Adds regex http protocol test if needed.
 * @param regexStr
 */
const addProtocol = (regexStr: string) => {
  return regexStr.startsWith('http') ? regexStr : `http(s)?://${regexStr}`;
};

/**
 * If the wildcard string has query params, we need to make sure the baseURL also includes query params.
 * If not, then we need to strip them out of the base URL as they can create a false negative.
 * e.g. https://www.example.com/?trackingcode=bar should match https://www.example.com/ if no query params are passed in.
 *
 * @param wildcardString
 * @param baseUrl
 */

const parseUrl = (wildcardString: string, baseUrl: URL) => (wildcardString.includes('=')
  ? baseUrl.toString()
  : `${baseUrl.protocol}//${baseUrl.hostname}${baseUrl.pathname}${baseUrl.hash || ''}`);

/**
 * @param baseUrl
 */
export default (baseUrl: URL) => ({
  match: (wildcardString: string) => {
    const urlToTest = parseUrl(wildcardString, baseUrl).toLowerCase();

    const regexApiUrl = wildcardString
      .trim()
      .toLowerCase()
      .replace(/\?/, '\\?') // replace any query params ? with literal \?
      .replace(/\*:\/\//, 'http(s)?://') // replace *:// with regex for any http protocol
      .replace(/\/\*$/, '/?*') // ensures final /* is optional
      .replace(/\/$/, '/?') // ensures final / is optional
      .replace(/\*/g, '(.)*') // replace any * with regex for {repeating wildcard}
      .replace(/\+/g, '\\+'); // replace any space represented by + with %20 (unicode)

    return new RegExp(`^${addProtocol(regexApiUrl)}/?$`).test(urlToTest);
  },
});
