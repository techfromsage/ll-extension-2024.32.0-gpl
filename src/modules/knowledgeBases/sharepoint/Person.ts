import TruncateString from '@/modules/shared/TruncateString';
import SharepointPerson from '@/interfaces/librarySearches/sharepoint/SharepointPerson';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';

/**
 * Adapts a Sharepoint Person from API into a Search Result
 */
export default (result: SharepointPerson): SearchResult => {
  const text = [
    result.JobTitle,
    result.AboutMe,
  ].filter(Boolean).join(' - ');
  return {
    id: `${result.DocId}`,
    title: result.PreferredName || result.AccountName,
    text: TruncateString(text),
    href: result.Path,
    category: 'person',
  };
};
