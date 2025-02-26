import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import KnowledgeBase, { KnowledgeBaseWorldcat } from '@/interfaces/librarySearches/KnowledgeBase';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import QueryUrl from '@/modules/shared/QueryUrl';
import CreateAccessToken from '@/modules/knowledgeBases/worldcat/CreateAccessToken';
import ProviderResponseWorldcat from '@/interfaces/librarySearches/worldcat/ProviderResponseWorldcat';
import TruncateString from '@/modules/shared/TruncateString';
import DocumentUrl from '@/modules/shared/DocumentUrl';
import FetchClient from '@/interfaces/http/FetchClient';

/**
 *
 * @param {KnowledgeBaseWorldcat} knowledgeBase
 * @param {string} searchQuery
 * @returns {(response: ProviderResponseEbsco) => KnowledgeBaseResponse}
 */
const parseResponse = (knowledgeBase: KnowledgeBaseWorldcat, searchQuery: string) =>
  (response: ProviderResponseWorldcat): KnowledgeBaseResponse => {
    const viewMoreUrl = QueryUrl(knowledgeBase.viewMoreUrl, searchQuery);
    const items = response.briefRecords
      ? response.briefRecords
        .slice(0, knowledgeBase.resultsLimit)
        .map<SearchResult>(result => {
        const [summariesText] = result.summariesText || [];
        const text = TruncateString(summariesText || result.publisher || '');
        const href = DocumentUrl(
          QueryUrl(knowledgeBase.documentLink, searchQuery),
          result.oclcNumber,
        );
        return {
          id: result.oclcNumber,
          title: TruncateString(result.title),
          text,
          href,
          category: 'document',
        };
      })
      : [];

    const results = [{ category: 'document', items, viewMoreUrl }];
    return { status: LibrarySearchState.Success, results };
  };

/**
 * @param {KnowledgeBase} searchProvider
 * @returns {(error: any) => KnowledgeBaseResponse}
 */
const handleFailure = (searchProvider: KnowledgeBase) => (error: any): KnowledgeBaseResponse => {
  const { statusCode } = JSON.parse(error.message);
  return statusCode === 403
    ? { status: LibrarySearchState.LoginNeeded, searchProvider }
    : { status: LibrarySearchState.Failed };
};

/**
 * SearchWorldcat
 */
export default async (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'worldcat') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }

  try {
    const [authUrl, searchUrl] = knowledgeBase.searchUrls;
    const { access_token: accessToken } = await CreateAccessToken(authUrl, knowledgeBase, httpClient);

    return await httpClient
      .get<ProviderResponseWorldcat>(
      QueryUrl(searchUrl, searchQuery),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then<KnowledgeBaseResponse>(parseResponse(knowledgeBase, searchQuery))
      .catch(handleFailure(knowledgeBase));
  } catch (error: any) {
    return handleFailure(knowledgeBase)(error);
  }
};
