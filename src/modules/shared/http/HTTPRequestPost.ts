import handleSuccess from '@/modules/shared/http/handleSuccess';
import Options from '@/interfaces/http/Options';
import FetchRequest from '@/interfaces/http/FetchRequest';

/**
 * Provides a standard wrapper for fetch/HTTP POST requests.
 *
 * @param {string} url
 * @param {Options} options
 * @returns {Promise<ResponsePayload>}
 * @constructor
 */
const HTTPRequestPost: FetchRequest = <ResponsePayload>(
  url: string,
  options?: Options,
): Promise<ResponsePayload> => {
  const { headers: headerOverrides = {}, body } = options || {};
  const headers = { 'Content-Type': 'application/json', ...headerOverrides };
  return fetch(url, { method: 'post', headers, body }).then<ResponsePayload>(handleSuccess);
};

export default HTTPRequestPost;
