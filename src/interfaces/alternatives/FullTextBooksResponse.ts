/**
 * Interface FullTextBooksResponse represents the JSON response from the API holdingInformation
 * endpoint when searching for books.
 */
interface FullTextBooksResponse {
  [isbn: string]: {
    urls: string[],
    title: string,
  },
}

export default FullTextBooksResponse;
