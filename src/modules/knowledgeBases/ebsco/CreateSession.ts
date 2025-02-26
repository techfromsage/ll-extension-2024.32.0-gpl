import { KnowledgeBaseEbsco } from '@/interfaces/librarySearches/KnowledgeBase';
import FetchClient from '@/interfaces/http/FetchClient';

type Response = {
  SessionToken: string,
};

/**
 * Create Session Token
 */
export default (
  { sourceUrl, profileId }: KnowledgeBaseEbsco,
  accessToken: string,
  authToken: string,
  httpClient: FetchClient,
): Promise<Response> => {
  return httpClient.post<Response>(
    `${sourceUrl}/edsapi/rest/CreateSession`,
    {
      headers: {
        Accept: 'application/json',
        Authentication: `Bearer ${accessToken}`,
        'x-authenticationToken': authToken,
      },
      body: JSON.stringify({ Profile: profileId }),
    },
  );
};
