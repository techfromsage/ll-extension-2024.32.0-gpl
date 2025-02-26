import { KnowledgeBaseJove } from '@/interfaces/librarySearches/KnowledgeBase';
import ProviderResponseJove from '@/interfaces/librarySearches/jove/ProviderResponseJove';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import QueryUrl from '@/modules/shared/QueryUrl';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import TruncateString from '@/modules/shared/TruncateString';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';

/**
 * ParseResponse
 */
export default (
  knowledgeBase: KnowledgeBaseJove,
  searchQuery: string,
) => (response: ProviderResponseJove): KnowledgeBaseResponse => {
  const viewMoreUrl = QueryUrl(knowledgeBase.viewMoreUrl, searchQuery);
  const articles = response.articles.article || [];
  const items = articles
    .slice(0, knowledgeBase.resultsLimit)
    .map<SearchResult>(result => ({
    id: btoa(result.link),
    title: TruncateString(result.title),
    text: TruncateString(result.abstract),
    href: result.link,
    category: 'document',
  }));
  const results = [{ category: 'document', items, viewMoreUrl }];
  return { status: LibrarySearchState.Success, results };
};
