import { decode } from 'html-entities';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import ProviderResponseConfluence from '@/interfaces/librarySearches/confluence/ProviderResponseConfluence';
import TruncateString from '@/modules/shared/TruncateString';
import RemoveHighlights from '@/modules/knowledgeBases/confluence/RemoveHighlights';
import JoinUrl from '@/modules/shared/JoinUrl';
import QueryUrl from '@/modules/shared/QueryUrl';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import FetchClient from '@/interfaces/http/FetchClient';

/**
 *
 * @param {KnowledgeBase} knowledgeBase
 * @param {string} viewMoreUrl
 * @returns {(response: ProviderResponseConfluence) => KnowledgeBaseResponse}
 */
const parseResponse = (knowledgeBase: KnowledgeBase, viewMoreUrl: string) =>
  (response: ProviderResponseConfluence): KnowledgeBaseResponse => {
    const items = response.results
      .slice(0, knowledgeBase.resultsLimit)
      .map<SearchResult>(result => ({
      id: result.content.id,
      title: decode(RemoveHighlights(result.title)),
      metadata: `Last modified: ${result.friendlyLastModified}`,
      text: decode(TruncateString(RemoveHighlights(result.excerpt))),
      href: JoinUrl(knowledgeBase.sourceUrl, result.url),
      category: 'document',
    }));

    const results = [{ category: 'document', items, viewMoreUrl }];
    return { status: LibrarySearchState.Success, results };
  };

/**
 * SearchConfluence
 */
export default (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'confluence') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }
  const [url] = knowledgeBase.searchUrls.map(urlTemplate => QueryUrl(urlTemplate, searchQuery));
  const viewMoreUrl = QueryUrl(knowledgeBase.viewMoreUrl, searchQuery);

  return httpClient
    .get<ProviderResponseConfluence>(url)
    .then<KnowledgeBaseResponse>(parseResponse(knowledgeBase, viewMoreUrl))
    .catch(error => {
      const { statusCode } = JSON.parse(error.message);
      return statusCode === 403
        ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
        : { status: LibrarySearchState.Failed };
    });
};
