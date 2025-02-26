import Options from '@/interfaces/http/Options';
import FetchRequest from '@/interfaces/http/FetchRequest';
import handleSuccess from '@/modules/shared/http/handleSuccess';

/**
 * Returns the cache-control value from the headers object
 * and sets a default, if not.
 */
const cacheControlValue = (headerOverrides: HeadersInit) => {
  return 'cache-control' in headerOverrides
    ? headerOverrides['cache-control']
    : 'default';
};

/**
 * Provides a standard wrapper for fetch/HTTP GET requests.
 *
 * @param {string} url
 * @param {Options} options
 * @returns {Promise<ResponsePayload>}
 * @constructor
 */
const HTTPRequestGet: FetchRequest = <ResponsePayload>(
  url: string,
  options?: Options,
): Promise<ResponsePayload> => {
  const { headers: headerOverrides = {} } = options || {};
  const cacheControl = cacheControlValue(headerOverrides) as RequestCache;
  const headers = {
    'Content-Type': 'application/json',
    'cache-control': cacheControl,
    ...headerOverrides,
  };

  return fetch(
    url,
    {
      method: 'get',
      cache: cacheControl,
      headers,
    },
  ).then<ResponsePayload>(handleSuccess);
};

export default HTTPRequestGet;
