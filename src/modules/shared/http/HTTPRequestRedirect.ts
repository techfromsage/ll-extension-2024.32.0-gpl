import Options from '@/interfaces/http/Options';
import FetchRequest from '@/interfaces/http/FetchRequest';
import handleUrl from '@/modules/shared/http/handleUrl';

/**
 * Provides a standard wrapper for fetch/HTTP GET requests, providing back the end URL allowing for detecting redirects.
 *
 * @param {string} url
 * @param {Options} options
 * @returns {Promise<ResponsePayload>}
 * @constructor
 */
const HTTPRequestRedirect: FetchRequest = <ResponsePayload>(
  url: string,
  options?: Options,
): Promise<ResponsePayload> => {
  const { headers } = options || {};
  return fetch(url, { method: 'get', cache: 'default', headers }).then<ResponsePayload>(handleUrl);
};

export default HTTPRequestRedirect;
