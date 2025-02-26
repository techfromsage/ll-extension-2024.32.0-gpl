import SharepointDocument from '@/interfaces/librarySearches/sharepoint/SharepointDocument';
import TruncateString from '@/modules/shared/TruncateString';
import StripHtmlTags from '@/modules/shared/StripHtmlTags';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';

/**
 * Adapts a Sharepoint Document from API into a Search Result
 */
export default (result: SharepointDocument): SearchResult => {
  const metadata = [
    result.Author,
    result.Write && new Date(result.Write).toDateString(),
  ].filter(Boolean).join(' - ');
  return {
    id: `${result.DocId}`,
    title: result.Title,
    metadata,
    text: TruncateString(StripHtmlTags(result.Description || result.HitHighlightedSummary || '')),
    href: result.Path,
    category: 'document',
  };
};
