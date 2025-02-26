/**
 * ValidatedISBN creates a simple way to clean up and validate an ISBN.
 */
import ISBN from 'isbn3';

const REGEX_ISBN_PREFIXES = /ISBN(10|13)?/ig;

/**
 * Remove 0000000000 ISBN matches
 * @param {string} isbn
 * @returns {boolean}
 */
const isAllowed = (isbn: string): boolean => !['0000000000'].includes(isbn);

/**
 * @param {string} value
 * @returns {string}
 */
const parse = (value: string) => {
  const candidate = ISBN.parse(
    value.trim().replace(REGEX_ISBN_PREFIXES, ''),
  );
  if (!candidate?.isValid) {
    return '';
  }
  return candidate.isIsbn10 ? candidate.isbn10 : candidate.isbn13;
};

/**
 * @type {{validate: (value: string) => string}}
 */
const ValidatedISBN = {
  validate: (value: string) => {
    const isbn = parse(value);

    if (!isbn) {
      return '';
    }

    return isAllowed(isbn) ? isbn : '';
  },
};

export default ValidatedISBN;
