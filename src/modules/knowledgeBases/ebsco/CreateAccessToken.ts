import { KnowledgeBaseEbsco } from '@/interfaces/librarySearches/KnowledgeBase';
import FetchClient from '@/interfaces/http/FetchClient';

type Response = { access_token: string };

/**
 * Create Access Token
 */
export default (
  { clientId, clientSecret }: KnowledgeBaseEbsco,
  httpClient: FetchClient,
): Promise<Response> => {
  const bearerToken = btoa(`${clientId}:${clientSecret}`);
  return httpClient.post<Response>(
    'https://auth.ebsco.zone/api/dispatcher/oauth/token?grant_type=client_credentials',
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${bearerToken}`,
      },
    },
  );
};
