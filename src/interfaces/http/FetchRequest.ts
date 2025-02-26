import Options from '@/interfaces/http/Options';

/**
 * Provides a standard "fetch request" interface to make HTTP requests e.g. get or post.
 */
type FetchRequest = <ResponsePayload>(
  url: string,
  options?: Options,
) => Promise<ResponsePayload>;

export default FetchRequest;
