import { SearchResult } from '@/interfaces/librarySearches/SearchResults';
import { ResponseCustomResultItem } from '@/interfaces/librarySearches/custom/ProviderResponseCustom';
import TruncateString from '@/modules/shared/TruncateString';
import StripHtmlTags from '@/modules/shared/StripHtmlTags';

/**
 * CustomResults adapts the API result.
 * It then groups into categories for use in search results.
 *
 * For use in reduce function
 */

type Results = { [key in ResponseCustomResultItem['result_type']]: SearchResult[] };

export default (
  results: Results,
  result: ResponseCustomResultItem,
): Results => {
  const item = {
    id: btoa(result.result_url),
    title: TruncateString(StripHtmlTags(result.result_title)),
    text: TruncateString(StripHtmlTags(result.result_description)),
    href: result.result_url,
    category: result.result_type,
  };

  /* Using push for performance - See https://www.richsnapp.com/article/2019/06-09-reduce-spread-anti-pattern */
  results[item.category].push(item);
  return results;
};
