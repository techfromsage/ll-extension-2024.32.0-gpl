import { asIsbn10, asIsbn13 } from 'isbn3';

/**
 * Takes a list of ISBNs and completes it to include all unique ISBN10 and ISBN13 variants
 * @param  {string[]} isbns
 * @returns string
 */
export default (isbns: string[]): string[] => {
  return Array.from(new Set(isbns.map(isbn => [asIsbn13(isbn), asIsbn10(isbn)]).flat().filter(Boolean)));
};
