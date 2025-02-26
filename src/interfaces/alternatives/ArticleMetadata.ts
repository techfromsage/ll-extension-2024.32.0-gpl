import { ArticleOpenAccess } from '../articleMetadata/ArticleItem';

/**
 * Interface ArticleMetadata represents Article metadata we get from the Article Metadata search engine
 * (https://search.leanlibrary.com)
 * Given a DOI, it returns information such as publisher, date issued etc...
 */
interface ArticleMetadata {
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
  openAccessUrls?: string[],
  openAccess?: ArticleOpenAccess,
}

export default ArticleMetadata;
