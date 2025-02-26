import FetchClient from '@/interfaces/http/FetchClient';
import HTTPRequestGet from '@/modules/shared/http/HTTPRequestGet';
import HTTPRequestPost from '@/modules/shared/http/HTTPRequestPost';
import HTTPRequestPut from '@/modules/shared/http/HTTPRequestPut';
import HTTPRequestRedirect from '@/modules/shared/http/HTTPRequestRedirect';
import HTTPRequestDelete from '@/modules/shared/http/HTTPRequestDelete';

/**
 * HTTP Client for making HTP requests.
 *
 * @see _docs/014_http_client.md for example usage.
 */
const HTTPClient: FetchClient = {
  get: HTTPRequestGet,
  post: HTTPRequestPost,
  put: HTTPRequestPut,
  delete: HTTPRequestDelete,
  redirect: HTTPRequestRedirect,
};
export default HTTPClient;
