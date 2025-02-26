import { KnowledgeBaseWorldcat } from '@/interfaces/librarySearches/KnowledgeBase';
import FetchClient from '@/interfaces/http/FetchClient';

type Response = { access_token: string };

/**
 * Create Access Token
 */
export default (
  url: string,
  { wskey, secret }: KnowledgeBaseWorldcat,
  httpClient: FetchClient,
): Promise<Response> => {
  const bearerToken = btoa(`${wskey}:${secret}`);
  return httpClient.post<Response>(
    url,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${bearerToken}`,
      },
    },
  );
};
