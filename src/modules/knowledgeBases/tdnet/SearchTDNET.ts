import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import QueryUrl from '@/modules/shared/QueryUrl';
import KnowledgeBase, { KnowledgeBaseTDNET } from '@/interfaces/librarySearches/KnowledgeBase';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import ProviderResponseTDNET from '@/interfaces/librarySearches/tdnet/ProviderResponseTDNET';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import TruncateString from '@/modules/shared/TruncateString';
import DocumentUrl from '@/modules/shared/DocumentUrl';
import FetchClient from '@/interfaces/http/FetchClient';

const parseResponse = (
  knowledgeBase: KnowledgeBaseTDNET,
  searchQuery: string,
) => (response: ProviderResponseTDNET): KnowledgeBaseResponse => {
  const viewMoreUrl = QueryUrl(knowledgeBase.viewMoreUrl, searchQuery);
  const documentUrl = QueryUrl(knowledgeBase.documentLink, searchQuery);
  const items = response.publications
    .slice(0, knowledgeBase.resultsLimit)
    .map<SearchResult>(result => ({
    id: result.metadata.id,
    title: TruncateString(result.title),
    text: TruncateString(result.description || `Publisher: ${result.publisher}`),
    href: DocumentUrl(documentUrl, result.metadata.id),
    category: 'document',
  }));
  const results = [{ category: 'document', items, viewMoreUrl }];
  return { status: LibrarySearchState.Success, results };
};

/**
 * SearchTDNET
 */
export default (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'tdnet') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }

  const [url] = knowledgeBase.searchUrls;
  const headers = {
    Accept: 'application/json',
    Authorization: knowledgeBase.apiKey,
  };

  return httpClient
    .get<ProviderResponseTDNET>(QueryUrl(url, searchQuery), { headers })
    .then<KnowledgeBaseResponse>(parseResponse(knowledgeBase, searchQuery))
    .catch<KnowledgeBaseResponse>(error => {
    const { statusCode } = JSON.parse(error.message);
    return statusCode === 403
      ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
      : { status: LibrarySearchState.Failed };
  });
};
