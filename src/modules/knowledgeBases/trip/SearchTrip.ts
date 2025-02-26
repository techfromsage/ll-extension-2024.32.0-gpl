import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import QueryUrl from '@/modules/shared/QueryUrl';
import KnowledgeBase, { KnowledgeBaseTrip } from '@/interfaces/librarySearches/KnowledgeBase';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import TruncateString from '@/modules/shared/TruncateString';
import ProviderResponseTrip from '@/interfaces/librarySearches/trip/ProviderResponseTrip';
import FetchClient from '@/interfaces/http/FetchClient';

const parseResponse = (
  knowledgeBase: KnowledgeBaseTrip,
  searchQuery: string,
) => (response: ProviderResponseTrip): KnowledgeBaseResponse => {
  const viewMoreUrl = QueryUrl(knowledgeBase.viewMoreUrl, searchQuery);
  const items = response.documents.document
    .slice(0, knowledgeBase.resultsLimit)
    .map<SearchResult>(result => ({
    id: result.id,
    title: TruncateString(result.publication),
    text: TruncateString(result.title),
    href: result.link,
    category: 'document',
  }));
  const results = [{ category: 'document', items, viewMoreUrl }];
  return { status: LibrarySearchState.Success, results };
};

/**
 * SearchTrip
 */
export default (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'trip') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }

  const [url] = knowledgeBase.searchUrls;
  const queryUrl = QueryUrl(url, searchQuery);
  return httpClient
    .get<ProviderResponseTrip>(queryUrl)
    .then<KnowledgeBaseResponse>(parseResponse(knowledgeBase, searchQuery))
    .catch<KnowledgeBaseResponse>(error => {
    const { statusCode } = JSON.parse(error.message);
    return statusCode === 403
      ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
      : { status: LibrarySearchState.Failed };
  });
};
