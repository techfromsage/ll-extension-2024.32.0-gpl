import { decode } from 'html-entities';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import KnowledgeBase, { KnowledgeBaseEbsco } from '@/interfaces/librarySearches/KnowledgeBase';
import CreateAccessToken from '@/modules/knowledgeBases/ebsco/CreateAccessToken';
import CreateAuthToken from '@/modules/knowledgeBases/ebsco/CreateAuthToken';
import CreateSession from '@/modules/knowledgeBases/ebsco/CreateSession';
import SearchBody from '@/modules/knowledgeBases/ebsco/SearchBody';
import ProviderResponseEbsco from '@/interfaces/librarySearches/ebsco/ProviderResponseEbsco';
import EbscoResults from '@/modules/knowledgeBases/ebsco/EbscoResults';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import TruncateString from '@/modules/shared/TruncateString';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import FetchClient from '@/interfaces/http/FetchClient';

const viewMoreUrlLink = (searchQuery: string, knowledgeBase: KnowledgeBaseEbsco) =>
  `https://search.ebscohost.com/login.aspx?${new URLSearchParams({
    direct: 'true',
    bquery: searchQuery,
    type: '0',
    searchMode: 'And',
    site: 'eds-live',
    scope: 'site',
    custid: knowledgeBase.customerId,
    groupid: knowledgeBase.groupId,
    ...knowledgeBase.authType && { authtype: knowledgeBase.authType },
  })}`;

/**
 * @param {KnowledgeBaseEbsco} knowledgeBase
 * @param {string} viewMoreUrl
 * @returns {(response: ProviderResponseEbsco) => KnowledgeBaseResponse}
 */
const parseResponse = (
  knowledgeBase: KnowledgeBaseEbsco,
  viewMoreUrl: string,
) => (response: ProviderResponseEbsco): KnowledgeBaseResponse => {
  const items = EbscoResults(response)
    .slice(0, knowledgeBase.resultsLimit)
    .map<SearchResult>(result => {
    const [title, text] = result.Title?.split(' : ') || [];
    const params = new URLSearchParams({
      direct: 'true',
      an: result.an,
      db: result.db,
      site: 'eds-live',
      scope: 'site',
      custid: knowledgeBase.customerId,
      groupid: knowledgeBase.groupId,
      ...knowledgeBase.authType && { authtype: knowledgeBase.authType },
    });
    const href = `https://search.ebscohost.com/login.aspx?${params.toString()}`;

    return {
      id: result.id,
      title: title ? decode(TruncateString(title)) : '',
      text: text ? decode(TruncateString(text)) : '',
      href,
      category: 'document',
    };
  });

  const results = [{ category: 'document', items, viewMoreUrl }];
  return { status: LibrarySearchState.Success, results };
};

/**
 * SearchEbsco
 */
export default async (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'ebsco') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }
  try {
    const { access_token: accessToken } = await CreateAccessToken(knowledgeBase, httpClient);
    const { AuthToken: authToken } = await CreateAuthToken(knowledgeBase, accessToken, httpClient);
    const { SessionToken: sessionToken } = await CreateSession(knowledgeBase, accessToken, authToken, httpClient);

    const [url] = knowledgeBase.searchUrls;

    const viewMoreUrl = viewMoreUrlLink(searchQuery, knowledgeBase);
    return await httpClient.post<ProviderResponseEbsco>(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authentication: `Bearer ${accessToken}`,
          'x-authenticationToken': authToken,
          'x-sessionToken': sessionToken,
        },
        body: JSON.stringify(SearchBody(searchQuery)),
      },
    )
      .then<KnowledgeBaseResponse>(parseResponse(knowledgeBase, viewMoreUrl));
  } catch (error: any) {
    const { statusCode } = JSON.parse(error.message);
    return statusCode === 403
      ? { status: LibrarySearchState.LoginNeeded, searchProvider: knowledgeBase }
      : { status: LibrarySearchState.Failed };
  }
};
