import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import formatNumberOfPages from './formatNumberOfPages';

/**
 * Returns a base64 encoded string from a string.
 * This approach is needed to avoid the "unicode problem".
 * See: https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
 *
 * @param {string} jsonString
 * @returns {string}
 */
export const stringToBase64 = (jsonString: string) => {
  const bytes = new TextEncoder().encode(jsonString);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
};

/**
 * Formats digitalResource type into a string that CSL expects.
 * For now we only have two types: 'journal-article' and 'book'.
 *
 * @param {string | undefined} type
 * @returns {string | undefined}
 */
const formatDigitalResourceType = (type: string | undefined) => {
  if (!type) {
    return undefined;
  }

  const map: { [key: string]: string } = {
    'journal-article': 'article-journal',
    book: 'book',
    monograph: 'book',
    'edited-book': 'book',
  };

  return map[type] || undefined;
};

/**
 * Format the query params for the citation API.
 * The endpoint expects a base64 encoded JSON string.
 * See: https://techfromsage.atlassian.net/browse/LL-2903
 *
 * @param {number} styleId
 * @param {DigitalResource} digitalResource
 * @returns {string}
 */
const formatQueryParams = (styleId: number, digitalResource: DigitalResource) => {
  const { institution, metadata } = digitalResource;
  if (!metadata || !institution) {
    return '';
  }

  const formattedType = formatDigitalResourceType(metadata.type);
  if (!formattedType) {
    return '';
  }

  const dateParts = metadata.issued ? metadata.issued.split('-').map(Number) : undefined;
  const issued = dateParts ? { 'date-parts': [dateParts] } : undefined;

  const params = {
    style_id: styleId,
    resources: [
      {
        title: metadata.articleTitle,
        author: metadata.authorsSplit,
        'container-title': metadata.journalTitle,
        issued,
        volume: metadata.volume,
        issue: metadata.issue,
        page: metadata.pages,
        'page-first': metadata.startPage,
        'number-of-pages': formatNumberOfPages(metadata.pages),
        type: formattedType, // article-journal or book
        publisher: metadata.publisher,
        'publisher-place': metadata.publisherLocation,
        doi: metadata.doi,
        issn: metadata.issn,
      },
    ],
  };

  return stringToBase64(JSON.stringify(params));
};

export default formatQueryParams;
