import Institution from '@/interfaces/Institution';
import CompleteISBNList from '@/modules/alternatives/isbn/CompleteISBNList';
import SearchUrl from '@/modules/shared/SearchUrl';

/**
 * Takes institution data ISBNs and builds a print holding link for the user to manually
 * check if there are print results for the book they are currently wanting to access
 *
 * @param  {Institution} institution
 * @param  {string} isbn
 * @param  {string[]|undefined} relatedIsbns
 * @returns string
 */
const GeneratePrintHoldingsLink = (institution: Institution, isbn: string, relatedIsbns: string[] | undefined): string => {
  if (!institution.alternatives?.print_book_alternatives?.enabled) {
    return '';
  }

  const { url, search_string: searchString } = institution.alternatives.print_book_alternatives;
  if (!url || !searchString) {
    return '';
  }

  const flattenedIsbns = [isbn, ...(relatedIsbns || [])].filter(Boolean);
  const completeIsbns = CompleteISBNList(flattenedIsbns);

  if (!completeIsbns.length) {
    return '';
  }

  return SearchUrl(url, searchString, 'isbn', completeIsbns);
};

export default GeneratePrintHoldingsLink;
