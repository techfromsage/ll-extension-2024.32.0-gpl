/**
 * Finds ISBNs in a document based on just text
 */
import ScraperType from '@/enums/ScraperType';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import ISBNMatch from '@/modules/alternatives/isbn/ISBNMatch';
import ValidatedISBN from './ValidatedISBN';

/**
 * Matches a line that contains a contact number.
 * @param line
 */
const matchContactNumber = (line: string) => line.match(/(fax|tel|\+)/i);
const matchOCLC = (line: string) => line.match(/OCLC/i);

/**
 * Reducer function to extract ISBNs from a line of text.
 * @param isbns
 * @param line
 */
const reduceToISBNs = (isbns: string[], line: string) => {
  if (matchContactNumber(line) || matchOCLC(line)) {
    return isbns;
  }

  const matches = ISBNMatch.all([line]);
  if (!matches.length) {
    return isbns;
  }

  const validatedMatches = matches.filter(Boolean).map(ValidatedISBN.validate).filter(Boolean);
  return [...isbns, ...validatedMatches];
};

const ISBNFromText = (document: Document): ScrapedContent => {
  return {
    scrape(): string {
      const isbns = document.documentElement.innerText?.split('\n').reduce(reduceToISBNs, []);
      return isbns[0];
    },
    scrapeAll() {
      const isbns = document.documentElement.innerText?.split('\n').reduce(reduceToISBNs, []);
      return isbns.map(isbn => {
        return {
          scraper: ScraperType.Text,
          identifier: isbn,
        };
      });
    },
  };
};

export default ISBNFromText;
