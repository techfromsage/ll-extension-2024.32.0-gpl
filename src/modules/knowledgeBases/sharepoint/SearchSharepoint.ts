import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import QueryUrl from '@/modules/shared/QueryUrl';
import KnowledgeBase, { KnowledgeBaseSharepoint } from '@/interfaces/librarySearches/KnowledgeBase';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import SharepointResults from '@/modules/knowledgeBases/sharepoint/SharepointResults';
import ProviderResponseSharepoint from '@/interfaces/librarySearches/sharepoint/ProviderResponseSharepoint';
import Document from '@/modules/knowledgeBases/sharepoint/Document';
import Person from '@/modules/knowledgeBases/sharepoint/Person';
import SharepointPerson from '@/interfaces/librarySearches/sharepoint/SharepointPerson';
import SharepointDocument from '@/interfaces/librarySearches/sharepoint/SharepointDocument';
import FetchClient from '@/interfaces/http/FetchClient';

/**
 * Generate View more URL for Sharepoint searches
 *
 * @param {"files" | "people"} type
 * @param {string} baseUrl
 * @param {string} searchQuery
 * @returns string
 */

const viewMoreUrl = (type: 'files' | 'people', baseUrl: string, searchQuery: string) => {
  const q = searchQuery.replace(/\+/ig, ' ');
  return `${baseUrl}_layouts/15/search.aspx/${type}?q=${q}`;
};

/**
 * Handles successful API response - extracts and parses the results.
 *
 * @param {ProviderResponseSharepoint[]} responses
 * @param {KnowledgeBase} knowledgeBase
 * @param {string} searchQuery
 * @returns {KnowledgeBaseResponse}
 */
const parseSuccessResponse = (
  responses: ProviderResponseSharepoint[],
  { filesExcluded, sourceUrl }: KnowledgeBaseSharepoint,
  searchQuery: string,
): KnowledgeBaseResponse => {
  const [people, documents] = responses.map(SharepointResults) as [SharepointPerson[], SharepointDocument[]];
  const allowedDocuments = documents.filter(({ FileExtension }) => filesExcluded.includes(FileExtension));

  const results = [
    allowedDocuments && {
      category: 'document',
      items: allowedDocuments.map(Document),
      viewMoreUrl: viewMoreUrl('files', sourceUrl, searchQuery),
    },
    people && {
      category: 'person',
      items: people.map(Person),
      viewMoreUrl: viewMoreUrl('people', sourceUrl, searchQuery),
    },
  ].filter(Boolean);

  return { status: LibrarySearchState.Success, results };
};

/**
 * Handles failed API response.
 * @param error
 * @param {KnowledgeBase} searchProvider
 * @returns {KnowledgeBaseResponse}
 */
const parseFailure = (error: any, searchProvider: KnowledgeBase): KnowledgeBaseResponse => {
  const { statusCode } = JSON.parse(error.message);
  return (statusCode === 403)
    ? { status: LibrarySearchState.LoginNeeded, searchProvider }
    : { status: LibrarySearchState.Failed };
};

/**
 * @param {string} searchQuery
 * @param {KnowledgeBase} knowledgeBase
 * @param {FetchClient} httpClient
 * @returns {Promise<KnowledgeBaseResponse>}
 */
export default (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient,
): Promise<KnowledgeBaseResponse> => {
  if (knowledgeBase.sourceType !== 'sharepoint') {
    throw new Error('Provider not recognised. It maybe the factory is loading the wrong provider.');
  }
  return new Promise(resolve => {
    const headers = {
      accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
    };
    const promises = knowledgeBase.searchUrls
      .map(urlTemplate => httpClient.get<ProviderResponseSharepoint>(QueryUrl(urlTemplate, searchQuery), { headers }));

    Promise.all(promises)
      .then(responses => resolve(parseSuccessResponse(responses, knowledgeBase, searchQuery)))
      .catch(error => resolve(parseFailure(error, knowledgeBase)));
  });
};
