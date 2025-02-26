import Options from '@/interfaces/http/Options';
import FetchRequest from '@/interfaces/http/FetchRequest';
import merge from 'lodash.merge';

/**
 * Obtains data from the LL API for an institution by making HTTP request.
 *
 * @returns { Promise<Response> } Promise
 * @param token
 * @param HTTPRequest
 */
const AuthenticatedHTTPRequestPost = (token: string, HTTPRequest: FetchRequest) =>
  <Response>(url: string, options?: Options): Promise<Response> => {
    const newOptions = merge({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      ...options,
    });
    return HTTPRequest<Response>(url, newOptions);
  };

export default AuthenticatedHTTPRequestPost;
