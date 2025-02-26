import uniqBy from 'lodash.uniqby';
import DoiCheckISBN from './DoiCheckISBN';

/**
 * Finds first unique DOI in a body of text.
 */
const REGEX_DOI = new RegExp(
  [
    // Match the DOI prefix "10."
    '10\\.',
    // Match the registrant code (4 to 9 digits)
    '\\d{4,9}',
    // Match the slash after the registrant code
    '\\/',
    // Match the first character of the suffix (allowed characters)
    '([-._;():A-Z0-9]',
    // Match the rest of the suffix (excluding certain characters)
    '[^,<>\\s\\"?&\'#|]*)',
  ].join(''),
  'gi',
);

const all = (text: string | string[]): string[] => {
  const textString = Array.isArray(text) ? text.join() : text;
  const matches = (textString?.match(REGEX_DOI) || [])
    .filter(Boolean)
    .map(str => (str.endsWith('.') ? str.slice(0, -1) : str)) // Remove trailing period
    .map(decodeURIComponent)
    .map(str => (str.toLowerCase()))
    // remove /full/html or /html/full/ and anything that comes after it in url
    .map(str => (str.split('/html/full')[0]))
    .map(str => (str.split('/full/html')[0]))
    // remove /asset/ and anything that comes after it in url
    .map(str => (str.split('/asset')[0]))
    // remove .pdf
    .map(str => (str.split('.pdf')[0]))
    // if string is a path, remove from array
    .map(DoiCheckISBN);
  // We want an array of unique items.
  // Currently, the suggested method is to create a Set and then turn back into an array.
  return [...new Set(matches)];
};

interface DocumentScrape {
  doi: string,
  title: string,
  url: string,
}

const fromDocument = (document: Document): DocumentScrape[] => {
  const foundDois: DocumentScrape[] = [];
  const elements = document.querySelectorAll('body *');
  elements.forEach(element => {
    const uniqMatches = all([element.outerHTML]);
    // First instance in the body where the DOI sits in a single element
    if (uniqMatches?.length === 1 && !foundDois.some(doi => doi.doi === uniqMatches[0])) {
      // Find all links in the element
      const links = element.querySelectorAll('a');

      // Find the first link that contains the DOI
      const presumedTitle = Array.from(links).find(a => a.href.includes(uniqMatches[0]))
      // fallback to the first link if no link contains the DOI
        || links[0];

      foundDois.push({
        doi: uniqMatches[0],
        title: presumedTitle?.textContent?.trim() || '',
        url: presumedTitle?.href || '',
      });
    }
  });

  const allDois = all(document.body.innerText);
  return uniqBy([...foundDois, ...allDois.map(doi => ({ doi, title: '', url: '' }))], 'doi');
};

const DoiMatch = {
  all,
  fromDocument,
  first(text: string | string[]): string {
    return all(text)[0] || '';
  },
};
export default DoiMatch;
