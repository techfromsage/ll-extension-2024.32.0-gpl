import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import ProviderResponseJove from '@/interfaces/librarySearches/jove/ProviderResponseJove';
import ValidateResponse from '@/modules/knowledgeBases/jove/ValidateResponse';
import ParseResponse from '@/modules/knowledgeBases/jove/ParseResponse';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import FetchClient from '@/interfaces/http/FetchClient';

/**
 * SearchJove
 */
export default (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'jove') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }

  const [url] = knowledgeBase.searchUrls;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'text/xml',
  };

  const body = new URLSearchParams({
    key: knowledgeBase.apiKey,
    query: searchQuery,
    institutionid: knowledgeBase.joveInstitutionId,
  });

  return httpClient.post<string>(url, { headers, body })
    .then<ProviderResponseJove>(ValidateResponse)
    .then<KnowledgeBaseResponse>(ParseResponse(knowledgeBase, searchQuery))
    .catch<KnowledgeBaseResponse>(error => {
    const { statusCode } = JSON.parse(error.message);
    return statusCode === 403
      ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
      : { status: LibrarySearchState.Failed };
  });
};
