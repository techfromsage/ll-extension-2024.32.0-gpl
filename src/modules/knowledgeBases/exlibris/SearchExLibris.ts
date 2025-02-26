import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import QueryUrl from '@/modules/shared/QueryUrl';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import ProviderResponseExLibris from '@/interfaces/librarySearches/exlibris/ProviderResponseExLibris';
import ParseResponse from '@/modules/knowledgeBases/exlibris/ParseResponse';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import FetchClient from '@/interfaces/http/FetchClient';

/**
 * SearchExLibris
 */
export default (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'exlibris') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }

  const headers = knowledgeBase.apiKey
    ? { 'x-api-key': knowledgeBase.apiKey }
    : undefined;

  const [url] = knowledgeBase.searchUrls.map(urlTemplate => QueryUrl(urlTemplate, searchQuery));
  const viewMoreUrl = QueryUrl(knowledgeBase.viewMoreUrl, searchQuery);
  const documentUrl = QueryUrl(knowledgeBase.documentLink, searchQuery);
  return httpClient
    .get<ProviderResponseExLibris>(url, { headers })
    .then<KnowledgeBaseResponse>(ParseResponse(documentUrl, viewMoreUrl, knowledgeBase.resultsLimit))
    .catch<KnowledgeBaseResponse>(error => {
    const { statusCode } = JSON.parse(error.message);
    return statusCode === 403
      ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
      : { status: LibrarySearchState.Failed };
  });
};
