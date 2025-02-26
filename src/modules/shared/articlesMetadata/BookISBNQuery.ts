/**
 * BookISBNQuery is an Elasticsearch query that searches for a book by ISBN.
 * In this query, we are saying that one of the ISBNs MUST match,
 * and we should ideally be a type of book (instead of book-chapter)
 *
 * @param identifiers
 * @param isbns
 */

export default (isbns: string[]) => ({
  query: {
    bool: {
      should: [{ term: { type: 'book' } }],
      filter: [{ terms: { ISBN: isbns } }],
    },
  },
  size: 1,
});
