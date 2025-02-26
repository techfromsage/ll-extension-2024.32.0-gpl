import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import ProviderResponseCustom from '@/interfaces/librarySearches/custom/ProviderResponseCustom';
import AdaptResponse from '@/modules/knowledgeBases/custom/AdaptResponse';
import ViewMoreUrl from '@/modules/knowledgeBases/custom/ViewMoreUrl';
import CustomResults from '@/modules/knowledgeBases/custom/CustomResults';
import QueryUrl from '@/modules/shared/QueryUrl';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import FetchClient from '@/interfaces/http/FetchClient';

const parseResponse = (
  knowledgeBase: KnowledgeBase,
  searchQuery: string,
) => (rawResponse: ProviderResponseCustom | string): KnowledgeBaseResponse => {
  const response = (typeof rawResponse === 'string') ? AdaptResponse(rawResponse) : rawResponse;
  const articles = response.results.result_set || [];
  const searchItems = articles
    .slice(0, knowledgeBase.resultsLimit)
    .reduce(CustomResults, { document: [], person: [] });

  const results = Object
    .entries(searchItems)
    .map(
      ([category, items]) => ({ category, items, viewMoreUrl: QueryUrl(ViewMoreUrl(category, response), searchQuery) }),
    );

  return { status: LibrarySearchState.Success, results };
};
/**
 * SearchCustom
 */
export default (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'custom') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }

  const [url] = knowledgeBase.searchUrls;

  return httpClient
    .get<ProviderResponseCustom | string>(url)
    .then<KnowledgeBaseResponse>(parseResponse(knowledgeBase, searchQuery))
    .catch<KnowledgeBaseResponse>(error => {
    const { statusCode } = JSON.parse(error.message);
    return statusCode === 403
      ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
      : { status: LibrarySearchState.Failed };
  });
};
