import FetchRequest from '@/interfaces/http/FetchRequest';

/**
 * Provides a standard "fetch client" interface to make HTTP requests.
 */
type FetchClient = {
  get: FetchRequest,
  post: FetchRequest,
  put: FetchRequest,
  delete: FetchRequest,
  redirect: FetchRequest,
};
export default FetchClient;
