import KnowledgeBaseSearchFactory from '@/modules/knowledgeBases/KnowledgeBaseSearchFactory';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import HTTPClient from '@/modules/shared/http/HTTPClient';

/**
 * Handler for searching library knowledge bases.
 *
 * This runs in the background due to CORS restrictions.
 */
export default (
  knowledgeBase: KnowledgeBase,
  searchQuery: string,
): Promise<KnowledgeBaseResponse> => {
  return new Promise(resolve => {
    try {
      const doSearch = KnowledgeBaseSearchFactory(knowledgeBase.sourceType);
      doSearch(searchQuery, knowledgeBase, HTTPClient)
        .then(resolve)
        .catch(() => resolve({ status: LibrarySearchState.Failed }));
    } catch (e) {
      resolve({ status: LibrarySearchState.Failed });
    }
  });
};
