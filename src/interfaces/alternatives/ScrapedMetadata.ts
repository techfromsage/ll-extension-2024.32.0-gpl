/**
 * Interface ScrapedMetadata represents Article metadata we get from scraping the page for
 * information when search.leanlibrary.com is unable to obtain the metadata
 * Given a DOI, it returns information such as publisher, date issued etc...
 */
interface ScrapedMetadata {
  doi: string,
  articleTitle?: string,
  journalTitle?: string,
  articleDescription?: string,
  author?: string,
  authorsSplit?: {
    family: string,
    given: string,
  }[],
  publisher?: string,
  publisherLocation?: string,
  startPage?: string,
  pages?: string,
  volume?: number,
  issue?: string,
  issn?: string,
  isbn?: string,
  issued?: string,
  type?: string,
}

export default ScrapedMetadata;
