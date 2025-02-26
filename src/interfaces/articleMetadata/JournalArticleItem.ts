/**
 * JournalArticleItem represents a Journal Article in the Article Metadata API.
 * This is useful to know that specific fields are present.
 */
import ArticleItem from '@/interfaces/articleMetadata/ArticleItem';

interface JournalArticleItem extends ArticleItem {
  'title': string[],
  'authors': string[],
  'doi': string,
  'type': string,
  'publisher': string,
  'container-title': string[],
  'ISSN': string[],
  'page': string,
  'volume': string,
  'issue': string,
  'issued': string,
  'position': number,
}

export default JournalArticleItem;
