import ProviderResponseExLibris from '@/interfaces/librarySearches/exlibris/ProviderResponseExLibris';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import TruncateString from '@/modules/shared/TruncateString';
import DocumentUrl from '@/modules/shared/DocumentUrl';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';

/**
 * ParseResponse
 */
export default (documentUrl: string, viewMoreUrl: string, resultsLimit: number) =>
  (response: ProviderResponseExLibris): KnowledgeBaseResponse => {
    const items = response.docs
      .filter(({ pnx }) => !!pnx)
      .slice(0, resultsLimit)
      .map<SearchResult>(({ pnx: result }) => {
      const [recordId] = result.control.recordid;
      const [title] = result.display.title;
      const [description] = result.display.description || [];
      const publishingInfo = result.display.publisher || [];
      const metadata = publishingInfo.length ? `Publisher: ${publishingInfo[0]}` : undefined;
      const [notes] = result.addata.notes || [];
      return {
        id: recordId,
        title,
        metadata,
        text: TruncateString(description || notes || publishingInfo[1] || ''),
        href: DocumentUrl(documentUrl, recordId),
        category: 'document',
      };
    });

    const results = [{ category: 'document', items, viewMoreUrl }];
    return { status: LibrarySearchState.Success, results };
  };
