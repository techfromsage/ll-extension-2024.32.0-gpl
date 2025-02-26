import { XMLParser } from 'fast-xml-parser';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import QueryUrl from '@/modules/shared/QueryUrl';
import ProviderResponseJSTOR from '@/interfaces/librarySearches/jstor/ProviderResponseJSTOR';
import JSTORResults from '@/modules/knowledgeBases/jstor/JSTORResults';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import TruncateString from '@/modules/shared/TruncateString';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import FetchClient from '@/interfaces/http/FetchClient';

const parseResponse = (
  knowledgeBase: KnowledgeBase,
  searchQuery: string,
) => (textResponse: string): KnowledgeBaseResponse => {
  const parser = new XMLParser();
  const response: ProviderResponseJSTOR = parser.parse(textResponse);
  const viewMoreUrl = `https://www.jstor.org/action/doBasicSearch?Query=${searchQuery}`;
  const items = JSTORResults(response)
    .slice(0, knowledgeBase.resultsLimit)
    .map<SearchResult>(result => ({
    id: btoa(result.url),
    title: TruncateString(result.title),
    text: TruncateString(result.description || `Publisher: ${result.publisher}`),
    href: result.url,
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
  if (knowledgeBase.sourceType !== 'jstor') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }

  const [url] = knowledgeBase.searchUrls;

  return httpClient
    .get<string>(QueryUrl(url, searchQuery))
    .then<KnowledgeBaseResponse>(parseResponse(knowledgeBase, searchQuery))
    .catch<KnowledgeBaseResponse>(error => {
    const { statusCode } = JSON.parse(error.message);
    return statusCode === 403
      ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
      : { status: LibrarySearchState.Failed };
  });
};
