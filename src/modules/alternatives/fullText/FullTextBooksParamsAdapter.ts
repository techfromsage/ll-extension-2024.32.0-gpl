/**
 * Adapts book ISBNs to be used in the holding information request.
 * @return
 * {
 *   9781860948954: {
 *     isbn: '9781860948954',
 *   },
 *   9781860948954: {
 *     isbn: '9781860948954',
 *   },
 * }
 *
 */
import DigitalResource from '@/interfaces/alternatives/DigitalResource';

interface Payload {
  [isbn: string]: {
    isbn: string,
  },
}

const DecoratorIsbnFromId = (books: DigitalResource[]): Payload => {
  const payload: Payload = {};
  books.forEach(book => {
    payload[book.identifier] = { isbn: book.identifier };
  });
  return payload;
};

const DecoratorIsbnFromMetadata = (books: DigitalResource[]): Payload => {
  const payload: Payload = {};
  books.forEach(book => {
    if (book.isbnMetadata?.relatedIsbns) {
      book.isbnMetadata.relatedIsbns.forEach(relatedIsbn => {
        payload[relatedIsbn] = { isbn: relatedIsbn };
      });
    }
  });
  return payload;
};

const FullTextBooksParamsAdapter = (books: DigitalResource[]): Payload => {
  return {
    ...DecoratorIsbnFromId(books),
    ...DecoratorIsbnFromMetadata(books),
  };
};

export default FullTextBooksParamsAdapter;
