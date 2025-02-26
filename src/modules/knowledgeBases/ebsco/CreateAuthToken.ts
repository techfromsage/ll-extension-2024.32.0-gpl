import { KnowledgeBaseEbsco } from '@/interfaces/librarySearches/KnowledgeBase';
import FetchClient from '@/interfaces/http/FetchClient';

type Response = { AuthToken: string };

/**
 * Create Auth Token
 */
export default (
  { sourceUrl, apiUserId, apiPassword }: KnowledgeBaseEbsco,
  accessToken: string,
  httpClient: FetchClient,
): Promise<Response> => {
  return httpClient.post<Response>(
    `${sourceUrl}/authservice/rest/uidauth`,
    {
      headers: {
        Accept: 'application/json',
        Authentication: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ UserId: apiUserId, Password: apiPassword }),
    },
  );
};
