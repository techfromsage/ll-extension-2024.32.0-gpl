import handleSuccess from '@/modules/shared/http/handleSuccess';
import Options from '@/interfaces/http/Options';
import FetchRequest from '@/interfaces/http/FetchRequest';

/**
 * Provides a standard wrapper for fetch/HTTP Delete requests.
 *
 * @param {string} url
 * @param {Options} options
 * @returns {Promise<ResponsePayload>}
 * @constructor
 */
const HTTPRequestDelete: FetchRequest = <ResponsePayload>(
  url: string,
  options?: Options,
): Promise<ResponsePayload> => {
  const { headers: headerOverrides = {}, body } = options || {};
  const headers = { 'Content-Type': 'application/json', ...headerOverrides };
  return fetch(url, { method: 'delete', headers, body }).then<ResponsePayload>(handleSuccess);
};

export default HTTPRequestDelete;
