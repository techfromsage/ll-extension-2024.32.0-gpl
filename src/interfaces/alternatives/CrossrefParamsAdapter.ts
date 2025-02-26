/**
 * Interface CrossrefParamsAdapter represents the fields that need to be
 * changed from Crossref field names to different fields names that another system expects.
 * e.g. The full text finder expects 'publicationDate' instead of 'issued'
 */
interface CrossrefParamsAdapter {
  issn: string,
  isbn: string,
  instituteId: string,
  doi: string,
  journalTitle: string,
  articleTitle: string,
  author: string,
  publisher: string,
  startPage: string,
  pages: string,
  volume: string,
  issue: string,
  issued: string,
}

export default CrossrefParamsAdapter;
